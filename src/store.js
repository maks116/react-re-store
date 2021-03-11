import { createStore, applyMiddleware } from 'redux' //import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
// Enhancers 
/*
const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    //Monkey patching 
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            })
        }
        return originalDispatch(action)
    }
    return store
}

const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    //Monkey patching 
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type)
        return originalDispatch(action)
    }
    return store
}
*/

//Middleware
const logMiddleware = (store) => (dispatch) => (action) => {    //const logMiddleware = ({getState, dispatch}}) => (next) => (action) => {
    console.log(action.type, store.getState())
    return dispatch(action)
}

const stringMiddleware = () => (dispatch) => (action) => {      //const stringMiddleware = ({getState, dispatch}}) => (next) => (action) => {
    console.log(action.type, store.getState())
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

// Enhancers
//const store = createStore(reducer, compose(stringEnhancer, logEnhancer))

//Middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware))

const myAction = (dispatch) => {
    setTimeout(() => dispatch ({
        type: 'DELAY_ACTION'
    }), 2000)
}

store.dispatch(myAction)

//store.dispatch('HELLO_WORLD')

export default store