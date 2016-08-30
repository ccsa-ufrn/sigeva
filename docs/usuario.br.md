# Usuários

Os **usuários** são as entidades básicas do sistema. Eles vão realizar, praticamente,
todas as ações disponíveis em cada módulo do programa. Em uma visão mais global,
os **usuários** podem ser de dois tipos: **administrador do sistema** ou **comum**.

Os **administradores do sistema** são responsáveis por gerenciar **eventos** e outros **usuários**. Já 
os **comuns** nâo têm essas *capacidades*. Todos os **usuários**, ao serem criados, são do tipo **comum**,
e qualquer **usuário/comum** pode se tornar **administrador do sistema**. Além disso, o tipo **comum** é um subconjunto
do **administrador do sistema**.

Todos os usuários são definidos pelo seguinte conjunto de informações:

Campo | Tipo | Descrição | Exemplo 
------|----- | --------- | --------
Nome | string | O nome completo do usuário | 'João Alves Tavares'
Email | string | O email principal do usuário | 'joaoemail@ccsa.ufrn.br'
Telefone | string | O telefone principal do usuário | '+55 84 996369661'
Senha | string | A senha definida pelo usuário para ter acesso à conta. Criptografada utilizado **bcrypt** e **salto**. | -
CPF | string | O CPF do usuário | '04787998745'
Categoria | string | O tipo de usuário no evento | 'Discente' || 'Docente' || 'Outro'
Instituição de Ensino | string | A instituição de ensino caso o usuário seja da categoria **Discente** ou **Docente** | 'UFRN'
URL Lattes | string | O URL para o Lattes do usuário | 'http://lattes.cnpq.br/002011647033'
Tipo | string | Indica se o usuário é do tipo **administrador** ou **comum** | 'administrador' ou 'comum'

## Administrador do sistema

Os usuários do tipo **administrador do sistema** têm a cacidade de **gerenciar eventos** e de **gerenciar usuários**. Para acessar essas *funcionalidades*, haverá uma *área administrativa* somente para esses tipos de usuários.

### Gerenciar eventos

Um conjunto de capacidades primárias: **criar**, **visualizar**, **alterar** e **remover** eventos. E outras secundárias: **atribuir papel a um usuário em um evento**.

#### Atribuir papel a um usuário em um evento

Como definido na documentação de **Eventos**, todo **evento** necessita de um **administrador de evento** 

### Gerenciar usuários

