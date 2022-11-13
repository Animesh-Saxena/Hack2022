import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {Route} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";

function Home() {
  const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
  const changeHandler = (e) => {
    e.preventDefault();
	setFile(e.target.files[0]);
	};
    const changeTextHandler = (e) => {
        e.preventDefault();
        setText(e.target.value);
        validateYouTubeUrl(text); // can you have some variable that displays a warning if this doesn't return true
    };

  const handleTranscribe = (e) => {
    if(file){
        let localfile = file;
        // Create new file so we can rename the file
        let blob = localfile.slice(0, localfile.size, "image/jpeg");
        let newFile = new File([blob], `post.jpeg`, { type: "image/jpeg" });
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        let formData = new FormData();
        formData.append("filename", newFile);
        fetch("/uploadFile", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.text())
        .then((res) => console.log(res)); // take this to the next page
    } else if (validateYouTubeUrl(text)) {
        let start = text.indexOf('=') + 1;
        let end = text.indexOf('&');
        if (end === -1){
            end = text.length
        }
        console.log(text.slice(start, end));
        fetch("/caption", {
            method: "POST",
            body: JSON.stringify({
                "id": text.slice(start, end)
            }),
        })
            .then((res) => res.text())
            .then((res) => console.log(res)); // take this to the next page, the result is in 'result' field
      }
  }

  return (
    <div className="App">
      <div className='skeleton'>
        <span className='centerAndHalf'>
                Paste a Link: 
                <input type="text"  onChange={changeTextHandler}/>
        </span>
        <span className='centerAndHalf'>
            Choose:
            <input type="file" onChange={changeHandler} />
        </span>
      </div>
      <div className='nose'>
        <Button onClick={handleTranscribe}>Transcribe</Button>
      </div>
    </div>
  );
}

function validateYouTubeUrl(text)
{
    if (text !== undefined || text !== '') {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        const match = text.match(regExp);
        return (match && match[2].length === 11)
    }
}

export default Home;
