import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {Route} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";

function Home() {
  const [file, setFile] = useState(null);
  const changeHandler = (e) => {
    e.preventDefault();
	setFile(e.target.files[0]);
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
        fetch("/UploadFile", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.text())
        .then((res) => console.log(res));
    }
  }

  return (
    <div className="App">
      <div className='skeleton'>
        <span className='centerAndHalf'>
                Paste a Link: 
                <input type="text"  />
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

export default Home;
