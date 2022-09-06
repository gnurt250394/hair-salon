function getConfig() {
  const domain =
    typeof window !== "undefined"
      ? window && window.location && window.location.origin
      : ""
  let url
  switch (domain) {
    // case "": // live
    case "https://vayngay.mcredit.com.vn":
      url = "https://m4s.mcredit.com.vn/"
      break
    case "https://uat-vayngay.mcredit.com.vn": // uat
      url = "https://uat-m4s.mcredit.com.vn/"
      break
    case "https://dev-vayngay.mcredit.com.vn":
      url = "https://dev-m4s.mcredit.com.vn/"
      break
    default:
      // test with localhost
      // url = "https://uat-m4s.mcredit.com.vn/"
      url = "http://localhost:11000/"
      // url = "https://dev-m4s.mcredit.com.vn/"
      break
  }
  return url
}
class HostConfig {
  //* ***************************** DEV ***************************** *//
  BASE_URL = getConfig();

  //* ***************************** SIT ***************************** *//
  // BASE_URL = HostApi.SIT;

  //* ***************************** UAT ***************************** *//
  // BASE_URL = HostApi.UAT;

  //* ***************************** LIVE ***************************** *//
  // BASE_URL = HostApi.LIVE;
}

export const HostApi = {
  LIVE: 'https://m4s.mcredit.com.vn/',
  UAT: 'https://uat-m4s.mcredit.com.vn/',
  SIT: 'https://sit-m4s.mcredit.com.vn/',
  DEV: 'https://dev-m4s.mcredit.com.vn/',
};

export default new HostConfig();
