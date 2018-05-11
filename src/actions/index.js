export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE'

export const getMoviesRequest = () => {
    return {
        type: GET_MOVIES_REQUEST
    };
}

export const getMoviesSuccess = (data) => {
    return {
        type: GET_MOVIES_SUCCESS,
        data
    };
}

export const getMoviesFailure = (error) => {
    return {
        type: GET_MOVIES_FAILURE,
        error
    };
}

// ----------------------------------------------------------------------------

export const UPLOAD_MOVIE_REQUEST = 'UPLOAD_MOVIE_REQUEST'
export const UPLOAD_MOVIE_SUCCESS = 'UPLOAD_MOVIE_SUCCESS'
export const UPLOAD_MOVIE_FAILURE = 'UPLOAD_MOVIE_FAILURE'

export const uploadMovieRequest = () => {
    return {
        type: UPLOAD_MOVIE_REQUEST
    };
}

export const uploadMovieSuccess = () => {
    return {
        type: UPLOAD_MOVIE_SUCCESS,
    };
}

export const uploadMovieFailure = (error) => {
    return {
        type: UPLOAD_MOVIE_FAILURE,
        error
    };
}

// ----------------------------------------------------------------------------

export const POST_MOVIE_REQUEST = 'POST_MOVIE_REQUEST'
export const POST_MOVIE_SUCCESS = 'POST_MOVIE_SUCCESS'
export const POST_MOVIE_FAILURE = 'POST_MOVIE_FAILURE'

export const postMovieRequest = () => {
    return {
        type: POST_MOVIE_REQUEST
    };
}

export const postMovieSuccess = (data) => {
    return {
        type: POST_MOVIE_SUCCESS,
        data
    };
}

export const postMovieFailure = (error) => {
    return {
        type: POST_MOVIE_FAILURE,
        error
    };
}

// ----------------------------------------------------------------------------

export const STREAM_MOVIE_REQUEST = 'STREAM_MOVIE_REQUEST'
export const CLOSE_STREAM = 'CLOSE_STREAM'

export const streamMovieRequest = (streamMovie) => {
    return {
        type: STREAM_MOVIE_REQUEST,
        streamMovie
    };
}

export const closeStream = () => {
    return {
        type: CLOSE_STREAM,
        
    };
}

// ----------------------------------------------------------------------------

export const EDIT_MOVIE_REQUEST = 'EDIT_MOVIE_REQUEST'
export const EDIT_MOVIE_END = 'EDIT_MOVIE_END'
export const EDIT_MOVIE_FAILURE = 'EDIT_MOVIE_FAILURE'

export const editMovieRequest = (editId, data) => {
    return {
        type: EDIT_MOVIE_REQUEST,
        editId,
        data
    };
}

export const editMovieEnd = () => {
    return {
        type: EDIT_MOVIE_END,
    };
}

export const editMovieFailure = (error) => {
    return {
        type: EDIT_MOVIE_FAILURE,
        error
    };
}

// ----------------------------------------------------------------------------

export const OPEN_UPLOAD = 'OPEN_UPLOAD'
export const CLOSE_UPLOAD = 'CLOSE_UPLOAD'

export const openUpload = (movieId) => {
    return {
        type: OPEN_UPLOAD,
        movieId
    };
}

export const closeUpload = () => {
    return {
        type: CLOSE_UPLOAD
    };
}

// ----------------------------------------------------------------------------

export const SEARCH_CHANGE = 'SEARCH_CHANGE'

export const searchChange = (search) => {
    return {
        type: SEARCH_CHANGE,
        search
    };
}
