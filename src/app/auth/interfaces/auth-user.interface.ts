export interface AuthUser {
    borndate?:      string;
    email?:         string;
    username?:      string;
    password?:      string;
    tokens?:        number;
    tournament_id?: string;
    image?:         string;
    isJoined?:      boolean;
}

// export interface AuthUser {
//     id:       string;
//     password: string;
//     tokens?:  string;
//     borndate: string;
//     email:    string;
//     username: string;
// }