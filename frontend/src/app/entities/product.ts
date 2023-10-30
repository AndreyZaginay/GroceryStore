import { AddFirestoreDocument, FirestoreDocument, UpdateFirestoreDocument } from "../services/firestore.service";

export interface Product extends FirestoreDocument {
    name: string;
    price: number;
    typeOfBuying: string;
}

export type AddProduct = AddFirestoreDocument<Product>;
export type UpdateProduct = UpdateFirestoreDocument<Product>;
