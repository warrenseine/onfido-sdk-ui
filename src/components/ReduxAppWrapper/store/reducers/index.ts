import { combineReducers } from 'redux'
import captures from './captures'
import globals from './globals'

const appReducer = combineReducers({
  captures,
  globals,
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer