import React, { Component } from 'react';
import './App.css';
import ApiDisplayPage from './components/ApiDisplayPage';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn:false,
      user_name:'',
      password:'',
      apiData:[''],
      contentPage:'',
      whoIsLoggedIn:1,
      users:[
        {
          "user_name":"",
          "password":""
        }
    ],
    badpassword:''
    }
    this.checkPassword = this.checkPassword.bind(this);
    this.takeUsername = this.takeUsername.bind(this);
    this.takePassword = this.takePassword.bind(this);
  }

  checkPassword(event){
    event.preventDefault();
    for(let user of this.state.users){
      if(this.state.user_name===user.user_name && this.state.password===user.password){
        this.setState({loggedIn:true});
      } else {
        this.setState({badpassword:<p>please check your login info and try again</p>});
      }
    }
  }

  takeUsername(event){
    this.setState({user_name: event.target.value});
  }

  takePassword(event){
    this.setState({password: event.target.value});
  }

  async callApi() {
    {/*fetch all and create innerhtml array*/}
    try {
      const response = await axios.get('http://myapi-profstream.herokuapp.com/api/d206d9/wines');
      console.log(response.data);
      // for(let object of response.data){

      // }
      this.setState({apiData:response.data});
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    //this.callApi();
    const userURL = "https://my-json-server.typicode.com/WaltRCodes/photoapp/users";
    const photoURL = "https://my-json-server.typicode.com/WaltRCodes/photoapp/photos";
    const calls = [axios.get(userURL),axios.get(photoURL)];

    axios.all(calls).then(axios.spread((...responses) => {
      const firstResponse = responses[0];
      console.log(firstResponse.data);
      const secondResponse = responses[1];
      console.log(secondResponse.data);
      let num = this.state.whoIsLoggedIn;
      let comments;
      let pictureCells = secondResponse.data.map(pictureObject => <div id={pictureObject.id}>
        <img src={pictureObject.url} height="200px" />
        <div>
          {pictureObject.likes.length}Likes 
          {pictureObject.likes.find(function (user) { return user===num}) ? <button>Liked</button>: <button>Like</button>}
          {pictureObject.bookmark.find(function (user) { return user===num}) ? <button>Bookmarked</button> : <button>Bookmark</button>}
          {pictureObject.user_id===num ? <button onClick={() => document.getElementById(pictureObject.id).style.display="none"}>Delete your post</button> : <div></div>}
        </div>
        {comments = pictureObject.comments.map(comment => <p>{comment}</p>)}

      </div>);
      this.setState({contentPage:pictureCells, users:firstResponse.data});
      
      
    })).catch(errors => {
      console.log(errors);
    })

  }

  render (){
    return (
      <div >
        <ApiDisplayPage />
        {this.state.loggedIn ? <div>Navbar<br />{this.state.contentPage}</div>:
        <div>
          Please log in
          <form>
          <label>
              Username
              <input type="text" onChange={this.takeUsername} placeholder="username"/>
          </label>
          <br />
          <label>
              Password
              <input type="password" onChange={this.takePassword} placeholder="password"/>
          </label>
          <br />
          </form>
          {this.state.badpassword}
        </div>}
      </div>
    );
  }
  
}

