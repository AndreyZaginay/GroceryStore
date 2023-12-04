import { AddFirestoreDocument, FirestoreDocument, UpdateFirestoreDocument } from "@services/firebase/firestore.service";

export interface Product extends FirestoreDocument {
    name: string;
    price: number;
    measurement: string;
}

export type AddProduct = AddFirestoreDocument<Product>;
export type UpdateProduct = UpdateFirestoreDocument<Product>;
