# TFG Jorge Alcalde Piñeiro: Gestión web de un gimnasio

## Identificación del proyecto

Fecha: Julio,2024.

Traballo de Fin de Grao Nº: EI 23/24-19.

Título: Gestión web de un gimnasio.

Titor/a: Daniel González Peña.

Cotutor/a: Alba Nogueira Rodríguez.

Área de coñecemento: Linguaxes e Sistemas Informáticos.

Departamento: Informática.

## Instalación

Para la puesta en funcionamiento de la aplicación, será necesario levantar por un lado el Front-End y, por otro lado, el Back-End.
Para el Front-End será necesario acceder a .\front\GymClass e instalar todas las dependencias
y paquetes de este. Para ello se utilizará el siguiente comando:

```sh
pnpm install
```

Una vez instaladas todas las dependencias, para poner en funcionamiento el Front-End, se
utilizará el comando:

```sh
pnpm run dev
```

Aquí es posible usar tanto pnpm como npm, pero se recomienda el uso de pnpm por su
rapidez.

Para el Back-End, previamente es necesario tener un servidor MySql en funcionamiento con
una base de datos en blanco, junto con un usuario que tenga permisos de administrador. Una
vez se tenga esto, será necesario cambiar en el archivo .env de la carpeta .\back la URL de la
base de datos. Esta será del siguiente tipo:
mysql://usuario:contraseña@urlDeLaBaseDeDatos/nombreDeLaBaseDeDatos.

Tras todo esto, se podrá realizar desde la carpeta .\back el comando:

```sh
pnpm install 
```

Este instalará todas las dependencias necesarias, y también habrá que ejecutar el comando:

```sh
pnpm install prisma
```

Tras instalar prisma, habrá que realizar las migraciones de la base de datos. Para ello se usará:

```sh
pnpm prisma migrate dev
```

Una vez acabadas las migraciones e instaladas todas las dependencias, para poner en
funcionamiento el Back-End, es necesario la ejecución del siguiente comando:

```sh
pnpm run dev
```

Al igual que en el Front-End, se pueden emplear tanto pnpm como npm. Para la ejecución del
migrate con npm habrá que emplear:

```sh
npx prisma migrate dev
```

## Creación de administrador

Cuando se inicia la aplicación por primera vez, no existe ninguna información en la base de datos.
Los administradores solo se pueden crear desde la cuenta de un administrador y, al estar vacía la
base de datos, esto no sería posible. La única forma sería introduciendo a mano en la base de datos
al instructor.

El siguiente comando sería un ejemplo para la inserción de un administrador mediante la consola de la base de datos
MySQL:

```sql
INSERT INTO `users`(`email`, `password`, `role`) VALUES ('administrador@admin.es','$2b$10$rdwPIZ3hNuD5MNIBZ/nVpuPLp5ei/JBatqgD6/za212F.jgQMYr1e','A')
```

El usuario usuario administrador@admin.es y la contraseña sería 123456789. Se guarda cifrada por motivos de seguridad
