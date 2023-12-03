import { Injectable } from "@angular/core";

import { BaseFirestoreService } from "./firebase/firestore.service";
import { AddOrder, Order } from "../entities/order";

@Injectable()
export class OrdersService extends BaseFirestoreService<Order> {
    getUserOrders() {

    }

    addOrder(order: AddOrder) {
        return  this.addDoc('orders', order);
    }
}