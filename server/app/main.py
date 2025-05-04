import time
from fastapi import FastAPI, Request
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.configs.env_config import ALLOWED_METHODS, ALLOWED_ORIGINS, ALLOWED_HEADERS
from app.routes import auth_route


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=ALLOWED_METHODS,
    allow_headers=ALLOWED_HEADERS,
)

@app.middleware("http")
async def log_process_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": "HTTP error", "detail": exc.detail},
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"message": "Validation error", "errors": exc.errors()},
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled error: {exc} - URL: {request.url} - Method: {request.method}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error, please try again later."},
    )


app.include_router(auth_route.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/api")
async def root():
    return {"message": "Server Check!"}



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
