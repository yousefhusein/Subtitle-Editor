import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Editor from "../../components/Editor/Editor";
import Dialogues from "../../components/Dialogues";
import "./Project.scss"

function Project ({ projects }) {
    const [project] = useState(projects.getProject(useParams().projectID));
    const [currentDialogue, setCurrentDialogue] = useState(project ? project.currentDialogue : null);
    const [dialogues, setDialogues] = useState(project ? project.subtitles : null);
    const navigate = useNavigate();

    useEffect(() => {
        if (project) {
            project.updateSubtitle(currentDialogue);
            project.setCurrentDialogue(currentDialogue.number);
            try {
                document.getElementById("dialogueEditor").focus();
            } catch {}
        } else {
            navigate("/404");
        }
    }, [currentDialogue]);

    return (
        <div className="wrapper project-page">
            <Navbar showControls={true} project={project} />
            <div className="content-wrapper container">
                <div className="editor-wrapper h-100">
                    <div className="editor-header">
                        {<Editor currentDialogue={currentDialogue} setCurrentDialogue={setCurrentDialogue} project={project} setDialogues={setDialogues} />}
                    </div>
                    <div className="editor-content">
                        {<Dialogues currentDialogue={currentDialogue} setCurrentDialogue={setCurrentDialogue} dialogues={dialogues} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;