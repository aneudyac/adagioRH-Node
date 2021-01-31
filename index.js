const fs = require('fs')
const api = require('./js/api')
const utilerias = require('./js/utilerias')
const colors = require('colors');
const { fixPayRollReceiptFileName } = require('./js/rename-file')

const init = async () => {
  try {
    await api.init()
    const notificaciones = await api.buscarNotificaciones()
    // console.log({ notificaciones })  
    await utilerias.asyncForEach(notificaciones, async (notificacion) => {
      let needUpdate = false
      const archivos = notificacion.Adjuntos.split('|')
      // console.log({ archivos })
      await utilerias.asyncForEach(archivos, async (path, idx) => {
        const exists = await fs.existsSync(path)
        // console.log({ path, exists })
        if (!exists) {
          const newPath = fixPayRollReceiptFileName(path)
          const existsNewPath = await fs.existsSync(newPath)
          // console.log({ newPath, existsNewPath })
          if (existsNewPath) {
            archivos[idx] = newPath
            if (!needUpdate) needUpdate = true
            // console.log({ archivos })
            console.log('Existe la nueva ruta'.green)
          } else {
            console.log('No existe ninguna de las rutas'.red)
          }
          // console.log({ path, newPath })
        } else {
          console.log('Existe la primera ruta'.yellow)
        }
      })
      if (needUpdate) {
        needUpdate = false
        const response = await api.updateAdjuntos(notificacion.IDEnviarNotificacionA, archivos.join('|'))
        console.log('Adjunto modificado correctamente'.blue)
      }
      // console.log(archivos)
    });
  } catch (error) {
    console.error({ error })
  }
}

init()
// // C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\PDF\CBS1310252C8_SUR0101_SOLORIO ABUNDIS DAVID .PDF|C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\XML\CBS1310252C8_SUR0101_SOLORIO ABUNDIS DAVID .XML
// // C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\PDF\CBS1310252C8_SUR0153_ROMERO SALGADO RICARDO .PDF|C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\XML\CBS1310252C8_SUR0153_ROMERO SALGADO RICARDO .XML
// // C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\PDF\CBS1310252C8_SUR0163_MENDOZA SANDOVAL GERARDO .PDF|C:\inetpub\wwwroot\adagioRHThangos\RecibosNomina\26\001_26_202101\XML\CBS1310252C8_SUR0163_MENDOZA SANDOVAL GERARDO .XML

// console.log(fixFileName('C:\\inetpub\\wwwroot\\adagioRHThangos\\RecibosNomina\\26\\001_26_202101\\PDF\\CBS1310252C8_SUR0101_SOLORIO ABUNDIS DAVID .PDF'))
// console.log(fixFileName('C:\\inetpub\\wwwroot\\adagioRHThangos\\RecibosNomina\\26\\001_26_202101\\XML\\CBS1310252C8_SUR0101_SOLORIO ABUNDIS DAVID .XML'))