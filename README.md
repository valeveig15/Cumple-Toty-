# Cumple-Toty
Regalo de cumpleaños para Toty, de Vale. Sitio estático adaptable a celular, sin dependencias ni servicios externos.

## Usar
Abrí index.html en un navegador. Los cuatro quizzes incluyen 27 preguntas con explicación, puntuación, repetición y progreso guardado en ese navegador. La carta abre sin completar los juegos. Los quizzes literarios incluyen spoilers.

## Música
Recomendación: BIRDS OF A FEATHER, de Billie Eilish. El botón Música permite elegir un audio local para probarlo: ese archivo no se sube ni queda guardado después de cerrar la página.
Para incluir un MP3 que tengas autorizado a usar, guardalo en assets/birds-of-a-feather.mp3 y descomentá la línea audio.src al final de app.js. Luego subí también el MP3 al repositorio. La reproducción empieza al tocar Música; los navegadores suelen bloquear el inicio automático con sonido.

## GitHub Pages
1. Subí index.html, style.css, app.js y assets a la raíz de Cumple-Toty.
2. En Settings → Pages, elegí Deploy from a branch, rama main y carpeta / (root).
3. GitHub mostrará el enlace cuando termine la publicación.
Repositorio: https://github.com/valeveig15/Cumple-Toty- . No publiques los archivos de WhatsApp en el repositorio.

## Personalización
La carta es un borrador generado, editable en index.html. Los guiños al altar, Montse y el gesto de regalar objetos de anime provienen del texto de los chats. Los gustos literarios, la película, biológico y el verde provienen del pedido de Vale. No se infirió edad ni fecha exacta de cumpleaños. Los adjuntos de audio no se transcribieron; las imágenes y stickers no se interpretaron. El enlace compartido de referencia no pudo recuperarse.
El lema de los jinetes se usa como paráfrasis, porque cambia entre traducciones. La frase de Liam aparece en su forma breve solicitada. Las preguntas son originales, sin reproducir páginas de libros.

## Comprobación
JavaScript comprobado con node --check. Revisión estática del banco de preguntas y referencias de archivos. Pendiente verificación visual e interacción en un navegador.
