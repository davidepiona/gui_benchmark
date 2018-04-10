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

export const uploadMovieSuccess = (data) => {
    return {
        type: UPLOAD_MOVIE_SUCCESS,
        data
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

