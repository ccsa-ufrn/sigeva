# CORE - API

O projeto é composto de **rotas públicas**, **rotas privadas**, **rotas mescladas** e **rotas internas**. 
As **rotas públicas** não necessitam de autenticação via [JWT](https://jwt.io/). 
Já as **rotas privadas** exigem autenticação para serem utilizadas.
As **rotas mescladas** indicam que algumas funcionalidades serão *públicas* e outras *privadas*, normalmente necessitando de algum tipo de controle de usuário.

## Requisições

As **rotas** são baseadas em **entidades** e suas **ações** e **queries**.

~~~
{metodo_http} /{entidade}[/{id_entidade}[/{sub_entidade}][/{acao}]?{queries}
~~~

Em que:

Nome | Possíveis valores | Descrição
-----|-------------------|----------
{metodo_http} | GET, POST, PUT, DELETE | Indica o método HTTP
{entidade} | user, event, token, system, inscription | Indica com qual 'entidade' do sistema a rota se relaciona 
{id_entidade} | identificador da entidade | Indica com qual registro de uma entidade a rota se relaciona
{sub_entidade} | user, event, ... | Somente é possível definir uma {sub_entidade} se {id_entidade} estiver definida. Indica que vai retornar sub_entidades que têm relação com a {entidade}.
{acao} | o nome descritivo para uma determinada ação | Muitas vezes alguma entidade necessita de uma funcionalidade além de CRUD, esses casos chamamos de ações.
{queries} | {parametros=valores} | Queries são filtros aplicados sobre a requisição, normalmente estão relacionados com a quantidade de campos retornados da consulta, que tipo de ordenação terá, e etc. Se somente {entidade} estiver definida, será sobre {entidade}. Mas se {sub_entidade} estiver definida, será sobre {sub_entidade}
{acao} | um nome descritivo para a ação | Alguma requisição específica para uma determinada entidade

Exemplo:
~~~
GET /user?fields=name,photo&orderBy=name(asc)  
PUT /user/12  
POST /token/access-token
~~~

No primeiro caso, retorna os campos 'name' e 'photo' de todas as entidades 'user', ordernado por 'name' de forma crescente.
No segundo caso, altera campos da entidade 'user' de identificador '12'.
No terceiro caso, cria um access-token, sendo 'token' a entidade e 'access-token' a ação.

## Respostas
Toda requisição à API tem um **resposta**. Toda resposta terá, com algumas possíveis alterações, esta seguinte estrutura:

~~~ json
{
    "status": {string},
    "msg": {string},
    "errorcode": {number},
    "data": {array|object}
}
~~~

Em que:

Propriedade | Possíveis Valores | Descrição
-----|-------------------|----------
status | success ou error | Indica se a requisição foi realizada com sucesso ou não
msg | uma mensagem qualquer | Caso **status** = **error**, **msg** é definida com o motivo do insucesso 
errorcode | um valor numérico | Caso **status** = **error**, **errorcode** define um número para indicar o tipo de erro
data | Um objeto JSON ou uma array de objetos JSON  | Caso a requisição tenha sido realizada com **sucesso**, caso seja uma requisição para retornar valores, os valores virão definidos em **data**

## Entidades 

Entidade | Descrição
---------|-----------
[User](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/User.br.md) | Representa um usuário do sistema. 
[Token](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/Token.br.md) | Representa uma entidade relacionada com a geração e verificação de todos os tipos de tokens do sistema
[System](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs/System.br.md) | Representa uma entidade relacionada com as funcionalidades básicas e configurações do sistema.