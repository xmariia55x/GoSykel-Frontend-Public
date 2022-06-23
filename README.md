# GoSykel

GoSykel es una aplicación móvil que permite a los ciclistas registrarse y crear rutas así como realizar rutas creadas por otros usuarios. 

Los usuarios de GoSykel pueden obtener puntos realizando diferentes acciones como por ejemplo: registrar nuevas rutas, realizar rutas creadas por otros usuarios o añadir un nuevo tramo de carril bici. Dichos puntos se pueden usar para consultar la posición del usuario en el ranking de usuarios de la aplicación y canjearlos en una tienda donde pueden adquirir avatares, encabezados e insignias para personalizar su perfil. 

## Introducción
Este documento describe el proceso a seguir para instalar y ejecutar la aplicación móvil en su dispositivo Android.

En este manual se detallan de forma clara y ordenada los pasos a seguir para instalar la aplicación móvil en su teléfono.

Para completar los pasos que se describen posteriormente, es necesario que el sistema operativo de su teléfono sea Android.

Si le surge cualquier duda o comentario, por favor no dude en enviar un email a esta [dirección](mgm7cns@uma.es).

## Pre-requisitos
Para ejecutar los pasos de este manual correctamente, se recomienda que  tenga el siguiente software instalado en su ordenador: 
- [Expo](https://docs.expo.dev/get-started/installation/): durante el desarrollo se ha usado la versión 44 del SDK. En el tutorial puede encontrar información sobre cómo instalar Expo Go la aplicación móvil que le permite probar el código en un dispositivo real a medida que desarrolla la aplicación.

## Instalación de dependencias

Clone el contenido de este repositorio.

El directorio donde ha clonado este repositorio contiene el código fuente de la aplicación móvil.

Dentro del directorio, abra una terminal y ejecute el comando 
```bash
cd go-sykel
``` 
para moverse a la carpeta raíz donde se encuentra el código fuente de la aplicación. 

A continuación, ejecute el comando 
```bash 
npm install
``` 
que instalará las dependencias incluidas dentro del archivo ```package.json```


## Configuración de Firebase
De cara a ejecutar el proyecto con sus credenciales de Firebase, por favor, siga los pasos de este [tutorial](https://cloud.google.com/firestore/docs/client/get-firebase) para crear un proyecto de Firebase y habilitar la autenticación con correo electrónico y contraseña. Es importante seleccionar la opción web a la hora de crear el proyecto en Firebase.

Además, guarde la información de la configuración del proyecto de Firebase que acaba de crear. 

Tras crear el proyecto o si ya tiene un proyecto creado y tiene dicha información, diríjase a la carpeta ```firebase``` y dentro del archivo ```Firebase.js``` complete la sección firebaseConfig con los datos obtenidos durante la creación de la aplicación en la consola de Firebase. 
```json 
const firebaseConfig = {
  apiKey: "complete",
  authDomain: "complete",
  projectId: "complete",
  storageBucket: "complete",
  messagingSenderId: "complete",
  appId: "complete"
};
```

Tenga en cuenta que para usar esta configuración de Firebase también debe configurar el servidor y desplegarlo con la nueva configuración.

Una vez tenga desplegado el servidor con la configuración de Firebase, obtenga la URL donde está desplegado y diríjase a la carpeta ```constants```, abra el archivo ```Constants.js``` y asigne a la variable SERVER_URL la URL del servidor.

## Uso

Tras instalar las dependencias y configurar Firebase es momento de poner en marcha la aplicación móvil. Para ello, abra una consola y ejecute el comando
```bash 
npm run start
```

Este comando empezará a mostrar información en consola y le proporcionará un código QR. 

Para leer dicho código QR en su dispositivo Android, abra la aplicación Expo Go y seleccione la opción 'Scan QR code' que le mostrará la cámara de su dispositivo y podrá escanear el código QR que pondrá en marcha la aplicación en su teléfono. 

A medida que vaya haciendo cambios en el código y los vaya guardando se irá actualizando la aplicación en su teléfono y podrá probar los cambios al instante. 

Cuando termine de probar la aplicación móvil ejecute el comando ```Ctr + C``` para detener la ejecución de la aplicación.

## Contribuir 

Se aceptan Pull Requests. Si desea hacer cambios mayores, abra un issue antes para conocer lo que le gustaría cambiar.

  