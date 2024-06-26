import Project from "./Project";

const LOCAL_STORAGE_KEY = "subtitle.js_projects_list";
const LOCAL_STORAGE = localStorage;

export default class Projects {
    constructor (options = {}) {
        this.projectsList = [];
        this.localStorage = LOCAL_STORAGE;
        this.localStorageKey = LOCAL_STORAGE_KEY;

        if (Array.isArray(options.projectsList)) {
            options.projectsList.forEach(x => {
                this.projectsList.push(new Project(this, x));
            });
        }
    }

    getProject (id) {
        return this.projectsList.find((x) => x.projectID === id);
    }

    createProject (data) {
        const project = new Project(this, {
            projectID: data.projectID,
            fileName: data.fileName,
            fileType: data.fileType,
            subtitles: data.subtitles || [],
            currentDialogue: data.currentDialogue
        });

        this.projectsList = this.projectsList.filter(x => x.projectID !== data.projectID);
        this.projectsList.push(project);
        this.save();

        return project;
    }

    updateProject (project) {
        const projectIdx = this.projectsList.findIndex(x => x.fileName === project.fileName);
        if (projectIdx !== -1) {
            this.projectsList[projectIdx] = project;
            this.save();
        }
    }

    deleteProject (project) {
        const index = this.projectsList.findIndex((x) => x.id === project.id);
        if (index !== -1) { this.projectsList.splice(index, 1); }
        this.save();
    }

    toJSON () {
        return {
            projectsList: this.projectsList.map(x => x.toJSON())
        }
    }

    static fromLocalStorage () {
        const stringJSON = LOCAL_STORAGE.getItem(LOCAL_STORAGE_KEY);
        if (stringJSON) {
            try {
                const data = JSON.parse(stringJSON); 
                return new Projects(data);
            } catch {}
        }
    }

    save () {
        this.localStorage.setItem(this.localStorageKey, JSON.stringify(this.toJSON()));
    }
}