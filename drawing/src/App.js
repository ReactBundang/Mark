import React from 'react';
import { useSvgDrawing } from 'react-hooks-svgdrawing'
import './App.css';

const onClick = () => { /** Handle mousedown or click */ }

const Drawing = () => {
  const [renderRef, draw] = useSvgDrawing()
  // Drawing area will be resized to fit the rendering area
  return <div className="area" ref={renderRef} />
}

function App() {
  return (
    <div className="App">
      <Drawing/>
    </div>
  );
}

export default App;
