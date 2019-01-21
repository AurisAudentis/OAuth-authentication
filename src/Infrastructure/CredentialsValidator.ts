import {compare} from "bcryptjs";
import User from "../Database/Models/User.Model";

 export function validateUserCredentials(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
}
