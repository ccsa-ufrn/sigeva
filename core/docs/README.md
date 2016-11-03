# CORE - API

O projeto é composto de **rotas públicas**, **rotas privadas**, **rotas mescladas** e **rotas internas**. 
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

### POST /user

Insere um novo usuário. Campos com * são requeridos.
(Vai ser necessário criar um token temporário para a criação de um novo usuário, para que ninguém possa criar diretamento
via uma requisição POST de outro lugar. Além disso, vai ser necessário fazer verificações de registros por mesmo IP e 
verificar quantidade de registros excessivas, para identificar possíveis tentativas de ataques)

### Parâmetros
~~~
*name: string
*mail: string
*password: string
*cpf: number
*token: string // verifies if request is trusted
phone: string
institution: string
country: string
lattes_url: string
linkedin_url: string
~~~

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "some fields are required|[custom error]",
    "errorcode": 2 3
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

## Rotas internas

Essas rotas permitem somente requisições de hosts contidos em INTERNAL_HOSTS, no arquivo de configuração.

### GET /token-for-public-routes

Retorna um token para ser utilizado para rotas públicas, ver [Cross-site request forgery](https://pt.wikipedia.org/wiki/Cross-site_request_forgery).

#### Parâmetros

~~~
[sem parâmetros]
~~~

#### Respostas

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