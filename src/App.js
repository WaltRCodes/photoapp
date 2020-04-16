import React, { Component } from 'react';
import './App.css';
import ApiDisplayPage from './components/ApiDisplayPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn:false,
      apiData:['']
    }
  }

  render (){
    return (
      <div >
        <ApiDisplayPage />
      </div>
    );
  }
  
}

