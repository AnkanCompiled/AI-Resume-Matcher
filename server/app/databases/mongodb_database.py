from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from app.configs.env_config import MONGODB_URL, MONGODB_DB_NAME

client = AsyncIOMotorClient(MONGODB_URL)
db = client[MONGODB_DB_NAME]

user_collection = db["users"]