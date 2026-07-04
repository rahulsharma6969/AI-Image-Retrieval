from fastapi import APIRouter, UploadFile, File
from ..services.image_service import ImageService

router = APIRouter()
service = ImageService()

@router.post("/upload")
def upload_image(file: UploadFile = File(...)):
    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as img_file:
        img_file.write(file.file.read())
    urls = service.process_image(image_path)
    return {"stored_images": urls}