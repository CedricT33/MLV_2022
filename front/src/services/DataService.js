import http from "../http-common";

export default class DataService {

    constructor(type) {
        this.type = type;
    }

    async getAll() {
        return http.get("/" + this.type).then(reponse => {
            console.log(this.type + " : ", reponse.data);
            return reponse.data;
        }).catch(error => console.log("error : ", error));
    }

    async new(body, token) {
        return http.post("/" + this.type + "/new", body, {headers: {'x-auth-token': token}}).then(reponse => {
            console.log(this.type + "[new] : ", reponse.data);
            return reponse.data;
        }).catch(error => console.log("error : ", error));
    }

    async update(body, id, token) {
        return http.post("/" + this.type + "/update/" + id, body, {headers: {'x-auth-token': token}}).then(reponse => {
            console.log(this.type + "[update] : ", reponse.data);
            return reponse.data;
        }).catch(error => console.log("error : ", error));
    }

    async delete(id, token) {
        return http.delete("/" + this.type + "/" + id, {headers: {'x-auth-token': token}}).then(reponse => {
            console.log(this.type + "[delete] : ", reponse.data);
            return reponse.data;
        }).catch(error => console.log("error : ", error));
    }
}