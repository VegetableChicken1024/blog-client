// 获取package.json中的版本号
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, "../package.json");
const file = readFileSync(packagePath, "utf-8");
const version = JSON.parse(file).version;
// 当前时间戳
const timestamp = dayjs().format("YYYYMMDD");
// 20230313_1.0.0
// 最后一位版本号加1
let newVersion = version.replace(/(\d+)$/, (match, p1) => {
  return Number(p1) + 1;
});
newVersion = `${timestamp}_${newVersion.split("_")[1]}`;
// 写入新的版本号
const newFile = file.replace(version, newVersion);
// 写入文件
writeFileSync(packagePath, newFile, "utf-8");
