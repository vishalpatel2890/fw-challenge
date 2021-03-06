const fs = require('fs')
const path = require('path')

var fileCount = 0
var errors = 0

function fileCounter() {
  fileCount += 1
}

function fileException(err) {
  errors += 1
  console.log(err)
}

//function to move and append files
const moveFile = filename => {
  //run if files have .txt extension
  if (path.extname(filename) === '.txt') {
    //original file name
    const original = filename
    //orginal file path
    const originalpath = './files/original/' + original
    //pass original file name to renamefile module
    const newFile = require('./renamefile')(original)
    //new Path
    const newPath = './files/moved/' + newFile

    //data to append to files
    const data =
      'Original Filename: ' +
      original +
      '\n' +
      'Original FilePath: ' +
      originalpath +
      '\n' +
      'New File Name: ' +
      newFile +
      '\n' +
      'New FilePath: ' +
      newPath +
      '\n'
    //copy file to new folder
    fs.createReadStream(originalpath).pipe(
      fs.createWriteStream(
        newPath,
        {
          flags: 'a+'
        },
        { start: 0 }
      )
    ) //append new file with data
    fs.appendFile(newPath, data, err => {
      if (err) throw fileException(err)
      console.log('Saved Text!')
      fileCounter()
      console.log('renamed ' + fileCount + ' files, with ' + errors + ' errors')
    })

    //run if files have .json extension
  } else if (path.extname(filename) === '.json') {
    const original = filename
    const originalpath = './files/original/' + original
    const newFile = require('./renamefile')(original)
    const newPath = './files/moved/' + newFile

    fs.readFile(originalpath, (err, data) => {
      if (err) errors += 1
      var json = JSON.parse(data)
      json['original-filename'] = original
      json['original-filepath'] = originalpath
      json['new-filename'] = newFile
      json['new-filepath'] = newPath
      fs.writeFile(newPath, JSON.stringify(json), function(err) {
        if (err) throw fileException(err)
        console.log('Saved JSON!')
        fileCounter()
        console.log(
          'renamed ' + fileCount + ' files, with ' + errors + ' errors'
        )
      })
    })
    //return if file is neither .txt or .json
  } else {
    err = 'File is not a .txt or .json file'
    fileException(err)
  }
}

function move() {
  //make directory if it doesn't exist
  if (!fs.existsSync('./files/moved')) {
    fs.mkdirSync('./files/moved')
  }

  // read ./files/orginal directory
  fs.readdir('./files/original', (err, filenames) => {
    if (err) throw err

    //for each file pass through moveFile function
    filenames.forEach(filename => {
      moveFile(filename)
    })
  })
}

module.exports = move
