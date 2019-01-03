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
        {props.loggedIn ?
          <>
          <li><Link to="/editor">Create Movie</Link></li>
          <li><Link to="/gallery">My Gallery</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          </> :
          <li><Link to="/login">Login</Link></li>
        }
        </div>
      </ul>
    </div>
  )
}

function mapStateToProps(state){
  return {
    loggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps)(NavBar)
