import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";
import loading from './IncomparableConventionalIchneumonfly-size_restricted.gif'

function Home(props) {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
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
        console.log(file)
        // Create new file so we can rename the file
        let blob = localfile.slice(0, localfile.size, localfile.type);
        let newFile = new File([blob], localfile.name, { type: localfile.type });
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        let formData = new FormData();
        formData.append("filename", newFile);
        setIsOpen(true);
        fetch("/uploadFile", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((res) => {setIsOpen(false);props.setText(res['body']);navigate("/summarize");})
        .catch((error) => {setIsOpen(false);console.log(error)})
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
            .then((res) => res.json())
            .then((res) => {props.setText(res.result);navigate("/summarize");})
            .catch((error) => console.log(error))      }
  }

  if(isOpen){
    return (<div className='App'>
        <img src={loading}  />
        </div>);
  }
  else{
    return (<div className="App">
    <div className='skeleton'>
      <span className='centerAndHalf'>
              Paste a YouTube link:
              <input type="text"  onChange={changeTextHandler}/>
      </span>
      <span className='centerAndHalf'>
          Upload a video:
          <input type="file" onChange={changeHandler} />
      </span>
    </div>
    <div className='nose'>
      <Button onClick={handleTranscribe}>Transcribe</Button>
    </div>
  </div>)
  }
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
