
# AI Image Retrieval

The AI Image Retrieval Project is an image search application designed to provide efficient and accurate retrieval of images based on user queries.

https://github.com/user-attachments/assets/15212f7f-c4d1-4d95-8432-c0a6e79d024c

## Technologies Used

#### **Frontend**
- React.js
- Tailwind CSS

#### **Backend**
- FastAPI
- Python

#### **AI & Machine Learning**
- Hugging Face API
- Gemini API

### **Database & Storage**
- Qdrant
- Imagekit.io
## How to Run?

#### **Prerequisites**
- Python
- Node.js & NPM

#### *Step1:* The folder structure is as follows:
 
├── backend/  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── main.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── models.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── database.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── routes/  
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── search.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── upload.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── utils.py  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── requirements.txt  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── .env  
│  
├── frontend/  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── src/  
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── components/  
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── pages/  
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── App.js   
│&nbsp;&nbsp;&nbsp;&nbsp;   │&nbsp;&nbsp;&nbsp;&nbsp;   ├── index.js  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── public/  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── package.json  
│&nbsp;&nbsp;&nbsp;&nbsp;   ├── tailwind.config.js  
│  
├── README.md

- Open terminal and go to backend folder.
- Then, activate the virtual environment by the following command:
```
.venv/Scripts/activate
```

#### *Step2:* Install dependencies
```
cd backend
pip install -r requirements.txt
```

```
cd frontend
npm install --legacy-peer-deps
```

#### *Step3:* Set up Config file in backend folder
```
GEMINI_API_KEY = "<Your Gemini API Key>"
IMAGEKIT_PUBLIC_KEY = "<Your ImageKit Public Key>"
IMAGEKIT_PRIVATE_KEY = "<Your ImageKit Private Key>"
IMAGEKIT_URL_ENDPOINT = "<Your ImageKit URL Endpoint>"
QDRANT_CLIENT_URL = "<Your Qdrant Client URL>"
QDRANT_CLIENT_API_KEY = "<Your Qdrant Client API Key>"
```

#### *Step4:* Run the frontend using the following command in th e frontend directory:
```
npm run dev
```
The frontend will start running at http://localhost:5173.

#### *Step5:* Run the backend using the follwing command in the root directory:
```
python backend.main
```
The backend will start running at http://localhost:8000.
