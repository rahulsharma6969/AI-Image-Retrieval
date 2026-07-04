from fastapi import APIRouter, UploadFile, File
from ..services.image_service import ImageService
from pydantic import BaseModel

router = APIRouter()
service = ImageService()

class SearchRequest(BaseModel):
    text: str

@router.post("/search/image")
def search_by_image(file: UploadFile = File(...)):
    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as img_file:
        img_file.write(file.file.read())
    results = service.search_similar_images(image_path)
    return {"results": results}

@router.post("/search/text")
def search_by_text(request: SearchRequest):
    results = service.search_similar_text(request.text)
    return {"results": results}

@router.post("/search/text-image")
def search_by_text_image(text: str, file: UploadFile = File(...)):
    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as img_file:
        img_file.write(file.file.read())
    results = service.search_similar_text_image(image_path, text)
    return {"results": results}