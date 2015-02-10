/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     [
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";
        
        function EANReader() {
            BarcodeReader.call(this);
        }
        
        var properties = {
            CODE_L_START : {value: 0},
            MODULO : {value: 7},
            CODE_G_START : {value: 10},
            START_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            STOP_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            MIDDLE_PATTERN : {value: [1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7]},
            CODE_PATTERN : {value: [
                [3, 2, 1, 1],
                [2, 2, 2, 1],
                [2, 1, 2, 2],
                [1, 4, 1, 1],
                [1, 1, 3, 2],
                [1, 2, 3, 1],
                [1, 1, 1, 4],
                [1, 3, 1, 2],
                [1, 2, 1, 3],
                [3, 1, 1, 2],
                [1, 1, 2, 3],
                [1, 2, 2, 2],
                [2, 2, 1, 2],
                [1, 1, 4, 1],
                [2, 3, 1, 1],
                [1, 3, 2, 1],
                [4, 1, 1, 1],
                [2, 1, 3, 1],
                [3, 1, 2, 1],
                [2, 1, 1, 3]
            ]},
            CODE_FREQUENCY : {value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26]}
        };
        
        EANReader.prototype = Object.create(BarcodeReader.prototype, properties);
        EANReader.prototype.constructor = EANReader;
        
        EANReader.prototype._decodeCode = function(start, coderange) {
            var counter = [0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            if (!coderange) {
                coderange = self.CODE_PATTERN.length;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        for ( code = 0; code < coderange; code++) {
                            error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                            if (error < bestMatch.error) {
                                bestMatch.code = code;
                                bestMatch.error = error;
                            }
                        }
                        bestMatch.end = i;
                        return bestMatch;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            throw BarcodeReader.CodeNotFoundException;
        };

        EANReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder, epsilon) {
            var counter = [],
                self = this,
                i,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized;

            if (!offset) {
                offset = self._nextSet(self._row);
            }

            if (isWhite === undefined) {
                isWhite = false;
            }

            if (tryHarder === undefined) {
                tryHarder = true;
            }

            if ( epsilon === undefined) {
                epsilon = 1.5;
            }

            for ( i = 0; i < pattern.length; i++) {
                counter[i] = 0;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        error = self._matchPattern(normalized, pattern);

                        if (error < epsilon) {
                            bestMatch.error = error;
                            bestMatch.start = i - sum;
                            bestMatch.end = i;
                            return bestMatch;
                        }
                        if (tryHarder) {
                            for ( j = 0; j < counter.length - 2; j++) {
                                counter[j] = counter[j + 2];
                            }
                            counter[counter.length - 2] = 0;
                            counter[counter.length - 1] = 0;
                            counterPos--;
                        } else {
                            throw BarcodeReader.PatternNotFoundException;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            throw BarcodeReader.PatternNotFoundException;
        };

        EANReader.prototype._decode = function() {
            var startInfo,
                self = this,
                code = null, 
                result = [],
                i,
                codeFrequency = 0x0,
                decodedCodes = [];

            try {
                startInfo = self._findPattern(self.START_PATTERN);
                code = {
                    code : startInfo.code,
                    start : startInfo.start,
                    end : startInfo.end
                };
                decodedCodes.push(code);
                for ( i = 0; i < 6; i++) {
                    code = self._decodeCode(code.end);
                    if (code.code >= self.CODE_G_START) {
                        code.code = code.code - self.CODE_G_START;
                        codeFrequency |= 1 << (5 - i);
                    } else {
                        codeFrequency |= 0 << (5 - i);
                    }
                    result.push(code.code);
                    decodedCodes.push(code);
                }

                for ( i = 0; i < self.CODE_FREQUENCY.length; i++) {
                    if (codeFrequency === self.CODE_FREQUENCY[i]) {
                        result.unshift(i);
                        break;
                    }
                }

                code = self._findPattern(self.MIDDLE_PATTERN, code.end, true);
                if (code === null) {
                    return null;
                }
                decodedCodes.push(code);

                for ( i = 0; i < 6; i++) {
                    code = self._decodeCode(code.end, self.CODE_G_START);
                    decodedCodes.push(code);
                    result.push(code.code);
                }

                code = self._findPattern(self.STOP_PATTERN, code.end);
                decodedCodes.push(code);

                // Checksum
                if (!self._checksum(result)) {
                    return null;
                }
            } catch (exc) {
                return null;
            }

            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : "",
                startInfo : startInfo,
                decodedCodes : decodedCodes
            };
        };

        EANReader.prototype._checksum = function(result) {
            var sum = 0, i;

            for ( i = result.length - 2; i >= 0; i -= 2) {
                sum += result[i];
            }
            sum *= 3;
            for ( i = result.length - 1; i >= 0; i -= 2) {
                sum += result[i];
            }
            return sum % 10 === 0;
        };
        
        return (EANReader);
    }
);