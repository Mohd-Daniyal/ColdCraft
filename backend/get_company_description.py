import os
from api.gemini_api import fetch_gemini_response
from api.metaphor_api import get_extract_from_metaphor

def prepare_llm_prompt(company_dump: str) -> str:
    # Prepare the prompt for LLM.
    llm_prompt = f"\n ---"
    llm_prompt += f"\nCompany's Website Dump:\n{company_dump}"
    return llm_prompt

def clean_company_info_with_llm(llm_prompt):
    gpt_response_text = fetch_gemini_response(llm_prompt)

    if gpt_response_text:
        cleaned_company_info = gpt_response_text
        return cleaned_company_info
    else:
        print("Failed to generate the email.")
        return ""

def get_company_info_from_name(company_name):
    text_content = get_extract_from_metaphor(company_name)
    return get_cleaned_info_from_scrapped_webpage(text_content)

def get_cleaned_info_from_scrapped_webpage(text_content):
    llm_prompt = prepare_llm_prompt(text_content)
    cleaned_company_info = clean_company_info_with_llm(llm_prompt)
    filename = os.path.join("generations", 'company_cleaned_info.txt')

    with open(filename, 'w', encoding='utf-8') as file:
        file.write(cleaned_company_info)

    print(f'Text content saved to "{filename}"')
    return cleaned_company_info

if __name__ == '__main__':
    company_name = "Amdocs"
    get_company_info_from_name(company_name)