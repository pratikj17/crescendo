from fastapi import FastAPI, File, UploadFile, Form
import json
from io import BytesIO
from helper import read_pdf, llminput  # Ensure AI module is implemented
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins (for development purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-pdf/")
async def read_uploaded_pdf(
    file: UploadFile = File(...),
    checkpoints: str = Form(...)):
    print(checkpoints)
    if not file.filename.lower().endswith('.pdf'):
        return {"error": "Only PDF files are allowed."}


    try:
        checkpoints_dict = json.loads(checkpoints)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format for checkpoints"}

    # Read PDF file
    pdf_content = await file.read()
    pdf_stream = BytesIO(pdf_content)
    pdf_text = read_pdf(pdf_stream)  # Function to extract text from PDF

    # Generate formatted prompt and get AI response
    result = llminput(pdf_text, checkpoints_dict)
    # Ensure the AI response is parsed as JSON
    try:
        result = json.loads(result.strip("```json\n").strip("\n```"))
    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response as JSON"}
    

    return result
