# Usuários - API (Rotas Privadas)

## POST /user/upload-photo

Faz o upload de uma foto para um determinado usuário *ativo*.

### Parâmetros
~~~
[sem parâmetros]
~~~

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "invalid credentials|[custom error]",
    "errorcode": 1 2,
    "data": { 
        "photo": "photo_name"
    }
}
~~~

## PUT /user/:id

Atualiza campos de um determinado usuário *ativo* de _id = :id.

### Permissões

- O próprio usuário pode alterar todos os seus campos, exceto **type**
- Usuários **type=administrator** pode alterar campos de qualquer usuário, inclusivo o **type**

### Parâmetros
~~~
name: string
*mail: string
password: string
phone: string
institution: string
country: string
lattes_url: string
linkedin_url: string
photo: string
~~~

- Alteração de **mail** depende da unicidade nos registros de usuário.

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "invalid credentials|[custom error]",
    "errorcode": 1 2
}
~~~

## DELETE /user/:id

Desativa um determinado usuário de _id = :id.

### Permissões

- O próprio usuário pode desativar seu cadastro
- Usuários **type=administrator** podem desativar outro usuário

### Parâmetros
~~~
[Sem parâmetros]
~~~

### Retorno

~~~ json
{
    "status": "success|error",
    "msg": "invalid credentials|[custom error]",
    "errorcode": 1 2
}
~~~