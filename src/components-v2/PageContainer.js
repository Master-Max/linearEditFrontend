import React, { Component } from 'react';
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'

// import '../assets/css/App.css';
import NavBar from './NavBar';
import EditPage from '../components/EditPage';
import GalleryPage from './GalleryPage';
import WelcomePage from './WelcomePage';


class PageContainer extends Component {

  // NEW RENDER
  render(){
    return(
      <>
      <NavBar />
      <Switch>
        <Route exact path='/editor' component={EditPage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route path='/' component={WelcomePage} />
      </Switch>
      </>
    )
  }
}

export default PageContainer;
