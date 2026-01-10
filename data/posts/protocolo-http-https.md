# Protocolo HTTP y HTTPS
> Como viajan los datos en la web

## 1. ¿Qué es HTTP?

**HTTP (HyperText Transfer Protocol)** es el protocolo que usan los navegadores para **pedir y recibir recursos** cuando visitamos un sitio web.  
Fue desarrollado entre **1989 y 1991** por **Tim Berners-Lee** y su equipo, como parte de la creación de la World Wide Web.

HTTP define el **conjunto de reglas** que permite a un cliente (por ejemplo, un navegador) comunicarse con un servidor web para **solicitar y transferir recursos**.

Un recurso puede ser:
- una página HTML
- una imagen
- un script
- un archivo JSON
- cualquier archivo accesible mediante una URL

HTTP no define cómo se ve el contenido, sino **cómo se intercambia**.  
El cliente envía una petición y el servidor responde con el recurso solicitado o un código de error.

**HTTPS** es la versión segura de HTTP.  
En HTTPS, los datos viajan **cifrados**, lo que:
- impide que terceros lean la información enviada o recibida
- permite verificar la identidad del servidor y reducir ataques de suplantación

HTTPS no cambia cómo funciona HTTP,  
solo **protege la comunicación**.

HTTP es **stateless** (sin estado).  
Esto significa que cada request que hace el cliente es una transacción independiente, sin relación con las solicitudes anteriores.  
Para el servidor, cada petición es un evento aislado: no importa si vienen del mismo cliente o si ocurren al mismo tiempo, se procesan como si fueran únicas.  
Ninguna request sabe que la otra existe.

# 2. ¿Que es una URL?
Una URL, es el primer paso para iniciar el proceso de intercambio de informacion.
No es solo **la direccion de una pagina**. Es un conjunto de instrucciones que le dice al navegador **que protocolo usar, a que servidor, en que puerto y que recurso pedir**
![[estructura_url.png]]
La **estructura de una URL** se compone de:
- Esquema / Protocolo (HTTP, HTTPS, FTP, SW, SSW) : Define como se va a realizar la comunicacion
  Le indica al navegador que reglas seguir y que tipo de conexion establecer, ademas determina el puerto por defecto:
  - HTTP > 80
  - HTTPS > 443
  - WS > 80
  - WSS > 443
- Host / Dominio (google.com o 142.251.134.206): Identifica **a que servidor quiero llegar**.
  si uso un dominio, el navegador va a resolver via DNS para obtener la IP.
  si usamos la IP directamente no va a intervenir el DNS.



Cuando introducimos una URL en el navegador (Chrome, Firefox o lo que sea), abrimos una conexion TCP/IP, y la solicitud HTTP se envia al servidor