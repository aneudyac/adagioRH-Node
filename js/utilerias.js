async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      try {
        await callback(array[index], index, array)
      } catch (error) {
        console.error({ error })
      }
    }
  }

  module.exports = { asyncForEach }