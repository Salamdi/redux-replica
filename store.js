export class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer
        this.subscribers = []
        this.getState = this.getState.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.subscribe = this.subscribe.bind(this)
        this.state = initialState;
        this.dispatch({ type: '@@INIT' })
    }

    getState() {
        return this.state
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action)
        this.subscribers.forEach(subscriber => subscriber())
        return this.state
    }

    subscribe(cb) {
        this.subscribers.push(cb)
        cb();
        return () => this.subscribers = this.subscribers.filter(subscriber => subscriber !== cb)
    }
}

export function createStore(reducer, initialState, enhancer) {
    if (typeof initialState === 'function') {
        enhancer = initialState
        initialState = undefined
    }
    if (enhancer) {
        return enhancer(new Store(reducer, initialState))
    }
    const store = new Store(reducer, initialState)
    return store
}

export function combineReducers(reducers) {
    const stateSliceNames = Object.keys(reducers)
    return (state = {}, action) => {
        const nextState = stateSliceNames.reduce(
            (accState, stateSliceName) => {
                accState[stateSliceName] = reducers[stateSliceName](
                    accState[stateSliceName],
                    action
                )
                return accState
            },
            Object.assign({}, state)
        )
        return nextState
    }
}

export function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function applyMiddleware(...middlewares) {
    return store => {
        middlewares = middlewares.map(middleware => middleware(store))
        let dispatch = compose(...middlewares)(store.dispatch)
        return { ...store, dispatch }
    }
}
