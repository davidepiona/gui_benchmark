import { createStore } from 'redux'
import reducers from '../reducers'
import DevTools from '../DevTools'

export default () => createStore(reducers, {} , DevTools.instrument())
