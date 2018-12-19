import React, { Component } from 'react';

class MonitorComponent extends Component {

  draw = (v,c,w,h) => {
    if(v.paused || v.ended) return false;

    c.drawImage(v,0,0,w,h);

    this.props.setTime(v.currentTime)
    setTimeout(this.draw,20,v,c,w,h);
  }

  setUp() {
    console.log('setting up')

    var v = this.v;
    var canvas = this.refs.canvas;
    var context = this.ctx;

    v.addEventListener('play', () => {
      console.log('playing');
      this.draw(v,context,640,360);
    },false);
  }


  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.v = this.refs.video
    this.setUp();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    if(this.props.play){
      this.v.play()
    }else{
      this.v.pause()
    }
  }

  render() {
    return (
      <>
        <video ref="video" className="hidden" src={this.props.src} controls/>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
      </>
    );
  }
}

export default MonitorComponent


//<video ref="video" src={this.props.src} controls/>
