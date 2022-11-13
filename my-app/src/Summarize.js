import React, { useState, useEffect, useRef } from 'react'
import {Button, input} from "@blueprintjs/core";

function Summarize() {
    const [text, setText] = useState(null);
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
                .then((res) => res.text())
                .then((res) => {console.log(res); setResults(res.result)});
        }
    }

    return (
        <div className="App">
            <div className='skeleton'>
        <span className='centerAndHalf'>
                Text to Summarize:<textarea
                                    rows={10}

                                    cols={150}
                                    onChange={changeHandler}
        />
        </span>

            </div>
            <div className='nose'>
                <Button onClick={handleSummarize}>Summarize</Button>
            </div>
            <div>{results}</div>
        </div>
    );
}

export default Summarize;
