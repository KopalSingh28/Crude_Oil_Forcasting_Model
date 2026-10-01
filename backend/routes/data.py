from fastapi import APIRouter
import pandas as pd
from pathlib import Path

router = APIRouter()

DATA_PATH = Path(__file__).resolve().parents[2] / "data" / "processed" / "crude_oil_clean.csv"


@router.get("/latest")
def get_latest_data():
    df = pd.read_csv(DATA_PATH)

    latest = df.iloc[-1]

    return {
        "date": latest["Date"],
        "WTI": latest["WTI"],
        "Brent": latest["Brent"],
        "Gasoline_NY": latest["Gasoline"],
        "Diesel_NY": latest["Diesel"],
        "JetFuel": latest["JetFuel"],
        "Crack321": latest["Crack321"]
    }
@router.get("/historical")
def get_historical_data():
    df = pd.read_csv(DATA_PATH)

    return df.to_dict(orient="records")
@router.get("/statistics")
def get_statistics():
    df = pd.read_csv(DATA_PATH)

    crack = df["Crack321"]

    return {
        "observations": int(len(df)),
        "mean_crack321": float(crack.mean()),
        "median_crack321": float(crack.median()),
        "minimum_crack321": float(crack.min()),
        "maximum_crack321": float(crack.max()),
        "std_crack321": float(crack.std())
    }

@router.get("/model-performance")
def get_model_performance():
    performance_path = (
        Path(__file__).resolve().parents[2]
        / "results"
        / "model_comparison.csv"
    )

    df = pd.read_csv(performance_path)

    return df.to_dict(orient="records")