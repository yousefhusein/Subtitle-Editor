import { Dialogue, fromArr } from "subtitle.js";
import { v4 as UUIDv4 } from "uuid";

export default class Project {
    constructor (projects, data) {
        this.projects = projects;
        this.projectID = data.projectID || UUIDv4();
        this.fileName = data.fileName;
        this.fileType = data.fileType;
        this.subtitles = [];

        if (Array.isArray(data.subtitles)) {
            fromArr(data.subtitles).forEach(x => this.subtitles.push(x));
        }

        if (!this.subtitles.length) {
            this.addSubtitle(new Dialogue({
                text: "",
                startTime: 0,
                endTime: 1200,
                number: 1
            }));
        }

        this.currentDialogue = data.currentDialogue ? this.subtitles[data.currentDialogue - 1] : this.subtitles[0];
    }

    addSubtitle (subtitle) {
        this.subtitles.push(subtitle);
        this.projects.updateProject(this);
    }
    
    setCurrentDialogue (number) {
        this.currentDialogue = this.subtitles.find((x) => x.number === number);
        this.projects.updateProject(this);
    }

    updateSubtitle (subtitle) {
        const subtitleIdx = this.subtitles.findIndex(x => x.number === subtitle.number);
        if (subtitleIdx !== -1) {
            this.subtitles[subtitleIdx] = subtitle;
            this.projects.updateProject(this);
        }
    }

    removeSubtitle (subtitle) {
        this.subtitles = this.subtitles.filter(x => x.number !== subtitle.number);
        this.projects.updateProject(this);
    }

    map (callbackfn) {
        return this.subtitles.map(callbackfn);
    }

    destroy () {
        this.projects.deleteProject(this);
    }

    toJSON () {
        return {
            projectID: this.projectID,
            subtitles: this.subtitles.map(x => x.toJSON()),
            fileName: this.fileName,
            fileType: this.fileType,
            currentDialogue: this.currentDialogue ? this.currentDialogue.number : 0
        }
    }
}