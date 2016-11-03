# CORE - API

O projeto é composto de **rotas públicas**, **rotas privadas** e **rotas mescladas**. 
As **rotas públicas** não necessitam de autenticação via [JWT](https://jwt.io/). 
Já as **rotas privadas** exigem autenticação para serem utilizadas.
As **rotas mescladas** indicam que algumas funcionalidades serão *públicas* e outras *privadas*.

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

### GET /setup

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

## Rotas mescladas

Para entender os parâmetros das requisições, segue uma lista de padronização no momento de visualizar **valores para parâmetros**:

- [value1,value2,value3] **means** value1 **or** value2 **or** value3
- {value1, value2, value3} **means** value1 **or** value1, value2 **or** value2, value3 **or** ...
- #descriptive# **means** just a descriptive text to kinds of values
- (private) **means** only authenticated and with permissions
- (default [= value]) **means** indicate default value 

### [Usuários](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Users.mix.md)

## Rotas privadas

### [Usuários](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Users.priv.md)