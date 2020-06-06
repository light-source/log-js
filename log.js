const LOG = {
    level: {
        DEBUG: "DEBUG",
        WARNING: "WARNING",
        ERROR: "ERROR",
    },
};

let _instance = null;

class Log {


    //////// constructor


    constructor() {

        this._appName = '';
        this._isDebugMode = false;
        this._errorCallback = null;

    }

    static Instance() {

        if (null === _instance) {
            _instance = new Log();
        }

        return _instance;
    }


    //////// setters


    setAppName(appName) {
        this._appName = appName;
    }

    setIsDebugMode(isDebugMode) {
        this._isDebugMode = isDebugMode;
    }

    setErrorCallback(errorCallback) {
        this._errorCallback = errorCallback;
    }


    //////// methods


    write(level, message, debugArgs = {}) {

        if (LOG.level.DEBUG === level &&
            !this._isDebugMode) {
            return;
        }

        let nowDate = new Date();
        let nowStr = [nowDate.getHours(), nowDate.getMinutes()].join('.');

        console.log([this._appName, level, message, nowStr].join(' : '));

        Object.keys(debugArgs).length ?
            console.log(debugArgs) :
            '';

        (LOG.level.DEBUG !== level &&
            console.trace) ?
            console.trace() :
            '';

        console.log(' ');

        if ('function' === typeof this._errorCallback &&
            (LOG.level.ERROR === level || LOG.level.WARNING === level)) {
            this._errorCallback(level, message, debugArgs);
        }

    }

}

export default {
    level: LOG.level,
    Instance: Log.Instance(),
};
