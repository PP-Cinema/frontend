import { ENDPOINT,REQUEST_STATUS } from "../strings";
import axios from "axios";

class ReservationService
{
    static async createReservation(email,nTickets,dTickets,fName,lName,remarks,pId,seats)
    {
        try
        {
            let reservationForm = new FormData();
            reservationForm.append('Email',email);
            reservationForm.append('NormalTickets',nTickets);
            reservationForm.append('DiscountedTickets',dTickets);
            reservationForm.append('FirstName',fName);
            reservationForm.append('LastName',lName);
            reservationForm.append('Remarks',remarks);
            reservationForm.append('PerformanceId',pId);
            reservationForm.append('Seats',seats);
            const {data} = await axios.post(ENDPOINT.reservations,reservationForm);
            return {status: REQUEST_STATUS.SUCCESS,data};

        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR,error}
        }
    }
    static async getUserReservations(email,lastName)
    {
        try
        {
            const params = new URLSearchParams({
                email: email,
                lastName: lastName
            }).toString();
            const {data} = await axios.get(ENDPOINT.reservationsAll+`/?${params}`);
            return {status: REQUEST_STATUS.SUCCESS,data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR,error}
        }
    }
    static async cancelReservation(id)
    {
        try
        {
            const res = await axios.delete(ENDPOINT.reservations+`/${id}`);
            return {status: REQUEST_STATUS.SUCCESS, res}
        }
        catch(error)
        {
            return {status: REQUEST_STATUS.ERROR,error}
        }
    }
}

export default ReservationService;