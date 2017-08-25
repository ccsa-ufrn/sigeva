# FieldRequest
**Collection**. Representa um requerimento de campo que pode ser obrigatóriamente preenchido ou não.

### Propriedades de FieldRequest

Campo | Descrição | Exemplo
------|-----------|--------
name:String [lowercase|required] | Nome do campo | 'lattes-url'
readable:String [required] | Nome que pode ser impresso para usuário | 'URL do Lattes'
HTMLtype:String [required] | Tipo de campo de acordo com a definição da W3C | 'text'
editable:Boolean [default:true] | Indica se a requisição pode ser editada por usuários | true
required:Boolean [default:false] | Indica se a requisição é de preenchimento obrigatório | true
createdAt:Date [default:now] | Data de criação da requisição | '2017-09-13 12:23:12'
destroy:Boolean [default:false] | Indica se a instancia deve ser excluída do banco de dados no próximo destroy loop | false
