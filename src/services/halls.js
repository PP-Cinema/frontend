import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";

class HallService
{
    static async getHalls()
    {
        try
        {
            const res = await axios.get(ENDPOINT.halls);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS,data} 
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR,error}
        }
    }
}


export default HallService;