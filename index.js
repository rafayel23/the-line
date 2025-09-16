const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const socketIO = require('socket.io');
const { io } = require("socket.io-client");

const app = express();
const server = http.createServer(app);
const socket = socketIO(server);

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')));

const streams = {};

socket.on('connection', (stream) => {
  streams[stream.id] = {server: stream};
  console.log('user connected - id:' + stream.id);

  stream.on('disconnect', () => {
    streams[stream.id].vendor?.disconnect();
    delete streams[stream.id];
    console.log('user disconnected - id:' + socket.id);
  })
})

app.get('/create-stream', (req, res) => {
  const {lat, lon, id} = req.query;
  sql.query(`SELECT * FROM vendors WHERE lat BETWEEN ${+lat - 0.001} AND ${+lat + 0.001} AND lon BETWEEN ${+lon - 0.001} AND ${+lon + 0.001}`, (error, response) => {
    if (error) {
      console.log('SQL error');
      res.status(500).end();
    } else if (response.length) {
      const [record] = response;
      const stream = streams[id];
      stream.vendor = io(record.connectionURL);
      stream.vendor.on('vendor-message', (msg) => {
        stream.server.emit('server-message', msg)
      })

      console.log('stream established for user:' + id);
      res.status(201).end();
    } else {
      console.log('no vendor found nearby');
      res.status(404).end();
    }
  })
})

const sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '803080',
  port: 3306,
  database: 'vendors-db',
});

sql.connect();
server.listen(4200);
