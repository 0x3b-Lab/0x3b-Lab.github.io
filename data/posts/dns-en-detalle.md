## DNS (Domain Name System)
En teoría, los programas podrían referenciar páginas web, servidores FTP, servidores de correo y otros recursos de red utilizando directamente las direcciones IP de las máquinas donde se alojan dichos servicios. Sin embargo, en la práctica, resulta inviable para los usuarios recordar grandes cantidades de direcciones numéricas. Además, acceder al sitio web de una empresa mediante una dirección como 128.111.24.41 implica que, si por algún motivo ese servidor cambia y se le asigna una nueva IP, la empresa debería informar ese cambio a todos sus usuarios.

Para evitar este problema, se introdujeron nombres simbólicos, legibles y de alto nivel, con el objetivo de desacoplar los nombres de las máquinas de sus direcciones de red. De este modo, un servidor web puede ser identificado como www.google.com independientemente de cuál sea su dirección IP real en cada momento.

No obstante, como la red solo puede enrutar paquetes utilizando direcciones numéricas, se requiere algún mecanismo capaz de traducir estos nombres simbólicos en direcciones IP. En los primeros tiempos de ARPANET, esta tarea se resolvía mediante un único archivo centralizado, hosts.txt, que contenía la lista completa de nombres de host y sus direcciones asociadas. Cada noche, todas las máquinas descargaban este archivo desde un servidor central. Mientras la red contaba con apenas unos cientos de nodos, este esquema resultaba razonablemente eficiente.

Sin embargo, al crecer la red hasta abarcar cientos de redes y miles de equipos, este enfoque comenzó a volverse impracticable. El tamaño del archivo aumentaba de forma constante y, más importante aún, la gestión centralizada de los nombres provocaba conflictos frecuentes, requiriendo una coordinación estricta y compleja, algo inviable para una red en expansión a escala global.

Para resolver estos problemas, se diseñó el DNS (Domain Name System), un sistema distribuido y jerárquico que desde entonces constituye una pieza fundamental en el funcionamiento de Internet.

## Proceso de resolución de nombres y jerarquia
La idea central del DNS es la introducción de un esquema jerárquico de nombres basado en dominios, junto con un sistema de base de datos distribuido encargado de implementar y mantener dicho esquema. Si bien el uso más común del DNS es asociar nombres de host con direcciones IP, el sistema también puede utilizarse para otros propósitos, como la localización de servidores de correo o la publicación de distintos tipos de información relacionada con un dominio.

![[DNS_arbol_jerarquia.png]]
> Solo los TLD existen como categoría formal. Todo lo demás son dominios delegados dentro de ese espacio.

El funcionamiento y la estructura básica del DNS están definidos principalmente en los [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034), [RFC-1035](https://datatracker.ietf.org/doc/html/rfc1035), [RFC-2181](https://datatracker.ietf.org/doc/html/rfc2181) y se elabora con mas detalle en muchos otros.

Desde el punto de vista de una aplicación, la resolución de un nombre no implica interactuar directamente con los servidores DNS. En su lugar, el programa delega esta tarea a un componente del sistema operativo conocido como resolvedor (resolver). El resolvedor es una biblioteca o servicio que actúa como intermediario entre la aplicación y la infraestructura DNS, encargándose de consultar servidores, seguir referencias, manejar caché y devolver el resultado final.

En sistemas Unix-like, un resolvedor clásico es la función gethostbyname(), provista por la biblioteca estándar del sistema (glibc). Esta función recibe un nombre de host y devuelve una estructura con la información obtenida a partir del proceso de resolución, incluyendo el nombre canónico y una o más direcciones IP asociadas.

En otros sistemas operativos el concepto es el mismo, aunque la implementación y la interfaz cambian. En Windows, por ejemplo, el resolvedor forma parte de la API de red de Winsock, y se accede mediante funciones como gethostbyname() o getaddrinfo(), las cuales interactúan con el DNS Client Service del sistema. En todos los casos, el resolvedor cumple el mismo rol: abstraer a la aplicación de los detalles del DNS, consultando las fuentes configuradas (caché local, archivo de hosts, servidores DNS) y devolviendo un resultado uniforme.

De esta manera, el resolvedor no es un protocolo ni un componente del DNS en sí, sino una capa de software del sistema operativo que actúa como interfaz entre las aplicaciones y la infraestructura DNS subyacente.

El siguiente ejemplo muestra cómo una aplicación en C utiliza el resolvedor para traducir un nombre de dominio a direcciones IP, sin necesidad de conocer los detalles internos del protocolo DNS ni de comunicarse directamente con servidores remotos:
```
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <netdb.h>
#include <arpa/inet.h>

int main(int argc, char *argv[]) {
    struct hostent *host;
    struct in_addr addr;
    int i;

    if (argc != 2) {
        fprintf(stderr, "uso: %s <hostname>\n", argv[0]);
        exit(1);
    }

    /* Llamada al resolvedor */
    host = gethostbyname(argv[1]);
    if (host == NULL) {
        herror("gethostbyname");
        exit(1);
    }

    printf("Nombre canonico: %s\n", host->h_name);

    /* Lista de direcciones IP */
    for (i = 0; host->h_addr_list[i] != NULL; i++) {
        memcpy(&addr, host->h_addr_list[i], sizeof(struct in_addr));
        printf("IP: %s\n", inet_ntoa(addr));
    }

    return 0;
}
```


