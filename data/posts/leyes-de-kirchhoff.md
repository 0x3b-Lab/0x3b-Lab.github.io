En el análisis de circuitos eléctricos, la aplicación de la ley de Ohm por sí sola no suele ser suficiente para describir completamente el comportamiento de un circuito. Por esta razón se emplean las leyes de Kirchhoff, que constituyen una herramienta fundamental para el análisis y la resolución de una amplia variedad de circuitos eléctricos complejos.

Estas leyes fueron formuladas en el siglo XIX por el físico alemán Gustav Robert Kirchhoff (1824–1887). En 1845 introdujo la ley de la corriente, también conocida como primera ley de Kirchhoff, y posteriormente estableció la ley de la tensión o segunda ley de Kirchhoff, principios que complementan el análisis de circuitos al establecer relaciones de conservación de carga y energía en los sistemas eléctricos.

# 1. Ley de Corriente de Kirchhoff (LCK - Primera Ley)

La primera ley de Kirchhoff, tambien denominada Ley de corrientes de Kirchhoff, se fundamenta en el principio de **conservación de la carga eléctrica**. Este principio establece que la cantidad total de carga dentro de un sistema permanece constante, por lo que no puede acumularse carga en un nodo.
A partir de esto ,la ley establece que:

> La suma algebraica de todas las corrientes que entran y salen de un nodo es igual a cero.

Matemáticamente se expresa como:
```
∑(n=1→N) Iₙ = 0
```
Donde:
- **N** → número de ramas conectadas al nodo.
- **Iₙ** → corriente correspondiente a la n-ésima rama (entrante o saliente).

Para su aplicación, se adopta un **criterio de signos**: las corrientes que ingresan al nodo pueden considerarse positivas o negativas, siempre que las corrientes que salen se asignen con el signo opuesto. Lo relevante es mantener consistencia en la convención elegida durante todo el análisis.


# 2. Ley de Tensión de Kirchhoff (LTK — Segunda Ley)

La segunda ley de Kirchhoff, también denominada **ley de tensiones de Kirchhoff (LTK)**, se fundamenta en el principio de **conservación de la energía**. Este principio establece que la energía suministrada en un circuito debe ser igual a la energía consumida, por lo que no existen pérdidas o ganancias netas de energía en una trayectoria cerrada.

A partir de esto, la ley establece que:

> La suma algebraica de todas las tensiones en una malla o trayectoria cerrada es igual a cero.

Matemáticamente se expresa como:
```
∑(n=1→N) Vₙ = 0
```
Donde:
- **N** → número de elementos en la malla o lazo cerrado.
- **Vₙ** → tensión correspondiente al n-ésimo elemento del circuito.

Para su aplicación, se define un **sentido de recorrido** (horario o antihorario) en la malla y se asignan signos a las tensiones según representen caídas o elevaciones de potencial. La condición esencial es mantener un criterio de signos consistente durante todo el análisis del circuito.


