import { readFileSync } from 'fs';
import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';
import { Logger } from '../common/logger/logger.type.js';
import { ConsoleLog } from '../loggers/loggers.console.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  private logger: Logger;

  constructor() {
    this.logger = new ConsoleLog();
  }

  private readVersion(): string {
    const contentPageJSON = readFileSync('../package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    this.logger.info(`Текущая версия утилиты — ${chalk.bgCyan(version)}`);
  }
}
