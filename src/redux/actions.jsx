import {
    ADD_FOLDER,
    SELECTED_FOLDER
} from './constants'



export function addFolder(payload) {
    return {
        type: ADD_FOLDER,
        payload
    }
}

export function selectFolder(payload) {
    return {
        type: SELECTED_FOLDER,
        payload
    }
}