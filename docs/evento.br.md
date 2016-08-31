# Evento

Um evento pode ser criado por um **Administrador do Sistema** (usuário de alto nível). Deverão existir associações de usuários à cada evento.

  - Exemplo: Seminário CCSA é um evento que possui usuários de tipos **comum** e **administradores**

### Parâmetros

Campo | Tipo | Descrição | Exemplo
------|------|-----------|--------
\_id|string| Hash de identificação| '123fa..ba3'
name|string| Título do Evento| 'XXI Seminário CCSA'
theme|string| Tema/Subtítulo do Evento (se houver)| 'Cidadania em tempos de intolerância'
initial_dt|date|Data do início do Evento| 05-02-2016 00:00:00
final_dt|date|Data da finalização do Evento| 05-06-2016 00:00:00
enrollment[]|Array[User, [Payment[]]|Inscrições para o evento|-
creator|User|Referência ao Usuário de alto nível criador do Evento|-
admin[]|Array[User]|Usuários gerenciadores do evento|-
thematic_group[]|Array[ThematicGroup]|Grupos Temáticos do Evento|-
modules[]|Array[Module]|Módulos que especificam funcionalidades|-

O atributo **enrollment** é um Array que especifica uma inscrição, definida pela tupla: _User_ (usuário referênciado) e _Payment_ (Processo do pagamento de inscrição).

### Associações de Usuários
As formas de associação à eventos são: **gerenciamento** ou **inscrição**.
#### Usuário associados por gerenciamento
São os usuários que possuem maiores níveis de controle no sistema, como o **Administrador de Sistema** e os **gerenciadores** (usuários diretamente adicionados pelo Administreador do Sistema). Os módulos do evento também poderão associar usuários à eventos, como é o caso do "módulo de avaliação de trabalhos" que podem associar usuários de tipo "Avaliador".

#### Usuários associados por inscrição
São os usuários **comuns** que devem possuir um cadastramento único no sistema que o permita se inscrever em diferentes eventos. Pode existir a exigência de pagamento atrelado à inscrição do usuário.
