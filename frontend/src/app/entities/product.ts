import { AddFirestoreDocument, FirestoreDocument, UpdateFirestoreDocument } from "../services/firestore.service";

export interface Product extends FirestoreDocument {
    name: string;
    price: number;
    img: string;
    typeOfBuying: string;
}

export type AddProduct = AddFirestoreDocument<Product>;
export type UpdateProduct = UpdateFirestoreDocument<Product>;
