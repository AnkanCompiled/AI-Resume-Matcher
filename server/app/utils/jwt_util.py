from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.configs.env_config import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_EXPIRATION

def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta if expires_delta else timedelta(minutes=JWT_ACCESS_EXPIRATION)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt