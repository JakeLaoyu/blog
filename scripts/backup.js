const exec = require("child_process").exec;
const dayjs = require("dayjs");

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

execPromise("git add .")
    .then(() => execPromise(`git commit -m '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`))
    .then(() => execPromise("git push"))
    .then(() => console.log("Backup completed"))
