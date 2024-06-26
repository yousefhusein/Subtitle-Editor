import React, { useEffect, useState } from "react";
import translate from "../../assets/functions/translate";
import selectFile from "../../assets/functions/selectFile";
import VideoWrapper from "../VideoWrapper/VideoWrapper";
import "./Editor.scss"; 

function Editor ({ currentDialogue, setCurrentDialogue, project, setDialogues }) {
	const [dialogue, setDialogue] = useState(currentDialogue.clone());
	const [videoURL, setVideoURL] = useState("");
	const [showVideo, setShowVideo] = useState(false);
	const [dialogues] = useState(project.subtitles);

	const videoClick = () => {
		if (!videoURL) {
			selectFile("video/*", (files) => {
				setVideoURL(URL.createObjectURL(files[0]));
				setShowVideo(true);
			});
		} else {
			setShowVideo(!showVideo);
		}
	}

	const translateClick = () => {
		translate(dialogue.text, "auto", "en").then(result => {
			if (result && !result.errors) {
				setDialogue(dialogue.setText(result.text));
			}
		});
	}

	const switchDialogue = (x = 0) => {
		let index = dialogue.number + (x - 1);
		if (dialogues[index]) {
			project.updateSubtitle(dialogue);
			setDialogues(project.subtitles);
			setCurrentDialogue(dialogues[index]);
		}
	}

	useEffect(() => {
		setDialogue(currentDialogue.clone());
	}, [currentDialogue]);

	return (
		<div className="dialogue-editor">
			<VideoWrapper
				currentDialogue={currentDialogue}
				project={project}
				url={videoURL}
				show={showVideo}
				setShowVideo={setShowVideo}
			/>
			
			<div className="d-flex justify-content-between w-100 overflow-auto mb-1">
				<div className="current-dialogue-number">{dialogue.number}</div>
				<div className="shadow-0 rounded-1 w-100 overflow-auto d-flex gap-1">
					{/* Buttons */}
					<button className="btn btn-success btn-floating shadow-0" onClick={() => setCurrentDialogue(dialogue.clone())}>
						<i className="fas fa-save"></i>
					</button>

					<button className="btn btn-danger btn-floating shadow-0" onClick={videoClick}>
						<i className="fas fa-play"></i>
					</button>

					<button className="btn btn-primary btn-floating shadow-0" onClick={translateClick}>
						<i className="fas fa-text"></i>
					</button>

					{/* Time Inputs */}
					<input 
						type="text"
						className="form-control current-dialogue-timeinput"
						onInput={event => setDialogue(dialogue.setStartTime(event.target.value))}
						defaultValue={dialogue.start.toString()}
					/>
					
					<input
						type="text"
						className="form-control current-dialogue-timeinput"
						onInput={event => setDialogue(dialogue.setEndTime(event.target.value))}
						defaultValue={dialogue.end.toString()}
					/>
				</div>
				<div className="btn-group shadow-0">
					<button className="btn btn-primary" onClick={() => switchDialogue(-1)}>
						<i className="fas fa-angle-left"></i>
					</button>
					<button className="btn btn-primary" onClick={() => switchDialogue(+1)}>
						<i className="fas fa-angle-right"></i>
					</button>
				</div>
			</div>

			<div className="d-flex flex-column w-100">
				<textarea
					id="dialogueEditor"
					dir="auto"
					onInput={event => setDialogue(dialogue.setText(event.target.value))}
					value={dialogue.text}
					rows="2"
					className="form-control rounded-0"
					placeholder="Subtitle Text"
				>{dialogue.text}</textarea>
			</div>
		</div>
	)
}

export default Editor;