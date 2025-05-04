from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from app.configs.env_config import MONGO_URI, MONGO_DB_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]

user_collection = db["users"]