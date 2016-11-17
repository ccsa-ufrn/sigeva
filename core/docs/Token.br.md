# Token

Entidade responsável pela geração de tokens utilizados pelo sistema.

## POST /authentication

Rota pública para autenticação e recebimento de um token. É necessário enviar 
o **mail** e a **password** em method *POST* para realizar a autenticação. 

### Queries

Query | Descrição | Valores
-----------|-----------|-----------
Não permite queries.

### Parâmetros

Parâmetros | Descrição 
-----------|-----------
mail | O email do usuário cadastrado 
password | A senha do usuário

### Permissões

- Rota **pública**

### Respostas

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "msg": "user not exists|wrong password|disabled user",
    "errorcode": 1 2 3,
    "token": "[jwt_token]"
}
~~~


## GET /access-token

Retorna um token para ser utilizado por 'formulários', 
ver [Cross-site request forgery](https://pt.wikipedia.org/wiki/Cross-site_request_forgery).
Tokens têm tempo de vida de 15 minutos, apenas.

### Parâmetros

~~~
[sem parâmetros]
~~~

### Respostas

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "errorcode": 1,
    "data": {
        "token" : "the_token"
    }
}
~~~