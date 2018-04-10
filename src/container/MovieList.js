import MovieList from '../components/MovieList'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'

const mapStateToProps = (state) => {
    return {
        movies: state.movies.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMoviesRequest: () => dispatch(ActionTypes.getMoviesRequest()),
        onGetMoviesSuccess: (data) => dispatch(ActionTypes.getMoviesSuccess(data)),
        onGetMoviesFailure: (error) => dispatch(ActionTypes.getMoviesFailure(error))
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);