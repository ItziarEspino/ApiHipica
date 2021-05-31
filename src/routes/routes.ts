import {Request, Response, Router } from 'express'
import {Alumnos, Competiciones } from '../model/esquemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getHipica = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Alumnos.aggregate([
                {
                    $lookup: {
                        from: 'competiciones',
                        localField: 'nombr',
                        foreignField: 'nomAlum',
                        as: "competiciones"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getAlumno = async (req:Request, res: Response) => {
        const { idAl } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Alumnos.aggregate([
                {
                    $lookup: {
                        from: 'competiciones',
                        localField: 'nombr',
                        foreignField: 'nomAlum',
                        as: "competiciones"
                    }
                },{
                    $match: {
                        idAl:idAl
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postAlumno = async (req: Request, res: Response) => {
        const { 
            nombr, 
            fechnac, 
            tipoclase, 
            dias, 
            caballoProp, 
            pupilaje,
            nomCaballo,
            razaCaballo,
            pelaje
        } = req.body
        const schema = {
            nombr: nombr,
            fechnac: fechnac,
            tipoclase: tipoclase,
            dias: dias,
            caballoProp: caballoProp,
            pupilaje: pupilaje,
            nomCaballo: nomCaballo,
            razaCaballo: razaCaballo,
            pelaje: pelaje
        }
        const nSchema = new Alumnos(schema)
        await db.conectarBD()
        await nSchema.save()
        .then((doc) => {
            res.json(doc)
        })
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }
    
    private postCompeticion = async (req: Request, res: Response) => {
        const {
            idComp, 
            nomComp, 
            nomAlum,
            modalidad, 
            categoria, 
            posicion, 
            ganador, 
            caballoGan, 
            premio
        } = req.body
        const schema = {
            idComp: idComp,
            nomComp: nomComp,
            nomAlum: nomAlum,
            modalidad: modalidad,
            categoria: categoria,
            posicion: posicion,
            ganador: ganador,
            caballoGan: caballoGan,
            premio: premio
        }
        const nSchema = new Competiciones(schema)
        await db.conectarBD()
        await nSchema.save()
        .then((doc) => {
            res.json(doc)
        })
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }

    private getCompeticion = async (req:Request, res: Response) => {
        const { idComp, nomComp } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Competiciones.findOne(
                {idCompeticion:idComp, nombre:nomComp}
            )  
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private updateAlumno = async (req: Request, res: Response) => {
        const {idAl, nombr} = req.params
        const {fechnac, tipoclase, dias, caballoProp, pupilaje, nomCaballo, razaCaballo, pelaje} = req.body
        await db.conectarBD()
        await Alumnos.findOneAndUpdate (
            {idAl:idAl, nombr:nombr},
            {
            idAl: idAl,
            nombr: nombr,
            fechnac: fechnac,
            tipoclase: tipoclase,
            dias: dias,
            caballoProp: caballoProp,
            pupilaje: pupilaje,
            nomCaballo: nomCaballo,
            razaCaballo: razaCaballo,
            pelaje: pelaje
        },
        {
            new: true,
            runValidators: true 
        })
        .then( (docu: any) => {}
        )
        .catch((err: any) => {
            res.json(err)
        })    
        await db.desconectarBD()
    }

    private updateCompeticion = async (req: Request, res: Response) => {
        const {idComp, nomComp} =req.params
        const { nomAlum, modalidad, categoria, posicion, ganador, caballoGan, premio} = req.body
        await db.conectarBD()
        await Competiciones.findOneAndUpdate({
            idComp: idComp,
            nomComp: nomComp
        },{
            idComp: idComp,
            nomComp: nomComp,
            nomAlum: nomAlum,
            modalidad: modalidad,
            categoria: categoria,
            posicion: posicion,
            ganador: ganador,
            caballoGan: caballoGan,
            premio: premio
        },{
            new:true,
            runValidators:true
        }
        )
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }


    private deleteAlumno = async (req: Request, res: Response) => {
        const { idAl, nombr } = req.params
        await db.conectarBD()
        await Alumnos.findOneAndDelete(
            {idAl:idAl, nombr:nombr},
            )
        await db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/hipica', this.getHipica),
        this._router.get('/alumno/:idAl', this.getAlumno),
        this._router.post('/alumno', this.postAlumno),
        this._router.post('/competicion', this.postCompeticion),
        this._router.get('/alumno/:idAl&:nombr', this.getCompeticion),
        this._router.post('/alumno/:idAl&:nombr', this.updateAlumno),
        this._router.post('/competicion/:idComp&:nomComp', this.updateCompeticion),
        this._router.get('/borrarAlumno/:idAl&:nombr', this.deleteAlumno)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
