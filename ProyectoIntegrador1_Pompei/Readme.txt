Inicialización de Proyecto Node.js
Este es un resumen de los pasos para inicializar un proyecto de Node.js basado en los archivos y código proporcionados. Asegúrate de tener Node.js y npm instalados en tu sistema antes de comenzar.

Paso 1: Clonar el Repositorio
Clona el repositorio desde GitHub en tu máquina local:

git clone [URL_DEL_REPOSITORIO]

Paso 2: Configurar el Entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:


PORT=8080
DB_USER=Admin
DB_PASS=Admin
DB_HOST=backend55310.lmwscdi.mongodb.net
DB_NAME=db55310

Paso 3: Instalar Dependencias
Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:


Paso 4: Configurar la Base de Datos
Asegúrate de tener MongoDB instalado y en ejecución. Luego, configura la conexión a la base de datos en el archivo db/index.db.js.

Paso 5: Iniciar el Servidor
En la terminal, ejecuta el siguiente comando para iniciar el servidor:

npm start
El servidor se ejecutará en el puerto especificado en el archivo .env.

Paso 6: Interactuar con la Aplicación
Accede a la aplicación en tu navegador o utiliza herramientas como Postman para probar las rutas y endpoints definidos en los controladores.

Paso 7: Administra los Productos
La interfaz de administración de productos se encuentra en la página home.handlebars. Puedes usar los botones para obtener, actualizar, crear y eliminar productos.

Paso 8: Contribuye y Personaliza
¡Ahora que tienes tu proyecto en funcionamiento, puedes comenzar a contribuir, agregar nuevas funcionalidades y personalizarlo según tus necesidades!