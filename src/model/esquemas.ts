import {Schema, model } from 'mongoose'



const alumnosSchema = new Schema({
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
},
{
  collection:'alumnos'
})

const competicionesSchema = new Schema({
  idComp: Number, 
  nomComp: String,
  nomAlum: String,
  modalidad: String,
  categoria: String,
  posicion: Number,
  ganador: String, 
  caballoGan: String, 
  premio: Number
},
{
  collection:'competiciones'
})

export const Alumnos = model('alumnos', alumnosSchema)
export const Competiciones = model('competiciones', competicionesSchema)