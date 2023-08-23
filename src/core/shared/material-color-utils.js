/* eslint-disable */
function signum(num) {
  return num < 0 ? -1 : 0 === num ? 0 : 1;
}

function lerp(start, stop, amount) {
  return (1 - amount) * start + amount * stop;
}

function clampInt(min, max, input) {
  return input < min ? min : input > max ? max : input;
}

function clampDouble(min, max, input) {
  return input < min ? min : input > max ? max : input;
}

function sanitizeDegreesDouble(degrees) {
  return (degrees %= 360) < 0 && (degrees += 360), degrees;
}

function rotationDirection(from, to) {
  return sanitizeDegreesDouble(to - from) <= 180 ? 1 : -1;
}

function differenceDegrees(a, b) {
  return 180 - Math.abs(Math.abs(a - b) - 180);
}

function matrixMultiply(row, matrix) {
  return [ row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2], row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2], row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2] ];
}

const SRGB_TO_XYZ = [ [ .41233895, .35762064, .18051042 ], [ .2126, .7152, .0722 ], [ .01932141, .11916382, .95034478 ] ], XYZ_TO_SRGB = [ [ 3.2413774792388685, -1.5376652402851851, -.49885366846268053 ], [ -.9691452513005321, 1.8758853451067872, .04156585616912061 ], [ .05562093689691305, -.20395524564742123, 1.0571799111220335 ] ], WHITE_POINT_D65 = [ 95.047, 100, 108.883 ];

function argbFromRgb(red, green, blue) {
  return (255 << 24 | (255 & red) << 16 | (255 & green) << 8 | 255 & blue) >>> 0;
}

function argbFromLinrgb(linrgb) {
  return argbFromRgb(delinearized(linrgb[0]), delinearized(linrgb[1]), delinearized(linrgb[2]));
}

function redFromArgb(argb) {
  return argb >> 16 & 255;
}

function greenFromArgb(argb) {
  return argb >> 8 & 255;
}

function blueFromArgb(argb) {
  return 255 & argb;
}

function argbFromXyz(x, y, z) {
  const matrix = XYZ_TO_SRGB, linearR = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z, linearG = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z, linearB = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z;
  return argbFromRgb(delinearized(linearR), delinearized(linearG), delinearized(linearB));
}

function xyzFromArgb(argb) {
  return matrixMultiply([ linearized(redFromArgb(argb)), linearized(greenFromArgb(argb)), linearized(blueFromArgb(argb)) ], SRGB_TO_XYZ);
}

function argbFromLstar(lstar) {
  const component = delinearized(yFromLstar(lstar));
  return argbFromRgb(component, component, component);
}

function lstarFromArgb(argb) {
  return 116 * labF(xyzFromArgb(argb)[1] / 100) - 16;
}

function yFromLstar(lstar) {
  return 100 * labInvf((lstar + 16) / 116);
}

function lstarFromY(y) {
  return 116 * labF(y / 100) - 16;
}

function linearized(rgbComponent) {
  const normalized = rgbComponent / 255;
  return normalized <= .040449936 ? normalized / 12.92 * 100 : 100 * Math.pow((normalized + .055) / 1.055, 2.4);
}

function delinearized(rgbComponent) {
  const normalized = rgbComponent / 100;
  let delinearized = 0;
  return delinearized = normalized <= .0031308 ? 12.92 * normalized : 1.055 * Math.pow(normalized, 1 / 2.4) - .055, 
  clampInt(0, 255, Math.round(255 * delinearized));
}

function whitePointD65() {
  return WHITE_POINT_D65;
}

function labF(t) {
  return t > 216 / 24389 ? Math.pow(t, 1 / 3) : (903.2962962962963 * t + 16) / 116;
}

function labInvf(ft) {
  const ft3 = ft * ft * ft;
  return ft3 > 216 / 24389 ? ft3 : (116 * ft - 16) / 903.2962962962963;
}

class ViewingConditions {
  static make(whitePoint = whitePointD65(), adaptingLuminance = 200 / Math.PI * yFromLstar(50) / 100, backgroundLstar = 50, surround = 2, discountingIlluminant = !1) {
    const xyz = whitePoint, rW = .401288 * xyz[0] + .650173 * xyz[1] + -.051461 * xyz[2], gW = -.250268 * xyz[0] + 1.204414 * xyz[1] + .045854 * xyz[2], bW = -.002079 * xyz[0] + .048952 * xyz[1] + .953127 * xyz[2], f = .8 + surround / 10, c = f >= .9 ? lerp(.59, .69, 10 * (f - .9)) : lerp(.525, .59, 10 * (f - .8));
    let d = discountingIlluminant ? 1 : f * (1 - 1 / 3.6 * Math.exp((-adaptingLuminance - 42) / 92));
    d = d > 1 ? 1 : d < 0 ? 0 : d;
    const nc = f, rgbD = [ d * (100 / rW) + 1 - d, d * (100 / gW) + 1 - d, d * (100 / bW) + 1 - d ], k = 1 / (5 * adaptingLuminance + 1), k4 = k * k * k * k, k4F = 1 - k4, fl = k4 * adaptingLuminance + .1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance), n = yFromLstar(backgroundLstar) / whitePoint[1], z = 1.48 + Math.sqrt(n), nbb = .725 / Math.pow(n, .2), ncb = nbb, rgbAFactors = [ Math.pow(fl * rgbD[0] * rW / 100, .42), Math.pow(fl * rgbD[1] * gW / 100, .42), Math.pow(fl * rgbD[2] * bW / 100, .42) ], rgbA = [ 400 * rgbAFactors[0] / (rgbAFactors[0] + 27.13), 400 * rgbAFactors[1] / (rgbAFactors[1] + 27.13), 400 * rgbAFactors[2] / (rgbAFactors[2] + 27.13) ];
    return new ViewingConditions(n, (2 * rgbA[0] + rgbA[1] + .05 * rgbA[2]) * nbb, nbb, ncb, c, nc, rgbD, fl, Math.pow(fl, .25), z);
  }
  constructor(n, aw, nbb, ncb, c, nc, rgbD, fl, fLRoot, z) {
    this.n = n, this.aw = aw, this.nbb = nbb, this.ncb = ncb, this.c = c, this.nc = nc, 
    this.rgbD = rgbD, this.fl = fl, this.fLRoot = fLRoot, this.z = z;
  }
}

ViewingConditions.DEFAULT = ViewingConditions.make();

class Cam16 {
  constructor(hue, chroma, j, q, m, s, jstar, astar, bstar) {
    this.hue = hue, this.chroma = chroma, this.j = j, this.q = q, this.m = m, this.s = s, 
    this.jstar = jstar, this.astar = astar, this.bstar = bstar;
  }
  distance(other) {
    const dJ = this.jstar - other.jstar, dA = this.astar - other.astar, dB = this.bstar - other.bstar, dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
    return 1.41 * Math.pow(dEPrime, .63);
  }
  static fromInt(argb) {
    return Cam16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
  }
  static fromIntInViewingConditions(argb, viewingConditions) {
    const green = (65280 & argb) >> 8, blue = 255 & argb, redL = linearized((16711680 & argb) >> 16), greenL = linearized(green), blueL = linearized(blue), x = .41233895 * redL + .35762064 * greenL + .18051042 * blueL, y = .2126 * redL + .7152 * greenL + .0722 * blueL, z = .01932141 * redL + .11916382 * greenL + .95034478 * blueL, rC = .401288 * x + .650173 * y - .051461 * z, gC = -.250268 * x + 1.204414 * y + .045854 * z, bC = -.002079 * x + .048952 * y + .953127 * z, rD = viewingConditions.rgbD[0] * rC, gD = viewingConditions.rgbD[1] * gC, bD = viewingConditions.rgbD[2] * bC, rAF = Math.pow(viewingConditions.fl * Math.abs(rD) / 100, .42), gAF = Math.pow(viewingConditions.fl * Math.abs(gD) / 100, .42), bAF = Math.pow(viewingConditions.fl * Math.abs(bD) / 100, .42), rA = 400 * signum(rD) * rAF / (rAF + 27.13), gA = 400 * signum(gD) * gAF / (gAF + 27.13), bA = 400 * signum(bD) * bAF / (bAF + 27.13), a = (11 * rA + -12 * gA + bA) / 11, b = (rA + gA - 2 * bA) / 9, u = (20 * rA + 20 * gA + 21 * bA) / 20, p2 = (40 * rA + 20 * gA + bA) / 20, atanDegrees = 180 * Math.atan2(b, a) / Math.PI, hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees, hueRadians = hue * Math.PI / 180, ac = p2 * viewingConditions.nbb, j = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z), q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot, huePrime = hue < 20.14 ? hue + 360 : hue, t = 5e4 / 13 * (.25 * (Math.cos(huePrime * Math.PI / 180 + 2) + 3.8)) * viewingConditions.nc * viewingConditions.ncb * Math.sqrt(a * a + b * b) / (u + .305), alpha = Math.pow(t, .9) * Math.pow(1.64 - Math.pow(.29, viewingConditions.n), .73), c = alpha * Math.sqrt(j / 100), m = c * viewingConditions.fLRoot, s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4)), jstar = (1 + 100 * .007) * j / (1 + .007 * j), mstar = 1 / .0228 * Math.log(1 + .0228 * m), astar = mstar * Math.cos(hueRadians), bstar = mstar * Math.sin(hueRadians);
    return new Cam16(hue, c, j, q, m, s, jstar, astar, bstar);
  }
  static fromJch(j, c, h) {
    return Cam16.fromJchInViewingConditions(j, c, h, ViewingConditions.DEFAULT);
  }
  static fromJchInViewingConditions(j, c, h, viewingConditions) {
    const q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot, m = c * viewingConditions.fLRoot, alpha = c / Math.sqrt(j / 100), s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4)), hueRadians = h * Math.PI / 180, jstar = (1 + 100 * .007) * j / (1 + .007 * j), mstar = 1 / .0228 * Math.log(1 + .0228 * m), astar = mstar * Math.cos(hueRadians), bstar = mstar * Math.sin(hueRadians);
    return new Cam16(h, c, j, q, m, s, jstar, astar, bstar);
  }
  static fromUcs(jstar, astar, bstar) {
    return Cam16.fromUcsInViewingConditions(jstar, astar, bstar, ViewingConditions.DEFAULT);
  }
  static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
    const a = astar, b = bstar, m = Math.sqrt(a * a + b * b), c = (Math.exp(.0228 * m) - 1) / .0228 / viewingConditions.fLRoot;
    let h = Math.atan2(b, a) * (180 / Math.PI);
    h < 0 && (h += 360);
    const j = jstar / (1 - .007 * (jstar - 100));
    return Cam16.fromJchInViewingConditions(j, c, h, viewingConditions);
  }
  toInt() {
    return this.viewed(ViewingConditions.DEFAULT);
  }
  viewed(viewingConditions) {
    const alpha = 0 === this.chroma || 0 === this.j ? 0 : this.chroma / Math.sqrt(this.j / 100), t = Math.pow(alpha / Math.pow(1.64 - Math.pow(.29, viewingConditions.n), .73), 1 / .9), hRad = this.hue * Math.PI / 180, eHue = .25 * (Math.cos(hRad + 2) + 3.8), ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z), p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb, p2 = ac / viewingConditions.nbb, hSin = Math.sin(hRad), hCos = Math.cos(hRad), gamma = 23 * (p2 + .305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin), a = gamma * hCos, b = gamma * hSin, rA = (460 * p2 + 451 * a + 288 * b) / 1403, gA = (460 * p2 - 891 * a - 261 * b) / 1403, bA = (460 * p2 - 220 * a - 6300 * b) / 1403, rCBase = Math.max(0, 27.13 * Math.abs(rA) / (400 - Math.abs(rA))), rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / .42), gCBase = Math.max(0, 27.13 * Math.abs(gA) / (400 - Math.abs(gA))), gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / .42), bCBase = Math.max(0, 27.13 * Math.abs(bA) / (400 - Math.abs(bA))), bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / .42), rF = rC / viewingConditions.rgbD[0], gF = gC / viewingConditions.rgbD[1], bF = bC / viewingConditions.rgbD[2];
    return argbFromXyz(1.86206786 * rF - 1.01125463 * gF + .14918677 * bF, .38752654 * rF + .62144744 * gF - .00897398 * bF, -.0158415 * rF - .03412294 * gF + 1.04996444 * bF);
  }
  static fromXyzInViewingConditions(x, y, z, viewingConditions) {
    const rC = .401288 * x + .650173 * y - .051461 * z, gC = -.250268 * x + 1.204414 * y + .045854 * z, bC = -.002079 * x + .048952 * y + .953127 * z, rD = viewingConditions.rgbD[0] * rC, gD = viewingConditions.rgbD[1] * gC, bD = viewingConditions.rgbD[2] * bC, rAF = Math.pow(viewingConditions.fl * Math.abs(rD) / 100, .42), gAF = Math.pow(viewingConditions.fl * Math.abs(gD) / 100, .42), bAF = Math.pow(viewingConditions.fl * Math.abs(bD) / 100, .42), rA = 400 * signum(rD) * rAF / (rAF + 27.13), gA = 400 * signum(gD) * gAF / (gAF + 27.13), bA = 400 * signum(bD) * bAF / (bAF + 27.13), a = (11 * rA + -12 * gA + bA) / 11, b = (rA + gA - 2 * bA) / 9, u = (20 * rA + 20 * gA + 21 * bA) / 20, p2 = (40 * rA + 20 * gA + bA) / 20, atanDegrees = 180 * Math.atan2(b, a) / Math.PI, hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees, hueRadians = hue * Math.PI / 180, ac = p2 * viewingConditions.nbb, J = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z), Q = 4 / viewingConditions.c * Math.sqrt(J / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot, huePrime = hue < 20.14 ? hue + 360 : hue, t = 5e4 / 13 * (1 / 4 * (Math.cos(huePrime * Math.PI / 180 + 2) + 3.8)) * viewingConditions.nc * viewingConditions.ncb * Math.sqrt(a * a + b * b) / (u + .305), alpha = Math.pow(t, .9) * Math.pow(1.64 - Math.pow(.29, viewingConditions.n), .73), C = alpha * Math.sqrt(J / 100), M = C * viewingConditions.fLRoot, s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4)), jstar = (1 + 100 * .007) * J / (1 + .007 * J), mstar = Math.log(1 + .0228 * M) / .0228, astar = mstar * Math.cos(hueRadians), bstar = mstar * Math.sin(hueRadians);
    return new Cam16(hue, C, J, Q, M, s, jstar, astar, bstar);
  }
  xyzInViewingConditions(viewingConditions) {
    const alpha = 0 === this.chroma || 0 === this.j ? 0 : this.chroma / Math.sqrt(this.j / 100), t = Math.pow(alpha / Math.pow(1.64 - Math.pow(.29, viewingConditions.n), .73), 1 / .9), hRad = this.hue * Math.PI / 180, eHue = .25 * (Math.cos(hRad + 2) + 3.8), ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z), p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb, p2 = ac / viewingConditions.nbb, hSin = Math.sin(hRad), hCos = Math.cos(hRad), gamma = 23 * (p2 + .305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin), a = gamma * hCos, b = gamma * hSin, rA = (460 * p2 + 451 * a + 288 * b) / 1403, gA = (460 * p2 - 891 * a - 261 * b) / 1403, bA = (460 * p2 - 220 * a - 6300 * b) / 1403, rCBase = Math.max(0, 27.13 * Math.abs(rA) / (400 - Math.abs(rA))), rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / .42), gCBase = Math.max(0, 27.13 * Math.abs(gA) / (400 - Math.abs(gA))), gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / .42), bCBase = Math.max(0, 27.13 * Math.abs(bA) / (400 - Math.abs(bA))), bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / .42), rF = rC / viewingConditions.rgbD[0], gF = gC / viewingConditions.rgbD[1], bF = bC / viewingConditions.rgbD[2];
    return [ 1.86206786 * rF - 1.01125463 * gF + .14918677 * bF, .38752654 * rF + .62144744 * gF - .00897398 * bF, -.0158415 * rF - .03412294 * gF + 1.04996444 * bF ];
  }
}

class HctSolver {
  static sanitizeRadians(angle) {
    return (angle + 8 * Math.PI) % (2 * Math.PI);
  }
  static trueDelinearized(rgbComponent) {
    const normalized = rgbComponent / 100;
    let delinearized = 0;
    return delinearized = normalized <= .0031308 ? 12.92 * normalized : 1.055 * Math.pow(normalized, 1 / 2.4) - .055, 
    255 * delinearized;
  }
  static chromaticAdaptation(component) {
    const af = Math.pow(Math.abs(component), .42);
    return 400 * signum(component) * af / (af + 27.13);
  }
  static hueOf(linrgb) {
    const scaledDiscount = matrixMultiply(linrgb, HctSolver.SCALED_DISCOUNT_FROM_LINRGB), rA = HctSolver.chromaticAdaptation(scaledDiscount[0]), gA = HctSolver.chromaticAdaptation(scaledDiscount[1]), bA = HctSolver.chromaticAdaptation(scaledDiscount[2]), a = (11 * rA + -12 * gA + bA) / 11, b = (rA + gA - 2 * bA) / 9;
    return Math.atan2(b, a);
  }
  static areInCyclicOrder(a, b, c) {
    return HctSolver.sanitizeRadians(b - a) < HctSolver.sanitizeRadians(c - a);
  }
  static intercept(source, mid, target) {
    return (mid - source) / (target - source);
  }
  static lerpPoint(source, t, target) {
    return [ source[0] + (target[0] - source[0]) * t, source[1] + (target[1] - source[1]) * t, source[2] + (target[2] - source[2]) * t ];
  }
  static setCoordinate(source, coordinate, target, axis) {
    const t = HctSolver.intercept(source[axis], coordinate, target[axis]);
    return HctSolver.lerpPoint(source, t, target);
  }
  static isBounded(x) {
    return 0 <= x && x <= 100;
  }
  static nthVertex(y, n) {
    const kR = HctSolver.Y_FROM_LINRGB[0], kG = HctSolver.Y_FROM_LINRGB[1], kB = HctSolver.Y_FROM_LINRGB[2], coordA = n % 4 <= 1 ? 0 : 100, coordB = n % 2 == 0 ? 0 : 100;
    if (n < 4) {
      const g = coordA, b = coordB, r = (y - g * kG - b * kB) / kR;
      return HctSolver.isBounded(r) ? [ r, g, b ] : [ -1, -1, -1 ];
    }
    if (n < 8) {
      const b = coordA, r = coordB, g = (y - r * kR - b * kB) / kG;
      return HctSolver.isBounded(g) ? [ r, g, b ] : [ -1, -1, -1 ];
    }
    {
      const r = coordA, g = coordB, b = (y - r * kR - g * kG) / kB;
      return HctSolver.isBounded(b) ? [ r, g, b ] : [ -1, -1, -1 ];
    }
  }
  static bisectToSegment(y, targetHue) {
    let left = [ -1, -1, -1 ], right = left, leftHue = 0, rightHue = 0, initialized = !1, uncut = !0;
    for (let n = 0; n < 12; n++) {
      const mid = HctSolver.nthVertex(y, n);
      if (mid[0] < 0) continue;
      const midHue = HctSolver.hueOf(mid);
      initialized ? (uncut || HctSolver.areInCyclicOrder(leftHue, midHue, rightHue)) && (uncut = !1, 
      HctSolver.areInCyclicOrder(leftHue, targetHue, midHue) ? (right = mid, rightHue = midHue) : (left = mid, 
      leftHue = midHue)) : (left = mid, right = mid, leftHue = midHue, rightHue = midHue, 
      initialized = !0);
    }
    return [ left, right ];
  }
  static midpoint(a, b) {
    return [ (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2 ];
  }
  static criticalPlaneBelow(x) {
    return Math.floor(x - .5);
  }
  static criticalPlaneAbove(x) {
    return Math.ceil(x - .5);
  }
  static bisectToLimit(y, targetHue) {
    const segment = HctSolver.bisectToSegment(y, targetHue);
    let left = segment[0], leftHue = HctSolver.hueOf(left), right = segment[1];
    for (let axis = 0; axis < 3; axis++) if (left[axis] !== right[axis]) {
      let lPlane = -1, rPlane = 255;
      left[axis] < right[axis] ? (lPlane = HctSolver.criticalPlaneBelow(HctSolver.trueDelinearized(left[axis])), 
      rPlane = HctSolver.criticalPlaneAbove(HctSolver.trueDelinearized(right[axis]))) : (lPlane = HctSolver.criticalPlaneAbove(HctSolver.trueDelinearized(left[axis])), 
      rPlane = HctSolver.criticalPlaneBelow(HctSolver.trueDelinearized(right[axis])));
      for (let i = 0; i < 8 && !(Math.abs(rPlane - lPlane) <= 1); i++) {
        const mPlane = Math.floor((lPlane + rPlane) / 2), midPlaneCoordinate = HctSolver.CRITICAL_PLANES[mPlane], mid = HctSolver.setCoordinate(left, midPlaneCoordinate, right, axis), midHue = HctSolver.hueOf(mid);
        HctSolver.areInCyclicOrder(leftHue, targetHue, midHue) ? (right = mid, rPlane = mPlane) : (left = mid, 
        leftHue = midHue, lPlane = mPlane);
      }
    }
    return HctSolver.midpoint(left, right);
  }
  static inverseChromaticAdaptation(adapted) {
    const adaptedAbs = Math.abs(adapted), base = Math.max(0, 27.13 * adaptedAbs / (400 - adaptedAbs));
    return signum(adapted) * Math.pow(base, 1 / .42);
  }
  static findResultByJ(hueRadians, chroma, y) {
    let j = 11 * Math.sqrt(y);
    const viewingConditions = ViewingConditions.DEFAULT, tInnerCoeff = 1 / Math.pow(1.64 - Math.pow(.29, viewingConditions.n), .73), p1 = .25 * (Math.cos(hueRadians + 2) + 3.8) * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb, hSin = Math.sin(hueRadians), hCos = Math.cos(hueRadians);
    for (let iterationRound = 0; iterationRound < 5; iterationRound++) {
      const jNormalized = j / 100, alpha = 0 === chroma || 0 === j ? 0 : chroma / Math.sqrt(jNormalized), t = Math.pow(alpha * tInnerCoeff, 1 / .9), p2 = viewingConditions.aw * Math.pow(jNormalized, 1 / viewingConditions.c / viewingConditions.z) / viewingConditions.nbb, gamma = 23 * (p2 + .305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin), a = gamma * hCos, b = gamma * hSin, rA = (460 * p2 + 451 * a + 288 * b) / 1403, gA = (460 * p2 - 891 * a - 261 * b) / 1403, bA = (460 * p2 - 220 * a - 6300 * b) / 1403, linrgb = matrixMultiply([ HctSolver.inverseChromaticAdaptation(rA), HctSolver.inverseChromaticAdaptation(gA), HctSolver.inverseChromaticAdaptation(bA) ], HctSolver.LINRGB_FROM_SCALED_DISCOUNT);
      if (linrgb[0] < 0 || linrgb[1] < 0 || linrgb[2] < 0) return 0;
      const kR = HctSolver.Y_FROM_LINRGB[0], kG = HctSolver.Y_FROM_LINRGB[1], kB = HctSolver.Y_FROM_LINRGB[2], fnj = kR * linrgb[0] + kG * linrgb[1] + kB * linrgb[2];
      if (fnj <= 0) return 0;
      if (4 === iterationRound || Math.abs(fnj - y) < .002) return linrgb[0] > 100.01 || linrgb[1] > 100.01 || linrgb[2] > 100.01 ? 0 : argbFromLinrgb(linrgb);
      j -= (fnj - y) * j / (2 * fnj);
    }
    return 0;
  }
  static solveToInt(hueDegrees, chroma, lstar) {
    if (chroma < 1e-4 || lstar < 1e-4 || lstar > 99.9999) return argbFromLstar(lstar);
    const hueRadians = (hueDegrees = sanitizeDegreesDouble(hueDegrees)) / 180 * Math.PI, y = yFromLstar(lstar), exactAnswer = HctSolver.findResultByJ(hueRadians, chroma, y);
    if (0 !== exactAnswer) return exactAnswer;
    return argbFromLinrgb(HctSolver.bisectToLimit(y, hueRadians));
  }
  static solveToCam(hueDegrees, chroma, lstar) {
    return Cam16.fromInt(HctSolver.solveToInt(hueDegrees, chroma, lstar));
  }
}

HctSolver.SCALED_DISCOUNT_FROM_LINRGB = [ [ .001200833568784504, .002389694492170889, .0002795742885861124 ], [ .0005891086651375999, .0029785502573438758, .0003270666104008398 ], [ .00010146692491640572, .0005364214359186694, .0032979401770712076 ] ], 
HctSolver.LINRGB_FROM_SCALED_DISCOUNT = [ [ 1373.2198709594231, -1100.4251190754821, -7.278681089101213 ], [ -271.815969077903, 559.6580465940733, -32.46047482791194 ], [ 1.9622899599665666, -57.173814538844006, 308.7233197812385 ] ], 
HctSolver.Y_FROM_LINRGB = [ .2126, .7152, .0722 ], HctSolver.CRITICAL_PLANES = [ .015176349177441876, .045529047532325624, .07588174588720938, .10623444424209313, .13658714259697685, .16693984095186062, .19729253930674434, .2276452376616281, .2579979360165119, .28835063437139563, .3188300904430532, .350925934958123, .3848314933096426, .42057480301049466, .458183274052838, .4976837250274023, .5391024159806381, .5824650784040898, .6277969426914107, .6751227633498623, .7244668422128921, .775853049866786, .829304845476233, .8848452951698498, .942497089126609, 1.0022825574869039, 1.0642236851973577, 1.1283421258858297, 1.1946592148522128, 1.2631959812511864, 1.3339731595349034, 1.407011200216447, 1.4823302800086415, 1.5599503113873272, 1.6398909516233677, 1.7221716113234105, 1.8068114625156377, 1.8938294463134073, 1.9832442801866852, 2.075074464868551, 2.1693382909216234, 2.2660538449872063, 2.36523901573795, 2.4669114995532007, 2.5710888059345764, 2.6777882626779785, 2.7870270208169257, 2.898822059350997, 3.0131901897720907, 3.1301480604002863, 3.2497121605402226, 3.3718988244681087, 3.4967242352587946, 3.624204428461639, 3.754355295633311, 3.887192587735158, 4.022731918402185, 4.160988767090289, 4.301978482107941, 4.445716283538092, 4.592217266055746, 4.741496401646282, 4.893568542229298, 5.048448422192488, 5.20615066083972, 5.3666897647573375, 5.5300801301023865, 5.696336044816294, 5.865471690767354, 6.037501145825082, 6.212438385869475, 6.390297286737924, 6.571091626112461, 6.7548350853498045, 6.941541251256611, 7.131223617812143, 7.323895587840543, 7.5195704746346665, 7.7182615035334345, 7.919981813454504, 8.124744458384042, 8.332562408825165, 8.543448553206703, 8.757415699253682, 8.974476575321063, 9.194643831691977, 9.417930041841839, 9.644347703669503, 9.873909240696694, 10.106627003236781, 10.342513269534024, 10.58158024687427, 10.8238400726681, 11.069304815507364, 11.317986476196008, 11.569896988756009, 11.825048221409341, 12.083451977536606, 12.345119996613247, 12.610063955123938, 12.878295467455942, 13.149826086772048, 13.42466730586372, 13.702830557985108, 13.984327217668513, 14.269168601521828, 14.55736596900856, 14.848930523210871, 15.143873411576273, 15.44220572664832, 15.743938506781891, 16.04908273684337, 16.35764934889634, 16.66964922287304, 16.985093187232053, 17.30399201960269, 17.62635644741625, 17.95219714852476, 18.281524751807332, 18.614349837764564, 18.95068293910138, 19.290534541298456, 19.633915083172692, 19.98083495742689, 20.331304511189067, 20.685334046541502, 21.042933821039977, 21.404114048223256, 21.76888489811322, 22.137256497705877, 22.50923893145328, 22.884842241736916, 23.264076429332462, 23.6469514538663, 24.033477234264016, 24.42366364919083, 24.817520537484558, 25.21505769858089, 25.61628489293138, 26.021211842414342, 26.429848230738664, 26.842203703840827, 27.258287870275353, 27.678110301598522, 28.10168053274597, 28.529008062403893, 28.96010235337422, 29.39497283293396, 29.83362889318845, 30.276079891419332, 30.722335150426627, 31.172403958865512, 31.62629557157785, 32.08401920991837, 32.54558406207592, 33.010999283389665, 33.4802739966603, 33.953417292456834, 34.430438229418264, 34.911345834551085, 35.39614910352207, 35.88485700094671, 36.37747846067349, 36.87402238606382, 37.37449765026789, 37.87891309649659, 38.38727753828926, 38.89959975977785, 39.41588851594697, 39.93615253289054, 40.460400508064545, 40.98864111053629, 41.520882981230194, 42.05713473317016, 42.597404951718396, 43.141702194811224, 43.6900349931913, 44.24241185063697, 44.798841244188324, 45.35933162437017, 45.92389141541209, 46.49252901546552, 47.065252796817916, 47.64207110610409, 48.22299226451468, 48.808024568002054, 49.3971762874833, 49.9904556690408, 50.587870934119984, 51.189430279724725, 51.79514187861014, 52.40501387947288, 53.0190544071392, 53.637271562750364, 54.259673423945976, 54.88626804504493, 55.517063457223934, 56.15206766869424, 56.79128866487574, 57.43473440856916, 58.08241284012621, 58.734331877617365, 59.39049941699807, 60.05092333227251, 60.715611475655585, 61.38457167773311, 62.057811747619894, 62.7353394731159, 63.417162620860914, 64.10328893648692, 64.79372614476921, 65.48848194977529, 66.18756403501224, 66.89098006357258, 67.59873767827808, 68.31084450182222, 69.02730813691093, 69.74813616640164, 70.47333615344107, 71.20291564160104, 71.93688215501312, 72.67524319850172, 73.41800625771542, 74.16517879925733, 74.9167682708136, 75.67278210128072, 76.43322770089146, 77.1981124613393, 77.96744375590167, 78.74122893956174, 79.51947534912904, 80.30219030335869, 81.08938110306934, 81.88105503125999, 82.67721935322541, 83.4778813166706, 84.28304815182372, 85.09272707154808, 85.90692527145302, 86.72564993000343, 87.54890820862819, 88.3767072518277, 89.2090541872801, 90.04595612594655, 90.88742016217518, 91.73345337380438, 92.58406282226491, 93.43925555268066, 94.29903859396902, 95.16341895893969, 96.03240364439274, 96.9059996312159, 97.78421388448044, 98.6670533535366, 99.55452497210776 ];

class Hct {
  static from(hue, chroma, tone) {
    return new Hct(HctSolver.solveToInt(hue, chroma, tone));
  }
  static fromInt(argb) {
    return new Hct(argb);
  }
  toInt() {
    return this.argb;
  }
  get hue() {
    return this.internalHue;
  }
  set hue(newHue) {
    this.setInternalState(HctSolver.solveToInt(newHue, this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(newChroma) {
    this.setInternalState(HctSolver.solveToInt(this.internalHue, newChroma, this.internalTone));
  }
  get tone() {
    return this.internalTone;
  }
  set tone(newTone) {
    this.setInternalState(HctSolver.solveToInt(this.internalHue, this.internalChroma, newTone));
  }
  constructor(argb) {
    this.argb = argb;
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue, this.internalChroma = cam.chroma, this.internalTone = lstarFromArgb(argb), 
    this.argb = argb;
  }
  setInternalState(argb) {
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue, this.internalChroma = cam.chroma, this.internalTone = lstarFromArgb(argb), 
    this.argb = argb;
  }
  inViewingConditions(vc) {
    const viewedInVc = Cam16.fromInt(this.toInt()).xyzInViewingConditions(vc), recastInVc = Cam16.fromXyzInViewingConditions(viewedInVc[0], viewedInVc[1], viewedInVc[2], ViewingConditions.make());
    return Hct.from(recastInVc.hue, recastInVc.chroma, lstarFromY(viewedInVc[1]));
  }
}

class Blend {
  static harmonize(designColor, sourceColor) {
    const fromHct = Hct.fromInt(designColor), toHct = Hct.fromInt(sourceColor), differenceDegrees$1 = differenceDegrees(fromHct.hue, toHct.hue), rotationDegrees = Math.min(.5 * differenceDegrees$1, 15), outputHue = sanitizeDegreesDouble(fromHct.hue + rotationDegrees * rotationDirection(fromHct.hue, toHct.hue));
    return Hct.from(outputHue, fromHct.chroma, fromHct.tone).toInt();
  }
  static hctHue(from, to, amount) {
    const ucs = Blend.cam16Ucs(from, to, amount), ucsCam = Cam16.fromInt(ucs), fromCam = Cam16.fromInt(from);
    return Hct.from(ucsCam.hue, fromCam.chroma, lstarFromArgb(from)).toInt();
  }
  static cam16Ucs(from, to, amount) {
    const fromCam = Cam16.fromInt(from), toCam = Cam16.fromInt(to), fromJ = fromCam.jstar, fromA = fromCam.astar, fromB = fromCam.bstar, jstar = fromJ + (toCam.jstar - fromJ) * amount, astar = fromA + (toCam.astar - fromA) * amount, bstar = fromB + (toCam.bstar - fromB) * amount;
    return Cam16.fromUcs(jstar, astar, bstar).toInt();
  }
}

class Contrast {
  static ratioOfTones(toneA, toneB) {
    return toneA = clampDouble(0, 100, toneA), toneB = clampDouble(0, 100, toneB), Contrast.ratioOfYs(yFromLstar(toneA), yFromLstar(toneB));
  }
  static ratioOfYs(y1, y2) {
    const lighter = y1 > y2 ? y1 : y2;
    return (lighter + 5) / ((lighter === y2 ? y1 : y2) + 5);
  }
  static lighter(tone, ratio) {
    if (tone < 0 || tone > 100) return -1;
    const darkY = yFromLstar(tone), lightY = ratio * (darkY + 5) - 5, realContrast = Contrast.ratioOfYs(lightY, darkY), delta = Math.abs(realContrast - ratio);
    if (realContrast < ratio && delta > .04) return -1;
    const returnValue = lstarFromY(lightY) + .4;
    return returnValue < 0 || returnValue > 100 ? -1 : returnValue;
  }
  static darker(tone, ratio) {
    if (tone < 0 || tone > 100) return -1;
    const lightY = yFromLstar(tone), darkY = (lightY + 5) / ratio - 5, realContrast = Contrast.ratioOfYs(lightY, darkY), delta = Math.abs(realContrast - ratio);
    if (realContrast < ratio && delta > .04) return -1;
    const returnValue = lstarFromY(darkY) - .4;
    return returnValue < 0 || returnValue > 100 ? -1 : returnValue;
  }
  static lighterUnsafe(tone, ratio) {
    const lighterSafe = Contrast.lighter(tone, ratio);
    return lighterSafe < 0 ? 100 : lighterSafe;
  }
  static darkerUnsafe(tone, ratio) {
    const darkerSafe = Contrast.darker(tone, ratio);
    return darkerSafe < 0 ? 0 : darkerSafe;
  }
}

class DislikeAnalyzer {
  static isDisliked(hct) {
    const huePasses = Math.round(hct.hue) >= 90 && Math.round(hct.hue) <= 111, chromaPasses = Math.round(hct.chroma) > 16, tonePasses = Math.round(hct.tone) < 65;
    return huePasses && chromaPasses && tonePasses;
  }
  static fixIfDisliked(hct) {
    return DislikeAnalyzer.isDisliked(hct) ? Hct.from(hct.hue, hct.chroma, 70) : hct;
  }
}

class DynamicColor {
  static fromPalette(args) {
    return new DynamicColor(args.name ?? "", args.palette, args.tone, args.isBackground ?? !1, args.background, args.secondBackground, args.contrastCurve, args.toneDeltaPair);
  }
  constructor(name, palette, tone, isBackground, background, secondBackground, contrastCurve, toneDeltaPair) {
    if (this.name = name, this.palette = palette, this.tone = tone, this.isBackground = isBackground, 
    this.background = background, this.secondBackground = secondBackground, this.contrastCurve = contrastCurve, 
    this.toneDeltaPair = toneDeltaPair, this.hctCache = new Map, !background && secondBackground) throw new Error(`Color ${name} has secondBackgrounddefined, but background is not defined.`);
    if (!background && contrastCurve) throw new Error(`Color ${name} has contrastCurvedefined, but background is not defined.`);
    if (background && !contrastCurve) throw new Error(`Color ${name} has backgrounddefined, but contrastCurve is not defined.`);
  }
  getArgb(scheme) {
    return this.getHct(scheme).toInt();
  }
  getHct(scheme) {
    const cachedAnswer = this.hctCache.get(scheme);
    if (null != cachedAnswer) return cachedAnswer;
    const tone = this.getTone(scheme), answer = this.palette(scheme).getHct(tone);
    return this.hctCache.size > 4 && this.hctCache.clear(), this.hctCache.set(scheme, answer), 
    answer;
  }
  getTone(scheme) {
    const decreasingContrast = scheme.contrastLevel < 0;
    if (this.toneDeltaPair) {
      const toneDeltaPair = this.toneDeltaPair(scheme), roleA = toneDeltaPair.roleA, roleB = toneDeltaPair.roleB, delta = toneDeltaPair.delta, polarity = toneDeltaPair.polarity, stayTogether = toneDeltaPair.stayTogether, bgTone = this.background(scheme).getTone(scheme), aIsNearer = "nearer" === polarity || "lighter" === polarity && !scheme.isDark || "darker" === polarity && scheme.isDark, nearer = aIsNearer ? roleA : roleB, farther = aIsNearer ? roleB : roleA, amNearer = this.name === nearer.name, expansionDir = scheme.isDark ? 1 : -1, nContrast = nearer.contrastCurve.getContrast(scheme.contrastLevel), fContrast = farther.contrastCurve.getContrast(scheme.contrastLevel), nInitialTone = nearer.tone(scheme);
      let nTone = Contrast.ratioOfTones(bgTone, nInitialTone) >= nContrast ? nInitialTone : DynamicColor.foregroundTone(bgTone, nContrast);
      const fInitialTone = farther.tone(scheme);
      let fTone = Contrast.ratioOfTones(bgTone, fInitialTone) >= fContrast ? fInitialTone : DynamicColor.foregroundTone(bgTone, fContrast);
      return decreasingContrast && (nTone = DynamicColor.foregroundTone(bgTone, nContrast), 
      fTone = DynamicColor.foregroundTone(bgTone, fContrast)), (fTone - nTone) * expansionDir >= delta || (fTone = clampDouble(0, 100, nTone + delta * expansionDir), 
      (fTone - nTone) * expansionDir >= delta || (nTone = clampDouble(0, 100, fTone - delta * expansionDir))), 
      50 <= nTone && nTone < 60 ? expansionDir > 0 ? (nTone = 60, fTone = Math.max(fTone, nTone + delta * expansionDir)) : (nTone = 49, 
      fTone = Math.min(fTone, nTone + delta * expansionDir)) : 50 <= fTone && fTone < 60 && (stayTogether ? expansionDir > 0 ? (nTone = 60, 
      fTone = Math.max(fTone, nTone + delta * expansionDir)) : (nTone = 49, fTone = Math.min(fTone, nTone + delta * expansionDir)) : fTone = expansionDir > 0 ? 60 : 49), 
      amNearer ? nTone : fTone;
    }
    {
      let answer = this.tone(scheme);
      if (null == this.background) return answer;
      const bgTone = this.background(scheme).getTone(scheme), desiredRatio = this.contrastCurve.getContrast(scheme.contrastLevel);
      if (Contrast.ratioOfTones(bgTone, answer) >= desiredRatio || (answer = DynamicColor.foregroundTone(bgTone, desiredRatio)), 
      decreasingContrast && (answer = DynamicColor.foregroundTone(bgTone, desiredRatio)), 
      this.isBackground && 50 <= answer && answer < 60 && (answer = Contrast.ratioOfTones(49, bgTone) >= desiredRatio ? 49 : 60), 
      this.secondBackground) {
        const [bg1, bg2] = [ this.background, this.secondBackground ], [bgTone1, bgTone2] = [ bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme) ], [upper, lower] = [ Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2) ];
        if (Contrast.ratioOfTones(upper, answer) >= desiredRatio && Contrast.ratioOfTones(lower, answer) >= desiredRatio) return answer;
        const lightOption = Contrast.lighter(upper, desiredRatio), darkOption = Contrast.darker(lower, desiredRatio), availables = [];
        -1 !== lightOption && availables.push(lightOption), -1 !== darkOption && availables.push(darkOption);
        return DynamicColor.tonePrefersLightForeground(bgTone1) || DynamicColor.tonePrefersLightForeground(bgTone2) ? lightOption < 0 ? 100 : lightOption : 1 === availables.length ? availables[0] : darkOption < 0 ? 0 : darkOption;
      }
      return answer;
    }
  }
  static foregroundTone(bgTone, ratio) {
    const lighterTone = Contrast.lighterUnsafe(bgTone, ratio), darkerTone = Contrast.darkerUnsafe(bgTone, ratio), lighterRatio = Contrast.ratioOfTones(lighterTone, bgTone), darkerRatio = Contrast.ratioOfTones(darkerTone, bgTone);
    if (DynamicColor.tonePrefersLightForeground(bgTone)) {
      const negligibleDifference = Math.abs(lighterRatio - darkerRatio) < .1 && lighterRatio < ratio && darkerRatio < ratio;
      return lighterRatio >= ratio || lighterRatio >= darkerRatio || negligibleDifference ? lighterTone : darkerTone;
    }
    return darkerRatio >= ratio || darkerRatio >= lighterRatio ? darkerTone : lighterTone;
  }
  static tonePrefersLightForeground(tone) {
    return Math.round(tone) < 60;
  }
  static toneAllowsLightForeground(tone) {
    return Math.round(tone) <= 49;
  }
  static enableLightForeground(tone) {
    return DynamicColor.tonePrefersLightForeground(tone) && !DynamicColor.toneAllowsLightForeground(tone) ? 49 : tone;
  }
}

var Variant;

!function(Variant) {
  Variant[Variant.MONOCHROME = 0] = "MONOCHROME", Variant[Variant.NEUTRAL = 1] = "NEUTRAL", 
  Variant[Variant.TONAL_SPOT = 2] = "TONAL_SPOT", Variant[Variant.VIBRANT = 3] = "VIBRANT", 
  Variant[Variant.EXPRESSIVE = 4] = "EXPRESSIVE", Variant[Variant.FIDELITY = 5] = "FIDELITY", 
  Variant[Variant.CONTENT = 6] = "CONTENT", Variant[Variant.RAINBOW = 7] = "RAINBOW", 
  Variant[Variant.FRUIT_SALAD = 8] = "FRUIT_SALAD";
}(Variant || (Variant = {}));

class ContrastCurve {
  constructor(low, normal, medium, high) {
    this.low = low, this.normal = normal, this.medium = medium, this.high = high;
  }
  getContrast(contrastLevel) {
    return contrastLevel <= -1 ? this.low : contrastLevel < 0 ? lerp(this.low, this.normal, (contrastLevel - -1) / 1) : contrastLevel < .5 ? lerp(this.normal, this.medium, (contrastLevel - 0) / .5) : contrastLevel < 1 ? lerp(this.medium, this.high, (contrastLevel - .5) / .5) : this.high;
  }
}

class ToneDeltaPair {
  constructor(roleA, roleB, delta, polarity, stayTogether) {
    this.roleA = roleA, this.roleB = roleB, this.delta = delta, this.polarity = polarity, 
    this.stayTogether = stayTogether;
  }
}

function isFidelity(scheme) {
  return scheme.variant === Variant.FIDELITY || scheme.variant === Variant.CONTENT;
}

function isMonochrome(scheme) {
  return scheme.variant === Variant.MONOCHROME;
}

function findDesiredChromaByTone(hue, chroma, tone, byDecreasingTone) {
  let answer = tone, closestToChroma = Hct.from(hue, chroma, tone);
  if (closestToChroma.chroma < chroma) {
    let chromaPeak = closestToChroma.chroma;
    for (;closestToChroma.chroma < chroma; ) {
      answer += byDecreasingTone ? -1 : 1;
      const potentialSolution = Hct.from(hue, chroma, answer);
      if (chromaPeak > potentialSolution.chroma) break;
      if (Math.abs(potentialSolution.chroma - chroma) < .4) break;
      Math.abs(potentialSolution.chroma - chroma) < Math.abs(closestToChroma.chroma - chroma) && (closestToChroma = potentialSolution), 
      chromaPeak = Math.max(chromaPeak, potentialSolution.chroma);
    }
  }
  return answer;
}

function viewingConditionsForAlbers(scheme) {
  return ViewingConditions.make(void 0, void 0, scheme.isDark ? 30 : 80, void 0, void 0);
}

function performAlbers(prealbers, scheme) {
  const albersd = prealbers.inViewingConditions(viewingConditionsForAlbers(scheme));
  return DynamicColor.tonePrefersLightForeground(prealbers.tone) && !DynamicColor.toneAllowsLightForeground(albersd.tone) ? DynamicColor.enableLightForeground(prealbers.tone) : DynamicColor.enableLightForeground(albersd.tone);
}

class MaterialDynamicColors {
  static highestSurface(s) {
    return s.isDark ? MaterialDynamicColors.surfaceBright : MaterialDynamicColors.surfaceDim;
  }
}

MaterialDynamicColors.contentAccentToneDelta = 15, MaterialDynamicColors.primaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "primary_palette_key_color",
  palette: s => s.primaryPalette,
  tone: s => s.primaryPalette.keyColor.tone
}), MaterialDynamicColors.secondaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "secondary_palette_key_color",
  palette: s => s.secondaryPalette,
  tone: s => s.secondaryPalette.keyColor.tone
}), MaterialDynamicColors.tertiaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "tertiary_palette_key_color",
  palette: s => s.tertiaryPalette,
  tone: s => s.tertiaryPalette.keyColor.tone
}), MaterialDynamicColors.neutralPaletteKeyColor = DynamicColor.fromPalette({
  name: "neutral_palette_key_color",
  palette: s => s.neutralPalette,
  tone: s => s.neutralPalette.keyColor.tone
}), MaterialDynamicColors.neutralVariantPaletteKeyColor = DynamicColor.fromPalette({
  name: "neutral_variant_palette_key_color",
  palette: s => s.neutralVariantPalette,
  tone: s => s.neutralVariantPalette.keyColor.tone
}), MaterialDynamicColors.background = DynamicColor.fromPalette({
  name: "background",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 6 : 98,
  isBackground: !0
}), MaterialDynamicColors.onBackground = DynamicColor.fromPalette({
  name: "on_background",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.background,
  contrastCurve: new ContrastCurve(3, 3, 4.5, 7)
}), MaterialDynamicColors.surface = DynamicColor.fromPalette({
  name: "surface",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 6 : 98,
  isBackground: !0
}), MaterialDynamicColors.surfaceDim = DynamicColor.fromPalette({
  name: "surface_dim",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 6 : 87,
  isBackground: !0
}), MaterialDynamicColors.surfaceBright = DynamicColor.fromPalette({
  name: "surface_bright",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 24 : 98,
  isBackground: !0
}), MaterialDynamicColors.surfaceContainerLowest = DynamicColor.fromPalette({
  name: "surface_container_lowest",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 4 : 100,
  isBackground: !0
}), MaterialDynamicColors.surfaceContainerLow = DynamicColor.fromPalette({
  name: "surface_container_low",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 10 : 96,
  isBackground: !0
}), MaterialDynamicColors.surfaceContainer = DynamicColor.fromPalette({
  name: "surface_container",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 12 : 94,
  isBackground: !0
}), MaterialDynamicColors.surfaceContainerHigh = DynamicColor.fromPalette({
  name: "surface_container_high",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 17 : 92,
  isBackground: !0
}), MaterialDynamicColors.surfaceContainerHighest = DynamicColor.fromPalette({
  name: "surface_container_highest",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 22 : 90,
  isBackground: !0
}), MaterialDynamicColors.onSurface = DynamicColor.fromPalette({
  name: "on_surface",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.surfaceVariant = DynamicColor.fromPalette({
  name: "surface_variant",
  palette: s => s.neutralVariantPalette,
  tone: s => s.isDark ? 30 : 90,
  isBackground: !0
}), MaterialDynamicColors.onSurfaceVariant = DynamicColor.fromPalette({
  name: "on_surface_variant",
  palette: s => s.neutralVariantPalette,
  tone: s => s.isDark ? 80 : 30,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
}), MaterialDynamicColors.inverseSurface = DynamicColor.fromPalette({
  name: "inverse_surface",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 90 : 20
}), MaterialDynamicColors.inverseOnSurface = DynamicColor.fromPalette({
  name: "inverse_on_surface",
  palette: s => s.neutralPalette,
  tone: s => s.isDark ? 20 : 95,
  background: s => MaterialDynamicColors.inverseSurface,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.outline = DynamicColor.fromPalette({
  name: "outline",
  palette: s => s.neutralVariantPalette,
  tone: s => s.isDark ? 60 : 50,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1.5, 3, 4.5, 7)
}), MaterialDynamicColors.outlineVariant = DynamicColor.fromPalette({
  name: "outline_variant",
  palette: s => s.neutralVariantPalette,
  tone: s => s.isDark ? 30 : 80,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7)
}), MaterialDynamicColors.shadow = DynamicColor.fromPalette({
  name: "shadow",
  palette: s => s.neutralPalette,
  tone: s => 0
}), MaterialDynamicColors.scrim = DynamicColor.fromPalette({
  name: "scrim",
  palette: s => s.neutralPalette,
  tone: s => 0
}), MaterialDynamicColors.surfaceTint = DynamicColor.fromPalette({
  name: "surface_tint",
  palette: s => s.primaryPalette,
  tone: s => s.isDark ? 80 : 40,
  isBackground: !0
}), MaterialDynamicColors.primary = DynamicColor.fromPalette({
  name: "primary",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 100 : 0 : s.isDark ? 80 : 40,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.primaryContainer, MaterialDynamicColors.primary, 15, "nearer", !1)
}), MaterialDynamicColors.onPrimary = DynamicColor.fromPalette({
  name: "on_primary",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 10 : 90 : s.isDark ? 20 : 100,
  background: s => MaterialDynamicColors.primary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.primaryContainer = DynamicColor.fromPalette({
  name: "primary_container",
  palette: s => s.primaryPalette,
  tone: s => isFidelity(s) ? performAlbers(s.sourceColorHct, s) : isMonochrome(s) ? s.isDark ? 85 : 25 : s.isDark ? 30 : 90,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.primaryContainer, MaterialDynamicColors.primary, 15, "nearer", !1)
}), MaterialDynamicColors.onPrimaryContainer = DynamicColor.fromPalette({
  name: "on_primary_container",
  palette: s => s.primaryPalette,
  tone: s => isFidelity(s) ? DynamicColor.foregroundTone(MaterialDynamicColors.primaryContainer.tone(s), 4.5) : isMonochrome(s) ? s.isDark ? 0 : 100 : s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.primaryContainer,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.inversePrimary = DynamicColor.fromPalette({
  name: "inverse_primary",
  palette: s => s.primaryPalette,
  tone: s => s.isDark ? 40 : 80,
  background: s => MaterialDynamicColors.inverseSurface,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
}), MaterialDynamicColors.secondary = DynamicColor.fromPalette({
  name: "secondary",
  palette: s => s.secondaryPalette,
  tone: s => s.isDark ? 80 : 40,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.secondaryContainer, MaterialDynamicColors.secondary, 15, "nearer", !1)
}), MaterialDynamicColors.onSecondary = DynamicColor.fromPalette({
  name: "on_secondary",
  palette: s => s.secondaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 10 : 100 : s.isDark ? 20 : 100,
  background: s => MaterialDynamicColors.secondary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.secondaryContainer = DynamicColor.fromPalette({
  name: "secondary_container",
  palette: s => s.secondaryPalette,
  tone: s => {
    const initialTone = s.isDark ? 30 : 90;
    if (isMonochrome(s)) return s.isDark ? 30 : 85;
    if (!isFidelity(s)) return initialTone;
    let answer = findDesiredChromaByTone(s.secondaryPalette.hue, s.secondaryPalette.chroma, initialTone, !s.isDark);
    return answer = performAlbers(s.secondaryPalette.getHct(answer), s), answer;
  },
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.secondaryContainer, MaterialDynamicColors.secondary, 15, "nearer", !1)
}), MaterialDynamicColors.onSecondaryContainer = DynamicColor.fromPalette({
  name: "on_secondary_container",
  palette: s => s.secondaryPalette,
  tone: s => isFidelity(s) ? DynamicColor.foregroundTone(MaterialDynamicColors.secondaryContainer.tone(s), 4.5) : s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.secondaryContainer,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.tertiary = DynamicColor.fromPalette({
  name: "tertiary",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 90 : 25 : s.isDark ? 80 : 40,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.tertiaryContainer, MaterialDynamicColors.tertiary, 15, "nearer", !1)
}), MaterialDynamicColors.onTertiary = DynamicColor.fromPalette({
  name: "on_tertiary",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 10 : 90 : s.isDark ? 20 : 100,
  background: s => MaterialDynamicColors.tertiary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.tertiaryContainer = DynamicColor.fromPalette({
  name: "tertiary_container",
  palette: s => s.tertiaryPalette,
  tone: s => {
    if (isMonochrome(s)) return s.isDark ? 60 : 49;
    if (!isFidelity(s)) return s.isDark ? 30 : 90;
    const albersTone = performAlbers(s.tertiaryPalette.getHct(s.sourceColorHct.tone), s), proposedHct = s.tertiaryPalette.getHct(albersTone);
    return DislikeAnalyzer.fixIfDisliked(proposedHct).tone;
  },
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.tertiaryContainer, MaterialDynamicColors.tertiary, 15, "nearer", !1)
}), MaterialDynamicColors.onTertiaryContainer = DynamicColor.fromPalette({
  name: "on_tertiary_container",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? s.isDark ? 0 : 100 : isFidelity(s) ? DynamicColor.foregroundTone(MaterialDynamicColors.tertiaryContainer.tone(s), 4.5) : s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.tertiaryContainer,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.error = DynamicColor.fromPalette({
  name: "error",
  palette: s => s.errorPalette,
  tone: s => s.isDark ? 80 : 40,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.errorContainer, MaterialDynamicColors.error, 15, "nearer", !1)
}), MaterialDynamicColors.onError = DynamicColor.fromPalette({
  name: "on_error",
  palette: s => s.errorPalette,
  tone: s => s.isDark ? 20 : 100,
  background: s => MaterialDynamicColors.error,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.errorContainer = DynamicColor.fromPalette({
  name: "error_container",
  palette: s => s.errorPalette,
  tone: s => s.isDark ? 30 : 90,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.errorContainer, MaterialDynamicColors.error, 15, "nearer", !1)
}), MaterialDynamicColors.onErrorContainer = DynamicColor.fromPalette({
  name: "on_error_container",
  palette: s => s.errorPalette,
  tone: s => s.isDark ? 90 : 10,
  background: s => MaterialDynamicColors.errorContainer,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.primaryFixed = DynamicColor.fromPalette({
  name: "primary_fixed",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? 40 : 90,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.primaryFixed, MaterialDynamicColors.primaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.primaryFixedDim = DynamicColor.fromPalette({
  name: "primary_fixed_dim",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? 30 : 80,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.primaryFixed, MaterialDynamicColors.primaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.onPrimaryFixed = DynamicColor.fromPalette({
  name: "on_primary_fixed",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? 100 : 10,
  background: s => MaterialDynamicColors.primaryFixedDim,
  secondBackground: s => MaterialDynamicColors.primaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.onPrimaryFixedVariant = DynamicColor.fromPalette({
  name: "on_primary_fixed_variant",
  palette: s => s.primaryPalette,
  tone: s => isMonochrome(s) ? 90 : 30,
  background: s => MaterialDynamicColors.primaryFixedDim,
  secondBackground: s => MaterialDynamicColors.primaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
}), MaterialDynamicColors.secondaryFixed = DynamicColor.fromPalette({
  name: "secondary_fixed",
  palette: s => s.secondaryPalette,
  tone: s => isMonochrome(s) ? 80 : 90,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.secondaryFixed, MaterialDynamicColors.secondaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.secondaryFixedDim = DynamicColor.fromPalette({
  name: "secondary_fixed_dim",
  palette: s => s.secondaryPalette,
  tone: s => isMonochrome(s) ? 70 : 80,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.secondaryFixed, MaterialDynamicColors.secondaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.onSecondaryFixed = DynamicColor.fromPalette({
  name: "on_secondary_fixed",
  palette: s => s.secondaryPalette,
  tone: s => 10,
  background: s => MaterialDynamicColors.secondaryFixedDim,
  secondBackground: s => MaterialDynamicColors.secondaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.onSecondaryFixedVariant = DynamicColor.fromPalette({
  name: "on_secondary_fixed_variant",
  palette: s => s.secondaryPalette,
  tone: s => isMonochrome(s) ? 25 : 30,
  background: s => MaterialDynamicColors.secondaryFixedDim,
  secondBackground: s => MaterialDynamicColors.secondaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
}), MaterialDynamicColors.tertiaryFixed = DynamicColor.fromPalette({
  name: "tertiary_fixed",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? 40 : 90,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.tertiaryFixed, MaterialDynamicColors.tertiaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.tertiaryFixedDim = DynamicColor.fromPalette({
  name: "tertiary_fixed_dim",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? 30 : 80,
  isBackground: !0,
  background: s => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 7),
  toneDeltaPair: s => new ToneDeltaPair(MaterialDynamicColors.tertiaryFixed, MaterialDynamicColors.tertiaryFixedDim, 10, "lighter", !0)
}), MaterialDynamicColors.onTertiaryFixed = DynamicColor.fromPalette({
  name: "on_tertiary_fixed",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? 100 : 10,
  background: s => MaterialDynamicColors.tertiaryFixedDim,
  secondBackground: s => MaterialDynamicColors.tertiaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
}), MaterialDynamicColors.onTertiaryFixedVariant = DynamicColor.fromPalette({
  name: "on_tertiary_fixed_variant",
  palette: s => s.tertiaryPalette,
  tone: s => isMonochrome(s) ? 90 : 30,
  background: s => MaterialDynamicColors.tertiaryFixedDim,
  secondBackground: s => MaterialDynamicColors.tertiaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});

class TonalPalette {
  static fromInt(argb) {
    const hct = Hct.fromInt(argb);
    return TonalPalette.fromHct(hct);
  }
  static fromHct(hct) {
    return new TonalPalette(hct.hue, hct.chroma, hct);
  }
  static fromHueAndChroma(hue, chroma) {
    return new TonalPalette(hue, chroma, TonalPalette.createKeyColor(hue, chroma));
  }
  constructor(hue, chroma, keyColor) {
    this.hue = hue, this.chroma = chroma, this.keyColor = keyColor, this.cache = new Map;
  }
  static createKeyColor(hue, chroma) {
    let smallestDeltaHct = Hct.from(hue, chroma, 50), smallestDelta = Math.abs(smallestDeltaHct.chroma - chroma);
    for (let delta = 1; delta < 50; delta += 1) {
      if (Math.round(chroma) === Math.round(smallestDeltaHct.chroma)) return smallestDeltaHct;
      const hctAdd = Hct.from(hue, chroma, 50 + delta), hctAddDelta = Math.abs(hctAdd.chroma - chroma);
      hctAddDelta < smallestDelta && (smallestDelta = hctAddDelta, smallestDeltaHct = hctAdd);
      const hctSubtract = Hct.from(hue, chroma, 50 - delta), hctSubtractDelta = Math.abs(hctSubtract.chroma - chroma);
      hctSubtractDelta < smallestDelta && (smallestDelta = hctSubtractDelta, smallestDeltaHct = hctSubtract);
    }
    return smallestDeltaHct;
  }
  tone(tone) {
    let argb = this.cache.get(tone);
    return void 0 === argb && (argb = Hct.from(this.hue, this.chroma, tone).toInt(), 
    this.cache.set(tone, argb)), argb;
  }
  getHct(tone) {
    return Hct.fromInt(this.tone(tone));
  }
}

class CorePalette {
  static of(argb) {
    return new CorePalette(argb, !1);
  }
  static contentOf(argb) {
    return new CorePalette(argb, !0);
  }
  static fromColors(colors) {
    return CorePalette.createPaletteFromColors(!1, colors);
  }
  static contentFromColors(colors) {
    return CorePalette.createPaletteFromColors(!0, colors);
  }
  static createPaletteFromColors(content, colors) {
    const palette = new CorePalette(colors.primary, content);
    if (colors.secondary) {
      const p = new CorePalette(colors.secondary, content);
      palette.a2 = p.a1;
    }
    if (colors.tertiary) {
      const p = new CorePalette(colors.tertiary, content);
      palette.a3 = p.a1;
    }
    if (colors.error) {
      const p = new CorePalette(colors.error, content);
      palette.error = p.a1;
    }
    if (colors.neutral) {
      const p = new CorePalette(colors.neutral, content);
      palette.n1 = p.n1;
    }
    if (colors.neutralVariant) {
      const p = new CorePalette(colors.neutralVariant, content);
      palette.n2 = p.n2;
    }
    return palette;
  }
  constructor(argb, isContent) {
    const hct = Hct.fromInt(argb), hue = hct.hue, chroma = hct.chroma;
    isContent ? (this.a1 = TonalPalette.fromHueAndChroma(hue, chroma), this.a2 = TonalPalette.fromHueAndChroma(hue, chroma / 3), 
    this.a3 = TonalPalette.fromHueAndChroma(hue + 60, chroma / 2), this.n1 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 12, 4)), 
    this.n2 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 6, 8))) : (this.a1 = TonalPalette.fromHueAndChroma(hue, Math.max(48, chroma)), 
    this.a2 = TonalPalette.fromHueAndChroma(hue, 16), this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24), 
    this.n1 = TonalPalette.fromHueAndChroma(hue, 4), this.n2 = TonalPalette.fromHueAndChroma(hue, 8)), 
    this.error = TonalPalette.fromHueAndChroma(25, 84);
  }
}

class Scheme {
  get primary() {
    return this.props.primary;
  }
  get onPrimary() {
    return this.props.onPrimary;
  }
  get primaryContainer() {
    return this.props.primaryContainer;
  }
  get onPrimaryContainer() {
    return this.props.onPrimaryContainer;
  }
  get secondary() {
    return this.props.secondary;
  }
  get onSecondary() {
    return this.props.onSecondary;
  }
  get secondaryContainer() {
    return this.props.secondaryContainer;
  }
  get onSecondaryContainer() {
    return this.props.onSecondaryContainer;
  }
  get tertiary() {
    return this.props.tertiary;
  }
  get onTertiary() {
    return this.props.onTertiary;
  }
  get tertiaryContainer() {
    return this.props.tertiaryContainer;
  }
  get onTertiaryContainer() {
    return this.props.onTertiaryContainer;
  }
  get error() {
    return this.props.error;
  }
  get onError() {
    return this.props.onError;
  }
  get errorContainer() {
    return this.props.errorContainer;
  }
  get onErrorContainer() {
    return this.props.onErrorContainer;
  }
  get background() {
    return this.props.background;
  }
  get onBackground() {
    return this.props.onBackground;
  }
  get surface() {
    return this.props.surface;
  }
  get onSurface() {
    return this.props.onSurface;
  }
  get surfaceVariant() {
    return this.props.surfaceVariant;
  }
  get onSurfaceVariant() {
    return this.props.onSurfaceVariant;
  }
  get outline() {
    return this.props.outline;
  }
  get outlineVariant() {
    return this.props.outlineVariant;
  }
  get shadow() {
    return this.props.shadow;
  }
  get scrim() {
    return this.props.scrim;
  }
  get inverseSurface() {
    return this.props.inverseSurface;
  }
  get inverseOnSurface() {
    return this.props.inverseOnSurface;
  }
  get inversePrimary() {
    return this.props.inversePrimary;
  }
  static light(argb) {
    return Scheme.lightFromCorePalette(CorePalette.of(argb));
  }
  static dark(argb) {
    return Scheme.darkFromCorePalette(CorePalette.of(argb));
  }
  static lightContent(argb) {
    return Scheme.lightFromCorePalette(CorePalette.contentOf(argb));
  }
  static darkContent(argb) {
    return Scheme.darkFromCorePalette(CorePalette.contentOf(argb));
  }
  static lightFromCorePalette(core) {
    return new Scheme({
      primary: core.a1.tone(40),
      onPrimary: core.a1.tone(100),
      primaryContainer: core.a1.tone(90),
      onPrimaryContainer: core.a1.tone(10),
      secondary: core.a2.tone(40),
      onSecondary: core.a2.tone(100),
      secondaryContainer: core.a2.tone(90),
      onSecondaryContainer: core.a2.tone(10),
      tertiary: core.a3.tone(40),
      onTertiary: core.a3.tone(100),
      tertiaryContainer: core.a3.tone(90),
      onTertiaryContainer: core.a3.tone(10),
      error: core.error.tone(40),
      onError: core.error.tone(100),
      errorContainer: core.error.tone(90),
      onErrorContainer: core.error.tone(10),
      background: core.n1.tone(99),
      onBackground: core.n1.tone(10),
      surface: core.n1.tone(99),
      onSurface: core.n1.tone(10),
      surfaceVariant: core.n2.tone(90),
      onSurfaceVariant: core.n2.tone(30),
      outline: core.n2.tone(50),
      outlineVariant: core.n2.tone(80),
      shadow: core.n1.tone(0),
      scrim: core.n1.tone(0),
      inverseSurface: core.n1.tone(20),
      inverseOnSurface: core.n1.tone(95),
      inversePrimary: core.a1.tone(80)
    });
  }
  static darkFromCorePalette(core) {
    return new Scheme({
      primary: core.a1.tone(80),
      onPrimary: core.a1.tone(20),
      primaryContainer: core.a1.tone(30),
      onPrimaryContainer: core.a1.tone(90),
      secondary: core.a2.tone(80),
      onSecondary: core.a2.tone(20),
      secondaryContainer: core.a2.tone(30),
      onSecondaryContainer: core.a2.tone(90),
      tertiary: core.a3.tone(80),
      onTertiary: core.a3.tone(20),
      tertiaryContainer: core.a3.tone(30),
      onTertiaryContainer: core.a3.tone(90),
      error: core.error.tone(80),
      onError: core.error.tone(20),
      errorContainer: core.error.tone(30),
      onErrorContainer: core.error.tone(80),
      background: core.n1.tone(10),
      onBackground: core.n1.tone(90),
      surface: core.n1.tone(10),
      onSurface: core.n1.tone(90),
      surfaceVariant: core.n2.tone(30),
      onSurfaceVariant: core.n2.tone(80),
      outline: core.n2.tone(60),
      outlineVariant: core.n2.tone(30),
      shadow: core.n1.tone(0),
      scrim: core.n1.tone(0),
      inverseSurface: core.n1.tone(90),
      inverseOnSurface: core.n1.tone(20),
      inversePrimary: core.a1.tone(40)
    });
  }
  constructor(props) {
    this.props = props;
  }
  toJSON() {
    return {
      ...this.props
    };
  }
}

function hexFromArgb(argb) {
  const r = redFromArgb(argb), g = greenFromArgb(argb), b = blueFromArgb(argb), outParts = [ r.toString(16), g.toString(16), b.toString(16) ];
  for (const [i, part] of outParts.entries()) 1 === part.length && (outParts[i] = "0" + part);
  return "#" + outParts.join("");
}

function argbFromHex(hex) {
  const isThree = 3 === (hex = hex.replace("#", "")).length, isSix = 6 === hex.length, isEight = 8 === hex.length;
  if (!isThree && !isSix && !isEight) throw new Error("unexpected hex " + hex);
  let r = 0, g = 0, b = 0;
  return isThree ? (r = parseIntHex(hex.slice(0, 1).repeat(2)), g = parseIntHex(hex.slice(1, 2).repeat(2)), 
  b = parseIntHex(hex.slice(2, 3).repeat(2))) : isSix ? (r = parseIntHex(hex.slice(0, 2)), 
  g = parseIntHex(hex.slice(2, 4)), b = parseIntHex(hex.slice(4, 6))) : isEight && (r = parseIntHex(hex.slice(2, 4)), 
  g = parseIntHex(hex.slice(4, 6)), b = parseIntHex(hex.slice(6, 8))), (255 << 24 | (255 & r) << 16 | (255 & g) << 8 | 255 & b) >>> 0;
}

function parseIntHex(value) {
  return parseInt(value, 16);
}

function themeFromSourceColor(source, customColors = []) {
  const palette = CorePalette.of(source);
  return {
    source: source,
    schemes: {
      light: Scheme.light(source),
      dark: Scheme.dark(source)
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error
    },
    customColors: customColors.map((c => customColor(source, c)))
  };
}

function customColor(source, color) {
  let value = color.value;
  const from = value, to = source;
  color.blend && (value = Blend.harmonize(from, to));
  const tones = CorePalette.of(value).a1;
  return {
    color: color,
    value: value,
    light: {
      color: tones.tone(40),
      onColor: tones.tone(100),
      colorContainer: tones.tone(90),
      onColorContainer: tones.tone(10)
    },
    dark: {
      color: tones.tone(80),
      onColor: tones.tone(20),
      colorContainer: tones.tone(30),
      onColorContainer: tones.tone(90)
    }
  };
}

export { argbFromHex, hexFromArgb, themeFromSourceColor };