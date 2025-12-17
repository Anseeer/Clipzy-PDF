import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${level} ${timestamp}: ${message}\n${stack}`
    : `${level} ${timestamp}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Error logs
    new transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    // All logs
    new transports.File({
      filename: "logs/combined.log"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      )
    })
  );
}

export default logger;
