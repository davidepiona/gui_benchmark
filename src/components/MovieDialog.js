import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {postMovie, uploadMovie} from '../Api'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class MovieDialog extends React.Component {

  componentWillMount() {
    this.setState({id:"", title:"", director:"", releaseDate:"", language:"", duration:"", open:false, open2:false, movie: null, currentId: ""});
  }

  openDialog= ()=> {
    this.setState({open: true})
  }

  inputValueChanged (value, e) {
    this.setState({[value]: e.target.value})
  }

  dateChange(event, x) {
    var date = event.toJSON().slice(0,10)
    this.setState({
      releaseDate: date
    });
  }

  closeDialog=() =>{
    movieInfo.id=" "  
    movieInfo.title=this.state.title
    movieInfo.director=this.state.director
    movieInfo.releaseDate=this.state.releaseDate
    movieInfo.language=this.state.language
    movieInfo.duration=this.state.duration
    movieInfo.pending=true
    // console.log(movieInfo)
    this.props.onPostMovieRequest()
    postMovie(movieInfo)
        .then(
            data => {
                this.props.onPostMovieSuccess(data)
                this.setState({currentId: data.movieId})
            },
            error => this.props.onPostMovieFailure(error)
        )
    this.setState({open: false})
    this.setState({open2: true})
  }

  chooseMovie(e) {
    console.log(e.target.files[0])
    this.setState({movie: e.target.files[0]})         
  }
  
  upload() {
    var data = new FormData()
    data.append('file', this.state.movie)  
    this.props.onUploadMovieRequest()
    console.log(this.state.currentId)  
    uploadMovie(this.state.currentId, data)
          .then(
            movie=> {
                this.props.onUploadMovieSuccess(data)
            },
            err => this.props.onUploadMovieFailure()
        )
    this.setState({open2:false})
  }

  render() {
    const actions = [
      <FloatingActionButton
        label="Submit"
        disabled={false}
        onClick={(e) => this.closeDialog()}>
        <ContentAdd />
      </FloatingActionButton>,
    ];

    const actions2 = [
      <FloatingActionButton
        label="Upload"
        disabled={false}
        onClick={(e) => this.upload()}>
        <ContentAdd />
      </FloatingActionButton>,
    ];

    return (
      <div>
        <FloatingActionButton 
          style={style}
          containerElement="label"
          onClick={(e) => this.openDialog()}
          >
            <ContentAdd />
          </FloatingActionButton>
        <Dialog
          title="Movie-Post"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <input placeholder="Title" value={this.state.title} onChange={ (e) => this.inputValueChanged("title",e) } />
          <input placeholder="Director" value={this.state.director} onChange={ (e) => this.inputValueChanged("director",e) } />
          <input placeholder="Language" value={this.state.language} onChange={ (e) => this.inputValueChanged("language", e) } />
          <input placeholder="Duration" value={this.state.duration} onChange={ (e) => this.inputValueChanged("duration", e) } />       
          <DatePicker floatingLabelText="Release Date" openToYearSelection={true} onChange={(x, event) =>this.dateChange(event)}/>
          
        </Dialog>
        <Dialog
          title="Movie-Upload"
          actions={actions2}
          modal={true}
          open={this.state.open2}
        >
          The info about the movie have been saved, if you want you can associate a movie to them
          <input 
              type="file" 
              id = "inputFile"
              onChange = {(e) => this.chooseMovie(e)} />
        </Dialog>
      </div>
    );
  }
}


const style = {
  marginLeft: 200,
  marginRight: 24,

};

const movieInfo = {
  "id":"",
	"title": "",
	"director": "",
	"releaseDate": "",
	"language": "",
	"duration": ""
}
