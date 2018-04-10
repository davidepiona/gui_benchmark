import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {postMovie} from '../Api'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class MovieDialog extends React.Component {

  // handleOpen = () => {
  //   this.setState({open: true});
  // };
  componentWillMount() {
    this.setState({title:"", director:"", releaseDate:"", language:"", duration:""});
  }
  handleClose = () => {
    movieInfo.id=this.state.id
    movieInfo.title=this.state.title
    movieInfo.director=this.state.director
    movieInfo.releaseDate=this.state.releaseDate
    movieInfo.language=this.state.language
    movieInfo.duration=this.state.duration
    this.props.onPostMovieRequest()
    postMovie(movieInfo)
        .then(
            data => {
                this.props.onPostMovieSuccess(data) 
            },
            error => this.props.onPostMovieFailure(error)
        )
  };


  valueChanged (value, e) {
    this.setState({[value]: e.target.value})
  }

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.props.open}
        >
        <input placeholder="Id" value={this.state.id} onChange={ (e) => this.valueChanged("id",e) } />  
        <input placeholder="Title" value={this.state.title} onChange={ (e) => this.valueChanged("title",e) } />
        <input placeholder="Director" value={this.state.director} onChange={ (e) => this.valueChanged("director",e) } />
        <input placeholder="Release Date" value={this.state.releaseDate} onChange={ (e) => this.valueChanged("releaseDate", e) } />
        <input placeholder="Language" value={this.state.language} onChange={ (e) => this.valueChanged("language", e) } />
        <input placeholder="Duration" value={this.state.duration} onChange={ (e) => this.valueChanged("duration", e) } />       
        </Dialog>
      </div>
    );
  }
}

const movieInfo = {
  "id":"",
	"title": "",
	"director": "",
	"releaseDate": "",
	"language": "",
	"duration": ""
}
