import { AddFirestoreDocument, FirestoreDocument } from "../services/firebase/firestore.service";

export interface User extends FirestoreDocument {
    email: string;
}

export type AddUser = AddFirestoreDocument<User>;