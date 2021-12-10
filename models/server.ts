import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/user'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection(){
        try {

            await db.authenticate();
            console.log("Database online");
            
            
        } catch (error: any) {
            throw new Error( error );
            
        }
    }

    middlewares(){
        //cors
        this.app.use( cors() );

        //Body parsing
        this.app.use( express.json() );


        //Public 
        this.app.use( express.static('public') );
    }


    routes(){


        this.app.use( this.apiPaths.usuarios, userRoutes )
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port );
            
        })
    }

}


export default Server;