# Usuários - API (Rotas Mescladas)

## GET /user 

Retorna usuários do sistema.

### Parâmetros

Parâmetros | Descrição | Valores
-----------|-----------|-----------
**pag:** number | Indica a página para retorno de usuários | Valores a partir de **1**.<br>Ex.: pag=10.<br>**default:** (pag=1)
**qtt:** number | Indica a quantidade de resultados por página que serão exibidos | Valores a partir de **1**.<br>**default:** (pag=10)
**search:** string | Indica um valor que deve estar contido no campo definido $searchBy dos resultados de retorno | Qualquer valor.<br>**default:** (retorna todos os valores)
**searchBy:** string | Indica qual campo deve ser realizada a busca quando $search estiver definido | Os valores possíveis são:<br>name<br>mail<br>phone<br>doc_identifier<br>institution<br>country<br>type<br>**default:** (name)
**fields:** string | Indica quais campos devem ser retornados da consulta | Os valores possíveis são: <br>_id<br>name<br>mail<br>photo<br>phone<br>doc_identifier<br>institution<br>country<br>lattes_url<br>linkedin_url<br>type<br>active<br>**default:** (_id, name, mail)
**active:** string | a | b 
**orderBy:** string | a | b

### Permissões
Em desenvolvimento

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