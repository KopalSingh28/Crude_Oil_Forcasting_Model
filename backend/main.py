from fastapi import FastAPI
from backend.routes import data

app = FastAPI(
    title="Crude Oil Forecasting API",
    description="API for crude oil 3-2-1 crack spread forecasting",
    version="1.0.0"
)


app.include_router(data.router, prefix="/api/data", tags=["Data"])


@app.get("/")
def root():
    return {
        "message": "Crude Oil Forecasting API is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }