export const INCREMENT = 'INCREMENT'
export const DECREMENT ='DECREMENT'
export const ADD = 'ADD'
export const COLOR = 'COLOR'
export const STATUS_CHANGE = 'STATUS_CHANGE'

export const increment = () => ({
    type: INCREMENT
})

export const decrement = () => ({
    type: DECREMENT
})

export const add = sum => ({
    type: ADD,
    sum
})

export const colorAct = color => ({
    type: COLOR,
    color
})

export const status = message => ({
    type: STATUS_CHANGE,
    message
})

export const incrementAsync = () => (dispatch, getState) => {
    dispatch(status('incrementing...'))
    return asyncApi()
        .then(() => {
            dispatch(increment())
            dispatch(status(null))
        })
        .catch(err => {
            setTimeout(() => dispatch(status(null)), 3000)
            return dispatch(status(err))
        })
}


function asyncApi() {
    return new Promise((res, rej) => {
        if (Math.random() < 0.5) {
            setTimeout(() => rej('sorry, wasn\'t able to increment...'), 1500)
        }
        setTimeout(() => res(), 1500)
    })
}