import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  unlink,
  unlinkSync,
} from 'fs';
import { join, relative } from 'path';

@Injectable()
export class BackupService {
  private rootPath: string;
  private backupPath: string;
  private databasePath: string;

  constructor() {
    this.rootPath = process.cwd();
    this.backupPath = join(this.rootPath, 'backup_backup');
    this.databasePath = join(this.rootPath, 'database', 'database.sqlite');
    this.ensureBackupDir();
    new CronJob('0 1 0 * * *', this.cleanup).start();
    new CronJob('0 */20 * * * *', this.routine).start();
  }

  ensureBackupDir() {
    if (!existsSync(this.backupPath)) mkdirSync(this.backupPath);
  }

  routine = () => {
    if (existsSync(this.databasePath))
      copyFileSync(
        this.databasePath,
        join(this.backupPath, new Date().toLocaleString('de-DE') + '.db'),
      );
  };

  cleanup = () => {
    const allFiles = readdirSync(this.backupPath).filter(
      (file) =>
        !file.startsWith(new Date().toLocaleDateString('de-DE')) &&
        file.split(',').length === 2,
    );
    const fileMoves = allFiles
      .sort((a, b) => b.localeCompare(a))
      .map((file) => ({ from: file, to: file.split(',')[0] + '.db' }))
      .filter(
        (file, index, array) =>
          array.findIndex((f) => f.to === file.to) === index,
      );
    fileMoves.forEach(({ from, to }) =>
      copyFileSync(join(this.backupPath, from), join(this.backupPath, to)),
    );
    allFiles.forEach((file) => unlinkSync(join(this.backupPath, file)));
  };
}
