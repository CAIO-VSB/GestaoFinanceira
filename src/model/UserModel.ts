import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios"

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
            
           const userCredential =  await signInWithEmailAndPassword(auth, this.email, this.senha);
           
           const token = await userCredential.user.getIdToken()

           const response = await axios.post("http://localhost:4000/login/validar-token", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })

            return response.data.autenticado === true;

        } catch (error) {

            console.log("Erro na classe usuário" + error)
            
            return false;
        }
        
    }


}
