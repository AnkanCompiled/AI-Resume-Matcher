from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user_model import UserCreate
from app.services.auth_service import register_user, authenticate_user
from app.utils.jwt_util import create_token
from app.configs.env_config import JWT_REFRESH_EXPIRATION

router = APIRouter()

@router.post("/register")
async def register(req_data: UserCreate):
    try:
        user_id = await register_user(req_data)
        return {"user_id": str(user_id)}
    except Exception as e:
        raise HTTPException(status_code=e.status_code or 500, detail=e.detail or str(e))

@router.post("/login")
async def login(req_data: OAuth2PasswordRequestForm = Depends()):
    try:
        user_id = await authenticate_user(req_data.username, req_data.password)
        refresh_token = create_token(data={"id": str(user_id)}, expires_delta=timedelta(days=JWT_REFRESH_EXPIRATION))
        return {"user_id": str(user_id)}
    except Exception as e:
        raise HTTPException(status_code=e.status_code or 500, detail=e.detail or str(e))