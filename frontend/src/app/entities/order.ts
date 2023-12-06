import { AddFirestoreDocument, FirestoreDocument } from "@services/firebase/firestore.service";

export interface Order extends FirestoreDocument {
    totalPrice: number;
    date: string;
    userId: string;
    products:   {
        productId: string;
        count: number;
    }[]
}

export type AddOrder = AddFirestoreDocument<Order>;
