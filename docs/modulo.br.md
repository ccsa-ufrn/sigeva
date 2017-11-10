# Módulo
**Model**: Module

Módulo é uma abstração do funcionamento dos serviços prestados por um evento, são exemplos de módulos: Módulo de Pagamento, 
Módulo de Atividades, Módulo de Trabalhos. Este modelo extrai a estrutura comum desses serviços adicionando à isto o fator 
de controle de permissibilidade dos usuários, ou seja, o módulo além de definir uma estrutura comum aos serviços oferecidos por 
um evento, também regra como deve ocorrer as interações dos inscritos com o evento.

Analisando as estruturas comuns conseguimos identificar que um módulo pode ser compreendido através de cinco atuantes:
- **Caracterização**: Descrição do que o módulo é e pelo o que se responsabiliza.
- **Entidade**: Quais são os "pedaços" do módulo? Com qual tipo de objeto, qual escopo, o módulo interage? (exemplos de 
entidades: Modo de pagamento, Tipo de trabalho, Tipo de atividade.)
- **Permissão**: Existem para cada tipo de usuário uma forma diferente de se interagir com os objetos entidades do módulo; as 
permissões especificam quais as regras de interação.
- **Objetos**: São os produtos finais do módulo, o que é produzido com a modelagem das entidades e com o regramento das 
permissões.
- **Personalização**: Os módulos podem possuir configurações específicas, características personalizáveis.

Com base nessas definições conseguimos extrair o seguinte modelo:

Campo | Descrição | Exemplo
------| --------- | -------
name: String | Nome do módulo em formato legível para humanos | "Pagamento"
slug: String | Ídentificação do módulo para o sistema em codificação URL | "payment"
ofEntities: [Entity] | Entidades do módulo | Tipos de atividade: "Minicurso", "Oficina". Modos de pagamento: "GRU"
ofPermissions: [Permission] | Permissões relacionadas à entidades do módulo | "Realizar pagamento" na entidade "GRU"
ofObjects: [ModuleObject] | Sessão para armazenamento dos objetos de responsabilidade do módulo | Pagamentos, Inscrições em atividades
config: Object | Sessão para configurações personalizadas do módulo | { default_picture: 'blank.png' }

### Entity

O tipo `Entity` caracteriza as entidades com as quais o módulo irá lidar. No front-end da aplicação a entidade é geralmente representada como um menu de acesso para o usuário; sendo assim, cada link no menu do usuário representa uma entidade (salvo em alguns casos), com o título "Módulo -> Entidade".

Uma entidade nada mais é que a representação abstrata de um tipo de informação que irá moldar a formação de um objeto no módulo. Por exemplo, o módulo de Atividades possui entidades que moldam como deve ser o objeto "Atividade", damos ao nome da entidade de "Tipo de Atividade", já que nela se caracterizarão, por exemplo, as "Palestras" e "Mesas Redondas" onde cada tipo desses possui diferentes especificações para o objeto final, mas compartilham o fato de serem uma atividade.

Campo | Descrição | Exemplo
------| --------- | -------
name: String | Nome da entidade | "Mesa Redonda"
slug: String | Identificação da entidade | "roundtable"
data: Object | Objeto que denota a entidade, estabelecido de acordo com as necessidades do módulo |

### Permissão

A permissão é tipo de dado que conecta os papéis de usuários à uma entidade. Por exemplo, pensando no módulo de pagamento, um usuário do tipo discente terá que efetuar pagamento para realizar submissões no evento; por outro lado ele não deverá poder aprovar pagamentos de usuários, são permissões diferentes para tipos de inscritos diferentes. Sendo assim o usuário discente terá a permissão de "Efetuar pagamento" e um usuário administrador terá a de "Aprovar pagamentos".

A definição precisa de permissão é: estrutura que garante a papéis de usuários uma possibilidade de atuação sobre uma entidade do módulo. 

Campo | Descrição | Exemplo
------| --------- | -------
name: String | Nome da permissão em formato legível para humanos | "Submeter proposta de atividade"
action: String | Identificador único para a permissão | "submit_activity"
entity: ObjectID | Entidade do módulo a qual a permissão está relacionada | ObjectID("jd1c28gcms62gc5a1")
ofRoles: [ObjectID] | Papéis do evento que possuem a permissão | 

### Objetos

Produtos moldados pelas entidades gerenciadas pelo módulo. São armazenadas no campo `storage` do modelo de Módulo.

Campo | Descrição |
------| --------- |
entity: Entity | Referência para a entidade que originou o objeto 
data: Object | Objeto criado pelo módulo
