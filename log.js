const LOG = {
    level: {
        DEBUG: "DEBUG",
        WARNING: "WARNING",
        ERROR: "ERROR",
    },
};
class Log {
    constructor() {
        this.appName = '';
        this.isDebugMode = false;
        this.errorCallback = null;
    }
    setAppName(appName) {
        this.appName = appName;
    }
    setIsDebugMode(isDebugMode) {
        this.isDebugMode = isDebugMode;
    }
    setErrorCallback(errorCallback) {
        this.errorCallback = errorCallback;
    }
    write(level, message, debugArgs = {}) {
        if (LOG.level.DEBUG === level &&
            !this.isDebugMode) {
            return;
        }
        let nowDate = new Date();
        let nowStr = [nowDate.getHours(), nowDate.getMinutes()].join('.');
        console.log([this.appName, level, message, nowStr].join(' : '));
        Object.keys(debugArgs).length ?
            console.log(debugArgs) :
            '';
        (LOG.level.DEBUG !== level &&
            console.trace) ?
            console.trace() :
            '';
        console.log(' ');
        if ('function' === typeof this.errorCallback &&
            (LOG.level.ERROR === level || LOG.level.WARNING === level)) {
            this.errorCallback(level, message, debugArgs);
        }
    }
}
let log = new Log();
export default {
    level: LOG.level,
    setAppName(appName) {
        log.setAppName(appName);
    },
    setIsDebugMode(isDebugMode) {
        log.setIsDebugMode(isDebugMode);
    },
    setErrorCallback(errorCallback) {
        log.setErrorCallback(errorCallback);
    },
    write(level, message, debugArgs = {}) {
        log.write(level, message, debugArgs);
    },
};
