# Usuários - API (Rotas Privadas)

## POST /user

Insere um novo usuário. Campos com * são requeridos.

### Parâmetros
~~~
*name: string
*mail: string
*password: string
*cpf: number
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
    "msg": "invalid credentials|some fields are required|[custom error]",
    "errorcode": 1 2 3
}
~~~
