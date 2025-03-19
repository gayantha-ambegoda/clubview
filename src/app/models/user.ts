import { Club } from "./club";

export class User {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
}
export class UserMain {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    clubs : Club[] = [];
    userRole : UserRoles[] = [];
}

export class UserRoles{
    userId : number = 0;
    clubId : number = 0;
    role : string = '';
}

export class UserRoleRequest {
    userEmail: string = '';
    clubId: number = 0;
    role: string = '';
}