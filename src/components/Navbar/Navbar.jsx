import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toAss, toSrt, toSsa } from "subtitle.js";
import Swal from "sweetalert2";
import download from "../../assets/functions/download";
import pkg from "../../../package.json";
import "./Navbar.scss"

function Navbar ({ showControls, project }) {
    const navigate = useNavigate();
	const handleToggleTheme = () => {
		const currentTheme = localStorage["subtitle.js_theme"] === "dark" ? "light" : "dark";
		const rootElement = document.getElementById("root");
		if (rootElement) {
			localStorage.setItem("subtitle.js_theme", currentTheme);
			rootElement.classList.remove("dark-theme", "light-theme");
			rootElement.classList.add(currentTheme + "-theme");
		}
	}
	const handleDownload = () => {
		Swal.fire({
			title: "File options",
			html: `<div class="d-flex">
					<input type="text" class="form-control rounded-0" id="file-name" value="${project.fileName}" />
					<select class="form-select rounded-0" style="width: 80px" id="file-extension">
						<option value="ass" ${project.fileType === "ass" ? "selected" : ""}>ASS</option>
						<option value="srt" ${project.fileType === "srt" ? "selected" : ""}>SRT</option>
						<option value="ssa" ${project.fileType === "ssa" ? "selected" : ""}>SSA</option>
					</select>
					</div>`,
			focusConfirm: true,
			confirmButtonText: "Download",
			preConfirm: () => {
				let fileName = document.getElementById("file-name").value;
				let fileExtension = document.getElementById("file-extension").value;
				let handle = fileExtension === "srt" ? toSrt : fileExtension === "ssa" ? toSsa : toAss;
				let fileContent = handle(project.subtitles.map(x => x));

				if (fileContent) {
					let blob = new Blob([fileContent], {
						type: `application/x-${fileExtension};charset=utf-8`
					});
					
					download(window.URL.createObjectURL(blob), `${fileName}.${fileExtension}`);
				}
			}
		});
	}

	const handleDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(result => {
			if (result.isConfirmed) {
				project.destroy();
				navigate("/");
			}
		});
	}

    return (
        <nav className="navbar navbar-expand shadow-0">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-book me-1"></i> LinguaSub v{pkg.version}
                </Link>
                {showControls ? (
                    <div className="d-flex gap-1">
						<button className="btn btn-light btn-floating shadow-0" onClick={handleToggleTheme}>
							<i className="fas fa-moon"></i>
						</button>

                        <button className="btn btn-primary btn-floating shadow-0" onClick={handleDownload}>
                            <i className="fas fa-download"></i>
                        </button>

                        <button className="btn btn-danger btn-floating shadow-0" onClick={handleDelete}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ) : ""}
            </div>
        </nav>
    )
}

export default Navbar;