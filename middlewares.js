export const groupLogger = ({dispatch, getState}) => next => action => {
    console.group(action.type, '(group logger)')
    console.log('prev state:', getState())
    console.log('dispatching:', action)
    const res = next(action)
    console.log('curr state:', getState())
    console.groupEnd()
    return res
}

export const randomLogger = ({dispatch, getState}) => next => action => {
    console.log(Math.random())
    const res = next(action)
    console.log(Math.random())
    return res
}

export const asyncMiddleware = ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
        return action(next, getState)
    }
    return next(action)
}
