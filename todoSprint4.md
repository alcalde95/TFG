# Todo Sprint4

## Temas sacados de la reunión

-Tema tarjetas, mostrar las futuras y añadir botón del estilo ver todas y q te muestre las viejas
-Revisar eliminación si tiene clietes. Si no tienen puedes borrar,si tienen meter una advertencia -HACER CUANDO TENGA YA CLIENTES Q SE PUEDAN INSCRIBIR, Q SINO TREMENDO COÑAZO PERDER TODO Xd
-Añadir control delete session sólo el instructor que creó la clase
-Pensar q tiene el token y hacen peticiones de todo tipo

## TODO

### FRONT-END

- ⭕Mostar sólo las clases con fecha superior a la de hoy + 1 día
- ⭕Añadir botón para mostrar todas las fechas
- ⭕Añadir verificación duplicación el día no es menor de 1
- Crear página entrada clients
- Crear búsqueda de clases
- Añadir búsqueda por nombre
- Añadir búsqueda por nº clientes máximos/sesión
- Añadir búsqueda por duración
- La búsqueda hacerla mediante un debounce
- Crear zona en la que se muestran todas las clases
- Mostrar sesiones dentro de las clases
- Dentro de las sesiones que se mnuestran, permitir inscribirse al hacer click
- Mostrar clases a las que se están inscritas
- Añadir control rutas. El cliente no puede estar en la zona de instructores y viceversa

### BACK-END

- ⭕Añadir verificación en sesiones. Sólo borrar si aquel que te manda la petición es el creador de la clase que cuelga la sesión
