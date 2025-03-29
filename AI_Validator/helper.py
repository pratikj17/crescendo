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
    f"""
    Generates a dynamic prompt for assignment evaluation based on user-defined checkpoints.

    :param pdf_data: Extracted text from the PDF
    :param checkpoints: A dictionary containing the required elements for validation
    :return: A formatted prompt string
    """
    prompt = f"""
    You are an expert in Assignment evaluation, specializing in checking the format of academic documents. You will receive scanned input data extracted from a PDF, and you must validate its format based on user-defined checkpoints.

    ### INSTRUCTIONS ###
    Please analyze this document and validate its format according to the given checkpoints:

    """

    for index, (key, details) in enumerate(checkpoints.items(), start=1):
        prompt += f"\n{index}. {details['description']}"

        if "subpoints" in details:
            for subpoint in details["subpoints"]:
                prompt += f"\n   - {subpoint}"

    prompt += f"""
    
    For each requirement, indicate whether it PASSES or FAILS, provide specific evidence from the document, and suggest any necessary corrections.

    I need you to thoroughly validate this document against the provided format requirements. For each element below:
    1. State whether it is PRESENT or MISSING
    2. Extract the actual content found (if present)
    3. Note any formatting issues or inconsistencies

    After your analysis, provide a summary of all format issues and recommended corrections.

    Also, specify on which page the formatting issue is found.

    Present the Required Summary strictly in JSON format.
    Only check for those checkpoints which are stated dont do other validation

    ### END OF INSTRUCTIONS ###

    This is your input data extracted from the PDF:
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