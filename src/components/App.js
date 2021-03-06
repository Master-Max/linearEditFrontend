import React, { Component } from 'react';
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'

// import '../assets/css/App.css';
import NavBar from './NavBar';
import EditPage from './EditPage';
import GalleryPage from './GalleryPage';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
import PageContainer from './PageContainer';



class App extends Component {

  // NEW RENDER
  render(){
    return(
      <>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route path='/' component={PageContainer} />
      </Switch>
      </>
    )
  }
}

export default App;
