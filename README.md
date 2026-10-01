# Crude Oil 3-2-1 Crack Spread Forecasting System

A machine learning and time-series forecasting project that analyzes petroleum market data and forecasts the **3-2-1 refinery crack spread (Crack321)** using historical market prices.

---

## Project Overview

The 3-2-1 crack spread is a commonly used indicator of refinery economics. It represents an approximate refinery margin obtained by processing crude oil into refined petroleum products.

This project uses historical prices of:

- WTI crude oil
- Brent crude oil
- Gasoline
- Diesel
- Jet Fuel

to calculate the **Crack321** metric and forecast its future values using time-series forecasting techniques.

The project also provides a web-based dashboard where users can:

- Explore historical petroleum data
- View historical Crack321 trends
- View future Crack321 forecasts
- Compare forecasting model performance
- Access forecasting results through REST APIs

---

## Objectives

The main objectives of this project are:

1. Collect and preprocess historical petroleum market data.
2. Calculate the 3-2-1 refinery crack spread.
3. Analyze historical Crack321 trends.
4. Develop and evaluate time-series forecasting models.
5. Compare different forecasting approaches using MAE and RMSE.
6. Generate future Crack321 forecasts.
7. Build a web application for visualizing the results.
8. Deploy the application using a cloud platform.

---

## Crack321 Calculation

The Crack321 value is calculated using the following formula:

```text
Crack321 =
[(2 × Gasoline × 42) + (Diesel × 42) - (3 × WTI)] / 3
```

Where:

- **Gasoline** = Gasoline price
- **Diesel** = Diesel price
- **WTI** = West Texas Intermediate crude oil price
- **42** = Number of gallons in one barrel

The calculated Crack321 value is used as the target variable for forecasting.

---

## Dataset

The project uses historical petroleum spot-price data.

The main variables used in the project are:

| Variable | Description |
|---|---|
| WTI | West Texas Intermediate crude oil price |
| Brent | Brent crude oil price |
| Gasoline | New York gasoline price |
| Diesel | New York diesel price |
| JetFuel | Jet fuel price |
| Crack321 | Calculated 3-2-1 refinery crack spread |

The processed dataset contains:

- **4,179 observations**
- **Start Date:** 2010-01-04
- **End Date:** 2026-09-22

---

## Data Processing

The following preprocessing steps were performed:

1. Load the raw petroleum price dataset.
2. Convert the date column into a proper date format.
3. Select the required petroleum price variables.
4. Handle missing values.
5. Calculate the Crack321 target variable.
6. Prepare the Crack321 time series for forecasting.
7. Split the time series into training and testing data.
8. Evaluate forecasting models using historical test data.

---

## Exploratory Data Analysis

The project performs exploratory analysis of the Crack321 time series using:

- Historical time-series visualization
- Statistical summaries
- Trend analysis
- Stationarity testing

The **Augmented Dickey-Fuller (ADF)** test was used to examine the stationarity of the Crack321 series.

The original series required first-order differencing for ARIMA modeling.

---

## Forecasting Models

Several forecasting approaches were evaluated.

### 1. Naive Baseline

A persistence-based baseline where the previous observed value is used as the forecast.

### 2. ARIMA

The **Autoregressive Integrated Moving Average (ARIMA)** model was evaluated using different parameter combinations.

The final deployed forecasting model is:

```text
ARIMA(0,1,0)
```

### 3. Prophet

Prophet was evaluated as an alternative time-series forecasting approach.

### 4. LSTM

A Long Short-Term Memory neural network was also evaluated for time-series forecasting.

---

## Model Evaluation

The models were evaluated using:

### Mean Absolute Error (MAE)

MAE measures the average absolute difference between the actual and predicted values.

### Root Mean Squared Error (RMSE)

RMSE measures the square root of the average squared prediction error and gives greater weight to larger errors.

### Model Results

| Model | MAE | RMSE |
|---|---:|---:|
| Naive Baseline | 1.176835 | 1.905956 |
| ARIMA(0,1,0) | 1.176835 | 1.905956 |
| Prophet | 13.582541 | 16.168133 |
| LSTM | 2.775591 | 4.574660 |

The deployed forecasting implementation uses **ARIMA(0,1,0)**.

---

## Future Forecast

The deployed application provides a **30-business-day forecast** of Crack321.

The forecast includes:

- Forecast value
- Lower confidence interval
- Upper confidence interval

The current forecast is generated from the historical Crack321 time series.

### Important Scope

This project forecasts the **3-2-1 refinery crack spread**, not the direct future price of WTI or Brent crude oil.

WTI and refined-product prices are used as inputs in the Crack321 calculation.

---

## System Architecture

```text
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │   Vite + Recharts    │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │   FastAPI Backend    │
                         │      Uvicorn         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌──────────────────┐          ┌──────────────────┐
          │ Historical Data  │          │ Forecast Results │
          │      CSV         │          │       CSV        │
          └────────┬─────────┘          └────────┬─────────┘
                   │                             │
                   └──────────────┬──────────────┘
                                  ▼
                       ┌──────────────────────┐
                       │ Time-Series Model    │
                       │    ARIMA(0,1,0)      │
                       └──────────────────────┘
```

---

## Web Application

The project provides an interactive web application with the following pages.

### 1. Dashboard

The dashboard displays:

- Latest Crack321 value
- Latest observation date
- Forecast model
- Forecast horizon
- Historical Crack321 trend
- Latest WTI price
- Latest Brent price
- Latest gasoline price
- Latest diesel price

### 2. Historical Data

The Historical Data page provides:

- Total observations
- Date range
- Search functionality
- Pagination
- Historical WTI values
- Historical Brent values
- Gasoline values
- Diesel values
- Jet Fuel values
- Crack321 values

### 3. Forecast

The Forecast page displays:

- Forecast model
- Forecast horizon
- Future Crack321 values
- Lower confidence interval
- Upper confidence interval
- Forecast visualization
- Forecast table

### 4. Model Performance

The Model Performance page compares:

- Naive Baseline
- ARIMA(0,1,0)
- Prophet
- LSTM

using:

- MAE
- RMSE

### 5. About / Methodology

The About page explains:

- Project objective
- Crack321 methodology
- Dataset
- Forecasting methodology
- System architecture
- Technologies used

---

## Backend

The backend is implemented using **FastAPI**.

The backend provides REST API endpoints for the frontend.

### API Endpoints

```text
GET /
GET /api/health
GET /api/data/latest
GET /api/data/historical
GET /api/data/statistics
GET /api/data/model-performance
GET /api/forecast
```

### API Functions

| Endpoint | Purpose |
|---|---|
| `/` | Checks that the API is running |
| `/api/health` | Health check |
| `/api/data/latest` | Returns the latest market observation |
| `/api/data/historical` | Returns historical petroleum data |
| `/api/data/statistics` | Returns Crack321 statistics |
| `/api/data/model-performance` | Returns model evaluation results |
| `/api/forecast` | Returns future Crack321 forecasts |

---

## Frontend

The frontend is developed using:

- React
- Vite
- JavaScript
- Axios
- React Router
- Recharts

### Frontend Responsibilities

The frontend:

1. Sends requests to the FastAPI backend.
2. Receives historical and forecast data.
3. Displays market information.
4. Visualizes Crack321 trends.
5. Displays forecast confidence intervals.
6. Provides navigation between project modules.

---

## Technology Stack

### Data Science and Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Statsmodels
- Prophet
- TensorFlow / Keras

### Backend

- FastAPI
- Uvicorn
- Python

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- Recharts

### Development Tools

- Visual Studio Code
- Jupyter Notebook
- Git
- GitHub

### Deployment

- Render

---

## Project Structure

```text
Crude_Oil_Forcasting_Model/
│
├── backend/
│   ├── main.py
│   └── routes/
│       ├── __init__.py
│       ├── data.py
│       └── forecast.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── models/
│   └── final_arima_model.pkl
│
├── notebooks/
│   └── Crude_Oil_Crack321_Forecasting.ipynb
│
├── reports/
│
├── results/
│   ├── model_comparison.csv
│   ├── test_predictions.csv
│   └── future_forecast.csv
│
├── src/
│
├── README.md
├── requirements.txt
├── requirements-deploy.txt
└── .gitignore
```

---

## Running the Backend Locally

First activate the Python virtual environment:

```bash
venv\Scripts\activate
```

Then run the FastAPI server:

```bash
uvicorn backend.main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation will be available at:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Frontend Locally

Move into the frontend directory:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Deployment

The project is deployed using **Render**.

The system uses two deployed services:

### Frontend

The React application is deployed as a Render Static Site.

### Backend

The FastAPI application is deployed as a Render Web Service.

The frontend communicates with the backend through REST APIs.

The backend CORS configuration allows the deployed frontend to communicate with the API.

---

## Live Application

The project has been deployed as a working web application.

### Frontend

**Crack321 Forecast Dashboard**

The deployed frontend provides the Dashboard, Historical Data, Forecast, Model Performance, and About pages.

### Backend

The deployed FastAPI backend provides the REST API endpoints and Swagger documentation.

---

## Results

The completed system provides:

- Historical petroleum market data analysis
- Crack321 calculation
- Crack321 trend visualization
- Time-series model comparison
- ARIMA-based Crack321 forecasting
- 30-business-day future forecast
- Forecast confidence intervals
- Interactive React dashboard
- FastAPI REST APIs
- Cloud deployment

---

## Limitations

The current implementation has several limitations:

1. The forecasting target is Crack321 rather than direct crude-oil prices.
2. The final ARIMA(0,1,0) model produces a persistence-style point forecast.
3. Forecast uncertainty increases as the forecast horizon increases.
4. Petroleum markets are affected by external factors that are not explicitly modeled.
5. The forecast should not be interpreted as a guaranteed future market outcome.
6. The current system uses precomputed forecast results for the deployed web application.

---

## Future Scope

The project can be extended in several ways:

- Direct WTI price forecasting
- Direct Brent price forecasting
- Forecasting multiple petroleum products
- Real-time market-data integration
- Interactive date-based forecasting
- Additional economic indicators
- Crude-oil inventory data
- Refinery utilization data
- Hyperparameter optimization
- Additional machine learning models
- Automated model retraining
- Real-time forecast updates
- Improved frontend analytics
- Database integration

---

## Conclusion

This project demonstrates an end-to-end time-series forecasting system for petroleum market analysis.

Historical petroleum prices are processed to calculate the **3-2-1 refinery crack spread (Crack321)**. Multiple forecasting approaches are evaluated using MAE and RMSE, and ARIMA(0,1,0) is used for the deployed forecasting implementation.

The forecasting results are exposed through a FastAPI backend and presented through an interactive React web application.

The completed system demonstrates the complete workflow:

```text
Data Collection
      ↓
Data Cleaning
      ↓
Crack321 Calculation
      ↓
Exploratory Data Analysis
      ↓
Stationarity Testing
      ↓
Model Development
      ↓
Model Evaluation
      ↓
Future Forecast
      ↓
FastAPI Backend
      ↓
React Frontend
      ↓
Cloud Deployment
```

---

## Author

**Kopal Singh**

BTECH

Crude Oil 3-2-1 Crack Spread Forecasting System