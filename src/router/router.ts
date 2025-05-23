import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";

import PagLogin from "../views/PagLogin/PagLogin.vue";
import RecoverPassword from "../views/RecoverPassword/RecoverPassword.vue";
import HomePage from "../views/HomePage/HomePage.vue";
import NewUser from "../views/NewUser/NewUser.vue";
import Teste from "../components/teste.vue";
import Inicio from "../components/Inicio.vue";

const routes: RouteRecordRaw[] = [

    {
        path: "/",
        name: "Página de login",
        component: PagLogin
    },

    {
        path: "/Novo-Usuario",
        name: "Novo-Usuario",
        component: NewUser
    },

    {
        path: "/Recuperar-Senha",
        name: "Recuperar-Senha",
        component: RecoverPassword
    },

    {
        path: "/Pagina-Principal",
        name: "Pagina-Principal",
        component: HomePage,
        children: [
            {
                path: "Inicio",
                name: "Inicio",
                component: Inicio
            },
            {
                path: "Resumo-Financeiro",
                name: "Resumo-Financeiro",
                component: () => import('@/components/ResumoFinanceiro.vue')
            },
            {
                path: "Lancamentos",
                name: "Lancamentos",
                component: () => import('@/components/Lancamentos.vue')
            },
            {
                path: "Cadastros",
                name: "Cadastros",
                component: () => import('@/components/Cadastros.vue')
            }
        ]
    },
    {
        path: "/teste",
        name: "teste",
        component: Teste
    }
    
]

//Utilizar ladz loading no componentes filhos da homepage

const router = createRouter({
    history: createWebHistory(), routes
})

export default router