const sql = require('mssql')
const fetch = require('node-fetch')
const { sqlConfig } = require('../sql-config')


let pool = null 
let poolConnect = null
const init = async () => {
    pool = await sql.connect(sqlConfig)
    poolConnet = pool.connect();
}

const buscarNotificaciones = async function(){
  try {
    //   let pool = await sql.connect(sqlConfig)
      
      let result = await pool.request()
          .execute('[App].[spBuscarNotificacionesPendientes]')
      
          return Promise.resolve(result.recordset)
  } catch (err) {
      console.error({err})
      return Promise.reject(err)
  }
}

const updateAdjuntos = async function(IDEnviarNotificacionA, Adjuntos){
    try {
        console.log({ IDEnviarNotificacionA, Adjuntos })
        await poolConnect; // ensures that the pool has been created
        let result = await pool.request()
            .input('IDEnviarNotificacionA', IDEnviarNotificacionA)
            .input('Adjuntos', Adjuntos)
            .execute('BK.spUpdateAdjuntosEnviarNotificacionA')
        return Promise.resolve(result)
    } catch (err) {
        console.error({err})
        return Promise.reject(err)
    }
}

const buscarEmpleados = async function(){
    try {
        await poolConnect; // ensures that the pool has been created
        let result2 = await pool.request()
            .input('IDUsuario', 1)
            // .input('FechaIni','2019-11-07 00:00:00')
            // .input('FechaFin','2019-11-07 00:00:00')
            // .output('output_parameter', sql.VarChar(50))
            .execute('[RH].[spBuscarEmpleados]')
        // console.log(result2)
        let masc = result2.recordset.filter(e => e.Sexo == 'MASCULINO').map(ee => { return {IDEmpleado: ee.IDEmpleado, ClaveEmpleado : ee.ClaveEmpleado}}) 
        let fems = result2.recordset.filter(e => e.Sexo == 'FEMENINO').map(ee => { return {IDEmpleado: ee.IDEmpleado, ClaveEmpleado : ee.ClaveEmpleado}})
        return {
            masc
            ,fems 
        }
    } catch (err) {
        console.log({err})
    }
}

module.exports = {
    init,
    buscarNotificaciones,
    updateAdjuntos,
    buscarEmpleados
}