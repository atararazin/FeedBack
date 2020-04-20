import {FETCH_USER} from '../actions/types';

export default function(state = null, action){
    //returns null if we dont know, the user value if logged in, or false if not
    switch(action.type){
        case FETCH_USER:
            return action.payload || false; //the user model
        default:
            return state;
    }
}