Consigna
Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:
Aspectos a incluir:
*Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.
*Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.
*Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase.
*Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”.
*Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem
*NO ELIMINAR FileSystem de tu proyecto.
*Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es:  {user:correoDelUsuario, message: mensaje del usuario} Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.

****************************************************************************
Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:

La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior)

La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

La ruta raíz POST / deberá agregar un nuevo producto con los campos:
id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.)
title:String,
description:String
code:String
price:Number
status:Boolean
stock:Number
category:String
thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
*Status es true por defecto.
*Todos los campos son obligatorios, a excepción de thumbnails

La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

*************************************************************
Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
products: Array que contendrá objetos que representen cada producto

La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.


Inicialización de Proyecto Node.js
Este es un resumen de los pasos para inicializar un proyecto de Node.js basado en los archivos y código proporcionados. Asegúrate de tener Node.js y npm instalados en tu sistema antes de comenzar.

Paso 1: Clonar el Repositorio
Clona el repositorio desde GitHub en tu máquina local:
git clone 

Paso 2: Configurar el Entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:
PORT=8080
DB_USER=Admin
DB_PASS=Admin
DB_HOST=backend55310.lmwscdi.mongodb.net
DB_NAME=ecommerce

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