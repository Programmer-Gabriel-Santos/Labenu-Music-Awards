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

## Como rodar o projeto

<details>
    <summary> Rodar com NodeJs </summary>
    <p>  </p>  
    <p> - Para rodar o projeto em seu host você presira ter o NodeJs instalado; </p>
    <p> - Clone o repositório e use o comando 'npm i' para instalar as dependências; </p>
    <p> - Você precisará de um banco de dados para a aplicação funcionar corretamente; </p>
    <p> - Adicione seu acesso banco no .env com as seguintes chaves: </p>
    <p> - DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, JWT_KEY = qualquerString, JWT_EXPIRES_IN = 24h, BCRYPT_SALT_ROUNDS = 12; </p>
    <p> - O Knex está configurado para usar o mysql, se seu banco for outro você precisará alterar essas configurações em BaseDataBase; </p>
    <p> - Por fim, você pode usar os comandos 'npm run build' e 'npm start' para rodar a aplicação; </p>
    <p> - Para fazer as requisições você pode usar o arquivo request.rest, você precisará da extenção Rest Client. </p>
</details>

<p>  </p>

<details> 
    <summary> Rodar com Docker-Compose </summary> 
 <p>  </p>
    <p> - Você precisa ter o <a href="https://docs.docker.com/get-docker/" target='_blank' > Docker </a> e o <a                   href="https://docs.docker.com/compose/install/" target='_blank' > Docker-Compose </a> instalados; </p>
 <p> - Copie o conteúdo do arquivo <a href="https://github.com/Programmer-Gabriel-Santos/Labenu-Music-Awards/blob/main/docker-compose.yml" target='blank'> docker-compose.yml </a> para um arquivo com o mesmo nome: docker-compose.yml em seu host; </p>
 <p> - Feito isso, use o comando 'docker-compose up' ou 'docker-compose up -d' para deixar seu terminal livre. </p>
 <p> - A partir desse docker-compose serão criados três containers: aplicação node, banco mysql e o gerenciador de banco adminer. </p>
 <p> - Caso queira conferir os dados do banco de forma manual e sua estrutura, pode acessar o adminer em seu localhost:3008, ou pode configurar outra            porta para ambos containers no docker-compose.yml. Certifique-se de que as portas listadas estão disponíveis em seu host antes de iniciar os              containers, altere apenas as portas para o seu host, as portas dos containers precisam ser as que estão listadas no docker-compose.yml para que a          aplicação funcione corretamente. Aqui está como deve ser seu login no adminer:
 </p>
 <img src="https://user-images.githubusercontent.com/104647293/226109513-0fdeedb3-b768-4830-8a3a-9aa23e445397.png" width="600px">
 <p> Também serão criados: </p>
 <p> - Um volume com o nome 'dbLama' para o banco de dados, volume esse que poderá ser excluído após o uso da aplicação com o comando 'docker volume rm            dbLama'; 
 </p>
 <p> - Um netWork com o nome 'netLama', que também poderá estar sendo removido após o fim do uso dos containers com o comando 'docker network rm netLama'.  </p>
 
</details>

##### Observações

Logo mais será adicionado a documentação de rotas, por enquanto pode-se utilizar o arquivo ![request.rest](https://github.com/Programmer-Gabriel-Santos/Labenu-Music-Awards/blob/main/requests.rest) para requisições.
O projeto continuará em desenvolvimento e será utilizado para fins de estudo/testes sobre claud / claud + Docker, Cors, Cache e configurações gerais de infraestrutura.
