import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";




class ArticleService
{
    static async addArticle(title,abstract,file)
    {
        let articleForm = new FormData();
        articleForm.append('Title',title);
        articleForm.append('Abstract',abstract);
        articleForm.append('File',file);
        try
        {
            const result = await axios.post(ENDPOINT.articles,
                articleForm
            );
            return {status: REQUEST_STATUS.SUCCESS,result};
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR,error};
        }
    }
}

export default ArticleService;