import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MdContentCopy, MdFaceRetouchingOff } from "react-icons/md";
import 'mathlive';
import toast, { Toaster } from 'react-hot-toast';



function App() {
  var mfRef = useRef();
  var latexContainerRef = useRef();
  var [latex, setLatex] = useState("");
  useEffect(() => {
    document.getElementById('mf').setOptions({
      virtualKeyboardMode: "manual",
      virtualKeyboardLayout: 'dvorak'
    });
    mfRef.current.addEventListener("input", (event) => {
      setLatex(mfRef.current.value);
      latexContainerRef.current.value = event.target.value
    })
    latexContainerRef.current.addEventListener("input", (event)=>{
      mfRef.current.setValue(event.target.value);
    })
  }, [])
  function copyLatex() {
    navigator.clipboard.writeText(latex).then(
      toast.success("Copied Latex!!")
    )
  }
  return (
    <div className="App">
      <Container>
        <Row className="mf-container">
          <div className="latex-display">
            <div className="title">
              <h4>LATEX</h4>
              <div className="btn" onClick={copyLatex}>
                <MdContentCopy></MdContentCopy>
              </div>
            </div>
            <div className="content">
              <label></label>
              <textarea ref={latexContainerRef} rows={4} wrap='soft'>{latex}</textarea>
            </div>
          </div>
          <div className="mf-wrapper">
            <math-field id="mf" ref={mfRef}>{latex}</math-field>
          </div>
        </Row>
      </Container>
      <Toaster position='bottom-center'/>

    </div>
  );
}

export default App;
