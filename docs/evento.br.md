# Evento

Um evento pode ser criado por um **Administrador do Sistema** (usuário de alto nível). Deverão existir associações de usuários à cada evento.

  - Exemplo: Seminário CCSA é um evento que possui usuários de tipos **comum** e **administradores**

### Parâmetros

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
