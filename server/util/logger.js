const { transports, createLogger, format } = require('winston');
const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

module.exports = createLogger({
    level: process.env.LOG_LEVEL,
    format: format.combine(
        format.timestamp(),
        myFormat
        // format.json(),
        // format.splat(),
        // format.simple()
    ),
    transports: [
        new transports.Console()
    ]
});
