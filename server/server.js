// server.js simply starts the app.js file and listens on a port (5000)
const app = require('./app');
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
