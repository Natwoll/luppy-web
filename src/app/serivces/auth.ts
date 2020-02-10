import { AngularFirestore } from '@angular/fire/firestore';

class Auth {
    private static TOKEN_KEY: string = 'luppy_admin_token';
    private static db: AngularFirestore

    static getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    };

    static isAuthenticated(): Boolean {
        this.db.firestore.doc('/auth/admin').get()
            .then(response => {
                console.log(response.data());
            });

        return true;
    }
}

export const auth = { 
    isAuthenticated: Auth.isAuthenticated,
    getNewToken: Auth.getToken
};