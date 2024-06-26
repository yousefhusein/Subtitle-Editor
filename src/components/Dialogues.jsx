import React from "react";
import { Virtuoso } from "react-virtuoso";
import Dialogue from "./Dialogue/Dialogue";

function Dialogues({ currentDialogue, setCurrentDialogue, dialogues }) {
    return (
        <Virtuoso
            totalCount={dialogues.length}
            initialScrollTop={(currentDialogue.number - 1) * 69.045}
            id="dialogues"
            itemContent={(index) => {
                let dialogue = dialogues[index];
                return (
                    <Dialogue
                        data={dialogue}
                        key={index}
                        selected={currentDialogue.number === dialogue.number}
                        onClick={() => setCurrentDialogue(dialogue)}
                    />
                );
            }}
        />
    );
}

export default Dialogues;
