const xmpp = require('node-xmpp-server');

const startServer = async function () {
    return await new Promise((resolve) => {
        // Sets up the server.
        let server = new xmpp.C2S.TCPServer({
            port: 5222,
            domain: 'talk.google.com',
        })

        // On connection event. When a client connects.
        server.on('connection', (client) => {
            // That's the way you add mods to a given server.

            // Allows the developer to register the jid against anything they want
            client.on('register', (opts, cb) => {
                console.log('REGISTER')
                cb(true) // eslint-disable-line
            })

            // Allows the developer to authenticate users against anything they want.
            client.on('authenticate', (opts, cb) => {
                console.log('server:', opts, 'AUTHENTICATING')
                if (opts.password === 'secret') {
                    console.log('server:', opts.username, 'AUTH OK')
                    cb(null, opts)
                } else {
                    console.log('server:', opts.username, 'AUTH FAIL')
                    cb(false) // eslint-disable-line
                }
            })

            client.on('online', () => {
                console.log('server:', client.jid.local, 'ONLINE')
            })

            // Stanza handling
            client.on('stanza', (stanza) => {
                console.log('server:', client.jid.local, 'stanza', stanza.toString())
                console.log(stanza);
                const from = stanza.attrs.from
                stanza.attrs.from = stanza.attrs.to
                stanza.attrs.to = from
                client.send(stanza)
            })

            // On Disconnect event. When a client disconnects
            client.on('disconnect', () => {
                console.log('server:', client.jid.local, 'DISCONNECT')
            })
        })

        server.on('listening', () => {resolve(server)})
    })
}

module.exports = {
    startServer
}