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
ofEntities: [Object] | Entidades do módulo | Tipos de atividade: "Minicurso", "Oficina". Modos de pagamento: "GRU"
ofPermissions: [Permission] | Permissões relacionadas à entidades do módulo | "Realizar pagamento" na entidade "GRU"
storage: Object | Sessão para armazenamento dos objetos de responsabilidade do módulo | Pagamentos, Inscrições em atividades
config: Object | Sessão para configurações personalizadas do módulo | { default_picture: 'blank.png' }

### Permissão

Campo | Descrição | Exemplo
------| --------- | -------
name: String | Nome da permissão em formato legível para humanos | "Submeter proposta de "
