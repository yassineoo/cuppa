import LoggingService from '../../../services/loggingService/logging';
import fs from 'fs';
let loggingService: LoggingService;
loggingService = new LoggingService();

describe('LoggingService', () => {
  let errorLogFilePath: string;
  let infoLogFilePath: string;
  beforeAll(() => {
    // Initialize the logging service and get the file paths for the error and info logs
    
    errorLogFilePath = './logs/error2.log';
    infoLogFilePath = './logs/info2.log';
  });

  afterEach(() => {
    // Clear the log files after each test
    fs.writeFileSync(errorLogFilePath, '');
    fs.writeFileSync(infoLogFilePath, '');
  });

  it('should log an error message', () => {
    const errorMessage = 'This is an error message';
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