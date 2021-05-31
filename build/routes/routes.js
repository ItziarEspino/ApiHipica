"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const esquemas_1 = require("../model/esquemas");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        this.getHipica = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Alumnos.aggregate([
                    {
                        $lookup: {
                            from: 'competiciones',
                            localField: 'nombr',
                            foreignField: 'nomAlum',
                            as: "competiciones"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getAlumno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAl } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Alumnos.aggregate([
                    {
                        $lookup: {
                            from: 'competiciones',
                            localField: 'nombr',
                            foreignField: 'nomAlum',
                            as: "competiciones"
                        }
                    }, {
                        $match: {
                            idAl: idAl
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postAlumno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombr, fechnac, tipoclase, dias, caballoProp, pupilaje, nomCaballo, razaCaballo, pelaje } = req.body;
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
            };
            const nSchema = new esquemas_1.Alumnos(schema);
            yield database_1.db.conectarBD();
            yield nSchema.save()
                .then((doc) => {
                res.json(doc);
            })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.postCompeticion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idComp, nomComp, nomAlum, modalidad, categoria, posicion, ganador, caballoGan, premio } = req.body;
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
            };
            const nSchema = new esquemas_1.Competiciones(schema);
            yield database_1.db.conectarBD();
            yield nSchema.save()
                .then((doc) => {
                res.json(doc);
            })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.getCompeticion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idComp, nomComp } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield esquemas_1.Competiciones.findOne({ idCompeticion: idComp, nombre: nomComp });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.updateAlumno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAl, nombr } = req.params;
            const { fechnac, tipoclase, dias, caballoProp, pupilaje, nomCaballo, razaCaballo, pelaje } = req.body;
            yield database_1.db.conectarBD();
            yield esquemas_1.Alumnos.findOneAndUpdate({ idAl: idAl, nombr: nombr }, {
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
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => { })
                .catch((err) => {
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.updateCompeticion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idComp, nomComp } = req.params;
            const { nomAlum, modalidad, categoria, posicion, ganador, caballoGan, premio } = req.body;
            yield database_1.db.conectarBD();
            yield esquemas_1.Competiciones.findOneAndUpdate({
                idComp: idComp,
                nomComp: nomComp
            }, {
                idComp: idComp,
                nomComp: nomComp,
                nomAlum: nomAlum,
                modalidad: modalidad,
                categoria: categoria,
                posicion: posicion,
                ganador: ganador,
                caballoGan: caballoGan,
                premio: premio
            }, {
                new: true,
                runValidators: true
            })
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteAlumno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAl, nombr } = req.params;
            yield database_1.db.conectarBD();
            yield esquemas_1.Alumnos.findOneAndDelete({ idAl: idAl, nombr: nombr });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/hipica', this.getHipica),
            this._router.get('/alumno/:idAl', this.getAlumno),
            this._router.post('/alumno', this.postAlumno),
            this._router.post('/competicion', this.postCompeticion),
            this._router.get('/alumno/:idAl&:nombr', this.getCompeticion),
            this._router.post('/alumno/:idAl&:nombr', this.updateAlumno),
            this._router.post('/competicion/:idComp&:nomComp', this.updateCompeticion),
            this._router.get('/borrarAlumno/:idAl&:nombr', this.deleteAlumno);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
