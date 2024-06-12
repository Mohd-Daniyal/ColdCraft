# ColdCraft

ColdCraft is a tool created to help college students create cold emails for job applications at startups. Students only need to upload their resume and include the name of the company they would like to apply to in order to create customised cold emails.

## Features

- **User Input**: Users start by providing their email address.

- **Resume/CV**: Users need to upload their resume.
  
- **Company Name**: Users enter the name of the company they want to apply to.
  
- **Company Information Extraction**: The system extracts clean and relevant company information by scraping the company's website HTML content using the Exa API(formerly Metaphor) and processing it with the Gemini model.

- **Email Generation**: The system combines the extracted company information with the user's resume details and generates a well-crafted cold email tailored for the specific company using the Gemini API.

https://cold-craft.vercel.app/

## Tech Stack

- Python
- Flask
- React.js (for the frontend)
- Tailwind CSS (for styling)
- Gemini API
- Exa API(formerly Metaphor)

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Start the Flask backend server:
   ```
   python app.py
   ```
4. Start the React frontend server:
   ```
   npm start
   ```
5. Open your web browser and go to `http://localhost:3000` to access the application.
