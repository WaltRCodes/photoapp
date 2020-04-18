import React, { Component } from 'react';
import './App.css';
import ApiDisplayPage from './components/ApiDisplayPage';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn:false,
      apiData:[''],
      contentPage:'',
      whoIsLoggedIn:''
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
      let comments;
      let pictureCells = secondResponse.data.map(pictureObject => <div>
        <img src={pictureObject.url} height="200px" />
        <div>
          {pictureObject.likes.length}Likes<button>Like</button><button>Bookmark</button>
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
        {this.state.contentPage}
      </div>
    );
  }
  
}

