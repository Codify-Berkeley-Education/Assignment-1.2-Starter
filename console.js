const { exec, spawn, execSync } = require("child_process");

let val = execSync("touch file2.txt").toString();

console.log(val);
