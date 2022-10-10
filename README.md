# Chat - MERN

Aplicación de **Chat** realizada con Node.js, React, Mongo DB, Express y Socket.io. El usuario puede registrarse y loguearse para entrar a una sala de chat y chatear en tiempo real. También puede crear múltiples salas y borrarlas. 

## Instrucciones:
1. Para ejecutar la aplicación es necesario tener instalado [React](https://es.reactjs.org/) y [Node.js](https://nodejs.org/es/).
2. Renombrar el archivo *congif.env* a *.env* y editar el valor **DATABASE_URL**.
3. Después de clonar el [repositorio de GitHub](https://github.com/eliashz/nodeInitialDemo/tree/chat), realizar `npm i` desde */client* y desde */server* para la instalación de las dependencias.
4. Ejecutar `npm start` desde */client* y desde */server* para la ejecución de la aplicación.
5. Para la prueba de los **endpoints**, importar el archivo *Chat.postman_collection.json* en [Postman](https://www.postman.com/) que está en la carpeta *postman*.
    + **POST /user/register** - Añade un usuario a la base de datos. 
    + **POST /user/login** - Realiza el login de un usuario mediante el e-mail y la contraseña.
    + **POST /chat** - Añade una sala de chat a la base de datos. 
    + **GET /chat** - Obtiene todas las salas de chat creadas. 
    + **DEL /chat** - Borra una sala de chat por la ID. 
    + **GET /chat/:id** - Busca una sala de chat por la ID.

<br>

* * *

<br>
