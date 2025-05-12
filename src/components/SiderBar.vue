<script type="ts" setup>
    import { ref } from 'vue';

    const drawer = ref(false)
    const miniState = ref(false)

</script>

<template>
     <div>
    <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated style="background-color: #2c4c83;">
        <q-toolbar>
          <q-toolbar-title>Gerenciamento Financeiro</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
        <q-scroll-area  style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item :to="{name: 'Inicio'}" clickable exact v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'Resumo-Financeiro'}"  exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="monitoring" />
              </q-item-section>

              <q-item-section>
                Resumo Financeiro
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'Lancamentos'}" clickable exact v-ripple>
              <q-item-section avatar>
                <q-icon name="add_card" />
              </q-item-section>

              <q-item-section>
                Lancamentos
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'Configuracoes'}" clickable exact v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                Configurações
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top sidebar__main-avatar" style="height: 150px">
          <div class="absolute-bottom bg-transparent sidebar__div-avatar">
            <q-avatar size="65px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Nome do usuário</div>
            <div>E-mail dele</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
            <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style src="/src/views/HomePage/HomePage.css" scoped></style>