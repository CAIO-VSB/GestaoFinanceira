<template>

    <main class="login__main">
        
        <div class="login__container">

            <div>
                <h2 class="login__title">Acesso ao sistema</h2>
            </div>

            <div class="login__welcome">
                <h3 class="login__subtitle">Bem-vindo de volta</h3>
                <p class="login__description">Acesse sua conta para continuar</p>
            </div>

            <form @submit.prevent="SubmitDados">

            <div class="login__form-group"> 
            <!--div que controla os forms itens-->

            <div class="login__form-item">
                <q-input class="login__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
                autocomplete="email"
                name="email"
                title="Insira um e-mail válido"
                :rules="[val => !!val || 'Campo obrigatório']"
                clearable
                />
            </div>

            <div class="login__form-item">
            <q-input class="login__input-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputPassword" label="Insira sua senha" 
                title="Insira uma senha de 6 dígitos"
                hint="Mínimo de 6 caracteres"
                :rules="[val => !!val || 'Campo obrigatório']"
                >

                <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>   
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
                <router-link style="text-decoration: none;" to="Recuperar-Senha">Esqueceu sua senha?</router-link>

                <div>
                    <q-checkbox @click="teste" v-model="valueLembrarMim" />
                    <span>Lembrar de mim</span>
                </div>
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
            <div class="login__extras--criar-conta">
              <router-link style="text-decoration: none;" to="Novo-Usuario">Não possui conta? Cadastre-se</router-link>
            </div>
        </div>

        </form>
            
        </div>   
        <div class="login__right-side">
            <div class="login__div-img">
                <img class="login__img-right" src="/src/assets/img-financa-side.png" alt="">    
            </div>
            <h2>Tenha controle total das suas finanças</h2>
            <div class="login__scroll-infinite">
                <h5>Gerencie seus gastos ✅</h5>
                <h5>Acompanhe seus lançamentos ✅</h5>
                <h5>Alcance seus objetivos financeiros com facilidade ✅</h5>
                
                <h5>Gerencie seus gastos ✅</h5>
                <h5>Acompanhe seus lançamentos ✅</h5>
                <h5>Alcance seus objetivos financeiros com facilidade ✅</h5>
            </div>
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
    const valueLembrarMim = ref(null)
    const isPwd = ref(true)

    function teste() {
        alert("Testando 123")
    }

    function validData(): boolean {

        if (!inputEmail.value.trim() && !inputPassword.value.trim()) {
            ElMessageBox.alert("Verifique os campos e tente novamente", "Atenção", {
                confirmButtonText: "Entendi",
                callback: (action: string) => {
                    if (action === "confirm") {
                        ElMessage({
                            type: "warning",
                            message: "Campo obrigatório vazio",
                            duration: 5000
                        })
                    }
                }
            })

            return false
        }

        if (!regexEmail.test(inputEmail.value)) {
            ElMessageBox.alert("Insira um e-mail válido. Ex.: exemplo@gmail.com")       
            return false
        }

        if (inputPassword.value.length < 6) {
            ElMessageBox.alert("A senha deve conter no mínimo 6 caracteres") 
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