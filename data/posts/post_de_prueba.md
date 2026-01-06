# Introducción al Stack 0x3B

Este post demuestra **todas las capacidades del parser markdown** actual.
Está pensado como referencia técnica y como contrato de contenido.

---

## Filosofía

> Hackear no es romper cosas.
> Es entenderlas mejor que nadie.

En 0x3B creemos en **documentar**, *experimentar* y compartir conocimiento real,
sin humo ni dependencias innecesarias.

---

## Formato de texto

Texto normal con **negrita**, *itálica* y también `inline code`
para mencionar funciones, rutas o comandos.

Ejemplo de link:
[Repositorio del proyecto](https://github.com)

Ejemplo de imagen:
![Logo 0x3B](./images/logo.png)

---

## Listas no ordenadas

- Arquitectura simple
- Parser propio
- Markdown controlado
- JS vanilla

## Listas ordenadas

1. Leer el markdown
2. Parsear línea por línea
3. Convertir a HTML
4. Renderizar en el DOM

---

## Código

Ejemplo de bloque de código JavaScript:

```js
function parseMarkdown(md) {
    console.log("Markdown cargado");
    return md;
}
```

@youtube(WXR-bCF5dbM)
