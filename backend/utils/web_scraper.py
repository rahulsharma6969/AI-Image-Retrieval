import requests
from bs4 import BeautifulSoup

def fetch_similar_images(description):
    params = {"q": description, "tbm": "isch"}
    response = requests.get("https://www.google.com/search", params=params, timeout=30)
    soup = BeautifulSoup(response.text, "html.parser")
    images = soup.select("div img")
    
    image_urls = [img.get("src") for img in images if img.get("src")]
    
    return image_urls[:10] if len(image_urls) >= 10 else image_urls