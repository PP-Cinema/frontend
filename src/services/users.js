import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";


class UserService
{
    static async signIn(login,password)
    {
        console.log(ENDPOINT.authenticate);
        try
        {
            const data = await axios.post(ENDPOINT.authenticate,
                {
                    login,
                    password
                });
            return {status: REQUEST_STATUS.SUCCESS, data};
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }
}

export default UserService;