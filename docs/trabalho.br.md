# Trabalhos

Um **Trabalho** pode ser submetido por usuários comuns do sistema e estará associado a um evento especifico. Os trabalhos serão representados por um módulo e possuirá uma hierarquia de permissões. Pelo fato de ser um módulo, menus e permissões garantidas a **usuários comuns** aos trabalhos são definidas com base em seus 
devidos papéis.

PS: Assumiremos os casos de uso do Seminário de Pesquisa CCSA para esta documentação.

### Criação de um trabalho

Um trabalho e seus tipos serão criados pelo administrador do sistema para que sejam adicionados ao evento em questão.

### Tipos de Trabalhos

De acordo com a documentação das normas contida no site do **Seminário de Pesquisa do CCSA**, os trabalhos são divididos em 3 tipos:

1. **Artigos**

2. **Pôsteres**

3. **Casos para ensino**

### Caracteristicas Gerais dos Trabalhos

-Possui de 1 até 5 autores/colaboradores;

-Todos os autores/colaboradores deverão possuir cadastro do SIGEVA;

-Somente os trabalhos que seguirem as normas de formatação para envio serão avaliados;

-Os Trabalhos serão avaliados pelo Coordenador de GT ou pelo Coordenador de Evento;

-Não serão feitas substituições de trabalhos submetidos;

-Os trabalhos submetidos não podem conter qualquer indetificação da pessoa ou grupo que submeteu.


### Representação no Banco

Campo | Descrição | Exemplo
------| --------- | -------
name:String | O nome do tipo de trabalho | 'Artigo'
slugName:String | Nome em formato URL e human-readable | 'casos-para-ensino'
description | Descrição do tipo trabalho | 'Pôster com objetivo tal'
ofProposalRequiredFiles[]:FileRequirement | Arquivos solicitados na submissão do trabalho | [FileRequirement('Resumo do Pôster', '.pdf / .doc / .odt')]
proposalPeriod:DateRange | Período para submissão de trabalhos | DataRange('2017-08-18 09:53', '2017-08-20 09:53')
ofProposeRules[]: Rule | Regras para efetuar a submissão de uma ati | [Rule('payment_required', 'Pagamento da inscrição necessário', null)]
active:Boolean | Indica se um trabalho está ativa ou não | true
createdAt:Date | Data em que o trabalho foi submetido | '2017-08-18 09:53'
userID: INT | ID do usuário que submeteu o trabalho | '157'
ofUsers[]: String | Nome de todos usuários que estão envolvidos no trabalho | 'Maradona, Marconi, Thayrone, Noeli'
ratedAt: date | Data na qual a atividade foi avaliada | '2017-10-20 10:52'
ratedBy: String | Nome do coordenador de GT ou de evento que avaliou o trabalho | 'Noeli'

### Permissões

- **Permissão de proposta**: Garante o poder de submeter um Trabalho. (Ex.: Artigo|Pôster|Casos de Ensino = Docente|Técnico|Disc.Pos.|Sem Vínculo;)
- **Permissão de aprovação**: Garante o poder de aprovar um Trabalho. (Ex.: Coordenador do GT)
- **Permissão de edição**: Garante o poder de editar todas as informações de um trabalho. (Ex.: Coordenador do GT|Coordenador do Evento)
 **Permissão de registro de presenças**: Garante o poder de registrar presenças autores dos trabalhos (Ex.: Artigo=Coord. Ev.)

### Fluxo da Submissão de um Trabalho no Sistema

<p align="center">
<img src="http://imgur.com/LwF0mvs.png">
</p>







