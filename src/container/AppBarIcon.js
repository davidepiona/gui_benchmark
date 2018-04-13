import AppBarIcon from '../components/AppBarIcon'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMoviesRequest: () => dispatch(ActionTypes.getMoviesRequest()),
        onGetMoviesSuccess: (data) => dispatch(ActionTypes.getMoviesSuccess(data)),
        onGetMoviesFailure: (error) => dispatch(ActionTypes.getMoviesFailure(error)),

        onSearchChange: (search) => dispatch(ActionTypes.searchChange(search))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarIcon);