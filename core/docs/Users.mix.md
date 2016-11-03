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