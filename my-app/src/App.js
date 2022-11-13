import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import { Alignment, Text, Classes, input, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, FormGroup, Button } from "@blueprintjs/core";
import Home from './Home'
import Summarize from './Summarize'

function App() {
  return (
    <div>      
    <Navbar>
    <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Lectures are Boring</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="home" text="Transcribe" href={"/"}/>
        <Button className={Classes.MINIMAL} icon="document" text="Summarize" href={"/summarize"}/>
    </NavbarGroup>
  </Navbar>

    <Routes>
        <Route exact path="/" element={<Home />} />
      <Route exact path="/summarize" element={<Summarize />} />
    </Routes>
    </div>
  );
}

export default App;
