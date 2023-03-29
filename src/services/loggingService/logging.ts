import { createLogger, Logger, format } from 'winston';
import winston from 'winston';

class LoggingService {
	private logger: Logger;
	constructor() {
	// Create Winston logger instance
		this.logger =createLogger({
			level: 'silly',
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
				new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
				new winston.transports.File({ filename: './logs/info.log',level:'info' }),
			],
		});

	}
	/**
	 * logger main function
	 * @param level  {String} the level of the log (error , info,..)
 	 * @param message {String} the message of the log 
	 * @param metadata {object} any additional metadata to the log 
	 */
	log(level: string, message: string,metadata:any) {
		this.logger.log(level, message,metadata);
	}
}

export default LoggingService;
