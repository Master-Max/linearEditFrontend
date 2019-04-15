import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Nav.css';
import { connect } from 'react-redux'

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <ul>
        <li><Link to="/">Show Stopper</Link></li>
        <div className="right">
          <li><Link to="/editor">Create Movie</Link></li>
          <li><Link to="/gallery">The Gallery</Link></li>
        </div>
      </ul>
    </div>
  )
}

function mapStateToProps(state){
  return {
    
  }
}

export default connect(mapStateToProps)(NavBar)
