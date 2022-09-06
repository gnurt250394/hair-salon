export default {
  SUCCESS: 200,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  UNKNOW: 999,
  BAD_REQUEST: 400,
  GATEWAY_TIME_OUT: 504,
  NOT_INTERNET: 9999,
  FORBIDDEN: 403,
  // Cashflow Precheck số tiền vay vượt quá hạn mức
  PRECHECK_OVER_LOAN: '400.08',
  // Cashflow Precheck hồ sơ đã được khởi tạo trước đó
  PRECHECK_DUPPLICATE_ID_PROFILE: '400.39',
  // Cashflow Precheck nhóm khách hàng NTB hệ thống không hỗ trợ
  PRECHECK_NTB_NOT_SUPPORT: '400.60',
  // Cashflow Precheck nhóm khách hàng hiện hữu  đang có khoản vay hạn mức
  PRECHECK_HH_LIMIT_LOAN: '400.70',
};

export const MessageCode = {
  // BE trả về lỗi 400 kèm message là ACC_NOT_MATCH_DEVICE
  ACC_NOT_MATCH_DEVICE: 'ACC_NOT_MATCH_DEVICE',
  // BE trả về lỗi 400 kèm message là APP_OUTOF_DATE
  APP_OUTOF_DATE: 'APP_OUTOF_DATE',
  // BE trả về lỗi 400 kèm message là PASSWORD_EXPIRED => Mật khẩu hết hạn
  PASSWORD_EXPIRED: 'PASSWORD_EXPIRED',
};
