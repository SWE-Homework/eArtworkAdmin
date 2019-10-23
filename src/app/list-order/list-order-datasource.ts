import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource} from "@angular/material";
import {IArtwork} from "../model/IArtwork";

// TODO: Replace this with your own data model type
export interface ListOrderItem {
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
  }[];
  artWork: IArtwork
}

// TODO: replace this with real data from your application


/**
 * Data source for the ListOrder view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListOrderDataSource extends MatTableDataSource<ListOrderItem> {
  data: [] ;
  paginator: MatPaginator;
  sort: MatSort;
  //order: any;

  constructor() {
    super();
  }



  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListOrderItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListOrderItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        //case 'dateCreated': return compare(+a.dateCreated, +b.dateCreated, isAsc);
        //case 'orderId': return compare(+a.orderId, +b.orderId, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
