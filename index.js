import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from './store'
import {
    counter,
    color,
    status
} from './reducers'
import {
    increment,
    decrement,
    add,
    colorAct,
    incrementAsync
} from './actions'
import {
    groupLogger,
    randomLogger,
    asyncMiddleware
} from './middlewares'

const reducer = combineReducers({counter, color, status})

let store = createStore(reducer, applyMiddleware(asyncMiddleware/* , randomLogger */, groupLogger))

const counterField = document.getElementById('counter')
const incrBtn = document.getElementById('increment')
const decrBtn = document.getElementById('decrement')
const addForm = document.getElementById('add-form')
const addInput = document.getElementById('add-input')
const addBtn = document.getElementById('add-btn')
const box = document.getElementById('box')
const boxInput = document.getElementById('box-input')
const asyncBtn = document.getElementById('btn-async')
const mssgField = document.getElementById('mssg')

const handleAdd = (event) => {
    event.preventDefault()
    if (!event.target[0].value) return
    store.dispatch(add(+event.target[0].value))
    event.target[0].value = null
}

incrBtn.addEventListener('click', () => store.dispatch(increment()))
decrBtn.addEventListener('click', () => store.dispatch(decrement()))
addForm.addEventListener('submit', handleAdd)

boxInput.addEventListener('input', e => store.dispatch(colorAct(e.target.value)))
asyncBtn.addEventListener('click', e => store.dispatch(incrementAsync()))

store.subscribe(() => counterField.innerHTML = store.getState().counter)
store.subscribe(() => box.style.backgroundColor = store.getState().color)
store.subscribe(() => mssgField.innerHTML = store.getState().status)
