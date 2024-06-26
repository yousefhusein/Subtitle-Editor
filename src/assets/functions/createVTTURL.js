import { compile as toVTT } from "node-webvtt";

export default function createVTTURL (dialogues) {
    const parseDialogue = (x) => {
        let startSeconds = x.start / 1000;
        let endSeconds = x.end / 1000;
        
        if (startSeconds >= endSeconds) {
            endSeconds += 0.01;
        }

        return {
            identifier: "1",
            start: startSeconds,
            end: endSeconds,
            text: x.text,
            styles: x.styles || ""
        }
    }
    const payload = {
        meta: {
            Kind: 'captions'
        },
        cues: dialogues.map(parseDialogue),
        valid: true
    }

    let fileContent;

    try {
        fileContent = toVTT(payload);
    } catch (error) {
        alert(error)
    }

    /* Creating a new Blob object. */
    const blob = new Blob([fileContent], {
        type: "application/x-vtt;charset=UTF-8"
    });
    
    return URL.createObjectURL(blob);
}