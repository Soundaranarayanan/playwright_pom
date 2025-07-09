import fs from 'fs';
import path from 'path';
import { format, transports } from 'winston';

export function options(scenarioName: string) {
    const logsDir = path.join('test-results', 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    return {
        transports: [
            new transports.File({
                filename: path.join(logsDir, `${scenarioName}.log`),
                level: 'info',
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.printf(info => `${info.level.toUpperCase()} ${info.timestamp}: ${info.message}`)
                )
            })
        ]
    };
}
