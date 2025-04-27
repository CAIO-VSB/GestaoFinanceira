import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export class UsuarioGoogle {
    
    public async loginComGoogle(): Promise<boolean> {

        const provider = new GoogleAuthProvider();

        try {

            await signInWithPopup(auth, provider);
          
            return true;

        } catch (error: any) {

            console.log("Erro na classe usuário" + error.code, error.message);

            return false;
        }

    }
}