import { AddFirestoreDocument, FirestoreDocument, UpdateFirestoreDocument } from "@services/firebase/firestore.service";

export interface User extends FirestoreDocument {
    email: string;
}

export type AddUser = AddFirestoreDocument<User>;

export type UpdateUser = UpdateFirestoreDocument<User>;

export interface UserRegisterCredentials {
    email: string;
    password: string;
}