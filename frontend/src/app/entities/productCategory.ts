import { AddFirestoreDocument, FirestoreDocument } from "@services/firebase/firestore.service";

export interface ProductCategory extends FirestoreDocument {
    name: string;
}

export type AddProductCategory = AddFirestoreDocument<ProductCategory>;