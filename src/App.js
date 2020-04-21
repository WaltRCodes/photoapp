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
      whoIsLoggedIn:1
    }
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
      this.setState({contentPage:pictureCells});
      
      
    })).catch(errors => {
      console.log(errors);
    })

  }

  render (){
    return (
      <div >
        <ApiDisplayPage />
        {this.state.loggedIn ? this.state.contentPage:
        <div>
          Please log in
          </div>}
      </div>
    );
  }
  
}

