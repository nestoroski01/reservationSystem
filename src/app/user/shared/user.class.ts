export class User {
    constructor(public key: string,
        public data: data) { }
}

interface data {
    firstName: string,
    lastName: string,
    telephone?: string,
    email?: string,
    password?: string,
    profilePicture: string 
}