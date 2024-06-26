import React from "react";

function Video ({ videoURL, vttURL, className, currentTime }) {
    const handleRef = (videoEl) => {
        if (videoEl && currentTime) {
            videoEl.currentTime = currentTime
        }
    }

    return (
        <video ref={handleRef} className={className} controls>
            {videoURL ? <source src={videoURL} /> : ""}
            {vttURL ? <track label="subtitles" kind="subtitles" src={vttURL} default /> : ""}
        </video>
    )
}

export default Video;