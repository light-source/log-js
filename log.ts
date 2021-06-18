const LOG = {
    level: {
        DEBUG: "DEBUG",
        WARNING: "WARNING",
        ERROR: "ERROR",
    },
};

class Log {
    private appName: string;
    private isDebugMode: boolean;
    private errorCallback: any;

    constructor() {

        this.appName = '';
        this.isDebugMode = false;
        this.errorCallback = null;

    }

    public setAppName(appName: string): void {
        this.appName = appName;
    }

    public setIsDebugMode(isDebugMode: boolean): void {
        this.isDebugMode = isDebugMode;
    }

    public setErrorCallback(errorCallback: any): void {
        this.errorCallback = errorCallback;
    }

    public write(level: string, message: string, debugArgs: object = {}): void {
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
    setAppName(appName: string): void {
        log.setAppName(appName);
    },
    setIsDebugMode(isDebugMode: boolean): void {
        log.setIsDebugMode(isDebugMode);
    },
    setErrorCallback(errorCallback: any): void {
        log.setErrorCallback(errorCallback);
    },
    write(level: string, message: string, debugArgs: object = {}): void {
        log.write(level, message, debugArgs);
    },
};
