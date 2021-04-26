import React, { Component } from "react";
import logo from "./logo.svg";
import firebase from "firebase";

import FileUpload from "./FileUpload"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  /*SIN REACT
  function handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider) //Promesa
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`))

  };

  function renderLoginButton() {
    //Si el usaurio esta logueado
    if (this.state.user) {
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}! </p>
        </div>
      );
    }else{
      //Si no lo esta
      return(
        <button onClick={this.handleAuth}>Login con Google</button>
      );      
    }  
  }*/

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      //Si nos deslogueamos, user sera null, si no, tendra datos
      this.setState({
        user, // this.user:user
      });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
        this.setState({
            uploadValue: percentage
        })
    }, error => {
        console.log(error.message)
    }, () => {          
          task.snapshot.ref.getDownloadURL().then(fuente => {
            const record = {
              photoURL: this.state.user.photoURL,
              displayName: this.state.user.displayName,
              image: fuente 
            }

            const dbRef = firebase.database().ref('pictures');
            const newPicture = dbRef.push();
            newPicture.set(record);
        });
        
        
    } 
    );
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider) //Promesa
      .then((result) => console.log(`${result.user.email} ha iniciado sesion`))
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then((result) => console.log(`${result.user.email} ha salido`))
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    //Si el usaurio esta logueado
    if (this.state.user) {
      return (
        <div>
          <img
            src={this.state.user.photoURL}
            alt={this.state.user.displayName}
          />
          <p>Hola {this.state.user.displayName}! </p>
          <button onClick={this.handleLogout}>Salir</button>
          
          <FileUpload onUpload={this.handleUpload}></FileUpload>

          {
            this.state.pictures.map(picture => (
              <div>
                <img width="320" src={picture.image}/>
                <br/>
                <img src={picture.photoURL} alt={picture.displayName}/>
                <br/>
                <span>{picture.displayName}</span> 
              </div>
            )).reverse()
          }

        </div>
      );
    } else {
      //Si no lo esta
      return <button onClick={this.handleAuth}>Login con Google</button>;
    }
  }

  render() {
    return (
      //EQUIVALE A:
      // React.createElement('div', {className= "app"}, {
      //   React.createElement('header', {className="App-header"}, {
      //     React.createElement('img', ....)....
      //   })
      // })

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> Firebase Login App </h2>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {this.renderLoginButton()}
      </div>
    );
  }
}
export default App;
