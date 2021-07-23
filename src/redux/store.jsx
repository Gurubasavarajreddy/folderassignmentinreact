import {
    createStore, combineReducers
} from 'redux';
import {
    folderReducer
} from './folderReducer';
import {
    composeWithDevTools
} from 'redux-devtools-extension';

const rootReducer=combineReducers({
    folderReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(
    // other store enhancers if any
))