require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;

(async () => {
    try {
        await mongoose.connect('mongodb+srv://CSE:3LpBfqLOrk2TyEit@cse.zsfzj.mongodb.net/CSE?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        require('./scripts/updateEvents').start();
        require('./scripts/getDailyData').start();
        require('./scripts/getDataPoints').start();
        const server = require('http').createServer(app);
        const io = require('socket.io')(server);
        io.on('connection', (socket) => {
            console.log('new socket connection==>>');
            global.socket = socket;
        });
        app.use(express.json());


        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(__dirname + '/../dist'));
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
            });
        }

        server.listen(PORT, () => console.log(`Server started at ${PORT}`));
    } catch (err) {
        console.log('err connecting to db', err);
    }
})();
