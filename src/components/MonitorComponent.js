import React, { Component } from 'react';

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

class MonitorComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      ctx: null,
      v: null,
    }
  }

  draw = (v,c,w,h) => {
    // console.log('drawing')
    if(v.paused || v.ended) return false;
    // console.log(v)
    // console.log(c)
    c.drawImage(v,0,0,w,h);
    // setTimeout();
    this.props.setTime(v.currentTime)
    setTimeout(this.draw,20,v,c,w,h);
  }

  setUp() {
    console.log('setting up')




    var v = this.v;
    var canvas = this.refs.canvas;
    var context = this.ctx;

    // const v = this.state.v;
    // const context = this.state.ctx;

    // var cw = Math.floor(canvas.clientWidth / 100);
    // var ch = Math.floor(canvas.clientHeight / 100);
    // canvas.width = cw;
    // canvas.height = ch;

    v.addEventListener('play', () => {
      console.log('playing');
      this.draw(v,context,640,360);
    },false);
  }


  componentDidMount() {
    // const ctx = this.refs.canvas.getContext('2d');
    // const v = this.refs.video
    this.ctx = this.refs.canvas.getContext('2d');
    this.v = this.refs.video
    this.setUp();
    // this.setState({ctx, v}, this.setUp())
    // this.updateCanvas();
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
    // const ctx = this.refs.canvas.getContext('2d');
    // ctx.clearRect(0,0, this.props.width, this.props.height);
    // // draw children “components”
    // rect({ctx, x: 10, y: 10, width: 50, height: 50});
    // rect({ctx, x: 110, y: 110, width: 50, height: 50});
  }

  render() {
    return (
      <>
      <video id="pc-monitor" ref="video" className="hidden" src={this.props.src} controls/>
      <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
      </>
    );
  }
}

export default MonitorComponent


//<video ref="video" src={this.props.src} controls/>
