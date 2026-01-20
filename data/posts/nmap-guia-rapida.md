**nmap (Network Mapper)** es una herramienta de código abierto pensada para la exploración de redes y auditorías de seguridad.
Se usa principalmente para analizar redes **chicas o grandes** en busca de equipos activos.

Recomiendo leer la [documentacion oficial](https://nmap.org/man/es/index.html) de la herramienta, dado que todo esta guia, es un burdo plagio de la misma.
nmap, tiene una variedad de parametros extensa para manejarla a nuestro gusto, esta guia no describe el uso de todas ellas, se explicara lo que considero una base minima, no obstante, siempre se puede acudir desde la terminal al manual con `man nmap`

Nmap trabaja enviando paquetes IP **crudos**, muchas veces en formas poco convencionales, para responder preguntas muy concretas:

```
¿Qué equipos están disponibles en una red?
¿Qué puertos estan expuestos en estos equipos?
¿Qué servicios exponen?
¿Qué versión?
¿Qué sistema operativo usan (o al menos una buena aproximación)?
¿Hay un firewall presente? ¿Qué tipo de tráfico filtra?
```

En la salida, nmap devuelve un listado de los objetivos analizados, con información adicional para cada uno según los parámetros usados durante el escaneo.
La información mas interesante es la **tabla de puertos**, donde se indica el **número de puerto**, su **estado**, la **versión del servicio** que lo expone y el **nombre** más común asociado a ese **servicio**.
Los estados de un puerto pueden ser:
- `open`(abierto) : significando que la aplicacion en el servidor destino se encuentra esperando conexiones
- `filtered`(filtrado) : indica que un firewall, filtro u otro obstaculo en la red bloquea el acceso a ese puerto, por lo que nmap no puede indicar el estado.
- `closed`(cerrado) : Los puertos cerrados no tienen ninguna aplicacion en escucha,aunque se podrian abrir en cualquier momento.
- `unfiltered`(no filtrado) : Esto se indica cuando un puerto no se pudo determinar en cual de los dos estados está.

Además de la tabla de puertos, Nmap proporciona información adicional sobre los hosts de la red. Esto incluye el nombre DNS obtenido a partir de la resolución inversa de la dirección IP, una estimación de los posibles sistemas operativos, el tipo de dispositivo y la dirección MAC de la interfaz de red.

---
# Escaneo basico con nmap
La forma más simple de usar **nmap** es ejecutarlo indicando únicamente la IP o el dominio del objetivo.  
Con un comando básico como `nmap 192.168.1.1`, se obtiene un escaneo por defecto que muestra los puertos más comunes y su estado.  
Esto permite tener una primera idea rápida de qué servicios están expuestos sin configurar opciones avanzadas.

![[nmap_basic.png]]

A 
muestra el puerto 22 alojando un servicio SSH (Secure Shell) y el puerto 53 el cual aloja un servidor DNS.

---
# Descubrimiento de hosts en la red
Un parámetro interesante de **Nmap** es `-sP` (Ping Scan).
Tambien podemos indicarle el **CIDR** de la red entera.
Esta opción le indica a Nmap que realice **únicamente el descubrimiento de hosts** dentro de ese rango, sin análisis de puertos ni detección de sistema operativo. El resultado es un listado de los equipos que **respondieron al sondeo**.

![[nmap_sP_CIDR.png]]

No es un análisis pasivo: se trata de un escaneo **activo**, ya que se envían paquetes a los objetivos. Aun así, es un reconocimiento liviano, ideal como primer paso para identificar qué sistemas están vivos en una red sin generar demasiado ruido.

El método de descubrimiento depende del contexto:

- Nmap envía solicitudes **ICMP Echo** y paquetes **TCP** a puertos comunes (80/443).
- Sin privilegios, utiliza llamadas `connect()` enviando **TCP SYN** al puerto 80.
- Con privilegios elevados y en una red Ethernet local, prioriza el uso de **ARP** (`-PR`), salvo que se fuerce `--send-ip`.

![[nmap_sP_scan.png]]

En resumen, `-sP` sirve para mapear hosts activos de forma rápida, sin profundizar en servicios ni versiones.

---
# Especificación simple de puertos

Una vez que ya sabemos **qué hosts están activos**, la siguiente pregunta lógica es:  
**¿qué puertos me interesa mirar?**

Por defecto, Nmap no escanea todo. Hace un recorte bastante razonable de los **puertos más comunes**, pero muchas veces eso no alcanza o directamente no es lo que nos interesa. Ahí entra en juego la **especificación manual de puertos**.

El parámetro base para esto es `-p`.
Con `-p` le indicamos a Nmap **exactamente qué puertos escanear** especificamente.

Ejemplos simples:
- Un solo puerto: `nmap -p22 192.168.1.1`
- Varios puertos puntuales: `nmap -p22,80,443 192.168.1.1`
- Un rango de puertos:`nmap -p1-1024 192.168.1.1`
- Todos los puertos (1 a 65535):`nmap -p- 192.168.1.1`

Esto es útil cuando ya tenemos una idea de **qué servicio estamos buscando**, o cuando queremos reducir ruido y tiempo de escaneo.

![[nmap_port_custom_scan.png]]
Nmap ordena de forma aleatoria los puertos a sondear por omisión (aunque algunos puertos comúnmente accesibles se ponen al principio por razones de eficiencia). Esta aleatorización generalmente es deseable, pero si lo desea puede especificar la opción `-r` para analizar de forma secuencial los puertos.

---
# Deteccion de servicios y versiones
Si se le indica a Nmap que analice un sistema remoto, la respuesta puede mostrar puertos abiertos como `21/tcp`, `22/tcp` o `25/tcp`, que **habitualmente** se asocian a FTP, SSH y SMTP respectivamente.  
Eso es una convención, no una regla: nada impide que alguien ejecute servicios distintos en puertos “raros” o no estándar.

La detección de versiones (`-sV`) va un paso más allá.  
Una vez identificados los puertos abiertos, Nmap **interactúa activamente con el servicio** para determinar **qué protocolo es, qué aplicación lo implementa, qué versión corre** y, en algunos casos, incluso inferir **el sistema operativo o el tipo de dispositivo**.

Esto es clave en un análisis de vulnerabilidades, porque la mayoría de las fallas dependen de **versiones específicas**. Un ejemplo clásico es `vsftpd 2.3.4`, una versión que incluye una vulnerabilidad que permite obtener un backdoor, algo que Nmap puede detectar directamente.

![[nmap_sV_scan.png]]  
![[vsftpd_2.3.4.png]]

Para lograr esto, Nmap envía sondas definidas en el archivo `nmap-service-probes` y compara las respuestas con una base de firmas.  
Si el servicio utiliza cifrado (SSL/TLS) o se trata de RPC, Nmap también intenta identificarlo automáticamente.

---
# Detección de sistema operativo

Nmap permite **inferir el sistema operativo** de un host analizando su **huella TCP/IP**.  
Para esto, envía una serie de paquetes TCP y UDP y analiza con precisión las respuestas: opciones TCP soportadas y su orden, números de secuencia, IPID, tamaños de ventana y otros campos del stack de red.

Los resultados se comparan contra la base de firmas `nmap-os-fingerprints`.  
Cuando existe una coincidencia válida, Nmap devuelve una estimación que incluye el **sistema operativo**, su **versión** y el **tipo de dispositivo** (equipo de propósito general, router, switch, appliance, etc.).

La detección de sistema operativo se habilita con`nmap -O 192.168.1.1`
También puede activarse junto con detección de servicios y scripts básicos usando `-A`.

La precisión mejora cuando el objetivo presenta **al menos un puerto TCP abierto y otro cerrado**, ya que esto permite a Nmap ejecutar el conjunto completo de pruebas de fingerprinting.

Opciones relevantes:
- `--osscan-limit`: limita la detección de SO a hosts que cumplen las condiciones mínimas (un puerto abierto y uno cerrado), reduciendo tiempos en escaneos extensos.
- `--osscan-guess` / `--fuzzy`: permite mostrar coincidencias aproximadas cuando no se encuentra una firma exacta.
---

# Control de tiempo
Si bien nmap supone ser rapido para escanear redes locales, al momento de escanear cientos o miles de hosts, ademas ciertas opciones de escaneo como pueden ser el UDP y la deteccion de versiones, puede incrementar el tiempo de un escaneo de forma sustancial, tambien algunos firewall podrian realentizar.

Si bien nmap trabaja en paralelo y tiene varios algoritmos avanzados para acelerar los escaneos, el usuario tiene el control en ultima instancia de como funciona éste.

Una de las tecnicas que puede ayudar a mejorar los tiempos de un escaneo, es limitar el numero de pruebas que no sean criticas


# Exportar reporte de nmap