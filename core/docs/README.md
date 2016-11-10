# CORE - API

O projeto é composto de **rotas públicas**, **rotas privadas**, **rotas mescladas** e **rotas internas**. 
As **rotas públicas** não necessitam de autenticação via [JWT](https://jwt.io/). 
Já as **rotas privadas** exigem autenticação para serem utilizadas.
As **rotas mescladas** indicam que algumas funcionalidades serão *públicas* e outras *privadas*, normalmente necessitando de algum tipo de controle de usuário.

## Requisições

As **rotas** são baseadas em **entidades** e suas **funcionalidades**.

~~~
{metodo_http} /{entidade}[/{id_entidade}][/{acao}]?{queries}
~~~

Em que:
~~~
{metodo_http} = GET, POST, PUT, DELETE
{entidade} = user, event, inscription, ...
{id_entidade} = identificado da entidade
{queries} = {parametros=valores}
{acao} = uma determinada ação dentro da entidade
~~~

Exemplo:
~~~
GET /user?fields=name,photo&orderBy=name(asc)  
PUT /user/12  
POST /token/access-token
~~~

No primeiro caso, retorna os campos 'name' e 'photo' de todas as entidades 'user', ordernado por 'name' de forma crescente.
No segundo caso, altera campos da entidade 'user' de identificador '12'.
No terceiro caso, cria um access-token, sendo 'token' a entidade e 'access-token' a ação.

## Entidades 

Entidade | Descrição
---------|-----------
[User](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/User.br.md) | Representa um usuário do sistema. 
[Token](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Token.br.md) | Representa uma entidade relacionada com a geração e verificação de todos os tipos de tokens do sistema
[System](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/System.br.md) | Representa uma entidade relacionada com as funcionalidades básicas e configurações do sistema.