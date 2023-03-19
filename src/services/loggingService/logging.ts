import { createLogger, Logger, format } from 'winston';
import winston from 'winston'

class LoggingService {
	private logger: Logger;
	constructor() {
	  // Create Winston logger instance
	  this.logger =createLogger({
				level: 'info',
				format: format.combine(
					format.timestamp(),
					format.metadata(),
					format.json(),

				),
				defaultMeta: {},
				
				transports: [
					//
					// - Write all logs with importance level of `error` or less to `error.log`
					// - Write all logs with importance level of `info` or less to `combined.log`
					//
					new winston.transports.File({ filename: './logs/error2.log', level: 'error' }),
					new winston.transports.File({ filename: './logs/info2.log',level:'info' }),
				],
				});
	}
	log(level: string, message: string,metadata:any) {
		this.logger.log(level, message,metadata);
	  }
}

export default LoggingService;
