# System

## GET system/setup

Rota utilizada uma única vez para instalar as configurações iniciais do sistema.
Configurar de acordo com as necessidades.

### Parâmetros

~~~
[sem parâmetros]
~~~

### Respostas

O resultado da requisição:

~~~ json
{
    "status": "success|error",
    "msg": "first user already created",
    "errorcode": 1
}
~~~