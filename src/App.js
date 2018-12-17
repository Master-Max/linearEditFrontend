import React, { Component } from 'react';
import './App.css';
import EditorComponent from './components/EditorComponent.js';
import { Provider } from 'react-redux';

import store from './store';

class App extends Component {

  render(){
    return(
      <Provider store={store}>
        <EditorComponent/>
      </Provider>
    )
  }
}

export default App;
