import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { promises as fsPromises, existsSync } from 'fs';
import * as path from 'path';

const PROD_MODE = 'production';
const DEV_MODE = 'development';

@Injectable()
export class LoggerService extends ConsoleLogger {
  mode = process.env.MODE;

  async logToFile(entry: any) {
    const level = entry.level;
    const date = entry.time.toISOString().split('T')[0];
    const dateString = date.split('-').reverse().join('_');
    try {
      if (!existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      if (!existsSync(path.join(__dirname, '..', '..', `logs/${dateString}`))) {
        await fsPromises.mkdir(
          path.join(__dirname, '..', '..', `logs/${dateString}`),
        );
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', `logs/${dateString}`, `${level}.log`),
        `${JSON.stringify(entry)}\n`,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  log(message: any, context?: string) {
    const entry = {
      level: 'info',
      time: new Date(),
      context,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.log(message, context);
    }
  }

  error(message: any, stackOrContext?: string) {
    const entry = {
      level: 'error',
      time: new Date(),
      context: stackOrContext,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.error(message, stackOrContext);
    }
  }

  warn(message: any, context?: string) {
    const entry = {
      level: 'warn',
      time: new Date(),
      context,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.warn(message, context);
    }
  }

  debug(message: any, context?: string) {
    const entry = {
      level: 'debug',
      time: new Date(),
      context,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    const entry = {
      level: 'verbose',
      time: new Date(),
      context,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.verbose(message, context);
    }
  }

  fatal(message: any, context?: string) {
    const entry = {
      level: 'fatal',
      time: new Date(),
      context,
      msg: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.fatal(message, context);
    }
  }

  req(message: any, context?: string) {
    const entry = {
      level: 'info',
      time: new Date(),
      context,
      req: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.log(message, context);
    }
  }

  res(message: any, context?: string) {
    const entry = {
      level: 'info',
      time: new Date(),
      context,
      res: message,
    };
    if (this.mode === PROD_MODE) {
      this.logToFile(entry);
    }
    if (this.mode === DEV_MODE) {
      super.log(message, context);
    }
  }

  async cleanOldLogs(daysToKeep: number = 14) {
    try {
      const logsDir = path.join(__dirname, '..', '..', 'logs');
      if (!existsSync(logsDir)) return;

      const logFolders = await fsPromises.readdir(logsDir);
      const now = Date.now();

      for (const folder of logFolders) {
        const folderPath = path.join(logsDir, folder);
        const stats = await fsPromises.stat(folderPath);

        if (stats.isDirectory()) {
          const folderDate = folder.split('_').reverse().join('-');
          const folderTimestamp = new Date(folderDate).getTime();

          if (now - folderTimestamp > daysToKeep * 24 * 60 * 60 * 1000) {
            await fsPromises.rm(folderPath, { recursive: true, force: true });
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        this.error('hello error', ConsoleLogger.name);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleLogRotation() {
    this.cleanOldLogs(14);
  }
}
