# Usuários - API

## GET /user 

Retorna todos os usuários do sistema.

### Parâmetros
~~~
pag: number // O número da página (default: pag = 1)
qtt: number // Quantidade de elementos por página (default: qtt = 10)
search: string // Retornar resultados que contém search (default: search *all)
searchBy: string // Realiza a busca por um dos campos definidos em 'fields' (default: searchBy = 'mail')
fields: string // Os campos que serão retornados da busca (default: fields = '_id, name, mail')
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
fields: string // Os campos que serão retornados da busca (default: fields = '_id, name, mail, phone, 
password, cpf, educational_institution, country, url_lattes, url_linkedin')
type: string // ('administrator' or 'common')
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

### Parâmetros
~~~
*name: string
*mail: string
*password: string
phone: string
cpf: number
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
