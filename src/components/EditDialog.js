import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { blue500, white, red400 } from 'material-ui/styles/colors';

import {editMovie, getMovies, deleteMovie} from '../Api'
import { grey500 } from 'material-ui/styles/colors';



/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class EditDialog extends React.Component {

  componentWillMount() {
    const date = new Date();
    this.setState({title:"", director:"", releaseDate:date, language:"", duration:"", open:false, openDelete: false});
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

  openDelete(){
    this.setState({openDelete: true})
    this.props.onEditMovieEnd();
  }

  closeRequestEdit() {
    this.props.onEditMovieEnd();
  }

  closeRequestSubmit() {
    this.setState({open: false});
  }

  closeDelete() {
    this.setState({openDelete:false})
  }

  closeDialog=() =>{
    movieInfo.id=this.props.editMovie.movieId 
    movieInfo.title=this.state.title
    movieInfo.director=this.state.director
    movieInfo.releaseDate=this.state.releaseDate
    movieInfo.language=this.state.language
    movieInfo.duration=this.state.duration
    movieInfo.pending=this.props.editMovie.pending
    // console.log(movieInfo)
    editMovie(movieInfo.id, movieInfo)
        .then(
            data => {
                this.props.onEditMovieEnd()
                this.refresh()
            },
            error => this.props.onEditMovieFailure(error)
        )
    this.setState({open: false})   
  }

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

  onDeleteMovie(id) {
    deleteMovie(id)
      .then(
        e => {
          this.refresh()
        }
      )
    this.closeDelete()
  }
  updateState() {
    const {editMovie} = this.props
    this.setState({title:editMovie.title, director:editMovie.director, 
      releaseDate:editMovie.releaseDate, language:editMovie.language, 
      duration:editMovie.duration, open: true})
  }

  render() {
    const {editMovie} = this.props
    const{openEdit} = this.props
    return (
      <div>
        <Dialog
          title="Do you want to edit or delete the movie?"
          open={openEdit} 
          onRequestClose={(e) => this.closeRequestEdit()}
          actions= {
            [<FlatButton
            label="Cancel"
            disabled={false}
            onClick={(e) => this.closeRequestEdit()}
            backgroundColor= {grey500}
            style={{color: white}}> 
            </FlatButton>,
            <FlatButton
            label="Delete"
            disabled={false}
            onClick={(e) => this.openDelete()}
            backgroundColor= {red400}
            style={{color: white}}> 
            </FlatButton>,
            <FlatButton
            label="Edit"
            disabled={false}
            onClick={(e) => this.updateState()}
            backgroundColor= {blue500}
            style={{color: white, marginLeft: 5}}> 
            </FlatButton>] 
            
          }>
          Title: {editMovie.title} <br/>
          Director: {editMovie.director} <br/>
          Language: {editMovie.language} <br/>
        </Dialog>
       
        <Dialog
          title="Movie-Edit"
          open={this.state.open}
          onRequestClose={(e) => this.closeRequestSubmit()}
          titleStyle={{paddingTop: 18, paddingBottom: 0}}
          bodyStyle={{overflowY: 'auto'}}
          actionsContainerStyle={{paddingTop: 0, paddingBottom: 5}}
          actions= {
            [<FlatButton
            label="Cancel"
            disabled={false}
            onClick={(e) => this.closeRequestSubmit()}
            backgroundColor= {red400}
            style={{color: white}}> 
            </FlatButton>,
            <FlatButton
            label="Submit"
            disabled={false}
            onClick={(e) => this.closeDialog()}
            backgroundColor= {blue500}
            style={{color: white, marginLeft: 5}}> 
            </FlatButton>]
          }>
          <TextField style={{height:66}} floatingLabelText="Title" value={this.state.title} onChange={ (e) => this.inputValueChanged("title",e) }/> 
          <br/>
          <TextField style={{height:66}} floatingLabelText="Director" value={this.state.director} onChange={ (e) => this.inputValueChanged("director",e) }/>
          <br/>
          <TextField style={{height:66}} floatingLabelText="Language" value={this.state.language} onChange={ (e) => this.inputValueChanged("language",e) }/> 
          <br/>                 
          <DatePicker style={{height:66}} floatingLabelText="Release date" id="datePicker" openToYearSelection={true} onChange={(x, event) =>this.dateChange(event)}/>  
        </Dialog>

        <Dialog
          title="Are you sure to delete permanently the movie?"
          open={this.state.openDelete} 
          onRequestClose={(e) => this.closeDelete()}
          actions= {
            [<FlatButton
            label="Cancel"
            disabled={false}
            onClick={(e) => this.closeDelete()}
            backgroundColor= {grey500}
            style={{color: white}}> 
            </FlatButton>,
            <FlatButton
            label="Delete"
            disabled={false}
            onClick={(e) => this.onDeleteMovie(editMovie.movieId)}
            backgroundColor= {red400}
            style={{color: white}}> 
            </FlatButton>,
            ]  
          }>
          Title: {editMovie.title} <br/>
          Director: {editMovie.director} <br/>
          Language: {editMovie.language} <br/>
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
  "duration": "",
  "pending": true
}