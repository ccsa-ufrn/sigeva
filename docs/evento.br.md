# Evento

O documento do tipo evento pode ser criado por um **Administrador do sistema** ([Usuário][usuario] de alto nível). Outros usuários se relacionam com eventos através de relacionamentos, definidos através de papéis. A criação de um evento exige (i) associação à, no mínimo, um **Coordenador de Evento** (Um papel de caráter permanente, não pode ser excluído ou alterado, ver documentação para Papel).

## Propriedades

Campo |  Descrição | Exemplo
------|-----|------
name:String | Título do evento | "XXI Seminário CCSA"
subtitle:String | Tema/Subtítulo do evento (se houver) | "Cidadania em tempos de intolerância"
period:DateRange | Período em que o evento ocorrerá | DateRange('2018-03-07', '2018-03-12')
ofUserRelationships[]: UserRelationship | Relações entre usuários e o evento | [UserRelationship(ObjectId('3rg235gjfjs62'), ObjectId('353gvf4gf2h1g'))]
creator:User | Administrador criador do evento | ObjectId('2383j3jk2jl3f3')
ofRoles[]:Role | Papéis criados e definidos para o evento | [ObjectId('5dd526hfj4k6kh6j')]
ofModules[]:Module | Módulos plugados ao evento | [Module()]
ofSubevents[]:Subevent | Subeventos agregados | [Subevent(), Subevent()]
active: Boolean | Informa se a instância está ativa | true
createdAt: Date | Data de criação do objeto | '2018-08-20 12:20'

### Formas de Relacionamento
O relacionamento entre um [**Usuário**][usuario] e um **Evento** é firmado através da existência de um [**Papel**][papel], que aponta quais os privilégios o usuário possuirá na participação daquele evento. Todo evento necessita ter no mínimo um relacionamento: um **coordenador de evento**.

Um usuário poderá acumular mais de um papel por relacionamento com um evento, exemplificando, isto indica que um mesmo usuário poderá ser coordenador e avaliador em um evento.

### Papéis
Como o relacionamento se dá através de papéis o **usuário** deverá possuir um papel perante o evento para que o relacionamento exista. O firmamento desse relacionamento pode ser feito de duas formas diferentes:

- O usuário se inscreve no evento, sendo solicitado a escolher um papel do tipo público.
- O usuário é associado ao evento pelo coordenador de evento (quem determina o papel do usuário no ato da associação). O coordenador de evento também pode alterar/deletar relacionamentos (adicionar ou retirar papéis de um usuário perante o evento)

:exclamation: NOTE: O coordenador de evento também recebe uma associação, mas a sua associação só pode ser feita pelo **administrador do sistema**. Um coordenador de evento pode dar atribuir papel de coordenador à outros usuários.

[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/user.br.md>
[papel]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/papel.br.md>
