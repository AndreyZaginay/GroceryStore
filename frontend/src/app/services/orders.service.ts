import { Injectable } from "@angular/core";

import { BaseFirestoreService } from "./firebase/firestore.service";
import { AddOrder, Order } from "../entities/order";
import { where } from "@angular/fire/firestore";

@Injectable()
export class OrdersService extends BaseFirestoreService<Order> {

    getUserOrders(userId: string) {
        return this.getDocs('orders', where('userId', '==', userId))
    }

    addOrder(order: AddOrder) {
        return this.addDoc('orders', order);
    }
}