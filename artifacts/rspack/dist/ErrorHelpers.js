/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/ErrorHelpers.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
"use strict";
const loaderFlag = "LOADER_EXECUTION";
const webpackOptionsFlag = "WEBPACK_OPTIONS";
exports.cutOffByFlag = (stack, flag) => {
    stack = stack.split("\n");
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].includes(flag)) {
            stack.length = i;
        }
    }
    return stack.join("\n");
};
exports.cutOffLoaderExecution = stack => exports.cutOffByFlag(stack, loaderFlag);
exports.cutOffWebpackOptions = stack => exports.cutOffByFlag(stack, webpackOptionsFlag);
exports.cutOffMultilineMessage = (stack, message) => {
    stack = stack.split("\n");
    message = message.split("\n");
    const result = [];
    stack.forEach((line, idx) => {
        if (!line.includes(message[idx]))
            result.push(line);
    });
    return result.join("\n");
};
exports.cutOffMessage = (stack, message) => {
    const nextLine = stack.indexOf("\n");
    if (nextLine === -1) {
        return stack === message ? "" : stack;
    }
    else {
        const firstLine = stack.slice(0, nextLine);
        return firstLine === message ? stack.slice(nextLine + 1) : stack;
    }
};
exports.cleanUp = (stack, message) => {
    stack = exports.cutOffLoaderExecution(stack);
    stack = exports.cutOffMessage(stack, message);
    return stack;
};
exports.cleanUpWebpackOptions = (stack, message) => {
    stack = exports.cutOffWebpackOptions(stack);
    stack = exports.cutOffMultilineMessage(stack, message);
    return stack;
};
//# sourceMappingURL=ErrorHelpers.js.map