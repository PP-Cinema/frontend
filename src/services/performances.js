import axios from "axios";
import { ENDPOINT,REQUEST_STATUS } from "../strings";

class PerformanceService
{
    static async createPerformance(date,nPrice,dPrice,hall,movie)
    {
        try
        {
            let performanceForm = new FormData();
            performanceForm.append('Date',date);
            performanceForm.append('NormalPrice',nPrice);
            performanceForm.append('DiscountedPrice',dPrice);
            performanceForm.append('Hall',hall);
            performanceForm.append('Movie',movie);
            const data = await axios.post(ENDPOINT.performances,performanceForm);

            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
    static async getPerformance(id)
    {
        try
        {
            console.log('dupa');
            const res = await axios.get(ENDPOINT.performances+`/${id}`);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error)
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
}

export default PerformanceService;