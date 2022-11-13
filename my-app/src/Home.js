import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";

function Home(props) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const changeHandler = (e) => {
    e.preventDefault();
	setFile(e.target.files[0]);
	};

  const handleTranscribe = (e) => {
    if(file){
        let localfile = file;
        console.log(file)
        // Create new file so we can rename the file
        let blob = localfile.slice(0, localfile.size, localfile.type);
        let newFile = new File([blob], localfile.name, { type: localfile.type });
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        let formData = new FormData();
        formData.append("filename", newFile);
        fetch("/uploadFile", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((res) => {props.setText(res['body']);navigate("/summarize");})
        .catch((error) => console.log(error))
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
