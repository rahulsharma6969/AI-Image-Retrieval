from ..config import Config
from qdrant_client import QdrantClient

def search_images_by_vector(vector, collection_name, top_k=10):
    qdrant_client = QdrantClient(
        url=Config.QDRANT_CLIENT_URL,
        api_key=Config.QDRANT_CLIENT_API_KEY
    )
    results = qdrant_client.search(
        collection_name=collection_name,
        search_request={"vector": vector, "limit": top_k}
    )
    return [res.payload for res in results]