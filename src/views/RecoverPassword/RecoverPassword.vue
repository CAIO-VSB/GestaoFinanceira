<template>
    <main class="recover-main">
       
        <div class="recover__container">

            <div>
                <h2 class="recover__title">Acesso ao sistema</h2>
            </div>

            <div class="recover__welcome">
                <h3 class="recover__subtitle">Recuperar Senha</h3>
                <p class="recover__description">Insira as informações para iniciar a recuperação</p>
            </div>

            <RecoverForm />
            
        </div>   

    </main>  
</template>

<script setup lang="ts">
    import RecoverForm from '../../components/RecoverForm.vue';

</script>

<style src="./RecoverPassword.css" scoped></style>

