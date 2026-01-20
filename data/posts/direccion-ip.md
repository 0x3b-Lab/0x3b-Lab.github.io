Una **direccion IP** es un **identificador logico** que se asigna a una **interfaz de red** de un **host** dentro de una red.  
Su funcion es **identificar y ubicar** esa interfaz para que los datos sepan **a donde ir y de donde volver**.

Sin una direccion IP, un dispositivo puede estar conectado fisicamente, pero la red no puede comunicarse con el.

---
## IP y contexto de red

Una direccion IP **no es un identificador absoluto**.  
Tiene sentido **solo dentro de la red a la que pertenece**.

La misma IP puede existir en miles de redes distintas al mismo tiempo sin generar conflicto.  
Por ejemplo, `192.168.1.1` puede repetirse en innumerables redes locales.

La IP identifica una interfaz **dentro de un contexto de red**, no en todo Internet.

---
## Dirección IP pública

Una direccion IP publica es una direccion **enrutada globalmente en Internet**.  
Es asignada por un ISP y permite que una interfaz sea alcanzable desde redes externas.

En redes domesticas es comun que esta IP este asociada al **router**, que actua como punto de salida y entrada de la red.  
Desde Internet, toda la red puede aparecer como una sola IP cuando se utiliza **NAT**, aunque esto no es una regla general.

---
## Dirección IP privada

Una **direccion IP privada** identifica una interfaz **dentro de una red local**.  
Se usa exclusivamente para comunicacion interna.

Estas direcciones no son enrutable en Internet publico y pueden repetirse libremente entre redes distintas.  
Para acceder a Internet, los hosts con IP privada utilizan mecanismos de traduccion como **NAT o CGNAT**.

---
## IPv4

**IPv4 (Internet Protocol version 4)** es la versión más utilizada del protocolo IP.  
Define **cómo se representan y asignan las direcciones IP** en una red.

Una dirección IPv4 se expresa como **cuatro números decimales separados por puntos**, por ejemplo:  
`192.168.1.10`

Cada número puede ir de **0 a 255**, y la dirección completa identifica a un **host dentro de una red IPv4**.

IPv4 permite un total de **aproximadamente 4.300 millones de direcciones**.  
Ese espacio parecía suficiente al inicio de Internet, pero con el crecimiento de dispositivos se volvió limitado.

Por esta razón se introdujeron mecanismos como:

- el uso de **direcciones privadas**
- la **traducción de direcciones (NAT)**

IPv4 sigue siendo la base de la mayoría de las redes actuales, aunque su espacio de direcciones está **prácticamente agotado**, lo que dio lugar a la aparición de **IPv6**.
Seguimos.

---
## IPv6

**IPv6 (Internet Protocol version 6)** es la versión más nueva del protocolo IP, creada para **reemplazar a IPv4** y resolver sus limitaciones de direcciones.

Una dirección IPv6 se expresa como **ocho bloques de números hexadecimales separados por dos puntos**, por ejemplo:  
`2001:0db8:85a3:0000:0000:8a2e:0370:7334`

El espacio de direcciones de IPv6 es **enormemente mayor** que el de IPv4, lo que amplía enormemente el espacio de direcciones y **reduce la necesidad** de tecnicas como NAT.

IPv6 no es solo “más direcciones”.  
También simplifica el enrutamiento, mejora la autoconfiguración y fue pensado desde el inicio para un Internet con **muchos dispositivos conectados**.

Actualmente, IPv6 **convive con IPv4**.  
Muchas redes y servicios lo soportan, pero IPv4 sigue siendo ampliamente utilizado, por lo que ambos protocolos funcionan en paralelo.

IPv6 es la base sobre la que se proyecta el crecimiento futuro de Internet, aunque su adopción es **progresiva y gradual**.

## Estática y dinámica

Todas las direcciones IP, tanto **públicas** como **privadas**, pueden ser **estáticas** o **dinámicas**.  
La diferencia no está en la dirección en sí, sino en **cómo se asigna y si cambia o no con el tiempo**.

Una **IP dinámica** es una dirección que **se asigna automáticamente** y puede **cambiar**.  
Es el caso más común en conexiones domésticas: el ISP asigna una IP pública por un período de tiempo, y esa dirección puede variar cuando se reinicia el equipo o vence la asignación.  
Dentro de una red local, las IP privadas dinámicas suelen ser entregadas por **DHCP**.

Una **IP estática** es una dirección que **no cambia**.  
Se asigna de forma manual o mediante una reserva, y permanece fija mientras no se modifique la configuración.  
Se usan cuando es necesario que un dispositivo **siempre tenga la misma dirección**, por ejemplo servidores, servicios expuestos o equipos de red.

---
## Clases y direcciones IP especiales

Dentro de IPv4 existen **direcciones reservadas** que cumplen funciones específicas en TCP/IP. No se asignan a hosts comunes para comunicación normal.

- **`0.0.0.0`**: Indica “origen desconocido” o “sin IP asignada”. No es enrutable.
- **`127.0.0.1`**: Dirección de **loopback**. El sistema se comunica consigo mismo.
- **`169.254.0.0 – 169.254.255.255`**: Direcciones **APIPA**. Se asignan automáticamente cuando falla DHCP.
- **`255.255.255.255`**: Dirección de **broadcast**. Envía tráfico a todos los hosts de la red local.
---

## Clases de direcciones IPv4

Históricamente, IPv4 se dividió en **clases** según el rango del primer octeto. Este esquema hoy está obsoleto, pero sirve para entender el origen del direccionamiento.

- **Clase A:** `0.0.0.0 – 127.255.255.255`
- **Clase B:** `128.0.0.0 – 191.255.255.255`
- **Clase C:** `192.0.0.0 – 223.255.255.255`
- **Clase D:** `224.0.0.0 – 239.255.255.255` (multicast)
- **Clase E:** `240.0.0.0 – 255.255.255.254` (experimental)
---
## Direcciones privadas

Dentro de las clases A, B y C existen **rangos definidos como privados** (RFC 1918):
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

Estas direcciones **no se enrutan en Internet público**, pero pueden salir a Internet mediante **NAT o CGNAT**, usando una IP pública como intermediaria