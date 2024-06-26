import React from "react";
import "./Dialogue.scss";

function Dialogue({ data, selected, onClick }) {
	return (
		<div className="subtitle ripple my-1" role="button" onClick={onClick} aria-selected={selected}>
			<div className="subtitle-number">
				<small className="fw-bold text-primary">{data.number}</small>
			</div>
			<div className="w-100 overflow-hidden">
				<div className="subtitle-text" dir="auto">{data.text || (<span className="text-muted">No Text!</span>)}</div>
				<div className="subtitle-times">{data.start.toString()} ---&gt; {data.end.toString()}</div>
			</div>
		</div>
	)
}

export default Dialogue;