import React, { Component } from 'react';
import './App.css';

class App extends Component<{},{}> {
  canvas:HTMLCanvasElement;
  componentDidMount = () =>{
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    var offscreen = this.canvas.transferControlToOffscreen();
    var worker = new Worker("/worker.js")
    worker.postMessage({canvas: offscreen},[offscreen]);
  }
  onCanvasLoaded = (c: HTMLCanvasElement) => {
    if(c !== null){
      this.canvas = c;
    }
  }
  render(){
    return (
      <canvas ref={this.onCanvasLoaded}/>
    );
  }
}
export default App;