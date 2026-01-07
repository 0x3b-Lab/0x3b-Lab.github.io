# ¿Que es TCP/IP?

TCP/IP es el conjunto de protocolos que permite que Internet funcione. Define como se fragmentan, envian, enrutan y reciben los datos entre dos sistemas a traves de una red.

A diferencia de OSI, no es solo un modelo teorico: TCP/IP es el estandar real en uso, basado principalmente en IP para el direcionamiento y en TCP o UDP para el transporte de informacion.

---
## Capas del modelo TCP/IP

El modelo TCP/IP divide la comunicacion en 4 capas, cada una con una responsabilidad concreta.
No explica como deberia de funcionar la red, si no, como funciona la red en la practica.

---
## 1. Capa: Acceso a red (Network Access)

La capa de Acceso a red se encarga de **cómo los datos se mueven físicamente dentro de una red local**.  
No le importa qué significan los datos ni a dónde van a nivel global, sino **cómo se transmiten de un dispositivo a otro en el mismo medio**.

Acá aparece la idea de _estar conectado físicamente a una red_.
La capa de Acceso a red se encarga de:
- Acceder al medio físico (cable o aire)
- Encapsular datos en tramas
- Usar direcciones físicas (MAC)
- Detectar dispositivos dentro de la red local
- Resolver quién es quién en la LAN

Si esta capa falla, **no hay comunicación**, aunque IP, TCP y las aplicaciones estén bien configuradas.  
Es cuando estás “conectado” pero no ves la red, o la red te ve pero no responde.
- Tramas
- Direcciones MAC
- ARP
- Ethernet / Wi-Fi

Desde una perspectiva atacante, esta capa permite:
- Sniffear tráfico local
- Realizar ARP spoofing / poisoning
- Ataques Man-in-the-Middle
- Clonar direcciones MAC    
- Desconectar o aislar dispositivos de la red

---
## 2. Capa: Internet

La capa de Internet se encarga de **llevar los paquetes desde el origen hasta el destino**, incluso cuando están en **redes distintas**.  
No mantiene estado ni garantiza entrega: su único objetivo es **direccionar y enrutar**.

Acá aparece la idea de _ubicación en la red_.
La capa de Internet se encarga de:
- Asignar direcciones lógicas (IP)
- Encapsular datos en paquetes
- Determinar rutas entre redes
- Enrutar tráfico a través de múltiples saltos
- Notificar errores de red

Si esta capa falla, los sistemas pueden estar conectados a la red local, pero **no llegan al destino**.  
Es cuando hay conexión, pero “no hay Internet”.
- Direcciones IP
- Paquetes
- Enrutamiento
- ICMP

Desde una perspectiva atacante, esta capa permite:
- IP spoofing
- Escaneo de red y hosts
- ICMP abuse (ping flood, smurf)
- Manipulación de rutas
- Descubrimiento de topología de red

---
## 3. Capa: Transporte

La capa de Transporte se encarga de **cómo se envían los datos entre dos sistemas de extremo a extremo**.  
No le importa por dónde viajan los paquetes, sino **cómo llegan**: ordenados, completos, rápidos o confiables.

Acá aparece la idea de _comunicación entre procesos_.
La capa de Transporte se encarga de:
- Establecer o no una conexión
- Controlar el flujo de datos
- Manejar errores y retransmisiones
- Multiplexar comunicaciones mediante puertos
- Decidir confiabilidad vs velocidad

Si esta capa falla, los sistemas pueden verse y comunicarse a nivel IP, pero **las aplicaciones no funcionan correctamente**.  
Es cuando “hay red”, pero el servicio no responde.
- Puertos
- Segmentos
- TCP / UDP
- Handshake
- Control de flujo

Desde una perspectiva atacante, esta capa permite:

- Port scanning
- SYN flood
- TCP reset injection
- Session desynchronization

- Abuso de servicios UDP

---
## 4. Capa: Aplicación

La capa de Aplicación es donde **las aplicaciones interactúan directamente entre sí**.  
Define **cómo se solicitan, envían y reciben datos a nivel lógico**, no cómo viajan ni cómo se entregan.

Acá aparece la idea de _servicios expuestos_.

La capa de Aplicación se encarga de:

- Definir protocolos de comunicación entre aplicaciones
- Establecer formatos de mensajes
- Gestionar solicitudes y respuestas
- Interpretar el contenido de los datos
- Exponer servicios al usuario o a otros sistemas

Si esta capa falla, la red y el transporte pueden funcionar perfectamente, pero **el servicio es inutilizable**.  
Es cuando “hay Internet”, pero la aplicación devuelve errores o no responde.
- Protocolos de aplicación    
- Requests / Responses
- Headers
- Payloads
- Estados de aplicación

Ejemplos comunes:
- HTTP / HTTPS
- DNS
- FTP
- SMTP / IMAP / POP3
- SSH

Desde una perspectiva atacante, esta capa permite:
- Inyección (SQL, command, template)
- Ataques de autenticación
- Abuso de lógica de negocio
- Exposición de APIs
- Manipulación de requests y headers

---
