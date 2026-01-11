**nmap (Network Mapper)** es una herramienta de código abierto pensada para la exploración de redes y auditorías de seguridad.  
Se usa principalmente para analizar redes —chicas o grandes— en busca de equipos activos.

Trabaja enviando paquetes IP _crudos_, muchas veces en formas poco convencionales, para responder preguntas muy concretas:

```
¿Qué equipos están disponibles en una red?
¿Qué servicios exponen (y en qué puertos)?
¿Qué aplicaciones corren y en qué versión?
¿Qué sistema operativo usan (o al menos una buena aproximación)?
Si hay un firewall presente y qué tipo de tráfico filtra
```

En la salida, nmap devuelve un listado de los objetivos analizados, con información adicional para cada uno según los parámetros usados durante el escaneo.
La información mas interesante es la **tabla de puertos**, donde se indica el **número de puerto**, su **estado**, la **versión del servicio** que lo expone y el **nombre** más común asociado a ese **servicio**.

![[nmap_basic.png]]
