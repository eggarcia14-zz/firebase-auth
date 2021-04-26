import React, {Component} from 'react';
//import firebase from 'firebase';

class FileUpload extends Component {
    constructor () {
        super();
        this.state = {
            uploadValue: 0,
        }

        
    }
/*
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
            /*let fuente = task.snapshot.ref.getDownloadURL().then(fuente => {
                console.log(fuente)
                return fuente;
              });    
    
            task.snapshot.ref.getDownloadURL().then(fuente => {
                this.setState({
                    uploadValue: 100,
                    picture: fuente
                })    
            });
            
        } 
        );
      }
*/
    render() {
        return (
            <div>
                <progress width="500" value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange={this.props.onUpload}/>
            </div>
        );
    }
}

export default FileUpload;