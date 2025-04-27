
<template>

    <form @submit.prevent="SubmitDados">

        <div class="recover__form-group"> 
        <!--div que controla os forms itens-->

        <div class="recover__form-item">
            <q-input class="recover__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
            autocomplete="email"
            name="email"
            title="Insira seu e-mail aqui"
            />
        </div>

        <div class="recover__form-button">

            <q-btn 
            style="padding: 10px; width: 100%;"
            color="primary" label="Recuperar Senha"
            @click="SubmitDados"
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

    import {  ref } from 'vue';
    import { ElMessageBox, ElMessage} from 'element-plus'
  

    const inputEmail = ref("");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const loading = ref(false);


    function validData(): boolean {

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

        return true;
    }

    async function SubmitDados() {

        const isValid = validData();

        if (!isValid) {
            return false;
        }

        try {
            
            loading.value = true;

            await new Promise(resolve => setTimeout(resolve, 2000));

            const result = await ControllerRecoverPassword.recoverpassword(inputEmail.value)

            if (result) {
                ElMessageBox.alert("Solicitação enviada com sucesso. Acesse seu e-mail para continuar o processo.", "Sucesso", {
                    confirmButtonText: "Entendi",
                    callback: (action: string) => {
                        if (action === "confirm") {
                            ElMessage({
                                type: "success",
                                message: "Continue o processo pelo seu e-mail cadastrado",
                                duration: 5000
                            })
                        }
                    }
                })

            } else {
                ElMessageBox.alert("Infelizmente algo deu errado com sua solicitação. Se o erro persistir, contato o suporte técnico", "Atenção", {
                    confirmButtonText: "Entendi",
                    callback: (action: string) => {
                        if (action === "confirm") {
                            ElMessage({
                                type: "warning",
                                message: "Tente novamente. Algo deu errado",
                                duration: 5000
                            })
                        }
                    }
                })

                return false
            }
        } catch (error) {
            console.log("Erro ao enviar solicitação" + error)
        } finally {
            loading.value = false;
        }

        
    }

</script>


<style src="/src/views/RecoverPassword/RecoverPassword.css" scoped></style>