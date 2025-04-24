<template>

    <form @submit.prevent="SubmitDados">

        <div class="create-user__form-group"> 
        <!--div que controla os forms itens-->

        <div class="create-user__form-item">
            <q-input class="create-user__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
            autocomplete="email"
            name="email"
            title="Insira um e-mail válido"
            />
        </div>

        <div class="create-user__form-item">
            <q-input class="create-user__input-password" outlined type="password" v-model="inputPassword" label="Insira sua senha" 
            autocomplete="password"
            name="password"
            title="Insira uma senha de 6 dígitos "
            />
        </div>

        <div class="create-user__form-item">
            <q-input class="create-user__input-confirm-password" outlined type="password" v-model="inputConfirmPassword" label="Repita a senha" 
            autocomplete="password"
            name="password"
            title="Repita sua senha"
            />
        </div>

        <div class="create-user__form-button">
            <q-btn 
            style="padding: 10px; width: 100%;" color="primary" label="Criar Conta" @click="SubmitDados"
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
        </div>

    </form>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { ControllerLogin } from '../controller/ControllerLogin';
    import { ElMessageBox } from 'element-plus'
    import router from "../router/router";


    const loading = ref(false);
    const inputEmail = ref("");
    const inputPassword = ref("");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputConfirmPassword = ref("");

    function validData(): boolean {

        if (!inputEmail.value.trim() || !inputPassword.value.trim()) {
            ElMessageBox.alert("Faltam informações obrigatórias.", "Atenção")
            return false
        }

        if (!regexEmail.test(inputEmail.value)) {
            ElMessageBox.alert("Insira um e-mail válido", "Atenção", {
                customClass: "bg-button"
            })
            return false
        }

        if (inputPassword.value.length < 6) {
            ElMessageBox.alert("Insira uma senha válida. Minímo 6 caracteres", "Atenção")
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

            await new Promise(resolve => setTimeout(resolve, 2000));

            loading.value = false;

           const result = await ControllerLogin.signEmailESenha(inputEmail.value, inputPassword.value);

           if (result) {
                router.push({name: "Pagina-Principal"})
           } else {
                console.log("Usuário naõ encontrado...")
           }

        } catch (error) {
            console.log("Erro ao validar com user e password" + error)
        }
    }

    async function SubmitGoogle() {

        try {
            loading.value = true

            const sucess = await ControllerLogin.signGoolge();

            loading.value = false

            if (sucess) {
                console.log("Autenticação bem-sucedida, redirecionado...")
                router.push({name: "Pagina-Principal"})
            } else {
                console.log("Autenticação falhou")
                alert("Erro ao validar com google")   
            }

        } catch (error) {
            console.log("Erro inesperado" + error)
            alert("Erro não programado")
        }
    }

</script>


<style src="/src/views/NewUser/NewUser.css" scoped></style>