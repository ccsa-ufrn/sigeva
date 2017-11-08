# Modulo de Pagamento

O módulo de pagamento estende caracteristicas do tipo Módulo (ver documentação de Módulo). Esse módulo, como o nome sugere, é responsável por gerenciar pagamentos dos usuários, caso esteja ativo.

### Entidades

Este é um módulo especial que possui somente uma entidade já pré-definida. Esta entidade contém como dado as intruções de pagamento do evento, Sigeva ainda não realiza pagamentos in-app. O pagamento é comprovado pelo usuário, através de submissão de arquivo comprovante, por exemplo, e depois é aprovado por um usuário com a devida permissão.

### Permissões

**Efetuar pagamento** (slug: 'make_payment'): Garante ao usuário o poder de efetuar pagamento relativo à inscrição no evento.

**Aprovar pagamento** (slug: 'approve_payment'): Permite que o usuário confirme que usuários inscritos no sistema efetuaram o pagamento.

**Isentar pagamento** (slug: 'exempt_payment'): Permite que o usuário dispense a necessidade de pagamento para usuário inscrito no evento.

### Objetos

Objetos, em pagamento, são criados quando (a) o usuário envia comprovante de pagamento ou (b) o usuário é isentado de efetuar o pagamento. O objeto possui a definição a seguir:

```
{
  status: "approved",
  user: ObjectID(dj34y73h4kj32sdh7),
  type: "free",
  receipt: null
}
```

O campo `status` pode assumir o valor `to_approve` quando está esperando por aprovação; `approved` caso tenha sido aprovado ou isento; e `rejected` caso não tenha sido aprovado.

O campo `type` pode assumir o valor `receipt` caso o usuário tenha efetuado o pagamento e enviou comprovante; ou `free` caso o usuário tenha sido isentado.
