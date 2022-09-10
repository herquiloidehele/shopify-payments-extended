/* eslint-disable no-console */
abstract class Logger {
  /**
   * 0 - No Logging
   * 1 - Only Warnings and Errors
   * 2 - Warnings, Errors and General Logs
   * 3 - Full Logs and Debug Info
   * 4 - Full Logs and Debug Info with extra trace logs
   */
  public static logLevel = 2;

  static log(from: string, message: string, data?: any) {
    if (Logger.logLevel >= 2) {
      const logString: string = Logger.logStringBuilder("LOG", from, message);
      if (data) {
        console.log(logString, data);
      } else {
        console.log(logString);
      }
    }
  }

  static trace(from: string, message: string, data?: any) {
    if (Logger.logLevel >= 4) {
      const logString: string = Logger.logStringBuilder("TRACE", from, message);
      if (data) {
        console.log(logString, data);
      } else {
        console.log(logString);
      }
    }
  }

  static debug(from: string, message: string, data?: any) {
    if (Logger.logLevel >= 3) {
      const logString: string = Logger.logStringBuilder("DEBUG", from, message);
      if (data) {
        console.log(logString, data);
      } else {
        console.log(logString);
      }
    }
  }

  static warn(from: string, message: string, data?: any) {
    if (Logger.logLevel >= 2) {
      const logString: string = Logger.logStringBuilder("WARN", from, message);
      if (data) {
        console.warn(logString, data);
      } else {
        console.warn(logString);
      }
    }
  }

  static error(from: string, message: string, data?: any) {
    if (Logger.logLevel >= 1) {
      const logString: string = Logger.logStringBuilder("ERROR", from, message);
      if (data) {
        console.error(logString, data);
      } else {
        console.error(logString);
      }
    }
  }

  private static logStringBuilder(severity: string, from: string, message: string) {
    const theTime = new Date();
    const dateString: string[] = [];
    const timeString: string[] = [];
    const fromString: string[] = [];
    const theArr: string[] = [];

    // Build Date
    dateString.push(`${theTime.getFullYear()}`);
    dateString.push(Logger.prettyPrintNumbers(theTime.getMonth() + 1, 2));
    dateString.push(Logger.prettyPrintNumbers(theTime.getDate(), 2));

    // Build Time
    timeString.push(Logger.prettyPrintNumbers(theTime.getHours(), 2));
    timeString.push(Logger.prettyPrintNumbers(theTime.getMinutes(), 2));
    timeString.push(Logger.prettyPrintNumbers(theTime.getSeconds(), 2));

    theArr.push(`${dateString.join("-")} ${timeString.join(":")},${Logger.prettyPrintNumbers(theTime.getMilliseconds(), 3)}`);

    theArr.push(Logger.prettyPrint(severity, 5));

    if (typeof message === "undefined" || message === null) {
      // from was not filled, so we are presenting the message and leaving the from in blank
      // eslint-disable-next-line no-param-reassign
      message = from;
      // eslint-disable-next-line no-param-reassign
      from = "";
    }

    fromString.push(Logger.prettyPrint(from, 20));

    theArr.push(fromString.join("").substr(0, 20));

    // Adding the Line to Log and Returning the Formatted String
    theArr.push(` ${message}`);
    return theArr.join("|");
  }

  private static prettyPrintNumbers(numberToPrint: number, minSize: number) {
    let i: number;
    let result = `${numberToPrint}`;
    const size: number = result ? minSize - result.length : minSize;

    for (i = 0; i < size; i += 1) {
      result = `0${result}`;
    }

    return result;
  }

  private static prettyPrint(text: string, minSize: number) {
    let i: number;
    let result: string = text || "";
    const size: number = text ? minSize - text.length : minSize;

    for (i = 0; i < size; i += 1) {
      result += " ";
    }

    return result;
  }
}

export default Logger;
