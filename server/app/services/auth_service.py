from app.databases.mongodb_database import user_collection
from app.utils.hash_util import hash_password, verify_password
from app.models.user_model import UserCreate
from fastapi import HTTPException

async def register_user(user: UserCreate):
    user_dict = user.model_dump()
    user_dict["hashed_password"] = hash_password(user_dict.pop("password"))
    existing_user = await user_collection.find_one({"email": user_dict["email"]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    USER_DATA = await user_collection.insert_one(user_dict)
    return USER_DATA.inserted_id

async def authenticate_user(email: str, password: str):
    user = await user_collection.find_one({"email": email})
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user._id
