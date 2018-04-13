import * as ActionTypes from '../actions'

const defaultState = {
    isFetching: false,
    list: [],
    error: null,
    streamId: "",
    openStream: false,
    openEdit: false,
    openUpload: false,
    uploadId: "",
    editMovie: ""
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
                openUpload: false,
                uploadId: ""
                
            }
        case ActionTypes.UPLOAD_MOVIE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                openUpload: false,
                uploadId: ""

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
        case ActionTypes.STREAM_MOVIE_REQUEST:
            return {
                ...state,
                streamId: action.streamId,
                openStream: true
            }  
        case ActionTypes.CLOSE_STREAM:
            return {
                ...state,
                streamId: "",
                openStream: false
            } 
        case ActionTypes.EDIT_MOVIE_REQUEST:
            return {
                ...state,
                editId: action.editId,
                isFetching: true,
                openEdit: true,
                editMovie: action.data
            }
        case ActionTypes.EDIT_MOVIE_END:
            return {
                ...state,
                editId: "",
                openEdit: false,
                isFetching: false,
                editMovie: ""
            }
        case ActionTypes.EDIT_MOVIE_FAILURE:
            return {
                ...state,
                editId: "",
                openEdit: false,
                isFetching: false,
                editMovie: "",
                error: action.error
            }
        case ActionTypes.OPEN_UPLOAD:
            return {
                ...state,
                openUpload:true,
                uploadId: action.movieId
            }
        case ActionTypes.CLOSE_UPLOAD:
            return {
                ...state,
                openUpload:false,
                uploadId: ""
            }
        default:
                return state
    }
}