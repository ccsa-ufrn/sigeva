# Atividades

Uma **atividade** associada à um evento é uma entidade controlada por módulo (de nome **ActivityModule**). A definição de uma atividade é: processo que ocorre durante um horário, data e local e requer (em alguns casos) a prévia inscrição (em alguns casos) de acordo com o número total de vagas ofertadas.

Pelo fato de ser um módulo, menus e permissões garantidas a **usuários comuns** às atividades são definidas com base em seus devidos papéis. Esta documentação conta com casos de uso considerando o Seminário do CCSA.

Toda atividade deve possuir um tipo (Ex.: Minicurso, Oficina, Mesa-redonda), esses tipos devem ser cadastrados na configuração do módulo.

### Criação de um tipo

O tipo de atividade pode ser criado pelo **administrador do sistema** nas configurações do módulo **ActivityModule** do evento. A adição de um novo tipo de evento solicita os campos:
- Título para menu (Ex.: Minicurso)
- Descrição do tipo (Ex.: Cursos de curta duração)
- Período para submissão de ofertas (Datas inicial e final)

Se for necessário inscrição para participar da atividade o administrador deverá marcar um checkbox indicando, e informar o período em que poderão ser feitas inscrições. Outro checkbox deve ser marcado caso exista a necessidade de limitar a quantidade de participantes; se marcado, a quantidade de participantes máxima deve ser solicitada ao propositor da atividade no momento de submissão de ofertas.

Caso seja necessário, o administrador pode determinar que no momento da submissão de oferta seja enviado um arquivo; a descrição deste arquivo deve ser informada (Ex.: Conteúdo programático).

### Permissões

Após a definição do tipo, devem ser selecionados quais papéis possuem quais permissões com relação aquele tipo de atividade.

<p align="center">
<img src="http://i.imgur.com/owp7lic.jpg">
</p>

- **Permissão de oferta**: Garante o poder de submeter uma proposta de oferta da atividade. (Ex.: Minicurso=Docente|Técnico|Disc.Pos.; Conferência=Coord. Ev.)
- **Permissão de adoção**: Garante o poder de integrar o usuário à uma proposta de oferta da atividade. (Ex.: Minicurso=Docente; Oficina=Docente;)
- **Permissão de aprovação**: Garante o poder de aprovar a atividade proposta. (Ex.: Minicurso=Coord. Ev.)
- **Permissão de edição**: Garante o poder de editar todas as informações de uma proposta. (Ex.: Minicurso=Coord. Ev.)
- **Permissão de inscrição**: Garante o poder de se inscrever para participar da atividade (Ex.: Minicurso=Todos)
- **Permissão de registro de presenças**: Garante o poder de registrar presenças dos inscritos na atividade (Ex.: Minicurso=Coord. Ev.)
