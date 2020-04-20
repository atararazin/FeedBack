import axios from 'axios';
import { FETCH_USER } from './types';


export const fetchUser = () => {
    console.log("got here");
    return function(dispatch) {//sends dispatch function
        axios.get('/api/current_user')
            .then( res => dispatch(
                    { 
                        type:FETCH_USER, 
                        payload: res
                    }
                )
            )
    }
};