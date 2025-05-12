import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export class CreateUserEmailEPassword {

    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    public async createuseremailepassword(): Promise<boolean> {
        try {
            await createUserWithEmailAndPassword(auth, this.email, this.password)
            return true
        } catch (error) {
            console.log("Erro ao criar novo usuário")
            return false
        }
    }
}