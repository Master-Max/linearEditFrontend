import React, { Component }  from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';


class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      login: false, // FALSE = NEW USER
      users: [],
    }
  }

  findUserByUsername = (username) => {
    // const allUsernames = this.state.users.find((user) => (user.username === username))
    // console.log(allUsernames);
    // return allUsernames.includes(username)
    return this.state.users.find((user) => (user.username === username))
  }

  verifyUser = (username, password) => {
    const user = this.state.users.find((user) => (user.username === username))
    if (user.password === password){
      return true
    }else{
      return false
    }
  }

  handleClick = () => {
    this.setState({login: !this.state.login})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    if (this.state.login){ // TRUE = Returning User
      if (this.findUserByUsername(username) && this.verifyUser(username, password)){
        this.props.updateUser(this.findUserByUsername(username))
        this.props.history.push('/');
      }else{
        alert('username or password is incorrect')
      }
    }
    else{ // FALSE = New User
      if (this.findUserByUsername(username)){
        console.log('username taken')
        alert('username taken')
      } else {
        console.log('creating user')
        this.props.createUser(username, password)
        this.props.history.push('/');
      }
    }
    event.target.reset()
  }

  signin = () => (
    <>
      <form onSubmit={(event) => {this.handleSubmit(event)}}>
        SIGN IN<br></br><br></br>
        Username:<br/>
        <input type="text" name="username" /><br/>
        Password:<br/>
        <input type="password" name="password" /><br/>
        <br/>
        <input type="submit" value="Submit" />
        </form>
      <p onClick={this.handleClick}>new user?</p>
    </>
  )

  signup = () => (
    <>
      <form onSubmit={(event) => {this.handleSubmit(event)}}>
        SIGN UP<br></br><br></br>
        Username:<br/>
        <input type="text" name="username" /><br/>
        Password:<br/>
        <input type="password" name="password" /><br/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <p onClick={this.handleClick}>returning user?</p>
    </>
  )

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/users')
    .then(r=>r.json())
    .then(users=>{
      this.setState({users})
    })
  }

  render(){
    return (
    <>
      {this.state.login ? this.signin() : this.signup()}
    </>
  )}
}

function mapStateToProps(state) {
  return {
    currentUser: state.user
  }
}

export default connect(mapStateToProps, actions)(LoginPage);
