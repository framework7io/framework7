/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    function() {
        "use strict";
        
        function BarcodeReader() {
            this._row = [];
            return this;
        }
        
        BarcodeReader.prototype._nextUnset = function(line, start) {
            var i;
            
            if (start === undefined) {
                start = 0;
            }
            for (i = start; i < line.length; i++) {
                if (!line[i]) {
                    return i;
                }
            }
            return line.length;
        };
        
        BarcodeReader.prototype._matchPattern = function(counter, code) {
            var i,
                error = 0;
                
            for (i = 0; i < counter.length; i++) {
                error += Math.abs(code[i] - counter[i]);
            }
            return error;
        };

        BarcodeReader.prototype._nextSet = function(line) {
            var i;
            
            for (i = 0; i < line.length; i++) {
                if (line[i]) {
                    return i;
                }
            }
            return line.length;
        };

        BarcodeReader.prototype._normalize = function(counter, modulo) {
            var i,
                self = this,
                sum = 0,
                ratio,
                numOnes = 0,
                normalized = [],
                norm = 0;
                
            if (!modulo) {
                modulo = self.MODULO;
            }
            for (i = 0; i < counter.length; i++) {
                if (counter[i] === 1) {
                    numOnes++;
                } else {
                    sum += counter[i];
                }
            }
            ratio = sum / (modulo - numOnes);
            if (ratio > 1.0) {
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] === 1 ? counter[i] : counter[i] / ratio;
                    normalized.push(norm);
                }
            } else {
                ratio = (sum + numOnes)/modulo;
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] / ratio;
                    normalized.push(norm);
                }
            }
            return normalized;
        };

        BarcodeReader.prototype._matchTrace = function(cmpCounter, epsilon) {
            var counter = [],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0
                },
                error;

            if (cmpCounter) {
                for ( i = 0; i < cmpCounter.length; i++) {
                    counter.push(0);
                }
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        if (counterPos === counter.length - 1) {
                            error = self._matchPattern(counter, cmpCounter);

                            if (error < epsilon) {
                                bestMatch.start = i - offset;
                                bestMatch.end = i;
                                bestMatch.counter = counter;
                                return bestMatch;
                            } else {
                                return null;
                            }
                        } else {
                            counterPos++;
                        }
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            } else {
                counter.push(0);
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        counterPos++;
                        counter.push(0);
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            }

            // if cmpCounter was not given
            bestMatch.start = offset;
            bestMatch.end = self._row.length - 1;
            bestMatch.counter = counter;
            return bestMatch;
        };
        
        BarcodeReader.prototype.decodePattern = function(pattern) {
            var self = this,
                result;
            
            self._row = pattern;
            result = self._decode();
            if (result === null) {
                self._row.reverse();
                result = self._decode();
                if (result) {
                    result.direction = BarcodeReader.DIRECTION.REVERSE;
                    result.start = self._row.length - result.start;
                    result.end = self._row.length - result.end;
                }
            } else {
                result.direction = BarcodeReader.DIRECTION.FORWARD;
            }
            return result;
        };
        
        BarcodeReader.DIRECTION = {
            FORWARD : 1,
            REVERSE : -1
        };
        
        BarcodeReader.Exception = {
            StartNotFoundException : "Start-Info was not found!",
            CodeNotFoundException : "Code could not be found!",
            PatternNotFoundException : "Pattern could not be found!"
        };
        
        return (BarcodeReader);
    }
);
