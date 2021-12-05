import { getAxiosClient } from './axios-client';
import { USER, USER_DETAILS} from '../const/uri'

export const UserApi = {
    getUserDetail(){
        return getAxiosClient().get(USER_DETAILS);
    },
    editUser(idUser, formUser){
        return getAxiosClient().put(USER + "/" + idUser, formUser, {headers: { 'Content-Type': 'multipart/form-data'}});
    }
}