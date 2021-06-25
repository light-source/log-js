declare const _default: {
    level: {
        DEBUG: string;
        WARNING: string;
        ERROR: string;
    };
    setAppName(appName: string): void;
    setIsDebugMode(isDebugMode: boolean): void;
    setErrorCallback(errorCallback: any): void;
    write(level: string, message: string, debugArgs?: object): void;
};
export default _default;
