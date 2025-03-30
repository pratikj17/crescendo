import google.generativeai as genai
import PyPDF2
from io import BytesIO

def read_pdf(file: BytesIO):
    try:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)
        result = {
            "page_count": num_pages,
            "pages": {}
        }
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]   
            text = page.extract_text() or ""  
            result["pages"][page_num + 1] = text
        return result
    except Exception as e:
        return {"error": f"Error reading PDF: {str(e)}"}

def display_pdf_content(pdf_data):
   
    if "error" in pdf_data:
        print(f"ERROR: {pdf_data['error']}")
        return
    
    print("\n" + "="*50)
    print(f"PDF FILE CONTENT - {pdf_data['page_count']} pages")
    print("="*50)
    
    for page_num, content in pdf_data["pages"].items():
        print(f"\n{'='*20} PAGE {page_num} {'='*20}\n")
        print(content)
        
    print("\n" + "="*50)

def generate_prompt(pdf_data, checkpoints):
    """
    Generates a structured and consistent prompt for assignment evaluation based on user-defined checkpoints.

    :param pdf_data: Extracted text from the PDF
    :param checkpoints: A dictionary containing the required elements for validation
    :return: A formatted prompt string
    """

    prompt = f"""
    You are an expert in assignment evaluation, specializing in checking the format of academic documents. 
    You will receive scanned input data extracted from a PDF, and you must validate its format based on user-defined checkpoints.

    ### INSTRUCTIONS ###
    Analyze this document and validate its format according to the provided checkpoints.

    """

    for index, (key, details) in enumerate(checkpoints.items(), start=1):
        prompt += f"\nTitle:{key}|description:{details['description']}"

        if "subpoints" in details:
            for subpoint in details["subpoints"]:
                prompt += f"\n   - {subpoint}"

    prompt += f"""
    
    ### EVALUATION CRITERIA ###
    - For each requirement, indicate whether it PASSES or FAILS.
    - Extract the actual content found (if present).
    - Identify any formatting issues or inconsistencies.
    - Specify the page number where the issue is found (if applicable).

    ### JSON OUTPUT FORMAT ###
    Ensure that your output follows the strict JSON format below for consistency:

    {{
        "<Checkpoint Title 1>": {{
            "status": "PRESENT / MISSING",
            "extracted_content": "<Extracted content from the document>",
            "issues": [
                {{
                    "description": "<Issue description>",
                    "page": <Page number>
                }}
            ]
        }},
        "<Checkpoint Title 2>": {{
            "status": "PRESENT / MISSING",
            "extracted_content": "<Extracted content from the document>",
            "issues": [
                {{
                    "description": "<Issue description>",
                    "page": <Page number>
                }}
            ]
        }},
        ...
    }}

    - Each checkpoint should have a unique key in the JSON output.
    - The key should be the checkpoint title (before the colon).
    - Maintain the same JSON structure for all responses to ensure consistency.

    ### END OF INSTRUCTIONS ###

    Below is the extracted text from the PDF:
    {pdf_data}
    """

    return prompt

def llminput(pdf_data,checkpoints):
    api_key="AIzaSyAZ48-YSh_cidH-0gdH2A2VwSpOP16ZFmc"
    genai.configure(api_key=api_key)
    model1=genai.GenerativeModel("gemini-1.5-flash")
    prompt=generate_prompt(pdf_data,checkpoints)
    response=model1.generate_content(prompt)
    out=response.text
    return out