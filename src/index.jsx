import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import MDB5 files
import "mdb-ui-kit/js/mdb.min.js";
import "mdb-ui-kit/css/mdb.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
    	<App />
  	</React.StrictMode>
);
