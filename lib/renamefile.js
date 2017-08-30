//export module
module.exports = original => {
  const fs = require('fs')
  const path = require('path')

  //create date stamp
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const sec = date.getSeconds()
  const fileDate = year + '-' + month + '-' + day + '-' + hour + '-' + sec

  //if .txt file rename with .txt extension
  if (path.extname(original) === '.txt') {
    //remove .txt extension
    const filetitle = original.replace('.txt', '')
    //rename file and add back on extension
    const newFile = filetitle + '_edited_' + fileDate + '.txt'

    return newFile
  } else if (path.extname(original) === '.json') {
    //if .json file rename with .json extension
    //remove .json extension
    const filetitle = original.replace('.json', '')
    //rename file and add back on extension
    const newFile = filetitle + '_edited_' + fileDate + '.json'
    return newFile
  }
}
