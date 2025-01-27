/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/MultiStats.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import { Stats, StatsCompilation } from "./stats";
export default class MultiStats {
    #private;
    stats: Stats[];
    constructor(stats: Stats[]);
    get hash(): string;
    hasErrors(): boolean;
    hasWarnings(): boolean;
    toJson(options?: any): StatsCompilation;
    toString(options: any): string;
}
export { MultiStats };
//# sourceMappingURL=multiStats.d.ts.map