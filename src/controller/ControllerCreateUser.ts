
import { CreateUserEmailEPassword } from "../model/CreateUserEmailEPasswordModel";

export class ControllerCreateUser {
    static async createuser(email: string, password: string) {
        try {
            const createuser = new CreateUserEmailEPassword(email, password)
            return createuser.createuseremailepassword()
        } catch (error) {
            console.log("Erro ao criar novo usuário")
            return { success: false, message: "Erro ao criar novo usuário", error}
        }
    }
}