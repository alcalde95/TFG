# TodoSprint3

⭕clientes componente a parte en una tabla

⭕administrador no edita. Hace lo q el instructor no puede

⭕Quitar descripción de las tarjetas de clase

⭕Inscrito a la sesiones, no a las clases.

⭕Mostrar instructores is estás logueado--lunes

⭕⭕⭕⭕⭕⭕✔✔✔✔ TODO LO SIGUIENTE ✔✔✔✔✔✔✔✔✔✔
Imagen: guardar en la bbdd como asDataUrl <- esto función del front

```html
<img src="data:image/gif;base64,R0lGODlhyAAiALM...DfD0QAADs=" />
```

FileReader.readAsDataURL()
eso lo recupero dp y lo meto en el front-end

devolver con "data:image;... para así poner el src
✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔  

Pensar en algo más cercano a la clientela real. Si verificar x el administrador. X ejemplo, un parámetro llamado confirmado q sea gestionado por el admin y si no estás confirmado no puedes inscribirte

sólo el instructor que imparta la clase podrá justificar

instructor -> coordinador crea las clases indicando quién lo crea y quien lo impoarte

el administrador puede indicar quién coordina la clase

sesiones -> 1 por cada día ordenadas por horas. Crear herramienta para duplicar semanas o días.
Buscar componente calendario

## TODO

### Frontend

- ⭕Validación datos clases a crear
- ⭕Hacer la selección de instructor no como un input type text sino como un selector a la hora de crear las sesiones
- Añadir calendario
- Añadir duplicación de sesiones
- ⭕Añadir creación de sesiones
- ⭕Añadir validación de datos de creación de sesiones
- ⭕Recuperar todos los instructores y mostrarlos en la selección de instructores
- Dividir entre clases creadas y clases que imparte el instructor. Crear 2 componentes -> mis clases, -> clases que imparto🚧
- Añadir botón eliminar sesiones
- Añadir botón eliminar clases
- Esconder botón eliminar sesión en las clases que impartes y no las que creas
- Esconder botón añadir sesiones en las clases que impartes --REVISAR
- En las clases que imparte mostrar los horarios
- ⭕Añadir Modificación de clases creadas por el instructor
- ⭕Añadir validaciones y refactorizar el código
- Añadir mensajes personalizados para el login,registor,...
- Añadir cargando...
- Revisar a futuro el nombre classID
  
### Backend

- ⭕Crear endpoint para pedir sólo los instructores
- ⭕Arreglar bbdd :D
- ⭕Añadir atributo instructor en las sesiones
- ⭕Crear api sesiones
- ⭕Crear endpoint obtener Sesiones para una clase
- Añadir autenticación a el anterior punto
- Añadir endpoint para obtener las clases en las que al menos una de sus sesiones tienen de instructor el instructor pasado -- +-, FALTA AÑADIR AUTENTICACIÓN,...🚧
- ⭕Crear endpoint añadir Sesiones
- ⭕Añadir autenticación a el anterior punto
- ⭕Crear endpoint borrar sesiones
- ⭕Crear endpoint editar clases
- Añadir atributo checked al cliente para que si no lo tiene no pueda acceder a las clases
- Implementar comprobación de si existe el token cuando lo recibe el backend en todos los endpoints
- Revisar invalid token error, pasar de 500 a 401
