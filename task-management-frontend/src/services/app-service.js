import axios from "axios";

export default class AppService
{
    constructor()
    {
        this.client = axios.create({ baseURL: 'http://localhost:3000' });
    }
}