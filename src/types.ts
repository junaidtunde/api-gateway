const serviceTypes = {
  USER_SVC: 'USER_SVC',
  INVENTORY_SVC: 'INVENTORY_SVC',
  AUTHORIZATION_SVC: 'AUTHORIZATION_SVC',
  LOGISTICS_SVC: 'LOGISTICS_SVC',
  ORDERS_SVC: 'ORDERS_SVC',
  AUCTION_SVC: 'AUCTION_SVC',
  LOAN_SVC: 'LOAN_SVC',
  WALLET_SVC: 'WALLET_SVC',
  CRM_SVC: 'CRM_SVC',
  NOTIFICATION_SVC: 'NOTIFICATION_SVC',
};

export const TYPES = {
  ...serviceTypes,
};

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export type JSONArray = string[] | number[] | boolean[];

export class ResponseDto {
  status: boolean;
  message: string;
  data: any;
}

export type FileUploadConfig = {
  name: string;
  public?: boolean;
  whatsApp?: boolean;
};
