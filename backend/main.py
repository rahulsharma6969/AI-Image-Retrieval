from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .routes import upload, search

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(upload.router)
app.include_router(search.router)

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)