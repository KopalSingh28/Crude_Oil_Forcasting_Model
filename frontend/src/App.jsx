import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import "./App.css";


function Dashboard() {
  const [latest, setLatest] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("https://crude-oil-forcasting-model.onrender.com/api/data/latest"),
      axios.get("https://crude-oil-forcasting-model.onrender.com/api/data/historical"),
    ])
      .then(([latestResponse, historicalResponse]) => {
        setLatest(latestResponse.data);

        const chartData = historicalResponse.data.map((row) => ({
          date: row.Date,
          crack321: Number(row.Crack321),
        }));

        setHistoricalData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1>Crack321 Forecast Dashboard</h1>

      <p>
        Historical analysis and forecasting of the 3-2-1 refinery
        crack spread.
      </p>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : latest ? (
        <>
          <div className="cards">
            <div className="card">
              <h3>Latest Crack321</h3>
              <p className="value">
                {Number(latest.Crack321).toFixed(3)}
              </p>
            </div>

            <div className="card">
              <h3>Latest Date</h3>
              <p className="value">{latest.date}</p>
            </div>

            <div className="card">
              <h3>Forecast Model</h3>
              <p className="value">ARIMA(0,1,0)</p>
            </div>

            <div className="card">
              <h3>Forecast Horizon</h3>
              <p className="value">30 Days</p>
            </div>
          </div>

          <h2>Historical Crack321 Trend</h2>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  minTickGap={30}
                />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    Number(value).toFixed(3),
                    "Crack321",
                  ]}
                />

                <ReferenceLine
                  y={Number(latest.Crack321)}
                  stroke="#64748b"
                  strokeDasharray="5 5"
                />

                <Line
                  type="monotone"
                  dataKey="crack321"
                  stroke="#0f172a"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <h2>Latest Market Variables</h2>

          <div className="cards">
            <div className="card">
              <h3>WTI</h3>
              <p className="value">
                {Number(latest.WTI).toFixed(3)}
              </p>
            </div>

            <div className="card">
              <h3>Brent</h3>
              <p className="value">
                {Number(latest.Brent).toFixed(3)}
              </p>
            </div>

            <div className="card">
              <h3>Gasoline NY</h3>
              <p className="value">
                {Number(latest.Gasoline_NY).toFixed(3)}
              </p>
            </div>

            <div className="card">
              <h3>Diesel NY</h3>
              <p className="value">
                {Number(latest.Diesel_NY).toFixed(3)}
              </p>
            </div>
          </div>
          <div className="info-section">
  <h2>Forecast Summary</h2>

  <p>
    The application uses ARIMA(0,1,0) to generate a
    30-business-day Crack321 forecast. The current point
    forecast is based on the latest available observation,
    while the forecast interval provides lower and upper
    bounds that widen over the forecast horizon.
  </p>
</div>
        </>
      ) : (
        <p>Unable to load dashboard data.</p>
      )}
    </div>
  );
}


function Historical() {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 20;

  useEffect(() => {
    axios
      .get("https://crude-oil-forcasting-model.onrender.com/api/data/historical")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((row) =>
    row.Date.toLowerCase().includes(searchDate.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="page">
      <h1>Historical Data</h1>

      <p>
        Historical petroleum price data and calculated Crack321 values
        from the processed dataset.
      </p>

      {loading ? (
        <p>Loading historical data...</p>
      ) : (
        <>
          <div className="cards">
            <div className="card">
              <h3>Total Observations</h3>
              <p className="value">{data.length}</p>
            </div>

            <div className="card">
              <h3>Displayed Records</h3>
              <p className="value">{filteredData.length}</p>
            </div>

            <div className="card">
              <h3>Start Date</h3>
              <p className="value">
                {data.length > 0 ? data[0].Date : "-"}
              </p>
            </div>

            <div className="card">
              <h3>End Date</h3>
              <p className="value">
                {data.length > 0
                  ? data[data.length - 1].Date
                  : "-"}
              </p>
            </div>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by date, e.g. 2026-09"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>WTI</th>
                  <th>Brent</th>
                  <th>Gasoline NY</th>
                  <th>Diesel NY</th>
                  <th>Jet Fuel</th>
                  <th>Crack321</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{Number(row.WTI).toFixed(3)}</td>
                    <td>{Number(row.Brent).toFixed(3)}</td>
                    <td>{Number(row.Gasoline).toFixed(3)}</td>
                    <td>{Number(row.Diesel).toFixed(3)}</td>
                    <td>{Number(row.JetFuel).toFixed(3)}</td>
                    <td>{Number(row.Crack321).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


function Forecast() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://crude-oil-forcasting-model.onrender.com/api/forecast")
      .then((response) => {
        setForecastData(response.data.forecast);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1>Crack321 Forecast</h1>

      <p>
        30-business-day forecast generated using ARIMA(0,1,0).
      </p>

      {loading ? (
        <p>Loading forecast...</p>
      ) : forecastData.length > 0 ? (
        <>
          <div className="cards">
            <div className="card">
              <h3>Model</h3>
              <p className="value">ARIMA(0,1,0)</p>
            </div>

            <div className="card">
              <h3>Forecast Horizon</h3>
              <p className="value">30 Days</p>
            </div>

            <div className="card">
              <h3>First Forecast</h3>
              <p className="value">
                {forecastData[0].forecast.toFixed(3)}
              </p>
            </div>
          </div>

          <h2>Forecast Trend</h2>

          <div className="chart-container">
            <div className="chart-container">
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={forecastData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="date"
        tick={{ fontSize: 11 }}
        minTickGap={25}
      />

      <YAxis />

      <Tooltip
        formatter={(value, name) => [
          Number(value).toFixed(3),
          name,
        ]}
      />

      <Line
        type="monotone"
        dataKey="upper"
        name="Upper Bound"
        stroke="#94a3b8"
        strokeWidth={1.5}
        strokeDasharray="5 5"
        dot={false}
      />

      <Line
        type="monotone"
        dataKey="forecast"
        name="Forecast"
        stroke="#0f172a"
        strokeWidth={3}
        dot={false}
      />

      <Line
        type="monotone"
        dataKey="lower"
        name="Lower Bound"
        stroke="#94a3b8"
        strokeWidth={1.5}
        strokeDasharray="5 5"
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
          </div>

          <h2>Forecast Values</h2>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Forecast</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                </tr>
              </thead>

              <tbody>
                {forecastData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{Number(row.forecast).toFixed(3)}</td>
                    <td>{Number(row.lower).toFixed(3)}</td>
                    <td>{Number(row.upper).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Unable to load forecast data.</p>
      )}
    </div>
  );
}


function Performance() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://crude-oil-forcasting-model.onrender.com/api/data/model-performance")
      .then((response) => {
        setModels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching model performance:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1>Model Performance</h1>

      <p>
        Comparison of forecasting models evaluated on the
        Crack321 test dataset using MAE and RMSE.
      </p>

      {loading ? (
        <p>Loading model performance...</p>
      ) : models.length > 0 ? (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>MAE</th>
                  <th>RMSE</th>
                </tr>
              </thead>

              <tbody>
                {models.map((model, index) => (
                  <tr key={index}>
                    <td>{model.Model}</td>
                    <td>{Number(model.MAE).toFixed(6)}</td>
                    <td>{Number(model.RMSE).toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Metric Definitions</h2>

          <div className="metric-cards">
            <div className="card">
              <h3>MAE</h3>
              <p>
                Mean Absolute Error measures the average absolute
                difference between actual and predicted values.
              </p>
            </div>

            <div className="card">
              <h3>RMSE</h3>
              <p>
                Root Mean Squared Error measures prediction error
                while giving greater weight to larger errors.
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Unable to load model performance.</p>
      )}
    </div>
  );
}


function About() {
  return (
    <div className="page">
      <h1>About the Project</h1>

      <p>
        This project is a crude oil forecasting system designed to
        analyze the 3-2-1 refinery crack spread and generate short-term
        forecasts using time-series forecasting techniques.
      </p>

      <h2>Project Objective</h2>

      <p>
        The main objective is to transform petroleum market data into
        a calculated Crack321 indicator, analyze its historical behavior,
        compare forecasting models, and provide a 30-business-day forecast.
      </p>

      <h2>What is the 3-2-1 Crack Spread?</h2>

      <p>
        The 3-2-1 crack spread is a commonly used refinery-margin
        indicator. It represents the approximate difference between
        the value of refined petroleum products and the cost of crude oil.
      </p>

      <p>
        In this project, the Crack321 value is calculated using:
      </p>

      <div className="formula">
        Crack321 = (
        2 × Gasoline_NY × 42
        + Diesel_NY × 42
        - 3 × WTI
        ) / 3
      </div>

      <h2>Dataset</h2>

      <p>
        The project uses historical petroleum price data containing
        WTI, Brent, gasoline, diesel, and jet fuel prices.
        The processed dataset contains observations from 2010 to 2026.
      </p>

      <h2>Data Processing</h2>

      <p>
        The raw petroleum price data is cleaned and transformed before
        forecasting. The Crack321 indicator is calculated from the
        relevant petroleum price variables and used as the target
        time series.
      </p>

      <h2>Forecasting Models</h2>

      <p>
        Multiple forecasting approaches were evaluated on the Crack321
        test dataset:
      </p>

      <ul className="about-list">
        <li>Naive Baseline</li>
        <li>ARIMA(0,1,0)</li>
        <li>Prophet</li>
        <li>LSTM</li>
      </ul>

      <h2>Model Evaluation</h2>

      <p>
        The models are evaluated using Mean Absolute Error (MAE) and
        Root Mean Squared Error (RMSE). These metrics measure the
        difference between the predicted and actual Crack321 values.
      </p>

      <h2>Forecasting</h2>

      <p>
        The application provides a 30-business-day Crack321 forecast
        together with lower and upper confidence bounds.
      </p>

      <h2>Technology Stack</h2>

      <ul className="about-list">
        <li>Python</li>
        <li>Pandas</li>
        <li>Statsmodels</li>
        <li>FastAPI</li>
        <li>React</li>
        <li>Axios</li>
        <li>React Router</li>
        <li>Recharts</li>
      </ul>

      <h2>System Architecture</h2>

      <div className="architecture">
        <div className="architecture-box">React Frontend</div>
        <div className="arrow">↓</div>
        <div className="architecture-box">FastAPI Backend</div>
        <div className="arrow">↓</div>
        <div className="architecture-box">ML Models + Data</div>
        <div className="arrow">↓</div>
        <div className="architecture-box">CSV / Results</div>
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <div className="logo">
          Crack321 Forecast
        </div>

        <div className="nav-links">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/historical">
            Historical Data
          </Link>

          <Link to="/forecast">
            Forecast
          </Link>

          <Link to="/performance">
            Model Performance
          </Link>

          <Link to="/about">
            About
          </Link>

        </div>

      </nav>


      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/historical"
          element={<Historical />}
        />

        <Route
          path="/forecast"
          element={<Forecast />}
        />

        <Route
          path="/performance"
          element={<Performance />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;