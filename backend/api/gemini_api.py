import google.generativeai as genai
import os
import requests


gemini_api_key = "YOUR GEMINI API KEY"

def fetch_gemini_response(user_prompt: str):
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(user_prompt)
        return response.text
    
    except Exception as e:
        print("Exception occurred while fetching response from Gemini", e)
        print("Oh!! , looks like LLM lost it's weights, refresh the page")
        # Handle the exception and return a 500 status code
        error_message = f"An error occurred: {str(e)}"
        return error_message


if __name__ == "__main__":
    # Fetch the response from the Gemini API
    response = fetch_gemini_response("Hello maadlee")
    print(response)