# Labenu-Music-Awards

 <img src="http://img.shields.io/static/v1?label=STATUS&message=em-desenvolvimento&color=GREEN&style=for-the-badge"/>
 
 
 ## Sobre o Projeto
 
 
 Labenu Music Awards é um show anual de músicas organizado pela própria Labenu que conta com a participação
 de bandas super famosas nacionais e internacionais! Ele sempre acontece durante uma semana inteira,
 começando na manhã de segunda e encerrando na noite de domingo.
 
 
 O projeto tem como objetivo gerenciar múltiplos shows com suas respectivas bandas, datas e ingressos.
 O projeto organiza e centraliza as informações dos shows em um servidor, que então disponibiliza os dados
para o website no front-end. Além de controlar os eventos com suas bandas e datas do show,
a aplicação também gerencia os ingressos de cada show. O evento tem uma capacidade máxima de 5000 pessoas.


## Tecnologias utilizadas

- TypeScript
- NodeJs
- Docker
- Express
- Jest
- Knex
- MySql
- POO


## Testes 
<img src="https://user-images.githubusercontent.com/104647293/225711622-57a8b877-7dca-4390-b35d-dc836eeba833.png" width="600px" />

<details>
    <summary> Rodar com NodeJs </summary>
    <p> - Para rodar o projeto em seu host você presira ter o NOdeJs instalado; </p>
    <p> - Clone o repositório e use o comando 'npm i' para instalar as dependências; </p>
    <p> - Você precisará de um banco de dados para a aplicação funcionar corretamente; </p>
    <p> - Adicione seu acesso banco no .env com as seguintes chaves: </p>
    <p> - DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, JWT_KEY = qualquerString, JWT_EXPIRES_IN = 24h, BCRYPT_SALT_ROUNDS = 12; </p>
    <p> - O Knex está configurado para usar o mysql, se seu banco for outro você precisa alterar essas configurações em BaseDataBase; </p>
    <p> - Por fim, você pode usar os comandos 'npm run build' e 'npm start' para rodar a aplicação; </p>
    <p> - Para fazer as requisições você pode usar o arquivo request.rest, você precisará da extenção Rest Client. </p>
</details>

<details> 
    <summary> Para rodar com Docker-Compose </summary> 
    <p> Você preciar ter o <a href="https://docs.docker.com/get-docker/" target='_blank' > Docker </a>
</details>

## Como rodar o projeto

Faça o clone do repositório, crie e preencha o .env com as seguintes variáveis de ambiente:

- DB_HOST;
- DB_USER;
- DB_PASSWORD;
- DB_DATABASE;
- JWT_EXPIRES_IN;
- JWT_KEY;
- BCRYPT_SALT_ROUNDS.

Você precisará de um banco mysql ou outro que seja suportado pelo Knex. Configure seu banco de acordo com as tabelas encontradas
na pasta src/database.

##### Observações

Esse projeto foi desenvolvido durante o curso da Labenu e está sendo migrado para este repositório. Logo a imagem docker estará disponível com docker-compose.yml e/ou um link para acesso da aplicação em deploy na AWS para facilitar seu uso.
