from imagekitio import ImageKit
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from transformers import CLIPProcessor, CLIPModel
import torch
from PIL import Image
from ..config import Config
import base64
import requests
import numpy as np
from io import BytesIO
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from ..utils.web_scraper import fetch_similar_images
from langchain_community.embeddings import HuggingFaceEmbeddings
from collections import defaultdict
from PIL import UnidentifiedImageError
from qdrant_client.models import SearchRequest
import qdrant_client

class ImageService:
    def __init__(self):
        self.imagekit = ImageKit(
            private_key=Config.IMAGEKIT_PRIVATE_KEY,
            public_key=Config.IMAGEKIT_PUBLIC_KEY,
            url_endpoint=Config.IMAGEKIT_URL_ENDPOINT
        )
        self.qdrant_client = QdrantClient(
            url=Config.QDRANT_CLIENT_URL,
            api_key=Config.QDRANT_CLIENT_API_KEY
        )
        self.text_embeddings_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.5, api_key=Config.GEMINI_API_KEY)
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    # Function to generate Image Description
    def generate_description(self, image_url: str):
        response = requests.get(image_url)
        if response.status_code == 200:
            image_data = base64.b64encode(response.content).decode("utf-8")
        else:
            raise Exception(f"Failed to fetch image from URL. HTTP status code: {response.status_code}")

        prompt = """
        Provide a detailed description of the image in around **100 words**.
        Mention objects, colors, lighting, background, and any actions.
        Be vivid and informative.
        """

        messages = [
            SystemMessage(content="You are an expert at describing images in great detail."),
            HumanMessage(content=[{"type": "text", "text": prompt}, image_data])
        ]

        response = self.llm.invoke(messages)
        return response.content
    
    # Function to generate Text Embedding
    def generate_text_embedding(self, text):
        embedding = self.text_embeddings_model.embed_query(text)
        return embedding
    
    # Function to generate Image Embedding
    def generate_image_embedding(self, image):
        if isinstance(image, Image.Image):
            image = np.array(image)
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            image_vector = self.model.get_image_features(**inputs).cpu().numpy()

        return image_vector
    
    # Function to store Image Vector in Qdrant
    def store_images_vector(self, image_url):
        print(image_url)
        response = requests.get(image_url)
        if response.status_code == 200:
            try:
                image = Image.open(BytesIO(response.content))
                image.verify()  # Verify if it's an image
            except UnidentifiedImageError:
                print("Invalid image file, skipping...")
        embedding = self.generate_image_embedding(image)
        self.qdrant_client.upsert(
            collection_name=Config.IMAGE_COLLECTION,
            points=[PointStruct(id=image_url, vector=embedding, payload={"url": image_url})]
        )

    # Function to store Text Vector in Qdrant
    def store_text_vector(self, text, url):
        embedding = self.generate_text_embedding(text)
        self.qdrant_client.upsert(
            collection_name=Config.TEXT_COLLECTION,
            points=[PointStruct(id=text[:10], vector=embedding, payload={"url": url})]
        )
    
    # Search Similar Images by given Image
    def search_similar_images(self, image_path, top_k=10):
        image = Image.open(image_path).convert("RGB")
        image_embedding = self.generate_image_embedding(image)

        with open(image_path, "rb") as img_file:
            image_data = base64.b64encode(img_file.read()).decode("utf-8")

        prompt = """
        Provide a detailed description of the image in around **100 words**.
        Mention objects, colors, lighting, background, and any actions.
        Be vivid and informative.
        """

        messages = [
            SystemMessage(content="You are an expert at describing images in great detail."),
            HumanMessage(content=[{"type": "text", "text": prompt}, image_data])
        ]

        description = self.llm.invoke(messages)

        urls = fetch_similar_images(description)

        imagekit_urls = []

        for index, url in enumerate(urls):
            try:
                response = self.imagekit.upload(
                    file=url,
                    file_name=f"image_{index}.jpg",
                )
                imagekit_urls.append(response.url)
            except Exception as e:
                print(f"Error uploading {url}: {e}")

        for imagekit_url in imagekit_urls:
            self.store_images_vector(imagekit_url)
            desc = self.generate_description()
            self.store_text_vector(desc, imagekit_url)

        # Search for similar images in Qdrant
        search_results = qdrant_client.search(
            collection_name=Config.IMAGE_COLLECTION,
            search_request=SearchRequest(vector=image_embedding, limit=top_k)
        )

        results = []
        for result in search_results:
            image_url = result.payload["image_url"]
            image_id = result.id

            # Fetch corresponding text description from TEXT_COLLECTION
            text_result = qdrant_client.retrieve(
                collection_name=Config.TEXT_COLLECTION, ids=[image_id]
            )

            description = text_result[0].payload["description"] if text_result else "No description found"

            results.append({"image_url": image_url, "description": description})

        return results

    # Search Similar Image by given Text
    def search_similar_text(self, description, top_k=10):
        text_embedding = self.generate_text_embedding(description)

        urls = fetch_similar_images(description)

        imagekit_urls = []

        for index, url in enumerate(urls):
            print(f"🔍 Checking URL: {url}")

            if not url.startswith("http"):
                print(f"Invalid URL: {url}")
                continue

            try:
                response = self.imagekit.upload(file=url, file_name=f"image_{index}.jpg")
                imagekit_urls.append(response.url)
            except Exception as e:
                print(f"Error uploading {url}: {e}")


        for imagekit_url in imagekit_urls[1:]:
            self.store_images_vector(imagekit_url)
            desc = self.generate_description()
            self.store_text_vector(desc, imagekit_url)

        # Search for similar descriptions in Qdrant
        search_results = qdrant_client.search(
            collection_name=Config.TEXT_COLLECTION,
            search_request=SearchRequest(vector=text_embedding, limit=top_k)
        )

        results = []
        for result in search_results:
            image_id = result.id

            # Fetch corresponding image from IMAGE_COLLECTION
            image_result = qdrant_client.retrieve(
                collection_name=Config.IMAGE_COLLECTION, ids=[image_id]
            )

            image_url = image_result[0].payload["image_url"] if image_result else "No image found"

            results.append({"image_url": image_url, "description": result.payload["description"]})

        return results

    # Search Similar Images by given Image and Text
    def search_similar_text_image(self, image_path, description, top_k=10):
        image = Image.open(image_path).convert("RGB")
        image_embedding = self.generate_image_embedding(image)

        text_embedding = self.generate_text_embedding(description)

        urls = fetch_similar_images(description)

        imagekit_urls = []

        for index, url in enumerate(urls):
            try:
                response = self.imagekit.upload(
                    file=url,
                    file_name=f"image_{index}.jpg",
                )
                imagekit_urls.append(response.url)
            except Exception as e:
                print(f"Error uploading {url}: {e}")

        for imagekit_url in imagekit_urls:
            self.store_images_vector(imagekit_url)
            desc = self.generate_description()
            self.store_text_vector(desc, imagekit_url)

        # Search for similar images
        image_results = qdrant_client.search(
            collection_name=Config.IMAGE_COLLECTION,
            search_request=SearchRequest(vector=image_embedding, limit=top_k)
        )

        # Search for similar descriptions
        text_results = qdrant_client.search(
            collection_name=Config.TEXT_COLLECTION,
            search_request=SearchRequest(vector=text_embedding, limit=top_k)
        )

        return self.merge_results(image_results, text_results)
    
    def merge_results(self, image_results, text_results):
        score_map = defaultdict(float)

        # Assign scores from image search
        for result in image_results:
            score_map[result.id] += result.score

        # Assign scores from text search
        for result in text_results:
            score_map[result.id] += result.score

        # Sort by combined score
        sorted_results = sorted(score_map.items(), key=lambda x: x[1], reverse=True)

        # Retrieve data from Qdrant
        final_results = []
        for image_id, score in sorted_results:
            image_result = qdrant_client.retrieve(collection_name=Config.IMAGE_COLLECTION, ids=[image_id])
            text_result = qdrant_client.retrieve(collection_name=Config.TEXT_COLLECTION, ids=[image_id])

            image_url = image_result[0].payload["image_url"] if image_result else "No image found"
            description = text_result[0].payload["description"] if text_result else "No description found"

            final_results.append({"image_url": image_url, "description": description, "score": score})

        return final_results