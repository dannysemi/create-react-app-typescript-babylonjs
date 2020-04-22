import React, { Component } from 'react';
/* eslint import/no-webpack-loader-syntax:off */
import Worker from "worker-loader!./worker"
import './App.css';

class App extends Component<{},{}> {
  canvas;
  componentDidMount = () =>{
    var offscreen:OffscreenCanvas = this.canvas.transferControlToOffscreen();
    var worker:Worker = new Worker();
    //@ts-ignore
    worker.postMessage({canvas: offscreen},[offscreen]);
    window.addEventListener("resize", () => {
      worker.postMessage({width: this.canvas.clientWidth, height:this.canvas.clientHeight});
    });
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