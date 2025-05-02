import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.configs.env_config import ALLOWED_METHODS, ALLOWED_ORIGINS, ALLOWED_HEADERS
from app.routes import auth_route


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=[ALLOWED_METHODS],
    allow_headers=[ALLOWED_HEADERS],
)

@app.middleware("http")
async def log_process_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.include_router(auth_route.router, prefix="/api/auth", tags=["Authentication"])



# from ai import ResumeMatcher
# from util import extract_text
# import tempfile


# matcher = ResumeMatcher()

# jobs = [
#     "Looking for a React developer experienced with Node.js and MongoDB",
#     "Need a data analyst with Python, SQL, and Tableau skills",
#     "Hiring full-stack engineers familiar with Django and REST APIs",
#     "Seeking a project manager with Agile and Scrum experience",
#     "Looking for a UX designer with Figma and user research skills",
#     "Need a DevOps engineer with AWS and Docker expertise",
#     "Hiring a mobile developer with React Native and Swift knowledge",
# ]
# matcher.add_job_descriptions(jobs)

# @app.post("/upload-resume/")
# async def upload_resume(file: UploadFile = File(...)):
#     with tempfile.NamedTemporaryFile(delete=False) as tmp:
#         tmp.write(await file.read())
#         tmp_path = tmp.name

#     resume_text = extract_text(tmp_path)
#     matches = matcher.match_resume(resume_text)

#     return {
#         "matches": [
#             {"job": match.page_content} for match in matches
#         ]
#     }
