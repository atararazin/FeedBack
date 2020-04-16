import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => {
    return function(dispatch) {//sends dispatch function
        axios.get('/api/current_user')
            .then( res => dispatchEvent(
                    { 
                        type:FETCH_USER, 
                        payload: res
                    }
                )
            )
    }
};