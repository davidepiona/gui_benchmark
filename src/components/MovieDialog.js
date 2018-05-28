import React from 'react';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FlatButton from 'material-ui/FlatButton';

import {postMovie, uploadMovie, getMovies} from '../Api'
import {subscribeWS, uploadWSMovie} from '../WSUpload'
import {blue500, white, red400, blue700 } from 'material-ui/styles/colors';
import VideoPlayer from '../container/VideoPlayer';

/**
 * A Dialog that appears when the user tries to open the 
 */
export default class MovieDialog extends React.Component {

  componentWillMount() {
    this.setState({id:"", title:"", director:"", releaseDate:"", language:"", duration:"", open:false, movie: null});
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
                this.setState({open: false})
                this.props.onOpenUpload(data.movieId)
            },
            error => this.props.onPostMovieFailure(error)
        )
  }

  chooseMovie(e) {
    this.setState({movie: e.target.files[0]})         
  }

  closePost() {
    this.setState({open: false})
  }

  closeUpload() {
    this.props.onCloseUpload()
  }

  // Multipart upload using REST
  uploadMultipart() {
    
      var data = new FormData()
      data.append('file', this.state.movie)  
      this.props.onUploadMovieRequest()
      console.log(this.props.uploadId)  
      uploadMovie(this.props.uploadId, data)
            .then(
              movie=> {
                  this.props.onUploadMovieSuccess()
                  this.refresh()
              },
              err => this.props.onUploadMovieFailure()
          )
    };

  // Upload using WebSocket
  uploadWS() {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.movie);
      const {uploadId} = this.props;
      this.props.onUploadMovieRequest()
      subscribeWS(this.refresh.bind(this));
      reader.onload = function () {
        var data = reader.result.slice(reader.result.match("base64").index+7)
        var length = data.length;
        var partCount = Math.floor(length/8192);
        for (var i = 0; i <= partCount; i++) {
          var part = data.substring(i*8192,(i+1)*8192); 
          uploadWSMovie(uploadId, part, i, partCount);
          // console.log("Siamo al pezzo : "+ i + " di: "+  partCount);
         }
        }
        this.props.onUploadMovieSuccess()
  }; 

  refresh() {
    this.props.onGetMoviesRequest();
      getMovies()
        .then(
          movie => {
            this.props.onGetMoviesSuccess(movie)
          },
          error => this.props.onGetMoviesFailure(error)
        )
  }

  render() {    
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
          actions={
            [<FlatButton
            label="Cancel"
            onClick={(e) => this.closePost()}
            style={{color: white, marginLeft: 5, backgroundColor: red400, disabled: false}}> 
            </FlatButton>,
            <FlatButton
            label="Submit"
            disabled={false}
            onClick={(e) => this.closeDialog()}
            style={{color: white, marginLeft: 5, backgroundColor: blue500}}> 
            </FlatButton>]
          }
          open={this.state.open}
          onRequestClose={(e)=>this.closePost()}
          titleStyle={{paddingTop: 18, paddingBottom: 0}}
          bodyStyle={{overflowY: 'auto'}}
          actionsContainerStyle={{paddingTop: 0, paddingBottom: 5}}
        >
          <TextField style={{height:66}} floatingLabelText="Title" value={this.state.title} onChange={ (e) => this.inputValueChanged("title",e) }/> 
          <br/>
          <TextField style={{height:66}} floatingLabelText="Director" value={this.state.director} onChange={ (e) => this.inputValueChanged("director",e) }/>
          <br/>
          <TextField style={{height:66}} floatingLabelText="Language" value={this.state.language} onChange={ (e) => this.inputValueChanged("language",e) }/> 
          <br/>                 
          <DatePicker style={{height:66}} floatingLabelText="Release date" id="datePicker" openToYearSelection={true} onChange={(x, event) =>this.dateChange(event)}/>
        </Dialog>
        

        <Dialog
          title="Movie-Upload"
          actions={
            [<FlatButton
            label="Cancel"
            onClick={(e) => this.closeUpload()}
            style={{color: white, backgroundColor: red400, disabled: false}}> 
            </FlatButton>,
            <FlatButton
            label="UploadMultipart"
            onClick={(e) => this.uploadMultipart()}
            style={{color: white, marginLeft: 5, backgroundColor: blue500, disabled: false}}> 
            </FlatButton>,
            <FlatButton
            label="UploadWS"
            onClick={(e) => this.uploadWS()}
            style={{color: white, marginLeft: 5, backgroundColor: blue700, disabled: false}}> 
            </FlatButton>]
          }
          open={this.props.openUpload}
          onRequestClose={(e)=>this.closeUpload()}
        >
          The info about the movie has been saved, if you want you can associate a movie to them
          <input 
              type="file" 
              id = "inputFile"
              onChange = {(e) => this.chooseMovie(e)} />
        </Dialog> 

        <VideoPlayer> </VideoPlayer>
      </div>
    );
  }
}


const style = {
  borderWidth:1,
  position:'fixed',
  bottom:'5%',
  left:'85%', 
  alignSelf:'flex-end'};

const movieInfo = {
  "id":"",
	"title": "",
	"director": "",
	"releaseDate": "",
	"language": "",
	"duration": ""
}