import { SIGN_IN, SIGN_OUT} from './type';
import history from '../history';

export const signIn = payload => {
    return {
        type: SIGN_IN,
        payload
    }
};

export const signOut = () => {
    history.push('/');
    return {
        type: SIGN_OUT
    }
}