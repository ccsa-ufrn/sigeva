# Evento

O documento do tipo evento pode ser criado por um **Administrador do sistema** ([Usuário][usuario] de alto nível). Outros usuários se relacionam com eventos através de relacionamentos, definidos através de papéis. A criação de um evento exige (i) associação à, no mínimo, um **Coordenador de Evento** (Um papel de caráter permanente, não pode ser excluído ou alterado, ver documentação para Papel).

## Propriedades

Campo |  Descrição | Exemplo
------|-----|------
name:String | Título do evento | "XXI Seminário CCSA"
subtitle:String | Tema/Subtítulo do evento (se houver) | "Cidadania em tempos de intolerância"
eventPeriod:DateRange | Período em que o evento ocorrerá (ISO-8601) | DateRange('2018-03-07', '2018-03-12')
enrollmentPeriod:DateRange | Período em que as inscrições estarão abertas (ISO-8601) | DateRange('2018-03-07', '2018-03-12')
ofRelationships[]: UserRelationship | Relações entre usuários e o evento | [UserRelationship(ObjectId('3rg235gjfjs62'), ObjectId('353gvf4gf2h1g'))]
creator:User | Administrador criador do evento | ObjectId('2383j3jk2jl3f3')
ofRoles[]:Role | Papéis criados e definidos para o evento | [ObjectId('5dd526hfj4k6kh6j')]
ofModules[]:Module | Módulos plugados ao evento | [Module()]
ofSubevents[]:Subevent | Subeventos agregados | [Subevent(), Subevent()]
published: Boolean | Informa se o evento deve aparecer na aba de "Eventos ativos" | default:false 
active: Boolean | Informa se a instância está ativa | true
createdAt: Date | Data de criação do objeto (ISO-8601) | '2017-10-28T15:44:52.775Z'

### Formas de Relacionamento
O relacionamento entre um [**Usuário**][usuario] e um **Evento** é firmado através da existência de um [**Papel**][papel], que aponta quais os privilégios o usuário possuirá na participação daquele evento. Todo evento necessita ter no mínimo um relacionamento: um **coordenador de evento**.

Um usuário poderá acumular mais de um papel por relacionamento com um evento, exemplificando, isto indica que um mesmo usuário poderá ser coordenador e avaliador em um evento.

### Papéis
Como o relacionamento se dá através de papéis o **usuário** deverá possuir um papel perante o evento para que o relacionamento exista. O firmamento desse relacionamento pode ser feito de duas formas diferentes:

- O usuário se inscreve no evento, sendo solicitado a escolher um papel do tipo público.
- O usuário é associado ao evento pelo coordenador de evento (quem determina o papel do usuário no ato da associação). O coordenador de evento também pode alterar/deletar relacionamentos (adicionar ou retirar papéis de um usuário perante o evento)

:exclamation: NOTE: O coordenador de evento também recebe uma associação, mas a sua associação só pode ser feita pelo **administrador do sistema**. Um coordenador de evento pode dar atribuir papel de coordenador à outros usuários.

# Event API

Rotas de interação com a entidade evento.

### POST /api/event
Rota para criação de um novo evento

**JSON Request**:

```json
{
  "name": "Nome do Evento",
  "subtitle": "Descrição do Evento",
  "eventPeriodBegin": "2017-10-29T15:44:52.775Z",
  "eventPeriodEnd": "2017-10-29T15:44:52.775Z",
  "enrollmentPeriodBegin": "2017-10-29T15:44:52.775Z",
  "enrollmentPeriodEnd": "2017-10-29T15:44:52.775Z",
  "location": "Local do Evento"
}
```

Datas devem possuir o formato ISO-8601

**JSON Response**:

```json
{
  "error": false,
  "error_info": "Sem mensagem de erro",
  "data": {
    "_id": "59f65263033b80368f4e9230",
    "name": "Nome do Evento",
    "subtitle": "Descrição do Evento",
    "published": false,
    "eventPeriod": {
        "end": "2017-10-29T15:44:52.775Z",
        "begin": "2017-10-29T15:44:52.775Z",
        "_id": "59f65263033b80368f4e9231"
    },
    "enrollmentPeriod": {
        "end": "2017-10-28T15:44:52.775Z",
        "begin": "2017-10-28T15:44:52.775Z",
        "_id": "59f65263033b80368f4e9233"
    },
    "location": "Local do Evento"
  }
}
```

### GET /api/event
Retorna uma lista de eventos

Parâmetro | Descrição | Default
----------|-----------|--------
fields | Campos a serem extraídos separados por virgula | id,name,subtitle,location,enrollmentPeriod,eventPeriod,published
query | Query de busca pelo nome do evento | null
cout | Quantidade de eventos retornados por página | 5
page | Página a ser retornada | 1
order | Campo a ser utilizado para ordenação | -createdAt (mais recentes primeiro)
published | Indica se deve retornar eventos ativos ou arquivados | true

**URL Request**:
```
http://localhost:3000/api/event/?fields=name,subtitle&order=name&query=evento&published=false
```

**JSON Response**:
```json
{
    "error": false,
    "error_info": "Sem mensagem de erro",
    "data": [
        {
            "_id": "59f74eb6f8285928f4264d13",
            "subtitle": "Descrição do evento",
            "name": "A Evento"
        },
        {
            "_id": "59f74a872e6a4518ec8f34d9",
            "subtitle": "Descrição do evento",
            "name": "Evento"
        }
    ]
}
```

### GET /api/event/:id
Retorna dados de um evento específico selecionado pelo ID

**URL Request**:
```
http://localhost:3000/api/event/59f661366c67bf4916a89532?fields=name,subtitle
```

O parâmetro `fields` indica quais campos devem ser extraídos do evento buscado

**JSON Response**:
```json
{
    "error": false,
    "error_info": "Sem mensagem de erro",
    "data": {
        "name": "Nome do Evento",
        "subtitle": "Descrição do Evento"
    }
}
```

### POST /api/event/:id/enroll
Rota para inscrição em evento através de papel público. É necessário haver um usuário logado

**URL Request**:
```
http://localhost:3000/api/event/59f661366c67bf4916a89532/enroll
```

**Body Request**:
```json
{
  "role": "59f6613f6c67bf4916a25174"
}
```

O campo `role` deve conter o ID do papel público com o qual o usuário deseja se inscrever

**JSON Response**:
```json
{
  "error": false,
  "error_info": "Sem mensagem de erro",
  "data": { }
}
```


[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/user.br.md>
[papel]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/papel.br.md>
