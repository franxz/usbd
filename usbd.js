let fs = require('fs');
let dbus = require('dbus-next');
let bus = dbus.sessionBus();
let daemonize = require('./daemonize');

daemonize();
main();

async function writeToLogfile(text) {
  await fs.promises.appendFile('/var/log/usbLogger/usb.log', text);
}

async function main() {
  const hora = new Date().toISOString();
  await writeToLogfile(`${hora}: Logger de dispositivos USB iniciado\n`);

  // obtener el objeto
  let obj = await bus.getProxyObject('org.gtk.vfs.UDisks2VolumeMonitor', '/org/gtk/Private/RemoteVolumeMonitor');

  // obtener la interface
  let driveInterface = obj.getInterface('org.gtk.Private.RemoteVolumeMonitor');

  // escuchar las señales de la interface
  driveInterface.on('VolumeAdded', async (iface, changed, invalidated) => {
    const hora = new Date().toISOString();
    const deviceId = invalidated[4];
    const deviceName = invalidated[1];
    const deviceMountPoint = invalidated[10]['unix-device'];
    const logText = `${hora}: Se conecto el dispositivo de Id: ${deviceId} y nombre ${deviceName} al mountpoint ${deviceMountPoint}\n`
    await writeToLogfile(logText);
  });

  driveInterface.on('VolumeRemoved', async (iface, changed, invalidated) => {
    const hora = new Date().toISOString();
    const deviceId = invalidated[4];
    const deviceName = invalidated[1];
    const deviceMountPoint = invalidated[10]['unix-device'];
    const logText = `${hora}: Se desconecto el dispositivo de Id: ${deviceId} y nombre ${deviceName} del mountpoint ${deviceMountPoint}\n`
    await writeToLogfile(logText);
  });

  // escuchar la señal de kill de linux
  process.on('SIGTERM',async () =>{
    const hora = new Date().toISOString();
    await writeToLogfile(`${hora}: Logger de dispositivos USB finalizado por signal SIGTERM\n`);
    process.exit();
  })
};
