## Erros de sistema
São erros ocasionados em tempo de execução de Sigeva que comprometem o funcionamento de tal forma que funcionalidades não podem ser atendidas sem a correção desses erros. Erros de sistema retornam status `500 Internal Server Error`.

### Códigos de erros de sistema

#### 0x1 Inicialização incorreta do Register Fields
Este erro acontece no cadastramento de novos usuários e é lançado quando o Register Fields não foi inicializado corretamente, essa instalação acontece no momento de instalação de Sigeva.

:small_red_triangle: Solução: Execute o script `tools/initializing_db.js`
