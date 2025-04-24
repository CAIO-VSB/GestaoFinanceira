<template>
     <div class="home__sider-bar">
        <div class="home__dados-user">
            <img class="home__icon-img" src="/src/assets/pexels-cottonbro-3943723.jpg">
            <p class="home__nome-user">Usuário: Caiob7517@gmail.com</p>
        </div>

        <div class="home__container-itens">
            <ul style="width: 100%;">
                <li class="home__container-list">
                    <a class="home__container-links" href="">
                        <q-icon class="home__container-icons" name="home" />
                        <span>Home</span>
                    </a>
                </li>
                <li class="home__container-list">
                    <a class="home__container-links" href="">
                        <q-icon class="home__container-icons" name="paid" />
                        <span>Resumo Financeiro</span>
                    </a>
                </li>
                <li class="home__container-list">
                    <a class="home__container-links" href="">
                        <q-icon class="home__container-icons" name="payments" />
                        <span>Lançamento</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style src="/src/views/HomePage/HomePage.css" scoped></style>