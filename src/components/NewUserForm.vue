<template>

    <form @submit.prevent="SubmitDados">

        <div class="create-user__form-group"> 
        <!--div que controla os forms itens-->

        <div class="create-user__form-item">
            <q-input class="create-user__input-user" outlined  v-model="inputUser" label="Insira seu nome" 
            autocomplete="username"
            name="username"
            title="Insira um nome"
            hint="Dica: Se possível, insira somente o primeiro nome e sobrenome"
            :rules="[
                val => !!val || 'Nome é obrigatório',
                val => val.length <= 40 || 'Máximo 40 caracteres']"
            lazy-rules
            ref="userRef"
            clearable
            />
        </div>
        
        <div class="create-user__form-item">
            <q-input class="create-user__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
            autocomplete="email"
            name="email"
            title="Insira um e-mail válido"
            hint="Dica de e-mail válido: user123@gmail.com"
            :rules="[val => !!val || 'E-mail é obrigatório',
                val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'E-mail inválido'
            ]"
            lazy-rules
            ref="emailRef"
            clearable
            />
        </div>

        <div class="create-user__form-item">
            <q-input class="create-user__input-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputPassword" label="Insira uma senha" 
            autocomplete="password"
            name="password"
            title="Insira uma senha de 6 dígitos"
            hint="Info.: Insira um senha de no mínimo 6 dígitos"
            :rules="[val => !!val || 'Campo senha é obrigatório',
                val => val.length > 6 || 'A senha não atende aos requisitos'
            ]"
            lazy-rules
            ref="passwordRef"
            clearable
            >
            <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>   
        </div>
        <div class="create-user__form-item">
            <q-input class="create-user__input-confirm-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputConfirmPassword" label="Repita a senha" 
            autocomplete="password"
            name="password"
            title="Repita sua senha"
            hint="Info.: Repita novamente a senha"
            :rules="[val => !!val || 'Campo repita a senha é obrigatório',
                val => val !== passwordRef || 'As senhas digitadas são diferentes.'
            ]"
            lazy-rules
            ref="confirmPasswordRef"
            clearable
            >
            <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>   
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
    import { ControllerCreateUser } from '../controller/ControllerCreateUser';
    import { ElMessageBox, ElMessage} from 'element-plus'
   
    const loading = ref(false)
    const inputEmail = ref("")
    const inputPassword = ref("")
    const inputUser = ref("")
    const inputConfirmPassword = ref("")
    const emailRef = ref(null)
    const userRef = ref(null)
    const passwordRef = ref(null)
    const isPwd = ref(true)  
    const confirmPasswordRef = ref(null)

    function validData(): boolean {

        let isValid = true

        if (!emailRef.value.validate()) {
            console.log("E-mail inválido")
            isValid = false
           
        }

        if (!userRef.value.validate()) {
            console.log("Nome inválido")
            isValid = false
          
        }

        if (!passwordRef.value.validate()) {
            console.log("Senha inválido")
            isValid = false
            
        }
        
        if (!confirmPasswordRef.value.validate()) {
            console.log("Senhas não batem")
            isValid = false
        }

        return isValid
    }
  
    async function SubmitDados() {

        const isValidData = validData();

        if (!isValidData) {
            return;
        }

        try {

            loading.value = true;

            const result = await ControllerCreateUser.createuser(inputEmail.value, inputPassword.value)

            if (result) {
                ElMessageBox.alert("Conta criada com sucesso", "Sucesso")
                ElMessage({
                    message: "Operação realizado com sucesso",
                    type: "success",
                    duration: 3000
                })
            }

        } catch (error) {

            console.log("Erro ao validar com user e password" + error)

        } finally {

            loading.value = false;
        }
    }

</script>


<style src="/src/views/NewUser/NewUser.css" scoped></style>