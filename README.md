<img src="https://i.imgur.com/S5JRd5g.png" width="200" alt="Sigeva"/>

### Sistema de Gestão de Eventos Acadêmicos (Sigeva)
![GPL](https://img.shields.io/badge/license-GPL-blue.svg)
[![CircleCI](https://circleci.com/gh/ccsa-ufrn/sigeva/tree/master.svg?style=svg)](https://circleci.com/gh/ccsa-ufrn/sigeva/tree/master)

Sistema que suporta o evento Seminário de Pesquisa do Centro de Ciências Sociais Aplicadas
([CCSA](https://ccsa.ufrn.br)) da UFRN.

Para obter informações sobre instalação, configuração e uso, acesse a [wiki do projeto](https://github.com/ccsa-ufrn/seminario/wiki).

### Requisitos de sistema
- Node.js >= v7.0.0
- NPM >= 3.10.8
- MongoDB >= 3.2.11

### Configurações iniciais :wrench:
Antes de instalar dependencias e executar um servidor de Sigeva, é necessário que o arquivo de configuração esteja devidamente preenchido, para isso execute os seguintes passos:

Copie o arquivo `config.TEMPLATE.js` para um novo arquivo com o nome `config.js`. Edite as informações desse arquivo de acordo com suas preferências de servidor de banco de dados, chave de segurança, serviço de e-mail etc.

Além disso é necessário a criação de um diretório para armazenamento de arquivos de upload. De preferencia crie um diretório separado do código fonte de Sigeva, e dê permissão de escrita para sigeva no diretório. O arquivo `config.js` também possui um parâmetro para que seja configurado o endereço absoluto do diretório de arquivos.

### Iniciando para produção :runner:
> :exclamation: Para executar Sigeva em produção recomendamos utilizar uma instância Docker com/ou um monitorador como o PM2, os comandos abaixo iniciará um servidor Sigeva mas não é a melhor forma de fazer isto, utilize com cuidado.

Para utilizar Sigeva nesse ambiente é necessário instalar as dependencias de produção. Para isso execute, no terminal:

```
npm install --production
```

Certifique-se de que seu banco de dados Mongo DB está devidamente funcionando e pronto para receber uma conexão para efetuar os próximos passos. Antes de inicializar o servidor, é necessário rodar o script de inicialização do banco de dados, que faz algums configurações importantes. Para isso execute no terminal:

```
npm run initdb:prod
```

É recomendado que somente releases sejam utilizadas em servidores de produção, mas se deseja transpilar o código fonte, ou criar uma release do projeto execute o seguinte comando:

```
npm run build:server
```

> :exclamation: Para executar o código acima é importante notar que as dependencias de desenvolvimento devem ser instaladas, caso contrário haverá erro de execução.

Caso esteja utilizando uma release, ou se já efetuou a transpilação do código fonte, execute o comando a seguir para inicializar o serviço Sigeva em modo de produção:

```
npm run start:prod
```

### Iniciando para desenvolvimento :walking:
Este modo é indicado para fazer desenvolvimento de novas features para Sigeva. Caso esteja desenvolvendo algo envie-nos uma PR, e não esqueça de seguir o workflow detalhado na seção "Como contribuir".

Nesse ambiente é necessário instalar todas as dependencias de Sigeva. Para isso execute, no terminal:

```
npm install
```

Após configurar o `config.js`, inclusive definindo um diretório para arquivos de upload, você deve se certificar de que existe uma instancia de MongoDB em execução no servidor e porta definidos no arquivo de configuração. Então, execute o seguinte comando para fazer inicialização de configurações do sistema no banco de dados:

```
npm run initdb:dev
```

Por fim, execute o comando para inicialização do serviço. Este comando executa o código fonte com `babel-node` no modo debug (Utilize a ferramenta Google Chrome Dev Tools) e com o `nodemon` que reinicia o serviço caso o código seja alterado.

```
npm run start:dev
```

Antes de desenvolver, note que Sigeva utiliza [`EditorConfig`](http://editorconfig.org/) e [`ESLint`](https://eslint.org), certifique-se de encontrar plugins dessas ferramentas para seu editor preferido.

Com as dependencias resolvidas inicie a aplicação com o comando `npm start`. A aplicação é reiniciada para cada alteração em algum código, graças ao pacote `nodemon`.

Você pode buildar algo para produção com os comandos `npm run build_server` e `npm run build_react` que, respectivamente, transpilam os código do servidor e do front-end em React.js.

## [sigeva/wiki](https://github.com/ccsa-ufrn/seminario/wiki) :books:
Documentação (em desenvolvimento) para utilizadores do projeto, contendo instruções para instalação e inicialização de uma instância de Sigeva.

## [sigeva/docs](https://github.com/ccsa-ufrn/seminario/tree/master/docs) :books:
Documentação para desenvolvedores/colaboradores do projeto.

### Como contribuir
Leia informações sobre como contribuir em [`/.github/CONTRIBUTING.md`](https://github.com/ccsa-ufrn/sigeva/blob/master/.github/CONTRIBUTING.md)
