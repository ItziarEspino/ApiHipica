"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competiciones = exports.Alumnos = void 0;
const mongoose_1 = require("mongoose");
const alumnosSchema = new mongoose_1.Schema({
    idAl: Number,
    nombr: String,
    fechnac: Date,
    tipoclase: String,
    dias: Number,
    caballoProp: String,
    pupilaje: String,
    nomCaballo: String,
    razaCaballo: String,
    pelaje: String,
}, {
    collection: 'alumnos'
});
const competicionesSchema = new mongoose_1.Schema({
    idComp: Number,
    nomComp: String,
    nomAlum: String,
    modalidad: String,
    categoria: String,
    posicion: Number,
    ganador: String,
    caballoGan: String,
    premio: Number
}, {
    collection: 'competiciones'
});
exports.Alumnos = mongoose_1.model('alumnos', alumnosSchema);
exports.Competiciones = mongoose_1.model('competiciones', competicionesSchema);
