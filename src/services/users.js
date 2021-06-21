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
    static async createUser(login,password,isAdmin)
    {
        try
        {
            const data = await axios.post(ENDPOINT.employees,
                {
                    login,
                    password,
                    isAdmin
                });
            return {status: REQUEST_STATUS.SUCCESS, data};
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
    static async getEmployees()
    {
        try
        {
            const res = await axios.get(ENDPOINT.employees);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
    static async deleteEmployee(id)
    {
        try
        {
            const res = await axios.delete(ENDPOINT.employees+`/${id}`);
            return {status: REQUEST_STATUS.SUCCESS, res}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
}

export default UserService;