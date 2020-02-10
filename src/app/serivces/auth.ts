import { AngularFirestore } from '@angular/fire/firestore';

class Auth {
    private static TOKEN_KEY: string = 'luppy_admin_token';
    private static db: AngularFirestore;

    static isAuthenticated(): Boolean {
        return localStorage.getItem(this.TOKEN_KEY) !== null;
    };

    static getNewToken(): string {
        this.db.firestore.doc('/auth/admin').get()
            .then(response => {
                console.log(response.data());
            });

        return '';
    }
}

export const auth = { 
    isAuthenticated: Auth.isAuthenticated,
    getNewToken: Auth.getNewToken
};