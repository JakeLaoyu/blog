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

console.log(process.cwd())

execSync("git add .", { encoding: 'utf8' })
execSync(`git commit -m '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`, { encoding: 'utf8' })
execSync("git push", { encoding: 'utf8' })

console.log("Backup completed")
