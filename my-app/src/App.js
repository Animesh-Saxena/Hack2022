import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";
import Home from './Home'
import Summarize from './Summarize'

function App() {
  const navigate = useNavigate()
  const [text, setText] = useState("");
  return (
    <div>      
    <Navbar>
    <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Lectures are Boring</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="home" text="Transcribe" onClick={(e) => {
          e.preventDefault();
            navigate("/");
        }}/>
        <Button className={Classes.MINIMAL} icon="document" text="Summarize" onClick={(e) => {
            e.preventDefault();
            navigate("/summarize");
        }}/>
    </NavbarGroup>
  </Navbar>

    <Routes>
        <Route exact path="/" element={<Home setText={setText}/>} />
      <Route exact path="/summarize" element={<Summarize text={text}/>} />
    </Routes>
    </div>
  );
}

export default App;
