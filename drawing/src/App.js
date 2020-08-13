import React from 'react';
import { useSvgDrawing } from 'react-hooks-svgdrawing'
import { Button,Input } from '@material-ui/core';
import './App.css';

const onClick = () => { /** Handle mousedown or click */ }

const Drawing = () => {
  const [renderRef, draw] = useSvgDrawing()
  // Drawing area will be resized to fit the rendering area
  return <div className="area" ref={renderRef} />
}

const aaa=(e)=>{
  console.log(e);
}

function App() {
  return (
    <div className="App">
      <Button>Download</Button>
      <Drawing onClick={aaa}/>
    </div>
  );
}

export default App;
