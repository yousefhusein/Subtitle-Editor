import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";

function Home ({ projects }) {
    const navigate = useNavigate();

    const handleChange = (event) => {
        navigate("/projects/" + event.target.value);
    }

    return (
        <div className="wrapper home-page">
            <Navbar />
            <div className="content-wrapper centered">
                <div className="container">
                    <h1>Customize Your Subtitles with <span className="text-danger">LinguaSub</span></h1>

                    <div className="d-flex flex-wrap gap-1 w-100">
                        <Link to="/new-project" className="btn btn-danger">New Project</Link>
                        <select className="form-select" defaultValue="none" onChange={handleChange}>
                            <option disabled={true} value="none">Select A Project</option>
                            {projects.projectsList.map((project, index) => (
                                <option key={index} value={project.projectID}>{project.fileName}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;