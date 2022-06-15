import http from "../http-common";

export default class DataServiceLogin {

    constructor(body) {
        this.LOGIN_URL = "/users/login";
        this.body = JSON.stringify({identifiant: body.user, password: body.pwd});
        this.options = {
            withCredentials: true
        }
    }

    async login() {
        const reponse = await http.post(this.LOGIN_URL, this.body, this.options);
        return reponse.data;
    }
}