# seminario/core/
Back-end provedor de dados para a aplicação Sistema de Gestão de Eventos Acadêmicos. O **core** foi desenvolvido em _Node.JS_,utilizando _MongoDB_ com os seguintes requisitos:

![Node](https://img.shields.io/badge/Node.js-v4.4.7-green.svg)
![NPM](https://img.shields.io/badge/npm-v2.15.9-blue.svg)
![Express](https://img.shields.io/badge/Express-v4.14.0-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v3.2.9-green.svg)
![Python](https://img.shields.io/badge/Python-v2.7-green.svg)

## Instalação Rápida
Antes de iniciar realmente a instalação do 'core', é necessário que uma versão
do **Python 2.7** esteja instalada na máquina que vai rodar o programa, pois
a biblioteca para a geração e verificação de hashs em **bcrypt** depende do Python.

Baixe o diretório ccsa-ufrn/seminario.
```
# git clone https://github.com/ccsa-ufrn/seminario.git app
```
Mova-se para o diretório '/core' e instale as dependências com NPM
```
# cd /app/core
# npm install
```
Por fim, pode inicializar o serviço:
```
# npm start
```
Se nenhum erro for mostrado a instalação foi realizada com sucesso.

## Arquitetura
![](http://i.imgur.com/PyWqwtT.png)

Para detalhes com relação a todos os recursos e suas queries disponíveis na api, [clique aqui](https://github.com/ccsa-ufrn/seminario/tree/master/core/docs).

## Config file
:construction:

## Testing
under construction

## Deployment
O Sistema de Gestão de Eventos Acadêmicos utiliza o serviço PM2 da Keymetrics como gerenciador de processos Node.JS. ([Conheça aqui](http://pm2.keymetrics.io/)).

Em modo de produção, um único script é utilizado para fazer deploy e monitoramento de toda aplicação (core). Para fazer deploy somente do core, execute os seguintes passos (com pm2 instalado):
```
# pm2 start process.yml --env [production|development]
```
O pm2 irá iniciar 4 instancias do core. Para monitorar em tempo real estas instâncias, informações de uso de memória e processamento execute:
```
pm2 monit
```
O resultado será parecido com este:

![](http://i.imgur.com/Qn7rcIA.png)

## Referências
 - [Protejendo a API com JWT](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
 - [Assegurando informações via transações em JSON](http://security.stackexchange.com/questions/58965/securing-json-data)
 - [JWT](https://jwt.io/introduction/)
 - [Protocolo HTTP](https://tools.ietf.org/html/rfc7231#section-4.3)
 - [Frisbyjs to test rest api](http://frisbyjs.com/docs/api/)
 - [Upload Files - Angular 2](http://stackoverflow.com/questions/40214772/file-upload-in-angular-2)
