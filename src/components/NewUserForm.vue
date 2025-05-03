<template>

    <form @submit.prevent="SubmitDados">

        <div class="create-user__form-group"> 
        <!--div que controla os forms itens-->

        <div class="create-user__form-item">
            <q-input class="create-user__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
            autocomplete="email"
            name="email"
            title="Insira um e-mail válido"
            :rules="[val => !!val || 'Campo obrigatório']"
            />
        </div>

        <div class="create-user__form-item">
            <q-input class="create-user__input-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputPassword" label="Insira sua senha" 
            autocomplete="password"
            name="password"
            title="Insira uma senha de 6 dígitos"
            hint="Mínimo 6 caracteres"
            :rules="[val => !!val || 'Campo obrigatório']"
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
            hint="Mínimo 6 caracteres"
            :rules="[val => !!val || 'Campo obrigatório']"
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
    import { ElMessageBox } from 'element-plus'
   
    const loading = ref(false)
    const inputEmail = ref("")
    const inputPassword = ref("")
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputConfirmPassword = ref("")
    const isPwd = ref(true)

    function validData(): boolean {

        if (!inputEmail.value.trim() || !inputPassword.value.trim()) {
            ElMessageBox.alert("Verifique os campos e tente novamente", "Atenção")
            return false
        }

        if (!regexEmail.test(inputEmail.value)) {
            ElMessageBox.alert("Insira um e-mail válido", "Atenção", {
            })
            return false
        }

        if (inputPassword.value.length < 6) {
            ElMessageBox.alert("Insira uma senha válida. Minímo 6 caracteres", "Atenção")
            return false
        }

        if (inputPassword.value !== inputConfirmPassword.value) {
            ElMessageBox.alert("As senha não conferem", "Atenção")
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

        } catch (error) {
            console.log("Erro ao validar com user e password" + error)
        }
    }



</script>


<style src="/src/views/NewUser/NewUser.css" scoped></style>