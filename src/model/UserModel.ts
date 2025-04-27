import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";



export class Usuario {

    private email: string;
    private senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    } 

    public getEmail(): string {
        return this.email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public async LoginComEmailESenha(): Promise<boolean> {

        try {
            
            await signInWithEmailAndPassword(auth, this.email, this.senha);

            return true;

        } catch (error) {

            console.log("Erro na classe usuário" + error)
            
            return false;
        }
        
    }


}
