from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import data, forecast

app = FastAPI(
    title="Crude Oil Forecasting API",
    description="API for crude oil 3-2-1 crack spread forecasting",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(forecast.router, prefix="/api", tags=["Forecast"])


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