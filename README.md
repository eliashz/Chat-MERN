# Sprint 5: Sockets

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

### Documentación:
+ [Socket.IO](https://socket.io/docs/v4/)
    + [Get Started](https://socket.io/get-started/chat)
+ [Uso de Fetch **MDN**](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)  
+ [Códigos de estado de respuesta HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Status)  

### Enlaces:
+ [Usando Websockets con NodeJS y SocketIO](https://medium.com/@carlosazaustre/usando-websockets-con-nodejs-y-socketio-b02f66bcb58d)
+ [REST API Design Best Practices Handbook](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)
+ [Pin Scrolling to Bottom **CSS-Tricks**](https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/)

### Videos:
+ [Socket.io Nodejs Mongodb CRUD | Aplicación en tiempo real con websockets **Fazt**](https://www.youtube.com/watch?v=MYqpw0P31ms)
+ [Node Multi Client Chat **WittCode**](https://www.youtube.com/watch?v=-rVxORKWzv0)
+ [Connect Create React App to Express **WittCode**](https://www.youtube.com/watch?v=JSUGAttC1e0)
+ [Node.js App From Scratch | Express, MongoDB & Google OAuth **Traversy Media**](https://www.youtube.com/watch?v=SBvmnHTQIPY)
+ [Learn Socket.io In 30 Minutes **Web Dev Simplified**](https://www.youtube.com/watch?v=ZKEqqIO7n-k)
+ [Fundamentos sobre sockets **Fernando Herrera**](https://www.youtube.com/playlist?list=PLCKuOXG0bPi08E87Xd9zjktYE_sP5Uoct)
+ [Build A Realtime Chat App In ReactJS and NodeJS | Socket.io Tutorial **PedroTech**](https://www.youtube.com/watch?v=NU-HfZY3ATQ)
+ [Realtime Chat With Users & Rooms - Socket.io, Node & Express **Traversy Media**](https://www.youtube.com/watch?v=jD7FnbI76Hg)
+ [How To Create A Messaging App With Socket.io And React **Web Dev**](https://www.youtube.com/watch?v=tBr-PybP_9c)