# seminario/core/
Back-end provedor de dados para a aplicação Seminário CCSA. O **core** foi desenvolvido em _Node.JS_ e banco de dados _MongoDB_ com os seguintes requisitos:

![Node](https://img.shields.io/badge/Node.js-v4.4.7-green.svg)
![NPM](https://img.shields.io/badge/npm-v2.15.9-blue.svg)
![Express](https://img.shields.io/badge/Express-v4.14.0-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v3.2.9-green.svg)

## Instalação Rápida
Baixe o diretório ccsa-ufrn/seminario
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
## Config file
:construction:
## Deployment
O Seminário CCSA utiliza o serviço PM2 da Keymetrics como gerenciador de processos Node.JS. ([Conheça aqui](http://pm2.keymetrics.io/)).

Em modo de produção um único script é utilizado para fazer deploy e monitoramento de toda aplicação (core). Para fazer deploy somente do core, execute os seguintes passos (com pm2 instalado):
```
# pm2 start process.yml --env [production|development]
```
O pm2 irá iniciar 4 instancias do core. Para monitorar em tempo real estas instancias, informações de uso de memória e processamento execute:
```
pm2 monit
```
O resultado será parecido com este:

![](http://i.imgur.com/Qn7rcIA.png)
