<template>
    <main class="login">
       
        <div class="login__container">

            <div>
                <h2 class="login__title">Acesso ao sistema</h2>
            </div>

            <div class="login__welcome">
                <h3 class="login__subtitle">Seja bem-vindo!</h3>
                <p class="login__description">Faça login com suas credenciais</p>
            </div>

            <LoginForm />
            
        </div>   

    </main>  
</template>

<script setup lang="ts">
    import LoginForm from '../../components/LoginForm.vue';
</script>

<style src="./PagLogin.css" scoped></style>

