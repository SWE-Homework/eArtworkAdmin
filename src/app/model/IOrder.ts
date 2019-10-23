import {IArtwork} from "./IArtwork";

export interface IOrder {
  orderId: number;
  dateCreated: object;
  dateShipped: object;
  status: string;
  shippingInfo: {
    shippingInfoId: number;
    shippingType: string;
    shippingCost: number;
  };
  orderDetail: {
    orderDetailId: number;
    quantity: number;
    unitCost: number;
    artWork: IArtwork
  }[];

}
