import { PaymentGatewaysEnum } from './types';

export default class PaymentWebhookRequestDTO {
  source: PaymentGatewaysEnum;
  status = false;
  reference = '';
  amount = 0;
  event = '';
  paymentMethod = '';
  currency = '';
  paymentGatewayReference = '';
  createdAt = new Date().toDateString();
  paidAt = new Date().toDateString();
  rawDataPayload: string;
  userDetails? = {
    id: '',
    name: '',
    phoneNumber: '',
    email: '',
  };
}
