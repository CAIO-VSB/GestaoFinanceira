import { Pool } from 'pg'; //Importação da biblioteca do postrgres para interagir com o node.js

require("dotenv").config(); //  Carrega as variaveis de ambiente a partir do arquivo dotenv para usar no meu codigo.

const pool = new Pool({
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_database,
    password: process.env.db_password,
    port: process.env.db_port ? parseInt(process.env.db_port) : 5432,
})
//Estou criando uma nova instância da classe Pool e configurando ela com as variavies de ambiente. Assim estabelecendo uma conexão com o meu banco.

export default pool; //Exportando essa função para ser usado gobal no meu codigo.