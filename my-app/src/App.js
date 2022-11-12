import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import { Alignment, Button, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup } from "@blueprintjs/core";

function App() {

  const changeHandler = (e) => {
    e.preventDefault();
    let reader = new FileReader();
		let file = e.target.files[0];
    console.log(URL.createObjectURL(file))

		reader.onloadend = () => {
      console.log(reader.result)
		}
		reader.readAsDataURL(file);

	};

  const onSubmit = (e) => {
    
  }

  return (
    <div className="App">
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Blueprint</NavbarHeading>
            <NavbarDivider />
            <Button className={Classes.MINIMAL} icon="home" text="Home" />
            <Button className={Classes.MINIMAL} icon="document" text="Files" />
        </NavbarGroup>
      </Navbar>

      <h2>Upload a Video to Transcribe/Summarize</h2>
      <form onSubmit={onSubmit}>
        <label> 
          Select Video to upload:   
          <input type="file" name="file" onChange={changeHandler} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
