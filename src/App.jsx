import React from "react";
import { Routes, Outlet, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DetailedView from "./components/DetailedView/DetailedView";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

function AppLayout() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="city/:cityName" element={<DetailedView />} />
          <Route path="*" element={<h2> 404 - Page Not Found</h2>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
