# Token

## POST /authentication

A rota pública para autenticação e recebimento de um token. É necessário enviar 
o **email** e a **senha** em method *POST* para realizar a autenticação. 

### Parâmetros

~~~
mail = [user_mail]
password = [user_password]
~~~

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

Exemplo de um resultado em caso de sucesso:

~~~ json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
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