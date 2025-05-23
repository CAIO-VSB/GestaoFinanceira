import { CreateUserEmailEPassword } from "./CreateUserEmailEPasswordModel";
import axios from "axios";

export class UserRegisterService {
    private name: string
    private email: string
    private senha: string

    constructor(name: string, email: string, senha: string) {
        this.name = name
        this.email = email
        this.senha = senha
    }
    public async userresgiterservice(): Promise<boolean> {
        try {
            const createuser = new CreateUserEmailEPassword(this.email, this.senha)
            const usercreate = await createuser.createuseremailepassword()
    
            const token = usercreate.token
    
            const response = await axios.post("http://localhost:4000/buscar-user", 
                { name: this.name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
            return response.data.autenticado === true;
    
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erro Axios:", error.response?.data || error.message)
            } else {
                console.error("Erro inesperado:", error)
            }
            return false
        }
    }

}