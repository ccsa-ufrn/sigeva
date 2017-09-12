# User
**Classe** Executa métodos e ações relacionados aos usuários do sistema.

## Módulo User
Módulo principal relacionado a tratamento de usuários. Se relaciona com o User Router e User DAO, dois outros módulos que tratam de roteamento da API e acesso ao banco de dados, respectivamente.

### constructor()
O construtor padrão desse módulo/classe cria e armazena como propriedade da classe um objeto (`userObject`) retornado do User DAO pelo método `createObject()` (ver Módulo User DAO abaixo). Esse objeto é a representação do usuário no sistema, contém todos os campos definidos no modelo do usuário.

### setData(data_)
Esse método é utilizado para criação de uma nova conta de usuário. Ele altera os dados do `userObject` com base nos valores recebidos no campos `data_`, esses valores vêm, geralmente, de um formulário de registro e repassado pelo UserRouter. É feita a validação de todos os campos e a criptografia da senha do usuário. Além disso, caso o email passado já exista no banco de dados, é retornado erro.

### loadById(id_)
Método para inicialização do `userObject` a partir de um Id passado como parâmetro (`id_`). Caso não exista usuário com esta identificação é retornado erro.

### loadByEmail(email_)
Método para inicialização do `userObject` a partir de um email passado como parâmetro (`email_`). Caso não exista usuário com este email é retornado erro.

### authorize(email_, password_)
Método que analiza se existe um usuário no banco de dados com as credenciais (email e senha) iguais às passadas como parâmetro. O retorno é verdadeiro caso exista e falso caso contrário.

### toFormatedUser(fields)
Esse método transforma os dados do `userObject` em um objeto estilizado para ser retornado pela API. É feita a população dos campos configuráveis e a filtragem de dados requeridos com base no parâmentro `fields`. (ver UserHelper para entender melhor a população de campos configuráveis)

### store()
Armazena o atual `userObject`. Esse método é chamado em ocasiões de atualização e inserção de um usuário no banco de dados.

## Módulo User Helper
Módulo que contém funções complementares criados para facilitar o desacoplamento e refatoração da classe User.

### parseFields(fields)
Transforma campos do tipo `value,value,value` no tipo `value value value`, alterando o delimitador de `,` para espaço. É utilizada para converter campos antes de passar para o Mongo DB, por ser o padrão utilizado pela biblioteca `mongoose`

### parseFieldsToArray(fields)
Similar ao `parseFields` com a mudança de que o `parseFieldsToArray` retorna um Array em que os elementos são Strings obtidas da separação de `fields` por ` `.

### formatUserOfFields(userObject)
Formata o campo `ofFields` que inicialmente contém apenas o valor de um campo configurável e um referência para o `FieldRequest` correspondente. Este método trás do banco de dados quais as informações da requisição de cada campo que o usuário possui, e formata essas requisições junto com o preenchimento delas em um objeto que é retornado.

### formatUser(userObject, userOfFieldsParsed)
Esse método mescla os dados do `userObject`, com um objeto gerado pela função anterior (`formatUserOfFields`) criando um objeto retornável pela API.

### isEmail(email)
Aplica uma expressão regular para validar se um campo é ou não um email. Retorna verdadeiro caso seja um email, falso caso contrário.

### isBetweenLength(field, min, max)
Valida se uma String `field` está com o tamanho definido entre o limite especificado `min` e `max`. O retorno é booleano verdadeiro caso esteja no limite, falso caso contrário.

### createField(fieldValue, fieldRequest)
Cria um objeto instanciando um `FieldModel` e retorna este objeto.

### emailAlreadyExists(email)
Esta função retorna verdadeiro se já existe um usuário cadastrado com o email passado por parâmetro, falso caso contrário.

## Módulo User DAO
O módulo User DAO, localizado em `/src/controllers/user/UserDAO.js` é responsável pelas interações com a coleção `users` no banco de dados. Seus métodos segue uma interface comum a todas as classes DAO e são todos estáticos. Idealmente User DAO só recebe chamados da classe principal User.

### static createObject()
Este método cria uma instância de um `Mongoose Object` a partir do modelo `User` (ver a documentação /class/models/User) e retorna este objeto contendo campos vazios.

### static insertUser(user_)
Recebe um objeto `Mongoose Object` tal como o retornado pelo método anterior para realizar a inserção desse objeto no banco de dados. Caso o objeto já exista no banco de dados (comparação feita pela propriedade `_id`) esse metódo irá apenas realizar uma atualização.

### static executeQuery(query_)
Executa um acesso/busca no banco de dados recebida como parâmetro (`query_`) e retorna uma Promise contendo a resposta da execução.
