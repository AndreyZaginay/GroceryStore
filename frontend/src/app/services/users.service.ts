import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { BaseFirestoreService } from "./firebase/firestore.service";
import { AddUser, User } from "@entities/user";

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

    getUserById(id: string) {
        return this.getDoc(`users/${id}`);
    }

    setUser(userId: string, data: AddUser ) {
        return this.setDoc('users', userId, data);
    }
}