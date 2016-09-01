# Evento

Um evento pode ser criado por um **Administrador do Sistema** ([Usuário][usuario] de alto nível). Deverão existir associações de usuários à cada evento.

  - Exemplo: Seminário CCSA é um evento que possui usuários de tipos **comum** e **administradores**

## Parâmetros

Campo | Tipo | Descrição | Exemplo
------|------|-----------|--------
Nome|string| Título do Evento| 'XXI Seminário CCSA'
Tema|string| Tema/Subtítulo do Evento (se houver)| 'Cidadania em tempos de intolerância'
Inicial_dt|date|Data do início do Evento| 05-02-2016 00:00:00
Final_dt|date|Data da finalização do Evento| 05-06-2016 00:00:00
Relacionamento[]|Array[User, papeis[]]|Relacionamento de usuários com o evento|-
Criador|User|Referência ao Usuário de alto nível criador do Evento|-
Papeis|Array[Role]|Papéis que os usuários podem assumir em ralacionamento com o evento|-
Módulos[]|Array[Module]|Módulos que especificam funcionalidades|-
Subeventos[]|Array[Subevent]|Eventos subordinados|-

### Formas de Relacionamento
O relacionamento entre um [**Usuário**][usuario] e um **Evento** é firmado através da existência de um [**Papel**][papel], que aponta os privilégios o usuário possuirá na participação daquele evento.

Um usuário poderá acumular mais de um papel por relacionamento com um evento, exemplificando, isto indica que um mesmo usuário poderá ser coordenador e avaliador em um evento.

### Papéis
Leia a documentação de  [Papel][papel] para compreender o campo **Papéis**.

### Eventos subordinados
Um evento pode ocorrer junto a outros eventos, ou até mesmo, composto por diversos eventos. O campo **Subeventos** agrupa informações de eventos subordinados, mas estes não possuem o mesmo nível de complexidade de um evento do tipo **Evento**, o campo fornece apenas informações simples.

[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/usuario.br.md>
[papel]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/papel.br.md>
