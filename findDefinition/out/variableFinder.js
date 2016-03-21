'use strict';
var fs = require('fs');
var VariableFindResult = (function () {
    function VariableFindResult() {
    }
    return VariableFindResult;
})();
exports.VariableFindResult = VariableFindResult;
var VariableFinder = (function () {
    function VariableFinder() {
    }
    VariableFinder.prototype.findDefinitionInFile = function (file, variable) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(file, "utf-8", function (err, data) {
                var matches = _this.findDefinitionInText(data, variable);
                return resolve(matches);
            });
        });
    };
    VariableFinder.prototype.findDefinitionInText = function (content, variable) {
        var pattern = "(\\w+)\\s+(\\w+\\s*,\\s*)?" + variable + "\\s*(,|;|=|\\(\\))";
        // var pattern = `^\\s*?(\\w+)\\s+${variable}\\s*?(;|=|\\(\\))`;
        //var pattern = `^\\s*?(\\w+)\\s+(\\w+\\s*,\\s*)?${variable}\\s*(,|;|=|\\(\\))`;
        var regex = new RegExp(pattern, "gmi");
        var match, matches = [];
        while ((match = regex.exec(content)) != null) {
            matches.push({ line: match.index, type: match[1] });
        }
        matches.forEach(function (item) {
            var split = content.substr(0, item.line).split(/\r\n|\r|\n/, -1);
            item.line = split.length;
        });
        return matches;
    };
    return VariableFinder;
})();
exports.VariableFinder = VariableFinder;
//# sourceMappingURL=variableFinder.js.map