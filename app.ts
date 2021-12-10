import dotenv from 'dotenv';
//env config
dotenv.config();
//Server
import Server from './models/server';

const server = new Server();



server.listen();