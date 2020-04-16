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

  async callApi() {
    try {
      const response = await axios.get('http://myapi-profstream.herokuapp.com/api/d206d9/wines');
    } catch (e) {
      console.log(e);
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

