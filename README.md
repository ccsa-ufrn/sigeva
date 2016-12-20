# Sistema de Gestão de Eventos Acadêmicos (sigeva)
![GPL](https://img.shields.io/badge/license-GPL-blue.svg)

Sistema de gestão de eventos acadêmicos que suporta o Seminário de Pesquisa do Centro de Ciências Sociais Aplicadas ([CCSA](https://ccsa.ufrn.br)) da UFRN.

Para obter informações sobre instalação, configuração e uso, acesse a [wiki do projeto](https://github.com/ccsa-ufrn/seminario/wiki).

## [sigeva/api](https://github.com/ccsa-ufrn/sigeva-api)
API do Sistema de Gestão de Eventos Acadêmicos.

## [sigeva/web](https://github.com/ccsa-ufrn/sigeva-web)
Versão WEB do Sistema de Gestão de Eventos Acadêmicos.

## sigeva/mobile
(futuro)

## [sigeva/wiki](https://github.com/ccsa-ufrn/seminario/wiki) :books:
Documentação para utilizadores do projeto.

## [sigeva/docs](https://github.com/ccsa-ufrn/seminario/tree/master/docs) :books:
Documentação para desenvolvedores do projeto.

## Como Contribuir :checkered_flag:
Para enviar contribuições no código-fonte você deve:
- Abrir um issue, caso a sua submissão resolva um bug, ou necessite de alguma discussão.
- Seguir a GitHub workflow, detalhada abaixo.
- Seguir os padrões de desenvolvimento, detalhados mais a seguir.

### GitHub Workflow
1. 'Clone' o repositório do projeto
- Crie uma 'branch' para o seu bug/release (deve possuir o ID da issue aberta):
~~~
git checkout -b new-issue-88888
~~~
- Codifique dentro do 'branch' criado
- 'Commit' as mudanças feitas no código:
~~~
git add .
git commit -m 'fix bug 88888 - mensagem do commit'
~~~
- Submeta seu 'branch' para o GitHub:
~~~
git push origin new-issue-88888
~~~
- Envie um 'pull request' no GitHub.

### Padrão de Desenvolvimento

O padrão de desenvolvimento do Sistema de Gestão de Eventos Acadêmicos está sendo feito com a utilização da ferramenta [EditorConfig](http://editorconfig.org/), acesse o site e veja como instalar o plugin do EditorConfig no seu editor de código preferido. Além disso, veja o arquivo .editorconfig para saber quais os padrões de codificação.

## Estrutura de serviços
Os serviços de back-end e front-end são executados em processos idependentes.

<img src="http://i.imgur.com/3OLBNcc.png" width="600px">
