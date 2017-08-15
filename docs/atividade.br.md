# Atividades

Uma **atividade** associada à um evento é uma entidade controlada por módulo (de nome **ActivityModule**). A definição de uma atividade é: processo que ocorre durante um horário, data e local e requer (em alguns casos) a prévia inscrição (em alguns casos) de acordo com o número total de vagas ofertadas.

Pelo fato de ser um módulo, menus e permissões garantidas a **usuários comuns** às atividades são definidas com base em seus devidos papéis. Esta documentação conta com casos de uso considerando o Seminário do CCSA.

Toda atividade deve possuir um tipo (Ex.: Minicurso, Oficina, Mesa-redonda), esses tipos devem ser cadastrados na configuração do módulo.

### Criação de um tipo

O tipo de atividade pode ser criado pelo **administrador do sistema** nas configurações do módulo **ActivityModule** do evento. A adição de um novo tipo de evento solicita os campos:
- Título para menu (Ex.: Minicurso)
- Descrição do tipo (Ex.: Cursos de curta duração)
- Período para submissão de propostas (Datas inicial e final)
- Período para inscrição em atividades (Datas inicial e final)
- Data para disponibilização de certificados
- Quantidade máxima de atividades deste tipo um usuário pode participar
- Solicitar pagamento para inscrição na atividade? (Sim ou Não)

Permissões aplicáveis ao propositor da atividade
- O propositor pode registrar presenças dos inscritos? (Sim ou Não)

Caso seja necessário, o administrador pode determinar que no momento da submissão de proposta seja enviado um arquivo; a descrição deste arquivo deve ser informada (Ex.: Conteúdo programático).

TODO: Informações sobre quantidades de horas que uma atividade possui (é definido por proposta ou todas atividades possuem a mesma quantidade?)
TODO: Perceber onde se encaixa a informação de que o inscrito deve comparecer a 2 de 3 encontros da atividade (caso existam 3 encontros)

### Permissões

Após a definição do tipo, devem ser selecionados quais papéis possuem quais permissões com relação aquele tipo de atividade.

<p align="center">
<img src="http://i.imgur.com/MARleqh.jpg">
</p>

- **Permissão de proposta**: Garante o poder de submeter uma proposta de atividade daquele tipo. (Ex.: Minicurso=Docente|Técnico|Disc.Pos.; Conferência=Coord. Ev.)
- **Permissão de validação**: Garante o poder de validar uma proposta. (Ex.: Minicurso=Docente; Oficina=Docente;)
- **Permissão de aprovação**: Garante o poder de aprovar a atividade proposta. (Ex.: Minicurso=Coord. Ev.)
- **Permissão de edição**: Garante o poder de editar todas as informações de uma proposta. (Ex.: Minicurso=Coord. Ev.)
- **Permissão de inscrição**: Garante o poder de se inscrever para participar da atividade (Ex.: Minicurso=Todos)
- **Permissão de registro de presenças**: Garante o poder de registrar presenças dos inscritos na atividade (Ex.: Minicurso=Coord. Ev.)

### Fluxo de trabalho de uma atividade

- Submissão de proposta
- Validação de proposta
- Aprovação de proposta
- Inscrições na atividade
- Verificação de presentes
- Certificação

#### Submissão de proposta e validação de proposta

Dentro do prazo definido para propostas de atividades, o usuário com a **permissão de proposta** tem acesso ao formulário de submissão. Apenas a **permissão de validação** permite que a **proposta de atividade** seja enviada para análise e aprovação pelo usuário detentor da **permissão de aprovação**. Caso o usuário propositor também possua **permissão de validação** a atividade é validada automáticamente no momento da submissão de proposta.

No formulário de submissão devem constar:
- Título da atividade proposta
- Quantidade máxima de vagas
- Arquivo solicitado

:zap: CASO DE USO: No Seminário CCSA, Docentes podem submeter atividades que vão diretamente para consolidação pelo coordenador do evento; Discentes de pós-graduação também podem submeter atividades, mas elas devem ser "acatadas" por um Docente. Esse processo torna-se possível com a utilização das permissões de **proposta** e **validação**; como o Disc. Pós. tem apenas a permissão de proposta, fica sujeito ao Doc. que pode validar a atividade. Já as atividades enviadas pelo docente, que tem as duas permissões, são propostas e validadas no mesmo tempo.

#### Aprovação de proposta

Depois de validada, a proposta passa a aparecer para o detentor da **permissão de aprovação**, se aprovada a proposta passa a ser uma oferta de atividade, ou seja, será aberta para inscrições.

:exclamation: NOTE: A atividade não será aberta para inscrições imediatamente; isso só ocorrerá se o prazo para inscrições já estiver sido aberto antes da aprovação.

#### Inscrições na atividade

A inscrição requer a **permissão de inscrição**, o usuário com esta permissão pode se inscrever em qualquer atividade ofertada, exceto nos casos em que:
- O usuário não tenha efetuado o pagamento da inscrição no evento (se for solicitado de acordo com as definições da atividade)
- A quantidade de vagas chegou ao limite;
- O usuário atingiu a quantidade máxima de atividades permitidas; ou
- O usuário possui um choque de horários entre a atividade desejada e as atividades em que é inscrito.

#### Verificação dos presentes

A verificação da efetiva participação dos usuários em atividades nas quais eles se inscreveram é efetuada pelo dententor da **permissão de registro de presenças**. Ele também pode, se necessário, inserir usuários que não constam na lista de presença.

#### Certificação

A certificação é feita para os inscritos nas atividades e também para os propositores das mesmas. A data para liberação dos certificados deve ser definida nas configurações dos tipos de atividades e, a partir desta data, deve aparecer o menu referente a certificação para os usuários.
