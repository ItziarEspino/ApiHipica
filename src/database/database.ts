
import mongoose from 'mongoose';

class DataBase {

private _cadenaConexion: string = `mongodb+srv://user:usuario@cluster0.2jene.mongodb.net/hipica?retryWrites=true&w=majority`
    constructor(){

    }
    set cadenaConexion(_cadenaConexion: string){
        this._cadenaConexion = _cadenaConexion
    }

    conectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true,   
                useFindAndModify: false  
            })
            .then( () => resolve(`Conectado a ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error conectando a ${this._cadenaConexion}: ${error}`) )     
        })
        return promise

    }

    desconectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.disconnect() 
            .then( () => resolve(`Desconectado de ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error desconectando de ${this._cadenaConexion}: ${error}`) )     
        })
        return promise
    }
}

export const db = new DataBase()