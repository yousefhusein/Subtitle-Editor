import React from "react";
import Navbar from "../components/Navbar/Navbar";

function NotFound () {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="content-wrapper centered text-center">
                <h1 style={{ fontSize: "100px" }}>404</h1>
                <p>This page does not exist!</p>
            </div>
        </div>
    )
}

export default NotFound;