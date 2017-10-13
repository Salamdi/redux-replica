import {
    INCREMENT,
    DECREMENT,
    ADD,
    COLOR,
    STATUS_CHANGE
} from './actions.js'

export const counter = (state = 0, {type, sum}) => {
    switch (type) {
        case INCREMENT:
            return ++state
        case DECREMENT:
            return --state
        case ADD:
            return state + sum
        default:
            return state
    }
}

export const status = (state = null, {type, message}) => {
    switch (type) {
        case STATUS_CHANGE:
            return message
        default:
            return state
    }
}

export const color = (state = 'white', {type, color}) => {
    return color || state
}
