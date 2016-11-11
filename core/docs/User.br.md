# User

Representa a principal entidade do sistema. 

## GET /user 

Retorna usuários do sistema.

### Queries

Parâmetros | Descrição | Valores
-----------|-----------|-----------
**pag:** number | Indica a página para retorno de usuários | Valores a partir de **1**.<br>Ex.: pag=10.<br>**default:** (pag=1)
**qtt:** number | Indica a quantidade de resultados por página que serão exibidos | Valores a partir de **1**.<br>**default:** (pag=10)
**search:** string | Indica um valor que deve estar contido no campo definido $searchBy dos resultados de retorno | Qualquer valor.<br>**default:** (retorna todos os valores)
**searchBy:** string | Indica qual campo deve ser realizada a busca quando $search estiver definido | Os valores possíveis são:<br>name<br>mail<br>phone<br>identifier_doc<br>institution<br>country<br>type<br>**default:** (name)
**fields:** string | Indica quais campos devem ser retornados da consulta | Os valores possíveis são: <br>_id<br>name<br>mail<br>photo<br>phone<br>identifier_doc<br>institution<br>country<br>lattes_url<br>linkedin_url<br>type<br>active<br>**default:** (_id, name, mail)
**active:** boolean | Indica se vai retornar somente usuários ativos ou também os inativos | true<br>false<br>**Default:** (true) 
**order:** string | Indica o um campo definido em {field} que será utilizado para ordernar, e o tipo de ordenação | {field}(asc)<br>**ex:**<br>name(asc)<br>name(desc)<br>**Default:** (name(asc)) 

### Permissões (Em desenvolvimento)

- É **necessário** estar autenticado para realizar essa requisição.

### Repostas

(Em construção)

## GET /user/:id

Retorna um único usuário de _id = :id

### Queries
Parâmetros | Descrição | Valores
-----------|-----------|-----------
**fields:** string | Indica quais campos devem ser retornados da consulta | Os valores possíveis são: <br>_id<br>name<br>mail<br>photo<br>phone<br>identifier_doc<br>institution<br>country<br>lattes_url<br>linkedin_url<br>type<br>active<br>**default:** (_id, name, mail)

### Permissões (Em desenvolvimento)

- É **necessário** estar autenticado para realizar essa requisição.

### Repostas

(Em construção)

### Sub entidades

Entidade | Descrição
-----------|-----------
[Inscription](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Inscription.br.md) | Retorna as inscrições do usuário
[Event](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Event.br.md) | Retorna eventos que o usuário está inscrito

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