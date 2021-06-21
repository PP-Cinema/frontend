import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";

class MovieService
{
    static async addMovie(title,length,abstract,description,posterFile)
    {
        try
        {
            let articleForm = new FormData();
            articleForm.append('Title',title);
            articleForm.append('Length',length);
            articleForm.append('Abstract',abstract);
            articleForm.append('Description',description);
            articleForm.append('PosterFile',posterFile);
            const result = await axios.post(ENDPOINT.movies,articleForm);
            return {status: REQUEST_STATUS.SUCCESS, result};
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }
    static async getAllMovies()
    {
        try
        {
            const res = await axios.get(ENDPOINT.moviesAll);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }

    static async getPages(page,items)
    {
        try
        {
            const params = new URLSearchParams({
                page: page,
                itemsPerPage: items,
                searchString: ''
              }).toString();
            const res = await axios.get(ENDPOINT.movies+`/?${params}`);
            console.log(res);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }
    static async getTotalCount(items)
    {
        try
        {
            const params = new URLSearchParams({
                itemsPerPage: items,
                searchString: ''
              }).toString();
            const res = await axios.get(ENDPOINT.movies+`/?${params}`);
            const data = res.data;
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }
    static async deleteMovie(id)
    {
        try
        {
            const res = await axios.delete(ENDPOINT.movies+`/${id}`);
            return {status: REQUEST_STATUS.SUCCESS, res}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
}

export default MovieService;