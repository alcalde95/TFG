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
- ⭕Añadir debouncer en la búsqueda
- Crear página entrada clients
- ⭕Crear búsqueda de clases
- ⭕Añadir búsqueda por nombre
- ⭕Añadir búsqueda por nº clientes máximos/sesión
- ⭕Añadir búsqueda por duración
- ⭕La búsqueda hacerla mediante un debounce
- ⭕Crear sistema inscripción en sesiones
- ⭕Mostrar boton de inscribirse y desinscribirse respectivamente
- ⭕Crear sistema desinscribirse de sesiones
- ⭕Mostrar sesiones dentro de las clases
- ⭕Dentro de las sesiones que se mnuestran, permitir inscribirse al hacer click
- ⭕(creo)Añadir control rutas. El cliente no puede estar en la zona de instructores y viceversa
- ⭕Mostrar clases a las que se están inscritas
- ⭕Añadir restricciones a la hora de inscribirse. No permitir inscribirse en caso de tener más de 3 faltas recientes
- Remodelar css -> Elementos hechos: header,landing,instructorPage,Class, login🚧(se me olvidó añadir responsive xd),register🚧

### BACK-END

- ⭕Añadir verificación en sesiones. Sólo borrar si aquel que te manda la petición es el creador de la clase que cuelga la sesión
- ⭕Añadir endpoint post en sessionClients  para poder inscribirse los clientes a las sesiones
- ⭕Añadir endpoint para ver si un cliente está inscrito a una clase o no
- ⭕Añadir endpoint para desinscribirse de sesiones
- ⭕Añadir endpoint para recuperar las clases para los clientes que estean inscritos a al menos una clase de todas
