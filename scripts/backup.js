const execSync = require("child_process").execSync;
const dayjs = require('dayjs')

const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

execSync("git add .")
execSync(`git commit -m '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`)
execSync("git push")

console.log("Backup completed")
