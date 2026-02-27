`dig` (Domain Information Groper) es una herramienta de línea de comandos para realizar consultas DNS directas. Permite construir queries específicas contra servidores DNS concretos y ver la respuesta completa sin intermediarios: registros devueltos, flags, TTL, autoridad y tiempos de respuesta.

A diferencia de resolvers del sistema o herramientas “amigables”, dig no interpreta ni filtra resultados. Muestra el mensaje DNS tal como lo responde el servidor. Esto permite observar el estado real de una zona DNS, detectar inconsistencias entre servidores y analizar configuraciones sin depender de cacheo local o externo.

dig trabaja a nivel de protocolo DNS. Todo lo que muestra existe antes de cualquier servicio web, mail o API.
---

## Usos de DIG - Chetsheet

### Resolver dominio a IPv4:
Esto permite identificar el tipo de infraestructura que hay detrás del dominio y entender si se trata de un CDN, un proveedor cloud, un VPS o una red propia. A partir de la IP se puede inferir qué vectores son viables y cuáles no aplican a infraestructura compartida.
`dig example.com A`
---


### Resolver dominio a IPv6:
Algunas veces puede estar habilitado IPv6 sin el mismo control que IPv4, podria por ejemplo apuntar directo al backend, o tener distintas reglas, lo que puede exponer el mismo servicio por un camino menos protegido
`dig example.com AAAA`
---

### Enumerar servidores de nombres:
Esto muestra quién administra realmente el DNS y si hay rastros de configuraciones viejas. Nameservers legacy, delegaciones incompletas o proveedores mezclados suelen aparecer en zonas mal mantenidas y correlacionan con subdominios abandonados.
`dig example.com NS`
---

### Consultar un nameserver específico (evitar cache):
Permite consultar directamente un servidor autoritativo y ver el estado real de la zona. Diferencias entre respuestas de distintos NS indican desincronización, lo que genera comportamientos inconsistentes según desde dónde se consulte.
`dig @ns1.example.com example.com`
---

### Listar servidores de correo:
Esto permite mapear la infraestructura de mail y los dominios involucrados en la entrega. A partir de los MX se evalúan vectores como spoofing, abuso de relays o dependencias externas mal configuradas.
`dig example.com MX`
---

### Inspeccionar registros TXT (SPF, DKIM, DMARC, tokens):
Acá suelen aparecer errores de política y filtrado de información. SPF permisivos, DMARC inexistente o en modo monitor, claves DKIM débiles y tokens de verificación olvidados impactan directo en suplantación de identidad.
`dig example.com TXT`
---

### Obtener información de la zona (SOA):
El SOA expone el servidor primario, el contacto administrativo y parámetros de sincronización. Valores incoherentes o mails internos suelen indicar mala gestión del DNS o infraestructura heredada.
`dig example.com SOA`
---

### Consultar cualquier tipo de registro explícitamente:
Este tipo de consulta intenta enumerar todos los registros expuestos sin filtrarlos por tipo. No siempre responde, pero cuando lo hace puede devolver información que no estaba pensada para ser listada fácilmente.
`dig example.com ANY`
---

### Ver respuesta mínima:
Reduce el output al valor útil. Es especialmente útil para automatización y scripting, evitando tener que limpiar resultados manualmente.
`dig +short example.com`
---

### Ver tiempos y detalles de la query:
Permite observar latencias, flags y comportamiento del servidor DNS. Respuestas lentas o inconsistentes suelen indicar forwarding mal configurado, proxies DNS o infraestructura sobrecargada.
`dig +stats example.com`
---

### Desactivar recursión:
Sirve para comprobar si el servidor responde de forma autoritativa o si está actuando como resolver. Un servidor que recursiona cuando no debería es una mala configuración.
`dig +norecurse example.com`
---

### Consultar un subdominio:
Esto permite verificar si un subdominio existe, a dónde apunta y si sigue activo aunque no esté documentado. Muchos servicios secundarios o entornos de testing quedan expuestos por este motivo.
`dig sub.example.com`
---

### Transferencia de zona (AXFR):
AXFR solicita la transferencia completa de una zona DNS desde un servidor autoritativo. Está diseñado para sincronizar servidores primarios y secundarios, pero si no está restringido, permite a un tercero obtener todos los registros DNS del dominio.

Un AXFR exitoso expone subdominios, direcciones IP, servicios internos, entornos de testing y hosts olvidados sin interactuar con ningún servicio de aplicación. Es una de las formas más completas y silenciosas de enumeración de infraestructura.
`dig @ns1.example.com example.com AXFR`
---

## ¿Como funciona?
dig es un cliente DNS "crudo", por lo que no usa el resolver del sistema como lo haria un navegador, si no, que construye el paquete DNS "a mano", los manda y nos muestra la resputa tal cual llega.

Al utilizar `dig A example.com @8.8.8.8 +dnssec`,dig esta interpretando :
- QNAME: `example.com`
- QTYPE: `A`
- QCLASS: `IN`
- Servidor: `8.8.8.8`
- Flags extra: `DO` (DNSSEC OK)