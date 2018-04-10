import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {uploadMovie} from '../Api'


class AddButton extends React.Component {

  uploadClick(e) {
        
        var data = new FormData()
        var file = e.target.files[0]
        console.log(e.target.files[0])
        data.append('file', e.target.files[0])  
        this.props.onUploadMovieRequest()
        uploadMovie(data)
             .then(
                movie=> {
                    this.props.onUploadMovieSuccess(data)
                },
                err => this.props.onUploadMovieFailure()
            )
}

  render() {
    return (
          <FloatingActionButton 
          style={style}
          containerElement="label"
          >
            <ContentAdd />
            <input 
              type="file" 
              style={{visibility: 'hidden'}}
              id = "inputFile"
              onChange = {(e) => this.uploadClick(e)} />
            <ContentAdd />
          </FloatingActionButton>
    )
  }
}

const style = {
  marginLeft: 200,
  marginRight: 24,

};

export default AddButton;