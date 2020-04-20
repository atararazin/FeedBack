import axios from 'axios';
import { FETCH_USER } from './types';


export const fetchUser = () => async (dispatch) =>
    {//sends dispatch function
        const res = await axios.get('/api/current_user'); //promise
        dispatch(
                { 
                    type:FETCH_USER, 
                    payload: res.data
                }
        ); 
    };