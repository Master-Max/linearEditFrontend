import React, { Component }  from 'react'

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      login: false
    }
  }

  handleClick = () => {
    this.setState({login: !this.state.login})
  }

  signin = () => (
    <>
      <form>
        SIGN IN<br></br><br></br>
        Username:<br/>
        <input type="text" name="username" /><br/>
        Password:<br/>
        <input type="text" name="password" /><br/>
        <br/>
        <input type="submit" value="Submit" />
        </form>
      <p onClick={this.handleClick}>new user?</p>
    </>
  )

  signup = () => (
    <>
      <form>
        SIGN UP<br></br><br></br>
        Username:<br/>
        <input type="text" name="username" /><br/>
        Password:<br/>
        <input type="text" name="password" /><br/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <p onClick={this.handleClick}>returning user?</p>
    </>
  )

  render(){
    return (
    <>
      {this.state.login ? this.signin() : this.signup()}
    </>
  )}
}

export default LoginPage
