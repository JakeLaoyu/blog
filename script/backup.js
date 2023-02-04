const execSync = require("child_process").execSync;
const dayjs = require('dayjs')

console.log('Start backup')

try {
    execSync("git add .")
    execSync(`git commit -m '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`)
} catch (error) {

}
console.log('Start push')
execSync("git push")

console.log("Backup completed")
