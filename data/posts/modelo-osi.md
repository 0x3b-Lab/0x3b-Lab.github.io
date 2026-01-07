# Modelo OSI (Open system Interconnection)

El modelo OSI es un marco conceptual que describe como se comunican dos sistemas a traves de una red.

No es un software, no es una regla obligatoria y no es algo que "funcione" por si solo.
Es un modelo mental: una manera de ordenar el  caos.

Cuando dos sistemas se comunican, pasan muchas cosas al mismo tiempo: señales, direciones, reglas, formatos y aplicaciones. El modelo OSI separa todo ese proceso en partes mas simples, lo que llamaremos capas, para poder entender que pasa, donde pasa y como se puede romper.

Divide el proceso de comunicacion en 7 capas

1. Fisica
2. Enlace de datos
3. Red
4. Transporte
5. Sesion
6. Presentacion
7. Aplicacion
![[modelo_osi_y_ataques.png]]

---
## 1. Capa: Física

La capa Física es la **realidad material de la red**.  
Antes de que existan datos, direcciones o programas, tiene que existir algo básico:  
**una señal viajando por un medio físico**.

- Cables (Ethernet, fibra óptica)
- Frecuencias de radio (Wi-Fi, Bluetooth, NFC)    
- Hubs, repetidores, tarjetas de red y antenas

Esta capa se encarga de transportar bits (0 y 1), convertir la información en señales y definir voltajes, frecuencias y tiempos.

Si no existe la capa Física, no existe ninguna de las siguientes capas.  
Da igual que el software funcione perfecto si el cable está cortado.

Desde una perspectiva atacante, siempre se puede abusar de esta capa:
- Desconectando un cable
- Pinchando una línea
- Sniffeando una señal
- Interferir una transmisión
- Conectarse a un switch random por ahí

---
## 2. Capa: Enlace de datos

La capa de Enlace de datos es la que **pone orden sobre el caos físico**.  
La capa Física solo mueve señales; esta capa decide **quién habla, quién escucha y a quién va dirigido cada paquete** dentro de una red local.

Acá aparecen las **reglas básicas de comunicación** entre dispositivos conectados al mismo medio físico.

- Direcciones MAC (identidad física de cada dispositivo)
- Tramas (frames)
- Switches
- Protocolos como Ethernet y Wi-Fi

Esta capa se encarga de:

- Identificar dispositivos dentro de la red local
- Controlar el acceso al medio
- Detectar errores básicos de transmisión
- Entregar los datos al dispositivo correcto

Si esta capa falla, los dispositivos pueden estar conectados físicamente, pero **no saben quién es quién** ni con quién están hablando.

Desde una perspectiva atacante, esta capa es ideal para:

- Suplantar identidades (MAC spoofing)
- Escuchar tráfico que no te pertenece
- Engañar a switches
- Envenenar la comunicación entre dispositivos
- Moverte dentro de una red local sin salir a internet

---
## 3. Capa: Red

La capa de Red es la que **decide a dónde va la información**.  
Mientras la capa de Enlace solo funciona dentro de una red local, esta capa permite que los datos **viajen entre redes distintas**.

Acá nace Internet.

La capa de Red se encarga de:

- Direccionar los datos usando direcciones lógicas (IP)    
- Elegir el camino que siguen los paquetes
- Pasar información de una red a otra

No le importa qué contiene el paquete ni si llega completo.  
Solo le importa una cosa:

> “¿A dónde tiene que ir esto?”

- Direcciones IP
- Routers
- Tablas de enrutamiento
- Protocolos como IP, ICMP

Si esta capa falla, los dispositivos pueden estar bien conectados, pero **no llegan a destino**.

Desde una perspectiva atacante, esta capa permite:

- Redireccionar tráfico
- Interceptar comunicaciones
- Aislar equipos o redes enteras
- Manipular rutas
- Hacer que algo “exista” o “desaparezca” de la red

---
## 4. Capa: Transporte

La capa de Transporte se encarga de **cómo llega la información**, no solo de a dónde va.  
Mientras la capa de Red decide el destino, esta capa controla **la entrega**.

Acá aparece el concepto de **conexión**.

La capa de Transporte se encarga de:

- Dividir la información en partes manejables
- Asegurar que los datos lleguen completos y en orden (si corresponde)
- Controlar la velocidad de envío
- Identificar servicios mediante puertos
- Protocolos como TCP y UDP

No todas las comunicaciones necesitan control total.  
Algunas priorizan velocidad, otras confiabilidad.
Si esta capa falla, la información puede llegar **incompleta, desordenada o no llegar**.

Desde una perspectiva atacante, esta capa permite:

- Saturar servicios
- Forzar cortes de conexión
- Abusar de puertos expuestos
- Manipular flujos de datos
- Negar el servicio sin tocar la aplicación

---

## 5. Capa: Sesión

La capa de Sesión se encarga de **mantener viva la comunicación** entre dos sistemas.  
No le importa el contenido de los datos ni cómo viajan, sino **el estado de la conversación**.

Acá aparece la idea de _estar conectado_.

La capa de Sesión se encarga de:

- Iniciar una comunicación
- Mantenerla activa
- Sincronizar intercambios
- Cerrar la sesión correctamente

Si esta capa falla, la comunicación se corta aunque la red siga funcionando.  
Es cuando te “desconecta”, te expulsa o te obliga a volver a empezar.

- Sesiones
- Estados
- Tokens o identificadores de sesión

Desde una perspectiva atacante, esta capa permite:

- Secuestrar sesiones activas
- Reutilizar identificadores válidos
- Forzar cierres de sesión
- Mantener sesiones abiertas más tiempo del debido

---
## 6. Capa: Presentación

La capa de Presentación se encarga de que la información **tenga un formato entendible** para ambos extremos de la comunicación.  
No decide qué se envía ni cuándo, sino **cómo se representa**.

Es la capa que traduce.

La capa de Presentación se encarga de:

- Codificar y decodificar datos
- Comprimir y descomprimir información    
- Cifrar y descifrar comunicaciones

Si esta capa falla, los datos pueden llegar, pero **no se entienden**.  
Es cuando recibís información corrupta, ilegible o inútil.

- Formatos de datos
- Codificaciones
- Cifrado

Desde una perspectiva atacante, esta capa permite:

- Romper o forzar formatos
- Aprovechar errores de codificación
- Interferir en procesos de cifrado
- Engañar sobre el contenido real de los datos

---

## 7. Capa: Aplicación

La capa de Aplicación es **donde el humano interactúa con el sistema**.  
Es la única capa visible para el usuario y, para muchos, la única que “existe”.

Todo lo anterior trabaja para que esta capa funcione.

La capa de Aplicación se encarga de:

- Permitir la interacción entre el usuario y la red
- Definir qué puede hacer una aplicación
- Exponer servicios y funcionalidades

Acá viven:

- Navegadores web
- Correos electrónicos
- APIs
- Aplicaciones y servicios
- Protocolos como HTTP, FTP, SMTP, DNS

Si esta capa falla, el sistema puede estar perfectamente conectado, pero **no sirve para nada** desde el punto de vista del usuario.

Desde una perspectiva atacante, esta capa permite:

- Explotar errores lógicos
- Abusar de funciones mal diseñadas
- Manipular entradas del usuario
- Acceder a información que no debería estar expuesta
- Atacar sin tocar directamente la red

---
