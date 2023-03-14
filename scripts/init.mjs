import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, "../configs");

const setSSHConfig = () => {
  // 0. 判断文件夹是否存在
  const folderIsExist = fs.existsSync(configPath);
  if (!folderIsExist) fs.mkdirSync(configPath);
  // 1. 判断文件是否存在
  const isExist = fs.existsSync(path.resolve(configPath, "ssh.yaml"));
  if (isExist) return;
  // // 2. 创建文件
  fs.writeFileSync(
    path.resolve(configPath, "ssh.yaml"),
    `SSH_CONNECT_CONFIG:
    host: ''
    username: ''
    password: ''
    port: 22
    path: ''`
  );
};
setSSHConfig();
