# Usuários - API (Rotas Mescladas)

## GET /user 

Retorna usuários do sistema.

### Parâmetros
~~~
pag: number
qtt: number
search: string
searchBy: string
fields: string
active: boolean
~~~

#### Valores para os parâmetros
~~~
pag = [1-*] (default = 1)
qtt = [1-*] (default = 10)
search = #any_value# (default = search_all_values)
searchBy = [name(default), mail, phone(private), cpf(private), institution(private), country(private), type(private)]
fields = {_id(default), name(default), mail(private), photo, phone(private), cpf(private), institution, country(private), lattes_url, linkedin_url, type(private), active(private)}
active = true **or** false (default = true)
~~~

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "invalid credentials",
    "errorcode": 1,
    "data": []
}
~~~

## GET /user/:id

Retorna um único usuário de _id = :id

### Parâmetros
~~~
fields: string
~~~

#### Valores para os parâmetros
~~~
fields = {_id(default), name(default), mail(private), phone(private), photo(default) 
cpf(private), institution(default), country(private), lattes_url, linkedin_url, type(private)}
~~~

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "invalid credentials",
    "errorcode": 1,
    "data": {}
}
~~~

## POST /user

Insere um novo usuário. Campos com * são requeridos.
(Vai ser necessário criar um token temporário para a criação de um novo usuário, para que ninguém possa criar diretamento
via uma requisição POST de outro lugar)

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