from datetime import timedelta
from fastapi import APIRouter, Depends, Response, Request
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user_model import UserCreate
from app.services.auth_service import register_user, authenticate_user
from app.utils.jwt_util import create_token, verify_token
from app.configs.env_config import JWT_REFRESH_EXPIRATION, JWT_ACCESS_EXPIRATION

router = APIRouter()

@router.post("/register")
async def register(req_data: UserCreate):
    try:
        print("ReqData", req_data)
        await register_user(req_data)
        return {"message": "User registered successfully"}
    except Exception as e:
        status_code = getattr(e, "status_code", 500)
        detail = getattr(e, "detail", str(e))
        raise HTTPException(status_code=status_code, detail=detail)

@router.post("/login")
async def login(req_data: OAuth2PasswordRequestForm = Depends(), res: Response = None):
    try:
        user_id = await authenticate_user(req_data.username, req_data.password)
        refresh_token = create_token(data={"id": str(user_id)}, expires_delta=timedelta(days=JWT_REFRESH_EXPIRATION))
        res.set_cookie(
            key="REFRESH_TOKEN",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="None"
        )
        return {"message": "Logged in successfully"}
    except Exception as e:
        raise e
    
@router.post("/logout")
async def logout(res: Response = None):
    try:
        res.delete_cookie(key="REFRESH_TOKEN")
        return {"message": "Logged out successfully"}
    except Exception as e:
        raise e
    
@router.get("/access-token")
async def get_access_token(req: Request = None):
    try:
        refresh_token = req.cookies.get("REFRESH_TOKEN")
        if not refresh_token:
            raise HTTPException(status_code=401, detail="Refresh token not found")
        TOKEN = verify_token(refresh_token)
        access_token = create_token(data={"id": str(TOKEN["id"])}, expires_delta=timedelta(minutes=JWT_ACCESS_EXPIRATION))
        return {"access_token": access_token}
    except Exception as e:
        raise e
    
@router.get("/force-401")
async def force_401():
    raise HTTPException(status_code=401, detail="Manual 401 test")
