# CORE - API

O projeto é composto de uma única **rota pública** e diversas **rotas privadas**. 
A única rota pública é para autenticação, utilizando o [JWT](https://jwt.io/). 
Já as rotas privadas existem para acessar os recursos.

## Rotas públicas

### POST /authentication

A rota pública para autenticação e recebimento de um token. É necessário enviar 
o **email** e a **senha** em method *POST* para realizar a autenticação. 

#### Parâmetros

~~~
mail = [user_mail]
password = [user_password]
~~~

#### Respostas

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "msg": "user not exists|wrong password",
    "errorcode": 1|2,
    "token": "[jwt_token]"
}
~~~

Exemplo de um resultado em caso de sucesso:

~~~ json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
}
~~~

### GET /setup (DEV - TEMPORÁRIO)

Rota utilizada uma única vez para instalar as configurações iniciais do sistema.
Configurar de acordo com as necessidades.

#### Parâmetros

~~~
[sem parâmetros]
~~~

#### Respostas

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "msg": "first user already created",
    "errorcode": 1
}
~~~

## Rotas privadas

### [Usuários](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/User.md)