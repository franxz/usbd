var child_process = require('child_process')
     
function child(exe, args, env) {
    // para crear el daemon ejecuto el mismo programa otra vez (como subproceso), pero con 'detached: true' y unref()
    var child = child_process.spawn(exe, args, { 
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            env: env
    })
    child.unref()
    return child
}
 
module.exports = function(nodeBin) {
    console.log('Daemonize process')
 
    // esta instancia es el daemon?
    if (process.env.__daemon) {
        // SI: entonces sigo ejecutando
        return process.pid
    }
    
    // NO: entonces creo el daemon y ...
    process.env.__daemon = true
 
    var args = [].concat(process.argv)
    var node = args.shift()
    var env = process.env
    child(node, args, env)
    return process.exit() // ... me muero
}

