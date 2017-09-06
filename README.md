<img src="https://i.imgur.com/S5JRd5g.png" width="200" alt="Sigeva"/>

### Sistema de Gestão de Eventos Acadêmicos (Sigeva)
![GPL](https://img.shields.io/badge/license-GPL-blue.svg)

Sistema que suporta o evento Seminário de Pesquisa do Centro de Ciências Sociais Aplicadas
([CCSA](https://ccsa.ufrn.br)) da UFRN.

Para obter informações sobre instalação, configuração e uso, acesse a [wiki do projeto](https://github.com/ccsa-ufrn/seminario/wiki).

### Requisitos de sistema
- Node.js >= v7.0.0
- NPM >= 3.10.8
- MongoDB >= 3.2.11

### Configurações iniciais :wrench:
Antes de instalar dependencias e executar um servidor de Sigeva, é necessário que o arquivo de configuração esteja devidamente preenchido, para isso execute os seguintes passos:

Copie o arquivo `config.TEMPLATE.js` para um novo arquivo com o nome `config.js`. Edite as informações desse arquivo de acordo com suas preferências de servidor de banco de dados, chave de segurança, etc.

### Iniciando para produção :runner:
> :exclamation: Para executar Sigeva em produção recomendamos utilizar uma instância Docker com/ou um monitorador como o PM2, os comandos abaixo iniciará um servidor Sigeva mas não é a melhor forma de fazer isto, utilize com cuidado.

Para utilizar Sigeva nesse ambiente é necessário instalar as dependencias de produção. Para isso execute, no terminal:

```
npm install --production
```

Certifique-se de que seu banco de dados Mongo DB está devidamente funcionando e pronto para receber um conexão. Para iniciar a aplicação execute:

```
npm run server
```

### Iniciando para desenvolvimento :walking:
Este modo é indicado para fazer desenvolvimento de novas features para Sigeva. Caso esteja desenvolvendo algo envie-nos uma PR, e não esqueça de seguir o workflow detalhado na seção "Como contribuir".

Nesse ambiente é necessário instalar todas as dependencias de Sigeva. Para isso execute, no terminal:

```
npm install
```

Antes de desenvolver, note que Sigeva utiliza `EditorConfig` e `ESLint`, certifique-se de encontrar plugins dessas ferramentas para seu editor preferido.

Com as dependencias resolvidas inicie a aplicação com o comando `npm start`. A aplicação é reiniciada para cada alteração em algum código, graças ao pacote `nodemon`.

Você pode buildar algo para produção com os comandos `npm build_server` e `npm build_react` que, respectivamente, transpilam os código do servidor e do front-end em React.js.

## [sigeva/wiki](https://github.com/ccsa-ufrn/seminario/wiki) :books:
Documentação para utilizadores do projeto.

## [sigeva/docs](https://github.com/ccsa-ufrn/seminario/tree/master/docs) :books:
Documentação para desenvolvedores do projeto.

### Como contribuir
Leia informações sobre como contribuir em `/docs/how-to-contribute.md`
