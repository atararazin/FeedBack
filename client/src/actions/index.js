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


export const handleToken = (token) => async dispatch => 
{
    const res = await axios.post('/api/payments', token);//POST because were sending info
    dispatch(
        { 
            type:FETCH_USER, 
            payload: res.data
        }
    );
};


export const submitSurvey = (values, history) => async dispatch =>
{
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch(
        {
            type: FETCH_USER, 
            payload: res.data,
        }
    );
    return { type:'submit_survey' };
};