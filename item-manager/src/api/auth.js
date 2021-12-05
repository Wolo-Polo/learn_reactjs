import { getAxiosClient } from './axios-client';
import { REGISTER, LOG_IN} from '../const/uri'

export const AuthApi = {
    signUp(data){
        return getAxiosClient().post(REGISTER, data);
    },
    login(data){
        return getAxiosClient().post(LOG_IN, data);
    }
}