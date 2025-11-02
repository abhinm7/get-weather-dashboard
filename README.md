# 🌦️ Get Weather Dashboard

A sleek and responsive weather analytics dashboard built with React, Redux Toolkit, and Recharts. This application allows users to search for cities, save their favorites, and view detailed weather analytics, including current conditions, 5-day forecasts, and interactive charts.

LIVE LINK : https://get-weather-dashboard.onrender.com/

## ✨ Features

* **Live Weather Cards:** A main dashboard showing at-a-glance weather for all your favorite cities.
* **API-Based Search:** An autocomplete search bar that finds cities using the OpenWeatherMap Geocoding API.
* **Persistent Favorites:** Favorite cities are saved to `localStorage`, so they're always there when you come back.
* **C° / F° Toggle:** Instantly convert all temperature data between Celsius and Fahrenheit.
* **Detailed Analytics View:** A dedicated page for each city with in-depth charts and stats.
* **Interactive Charts (via Recharts):**
    * **Hourly Temp:** A line chart showing temperature trends for the next 24 hours.
    * **5-Day Forecast:** A combo chart showing high/low temps (bars) and precipitation chance (line).
    * **Wind Chart:** A line chart for wind speed, with a custom tooltip showing wind direction.

---

## 🛠️ Tech Stack

* **Frontend:** [React](https://reactjs.org/) (with Hooks)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Data Visualization:** [Recharts](https://recharts.org/)
* **API Calls:** [Axios](https://axios-http.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** CSS Modules

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* Node.js (v18 or later recommended)
* `npm` or `yarn`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhinm7/get-weather-dashboard.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd get-weather-dashboard
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```

### 4. Set Up Environment Variables

This project requires an API key from OpenWeatherMap.

1.  Create a free account at [OpenWeatherMap.org](https://openweathermap.org/) and get your API key.
2.  In the root of the project, create a file named `.env`.
3.  Add your API key to this file. (Vite requires the `VITE_` prefix).
    ```
    VITE_OPENWEATHER_API_KEY=your_api_key_goes_here
    ```

### 5. Run the Application

```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the next available port).
