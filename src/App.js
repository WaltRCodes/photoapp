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
      whoIsLoggedIn:0,
      users:[
        {
          "user_name":"",
          "password":""
        }
    ],
    badpassword:'',
    displayPage:''
    }
    this.checkPassword = this.checkPassword.bind(this);
    this.takeUsername = this.takeUsername.bind(this);
    this.takePassword = this.takePassword.bind(this);
  }

  checkPassword(event){
    event.preventDefault();
    for(let user of this.state.users){
      if(this.state.user_name===user.user_name && this.state.password===user.password){
        this.setState({loggedIn:true,whoIsLoggedIn:user.id});
        this.callApi();
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
    const userURL = "https://my-json-server.typicode.com/WaltRCodes/photoapp/users";
    const photoURL = "https://my-json-server.typicode.com/WaltRCodes/photoapp/photos";
    const calls = [axios.get(userURL),axios.get(photoURL)];
    //https://flaviocopes.com/how-to-sort-array-by-date-javascript/
    let a = new Date('2019-06-28');
    let b = new Date('2019-06-10');
    console.log(a," ",b);
    console.log(a>b);

    axios.all(calls).then(axios.spread((...responses) => {
      const firstResponse = responses[0];
      console.log(firstResponse.data);
      const secondResponse = responses[1];
      console.log(secondResponse.data);
      let num = this.state.whoIsLoggedIn;
      let comments;
      let sortedArray = [];
      let mostLikes = secondResponse.data[0];
      let mostLikesIndex=0;
      for(let i=0;i<secondResponse.data.length;i++){
        let currentObj = secondResponse.data[i];
        if(currentObj.likes.length>mostLikes.likes.length){
          mostLikes = currentObj;
          mostLikesIndex=i;

        } else if (currentObj.likes.length===mostLikes.likes.length){
          if(new Date(currentObj.timestamp)>new Date(mostLikes.timestamp)){
            mostLikes = currentObj;
            mostLikesIndex=i;
          }
        }
        if(i===secondResponse.data.length-1){
          sortedArray.push(mostLikes);
          secondResponse.data.splice(mostLikesIndex,1);
          mostLikes = secondResponse.data[0];
          mostLikesIndex=0;
          i=-1;
        }
      }
      let pictureCells = sortedArray.map(pictureObject => <div id={pictureObject.id}>
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
    });
  }

  componentDidMount() {
    this.callApi();
    

  }

  render (){
    return (
      <div >
        <ApiDisplayPage />
        {this.state.loggedIn ? <div>
          <div>Home | Profile | Bookmarks</div>
          <br />
        {this.state.contentPage}
        </div>:
        <div>
          Please log in
          <form onSubmit={this.checkPassword}>
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
          <label>
              <input type="submit" value="submit"/>
          </label>
          <br />
          </form>
          {this.state.badpassword}
        </div>}
      </div>
    );
  }
  
}

