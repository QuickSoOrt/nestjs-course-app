import {action, makeObservable, observable} from 'mobx';

export default class UserStore
{
    constructor(authService)
    {
        this.username = null;

        makeObservable(this, {
            username: observable,
            signin: action,
            signup: action,
            signout: action
        });

        this.authService = authService;
    }

    async signin(username, password)
    {
        return await this.authService.signin(username, password);
    }

    async signup(username, password)
    {
        return this.authService.signup(username, password);
    }

    signout()
    {
        this.username = null;
    }
}