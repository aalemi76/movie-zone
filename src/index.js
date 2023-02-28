import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Pagination from "./components/pagination";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Pagination
      count={12}
      pageSize={4}
      currentPage={1}
      onPageChange={(page) => console.log(page)}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
