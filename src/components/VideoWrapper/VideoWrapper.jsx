import React from "react";
import Video from "../Video";
import createVTTURL from "../../assets/functions/createVTTURL";
import "./VideoWrapper.scss"

function VideoWrapper ({ show, setShowVideo, url, currentDialogue, project }) {
    return show ? (
        <div className="video-wrapper">
            <div className="video-header text-end w-100">
                <button className="btn btn-transparent" onClick={() => setShowVideo(false)}>
                    <i className="fal fa-times text-light"></i>
                </button>
            </div>
            <div className="video-container">
                <Video
                    videoURL={url}
                    vttURL={createVTTURL(project.subtitles)}
                    currentTime={currentDialogue.start / 1000}
                    className="video-element"
                />
            </div>
        </div>
    ) : null;
}

export default VideoWrapper;