import LoggingService from '../../../services/service-logging/logging';
import fs from 'fs';
const loggingService = new LoggingService();
describe('loggingService', () => {
	let errorLogFilePath: string;
	let infoLogFilePath: string;
	beforeAll(() => {
		// Initialize the logging service and get the file paths for the error and info logs
    
		errorLogFilePath = './logs/error.log';
		infoLogFilePath = './logs/info.log';
	});

	afterEach(() => {
		// Clear the log files after each test
		fs.writeFileSync(errorLogFilePath, '');
		fs.writeFileSync(infoLogFilePath, '');
	});

	it('should log an error message', () => {
		const errorMessage = 'This is an error message spsecial';
		loggingService.log('error', errorMessage, { errorCode: 123 });

		// Check that the error log file was created and contains the expected message
		const errorLogFileContent = fs.readFileSync(errorLogFilePath, 'utf8');

    
    
		expect(errorLogFileContent).toContain(errorMessage);
		expect(errorLogFileContent).toContain('"errorCode":123');
	});

	it('should log an info message', () => {
		const infoMessage = 'This is an info message';
		loggingService.log('info', infoMessage, { infoCode: 456 });

		// Check that the info log file was created and contains the expected message
		const infoLogFileContent = fs.readFileSync(infoLogFilePath, 'utf8');
		expect(infoLogFileContent).toContain(infoMessage);
		expect(infoLogFileContent).toContain('"infoCode":456');
	});
});