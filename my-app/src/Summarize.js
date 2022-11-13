import React, { useState, useEffect, useRef } from 'react'
import {Button, input} from "@blueprintjs/core";
import './App.css';

function Summarize(props) {
    const [text, setText] = useState(props?.text);
    const [results, setResults] = useState(null);
    const changeHandler = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    const handleSummarize = (e) => {
        if(text){
            fetch("/summarizeText", {
                method: "POST",
                body: JSON.stringify({
                    "text": text
                }),
            })
                .then((res) => res.json())
                .then((res) => {console.log(res["result"]); setResults(res['result'])});
        }
    }

    return (
        <div className='displayFlex'>
            <div className='row'>
            <h2>Text to Summarize:</h2>
            </div>
            <div>
                <textarea
                    value={text}
                    onChange={changeHandler}
                    className={'textarea'}
                />
            </div>
            <div >
                <Button onClick={handleSummarize}>Summarize</Button>
            </div>
            <div>{results}</div>
        </div>
    );
}

export default Summarize;
