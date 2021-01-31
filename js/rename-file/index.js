function fixPayRollReceiptFileName(path) {
  let pathArray = path.split('\\')
  const periodo = pathArray[6]
  let fileName = pathArray[8]

  // console.log({ periodo, fileName })
  let fileNameArray = fileName.split('_')
  fileNameArray[0] = `${fileNameArray[0]}_${periodo}`

  pathArray[8] = fileNameArray.join('_')
  return pathArray.join('\\')
}


module.exports = { fixPayRollReceiptFileName }