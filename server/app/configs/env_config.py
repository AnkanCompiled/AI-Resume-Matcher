import os
from dotenv import load_dotenv

load_dotenv()

def get_genai_api_key():
    GENAI_API_KEY = os.getenv("GENAI_API_KEY")
    if not GENAI_API_KEY:
        raise ValueError("GENAI_API_KEY environment variable is not set.")
    return GENAI_API_KEY

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
ALLOWED_METHODS = os.getenv("ALLOWED_METHODS", "GET,POST,PUT,PATCH,DELETE").split(",")
ALLOWED_HEADERS = os.getenv("ALLOWED_HEADERS", "*").split(",")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "job_hub")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "temporary_secret_key")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_REFRESH_EXPIRATION = int(os.getenv("JWT_REFRESH_EXPIRATION", 7))
JWT_ACCESS_EXPIRATION = int(os.getenv("JWT_ACCESS_EXPIRATION", 30))