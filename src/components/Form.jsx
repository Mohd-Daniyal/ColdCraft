import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import axios from "axios";

function Form() {
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [company, setCompany] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Resume, 3: Company, 4: Submit
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResume(file);

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!file) {
      setResumeError("Please upload Resume.");
    } else if (file.size > maxSize) {
      setResumeError(
        "File size exceeds the limit (5MB). Please choose a smaller file."
      );
    } else {
      setResumeError("");
      setCurrentStep(3);
    }
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    setCompanyError("");
  };

  const handleEmailSubmit = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      setCurrentStep(2);
    }
  };

  const handleCompanySubmit = () => {
    if (!company) {
      setCompanyError("Please enter the name of the company.");
    } else {
      setCompanyError("");
      setCurrentStep(4);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && resume && company) {
      setLoading(true);
    }
    const formData = new FormData();
    formData.append("email_id", email);
    formData.append("resume", resume);
    formData.append("company_name", company);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_API_URL}/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedEmail(response.data.generated_email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: currentStep >= 1 ? "flex" : "none",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label className="font-normal text-lg text-white mb-2">
            Email ID:
          </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !emailError) {
                handleEmailSubmit();
              }
            }}
            placeholder="Enter your email ID"
            className="block w-full border rounded-lg px-3 py-[0.32rem] bg-black border-indigo-600 placeholder-white-500 text-white mb-3"
          />
          {emailError && <ErrorAlert message={emailError} />}
        </div>

        <div
          style={{
            display: currentStep >= 2 ? "flex" : "none",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label className="font-normal text-lg text-white mb-2">
            Resume/CV:
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-indigo-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-900 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-50 file:px-3 file:py-[0.32rem] file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-indigo-600 focus:text-white focus:shadow-te-primary focus:outline-none dark:border-indigo-600 dark:text-gray-300 dark:bg-black dark:focus:border-white"
            type="file"
            id="formFile"
            accept=".pdf"
            onChange={handleResumeChange}
            placeholder="Upload your resume in pdf format"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-3"
            id="file_input_help"
          >
            Only PDF (MAX. 5 MB).
          </p>
          {resumeError && <ErrorAlert message={resumeError} />}
        </div>

        <div
          style={{
            display: currentStep >= 3 && !resumeError ? "flex" : "none",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label className="font-normal text-lg text-white mb-2">
            Company Name:
          </label>
          <input
            type="text"
            value={company}
            onChange={handleCompanyChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !companyError) {
                handleCompanySubmit();
              }
            }}
            placeholder="Enter Company Name"
            className="block w-full border rounded-lg px-3 py-[0.32rem] bg-black border-indigo-600 placeholder-white-500 text-white mb-3"
          />
          {companyError && <ErrorAlert message={companyError} />}
        </div>

        {loading ? (
        <div className="flex mt-20 dark:text-gray-400">
          <div>
            <h1 className="text-lg font-semibold flex items-center">
              L
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="animate-spin"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
              </svg>
              ading . . .
            </h1>
          </div>
        </div>
      ) : (
        <button
          style={{
            display: currentStep >= 4 && !companyError ? "block" : "none",
          }}
          type="submit"
          onClick={handleSubmit}
          className="border border-indigo-600 bg-black text-white hover:text-indigo-600 transition duration-300 ease-in-out rounded-lg py-3 font-semibold px-3"
        >
          Generate Email
        </button>
      )}
      </div>
      {generatedEmail && (
        <div>
          <h5 className="font-bold text-2xl text-white mb-6 mt-10">
            Generated Email:
          </h5>
          <div>
            <pre className="whitespace-pre-wrap text-md text-justify font-sans">
              {generatedEmail}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
