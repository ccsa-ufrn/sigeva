# Usuários

Os **usuários** são as entidades básicas do sistema. Eles vão realizar, praticamente,
todas as ações disponíveis em cada **módulo** do programa. Em uma visão mais global,
os **usuários** podem ser de dois tipos: **administrador do sistema** ou **comum**.

<p align="center">
	<img src="http://i.imgur.com/dOcOSQM.png" >
</p>

Os **administradores do sistema** são responsáveis por gerenciar [**eventos**][evento] e outros **usuários** em *escopo global*. Todos os **usuários**, ao serem criados, são do tipo **comum**, e qualquer **usuário/comum** pode se tornar **administrador do sistema**. Além disso, o tipo **comum** é um subconjunto do **administrador do sistema**.

<p align="center">
	<img src="http://i.imgur.com/hVbto44.png">
</p>

Todos os usuários são definidos pelo seguinte conjunto de informações:

Campo | Descrição | Exemplo
------| --------- | --------
Nome | O nome completo do usuário | 'João Alves Tavares'
Email | O email principal do usuário | 'joaoemail@ccsa.ufrn.br'
Telefone | O telefone principal do usuário | '+55 84 996369661'
Senha | A senha definida pelo usuário para ter acesso à conta. Criptografada utilizado **bcrypt** e **salto**. | -
CPF | O CPF do usuário | '04787998745'
Instituição de Ensino | A instituição de ensino caso o usuário seja da categoria **Discente** ou **Docente** | 'UFRN'
País | O país de origem do usuário | 'Brasil'
URL Lattes | O URL para o Lattes do usuário | 'http://lattes.cnpq.br/002011647033'
URL Likedin | O URL para o LinkedIn do usuário | 'https://br.linkedin.com/in/joao-alves-00b034a'
Tipo | Indica se o usuário é do tipo **administrador** ou **comum** | 'administrador' ou 'comum'

## Usuários administrador do sistema

Os usuários do tipo **administrador do sistema** têm a cacidade de **gerenciar eventos**, **gerenciar usuários** e **transformar usuário em 'administrador do sistema'**. Para acessar essas *funcionalidades*, haverá uma *área administrativa* somente para esses tipos de usuários.

A instalação do sistema já configura um usuário **administrador do sistema**. Outros **administradores do sistema** podem ser cadastrados a partir dele. O sistema SÓ permite 'remover' um **administrador do sistema** se houver mais de um **adminsitrador do sistema** ativos.

### Gerenciar eventos

Um conjunto de capacidades primárias: **criar**, **visualizar**, **alterar** e **desativar** eventos. E outras secundárias: **atribuir papel 'administrador do evento' a um usuário em um evento**.

#### Atribuir papel 'administrador do evento' a um usuário em um evento

Como definido na documentação de [**Eventos**][evento], somente um **administrador do evento** tem a capacidade de gerenciar os **módulos** e as **configurações** do evento em questão.

O **administrador do evento** é o usuário de maior poder em um evento, pois contempla todas as **capacidades** que um *usuário comum* pode ter.

Somente um **administrador do sistema** pode atribuir o papel **administrador do evento** para *usuários*.

### Gerenciar usuários

Um conjunto de capacidades primárias: **criar**, **visualizar**, **alterar** e **desativar** usuários.

### Transformar usuário em 'administrador do sistema'

Qualquer **usuário** cadastrado no sistema pode ser transformado em **administrador do sistema** por outro **administrador do sistema**.

## Usuários comuns

Os **usuários comuns** sempre terão uma relação com 0 ou mais [**eventos**][evento] através de [**papéis**][papel].

[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/usuario.br.md>
[evento]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/evento.br.md>
[papel]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/papel.br.md>
