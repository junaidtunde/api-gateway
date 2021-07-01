import {
  auction as AuctionProto,
  authorization as AuthProto,
  crm as CrmProto,
  inventory as InventoryProto,
  loan as LoanProto,
  logistics as LogisticsProto,
  notification as NotificationProto,
  orders as OrdersProto,
  user as UserProto,
  wallet as WalletProto,
} from '@autochek-africa/proto';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from './config';
import { TYPES } from './types';

const loader = {
  includeDirs: [
    join(__dirname, '..', './node_modules/@autochek-africa/proto/proto'),
    join(__dirname, '..', './node_modules/google-proto-files'),
  ],
  arrays: true,
  objects: true,
};

export const microservices = [
  ClientsModule.register([
    {
      name: TYPES.USER_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: UserProto,
        url: config.userSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.LOGISTICS_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'logistics',
        protoPath: LogisticsProto,
        url: config.logisticsSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.INVENTORY_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'inventory',
        protoPath: InventoryProto,
        url: config.inventorySvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.AUTHORIZATION_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'authorization',
        protoPath: AuthProto,
        url: config.authorizationSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.ORDERS_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'orders',
        protoPath: OrdersProto,
        url: config.ordersSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.AUCTION_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'auction',
        protoPath: AuctionProto,
        url: config.auctionSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.LOAN_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'loan',
        protoPath: LoanProto,
        url: config.loanSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.WALLET_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'wallet',
        protoPath: WalletProto,
        url: config.walletSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.CRM_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'crm',
        protoPath: CrmProto,
        url: config.crmSvc,
        loader,
      },
    },
  ]),
  ClientsModule.register([
    {
      name: TYPES.NOTIFICATION_SVC,
      transport: Transport.GRPC,
      options: {
        package: 'notification',
        protoPath: NotificationProto,
        url: config.notificationSvc,
        loader,
      },
    },
  ]),
];
