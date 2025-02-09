const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const connections = new Map();

server.on('connection', (ws) => {
    const connectionId = Date.now();
    connections.set(connectionId, ws);

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`Received from ${connectionId}:`, data);
    });

    ws.on('close', () => {
        connections.delete(connectionId);
    });
});

function broadcastCommand(command) {
    connections.forEach((connection) => {
        connection.send(JSON.stringify(command));
    });
}
