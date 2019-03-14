import React, { Component } from 'react'
import '../assets/css/Profile.css';
import { connect } from 'react-redux';

class NewProfilePage extends Component {

  render(){
    return(
      <div className="profile">
        <h2>Profile</h2>
        <p onClick={}>log out</p>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfilePage)
