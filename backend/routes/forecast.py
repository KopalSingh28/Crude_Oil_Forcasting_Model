from fastapi import APIRouter
import pandas as pd
from pathlib import Path

router = APIRouter()

FORECAST_PATH = (
    Path(__file__).resolve().parents[2]
    / "results"
    / "future_forecast.csv"
)


@router.get("/forecast")
def get_forecast():

    forecast_df = pd.read_csv(FORECAST_PATH)

    forecast = []

    for _, row in forecast_df.iterrows():
        forecast.append({
            "date": row["Date"],
            "forecast": float(row["Forecast"]),
            "lower": float(row["Lower_CI"]),
            "upper": float(row["Upper_CI"])
        })

    return {
        "model": "ARIMA(0,1,0)",
        "horizon": len(forecast),
        "forecast": forecast
    }