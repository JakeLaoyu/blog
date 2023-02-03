const execSync = require("child_process").execSync;
const dayjs = require('dayjs')

console.log('Start backup')

execSync("git add .")
execSync(`git commit -m '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`)
console.log('start push')
execSync("git push")

console.log("Backup completed")
