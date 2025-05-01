<template>

    <main class="login__main">
        
        <div class="login__container">

            <div>
                <h2 class="login__title">Acesso ao sistema</h2>
            </div>

            <div class="login__welcome">
                <h3 class="login__subtitle">Seja bem-vindo!</h3>
                <p class="login__description">Insira suas credenciais logo abaixo</p>
            </div>

            <form @submit.prevent="SubmitDados">

            <div class="login__form-group"> 
            <!--div que controla os forms itens-->

            <div class="login__form-item">
                <q-input class="login__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
                autocomplete="email"
                name="email"
                title="Insira um e-mail válido"
                />
            </div>

            <div class="login__form-item">
                <q-input class="login__input-password" outlined type="password" v-model="inputPassword" label="Insira sua senha" 
                autocomplete="password"
                name="password"
                title="Insira uma senha de 6 dígitos "
                />
            </div>

            <div class="login__form-button">
                <q-btn 
                style="padding: 10px; width: 100%;" color="primary" label="Entrar" @click="SubmitDados"
                :loading="loading"
                >

                <template #loading>
                    <q-spinner-hourglass
                    color="white"
                    size="1.5em"
                    />
                </template>
                
                </q-btn>
            </div>

            <div class="login__extras">
                <span>Esqueceu sua senha? <router-link style="text-decoration: none;" to="Recuperar-Senha">Recupere aqui</router-link></span>

                <span>Sem acesso? <router-link style="text-decoration: none;" to="Recuperar-Senha">Crie agora</router-link></span>
            </div>

            <div class="login__extras--title-outras-formas">
                <span>Outras formas de login</span>
            </div>

            <div class="login__extras--goolge">
                <button @click="SubmitGoogle" type="button" class="login__bnt--google">
                    <img class="login__img--goolge" src="/src/assets/google-icon.svg">
                    <span>Google</span>
                </button>
            </div>
        </div>

        </form>
            
        </div>   
        <div class="login__right-side ">
            <h2 class="">Controle total das suas finanças em um só lugar</h2>
            <h3>Organize, acompanhe e alcance seus objetivos financeiros com praticidade.</h3>
        </div>

    </main>  
     
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { ElMessageBox, ElMessage} from 'element-plus'
    import router from "../router/router"
    import { ControllerLogin } from '../controller/ControllerLogin'

    const loading = ref(false)
    const inputEmail = ref("")
    const inputPassword = ref("")
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    function validData(): boolean {

        if (!inputEmail.value.trim() || !inputPassword.value.trim()) {
            ElMessageBox.alert("Faltam informações obrigatórias.", "Atenção", {
                confirmButtonText: "Entendi",
                callback: (action: string) => {
                    if (action === "confirm") {
                        ElMessage({
                            type: "error",
                            message: "Campo e-mail ou senha obrigatórios. Tente novamente",
                            duration: 5000
                        })
                    }
                }
            })

            return false;
        }

        if (!regexEmail.test(inputEmail.value)) {
            ElMessageBox.alert("Insira um e-mail válido", "Atenção", {
                confirmButtonText: "Entendi",
                callback: (action: string) => {
                    if (action === "confirm") {
                        ElMessage({
                            type: "error",
                            message: "Campo 'E-mail' inváldo. Tente novamente",
                            duration: 5000
                        })
                    }
                }
            })
            
            return false
        }

        if (inputPassword.value.length < 6) {
            ElMessageBox.alert("Insira uma senha válida. Minímo 6 caracteres", "Atenção", {
                confirmButtonText: "Entendi",
                callback: (action: string) => {
                    if (action === "confirm") {
                        ElMessage({
                            type: "error",
                            message: "Minímo 6 caracteres. Esqueceu sua senha?",
                            duration: 5000
                        })
                    }
                }
            })
            return false
        }

        return true
    }
  
    async function SubmitDados() {

        const isValidData = validData();

        if (!isValidData) {
            return;
        }

        try {
            loading.value = true;

            const result = await ControllerLogin.signEmailESenha(inputEmail.value, inputPassword.value) 

           if (result) {
                router.push({name: "Pagina-Principal"})
           } else {
                alert("Usuário não encontrado")
                console.log("Usuário não encontrado...")
           }

        } catch (error) {

            console.log("Erro ao validar com user e password" + error)
            
        } finally {

            loading.value = false;
        }
    }

    async function SubmitGoogle() {

        try {
            loading.value = true
        
            const result = await ControllerLogin.signGoolge()

            if (result) {
                console.log("Autenticação bem-sucedida, redirecionado...")
                router.push({name: "Pagina-Principal"})
            } else {
                console.log("Autenticação falhou")
                ElMessageBox.alert("Erro ao validar com o google. Se o erro persistir, contato o suporte técnico.", "Alerta de erro")  
            }

        } catch (error) {
            console.log("Erro inesperado" + error)
            ElMessageBox.alert("Erro não programado. Se o erro persistir, contate o suporte técnico.", "Alerta de erro")  
        }finally {
            loading.value = false
        }
    }

</script>

<style src="/src/views/PagLogin/PagLogin.css" scoped>

</style>