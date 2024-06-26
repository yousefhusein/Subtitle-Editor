import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { fromAss, fromSrt, fromSsa } from "subtitle.js";
import { useNavigate } from "react-router-dom";
import "./NewProject.scss";

const acceptFiles = ["srt", "ssa", "ass"];

function NewProject ({ projects }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const [filePath, setFilePath] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileExtension, setFileExtension] = useState("");
    
    const navigate = useNavigate();

    const handleChange = (event) => {
        const uploadedFile = event.target.files[0];
        
        if (uploadedFile) {
            let matched = uploadedFile.name.match(/^(.+)\.([a-z0-9]+)$/);
            if (!matched[2] || !acceptFiles.includes(matched[2])) {
                setErrorMessage(`An invalid file type was provided [.${matched[2]}]. file type must be one of ${acceptFiles.join(",")}`);
                setFileName("");
                setFilePath("");
                setFileExtension("");
                setFile(null);
            } else {
                setFileName(matched[1])
                setFileExtension(matched[2]);
                setErrorMessage("");
                setFile(uploadedFile);
            }
        }
    }

    const handleClick = () => {
        if (!errorMessage && file) {
            const convert = fileExtension === "srt" ? fromSrt : fileExtension === "ass" ? fromAss : fromSsa;
            const fileReader = new FileReader();

            fileReader.readAsText(file, "UTF-8");
            fileReader.addEventListener("load", (e) => {
                const project = projects.createProject({
                    fileName: fileName,
                    fileType: fileExtension,
                    subtitles: convert(e.target.result)
                });
                
                navigate("/projects/" + project.projectID);
            });
        }
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content-wrapper centered">
                <div className="container d-flex justify-content-center">
                    <form className="card project-card" onSubmit={event => event.preventDefault()}>
                        <div className="card-header fw-bold text-center text-uppercase">Project Form</div>
                        <div className="card-body text-start">
                            <div className="form-group">
                                <label>Subtitle File</label>
                                <input
                                    type="file"
                                    value={filePath}
                                    className={"form-control" + (errorMessage ? " is-invalid" : "")}
                                    accept={acceptFiles.map((x) => `.${x}`).join(",")}
                                    onChange={event => {
                                        setFilePath(event.target.value);
                                        setErrorMessage("");
                                        handleChange(event);
                                    }}
                                />
                                <div className="invalid-feedback">{errorMessage}</div>
                            </div>
                            
                            <div className="form-group mt-5 mt-lg-4">
                                <label>Project Name</label>
                                <input type="text" value={fileName} className="form-control" onChange={event => setFileName(event.target.value)} />
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary" disabled={!filePath || !filePath || !!errorMessage} onClick={handleClick}>Create</button>
                                <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProject;