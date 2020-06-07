# Log

## What is it
Class for logging with multiple levels

## Installation
```
yarn add @lightsource/log
```
OR
```
npm install @lightsource/log
```

## Example of usage

```
import Log from '@lightsource/log';

Log.setAppName('Rabbit');
Log.setIsDebugMode(true);
Log.setErrorCallback((level, message, debugArgs) => {
    // TODO
});

Log.write(Log.level.DEBUG, 'My color is a', {name: 'white'});
```
## Example of output
```
Rabbit : DEBUG : My color is a : 17.3
Object { name: "white" }
```