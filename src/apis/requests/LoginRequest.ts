import Api, { RequestMethod } from "../BaseRequest";
import { LoginParam } from "../interfaces/UserInterfaces";

class LoginRequest {
    login<T>(params: LoginParam) {
        return Api.request<T>(RequestMethod.POST, 'v1/auth/login', params);
    }
}
export default new LoginRequest();
