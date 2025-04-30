from fastapi import FastAPI, UploadFile, File
from ai import ResumeMatcher
from util import extract_text
import tempfile

app = FastAPI()
matcher = ResumeMatcher()

jobs = [
    "Looking for a React developer experienced with Node.js and MongoDB",
    "Need a data analyst with Python, SQL, and Tableau skills",
    "Hiring full-stack engineers familiar with Django and REST APIs",
    "Seeking a project manager with Agile and Scrum experience",
    "Looking for a UX designer with Figma and user research skills",
    "Need a DevOps engineer with AWS and Docker expertise",
    "Hiring a mobile developer with React Native and Swift knowledge",
]
matcher.add_job_descriptions(jobs)

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    resume_text = extract_text(tmp_path)
    matches = matcher.match_resume(resume_text)

    return {
        "matches": [
            {"job": match.page_content} for match in matches
        ]
    }
