import * as ActionTypes from '../actions'
import _ from 'lodash';

const defaultState = {
    isFetching: false,
    list: [],
    error: null
};

export default function movies(state = defaultState, action) {
    switch(action.type) {
        case ActionTypes.GET_MOVIES_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                error: null
            }
        case ActionTypes.GET_MOVIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: action.data.movieResources
            }
        case ActionTypes.GET_MOVIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case ActionTypes.UPLOAD_MOVIE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case ActionTypes.UPLOAD_MOVIE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                
            }
        case ActionTypes.UPLOAD_MOVIE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case ActionTypes.POST_MOVIE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case ActionTypes.POST_MOVIE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: [action.data, ...state.list],
                
                
            }
        case ActionTypes.POST_MOVIE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                
            }
        default:
                return state
    }
}