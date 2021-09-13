import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from "../strings";




class ArticleService
{
    static async addArticle(title,abstract,poster,file)
    {
        let articleForm = new FormData();
        articleForm.append('Title',title);
        articleForm.append('Abstract',abstract);
        articleForm.append('ThumbnailFile',poster)
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
    static async getArticle(id)
    {
        try
        {
            const res = await axios.get(ENDPOINT.articles+`/${id}`);
            const data = res.data;
            console.log(data);
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR,error}
        }
    }
    static async getPages(page,items)
    {
        try
        {
            const params = new URLSearchParams({
                page: page,
                itemsPerPage: items,
              }).toString();
            const res = await axios.get(ENDPOINT.articles+`/?${params}`);
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
              }).toString();
              
            const res = await axios.get(ENDPOINT.articles+`/?${params}`);
            const data = res.data;
            console.log(data);
            return {status: REQUEST_STATUS.SUCCESS, data}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error};
        }
    }
    static async deleteArticle(id)
    {
        try
        {
            const res = await axios.delete(ENDPOINT.articles+`/${id}`);
            return {status: REQUEST_STATUS.SUCCESS, res}
        }
        catch(error)
        {
            console.log(error);
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
}

export default ArticleService;