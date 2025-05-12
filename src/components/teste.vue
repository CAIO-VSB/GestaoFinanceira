<template>
  <q-form @submit="onSubmit">
    <q-input
      v-model="email"
      label="E-mail"
      filled
      :rules="[
        val => !!val || 'E-mail é obrigatório',
        val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'E-mail inválido'
      ]"
      lazy-rules
      ref="emailRef"
    />

    <q-input
      v-model="senha"
      label="Senha"
      filled
      type="password"
      :rules="[
        val => !!val || 'Senha é obrigatória',
        val => val.length >= 6 || 'Mínimo 6 caracteres'
      ]"
      lazy-rules
      ref="senhaRef"
      class="q-mt-md"
    />

    <q-btn label="Entrar" type="submit" color="primary" class="q-mt-lg" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const senha = ref('')

const emailRef = ref(null)
const senhaRef = ref(null)

function onSubmit() {
  const isEmailValid = emailRef.value.validate()
  const isSenhaValid = senhaRef.value.validate()

  if (isEmailValid && isSenhaValid) {
    console.log('Tudo certo, pode enviar!')
  }
}
</script>
