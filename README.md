# usbd

**Trabajo práctico para la materia Software Libre, Facultad de Ingeniería UNMdP.**

_Realizado por Franco Martucci y Mauricio Lima_

Se trata de un daemon de linux que se conecta por medio de DBus a UDisk2 para escribir en un log cada vez que un volumen USB es añadido o removido.

## Comandos

Para buscar procesos sin una terminal asociada y que se llamen node:

```
ps -eo 'tty,pid,comm' | grep ^? | grep node
```

Para poder ejecutar el daemon sin que este tenga privilegios de root:

1. Creamos una carpeta (con sudo) en /var/log llamada usbLogger
2. Ejecutamos `sudo chown USUARIO usbLogger`

## Links

- [dbus-next (librería DBus para Node.js)](https://github.com/dbusjs/node-dbus-next#readme)
- [Código de daemonize()](https://wiki.unix7.org/node/daemon-sample)
  - Y documentación para entenderlo:
  - [child_process](https://nodejs.org/api/child_process.html)
  - [detached](https://nodejs.org/api/child_process.html#child_process_options_detached)
  - [unref](https://nodejs.org/api/child_process.html#child_process_subprocess_unref)
