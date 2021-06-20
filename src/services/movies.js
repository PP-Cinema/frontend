import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";

class MovieService
{
    static async addMovie(title,length,description,posterFile)
    {
        try
        {
            let articleForm = new FormData();
            articleForm.append('Title',title);
            articleForm.append('Length',length);
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
}

export default MovieService;