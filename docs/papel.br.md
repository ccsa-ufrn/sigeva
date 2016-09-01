# Papel

O **papel** indica que tipo de função um [**usuário**][usuario] exerce dentro de um [**evento**][evento].
Eles podem ser de dois tipos: **papéis públicos** ou **papéis privados**.

Para cada [**evento**][evento].

Campo | Descrição | Exemplo
------| --------- | --------
Nome | O nome caracterizador do papel | 'Avaliador'
Descrição | A descrição do papel em questão | 'Realiza a avaliação dos trabalhos...'
Tipo | Indica se é um **papel público** ou **papel privado** | 'publico' ou 'privado'

O sistema já inicia com alguns **papéis** *pré-definidos*. Esses papéis não podem ser alterados e nem removidos do [**evento**][evento]. Para os **papéis privados**:

Papel | Função |
------| -------|
Administrador do Evento | Papel com todas as capacidades para o escopo do evento

## Papel público

São **papéis** auto-declarados, pois os próprios [**usuários**][usuario] definem que tipo de **papel** terão dentro do [**evento**][evento].

## Papel privado

São **papéis** que s

### Administrador do evento

Tem todo o controle do [**evento**][evento].

#### Gerenciar usuários

Pode, somente, criar [**usuários**][usuario]. Pode visualizar informações de [**usuário**][usuario] que tem algum papel no escopo do [**evento**][evento]. NÃO pode alterar ou desativar [**usuários**][usuario].

#### Gerenciar papel/usuário

Pode *atribuir* ou *remover atribuição* de um **papel** a um [**usuário**][usuario].


[usuario]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/usuario.br.md>
[evento]:<https://github.com/ccsa-ufrn/seminario/blob/master/docs/evento.br.md>
