import os
import PyPDF2

class FileNotFound(Exception):
    pass

def convert_pdf_to_text(pdf_filename):
    if not os.path.exists(pdf_filename):
        raise FileNotFound(f"The file '{pdf_filename}' does not exist.")

    try:
        pdf_file = open(pdf_filename, 'rb')
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""

        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

        save_text_to_file(pdf_filename, text)

    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        pdf_file.close()

def save_text_to_file(pdf_filename, text):
    # Create the "generations" folder if it doesn't exist
    if not os.path.exists("generations"):
        os.makedirs("generations")

    # Create a text file with the same name as the PDF in the "generations" folder
    txt_filename = os.path.join("generations", os.path.splitext(os.path.basename(pdf_filename))[0] + ".txt")
    with open(txt_filename, 'w', encoding='utf-8') as txt_file:
        txt_file.write(text)
    print(f"Text extracted and saved to '{txt_filename}'.")

def main():
    pdf_filename = "generations/None_resume.pdf"
    convert_pdf_to_text(pdf_filename)

if __name__ == "__main__":
    main()