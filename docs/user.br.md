# Usuários

Os **usuários** são as entidades básicas do sistema. Eles vão realizar, praticamente,
todas as ações disponíveis em **módulos** do programa aos quais ele tem acesso. Em uma visão mais global,
os **usuários** podem ser de dois tipos: **administrador do sistema** ou **comum**.

<p align="center">
	<img src="http://i.imgur.com/dOcOSQM.png" >
</p>

Os **administradores do sistema** são responsáveis por gerenciar [**eventos**][evento] e outros **usuários** em *escopo global*. Todos os **usuários**, ao serem criados, são do tipo **comum**, e qualquer **usuário/comum**
pode se tornar **administrador do sistema**. Além disso, o tipo **comum** é um subconjunto
do **administrador do sistema**.

<p align="center">
	<img src="http://i.imgur.com/PbDZtRm.jpg">
</p>

Todos os usuários são definidos pelo seguinte conjunto de informações:

Campo | Descrição | Exemplo
------| --------- | --------
name | O nome completo do usuário | 'João Alves Tavares'
mail | O email principal do usuário (Campo único)| 'joaoemail@ccsa.ufrn.br'
emailConfirmation | Define se o e-mail foi confirmado | false
password | A senha definida pelo usuário para ter acesso à conta. Criptografada utilizado **bcrypt** e **salt**. | -
photo | Foto do usuário | '/web/public/foto.png'
ofType[] | Indica quais os tipos o usuário assume nos sistema (pode possuir até dois valores, mas nunca vazio) | [administrador, comum]
ofField[] | Campos de informações adicionais que podem ser definidas pelo administrador | [phone, country]
events[] | Referência para eventos que o usuário está associado | [ObjectID, ObjectID]
active | Indica se um usuário está ativo ou não | true or false
createdAt | Data em que o usuário foi cadastrado | '2017-08-12 22:01:12'

Estas informações são informações principais, que deve obrigatóriamente serem informadas pelo usuário (ou deduzidas pelo sistema).

O campo fields (distinado à informações adicionais) representa quais campos o sistema deve receber do usuário além das informações principais.

:exclamation: NOTE:  O campo fields se aplica somente a usuários com o tipo comum. Ou seja, os **administradores do sistema** não necessitam de informações complementares; mas se possuir, também, o tipo **comum** as informações complementares são aplicadas.

:exclamation: NOTE: O campo events também não se aplica a usuários que possuem apenas o tipo **administrador do sistema**, já que este não tem associações com eventos, sim com o sistema.

Exemplos de informações adicionais:

Campo | Descrição | Exemplo
------| --------- | --------
phone | O telefone principal do usuário | '+55 84 996369661'
identifier_doc | Um documento identificador e único por **country**, no Brasil poderia ser o CPF | '04787998745'
institution | A instituição de ensino caso o usuário seja da categoria **Discente** ou **Docente** | 'UFRN'
country | O país de origem do usuário | 'Brasil'
lattes_url | O URL para o Lattes do usuário | 'http://lattes.cnpq.br/002011647033'
linkedin_url | O URL para o LinkedIn do usuário | 'https://br.linkedin.com/in/joao-alves-00b034a'

## Usuários administrador do sistema

Os usuários do tipo **administrador do sistema** têm a capacidade de:
- Criar/Gerenciar/Remover eventos
	- Configurar tipos
	- Gerenciar plugins agregados
- Adicionar/Gerenciar/Remover usuários
	- Tornar usuário administrador

A instalação do sistema já configura um usuário **administrador do sistema**. Outros **administradores do sistema** podem ser cadastrados a partir dele. O sistema SÓ permite 'remover' um **administrador do sistema** se houver mais de um **adminsitrador do sistema** ativos.

### Gerenciar eventos

Um conjunto de capacidades primárias: **criar**, **visualizar**, **alterar** e **desativar** eventos. E outras secundárias: **atribuir papel 'administrador do evento' a um usuário em um evento**.

#### Atribuir papel 'administrador do evento' a um usuário em um evento

Como definido na documentação de [**Eventos**][evento], o **administrador do sistema** ou um **administrador do evento** têm a capacidade de gerenciar os **plugins** e as **configurações** do evento em questão.

O **administrador do evento** é o usuário de maior poder em um evento, e tabém contempla todas as **capacidades** que um *usuário comum* pode ter.

Somente um **administrador do sistema** pode atribuir o papel **administrador do evento** para *usuários*.

### Gerenciar usuários

Um conjunto de capacidades primárias: **criar**, **visualizar**, **alterar** e **desativar** usuários. E outras secundárias: **Utilizar o sistema como um usuário**

### Transformar usuário em 'administrador do sistema'

Qualquer **usuário** cadastrado no sistema pode ser transformado em **administrador do sistema** por outro **administrador do sistema**.

## Usuários comuns

Os **usuários comuns** sempre terão uma relação com 0 ou mais [**eventos**][evento] através de [**papéis**][papel].

Os usuários deste tipo têm as capacidades de:
- Realizar inscrição em evento
- Editar informações pessoais
- Realizar ações definidas por plugins com base no papel
- Acessar menus definidos por plugins com base no papel

[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/usuario.br.md>
[evento]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/evento.br.md>
[papel]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/papel.br.md>
