## ¿Que es el modelo de referencia TCP/IP?
El modelo de referencia TCP/IP describe el conjunto de protocolos de red diseñado por Vinton Cerf y Robert E. Kahn en 1974.
Posteriormente fue refinado y formalizado como estándar dentro de la comunidad de Internet por Robert Braden (1989).
La filosofía de diseño que sustenta este modelo es analizada por David D. Clark (1988).

Cuando se habla de TCP/IP, en general no se está haciendo referencia únicamente a los protocolos TCP e IP en sí, sino a un conjunto mucho más amplio de elementos. Bajo ese nombre suelen agruparse otros protocolos, aplicaciones e incluso los medios de red sobre los que todo esto funciona.

Dentro de ese conjunto aparecen protocolos como `UDP`, `ARP` o `ICMP`, y aplicaciones como `TELNET`, `FTP` o `RPC`. Por eso, el término TCP/IP resulta bastante impreciso, no es la idea de este post hablar de todos los protocolos que conforman TCP/IP, si no dar una acercamiento a como funciona el stack.

## Estructura básica
La tecnologia TCP/IP aplica la siguiente estructura logica.
![[Modelo_de_referencia_TCPIP.png]]
---

## Capas del modelo TCP/IP
### 1. Capa de Acceso a Red (Link / Network Access)
La capa de Acceso a Red del modelo TCP/IP define los mecanismos necesarios para la transmisión de datos entre nodos dentro del mismo enlace físico o lógico.
Incluye tanto los aspectos físicos como los de enlace de datos, abarcando tecnologías como Ethernet, Wi-Fi o enlaces seriales.

Su función es proporcionar a la capa IP un medio confiable para enviar y recibir paquetes, sin conocimiento del significado de los datos ni de su destino fuera del segmento local.
---

### 2. Capa de Interred
La capa de interred es el núcleo del modelo TCP/IP.
Su función es permitir que los hosts envíen paquetes IP a través de múltiples redes interconectadas, sin importar si el destino se encuentra en la misma red local o en una red remota.
Esta capa ofrece un servicio no orientado a conexión y de tipo best-effort:
los paquetes se envían de forma independiente, pueden seguir rutas distintas y no se garantiza ni el orden de llegada ni la entrega. Si se requiere una entrega confiable y ordenada, esa responsabilidad recae en las capas superiores.
Se la denomina interred en sentido genérico, ya que su objetivo es interconectar redes, aunque su implementación más conocida es Internet.

La capa de interred define:
- Un formato de paquete estándar
- El protocolo IP (Internet Protocol) como mecanismo principal de direccionamiento y encaminamiento
- El protocolo auxiliar ICMP (Internet Control Message Protocol) para notificación de errores y diagnóstico
Su tarea principal es el ruteo de paquetes IP, determinando el camino que deben seguir a través de la red para alcanzar su destino final.
---

### 3. Capa: Transporte
La capa de transporte se encarga de permitir que las entidades pares, ubicadas en los nodos de origen y destino, lleven a cabo una comunicación extremo a extremo.
En esta capa se definen los protocolos responsables del intercambio directo de datos entre procesos que se ejecutan en distintos hosts.

El primero de estos protocolos es TCP (Transmission Control Protocol). Se trata de un protocolo confiable y orientado a la conexión, que permite que un flujo de bytes generado en una máquina sea entregado sin errores a cualquier otra máquina dentro de la interred.
TCP segmenta el flujo de bytes de entrada en mensajes discretos y los entrega a la capa de red. En el nodo destino, el proceso TCP receptor reensambla los segmentos recibidos para reconstruir el flujo de salida original.
Además, TCP implementa mecanismos de control de flujo, asegurando que un emisor rápido no pueda saturar a un receptor lento con más datos de los que este puede manejar.

El segundo protocolo de esta capa es UDP (User Datagram Protocol). UDP es un protocolo no orientado a la conexión y no confiable, diseñado para aplicaciones que no requieren la asignación de secuencia ni el control de flujo provistos por TCP, o que prefieren implementar estos mecanismos por su cuenta.
Se utiliza comúnmente en intercambios de tipo petición–respuesta de una sola ocasión en arquitecturas cliente–servidor, así como en aplicaciones donde resulta más importante la entrega oportuna de los datos que su entrega precisa, como en la transmisión de voz o video.
---

4. Capa: Aplicación

La capa de aplicación agrupa a todos los protocolos de más alto nivel del modelo TCP/IP. Estos protocolos son los que utilizan directamente las aplicaciones de usuario para intercambiar información a través de la red y definen el formato, la semántica y el orden de los mensajes que se envían entre los procesos.

Entre los primeros protocolos definidos en esta capa se encuentran el terminal virtual (TELNET), los mecanismos de transferencia de archivos (FTP) y el correo electrónico (SMTP). Con el crecimiento y la evolución de Internet, se fueron incorporando nuevos protocolos para cubrir distintas necesidades y modelos de comunicación.

Algunos de los protocolos más relevantes incorporados con el tiempo son DNS, encargado de la resolución de nombres de dominio, y HTTP/HTTPS, utilizados como base para la comunicación entre clientes y servidores web.
En conjunto, la capa de aplicación proporciona las interfaces y servicios necesarios para que las aplicaciones puedan utilizar la infraestructura de red subyacente sin necesidad de conocer los detalles de su funcionamiento interno.
---