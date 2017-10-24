# Alura-Nodejs-REST
## Sobre
Repositório com commits a cada aula do [curso de Node.js avançado da Alura](https://cursos.alura.com.br/course/nodejs-avancado)

Cada commit marca o estado que o projeto deve estar ao final de cada aula,
Procure nas mensagens do historico de commits qual o commit corresponde à aula que você deseja

## Instalando
Execute o comando `npm install` na pasta raiz do projeto.
Instale também o nodemon com o comando `npm install nodemon -global`

Dentro da pasta _files_ você encontrará o SQL necessário para criar o banco de dados em MySql e tambem o serviço secundario de cartões, execute o `npm install` dentro da pasta `files/cardfast` para instalar ele

## Utilizando
Para iniciar o serviço, use o comando `nodemon index.js` a partir da pasta raiz

Se for utilizar o serviço secundário de cartões, abra um segundo terminal e execute o mesmo comando, porem dentro da pasta `files/cardfast`

## Fazendo requisições ao serviço 

Por padrão, o servidor é executado na porta 3000, então basta fazer requisições HTTP nessa porta que o serviço já deve responder. 

Para facilitar a vida, importe a coleção de requests HTTP do postman [clicando aqui](https://www.getpostman.com/collections/a3d3aa164a8a7ccb7e13)

### Bom aprendizado :smile:
