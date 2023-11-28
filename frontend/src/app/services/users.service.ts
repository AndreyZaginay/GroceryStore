import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { BaseFirestoreService } from "./firebase/firestore.service";
import { AddUser, UpdateUser, User } from "../entities/user";

@Injectable()
export class UsersService extends BaseFirestoreService<User> {

    getAdmin() {
        return this.getDocs('admins').pipe(
            map((admins: User[]) => admins[0])
        );
    }

    getUsers() {
        return this.getDocs('users');
    }

    setUser(userId: string, data: AddUser ) {
        return this.setDoc('users', userId, data);
    }

    updateUser(userId: string, data: UpdateUser) {
        return this.updateDoc(userId, data);
    }
}