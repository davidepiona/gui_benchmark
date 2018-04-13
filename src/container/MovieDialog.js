import MovieDialog from '../components/MovieDialog'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        openStream: state.movies.openStream,
        openUpload: state.movies.openUpload,
        uploadId: state.movies.uploadId
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        
        onPostMovieRequest: () => dispatch(ActionTypes.postMovieRequest()),
        onPostMovieSuccess: (data) => dispatch(ActionTypes.postMovieSuccess(data)),
        onPostMovieFailure: (error) => dispatch(ActionTypes.postMovieFailure(error)),

        onUploadMovieRequest: () => dispatch(ActionTypes.uploadMovieRequest()),
        onUploadMovieSuccess: (data) => dispatch(ActionTypes.uploadMovieSuccess(data)),
        onUploadMovieFailure: (error) => dispatch(ActionTypes.uploadMovieFailure(error)),

        onOpenUpload: (movieId) => dispatch(ActionTypes.openUpload(movieId)),
        onCloseUpload: () => dispatch(ActionTypes.closeUpload()),

        onGetMoviesRequest: () => dispatch(ActionTypes.getMoviesRequest()),
        onGetMoviesSuccess: (data) => dispatch(ActionTypes.getMoviesSuccess(data)),
        onGetMoviesFailure: (error) => dispatch(ActionTypes.getMoviesFailure(error)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDialog);