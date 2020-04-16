import React, { Component } from 'react';
import './App.css';
import ApiDisplayPage from './components/ApiDisplayPage';
import axios from 'axios';

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
      console.log(response.data);
      this.setState({apiData:response.data});
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.callApi();
  }

  render (){
    return (
      <div >
        <ApiDisplayPage />
      </div>
    );
  }
  
}

