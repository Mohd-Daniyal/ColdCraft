from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from resume_to_text import convert_pdf_to_text
from generate_email import generate_email

app = Flask(__name__)
CORS(app)

@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    email_id = request.form.get('email_id')
    resume_file = request.files['resume']
    company_name = request.form.get('company_name')
    
    resume_directory = 'generations'
    os.makedirs(resume_directory, exist_ok=True)
    resume_path = os.path.join(resume_directory, f"{email_id}_resume.pdf")
    
    # Save the resume file
    resume_file.save(resume_path)
    convert_pdf_to_text(resume_path)
    
    generated_email = generate_email(email_id, "", company_name)
    
    for filename in os.listdir(resume_directory):
        file_path = os.path.join(resume_directory, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    
    return jsonify({'message': 'Resume uploaded successfully', 'generated_email': generated_email}), 200


if __name__ == '__main__':
    app.run(debug=True)
