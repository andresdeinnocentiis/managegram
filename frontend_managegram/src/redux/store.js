import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
//import { configureStore  } from '@reduxjs/toolkit';
//import userSlice from './reducers/userSlice';

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),

        // Esto es para que el codigo funcione aunque no se tenga instalado Redux DevTools:
        typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__  !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store