import AppService from "../app-service";

export default class AuthService extends AppService
{
    constructor()
    {
        super();
    }

    async signin(username, password)
    {
        const data = {
            username: username,
            password: password
        }

        return await this.client.post('/auth/signin', data);
    }

    async signup(username, password)
    {
        const data = {
            username: username,
            password: password
        }

        return await this.client.post('/auth/signup', data);
    }

    async singout() {
        console.log('XD');
    }
}