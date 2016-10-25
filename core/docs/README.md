# CORE - API

O projeto é composto de uma única **rota pública** e diversas **rotas privadas**. 
A única rota pública é para autenticação, utilizando o [JWT](https://jwt.io/). 
Já as rotas privadas existem para acessar os recursos.

## Rota pública

A única rota pública é a para autenticação e recebimento de um token. É necessário enviar 
o **email** e a **senha** em method *POST* para realizar a autenticação. 

~~~
POST /authentication
    
email = [user_email]
password = [user_password]
~~~

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "msg": "Invalid credentials",
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

## Rotas privadas

### Usuários

#### GET /user 

Retorna todos os usuários do sistema.

##### Parâmetros
~~~
pag = number // O número da página 
qtd = number // Quantidade de elementos por página
search = number // Retornar resultados que contém search
~~~

### Usuário