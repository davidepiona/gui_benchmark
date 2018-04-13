import MovieList from '../components/MovieList'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'

const mapStateToProps = (state) => {
    return {
        movies: state.movies.list,
        editId: state.movies.editId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMoviesRequest: () => dispatch(ActionTypes.getMoviesRequest()),
        onGetMoviesSuccess: (data) => dispatch(ActionTypes.getMoviesSuccess(data)),
        onGetMoviesFailure: (error) => dispatch(ActionTypes.getMoviesFailure(error)),
        
        onStreamMovieRequest: (streamId) => dispatch(ActionTypes.streamMovieRequest(streamId)),
        
        onEditMovieRequest: (editId, data) => dispatch(ActionTypes.editMovieRequest(editId, data)),
        onEditMovieEnd: () => dispatch(ActionTypes.editMovieEnd()),
        onEditMovieFailure: (error) => dispatch(ActionTypes.editMovieFailure(error)),

        onOpenUpload: (movieId) => dispatch(ActionTypes.openUpload(movieId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);