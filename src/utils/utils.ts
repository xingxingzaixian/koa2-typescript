import fs from 'fs';
import path from 'path';

/**
 * @description 遍历目录
 * @param dir
 * @param callback
 */
export const walkDir = (dir: string, callback: (file: string) => void) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  });
};
