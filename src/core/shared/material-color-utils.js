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

function sanitizeDegreesInt(degrees) {
  return (degrees %= 360) < 0 && (degrees += 360), degrees;
}

function sanitizeDegreesDouble(degrees) {
  return (degrees %= 360) < 0 && (degrees += 360), degrees;
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

function labFromArgb(argb) {
  const linearR = linearized(redFromArgb(argb)), linearG = linearized(greenFromArgb(argb)), linearB = linearized(blueFromArgb(argb)), matrix = SRGB_TO_XYZ, x = matrix[0][0] * linearR + matrix[0][1] * linearG + matrix[0][2] * linearB, y = matrix[1][0] * linearR + matrix[1][1] * linearG + matrix[1][2] * linearB, z = matrix[2][0] * linearR + matrix[2][1] * linearG + matrix[2][2] * linearB, yNormalized = y / WHITE_POINT_D65[1], zNormalized = z / WHITE_POINT_D65[2], fx = labF(x / WHITE_POINT_D65[0]), fy = labF(yNormalized);
  return [ 116 * fy - 16, 500 * (fx - fy), 200 * (fy - labF(zNormalized)) ];
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
  setValue(propertyName, value) {
    this[propertyName] = value;
  }
  toString() {
    return `HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`;
  }
  static isBlue(hue) {
    return hue >= 250 && hue < 270;
  }
  static isYellow(hue) {
    return hue >= 105 && hue < 125;
  }
  static isCyan(hue) {
    return hue >= 170 && hue < 207;
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

function validateExtendedColor(originalColor, specVersion, extendedColor) {
  if (originalColor.name !== extendedColor.name) throw new Error(`Attempting to extend color ${originalColor.name} with color ${extendedColor.name} of different name for spec version ${specVersion}.`);
  if (originalColor.isBackground !== extendedColor.isBackground) throw new Error(`Attempting to extend color ${originalColor.name} as a ${originalColor.isBackground ? "background" : "foreground"} with color ${extendedColor.name} as a ${extendedColor.isBackground ? "background" : "foreground"} for spec version ${specVersion}.`);
}

function extendSpecVersion(originlColor, specVersion, extendedColor) {
  return validateExtendedColor(originlColor, specVersion, extendedColor), DynamicColor.fromPalette({
    name: originlColor.name,
    palette: s => s.specVersion === specVersion ? extendedColor.palette(s) : originlColor.palette(s),
    tone: s => s.specVersion === specVersion ? extendedColor.tone(s) : originlColor.tone(s),
    isBackground: originlColor.isBackground,
    chromaMultiplier: s => {
      const chromaMultiplier = s.specVersion === specVersion ? extendedColor.chromaMultiplier : originlColor.chromaMultiplier;
      return void 0 !== chromaMultiplier ? chromaMultiplier(s) : 1;
    },
    background: s => {
      const background = s.specVersion === specVersion ? extendedColor.background : originlColor.background;
      return void 0 !== background ? background(s) : void 0;
    },
    secondBackground: s => {
      const secondBackground = s.specVersion === specVersion ? extendedColor.secondBackground : originlColor.secondBackground;
      return void 0 !== secondBackground ? secondBackground(s) : void 0;
    },
    contrastCurve: s => {
      const contrastCurve = s.specVersion === specVersion ? extendedColor.contrastCurve : originlColor.contrastCurve;
      return void 0 !== contrastCurve ? contrastCurve(s) : void 0;
    },
    toneDeltaPair: s => {
      const toneDeltaPair = s.specVersion === specVersion ? extendedColor.toneDeltaPair : originlColor.toneDeltaPair;
      return void 0 !== toneDeltaPair ? toneDeltaPair(s) : void 0;
    }
  });
}

class DynamicColor {
  static fromPalette(args) {
    return new DynamicColor(args.name ?? "", args.palette, args.tone ?? DynamicColor.getInitialToneFromBackground(args.background), args.isBackground ?? !1, args.chromaMultiplier, args.background, args.secondBackground, args.contrastCurve, args.toneDeltaPair);
  }
  static getInitialToneFromBackground(background) {
    return void 0 === background ? s => 50 : s => background(s) ? background(s).getTone(s) : 50;
  }
  constructor(name, palette, tone, isBackground, chromaMultiplier, background, secondBackground, contrastCurve, toneDeltaPair) {
    if (this.name = name, this.palette = palette, this.tone = tone, this.isBackground = isBackground, 
    this.chromaMultiplier = chromaMultiplier, this.background = background, this.secondBackground = secondBackground, 
    this.contrastCurve = contrastCurve, this.toneDeltaPair = toneDeltaPair, this.hctCache = new Map, 
    !background && secondBackground) throw new Error(`Color ${name} has secondBackgrounddefined, but background is not defined.`);
    if (!background && contrastCurve) throw new Error(`Color ${name} has contrastCurvedefined, but background is not defined.`);
    if (background && !contrastCurve) throw new Error(`Color ${name} has backgrounddefined, but contrastCurve is not defined.`);
  }
  clone() {
    return DynamicColor.fromPalette({
      name: this.name,
      palette: this.palette,
      tone: this.tone,
      isBackground: this.isBackground,
      chromaMultiplier: this.chromaMultiplier,
      background: this.background,
      secondBackground: this.secondBackground,
      contrastCurve: this.contrastCurve,
      toneDeltaPair: this.toneDeltaPair
    });
  }
  clearCache() {
    this.hctCache.clear();
  }
  getArgb(scheme) {
    return this.getHct(scheme).toInt();
  }
  getHct(scheme) {
    const cachedAnswer = this.hctCache.get(scheme);
    if (null != cachedAnswer) return cachedAnswer;
    const answer = getSpec$1(scheme.specVersion).getHct(scheme, this);
    return this.hctCache.size > 4 && this.hctCache.clear(), this.hctCache.set(scheme, answer), 
    answer;
  }
  getTone(scheme) {
    return getSpec$1(scheme.specVersion).getTone(scheme, this);
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

class ColorCalculationDelegateImpl2021 {
  getHct(scheme, color) {
    const tone = color.getTone(scheme);
    return color.palette(scheme).getHct(tone);
  }
  getTone(scheme, color) {
    const decreasingContrast = scheme.contrastLevel < 0, toneDeltaPair = color.toneDeltaPair ? color.toneDeltaPair(scheme) : void 0;
    if (toneDeltaPair) {
      const roleA = toneDeltaPair.roleA, roleB = toneDeltaPair.roleB, delta = toneDeltaPair.delta, polarity = toneDeltaPair.polarity, stayTogether = toneDeltaPair.stayTogether, aIsNearer = "nearer" === polarity || "lighter" === polarity && !scheme.isDark || "darker" === polarity && scheme.isDark, nearer = aIsNearer ? roleA : roleB, farther = aIsNearer ? roleB : roleA, amNearer = color.name === nearer.name, expansionDir = scheme.isDark ? 1 : -1;
      let nTone = nearer.tone(scheme), fTone = farther.tone(scheme);
      if (color.background && nearer.contrastCurve && farther.contrastCurve) {
        const bg = color.background(scheme), nContrastCurve = nearer.contrastCurve(scheme), fContrastCurve = farther.contrastCurve(scheme);
        if (bg && nContrastCurve && fContrastCurve) {
          const bgTone = bg.getTone(scheme), nContrast = nContrastCurve.get(scheme.contrastLevel), fContrast = fContrastCurve.get(scheme.contrastLevel);
          Contrast.ratioOfTones(bgTone, nTone) < nContrast && (nTone = DynamicColor.foregroundTone(bgTone, nContrast)), 
          Contrast.ratioOfTones(bgTone, fTone) < fContrast && (fTone = DynamicColor.foregroundTone(bgTone, fContrast)), 
          decreasingContrast && (nTone = DynamicColor.foregroundTone(bgTone, nContrast), fTone = DynamicColor.foregroundTone(bgTone, fContrast));
        }
      }
      return (fTone - nTone) * expansionDir < delta && (fTone = clampDouble(0, 100, nTone + delta * expansionDir), 
      (fTone - nTone) * expansionDir >= delta || (nTone = clampDouble(0, 100, fTone - delta * expansionDir))), 
      50 <= nTone && nTone < 60 ? expansionDir > 0 ? (nTone = 60, fTone = Math.max(fTone, nTone + delta * expansionDir)) : (nTone = 49, 
      fTone = Math.min(fTone, nTone + delta * expansionDir)) : 50 <= fTone && fTone < 60 && (stayTogether ? expansionDir > 0 ? (nTone = 60, 
      fTone = Math.max(fTone, nTone + delta * expansionDir)) : (nTone = 49, fTone = Math.min(fTone, nTone + delta * expansionDir)) : fTone = expansionDir > 0 ? 60 : 49), 
      amNearer ? nTone : fTone;
    }
    {
      let answer = color.tone(scheme);
      if (null == color.background || void 0 === color.background(scheme) || null == color.contrastCurve || void 0 === color.contrastCurve(scheme)) return answer;
      const bgTone = color.background(scheme).getTone(scheme), desiredRatio = color.contrastCurve(scheme).get(scheme.contrastLevel);
      if (Contrast.ratioOfTones(bgTone, answer) >= desiredRatio || (answer = DynamicColor.foregroundTone(bgTone, desiredRatio)), 
      decreasingContrast && (answer = DynamicColor.foregroundTone(bgTone, desiredRatio)), 
      color.isBackground && 50 <= answer && answer < 60 && (answer = Contrast.ratioOfTones(49, bgTone) >= desiredRatio ? 49 : 60), 
      null == color.secondBackground || void 0 === color.secondBackground(scheme)) return answer;
      const [bg1, bg2] = [ color.background, color.secondBackground ], [bgTone1, bgTone2] = [ bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme) ], [upper, lower] = [ Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2) ];
      if (Contrast.ratioOfTones(upper, answer) >= desiredRatio && Contrast.ratioOfTones(lower, answer) >= desiredRatio) return answer;
      const lightOption = Contrast.lighter(upper, desiredRatio), darkOption = Contrast.darker(lower, desiredRatio), availables = [];
      -1 !== lightOption && availables.push(lightOption), -1 !== darkOption && availables.push(darkOption);
      return DynamicColor.tonePrefersLightForeground(bgTone1) || DynamicColor.tonePrefersLightForeground(bgTone2) ? lightOption < 0 ? 100 : lightOption : 1 === availables.length ? availables[0] : darkOption < 0 ? 0 : darkOption;
    }
  }
}

class ColorCalculationDelegateImpl2025 {
  getHct(scheme, color) {
    const palette = color.palette(scheme), tone = color.getTone(scheme), hue = palette.hue, chroma = palette.chroma * (color.chromaMultiplier ? color.chromaMultiplier(scheme) : 1);
    return Hct.from(hue, chroma, tone);
  }
  getTone(scheme, color) {
    const toneDeltaPair = color.toneDeltaPair ? color.toneDeltaPair(scheme) : void 0;
    if (toneDeltaPair) {
      const roleA = toneDeltaPair.roleA, roleB = toneDeltaPair.roleB, polarity = toneDeltaPair.polarity, constraint = toneDeltaPair.constraint, absoluteDelta = "darker" === polarity || "relative_lighter" === polarity && scheme.isDark || "relative_darker" === polarity && !scheme.isDark ? -toneDeltaPair.delta : toneDeltaPair.delta, amRoleA = color.name === roleA.name, refRole = amRoleA ? roleB : roleA;
      let selfTone = (amRoleA ? roleA : roleB).tone(scheme), refTone = refRole.getTone(scheme);
      const relativeDelta = absoluteDelta * (amRoleA ? 1 : -1);
      if ("exact" === constraint ? selfTone = clampDouble(0, 100, refTone + relativeDelta) : "nearer" === constraint ? selfTone = clampDouble(0, 100, relativeDelta > 0 ? clampDouble(refTone, refTone + relativeDelta, selfTone) : clampDouble(refTone + relativeDelta, refTone, selfTone)) : "farther" === constraint && (selfTone = relativeDelta > 0 ? clampDouble(refTone + relativeDelta, 100, selfTone) : clampDouble(0, refTone + relativeDelta, selfTone)), 
      color.background && color.contrastCurve) {
        const background = color.background(scheme), contrastCurve = color.contrastCurve(scheme);
        if (background && contrastCurve) {
          const bgTone = background.getTone(scheme), selfContrast = contrastCurve.get(scheme.contrastLevel);
          selfTone = Contrast.ratioOfTones(bgTone, selfTone) >= selfContrast && scheme.contrastLevel >= 0 ? selfTone : DynamicColor.foregroundTone(bgTone, selfContrast);
        }
      }
      return color.isBackground && !color.name.endsWith("_fixed_dim") && (selfTone = selfTone >= 57 ? clampDouble(65, 100, selfTone) : clampDouble(0, 49, selfTone)), 
      selfTone;
    }
    {
      let answer = color.tone(scheme);
      if (null == color.background || void 0 === color.background(scheme) || null == color.contrastCurve || void 0 === color.contrastCurve(scheme)) return answer;
      const bgTone = color.background(scheme).getTone(scheme), desiredRatio = color.contrastCurve(scheme).get(scheme.contrastLevel);
      if (answer = Contrast.ratioOfTones(bgTone, answer) >= desiredRatio && scheme.contrastLevel >= 0 ? answer : DynamicColor.foregroundTone(bgTone, desiredRatio), 
      color.isBackground && !color.name.endsWith("_fixed_dim") && (answer = answer >= 57 ? clampDouble(65, 100, answer) : clampDouble(0, 49, answer)), 
      null == color.secondBackground || void 0 === color.secondBackground(scheme)) return answer;
      const [bg1, bg2] = [ color.background, color.secondBackground ], [bgTone1, bgTone2] = [ bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme) ], [upper, lower] = [ Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2) ];
      if (Contrast.ratioOfTones(upper, answer) >= desiredRatio && Contrast.ratioOfTones(lower, answer) >= desiredRatio) return answer;
      const lightOption = Contrast.lighter(upper, desiredRatio), darkOption = Contrast.darker(lower, desiredRatio), availables = [];
      -1 !== lightOption && availables.push(lightOption), -1 !== darkOption && availables.push(darkOption);
      return DynamicColor.tonePrefersLightForeground(bgTone1) || DynamicColor.tonePrefersLightForeground(bgTone2) ? lightOption < 0 ? 100 : lightOption : 1 === availables.length ? availables[0] : darkOption < 0 ? 0 : darkOption;
    }
  }
}

const spec2021$1 = new ColorCalculationDelegateImpl2021, spec2025$1 = new ColorCalculationDelegateImpl2025;

function getSpec$1(specVersion) {
  return "2025" === specVersion ? spec2025$1 : spec2021$1;
}

class TonalPalette {
  static fromInt(argb) {
    const hct = Hct.fromInt(argb);
    return TonalPalette.fromHct(hct);
  }
  static fromHct(hct) {
    return new TonalPalette(hct.hue, hct.chroma, hct);
  }
  static fromHueAndChroma(hue, chroma) {
    const keyColor = new KeyColor(hue, chroma).create();
    return new TonalPalette(hue, chroma, keyColor);
  }
  constructor(hue, chroma, keyColor) {
    this.hue = hue, this.chroma = chroma, this.keyColor = keyColor, this.cache = new Map;
  }
  tone(tone) {
    let argb = this.cache.get(tone);
    return void 0 === argb && (argb = 99 == tone && Hct.isYellow(this.hue) ? this.averageArgb(this.tone(98), this.tone(100)) : Hct.from(this.hue, this.chroma, tone).toInt(), 
    this.cache.set(tone, argb)), argb;
  }
  getHct(tone) {
    return Hct.fromInt(this.tone(tone));
  }
  averageArgb(argb1, argb2) {
    const red1 = argb1 >>> 16 & 255, green1 = argb1 >>> 8 & 255, blue1 = 255 & argb1, red2 = argb2 >>> 16 & 255, green2 = argb2 >>> 8 & 255, blue2 = 255 & argb2;
    return (255 << 24 | (255 & Math.round((red1 + red2) / 2)) << 16 | (255 & Math.round((green1 + green2) / 2)) << 8 | 255 & Math.round((blue1 + blue2) / 2)) >>> 0;
  }
}

class KeyColor {
  constructor(hue, requestedChroma) {
    this.hue = hue, this.requestedChroma = requestedChroma, this.chromaCache = new Map, 
    this.maxChromaValue = 200;
  }
  create() {
    let lowerTone = 0, upperTone = 100;
    for (;lowerTone < upperTone; ) {
      const midTone = Math.floor((lowerTone + upperTone) / 2), isAscending = this.maxChroma(midTone) < this.maxChroma(midTone + 1);
      if (this.maxChroma(midTone) >= this.requestedChroma - .01) if (Math.abs(lowerTone - 50) < Math.abs(upperTone - 50)) upperTone = midTone; else {
        if (lowerTone === midTone) return Hct.from(this.hue, this.requestedChroma, lowerTone);
        lowerTone = midTone;
      } else isAscending ? lowerTone = midTone + 1 : upperTone = midTone;
    }
    return Hct.from(this.hue, this.requestedChroma, lowerTone);
  }
  maxChroma(tone) {
    if (this.chromaCache.has(tone)) return this.chromaCache.get(tone);
    const chroma = Hct.from(this.hue, this.maxChromaValue, tone).chroma;
    return this.chromaCache.set(tone, chroma), chroma;
  }
}

class TemperatureCache {
  constructor(input) {
    this.input = input, this.hctsByTempCache = [], this.hctsByHueCache = [], this.tempsByHctCache = new Map, 
    this.inputRelativeTemperatureCache = -1, this.complementCache = null;
  }
  get hctsByTemp() {
    if (this.hctsByTempCache.length > 0) return this.hctsByTempCache;
    const hcts = this.hctsByHue.concat([ this.input ]), temperaturesByHct = this.tempsByHct;
    return hcts.sort(((a, b) => temperaturesByHct.get(a) - temperaturesByHct.get(b))), 
    this.hctsByTempCache = hcts, hcts;
  }
  get warmest() {
    return this.hctsByTemp[this.hctsByTemp.length - 1];
  }
  get coldest() {
    return this.hctsByTemp[0];
  }
  analogous(count = 5, divisions = 12) {
    const startHue = Math.round(this.input.hue), startHct = this.hctsByHue[startHue];
    let lastTemp = this.relativeTemperature(startHct);
    const allColors = [ startHct ];
    let absoluteTotalTempDelta = 0;
    for (let i = 0; i < 360; i++) {
      const hue = sanitizeDegreesInt(startHue + i), hct = this.hctsByHue[hue], temp = this.relativeTemperature(hct), tempDelta = Math.abs(temp - lastTemp);
      lastTemp = temp, absoluteTotalTempDelta += tempDelta;
    }
    let hueAddend = 1;
    const tempStep = absoluteTotalTempDelta / divisions;
    let totalTempDelta = 0;
    for (lastTemp = this.relativeTemperature(startHct); allColors.length < divisions; ) {
      const hue = sanitizeDegreesInt(startHue + hueAddend), hct = this.hctsByHue[hue], temp = this.relativeTemperature(hct);
      totalTempDelta += Math.abs(temp - lastTemp);
      let indexSatisfied = totalTempDelta >= allColors.length * tempStep, indexAddend = 1;
      for (;indexSatisfied && allColors.length < divisions; ) {
        allColors.push(hct);
        indexSatisfied = totalTempDelta >= (allColors.length + indexAddend) * tempStep, 
        indexAddend++;
      }
      if (lastTemp = temp, hueAddend++, hueAddend > 360) {
        for (;allColors.length < divisions; ) allColors.push(hct);
        break;
      }
    }
    const answers = [ this.input ], increaseHueCount = Math.floor((count - 1) / 2);
    for (let i = 1; i < increaseHueCount + 1; i++) {
      let index = 0 - i;
      for (;index < 0; ) index = allColors.length + index;
      index >= allColors.length && (index %= allColors.length), answers.splice(0, 0, allColors[index]);
    }
    const decreaseHueCount = count - increaseHueCount - 1;
    for (let i = 1; i < decreaseHueCount + 1; i++) {
      let index = i;
      for (;index < 0; ) index = allColors.length + index;
      index >= allColors.length && (index %= allColors.length), answers.push(allColors[index]);
    }
    return answers;
  }
  get complement() {
    if (null != this.complementCache) return this.complementCache;
    const coldestHue = this.coldest.hue, coldestTemp = this.tempsByHct.get(this.coldest), warmestHue = this.warmest.hue, range = this.tempsByHct.get(this.warmest) - coldestTemp, startHueIsColdestToWarmest = TemperatureCache.isBetween(this.input.hue, coldestHue, warmestHue), startHue = startHueIsColdestToWarmest ? warmestHue : coldestHue, endHue = startHueIsColdestToWarmest ? coldestHue : warmestHue;
    let smallestError = 1e3, answer = this.hctsByHue[Math.round(this.input.hue)];
    const complementRelativeTemp = 1 - this.inputRelativeTemperature;
    for (let hueAddend = 0; hueAddend <= 360; hueAddend += 1) {
      const hue = sanitizeDegreesDouble(startHue + 1 * hueAddend);
      if (!TemperatureCache.isBetween(hue, startHue, endHue)) continue;
      const possibleAnswer = this.hctsByHue[Math.round(hue)], relativeTemp = (this.tempsByHct.get(possibleAnswer) - coldestTemp) / range, error = Math.abs(complementRelativeTemp - relativeTemp);
      error < smallestError && (smallestError = error, answer = possibleAnswer);
    }
    return this.complementCache = answer, this.complementCache;
  }
  relativeTemperature(hct) {
    const range = this.tempsByHct.get(this.warmest) - this.tempsByHct.get(this.coldest), differenceFromColdest = this.tempsByHct.get(hct) - this.tempsByHct.get(this.coldest);
    return 0 === range ? .5 : differenceFromColdest / range;
  }
  get inputRelativeTemperature() {
    return this.inputRelativeTemperatureCache >= 0 || (this.inputRelativeTemperatureCache = this.relativeTemperature(this.input)), 
    this.inputRelativeTemperatureCache;
  }
  get tempsByHct() {
    if (this.tempsByHctCache.size > 0) return this.tempsByHctCache;
    const allHcts = this.hctsByHue.concat([ this.input ]), temperaturesByHct = new Map;
    for (const e of allHcts) temperaturesByHct.set(e, TemperatureCache.rawTemperature(e));
    return this.tempsByHctCache = temperaturesByHct, temperaturesByHct;
  }
  get hctsByHue() {
    if (this.hctsByHueCache.length > 0) return this.hctsByHueCache;
    const hcts = [];
    for (let hue = 0; hue <= 360; hue += 1) {
      const colorAtHue = Hct.from(hue, this.input.chroma, this.input.tone);
      hcts.push(colorAtHue);
    }
    return this.hctsByHueCache = hcts, this.hctsByHueCache;
  }
  static isBetween(angle, a, b) {
    return a < b ? a <= angle && angle <= b : a <= angle || angle <= b;
  }
  static rawTemperature(color) {
    const lab = labFromArgb(color.toInt()), hue = sanitizeDegreesDouble(180 * Math.atan2(lab[2], lab[1]) / Math.PI), chroma = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
    return .02 * Math.pow(chroma, 1.07) * Math.cos(sanitizeDegreesDouble(hue - 50) * Math.PI / 180) - .5;
  }
}

class ContrastCurve {
  constructor(low, normal, medium, high) {
    this.low = low, this.normal = normal, this.medium = medium, this.high = high;
  }
  get(contrastLevel) {
    return contrastLevel <= -1 ? this.low : contrastLevel < 0 ? lerp(this.low, this.normal, (contrastLevel - -1) / 1) : contrastLevel < .5 ? lerp(this.normal, this.medium, (contrastLevel - 0) / .5) : contrastLevel < 1 ? lerp(this.medium, this.high, (contrastLevel - .5) / .5) : this.high;
  }
}

class ToneDeltaPair {
  constructor(roleA, roleB, delta, polarity, stayTogether, constraint) {
    this.roleA = roleA, this.roleB = roleB, this.delta = delta, this.polarity = polarity, 
    this.stayTogether = stayTogether, this.constraint = constraint, this.constraint = constraint ?? "exact";
  }
}

var Variant;

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

!function(Variant) {
  Variant[Variant.MONOCHROME = 0] = "MONOCHROME", Variant[Variant.NEUTRAL = 1] = "NEUTRAL", 
  Variant[Variant.TONAL_SPOT = 2] = "TONAL_SPOT", Variant[Variant.VIBRANT = 3] = "VIBRANT", 
  Variant[Variant.EXPRESSIVE = 4] = "EXPRESSIVE", Variant[Variant.FIDELITY = 5] = "FIDELITY", 
  Variant[Variant.CONTENT = 6] = "CONTENT", Variant[Variant.RAINBOW = 7] = "RAINBOW", 
  Variant[Variant.FRUIT_SALAD = 8] = "FRUIT_SALAD";
}(Variant || (Variant = {}));

class ColorSpecDelegateImpl2021 {
  primaryPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "primary_palette_key_color",
      palette: s => s.primaryPalette,
      tone: s => s.primaryPalette.keyColor.tone
    });
  }
  secondaryPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "secondary_palette_key_color",
      palette: s => s.secondaryPalette,
      tone: s => s.secondaryPalette.keyColor.tone
    });
  }
  tertiaryPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "tertiary_palette_key_color",
      palette: s => s.tertiaryPalette,
      tone: s => s.tertiaryPalette.keyColor.tone
    });
  }
  neutralPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "neutral_palette_key_color",
      palette: s => s.neutralPalette,
      tone: s => s.neutralPalette.keyColor.tone
    });
  }
  neutralVariantPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "neutral_variant_palette_key_color",
      palette: s => s.neutralVariantPalette,
      tone: s => s.neutralVariantPalette.keyColor.tone
    });
  }
  errorPaletteKeyColor() {
    return DynamicColor.fromPalette({
      name: "error_palette_key_color",
      palette: s => s.errorPalette,
      tone: s => s.errorPalette.keyColor.tone
    });
  }
  background() {
    return DynamicColor.fromPalette({
      name: "background",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  onBackground() {
    return DynamicColor.fromPalette({
      name: "on_background",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 90 : 10,
      background: s => this.background(),
      contrastCurve: s => new ContrastCurve(3, 3, 4.5, 7)
    });
  }
  surface() {
    return DynamicColor.fromPalette({
      name: "surface",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  surfaceDim() {
    return DynamicColor.fromPalette({
      name: "surface_dim",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 6 : new ContrastCurve(87, 87, 80, 75).get(s.contrastLevel),
      isBackground: !0
    });
  }
  surfaceBright() {
    return DynamicColor.fromPalette({
      name: "surface_bright",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(24, 24, 29, 34).get(s.contrastLevel) : 98,
      isBackground: !0
    });
  }
  surfaceContainerLowest() {
    return DynamicColor.fromPalette({
      name: "surface_container_lowest",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(4, 4, 2, 0).get(s.contrastLevel) : 100,
      isBackground: !0
    });
  }
  surfaceContainerLow() {
    return DynamicColor.fromPalette({
      name: "surface_container_low",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(10, 10, 11, 12).get(s.contrastLevel) : new ContrastCurve(96, 96, 96, 95).get(s.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainer() {
    return DynamicColor.fromPalette({
      name: "surface_container",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(12, 12, 16, 20).get(s.contrastLevel) : new ContrastCurve(94, 94, 92, 90).get(s.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHigh() {
    return DynamicColor.fromPalette({
      name: "surface_container_high",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(17, 17, 21, 25).get(s.contrastLevel) : new ContrastCurve(92, 92, 88, 85).get(s.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHighest() {
    return DynamicColor.fromPalette({
      name: "surface_container_highest",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? new ContrastCurve(22, 22, 26, 30).get(s.contrastLevel) : new ContrastCurve(90, 90, 84, 80).get(s.contrastLevel),
      isBackground: !0
    });
  }
  onSurface() {
    return DynamicColor.fromPalette({
      name: "on_surface",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 90 : 10,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  surfaceVariant() {
    return DynamicColor.fromPalette({
      name: "surface_variant",
      palette: s => s.neutralVariantPalette,
      tone: s => s.isDark ? 30 : 90,
      isBackground: !0
    });
  }
  onSurfaceVariant() {
    return DynamicColor.fromPalette({
      name: "on_surface_variant",
      palette: s => s.neutralVariantPalette,
      tone: s => s.isDark ? 80 : 30,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  inverseSurface() {
    return DynamicColor.fromPalette({
      name: "inverse_surface",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 90 : 20,
      isBackground: !0
    });
  }
  inverseOnSurface() {
    return DynamicColor.fromPalette({
      name: "inverse_on_surface",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 20 : 95,
      background: s => this.inverseSurface(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  outline() {
    return DynamicColor.fromPalette({
      name: "outline",
      palette: s => s.neutralVariantPalette,
      tone: s => s.isDark ? 60 : 50,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1.5, 3, 4.5, 7)
    });
  }
  outlineVariant() {
    return DynamicColor.fromPalette({
      name: "outline_variant",
      palette: s => s.neutralVariantPalette,
      tone: s => s.isDark ? 30 : 80,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5)
    });
  }
  shadow() {
    return DynamicColor.fromPalette({
      name: "shadow",
      palette: s => s.neutralPalette,
      tone: s => 0
    });
  }
  scrim() {
    return DynamicColor.fromPalette({
      name: "scrim",
      palette: s => s.neutralPalette,
      tone: s => 0
    });
  }
  surfaceTint() {
    return DynamicColor.fromPalette({
      name: "surface_tint",
      palette: s => s.primaryPalette,
      tone: s => s.isDark ? 80 : 40,
      isBackground: !0
    });
  }
  primary() {
    return DynamicColor.fromPalette({
      name: "primary",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 100 : 0 : s.isDark ? 80 : 40,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 7),
      toneDeltaPair: s => new ToneDeltaPair(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  primaryDim() {}
  onPrimary() {
    return DynamicColor.fromPalette({
      name: "on_primary",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 10 : 90 : s.isDark ? 20 : 100,
      background: s => this.primary(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  primaryContainer() {
    return DynamicColor.fromPalette({
      name: "primary_container",
      palette: s => s.primaryPalette,
      tone: s => isFidelity(s) ? s.sourceColorHct.tone : isMonochrome(s) ? s.isDark ? 85 : 25 : s.isDark ? 30 : 90,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  onPrimaryContainer() {
    return DynamicColor.fromPalette({
      name: "on_primary_container",
      palette: s => s.primaryPalette,
      tone: s => isFidelity(s) ? DynamicColor.foregroundTone(this.primaryContainer().tone(s), 4.5) : isMonochrome(s) ? s.isDark ? 0 : 100 : s.isDark ? 90 : 30,
      background: s => this.primaryContainer(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  inversePrimary() {
    return DynamicColor.fromPalette({
      name: "inverse_primary",
      palette: s => s.primaryPalette,
      tone: s => s.isDark ? 40 : 80,
      background: s => this.inverseSurface(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 7)
    });
  }
  secondary() {
    return DynamicColor.fromPalette({
      name: "secondary",
      palette: s => s.secondaryPalette,
      tone: s => s.isDark ? 80 : 40,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 7),
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  secondaryDim() {}
  onSecondary() {
    return DynamicColor.fromPalette({
      name: "on_secondary",
      palette: s => s.secondaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 10 : 100 : s.isDark ? 20 : 100,
      background: s => this.secondary(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  secondaryContainer() {
    return DynamicColor.fromPalette({
      name: "secondary_container",
      palette: s => s.secondaryPalette,
      tone: s => {
        const initialTone = s.isDark ? 30 : 90;
        return isMonochrome(s) ? s.isDark ? 30 : 85 : isFidelity(s) ? findDesiredChromaByTone(s.secondaryPalette.hue, s.secondaryPalette.chroma, initialTone, !s.isDark) : initialTone;
      },
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  onSecondaryContainer() {
    return DynamicColor.fromPalette({
      name: "on_secondary_container",
      palette: s => s.secondaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 90 : 10 : isFidelity(s) ? DynamicColor.foregroundTone(this.secondaryContainer().tone(s), 4.5) : s.isDark ? 90 : 30,
      background: s => this.secondaryContainer(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  tertiary() {
    return DynamicColor.fromPalette({
      name: "tertiary",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 90 : 25 : s.isDark ? 80 : 40,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 7),
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  tertiaryDim() {}
  onTertiary() {
    return DynamicColor.fromPalette({
      name: "on_tertiary",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 10 : 90 : s.isDark ? 20 : 100,
      background: s => this.tertiary(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  tertiaryContainer() {
    return DynamicColor.fromPalette({
      name: "tertiary_container",
      palette: s => s.tertiaryPalette,
      tone: s => {
        if (isMonochrome(s)) return s.isDark ? 60 : 49;
        if (!isFidelity(s)) return s.isDark ? 30 : 90;
        const proposedHct = s.tertiaryPalette.getHct(s.sourceColorHct.tone);
        return DislikeAnalyzer.fixIfDisliked(proposedHct).tone;
      },
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  onTertiaryContainer() {
    return DynamicColor.fromPalette({
      name: "on_tertiary_container",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 0 : 100 : isFidelity(s) ? DynamicColor.foregroundTone(this.tertiaryContainer().tone(s), 4.5) : s.isDark ? 90 : 30,
      background: s => this.tertiaryContainer(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  error() {
    return DynamicColor.fromPalette({
      name: "error",
      palette: s => s.errorPalette,
      tone: s => s.isDark ? 80 : 40,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 7),
      toneDeltaPair: s => new ToneDeltaPair(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  errorDim() {}
  onError() {
    return DynamicColor.fromPalette({
      name: "on_error",
      palette: s => s.errorPalette,
      tone: s => s.isDark ? 20 : 100,
      background: s => this.error(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  errorContainer() {
    return DynamicColor.fromPalette({
      name: "error_container",
      palette: s => s.errorPalette,
      tone: s => s.isDark ? 30 : 90,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  onErrorContainer() {
    return DynamicColor.fromPalette({
      name: "on_error_container",
      palette: s => s.errorPalette,
      tone: s => isMonochrome(s) ? s.isDark ? 90 : 10 : s.isDark ? 90 : 30,
      background: s => this.errorContainer(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  primaryFixed() {
    return DynamicColor.fromPalette({
      name: "primary_fixed",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? 40 : 90,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  primaryFixedDim() {
    return DynamicColor.fromPalette({
      name: "primary_fixed_dim",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? 30 : 80,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  onPrimaryFixed() {
    return DynamicColor.fromPalette({
      name: "on_primary_fixed",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? 100 : 10,
      background: s => this.primaryFixedDim(),
      secondBackground: s => this.primaryFixed(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  onPrimaryFixedVariant() {
    return DynamicColor.fromPalette({
      name: "on_primary_fixed_variant",
      palette: s => s.primaryPalette,
      tone: s => isMonochrome(s) ? 90 : 30,
      background: s => this.primaryFixedDim(),
      secondBackground: s => this.primaryFixed(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  secondaryFixed() {
    return DynamicColor.fromPalette({
      name: "secondary_fixed",
      palette: s => s.secondaryPalette,
      tone: s => isMonochrome(s) ? 80 : 90,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  secondaryFixedDim() {
    return DynamicColor.fromPalette({
      name: "secondary_fixed_dim",
      palette: s => s.secondaryPalette,
      tone: s => isMonochrome(s) ? 70 : 80,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  onSecondaryFixed() {
    return DynamicColor.fromPalette({
      name: "on_secondary_fixed",
      palette: s => s.secondaryPalette,
      tone: s => 10,
      background: s => this.secondaryFixedDim(),
      secondBackground: s => this.secondaryFixed(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  onSecondaryFixedVariant() {
    return DynamicColor.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: s => s.secondaryPalette,
      tone: s => isMonochrome(s) ? 25 : 30,
      background: s => this.secondaryFixedDim(),
      secondBackground: s => this.secondaryFixed(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  tertiaryFixed() {
    return DynamicColor.fromPalette({
      name: "tertiary_fixed",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? 40 : 90,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  tertiaryFixedDim() {
    return DynamicColor.fromPalette({
      name: "tertiary_fixed_dim",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? 30 : 80,
      isBackground: !0,
      background: s => this.highestSurface(s),
      contrastCurve: s => new ContrastCurve(1, 1, 3, 4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  onTertiaryFixed() {
    return DynamicColor.fromPalette({
      name: "on_tertiary_fixed",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? 100 : 10,
      background: s => this.tertiaryFixedDim(),
      secondBackground: s => this.tertiaryFixed(),
      contrastCurve: s => new ContrastCurve(4.5, 7, 11, 21)
    });
  }
  onTertiaryFixedVariant() {
    return DynamicColor.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: s => s.tertiaryPalette,
      tone: s => isMonochrome(s) ? 90 : 30,
      background: s => this.tertiaryFixedDim(),
      secondBackground: s => this.tertiaryFixed(),
      contrastCurve: s => new ContrastCurve(3, 4.5, 7, 11)
    });
  }
  highestSurface(s) {
    return s.isDark ? this.surfaceBright() : this.surfaceDim();
  }
}

function tMaxC(palette, lowerBound = 0, upperBound = 100, chromaMultiplier = 1) {
  return clampDouble(lowerBound, upperBound, findBestToneForChroma(palette.hue, palette.chroma * chromaMultiplier, 100, !0));
}

function tMinC(palette, lowerBound = 0, upperBound = 100) {
  return clampDouble(lowerBound, upperBound, findBestToneForChroma(palette.hue, palette.chroma, 0, !1));
}

function findBestToneForChroma(hue, chroma, tone, byDecreasingTone) {
  let answer = tone, bestCandidate = Hct.from(hue, chroma, answer);
  for (;bestCandidate.chroma < chroma && !(tone < 0 || tone > 100); ) {
    tone += byDecreasingTone ? -1 : 1;
    const newCandidate = Hct.from(hue, chroma, tone);
    bestCandidate.chroma < newCandidate.chroma && (bestCandidate = newCandidate, answer = tone);
  }
  return answer;
}

function getCurve(defaultContrast) {
  return 1.5 === defaultContrast ? new ContrastCurve(1.5, 1.5, 3, 4.5) : 3 === defaultContrast ? new ContrastCurve(3, 3, 4.5, 7) : 4.5 === defaultContrast ? new ContrastCurve(4.5, 4.5, 7, 11) : 6 === defaultContrast ? new ContrastCurve(6, 6, 7, 11) : 7 === defaultContrast ? new ContrastCurve(7, 7, 11, 21) : 9 === defaultContrast ? new ContrastCurve(9, 9, 11, 21) : 11 === defaultContrast ? new ContrastCurve(11, 11, 21, 21) : 21 === defaultContrast ? new ContrastCurve(21, 21, 21, 21) : new ContrastCurve(defaultContrast, defaultContrast, 7, 21);
}

class ColorSpecDelegateImpl2025 extends ColorSpecDelegateImpl2021 {
  surface() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface",
      palette: s => s.neutralPalette,
      tone: s => (super.surface().tone(s), "phone" === s.platform ? s.isDark ? 4 : Hct.isYellow(s.neutralPalette.hue) ? 99 : s.variant === Variant.VIBRANT ? 97 : 98 : 0),
      isBackground: !0
    });
    return extendSpecVersion(super.surface(), "2025", color2025);
  }
  surfaceDim() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_dim",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 4 : Hct.isYellow(s.neutralPalette.hue) ? 90 : s.variant === Variant.VIBRANT ? 85 : 87,
      isBackground: !0,
      chromaMultiplier: s => {
        if (!s.isDark) {
          if (s.variant === Variant.NEUTRAL) return 2.5;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? 2.7 : 1.75;
          if (s.variant === Variant.VIBRANT) return 1.36;
        }
        return 1;
      }
    });
    return extendSpecVersion(super.surfaceDim(), "2025", color2025);
  }
  surfaceBright() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_bright",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 18 : Hct.isYellow(s.neutralPalette.hue) ? 99 : s.variant === Variant.VIBRANT ? 97 : 98,
      isBackground: !0,
      chromaMultiplier: s => {
        if (s.isDark) {
          if (s.variant === Variant.NEUTRAL) return 2.5;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? 2.7 : 1.75;
          if (s.variant === Variant.VIBRANT) return 1.36;
        }
        return 1;
      }
    });
    return extendSpecVersion(super.surfaceBright(), "2025", color2025);
  }
  surfaceContainerLowest() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_container_lowest",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 0 : 100,
      isBackground: !0
    });
    return extendSpecVersion(super.surfaceContainerLowest(), "2025", color2025);
  }
  surfaceContainerLow() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_container_low",
      palette: s => s.neutralPalette,
      tone: s => "phone" === s.platform ? s.isDark ? 6 : Hct.isYellow(s.neutralPalette.hue) ? 98 : s.variant === Variant.VIBRANT ? 95 : 96 : 15,
      isBackground: !0,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 1.3;
          if (s.variant === Variant.TONAL_SPOT) return 1.25;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? 1.3 : 1.15;
          if (s.variant === Variant.VIBRANT) return 1.08;
        }
        return 1;
      }
    });
    return extendSpecVersion(super.surfaceContainerLow(), "2025", color2025);
  }
  surfaceContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_container",
      palette: s => s.neutralPalette,
      tone: s => "phone" === s.platform ? s.isDark ? 9 : Hct.isYellow(s.neutralPalette.hue) ? 96 : s.variant === Variant.VIBRANT ? 92 : 94 : 20,
      isBackground: !0,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 1.6;
          if (s.variant === Variant.TONAL_SPOT) return 1.4;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? 1.6 : 1.3;
          if (s.variant === Variant.VIBRANT) return 1.15;
        }
        return 1;
      }
    });
    return extendSpecVersion(super.surfaceContainer(), "2025", color2025);
  }
  surfaceContainerHigh() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_container_high",
      palette: s => s.neutralPalette,
      tone: s => "phone" === s.platform ? s.isDark ? 12 : Hct.isYellow(s.neutralPalette.hue) ? 94 : s.variant === Variant.VIBRANT ? 90 : 92 : 25,
      isBackground: !0,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 1.9;
          if (s.variant === Variant.TONAL_SPOT) return 1.5;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? 1.95 : 1.45;
          if (s.variant === Variant.VIBRANT) return 1.22;
        }
        return 1;
      }
    });
    return extendSpecVersion(super.surfaceContainerHigh(), "2025", color2025);
  }
  surfaceContainerHighest() {
    const color2025 = DynamicColor.fromPalette({
      name: "surface_container_highest",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 15 : Hct.isYellow(s.neutralPalette.hue) ? 92 : s.variant === Variant.VIBRANT ? 88 : 90,
      isBackground: !0,
      chromaMultiplier: s => s.variant === Variant.NEUTRAL ? 2.2 : s.variant === Variant.TONAL_SPOT ? 1.7 : s.variant === Variant.EXPRESSIVE ? Hct.isYellow(s.neutralPalette.hue) ? 2.3 : 1.6 : s.variant === Variant.VIBRANT ? 1.29 : 1
    });
    return extendSpecVersion(super.surfaceContainerHighest(), "2025", color2025);
  }
  onSurface() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_surface",
      palette: s => s.neutralPalette,
      tone: s => s.variant === Variant.VIBRANT ? tMaxC(s.neutralPalette, 0, 100, 1.1) : DynamicColor.getInitialToneFromBackground((s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh()))(s),
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 2.2;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? s.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => s.isDark ? getCurve(11) : getCurve(9)
    });
    return extendSpecVersion(super.onSurface(), "2025", color2025);
  }
  onSurfaceVariant() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_surface_variant",
      palette: s => s.neutralPalette,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 2.2;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? s.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? s.isDark ? getCurve(6) : getCurve(4.5) : getCurve(7)
    });
    return extendSpecVersion(super.onSurfaceVariant(), "2025", color2025);
  }
  outline() {
    const color2025 = DynamicColor.fromPalette({
      name: "outline",
      palette: s => s.neutralPalette,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 2.2;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? s.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(3) : getCurve(4.5)
    });
    return extendSpecVersion(super.outline(), "2025", color2025);
  }
  outlineVariant() {
    const color2025 = DynamicColor.fromPalette({
      name: "outline_variant",
      palette: s => s.neutralPalette,
      chromaMultiplier: s => {
        if ("phone" === s.platform) {
          if (s.variant === Variant.NEUTRAL) return 2.2;
          if (s.variant === Variant.TONAL_SPOT) return 1.7;
          if (s.variant === Variant.EXPRESSIVE) return Hct.isYellow(s.neutralPalette.hue) ? s.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(1.5) : getCurve(3)
    });
    return extendSpecVersion(super.outlineVariant(), "2025", color2025);
  }
  inverseSurface() {
    const color2025 = DynamicColor.fromPalette({
      name: "inverse_surface",
      palette: s => s.neutralPalette,
      tone: s => s.isDark ? 98 : 4,
      isBackground: !0
    });
    return extendSpecVersion(super.inverseSurface(), "2025", color2025);
  }
  inverseOnSurface() {
    const color2025 = DynamicColor.fromPalette({
      name: "inverse_on_surface",
      palette: s => s.neutralPalette,
      background: s => this.inverseSurface(),
      contrastCurve: s => getCurve(7)
    });
    return extendSpecVersion(super.inverseOnSurface(), "2025", color2025);
  }
  primary() {
    const color2025 = DynamicColor.fromPalette({
      name: "primary",
      palette: s => s.primaryPalette,
      tone: s => s.variant === Variant.NEUTRAL ? "phone" === s.platform ? s.isDark ? 80 : 40 : 90 : s.variant === Variant.TONAL_SPOT ? "phone" === s.platform ? s.isDark ? 80 : tMaxC(s.primaryPalette) : tMaxC(s.primaryPalette, 0, 90) : s.variant === Variant.EXPRESSIVE ? tMaxC(s.primaryPalette, 0, Hct.isYellow(s.primaryPalette.hue) ? 25 : Hct.isCyan(s.primaryPalette.hue) ? 88 : 98) : tMaxC(s.primaryPalette, 0, Hct.isCyan(s.primaryPalette.hue) ? 88 : 98),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(4.5) : getCurve(7),
      toneDeltaPair: s => "phone" === s.platform ? new ToneDeltaPair(this.primaryContainer(), this.primary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return extendSpecVersion(super.primary(), "2025", color2025);
  }
  primaryDim() {
    return DynamicColor.fromPalette({
      name: "primary_dim",
      palette: s => s.primaryPalette,
      tone: s => s.variant === Variant.NEUTRAL ? 85 : s.variant === Variant.TONAL_SPOT ? tMaxC(s.primaryPalette, 0, 90) : tMaxC(s.primaryPalette),
      isBackground: !0,
      background: s => this.surfaceContainerHigh(),
      contrastCurve: s => getCurve(4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.primaryDim(), this.primary(), 5, "darker", !0, "farther")
    });
  }
  onPrimary() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_primary",
      palette: s => s.primaryPalette,
      background: s => "phone" === s.platform ? this.primary() : this.primaryDim(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onPrimary(), "2025", color2025);
  }
  primaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "primary_container",
      palette: s => s.primaryPalette,
      tone: s => "watch" === s.platform ? 30 : s.variant === Variant.NEUTRAL ? s.isDark ? 30 : 90 : s.variant === Variant.TONAL_SPOT ? s.isDark ? tMinC(s.primaryPalette, 35, 93) : tMaxC(s.primaryPalette, 0, 90) : s.variant === Variant.EXPRESSIVE ? s.isDark ? tMaxC(s.primaryPalette, 30, 93) : tMaxC(s.primaryPalette, 78, Hct.isCyan(s.primaryPalette.hue) ? 88 : 90) : s.isDark ? tMinC(s.primaryPalette, 66, 93) : tMaxC(s.primaryPalette, 66, Hct.isCyan(s.primaryPalette.hue) ? 88 : 93),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      toneDeltaPair: s => "phone" === s.platform ? void 0 : new ToneDeltaPair(this.primaryContainer(), this.primaryDim(), 10, "darker", !0, "farther"),
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.primaryContainer(), "2025", color2025);
  }
  onPrimaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_primary_container",
      palette: s => s.primaryPalette,
      background: s => this.primaryContainer(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onPrimaryContainer(), "2025", color2025);
  }
  primaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "primary_fixed",
      palette: s => s.primaryPalette,
      tone: s => {
        let tempS = Object.assign({}, s, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.primaryContainer().getTone(tempS);
      },
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.primaryFixed(), "2025", color2025);
  }
  primaryFixedDim() {
    const color2025 = DynamicColor.fromPalette({
      name: "primary_fixed_dim",
      palette: s => s.primaryPalette,
      tone: s => this.primaryFixed().getTone(s),
      isBackground: !0,
      toneDeltaPair: s => new ToneDeltaPair(this.primaryFixedDim(), this.primaryFixed(), 5, "darker", !0, "exact")
    });
    return extendSpecVersion(super.primaryFixedDim(), "2025", color2025);
  }
  onPrimaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_primary_fixed",
      palette: s => s.primaryPalette,
      background: s => this.primaryFixedDim(),
      contrastCurve: s => getCurve(7)
    });
    return extendSpecVersion(super.onPrimaryFixed(), "2025", color2025);
  }
  onPrimaryFixedVariant() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_primary_fixed_variant",
      palette: s => s.primaryPalette,
      background: s => this.primaryFixedDim(),
      contrastCurve: s => getCurve(4.5)
    });
    return extendSpecVersion(super.onPrimaryFixedVariant(), "2025", color2025);
  }
  inversePrimary() {
    const color2025 = DynamicColor.fromPalette({
      name: "inverse_primary",
      palette: s => s.primaryPalette,
      tone: s => tMaxC(s.primaryPalette),
      background: s => this.inverseSurface(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.inversePrimary(), "2025", color2025);
  }
  secondary() {
    const color2025 = DynamicColor.fromPalette({
      name: "secondary",
      palette: s => s.secondaryPalette,
      tone: s => "watch" === s.platform ? s.variant === Variant.NEUTRAL ? 90 : tMaxC(s.secondaryPalette, 0, 90) : s.variant === Variant.NEUTRAL ? s.isDark ? tMinC(s.secondaryPalette, 0, 98) : tMaxC(s.secondaryPalette) : s.variant === Variant.VIBRANT ? tMaxC(s.secondaryPalette, 0, s.isDark ? 90 : 98) : s.isDark ? 80 : tMaxC(s.secondaryPalette),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(4.5) : getCurve(7),
      toneDeltaPair: s => "phone" === s.platform ? new ToneDeltaPair(this.secondaryContainer(), this.secondary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return extendSpecVersion(super.secondary(), "2025", color2025);
  }
  secondaryDim() {
    return DynamicColor.fromPalette({
      name: "secondary_dim",
      palette: s => s.secondaryPalette,
      tone: s => s.variant === Variant.NEUTRAL ? 85 : tMaxC(s.secondaryPalette, 0, 90),
      isBackground: !0,
      background: s => this.surfaceContainerHigh(),
      contrastCurve: s => getCurve(4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryDim(), this.secondary(), 5, "darker", !0, "farther")
    });
  }
  onSecondary() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_secondary",
      palette: s => s.secondaryPalette,
      background: s => "phone" === s.platform ? this.secondary() : this.secondaryDim(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onSecondary(), "2025", color2025);
  }
  secondaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "secondary_container",
      palette: s => s.secondaryPalette,
      tone: s => "watch" === s.platform ? 30 : s.variant === Variant.VIBRANT ? s.isDark ? tMinC(s.secondaryPalette, 30, 40) : tMaxC(s.secondaryPalette, 84, 90) : s.variant === Variant.EXPRESSIVE ? s.isDark ? 15 : tMaxC(s.secondaryPalette, 90, 95) : s.isDark ? 25 : 90,
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      toneDeltaPair: s => "watch" === s.platform ? new ToneDeltaPair(this.secondaryContainer(), this.secondaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.secondaryContainer(), "2025", color2025);
  }
  onSecondaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_secondary_container",
      palette: s => s.secondaryPalette,
      background: s => this.secondaryContainer(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onSecondaryContainer(), "2025", color2025);
  }
  secondaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "secondary_fixed",
      palette: s => s.secondaryPalette,
      tone: s => {
        let tempS = Object.assign({}, s, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.secondaryContainer().getTone(tempS);
      },
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.secondaryFixed(), "2025", color2025);
  }
  secondaryFixedDim() {
    const color2025 = DynamicColor.fromPalette({
      name: "secondary_fixed_dim",
      palette: s => s.secondaryPalette,
      tone: s => this.secondaryFixed().getTone(s),
      isBackground: !0,
      toneDeltaPair: s => new ToneDeltaPair(this.secondaryFixedDim(), this.secondaryFixed(), 5, "darker", !0, "exact")
    });
    return extendSpecVersion(super.secondaryFixedDim(), "2025", color2025);
  }
  onSecondaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_secondary_fixed",
      palette: s => s.secondaryPalette,
      background: s => this.secondaryFixedDim(),
      contrastCurve: s => getCurve(7)
    });
    return extendSpecVersion(super.onSecondaryFixed(), "2025", color2025);
  }
  onSecondaryFixedVariant() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: s => s.secondaryPalette,
      background: s => this.secondaryFixedDim(),
      contrastCurve: s => getCurve(4.5)
    });
    return extendSpecVersion(super.onSecondaryFixedVariant(), "2025", color2025);
  }
  tertiary() {
    const color2025 = DynamicColor.fromPalette({
      name: "tertiary",
      palette: s => s.tertiaryPalette,
      tone: s => "watch" === s.platform ? s.variant === Variant.TONAL_SPOT ? tMaxC(s.tertiaryPalette, 0, 90) : tMaxC(s.tertiaryPalette) : s.variant === Variant.EXPRESSIVE || s.variant === Variant.VIBRANT ? tMaxC(s.tertiaryPalette, 0, Hct.isCyan(s.tertiaryPalette.hue) ? 88 : s.isDark ? 98 : 100) : s.isDark ? tMaxC(s.tertiaryPalette, 0, 98) : tMaxC(s.tertiaryPalette),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(4.5) : getCurve(7),
      toneDeltaPair: s => "phone" === s.platform ? new ToneDeltaPair(this.tertiaryContainer(), this.tertiary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return extendSpecVersion(super.tertiary(), "2025", color2025);
  }
  tertiaryDim() {
    return DynamicColor.fromPalette({
      name: "tertiary_dim",
      palette: s => s.tertiaryPalette,
      tone: s => s.variant === Variant.TONAL_SPOT ? tMaxC(s.tertiaryPalette, 0, 90) : tMaxC(s.tertiaryPalette),
      isBackground: !0,
      background: s => this.surfaceContainerHigh(),
      contrastCurve: s => getCurve(4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryDim(), this.tertiary(), 5, "darker", !0, "farther")
    });
  }
  onTertiary() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_tertiary",
      palette: s => s.tertiaryPalette,
      background: s => "phone" === s.platform ? this.tertiary() : this.tertiaryDim(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onTertiary(), "2025", color2025);
  }
  tertiaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "tertiary_container",
      palette: s => s.tertiaryPalette,
      tone: s => "watch" === s.platform ? s.variant === Variant.TONAL_SPOT ? tMaxC(s.tertiaryPalette, 0, 90) : tMaxC(s.tertiaryPalette) : s.variant === Variant.NEUTRAL ? s.isDark ? tMaxC(s.tertiaryPalette, 0, 93) : tMaxC(s.tertiaryPalette, 0, 96) : s.variant === Variant.TONAL_SPOT ? tMaxC(s.tertiaryPalette, 0, s.isDark ? 93 : 100) : s.variant === Variant.EXPRESSIVE ? tMaxC(s.tertiaryPalette, 75, Hct.isCyan(s.tertiaryPalette.hue) ? 88 : s.isDark ? 93 : 100) : s.isDark ? tMaxC(s.tertiaryPalette, 0, 93) : tMaxC(s.tertiaryPalette, 72, 100),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      toneDeltaPair: s => "watch" === s.platform ? new ToneDeltaPair(this.tertiaryContainer(), this.tertiaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.tertiaryContainer(), "2025", color2025);
  }
  onTertiaryContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_tertiary_container",
      palette: s => s.tertiaryPalette,
      background: s => this.tertiaryContainer(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onTertiaryContainer(), "2025", color2025);
  }
  tertiaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "tertiary_fixed",
      palette: s => s.tertiaryPalette,
      tone: s => {
        let tempS = Object.assign({}, s, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.tertiaryContainer().getTone(tempS);
      },
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.tertiaryFixed(), "2025", color2025);
  }
  tertiaryFixedDim() {
    const color2025 = DynamicColor.fromPalette({
      name: "tertiary_fixed_dim",
      palette: s => s.tertiaryPalette,
      tone: s => this.tertiaryFixed().getTone(s),
      isBackground: !0,
      toneDeltaPair: s => new ToneDeltaPair(this.tertiaryFixedDim(), this.tertiaryFixed(), 5, "darker", !0, "exact")
    });
    return extendSpecVersion(super.tertiaryFixedDim(), "2025", color2025);
  }
  onTertiaryFixed() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_tertiary_fixed",
      palette: s => s.tertiaryPalette,
      background: s => this.tertiaryFixedDim(),
      contrastCurve: s => getCurve(7)
    });
    return extendSpecVersion(super.onTertiaryFixed(), "2025", color2025);
  }
  onTertiaryFixedVariant() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: s => s.tertiaryPalette,
      background: s => this.tertiaryFixedDim(),
      contrastCurve: s => getCurve(4.5)
    });
    return extendSpecVersion(super.onTertiaryFixedVariant(), "2025", color2025);
  }
  error() {
    const color2025 = DynamicColor.fromPalette({
      name: "error",
      palette: s => s.errorPalette,
      tone: s => "phone" === s.platform ? s.isDark ? tMinC(s.errorPalette, 0, 98) : tMaxC(s.errorPalette) : tMinC(s.errorPalette),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : this.surfaceContainerHigh(),
      contrastCurve: s => "phone" === s.platform ? getCurve(4.5) : getCurve(7),
      toneDeltaPair: s => "phone" === s.platform ? new ToneDeltaPair(this.errorContainer(), this.error(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return extendSpecVersion(super.error(), "2025", color2025);
  }
  errorDim() {
    return DynamicColor.fromPalette({
      name: "error_dim",
      palette: s => s.errorPalette,
      tone: s => tMinC(s.errorPalette),
      isBackground: !0,
      background: s => this.surfaceContainerHigh(),
      contrastCurve: s => getCurve(4.5),
      toneDeltaPair: s => new ToneDeltaPair(this.errorDim(), this.error(), 5, "darker", !0, "farther")
    });
  }
  onError() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_error",
      palette: s => s.errorPalette,
      background: s => "phone" === s.platform ? this.error() : this.errorDim(),
      contrastCurve: s => "phone" === s.platform ? getCurve(6) : getCurve(7)
    });
    return extendSpecVersion(super.onError(), "2025", color2025);
  }
  errorContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "error_container",
      palette: s => s.errorPalette,
      tone: s => "watch" === s.platform ? 30 : s.isDark ? tMinC(s.errorPalette, 30, 93) : tMaxC(s.errorPalette, 0, 90),
      isBackground: !0,
      background: s => "phone" === s.platform ? this.highestSurface(s) : void 0,
      toneDeltaPair: s => "watch" === s.platform ? new ToneDeltaPair(this.errorContainer(), this.errorDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: s => "phone" === s.platform && s.contrastLevel > 0 ? getCurve(1.5) : void 0
    });
    return extendSpecVersion(super.errorContainer(), "2025", color2025);
  }
  onErrorContainer() {
    const color2025 = DynamicColor.fromPalette({
      name: "on_error_container",
      palette: s => s.errorPalette,
      background: s => this.errorContainer(),
      contrastCurve: s => "phone" === s.platform ? getCurve(4.5) : getCurve(7)
    });
    return extendSpecVersion(super.onErrorContainer(), "2025", color2025);
  }
  surfaceVariant() {
    const color2025 = Object.assign(this.surfaceContainerHighest().clone(), {
      name: "surface_variant"
    });
    return extendSpecVersion(super.surfaceVariant(), "2025", color2025);
  }
  surfaceTint() {
    const color2025 = Object.assign(this.primary().clone(), {
      name: "surface_tint"
    });
    return extendSpecVersion(super.surfaceTint(), "2025", color2025);
  }
  background() {
    const color2025 = Object.assign(this.surface().clone(), {
      name: "background"
    });
    return extendSpecVersion(super.background(), "2025", color2025);
  }
  onBackground() {
    const color2025 = Object.assign(this.onSurface().clone(), {
      name: "on_background"
    });
    return extendSpecVersion(super.onBackground(), "2025", color2025);
  }
}

class MaterialDynamicColors {
  constructor() {
    this.allColors = [ this.background(), this.onBackground(), this.surface(), this.surfaceDim(), this.surfaceBright(), this.surfaceContainerLowest(), this.surfaceContainerLow(), this.surfaceContainer(), this.surfaceContainerHigh(), this.surfaceContainerHighest(), this.onSurface(), this.onSurfaceVariant(), this.outline(), this.outlineVariant(), this.inverseSurface(), this.inverseOnSurface(), this.primary(), this.primaryDim(), this.onPrimary(), this.primaryContainer(), this.onPrimaryContainer(), this.primaryFixed(), this.primaryFixedDim(), this.onPrimaryFixed(), this.onPrimaryFixedVariant(), this.inversePrimary(), this.secondary(), this.secondaryDim(), this.onSecondary(), this.secondaryContainer(), this.onSecondaryContainer(), this.secondaryFixed(), this.secondaryFixedDim(), this.onSecondaryFixed(), this.onSecondaryFixedVariant(), this.tertiary(), this.tertiaryDim(), this.onTertiary(), this.tertiaryContainer(), this.onTertiaryContainer(), this.tertiaryFixed(), this.tertiaryFixedDim(), this.onTertiaryFixed(), this.onTertiaryFixedVariant(), this.error(), this.errorDim(), this.onError(), this.errorContainer(), this.onErrorContainer() ].filter((c => void 0 !== c));
  }
  highestSurface(s) {
    return MaterialDynamicColors.colorSpec.highestSurface(s);
  }
  primaryPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.primaryPaletteKeyColor();
  }
  secondaryPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.secondaryPaletteKeyColor();
  }
  tertiaryPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.tertiaryPaletteKeyColor();
  }
  neutralPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.neutralPaletteKeyColor();
  }
  neutralVariantPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.neutralVariantPaletteKeyColor();
  }
  errorPaletteKeyColor() {
    return MaterialDynamicColors.colorSpec.errorPaletteKeyColor();
  }
  background() {
    return MaterialDynamicColors.colorSpec.background();
  }
  onBackground() {
    return MaterialDynamicColors.colorSpec.onBackground();
  }
  surface() {
    return MaterialDynamicColors.colorSpec.surface();
  }
  surfaceDim() {
    return MaterialDynamicColors.colorSpec.surfaceDim();
  }
  surfaceBright() {
    return MaterialDynamicColors.colorSpec.surfaceBright();
  }
  surfaceContainerLowest() {
    return MaterialDynamicColors.colorSpec.surfaceContainerLowest();
  }
  surfaceContainerLow() {
    return MaterialDynamicColors.colorSpec.surfaceContainerLow();
  }
  surfaceContainer() {
    return MaterialDynamicColors.colorSpec.surfaceContainer();
  }
  surfaceContainerHigh() {
    return MaterialDynamicColors.colorSpec.surfaceContainerHigh();
  }
  surfaceContainerHighest() {
    return MaterialDynamicColors.colorSpec.surfaceContainerHighest();
  }
  onSurface() {
    return MaterialDynamicColors.colorSpec.onSurface();
  }
  surfaceVariant() {
    return MaterialDynamicColors.colorSpec.surfaceVariant();
  }
  onSurfaceVariant() {
    return MaterialDynamicColors.colorSpec.onSurfaceVariant();
  }
  outline() {
    return MaterialDynamicColors.colorSpec.outline();
  }
  outlineVariant() {
    return MaterialDynamicColors.colorSpec.outlineVariant();
  }
  inverseSurface() {
    return MaterialDynamicColors.colorSpec.inverseSurface();
  }
  inverseOnSurface() {
    return MaterialDynamicColors.colorSpec.inverseOnSurface();
  }
  shadow() {
    return MaterialDynamicColors.colorSpec.shadow();
  }
  scrim() {
    return MaterialDynamicColors.colorSpec.scrim();
  }
  surfaceTint() {
    return MaterialDynamicColors.colorSpec.surfaceTint();
  }
  primary() {
    return MaterialDynamicColors.colorSpec.primary();
  }
  primaryDim() {
    return MaterialDynamicColors.colorSpec.primaryDim();
  }
  onPrimary() {
    return MaterialDynamicColors.colorSpec.onPrimary();
  }
  primaryContainer() {
    return MaterialDynamicColors.colorSpec.primaryContainer();
  }
  onPrimaryContainer() {
    return MaterialDynamicColors.colorSpec.onPrimaryContainer();
  }
  inversePrimary() {
    return MaterialDynamicColors.colorSpec.inversePrimary();
  }
  primaryFixed() {
    return MaterialDynamicColors.colorSpec.primaryFixed();
  }
  primaryFixedDim() {
    return MaterialDynamicColors.colorSpec.primaryFixedDim();
  }
  onPrimaryFixed() {
    return MaterialDynamicColors.colorSpec.onPrimaryFixed();
  }
  onPrimaryFixedVariant() {
    return MaterialDynamicColors.colorSpec.onPrimaryFixedVariant();
  }
  secondary() {
    return MaterialDynamicColors.colorSpec.secondary();
  }
  secondaryDim() {
    return MaterialDynamicColors.colorSpec.secondaryDim();
  }
  onSecondary() {
    return MaterialDynamicColors.colorSpec.onSecondary();
  }
  secondaryContainer() {
    return MaterialDynamicColors.colorSpec.secondaryContainer();
  }
  onSecondaryContainer() {
    return MaterialDynamicColors.colorSpec.onSecondaryContainer();
  }
  secondaryFixed() {
    return MaterialDynamicColors.colorSpec.secondaryFixed();
  }
  secondaryFixedDim() {
    return MaterialDynamicColors.colorSpec.secondaryFixedDim();
  }
  onSecondaryFixed() {
    return MaterialDynamicColors.colorSpec.onSecondaryFixed();
  }
  onSecondaryFixedVariant() {
    return MaterialDynamicColors.colorSpec.onSecondaryFixedVariant();
  }
  tertiary() {
    return MaterialDynamicColors.colorSpec.tertiary();
  }
  tertiaryDim() {
    return MaterialDynamicColors.colorSpec.tertiaryDim();
  }
  onTertiary() {
    return MaterialDynamicColors.colorSpec.onTertiary();
  }
  tertiaryContainer() {
    return MaterialDynamicColors.colorSpec.tertiaryContainer();
  }
  onTertiaryContainer() {
    return MaterialDynamicColors.colorSpec.onTertiaryContainer();
  }
  tertiaryFixed() {
    return MaterialDynamicColors.colorSpec.tertiaryFixed();
  }
  tertiaryFixedDim() {
    return MaterialDynamicColors.colorSpec.tertiaryFixedDim();
  }
  onTertiaryFixed() {
    return MaterialDynamicColors.colorSpec.onTertiaryFixed();
  }
  onTertiaryFixedVariant() {
    return MaterialDynamicColors.colorSpec.onTertiaryFixedVariant();
  }
  error() {
    return MaterialDynamicColors.colorSpec.error();
  }
  errorDim() {
    return MaterialDynamicColors.colorSpec.errorDim();
  }
  onError() {
    return MaterialDynamicColors.colorSpec.onError();
  }
  errorContainer() {
    return MaterialDynamicColors.colorSpec.errorContainer();
  }
  onErrorContainer() {
    return MaterialDynamicColors.colorSpec.onErrorContainer();
  }
  static highestSurface(s) {
    return MaterialDynamicColors.colorSpec.highestSurface(s);
  }
}

MaterialDynamicColors.contentAccentToneDelta = 15, MaterialDynamicColors.colorSpec = new ColorSpecDelegateImpl2025, 
MaterialDynamicColors.primaryPaletteKeyColor = MaterialDynamicColors.colorSpec.primaryPaletteKeyColor(), 
MaterialDynamicColors.secondaryPaletteKeyColor = MaterialDynamicColors.colorSpec.secondaryPaletteKeyColor(), 
MaterialDynamicColors.tertiaryPaletteKeyColor = MaterialDynamicColors.colorSpec.tertiaryPaletteKeyColor(), 
MaterialDynamicColors.neutralPaletteKeyColor = MaterialDynamicColors.colorSpec.neutralPaletteKeyColor(), 
MaterialDynamicColors.neutralVariantPaletteKeyColor = MaterialDynamicColors.colorSpec.neutralVariantPaletteKeyColor(), 
MaterialDynamicColors.background = MaterialDynamicColors.colorSpec.background(), 
MaterialDynamicColors.onBackground = MaterialDynamicColors.colorSpec.onBackground(), 
MaterialDynamicColors.surface = MaterialDynamicColors.colorSpec.surface(), MaterialDynamicColors.surfaceDim = MaterialDynamicColors.colorSpec.surfaceDim(), 
MaterialDynamicColors.surfaceBright = MaterialDynamicColors.colorSpec.surfaceBright(), 
MaterialDynamicColors.surfaceContainerLowest = MaterialDynamicColors.colorSpec.surfaceContainerLowest(), 
MaterialDynamicColors.surfaceContainerLow = MaterialDynamicColors.colorSpec.surfaceContainerLow(), 
MaterialDynamicColors.surfaceContainer = MaterialDynamicColors.colorSpec.surfaceContainer(), 
MaterialDynamicColors.surfaceContainerHigh = MaterialDynamicColors.colorSpec.surfaceContainerHigh(), 
MaterialDynamicColors.surfaceContainerHighest = MaterialDynamicColors.colorSpec.surfaceContainerHighest(), 
MaterialDynamicColors.onSurface = MaterialDynamicColors.colorSpec.onSurface(), MaterialDynamicColors.surfaceVariant = MaterialDynamicColors.colorSpec.surfaceVariant(), 
MaterialDynamicColors.onSurfaceVariant = MaterialDynamicColors.colorSpec.onSurfaceVariant(), 
MaterialDynamicColors.inverseSurface = MaterialDynamicColors.colorSpec.inverseSurface(), 
MaterialDynamicColors.inverseOnSurface = MaterialDynamicColors.colorSpec.inverseOnSurface(), 
MaterialDynamicColors.outline = MaterialDynamicColors.colorSpec.outline(), MaterialDynamicColors.outlineVariant = MaterialDynamicColors.colorSpec.outlineVariant(), 
MaterialDynamicColors.shadow = MaterialDynamicColors.colorSpec.shadow(), MaterialDynamicColors.scrim = MaterialDynamicColors.colorSpec.scrim(), 
MaterialDynamicColors.surfaceTint = MaterialDynamicColors.colorSpec.surfaceTint(), 
MaterialDynamicColors.primary = MaterialDynamicColors.colorSpec.primary(), MaterialDynamicColors.onPrimary = MaterialDynamicColors.colorSpec.onPrimary(), 
MaterialDynamicColors.primaryContainer = MaterialDynamicColors.colorSpec.primaryContainer(), 
MaterialDynamicColors.onPrimaryContainer = MaterialDynamicColors.colorSpec.onPrimaryContainer(), 
MaterialDynamicColors.inversePrimary = MaterialDynamicColors.colorSpec.inversePrimary(), 
MaterialDynamicColors.secondary = MaterialDynamicColors.colorSpec.secondary(), MaterialDynamicColors.onSecondary = MaterialDynamicColors.colorSpec.onSecondary(), 
MaterialDynamicColors.secondaryContainer = MaterialDynamicColors.colorSpec.secondaryContainer(), 
MaterialDynamicColors.onSecondaryContainer = MaterialDynamicColors.colorSpec.onSecondaryContainer(), 
MaterialDynamicColors.tertiary = MaterialDynamicColors.colorSpec.tertiary(), MaterialDynamicColors.onTertiary = MaterialDynamicColors.colorSpec.onTertiary(), 
MaterialDynamicColors.tertiaryContainer = MaterialDynamicColors.colorSpec.tertiaryContainer(), 
MaterialDynamicColors.onTertiaryContainer = MaterialDynamicColors.colorSpec.onTertiaryContainer(), 
MaterialDynamicColors.error = MaterialDynamicColors.colorSpec.error(), MaterialDynamicColors.onError = MaterialDynamicColors.colorSpec.onError(), 
MaterialDynamicColors.errorContainer = MaterialDynamicColors.colorSpec.errorContainer(), 
MaterialDynamicColors.onErrorContainer = MaterialDynamicColors.colorSpec.onErrorContainer(), 
MaterialDynamicColors.primaryFixed = MaterialDynamicColors.colorSpec.primaryFixed(), 
MaterialDynamicColors.primaryFixedDim = MaterialDynamicColors.colorSpec.primaryFixedDim(), 
MaterialDynamicColors.onPrimaryFixed = MaterialDynamicColors.colorSpec.onPrimaryFixed(), 
MaterialDynamicColors.onPrimaryFixedVariant = MaterialDynamicColors.colorSpec.onPrimaryFixedVariant(), 
MaterialDynamicColors.secondaryFixed = MaterialDynamicColors.colorSpec.secondaryFixed(), 
MaterialDynamicColors.secondaryFixedDim = MaterialDynamicColors.colorSpec.secondaryFixedDim(), 
MaterialDynamicColors.onSecondaryFixed = MaterialDynamicColors.colorSpec.onSecondaryFixed(), 
MaterialDynamicColors.onSecondaryFixedVariant = MaterialDynamicColors.colorSpec.onSecondaryFixedVariant(), 
MaterialDynamicColors.tertiaryFixed = MaterialDynamicColors.colorSpec.tertiaryFixed(), 
MaterialDynamicColors.tertiaryFixedDim = MaterialDynamicColors.colorSpec.tertiaryFixedDim(), 
MaterialDynamicColors.onTertiaryFixed = MaterialDynamicColors.colorSpec.onTertiaryFixed(), 
MaterialDynamicColors.onTertiaryFixedVariant = MaterialDynamicColors.colorSpec.onTertiaryFixedVariant();

class DynamicScheme {
  constructor(args) {
    this.sourceColorArgb = args.sourceColorHct.toInt(), this.variant = args.variant, 
    this.contrastLevel = args.contrastLevel, this.isDark = args.isDark, this.platform = args.platform ?? "phone", 
    this.specVersion = args.specVersion ?? "2021", this.sourceColorHct = args.sourceColorHct, 
    this.primaryPalette = args.primaryPalette ?? getSpec(this.specVersion).getPrimaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel), 
    this.secondaryPalette = args.secondaryPalette ?? getSpec(this.specVersion).getSecondaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel), 
    this.tertiaryPalette = args.tertiaryPalette ?? getSpec(this.specVersion).getTertiaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel), 
    this.neutralPalette = args.neutralPalette ?? getSpec(this.specVersion).getNeutralPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel), 
    this.neutralVariantPalette = args.neutralVariantPalette ?? getSpec(this.specVersion).getNeutralVariantPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel), 
    this.errorPalette = args.errorPalette ?? getSpec(this.specVersion).getErrorPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel) ?? TonalPalette.fromHueAndChroma(25, 84), 
    this.colors = new MaterialDynamicColors;
  }
  toString() {
    return `Scheme: variant=${Variant[this.variant]}, mode=${this.isDark ? "dark" : "light"}, platform=${this.platform}, contrastLevel=${this.contrastLevel.toFixed(1)}, seed=${this.sourceColorHct.toString()}, specVersion=${this.specVersion}`;
  }
  static getPiecewiseHue(sourceColorHct, hueBreakpoints, hues) {
    const size = Math.min(hueBreakpoints.length - 1, hues.length), sourceHue = sourceColorHct.hue;
    for (let i = 0; i < size; i++) if (sourceHue >= hueBreakpoints[i] && sourceHue < hueBreakpoints[i + 1]) return sanitizeDegreesDouble(hues[i]);
    return sourceHue;
  }
  static getRotatedHue(sourceColorHct, hueBreakpoints, rotations) {
    let rotation = DynamicScheme.getPiecewiseHue(sourceColorHct, hueBreakpoints, rotations);
    return Math.min(hueBreakpoints.length - 1, rotations.length) <= 0 && (rotation = 0), 
    sanitizeDegreesDouble(sourceColorHct.hue + rotation);
  }
  getArgb(dynamicColor) {
    return dynamicColor.getArgb(this);
  }
  getHct(dynamicColor) {
    return dynamicColor.getHct(this);
  }
  get primaryPaletteKeyColor() {
    return this.getArgb(this.colors.primaryPaletteKeyColor());
  }
  get secondaryPaletteKeyColor() {
    return this.getArgb(this.colors.secondaryPaletteKeyColor());
  }
  get tertiaryPaletteKeyColor() {
    return this.getArgb(this.colors.tertiaryPaletteKeyColor());
  }
  get neutralPaletteKeyColor() {
    return this.getArgb(this.colors.neutralPaletteKeyColor());
  }
  get neutralVariantPaletteKeyColor() {
    return this.getArgb(this.colors.neutralVariantPaletteKeyColor());
  }
  get errorPaletteKeyColor() {
    return this.getArgb(this.colors.errorPaletteKeyColor());
  }
  get background() {
    return this.getArgb(this.colors.background());
  }
  get onBackground() {
    return this.getArgb(this.colors.onBackground());
  }
  get surface() {
    return this.getArgb(this.colors.surface());
  }
  get surfaceDim() {
    return this.getArgb(this.colors.surfaceDim());
  }
  get surfaceBright() {
    return this.getArgb(this.colors.surfaceBright());
  }
  get surfaceContainerLowest() {
    return this.getArgb(this.colors.surfaceContainerLowest());
  }
  get surfaceContainerLow() {
    return this.getArgb(this.colors.surfaceContainerLow());
  }
  get surfaceContainer() {
    return this.getArgb(this.colors.surfaceContainer());
  }
  get surfaceContainerHigh() {
    return this.getArgb(this.colors.surfaceContainerHigh());
  }
  get surfaceContainerHighest() {
    return this.getArgb(this.colors.surfaceContainerHighest());
  }
  get onSurface() {
    return this.getArgb(this.colors.onSurface());
  }
  get surfaceVariant() {
    return this.getArgb(this.colors.surfaceVariant());
  }
  get onSurfaceVariant() {
    return this.getArgb(this.colors.onSurfaceVariant());
  }
  get inverseSurface() {
    return this.getArgb(this.colors.inverseSurface());
  }
  get inverseOnSurface() {
    return this.getArgb(this.colors.inverseOnSurface());
  }
  get outline() {
    return this.getArgb(this.colors.outline());
  }
  get outlineVariant() {
    return this.getArgb(this.colors.outlineVariant());
  }
  get shadow() {
    return this.getArgb(this.colors.shadow());
  }
  get scrim() {
    return this.getArgb(this.colors.scrim());
  }
  get surfaceTint() {
    return this.getArgb(this.colors.surfaceTint());
  }
  get primary() {
    return this.getArgb(this.colors.primary());
  }
  get primaryDim() {
    const primaryDim = this.colors.primaryDim();
    if (void 0 === primaryDim) throw new Error("`primaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(primaryDim);
  }
  get onPrimary() {
    return this.getArgb(this.colors.onPrimary());
  }
  get primaryContainer() {
    return this.getArgb(this.colors.primaryContainer());
  }
  get onPrimaryContainer() {
    return this.getArgb(this.colors.onPrimaryContainer());
  }
  get primaryFixed() {
    return this.getArgb(this.colors.primaryFixed());
  }
  get primaryFixedDim() {
    return this.getArgb(this.colors.primaryFixedDim());
  }
  get onPrimaryFixed() {
    return this.getArgb(this.colors.onPrimaryFixed());
  }
  get onPrimaryFixedVariant() {
    return this.getArgb(this.colors.onPrimaryFixedVariant());
  }
  get inversePrimary() {
    return this.getArgb(this.colors.inversePrimary());
  }
  get secondary() {
    return this.getArgb(this.colors.secondary());
  }
  get secondaryDim() {
    const secondaryDim = this.colors.secondaryDim();
    if (void 0 === secondaryDim) throw new Error("`secondaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(secondaryDim);
  }
  get onSecondary() {
    return this.getArgb(this.colors.onSecondary());
  }
  get secondaryContainer() {
    return this.getArgb(this.colors.secondaryContainer());
  }
  get onSecondaryContainer() {
    return this.getArgb(this.colors.onSecondaryContainer());
  }
  get secondaryFixed() {
    return this.getArgb(this.colors.secondaryFixed());
  }
  get secondaryFixedDim() {
    return this.getArgb(this.colors.secondaryFixedDim());
  }
  get onSecondaryFixed() {
    return this.getArgb(this.colors.onSecondaryFixed());
  }
  get onSecondaryFixedVariant() {
    return this.getArgb(this.colors.onSecondaryFixedVariant());
  }
  get tertiary() {
    return this.getArgb(this.colors.tertiary());
  }
  get tertiaryDim() {
    const tertiaryDim = this.colors.tertiaryDim();
    if (void 0 === tertiaryDim) throw new Error("`tertiaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(tertiaryDim);
  }
  get onTertiary() {
    return this.getArgb(this.colors.onTertiary());
  }
  get tertiaryContainer() {
    return this.getArgb(this.colors.tertiaryContainer());
  }
  get onTertiaryContainer() {
    return this.getArgb(this.colors.onTertiaryContainer());
  }
  get tertiaryFixed() {
    return this.getArgb(this.colors.tertiaryFixed());
  }
  get tertiaryFixedDim() {
    return this.getArgb(this.colors.tertiaryFixedDim());
  }
  get onTertiaryFixed() {
    return this.getArgb(this.colors.onTertiaryFixed());
  }
  get onTertiaryFixedVariant() {
    return this.getArgb(this.colors.onTertiaryFixedVariant());
  }
  get error() {
    return this.getArgb(this.colors.error());
  }
  get errorDim() {
    const errorDim = this.colors.errorDim();
    if (void 0 === errorDim) throw new Error("`errorDim` color is undefined prior to 2025 spec.");
    return this.getArgb(errorDim);
  }
  get onError() {
    return this.getArgb(this.colors.onError());
  }
  get errorContainer() {
    return this.getArgb(this.colors.errorContainer());
  }
  get onErrorContainer() {
    return this.getArgb(this.colors.onErrorContainer());
  }
}

DynamicScheme.DEFAULT_SPEC_VERSION = "2021", DynamicScheme.DEFAULT_PLATFORM = "phone";

class DynamicSchemePalettesDelegateImpl2021 {
  getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.CONTENT:
     case Variant.FIDELITY:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma);

     case Variant.FRUIT_SALAD:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue - 50), 48);

     case Variant.MONOCHROME:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12);

     case Variant.RAINBOW:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 48);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 240), 40);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200);

     default:
      throw new Error(`Unsupported variant: ${variant}`);
    }
  }
  getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.CONTENT:
     case Variant.FIDELITY:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32, .5 * sourceColorHct.chroma));

     case Variant.FRUIT_SALAD:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue - 50), 36);

     case Variant.MONOCHROME:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8);

     case Variant.RAINBOW:
     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 21, 51, 121, 151, 191, 271, 321, 360 ], [ 45, 95, 45, 20, 45, 90, 45, 45, 45 ]), 24);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 41, 61, 101, 131, 181, 251, 301, 360 ], [ 18, 15, 10, 12, 15, 18, 15, 12, 12 ]), 24);

     default:
      throw new Error(`Unsupported variant: ${variant}`);
    }
  }
  getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.CONTENT:
      return TonalPalette.fromHct(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).analogous(3, 6)[2]));

     case Variant.FIDELITY:
      return TonalPalette.fromHct(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).complement));

     case Variant.FRUIT_SALAD:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36);

     case Variant.MONOCHROME:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);

     case Variant.RAINBOW:
     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 60), 24);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 21, 51, 121, 151, 191, 271, 321, 360 ], [ 120, 120, 20, 45, 20, 15, 20, 120, 120 ]), 32);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 41, 61, 101, 131, 181, 251, 301, 360 ], [ 35, 30, 20, 25, 30, 35, 30, 25, 25 ]), 32);

     default:
      throw new Error(`Unsupported variant: ${variant}`);
    }
  }
  getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.CONTENT:
     case Variant.FIDELITY:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8);

     case Variant.FRUIT_SALAD:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10);

     case Variant.MONOCHROME:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2);

     case Variant.RAINBOW:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 15), 8);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10);

     default:
      throw new Error(`Unsupported variant: ${variant}`);
    }
  }
  getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.CONTENT:
     case Variant.FIDELITY:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8 + 4);

     case Variant.FRUIT_SALAD:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);

     case Variant.MONOCHROME:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2);

     case Variant.RAINBOW:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 15), 12);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12);

     default:
      throw new Error(`Unsupported variant: ${variant}`);
    }
  }
  getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {}
}

class DynamicSchemePalettesDelegateImpl2025 extends DynamicSchemePalettesDelegateImpl2021 {
  getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? Hct.isBlue(sourceColorHct.hue) ? 12 : 8 : Hct.isBlue(sourceColorHct.hue) ? 16 : 12);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform && isDark ? 26 : 32);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? isDark ? 36 : 48 : 40);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? 74 : 56);

     default:
      return super.getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
  getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? Hct.isBlue(sourceColorHct.hue) ? 6 : 4 : Hct.isBlue(sourceColorHct.hue) ? 10 : 6);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 105, 140, 204, 253, 278, 300, 333, 360 ], [ -160, 155, -100, 96, -96, -156, -165, -160 ]), "phone" === platform && isDark ? 16 : 24);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 38, 105, 140, 333, 360 ], [ -14, 10, -14, 10, -14 ]), "phone" === platform ? 56 : 36);

     default:
      return super.getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
  getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 38, 105, 161, 204, 278, 333, 360 ], [ -32, 26, 10, -39, 24, -15, -32 ]), "phone" === platform ? 20 : 36);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 20, 71, 161, 333, 360 ], [ -40, 48, -32, 40, -32 ]), "phone" === platform ? 28 : 32);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 105, 140, 204, 253, 278, 300, 333, 360 ], [ -165, 160, -105, 101, -101, -160, -170, -165 ]), 48);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 38, 71, 105, 140, 161, 253, 333, 360 ], [ -72, 35, 24, -24, 62, 50, 62, -72 ]), 56);

     default:
      return super.getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
  static getExpressiveNeutralHue(sourceColorHct) {
    return DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 71, 124, 253, 278, 300, 360 ], [ 10, 0, 10, 0, 10, 0 ]);
  }
  static getExpressiveNeutralChroma(sourceColorHct, isDark, platform) {
    const neutralHue = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct);
    return "phone" === platform ? isDark ? Hct.isYellow(neutralHue) ? 6 : 14 : 18 : 12;
  }
  static getVibrantNeutralHue(sourceColorHct) {
    return DynamicScheme.getRotatedHue(sourceColorHct, [ 0, 38, 105, 140, 333, 360 ], [ -14, 10, -14, 10, -14 ]);
  }
  static getVibrantNeutralChroma(sourceColorHct, platform) {
    const neutralHue = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct);
    return "phone" === platform || Hct.isBlue(neutralHue) ? 28 : 20;
  }
  getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? 1.4 : 6);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, "phone" === platform ? 5 : 10);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct), DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralChroma(sourceColorHct, isDark, platform));

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct), DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralChroma(sourceColorHct, platform));

     default:
      return super.getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
  getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.2 * ("phone" === platform ? 1.4 : 6));

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 1.7 * ("phone" === platform ? 5 : 10));

     case Variant.EXPRESSIVE:
      const expressiveNeutralHue = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct), expressiveNeutralChroma = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralChroma(sourceColorHct, isDark, platform);
      return TonalPalette.fromHueAndChroma(expressiveNeutralHue, expressiveNeutralChroma * (expressiveNeutralHue >= 105 && expressiveNeutralHue < 125 ? 1.6 : 2.3));

     case Variant.VIBRANT:
      const vibrantNeutralHue = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct), vibrantNeutralChroma = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralChroma(sourceColorHct, platform);
      return TonalPalette.fromHueAndChroma(vibrantNeutralHue, 1.29 * vibrantNeutralChroma);

     default:
      return super.getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
  getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
    const errorHue = DynamicScheme.getPiecewiseHue(sourceColorHct, [ 0, 3, 13, 23, 33, 43, 153, 273, 360 ], [ 12, 22, 32, 12, 22, 32, 22, 12 ]);
    switch (variant) {
     case Variant.NEUTRAL:
      return TonalPalette.fromHueAndChroma(errorHue, "phone" === platform ? 50 : 40);

     case Variant.TONAL_SPOT:
      return TonalPalette.fromHueAndChroma(errorHue, "phone" === platform ? 60 : 48);

     case Variant.EXPRESSIVE:
      return TonalPalette.fromHueAndChroma(errorHue, "phone" === platform ? 64 : 48);

     case Variant.VIBRANT:
      return TonalPalette.fromHueAndChroma(errorHue, "phone" === platform ? 80 : 60);

     default:
      return super.getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
    }
  }
}

const spec2021 = new DynamicSchemePalettesDelegateImpl2021, spec2025 = new DynamicSchemePalettesDelegateImpl2025;

function getSpec(specVersion) {
  return "2025" === specVersion ? spec2025 : spec2021;
}

class SchemeMonochrome extends DynamicScheme {
  constructor(sourceColorHct, isDark, contrastLevel, specVersion = DynamicScheme.DEFAULT_SPEC_VERSION, platform = DynamicScheme.DEFAULT_PLATFORM) {
    super({
      sourceColorHct: sourceColorHct,
      variant: Variant.MONOCHROME,
      contrastLevel: contrastLevel,
      isDark: isDark,
      platform: platform,
      specVersion: specVersion
    });
  }
}

class SchemeTonalSpot extends DynamicScheme {
  constructor(sourceColorHct, isDark, contrastLevel, specVersion = DynamicScheme.DEFAULT_SPEC_VERSION, platform = DynamicScheme.DEFAULT_PLATFORM) {
    super({
      sourceColorHct: sourceColorHct,
      variant: Variant.TONAL_SPOT,
      contrastLevel: contrastLevel,
      isDark: isDark,
      platform: platform,
      specVersion: specVersion
    });
  }
}

class SchemeVibrant extends DynamicScheme {
  constructor(sourceColorHct, isDark, contrastLevel, specVersion = DynamicScheme.DEFAULT_SPEC_VERSION, platform = DynamicScheme.DEFAULT_PLATFORM) {
    super({
      sourceColorHct: sourceColorHct,
      variant: Variant.VIBRANT,
      contrastLevel: contrastLevel,
      isDark: isDark,
      platform: platform,
      specVersion: specVersion
    });
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

export { Hct, SchemeMonochrome, SchemeTonalSpot, SchemeVibrant, argbFromHex, hexFromArgb };