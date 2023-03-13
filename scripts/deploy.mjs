// 使用js
import { NodeSSH } from "node-ssh";
import readline from "readline";
import AdmZip from "adm-zip";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import childProcess from "child_process";
import { parse } from "yaml";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取package.json中的版本号
const getPackageVersion = () => {
  const packagePath = path.resolve(__dirname, "../package.json");
  const file = readFileSync(packagePath, "utf-8");
  const version = JSON.parse(file).version;
  return version;
};

// 获取ssh配置
const getSshConfig = () => {
  const sshConfigPath = path.resolve(__dirname, "../configs/ssh.yaml");
  const config = parse(readFileSync(sshConfigPath, "utf-8"));
  return config.SSH_CONNECT_CONFIG;
};
const sshConfig = getSshConfig();

// dist文件目录
const distPath = path.resolve(__dirname, "../.output");
// 打包压缩文件的方法
const setZip = (version) => {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip();
    zip.addLocalFolder(distPath);
    zip.writeZip(path.resolve(distPath, `./dist-${version}.zip`), () => {
      console.log("-----资源文件打包完成-----");
      resolve();
    });
  });
};
// 上传文件的方法
const setUpload = (ssh, version) => {
  // 本地压缩包路径
  const localPath = path.resolve(distPath, `./dist-${version}.zip`);
  // 远程服务器路径
  const remotePath = `${sshConfig.path}/dist-${version}.zip`;
  console.log("-----开始上传资源文件-----");
  return ssh
    .putFile(localPath, remotePath)
    .then(() => {
      console.log("-----资源文件上传完成-----");
    })
    .catch((err) => {
      console.log(err);
    });
};
// 更新服务器文件的方法
const setUpdate = (ssh, version) => {
  const cmd = `cd ${sshConfig.path} && rm -rf .output/* && unzip dist-${version}.zip -d ${sshConfig.path}/.output && pm2 restart blog-client`;
  console.log("-----开始更新服务器文件-----");
  return ssh.execCommand(cmd, { cwd: sshConfig.path }).then((result) => {
    if (!result.stderr) {
      console.log("-----服务器文件更新完成-----");
    } else {
      console.log(result.stderr);
    }
  });
};
// 打包上传更新
const setDeploy = async (version) => {
  const ssh = new NodeSSH();
  ssh
    .connect({
      host: sshConfig.host,
      username: sshConfig.username,
      password: sshConfig.password,
      port: sshConfig.port,
    })
    .then(async (ssh) => {
      console.log("-----连接服务器成功-----");
      // 压缩文件
      await setZip(version);
      await setUpload(ssh, version);
      await setUpdate(ssh, version);
      process.exit(0);
    });
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 1. 是否回滚版本
 */
const rollback = (rollbackVersion) => {
  console.log("-----开始回滚-----");
  const ssh = new NodeSSH();
  ssh
    .connect({
      host: sshConfig.host,
      username: sshConfig.username,
      password: sshConfig.password,
      port: sshConfig.port,
    })
    .then(async (ssh) => {
      const result = await ssh.execCommand(
        `ls ${sshConfig.path} | grep dist-${version}.zip`,
        { cwd: sshConfig.path }
      );
      if (result.stdout) {
        await setUpdate(ssh, version);
        console.log("-----回滚完成-----");
        process.exit(0);
        // 存在该文件
      } else {
        // 不存在该文件
        console.log("-----服务器不存在该文件-----");
        process.exit(0);
      }
    });
};
/**
 * 2. 是否重新打包
 */
const reBuild = () => {
  console.log("-----开始打包-----");
  return new Promise((resolve, reject) => {
    childProcess.exec("npm run build", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("-----打包完成-----");
        resolve();
      }
    });
  });
};

const callback = () => {
  rl.question("是否回滚版本？(y/N)", (answer) => {
    if (answer === "y" || answer === "Y") {
      const currentVersion = getPackageVersion();
      rl.question(
        `当前版本为：${currentVersion}，请输入需要回滚版本号：`,
        (version) => {
          rollback(version);
        }
      );
    } else {
      // 新版本
      // 是否重新打包
      rl.question("是否重新打包？(y/N)", (answer) => {
        if (answer === "y" || answer === "Y") {
          reBuild().then(() => {
            rl.question("是否上传服务器？(y/N)", (answer) => {
              if (answer === "y" || answer === "Y") {
                const version = getPackageVersion();
                setDeploy(version);
              } else {
                process.exit(0);
              }
            });
          });
        } else {
          // 不重新打包
          rl.question("是否上传服务器？(y/N)", (answer) => {
            if (answer === "y" || answer === "Y") {
              const version = getPackageVersion();
              setDeploy(version);
            } else {
              process.exit(0);
            }
          });
        }
      });
    }
  });
};

rl.question("是否上传package.json？(y|N)", async (answer) => {
  if (answer === "y" || answer === "Y") {
    console.log("-----开始上传package.json-----");
    const ssh = new NodeSSH();
    await ssh
      .connect({
        host: sshConfig.host,
        username: sshConfig.username,
        password: sshConfig.password,
        port: sshConfig.port,
      })
      .then(async (ssh) => {
        const packagePath = path.resolve(__dirname, "../package.json");
        const remotePath = `${sshConfig.path}/package.json`;
        await ssh.putFile(packagePath, remotePath);
        console.log("-----上传package.json完成-----");
      });
  }
  rl.question("是否重新npm install？(y|N)", async (answer) => {
    if (answer === "y" || answer === "Y") {
      console.log("-----开始重新npm install-----");
      const ssh = new NodeSSH();
      await ssh
        .connect({
          host: sshConfig.host,
          username: sshConfig.username,
          password: sshConfig.password,
          port: sshConfig.port,
        })
        .then(async (ssh) => {
          const cmd = `cd ${sshConfig.path} && npm install`;
          await ssh.execCommand(cmd, { cwd: sshConfig.path });
          console.log("-----重新npm install完成-----");
          callback();
        });
    } else {
      console.log("-----跳过重新npm install-----");
      callback();
    }
  });
});
