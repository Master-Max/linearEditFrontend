import React from 'react'
import '../assets/css/App.css';

const MainPage = () => {
  return (
    <div className="App">
      <video autoPlay muted loop id="bgVideo" width={1920} height={1080}>
        <source src="http://res.cloudinary.com/dsqgy2bod/raw/upload/v1546536123/oqixdv9mdjnliuq6smt5.mp4" type="video/mp4"/>
      </video>

    </div>
  )
}

export default MainPage
