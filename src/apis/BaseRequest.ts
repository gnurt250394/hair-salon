/**
 * helper.js - for storing reusable logic.
 */
import toastr from 'toastr';
import Axios from 'axios';
import { BaseResponse } from './BaseResponse';
import HostConfig from './HostConfig';
import ResponseCode from './ResponseCode';
import strings from '@/res/strings';

export interface HeaderObj {
  [key: string]: string;
}

/**
 * Some key for request headers
 */
export enum HeaderKeys {
  CONTENT_TYPE = 'Content-Type',
  AUTHEN = 'Authorization',
  X_AUTHEN = 'X-Authorization',
  TRANSFER_ENCODING = 'Transfer-Encoding',
  X_SYSTEM = 'x-source-system',
  X_SERVICE_ID = 'x-service-message-id',
  UNIQUE_DEVICE_ID = 'unique-device-id',
  LOCATION = 'user-location',
  X_USERNAME = 'x-username',
  X_APP_VERSION = 'x-app-version',
  X_DEVICE_INFO = 'x-device-info',
}

/**
 * Some default value for request headers
 * Using when params request is default value, otherwise passing the params from each other
 */
export enum HeaderValue {
  CONTENT_TYPE1 = 'application/json',
  CONTENT_TYPE2 = 'application/json;charset=UTF-8',
  CONTENT_TYPE3 = 'application/x-www-form-urlencoded',
  CONTENT_TYPE4 = 'multipart/form-data',
  TRANSFER_ENCODING = 'chunked',
  X_SYSTEM = 'mobile_4_sales',
}

/**
 * Define format type for params
 */
export enum BodyType {
  RAW, // Params request dạng json
  URLENCODED, // Params request dạng URLSearchParam (key: value)
  FORMDATA, //
  NONE, // Dữ liệu gửi lên đã được đóng gọi dạng object FormData, không cần chuyển đổi dữ liệu.
}

export enum RequestMethod {
  POST,
  GET,
  PUT,
}

/**
 * Some api need to special handle don't according general rules.
 */
enum APIBlackList {
  GET_ADDRESS = 'ekyc-administration-service/provinces/v1/find-by-districtName',
  LOGOUT = 'authentication-service/authentication/mobile-4-sales/v1/logout',
  CHECK_UPGRADE = 'loan-origination-service/mobile-app-version/v1/active'
}

const TIMEOUT_MESSAGE = 'TIMEOUT';
const TIMEOUT = 30 * 1000; // 30 seconds
const TIMEOUT_UPLOAD_FILE = 5 * 60 * 1000; // 5 minutes

const axiosInit = Axios.create({
  baseURL: HostConfig.BASE_URL,
  timeout: TIMEOUT,
});

const { CancelToken } = Axios;


class BaseRequest {
  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel: Map<string, any> = new Map();

  static instance: any;

  appVersion: string = '1.0.0';

  constructor(_instance: any) {
    if (BaseRequest.instance) {
      return BaseRequest.instance;
    }
    BaseRequest.instance = _instance;
  }

  /**
   *
   * @param url Đường dẫn API muốn cancel
   */
  cancelCallApi(url: string) {
    if (this.mapRequestCancel.has(url)) {
      const canceler = this.mapRequestCancel.get(url);
      canceler && canceler();
      this.mapRequestCancel.delete(url);
    }
  }

  // async createAppVersion() {
  //   // if (this.appVersion.length <= 0) {
  //   const versionName = getVersion();
  //   const versionBuild = getBuildNumber();
  //   // const appVer = `${versionName}.${versionBuild}`;
  //   const appVer = '2.1.333';
  //   this.appVersion = appVer;
  //   const appVerWithTime = `${appVer}|${new Date().getTime()}|${Platform.OS === 'ios' ? 'IOS' : 'ANDROID'}`;
  //   const rsaPublicKey = await RNFetchBlob.fs.readFile(getFilePathLocal(Constants.RSA_PUBLIC_KEY), 'utf8');
  //   const appVersion = await encryptData(appVerWithTime, rsaPublicKey);
  //   return appVersion;
  // }

  /**
   * Main method used to fetch data from service
   * @param method
   * @param url
   * @param params
   * @param isShowLoading
   * @param ignoreURLBase
   *        true nếu đường link không cộng BASE_URL ở đầu, false ngược lại
   * @param ignoreHandleCommonError
   *        true nếu muốn request bỏ qua logic xử lý các mã lỗi chung như 401, 504, ...
   * @returns
   */
  async request<T>  /** NOSONAR */(
    method: RequestMethod,
    url: string,
    params?: any,
    isShowLoading?: boolean,
    ignoreURLBase?: boolean,
    ignoreHandleCommonError: boolean = false,
  ) {

    // Checking network connectivity before call API
    if (!navigator.onLine) {
      toastr.error(strings.errors.networkFail);
      const response: BaseResponse<T> = {
        data: {} as T,
      };
      response.status = ResponseCode.NOT_INTERNET;
      return response;
    }

    const requestInterceptor = Axios.interceptors.request.use(
      async config => {
        const configTemp = config;
        configTemp.cancelToken = new CancelToken(cancel => {
          this.mapRequestCancel.set(url, cancel);
        });
        return configTemp;
      },
      err => Promise.reject(err),
    );

    const responseInterceptor = Axios.interceptors.response.use(
      response => {
        if (response.status) {
          if (response.status == ResponseCode.SUCCESS) {
            return response;
          }
          return Promise.reject(response.status);
        }
        return Promise.reject();
      },
      error => {
        return Promise.reject(error);
      },
    );

    const urlRequest = ignoreURLBase ?? false ? url : HostConfig.BASE_URL + url;

    console.log(`=======> REQUEST || ${urlRequest} : \n`, params);
    let request;
    if (method === RequestMethod.POST) {
      request = Axios.post(urlRequest, params);
    } else if (method === RequestMethod.PUT) {
      request = Axios.put(urlRequest, params);
    } else {
      request = Axios.get(urlRequest, { params });
    }
    return Promise.race([
      request,
      // new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     reject(new Error(TIMEOUT_MESSAGE));
      //   }, TIMEOUT);
      // }),
    ])
      .then((res: any) => {
        const response: BaseResponse<T> = {
          data: {} as T,
        };
        response.status = res.status;
        response.code = res.data?.code;
        response.data = res.data?.code && res.data?.data ? res.data?.data : res.data;
        return response;
      })
      .catch(error => {
        const response: BaseResponse<T> = {
          data: {} as T,
        };

        if (error.message === TIMEOUT_MESSAGE && url !== APIBlackList.CHECK_UPGRADE) {
          toastr.error(strings.errors.timeOut);
          return response;
        }
        response.code = error?.response?.data?.code;
        response.error = error?.response?.data?.details ?? error?.response?.data?.data ?? undefined;
        response.status = Number(error?.response?.status)
          || Number(error?.response?.data?.code)
          || Number(ResponseCode.UNKNOW);
        response.message = `${error?.response?.data?.message || strings.errors.unknowError
          } (${response.status})`;

        if (ignoreHandleCommonError && response.status == ResponseCode.UNAUTHORIZED) {
          response.message = '';
        }

        if (!ignoreHandleCommonError) {
          switch (response.status) {
            case ResponseCode.GATEWAY_TIME_OUT:
              toastr.error(
                `${strings.errors.timeOut} (${response.status})`,
              );
              response.message = '';
              break;
            case ResponseCode.INTERNAL_SERVER_ERROR:
              toastr.error(`${response.message}`);
              response.message = '';
              break;
            case ResponseCode.UNAUTHORIZED: // Đã có dialog thông báo 401 ở trên
              response.message = '';
              break;
            default:
              toastr.error(
                `${strings.errors.unknowError} (${response.status})`,
              );
              break;
          }
        }
        return response;
      })
      .finally(() => {
        Axios.interceptors.request.eject(requestInterceptor);
        Axios.interceptors.response.eject(responseInterceptor);
      });
  }

}

const Api = new BaseRequest(axiosInit);
export default Api;
