import { combineReducers } from 'redux'
import signReducer from "./signing"
const rootReducer = combineReducers({
    isLogged: signReducer
})

export default rootReducer