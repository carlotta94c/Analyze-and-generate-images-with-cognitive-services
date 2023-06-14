// ./src/App.js

import React, { useState } from 'react';
import './App.css';
import { computerVision, isConfigured as ComputerVisionIsConfigured } from './azure-cognitiveservices-computervision';
import { imageGeneration, isConfigured as OpenAIIsConfigured } from './azure-cognitiveservices-openai';

function App() {

  const [input, setInput] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [promptEntered, setPromptEntered] = useState(false);
  
  const handleChange = (e) => {
    setInput(e.target.value)
    setCursor(e.target.selectionStart);
  }
  
  const onFileUrlEntered = (e) => {

    // hold UI
    setProcessing(true);
    setPromptEntered(false);
    setAnalysis(null);

    computerVision(input || null).then((item) => {
      // reset state/form
      setAnalysis(item);
      setInput("");
      setProcessing(false);
    });

  };

  const onPromptEntered = (e) => {
    // hold UI
    setProcessing(true);
    setPromptEntered(true);
    setGeneratedImage(null);

    imageGeneration(input || null).then((item) => {
      // reset state/form
      setGeneratedImage(item);
      setInput("");
      setProcessing(false);
    });
  }

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
  }

  const DisplayResults = () => {
    if (generatedImage != null){
      return (
        <div>
          <h2>Image Generation</h2>
          <div><img src={generatedImage.URL} height="200" border="1" alt={generatedImage.prompt} /></div>
          {PrettyPrintJson(generatedImage)}
        </div>
      )
    }
    else{
      return (
        <div>
          <h2>Computer Vision Analysis</h2>
          <div><img src={analysis.URL} height="200" border="1" alt={(analysis.captionResult && analysis.captionResult.text ? analysis.captionResult.text : "can't find caption")} /></div>
          {PrettyPrintJson(analysis)}
        </div>
      )
      }
  };
  
  const AnalyzeOrGenerate = () => {
    return (
    <div>
      <h1>Computer vision</h1>
      {!processing &&
        <div>
          <div>
            <label>Insert URL or type prompt: </label>
          </div>
          <div>
            <input autoFocus="autofocus" type="text" id="input" defaultValue={input} placeholder="Enter URL to analyze or textual prompt to generate an image" size="50" onChange={handleChange} 
            onFocus={(e) => {e.target.selectionStart = cursor;}}></input>
          </div>
          <button onClick={onFileUrlEntered}>Analyze</button>
          &nbsp;
          <button onClick={onPromptEntered}>Generate</button>
        </div>
      }
      {processing && <div>Processing</div>}
      <hr />
      {!promptEntered && analysis && DisplayResults()}
      {promptEntered && generatedImage && DisplayResults()}
      </div>
    )
  }
  
  const CantAnalyze = () => {
    return (
      <div>Key and/or endpoint not configured for cognitive services</div>
    )
  }
  
  function Render() {
    const cvReady = ComputerVisionIsConfigured();
    const oaiReady = OpenAIIsConfigured();

    if (cvReady && oaiReady) {
      return <AnalyzeOrGenerate />;
    }
    return <CantAnalyze />;
  }

  return (
    <div>
      {Render()}
    </div>
    
  );
}

export default App;
