#!/usr/bin/env node
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'

const { lstat } = fs.promises
const targetFolder = process.argv[2] || process.cwd()

fs.readdir(targetFolder, async (err, files) => {          
  if (err) throw new Error(err)
  
  const statsPromises = files.map(file => lstat(path.join(targetFolder, file)))  // lstat looks in the current directory !!!  
  const allStats = await Promise.all(statsPromises)
  allStats.forEach((stat, index) => {
    if (stat.isFile()) {
      console.log(files[index])
    } else {
      console.log(chalk.bold.cyan(files[index]))
    }
  })
})