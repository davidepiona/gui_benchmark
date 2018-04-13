import * as ActionTypes from '../actions'

const defaultState = {
    search: ""
};

export default function movies(state = defaultState, action) {
    switch(action.type) {
        case ActionTypes.SEARCH_CHANGE:
            return {
                ...state,
                search: action.search
            }
        default:
                return state
    }
}