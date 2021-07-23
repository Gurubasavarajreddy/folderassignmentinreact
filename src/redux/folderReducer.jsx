import {
    ADD_FOLDER,SELECTED_FOLDER
} from './constants'
const initialState = {
    folderlist:[],
    selectedfolder:{}
};

export function folderReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLDER:
                    return Object.assign({}, state, {
                        folderlist: action.payload
                });
        case SELECTED_FOLDER:
                     return Object.assign({}, state, {
                        selectedfolder: action.payload
                });
        default:
            return state;
    }
}
