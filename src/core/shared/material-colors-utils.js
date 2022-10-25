/* eslint-disable */
function signum(num) {
  if (num < 0) {
    return -1;
  }
  if (num === 0) {
    return 0;
  }
  return 1;
}

function lerp(start, stop, amount) {
  return (1.0 - amount) * start + amount * stop;
}

function clampInt(min, max, input) {
  if (input < min) {
    return min;
  }
  if (input > max) {
    return max;
  }
  return input;
}

function sanitizeDegreesDouble(degrees) {
  degrees %= 360.0;
  if (degrees < 0) {
    degrees += 360.0;
  }
  return degrees;
}

function rotationDirection(from, to) {
  const increasingDifference = sanitizeDegreesDouble(to - from);
  return increasingDifference <= 180.0 ? 1.0 : -1.0;
}

function differenceDegrees(a, b) {
  return 180.0 - Math.abs(Math.abs(a - b) - 180.0);
}

function matrixMultiply(row, matrix) {
  const a = row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
  const b = row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
  const c = row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
  return [a, b, c];
}

const SRGB_TO_XYZ = [
  [0.41233895, 0.35762064, 0.18051042],
  [0.2126, 0.7152, 0.0722],
  [0.01932141, 0.11916382, 0.95034478],
];
const XYZ_TO_SRGB = [
  [3.2413774792388685, -1.5376652402851851, -0.49885366846268053],
  [-0.9691452513005321, 1.8758853451067872, 0.04156585616912061],
  [0.05562093689691305, -0.20395524564742123, 1.0571799111220335],
];
const WHITE_POINT_D65 = [95.047, 100.0, 108.883];

function argbFromRgb(red, green, blue) {
  return ((255 << 24) | ((red & 255) << 16) | ((green & 255) << 8) | (blue & 255)) >>> 0;
}

function argbFromLinrgb(linrgb) {
  const r = delinearized(linrgb[0]);
  const g = delinearized(linrgb[1]);
  const b = delinearized(linrgb[2]);
  return argbFromRgb(r, g, b);
}

function redFromArgb(argb) {
  return (argb >> 16) & 255;
}

function greenFromArgb(argb) {
  return (argb >> 8) & 255;
}

function blueFromArgb(argb) {
  return argb & 255;
}

function argbFromXyz(x, y, z) {
  const matrix = XYZ_TO_SRGB;
  const linearR = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z;
  const linearG = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z;
  const linearB = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z;
  const r = delinearized(linearR);
  const g = delinearized(linearG);
  const b = delinearized(linearB);
  return argbFromRgb(r, g, b);
}

function xyzFromArgb(argb) {
  const r = linearized(redFromArgb(argb));
  const g = linearized(greenFromArgb(argb));
  const b = linearized(blueFromArgb(argb));
  return matrixMultiply([r, g, b], SRGB_TO_XYZ);
}

function argbFromLstar(lstar) {
  const y = yFromLstar(lstar);
  const component = delinearized(y);
  return argbFromRgb(component, component, component);
}

function lstarFromArgb(argb) {
  const y = xyzFromArgb(argb)[1];
  return 116.0 * labF(y / 100.0) - 16.0;
}

function yFromLstar(lstar) {
  return 100.0 * labInvf((lstar + 16.0) / 116.0);
}

function linearized(rgbComponent) {
  const normalized = rgbComponent / 255.0;
  if (normalized <= 0.040449936) {
    return (normalized / 12.92) * 100.0;
  }
  return Math.pow((normalized + 0.055) / 1.055, 2.4) * 100.0;
}

function delinearized(rgbComponent) {
  const normalized = rgbComponent / 100.0;
  let delinearized = 0.0;
  if (normalized <= 0.0031308) {
    delinearized = normalized * 12.92;
  } else {
    delinearized = 1.055 * Math.pow(normalized, 1.0 / 2.4) - 0.055;
  }
  return clampInt(0, 255, Math.round(delinearized * 255.0));
}

function whitePointD65() {
  return WHITE_POINT_D65;
}
function labF(t) {
  const e = 216.0 / 24389.0;
  const kappa = 24389.0 / 27.0;
  if (t > e) {
    return Math.pow(t, 1.0 / 3.0);
  }
  return (kappa * t + 16) / 116;
}
function labInvf(ft) {
  const e = 216.0 / 24389.0;
  const kappa = 24389.0 / 27.0;
  const ft3 = ft * ft * ft;
  if (ft3 > e) {
    return ft3;
  }
  return (116 * ft - 16) / kappa;
}

class ViewingConditions {
  constructor(n, aw, nbb, ncb, c, nc, rgbD, fl, fLRoot, z) {
    this.n = n;
    this.aw = aw;
    this.nbb = nbb;
    this.ncb = ncb;
    this.c = c;
    this.nc = nc;
    this.rgbD = rgbD;
    this.fl = fl;
    this.fLRoot = fLRoot;
    this.z = z;
  }

  static make(
    whitePoint = whitePointD65(),
    adaptingLuminance = ((200.0 / Math.PI) * yFromLstar(50.0)) / 100.0,
    backgroundLstar = 50.0,
    surround = 2.0,
    discountingIlluminant = false,
  ) {
    const xyz = whitePoint;
    const rW = xyz[0] * 0.401288 + xyz[1] * 0.650173 + xyz[2] * -0.051461;
    const gW = xyz[0] * -0.250268 + xyz[1] * 1.204414 + xyz[2] * 0.045854;
    const bW = xyz[0] * -0.002079 + xyz[1] * 0.048952 + xyz[2] * 0.953127;
    const f = 0.8 + surround / 10.0;
    const c = f >= 0.9 ? lerp(0.59, 0.69, (f - 0.9) * 10.0) : lerp(0.525, 0.59, (f - 0.8) * 10.0);
    let d = discountingIlluminant
      ? 1.0
      : f * (1.0 - (1.0 / 3.6) * Math.exp((-adaptingLuminance - 42.0) / 92.0));
    d = d > 1.0 ? 1.0 : d < 0.0 ? 0.0 : d;
    const nc = f;
    const rgbD = [
      d * (100.0 / rW) + 1.0 - d,
      d * (100.0 / gW) + 1.0 - d,
      d * (100.0 / bW) + 1.0 - d,
    ];
    const k = 1.0 / (5.0 * adaptingLuminance + 1.0);
    const k4 = k * k * k * k;
    const k4F = 1.0 - k4;
    const fl = k4 * adaptingLuminance + 0.1 * k4F * k4F * Math.cbrt(5.0 * adaptingLuminance);
    const n = yFromLstar(backgroundLstar) / whitePoint[1];
    const z = 1.48 + Math.sqrt(n);
    const nbb = 0.725 / Math.pow(n, 0.2);
    const ncb = nbb;
    const rgbAFactors = [
      Math.pow((fl * rgbD[0] * rW) / 100.0, 0.42),
      Math.pow((fl * rgbD[1] * gW) / 100.0, 0.42),
      Math.pow((fl * rgbD[2] * bW) / 100.0, 0.42),
    ];
    const rgbA = [
      (400.0 * rgbAFactors[0]) / (rgbAFactors[0] + 27.13),
      (400.0 * rgbAFactors[1]) / (rgbAFactors[1] + 27.13),
      (400.0 * rgbAFactors[2]) / (rgbAFactors[2] + 27.13),
    ];
    const aw = (2.0 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
    return new ViewingConditions(n, aw, nbb, ncb, c, nc, rgbD, fl, Math.pow(fl, 0.25), z);
  }
}

ViewingConditions.DEFAULT = ViewingConditions.make();

class Cam16 {
  constructor(hue, chroma, j, q, m, s, jstar, astar, bstar) {
    this.hue = hue;
    this.chroma = chroma;
    this.j = j;
    this.q = q;
    this.m = m;
    this.s = s;
    this.jstar = jstar;
    this.astar = astar;
    this.bstar = bstar;
  }

  distance(other) {
    const dJ = this.jstar - other.jstar;
    const dA = this.astar - other.astar;
    const dB = this.bstar - other.bstar;
    const dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
    const dE = 1.41 * Math.pow(dEPrime, 0.63);
    return dE;
  }

  static fromInt(argb) {
    return Cam16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
  }

  static fromIntInViewingConditions(argb, viewingConditions) {
    const red = (argb & 0x00ff0000) >> 16;
    const green = (argb & 0x0000ff00) >> 8;
    const blue = argb & 0x000000ff;
    const redL = linearized(red);
    const greenL = linearized(green);
    const blueL = linearized(blue);
    const x = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL;
    const y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL;
    const z = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL;
    const rC = 0.401288 * x + 0.650173 * y - 0.051461 * z;
    const gC = -0.250268 * x + 1.204414 * y + 0.045854 * z;
    const bC = -0.002079 * x + 0.048952 * y + 0.953127 * z;
    const rD = viewingConditions.rgbD[0] * rC;
    const gD = viewingConditions.rgbD[1] * gC;
    const bD = viewingConditions.rgbD[2] * bC;
    const rAF = Math.pow((viewingConditions.fl * Math.abs(rD)) / 100.0, 0.42);
    const gAF = Math.pow((viewingConditions.fl * Math.abs(gD)) / 100.0, 0.42);
    const bAF = Math.pow((viewingConditions.fl * Math.abs(bD)) / 100.0, 0.42);
    const rA = (signum(rD) * 400.0 * rAF) / (rAF + 27.13);
    const gA = (signum(gD) * 400.0 * gAF) / (gAF + 27.13);
    const bA = (signum(bD) * 400.0 * bAF) / (bAF + 27.13);
    const a = (11.0 * rA + -12.0 * gA + bA) / 11.0;
    const b = (rA + gA - 2.0 * bA) / 9.0;
    const u = (20.0 * rA + 20.0 * gA + 21.0 * bA) / 20.0;
    const p2 = (40.0 * rA + 20.0 * gA + bA) / 20.0;
    const atan2 = Math.atan2(b, a);
    const atanDegrees = (atan2 * 180.0) / Math.PI;
    const hue =
      atanDegrees < 0
        ? atanDegrees + 360.0
        : atanDegrees >= 360
        ? atanDegrees - 360.0
        : atanDegrees;
    const hueRadians = (hue * Math.PI) / 180.0;
    const ac = p2 * viewingConditions.nbb;
    const j =
      100.0 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z);
    const q =
      (4.0 / viewingConditions.c) *
      Math.sqrt(j / 100.0) *
      (viewingConditions.aw + 4.0) *
      viewingConditions.fLRoot;
    const huePrime = hue < 20.14 ? hue + 360 : hue;
    const eHue = 0.25 * (Math.cos((huePrime * Math.PI) / 180.0 + 2.0) + 3.8);
    const p1 = (50000.0 / 13.0) * eHue * viewingConditions.nc * viewingConditions.ncb;
    const t = (p1 * Math.sqrt(a * a + b * b)) / (u + 0.305);
    const alpha = Math.pow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const c = alpha * Math.sqrt(j / 100.0);
    const m = c * viewingConditions.fLRoot;
    const s = 50.0 * Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4.0));
    const jstar = ((1.0 + 100.0 * 0.007) * j) / (1.0 + 0.007 * j);
    const mstar = (1.0 / 0.0228) * Math.log(1.0 + 0.0228 * m);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new Cam16(hue, c, j, q, m, s, jstar, astar, bstar);
  }

  static fromJch(j, c, h) {
    return Cam16.fromJchInViewingConditions(j, c, h, ViewingConditions.DEFAULT);
  }

  static fromJchInViewingConditions(j, c, h, viewingConditions) {
    const q =
      (4.0 / viewingConditions.c) *
      Math.sqrt(j / 100.0) *
      (viewingConditions.aw + 4.0) *
      viewingConditions.fLRoot;
    const m = c * viewingConditions.fLRoot;
    const alpha = c / Math.sqrt(j / 100.0);
    const s = 50.0 * Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4.0));
    const hueRadians = (h * Math.PI) / 180.0;
    const jstar = ((1.0 + 100.0 * 0.007) * j) / (1.0 + 0.007 * j);
    const mstar = (1.0 / 0.0228) * Math.log(1.0 + 0.0228 * m);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new Cam16(h, c, j, q, m, s, jstar, astar, bstar);
  }

  static fromUcs(jstar, astar, bstar) {
    return Cam16.fromUcsInViewingConditions(jstar, astar, bstar, ViewingConditions.DEFAULT);
  }

  static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
    const a = astar;
    const b = bstar;
    const m = Math.sqrt(a * a + b * b);
    const M = (Math.exp(m * 0.0228) - 1.0) / 0.0228;
    const c = M / viewingConditions.fLRoot;
    let h = Math.atan2(b, a) * (180.0 / Math.PI);
    if (h < 0.0) {
      h += 360.0;
    }
    const j = jstar / (1 - (jstar - 100) * 0.007);
    return Cam16.fromJchInViewingConditions(j, c, h, viewingConditions);
  }

  toInt() {
    return this.viewed(ViewingConditions.DEFAULT);
  }

  viewed(viewingConditions) {
    const alpha =
      this.chroma === 0.0 || this.j === 0.0 ? 0.0 : this.chroma / Math.sqrt(this.j / 100.0);
    const t = Math.pow(
      alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73),
      1.0 / 0.9,
    );
    const hRad = (this.hue * Math.PI) / 180.0;
    const eHue = 0.25 * (Math.cos(hRad + 2.0) + 3.8);
    const ac =
      viewingConditions.aw *
      Math.pow(this.j / 100.0, 1.0 / viewingConditions.c / viewingConditions.z);
    const p1 = eHue * (50000.0 / 13.0) * viewingConditions.nc * viewingConditions.ncb;
    const p2 = ac / viewingConditions.nbb;
    const hSin = Math.sin(hRad);
    const hCos = Math.cos(hRad);
    const gamma = (23.0 * (p2 + 0.305) * t) / (23.0 * p1 + 11.0 * t * hCos + 108.0 * t * hSin);
    const a = gamma * hCos;
    const b = gamma * hSin;
    const rA = (460.0 * p2 + 451.0 * a + 288.0 * b) / 1403.0;
    const gA = (460.0 * p2 - 891.0 * a - 261.0 * b) / 1403.0;
    const bA = (460.0 * p2 - 220.0 * a - 6300.0 * b) / 1403.0;
    const rCBase = Math.max(0, (27.13 * Math.abs(rA)) / (400.0 - Math.abs(rA)));
    const rC = signum(rA) * (100.0 / viewingConditions.fl) * Math.pow(rCBase, 1.0 / 0.42);
    const gCBase = Math.max(0, (27.13 * Math.abs(gA)) / (400.0 - Math.abs(gA)));
    const gC = signum(gA) * (100.0 / viewingConditions.fl) * Math.pow(gCBase, 1.0 / 0.42);
    const bCBase = Math.max(0, (27.13 * Math.abs(bA)) / (400.0 - Math.abs(bA)));
    const bC = signum(bA) * (100.0 / viewingConditions.fl) * Math.pow(bCBase, 1.0 / 0.42);
    const rF = rC / viewingConditions.rgbD[0];
    const gF = gC / viewingConditions.rgbD[1];
    const bF = bC / viewingConditions.rgbD[2];
    const x = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
    const y = 0.38752654 * rF + 0.62144744 * gF - 0.00897398 * bF;
    const z = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
    const argb = argbFromXyz(x, y, z);
    return argb;
  }
}

class HctSolver {
  static sanitizeRadians(angle) {
    return (angle + Math.PI * 8) % (Math.PI * 2);
  }

  static trueDelinearized(rgbComponent) {
    const normalized = rgbComponent / 100.0;
    let delinearized = 0.0;
    if (normalized <= 0.0031308) {
      delinearized = normalized * 12.92;
    } else {
      delinearized = 1.055 * Math.pow(normalized, 1.0 / 2.4) - 0.055;
    }
    return delinearized * 255.0;
  }

  static chromaticAdaptation(component) {
    const af = Math.pow(Math.abs(component), 0.42);
    return (signum(component) * 400.0 * af) / (af + 27.13);
  }

  static hueOf(linrgb) {
    const scaledDiscount = matrixMultiply(linrgb, HctSolver.SCALED_DISCOUNT_FROM_LINRGB);
    const rA = HctSolver.chromaticAdaptation(scaledDiscount[0]);
    const gA = HctSolver.chromaticAdaptation(scaledDiscount[1]);
    const bA = HctSolver.chromaticAdaptation(scaledDiscount[2]);

    const a = (11.0 * rA + -12.0 * gA + bA) / 11.0;

    const b = (rA + gA - 2.0 * bA) / 9.0;
    return Math.atan2(b, a);
  }

  static areInCyclicOrder(a, b, c) {
    const deltaAB = HctSolver.sanitizeRadians(b - a);
    const deltaAC = HctSolver.sanitizeRadians(c - a);
    return deltaAB < deltaAC;
  }

  static intercept(source, mid, target) {
    return (mid - source) / (target - source);
  }

  static lerpPoint(source, t, target) {
    return [
      source[0] + (target[0] - source[0]) * t,
      source[1] + (target[1] - source[1]) * t,
      source[2] + (target[2] - source[2]) * t,
    ];
  }

  static setCoordinate(source, coordinate, target, axis) {
    const t = HctSolver.intercept(source[axis], coordinate, target[axis]);
    return HctSolver.lerpPoint(source, t, target);
  }

  static isBounded(x) {
    return x >= 0.0 && x <= 100.0;
  }

  static nthVertex(y, n) {
    const kR = HctSolver.Y_FROM_LINRGB[0];
    const kG = HctSolver.Y_FROM_LINRGB[1];
    const kB = HctSolver.Y_FROM_LINRGB[2];
    const coordA = n % 4 <= 1 ? 0.0 : 100.0;
    const coordB = n % 2 === 0 ? 0.0 : 100.0;
    if (n < 4) {
      const g = coordA;
      const b = coordB;
      const r = (y - g * kG - b * kB) / kR;
      if (HctSolver.isBounded(r)) {
        return [r, g, b];
      }
      return [-1.0, -1.0, -1.0];
    }
    if (n < 8) {
      const b = coordA;
      const r = coordB;
      const g = (y - r * kR - b * kB) / kG;
      if (HctSolver.isBounded(g)) {
        return [r, g, b];
      }
      return [-1.0, -1.0, -1.0];
    }
    const r = coordA;
    const g = coordB;
    const b = (y - r * kR - g * kG) / kB;
    if (HctSolver.isBounded(b)) {
      return [r, g, b];
    }
    return [-1.0, -1.0, -1.0];
  }

  static bisectToSegment(y, targetHue) {
    let left = [-1.0, -1.0, -1.0];
    let right = left;
    let leftHue = 0.0;
    let rightHue = 0.0;
    let initialized = false;
    let uncut = true;
    for (let n = 0; n < 12; n++) {
      const mid = HctSolver.nthVertex(y, n);
      if (mid[0] < 0) {
        continue;
      }
      const midHue = HctSolver.hueOf(mid);
      if (!initialized) {
        left = mid;
        right = mid;
        leftHue = midHue;
        rightHue = midHue;
        initialized = true;
        continue;
      }
      if (uncut || HctSolver.areInCyclicOrder(leftHue, midHue, rightHue)) {
        uncut = false;
        if (HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
          right = mid;
          rightHue = midHue;
        } else {
          left = mid;
          leftHue = midHue;
        }
      }
    }
    return [left, right];
  }

  static midpoint(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  }

  static criticalPlaneBelow(x) {
    return Math.floor(x - 0.5);
  }

  static criticalPlaneAbove(x) {
    return Math.ceil(x - 0.5);
  }

  static bisectToLimit(y, targetHue) {
    const segment = HctSolver.bisectToSegment(y, targetHue);
    let left = segment[0];
    let leftHue = HctSolver.hueOf(left);
    let right = segment[1];
    for (let axis = 0; axis < 3; axis++) {
      if (left[axis] !== right[axis]) {
        let lPlane = -1;
        let rPlane = 255;
        if (left[axis] < right[axis]) {
          lPlane = HctSolver.criticalPlaneBelow(HctSolver.trueDelinearized(left[axis]));
          rPlane = HctSolver.criticalPlaneAbove(HctSolver.trueDelinearized(right[axis]));
        } else {
          lPlane = HctSolver.criticalPlaneAbove(HctSolver.trueDelinearized(left[axis]));
          rPlane = HctSolver.criticalPlaneBelow(HctSolver.trueDelinearized(right[axis]));
        }
        for (let i = 0; i < 8; i++) {
          if (Math.abs(rPlane - lPlane) <= 1) {
            break;
          } else {
            const mPlane = Math.floor((lPlane + rPlane) / 2.0);
            const midPlaneCoordinate = HctSolver.CRITICAL_PLANES[mPlane];
            const mid = HctSolver.setCoordinate(left, midPlaneCoordinate, right, axis);
            const midHue = HctSolver.hueOf(mid);
            if (HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
              right = mid;
              rPlane = mPlane;
            } else {
              left = mid;
              leftHue = midHue;
              lPlane = mPlane;
            }
          }
        }
      }
    }
    return HctSolver.midpoint(left, right);
  }

  static inverseChromaticAdaptation(adapted) {
    const adaptedAbs = Math.abs(adapted);
    const base = Math.max(0, (27.13 * adaptedAbs) / (400.0 - adaptedAbs));
    return signum(adapted) * Math.pow(base, 1.0 / 0.42);
  }

  static findResultByJ(hueRadians, chroma, y) {
    let j = Math.sqrt(y) * 11.0;

    const viewingConditions = ViewingConditions.DEFAULT;
    const tInnerCoeff = 1 / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const eHue = 0.25 * (Math.cos(hueRadians + 2.0) + 3.8);
    const p1 = eHue * (50000.0 / 13.0) * viewingConditions.nc * viewingConditions.ncb;
    const hSin = Math.sin(hueRadians);
    const hCos = Math.cos(hueRadians);
    for (let iterationRound = 0; iterationRound < 5; iterationRound++) {
      const jNormalized = j / 100.0;
      const alpha = chroma === 0.0 || j === 0.0 ? 0.0 : chroma / Math.sqrt(jNormalized);
      const t = Math.pow(alpha * tInnerCoeff, 1.0 / 0.9);
      const ac =
        viewingConditions.aw *
        Math.pow(jNormalized, 1.0 / viewingConditions.c / viewingConditions.z);
      const p2 = ac / viewingConditions.nbb;
      const gamma = (23.0 * (p2 + 0.305) * t) / (23.0 * p1 + 11 * t * hCos + 108.0 * t * hSin);
      const a = gamma * hCos;
      const b = gamma * hSin;
      const rA = (460.0 * p2 + 451.0 * a + 288.0 * b) / 1403.0;
      const gA = (460.0 * p2 - 891.0 * a - 261.0 * b) / 1403.0;
      const bA = (460.0 * p2 - 220.0 * a - 6300.0 * b) / 1403.0;
      const rCScaled = HctSolver.inverseChromaticAdaptation(rA);
      const gCScaled = HctSolver.inverseChromaticAdaptation(gA);
      const bCScaled = HctSolver.inverseChromaticAdaptation(bA);
      const linrgb = matrixMultiply(
        [rCScaled, gCScaled, bCScaled],
        HctSolver.LINRGB_FROM_SCALED_DISCOUNT,
      );

      if (linrgb[0] < 0 || linrgb[1] < 0 || linrgb[2] < 0) {
        return 0;
      }
      const kR = HctSolver.Y_FROM_LINRGB[0];
      const kG = HctSolver.Y_FROM_LINRGB[1];
      const kB = HctSolver.Y_FROM_LINRGB[2];
      const fnj = kR * linrgb[0] + kG * linrgb[1] + kB * linrgb[2];
      if (fnj <= 0) {
        return 0;
      }
      if (iterationRound === 4 || Math.abs(fnj - y) < 0.002) {
        if (linrgb[0] > 100.01 || linrgb[1] > 100.01 || linrgb[2] > 100.01) {
          return 0;
        }
        return argbFromLinrgb(linrgb);
      }

      j -= ((fnj - y) * j) / (2 * fnj);
    }
    return 0;
  }

  static solveToInt(hueDegrees, chroma, lstar) {
    if (chroma < 0.0001 || lstar < 0.0001 || lstar > 99.9999) {
      return argbFromLstar(lstar);
    }
    hueDegrees = sanitizeDegreesDouble(hueDegrees);
    const hueRadians = (hueDegrees / 180) * Math.PI;
    const y = yFromLstar(lstar);
    const exactAnswer = HctSolver.findResultByJ(hueRadians, chroma, y);
    if (exactAnswer !== 0) {
      return exactAnswer;
    }
    const linrgb = HctSolver.bisectToLimit(y, hueRadians);
    return argbFromLinrgb(linrgb);
  }

  static solveToCam(hueDegrees, chroma, lstar) {
    return Cam16.fromInt(HctSolver.solveToInt(hueDegrees, chroma, lstar));
  }
}
HctSolver.SCALED_DISCOUNT_FROM_LINRGB = [
  [0.001200833568784504, 0.002389694492170889, 0.0002795742885861124],
  [0.0005891086651375999, 0.0029785502573438758, 0.0003270666104008398],
  [0.00010146692491640572, 0.0005364214359186694, 0.0032979401770712076],
];
HctSolver.LINRGB_FROM_SCALED_DISCOUNT = [
  [1373.2198709594231, -1100.4251190754821, -7.278681089101213],
  [-271.815969077903, 559.6580465940733, -32.46047482791194],
  [1.9622899599665666, -57.173814538844006, 308.7233197812385],
];
HctSolver.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
HctSolver.CRITICAL_PLANES = [
  0.015176349177441876, 0.045529047532325624, 0.07588174588720938, 0.10623444424209313,
  0.13658714259697685, 0.16693984095186062, 0.19729253930674434, 0.2276452376616281,
  0.2579979360165119, 0.28835063437139563, 0.3188300904430532, 0.350925934958123,
  0.3848314933096426, 0.42057480301049466, 0.458183274052838, 0.4976837250274023,
  0.5391024159806381, 0.5824650784040898, 0.6277969426914107, 0.6751227633498623,
  0.7244668422128921, 0.775853049866786, 0.829304845476233, 0.8848452951698498, 0.942497089126609,
  1.0022825574869039, 1.0642236851973577, 1.1283421258858297, 1.1946592148522128,
  1.2631959812511864, 1.3339731595349034, 1.407011200216447, 1.4823302800086415, 1.5599503113873272,
  1.6398909516233677, 1.7221716113234105, 1.8068114625156377, 1.8938294463134073,
  1.9832442801866852, 2.075074464868551, 2.1693382909216234, 2.2660538449872063, 2.36523901573795,
  2.4669114995532007, 2.5710888059345764, 2.6777882626779785, 2.7870270208169257, 2.898822059350997,
  3.0131901897720907, 3.1301480604002863, 3.2497121605402226, 3.3718988244681087,
  3.4967242352587946, 3.624204428461639, 3.754355295633311, 3.887192587735158, 4.022731918402185,
  4.160988767090289, 4.301978482107941, 4.445716283538092, 4.592217266055746, 4.741496401646282,
  4.893568542229298, 5.048448422192488, 5.20615066083972, 5.3666897647573375, 5.5300801301023865,
  5.696336044816294, 5.865471690767354, 6.037501145825082, 6.212438385869475, 6.390297286737924,
  6.571091626112461, 6.7548350853498045, 6.941541251256611, 7.131223617812143, 7.323895587840543,
  7.5195704746346665, 7.7182615035334345, 7.919981813454504, 8.124744458384042, 8.332562408825165,
  8.543448553206703, 8.757415699253682, 8.974476575321063, 9.194643831691977, 9.417930041841839,
  9.644347703669503, 9.873909240696694, 10.106627003236781, 10.342513269534024, 10.58158024687427,
  10.8238400726681, 11.069304815507364, 11.317986476196008, 11.569896988756009, 11.825048221409341,
  12.083451977536606, 12.345119996613247, 12.610063955123938, 12.878295467455942,
  13.149826086772048, 13.42466730586372, 13.702830557985108, 13.984327217668513, 14.269168601521828,
  14.55736596900856, 14.848930523210871, 15.143873411576273, 15.44220572664832, 15.743938506781891,
  16.04908273684337, 16.35764934889634, 16.66964922287304, 16.985093187232053, 17.30399201960269,
  17.62635644741625, 17.95219714852476, 18.281524751807332, 18.614349837764564, 18.95068293910138,
  19.290534541298456, 19.633915083172692, 19.98083495742689, 20.331304511189067, 20.685334046541502,
  21.042933821039977, 21.404114048223256, 21.76888489811322, 22.137256497705877, 22.50923893145328,
  22.884842241736916, 23.264076429332462, 23.6469514538663, 24.033477234264016, 24.42366364919083,
  24.817520537484558, 25.21505769858089, 25.61628489293138, 26.021211842414342, 26.429848230738664,
  26.842203703840827, 27.258287870275353, 27.678110301598522, 28.10168053274597, 28.529008062403893,
  28.96010235337422, 29.39497283293396, 29.83362889318845, 30.276079891419332, 30.722335150426627,
  31.172403958865512, 31.62629557157785, 32.08401920991837, 32.54558406207592, 33.010999283389665,
  33.4802739966603, 33.953417292456834, 34.430438229418264, 34.911345834551085, 35.39614910352207,
  35.88485700094671, 36.37747846067349, 36.87402238606382, 37.37449765026789, 37.87891309649659,
  38.38727753828926, 38.89959975977785, 39.41588851594697, 39.93615253289054, 40.460400508064545,
  40.98864111053629, 41.520882981230194, 42.05713473317016, 42.597404951718396, 43.141702194811224,
  43.6900349931913, 44.24241185063697, 44.798841244188324, 45.35933162437017, 45.92389141541209,
  46.49252901546552, 47.065252796817916, 47.64207110610409, 48.22299226451468, 48.808024568002054,
  49.3971762874833, 49.9904556690408, 50.587870934119984, 51.189430279724725, 51.79514187861014,
  52.40501387947288, 53.0190544071392, 53.637271562750364, 54.259673423945976, 54.88626804504493,
  55.517063457223934, 56.15206766869424, 56.79128866487574, 57.43473440856916, 58.08241284012621,
  58.734331877617365, 59.39049941699807, 60.05092333227251, 60.715611475655585, 61.38457167773311,
  62.057811747619894, 62.7353394731159, 63.417162620860914, 64.10328893648692, 64.79372614476921,
  65.48848194977529, 66.18756403501224, 66.89098006357258, 67.59873767827808, 68.31084450182222,
  69.02730813691093, 69.74813616640164, 70.47333615344107, 71.20291564160104, 71.93688215501312,
  72.67524319850172, 73.41800625771542, 74.16517879925733, 74.9167682708136, 75.67278210128072,
  76.43322770089146, 77.1981124613393, 77.96744375590167, 78.74122893956174, 79.51947534912904,
  80.30219030335869, 81.08938110306934, 81.88105503125999, 82.67721935322541, 83.4778813166706,
  84.28304815182372, 85.09272707154808, 85.90692527145302, 86.72564993000343, 87.54890820862819,
  88.3767072518277, 89.2090541872801, 90.04595612594655, 90.88742016217518, 91.73345337380438,
  92.58406282226491, 93.43925555268066, 94.29903859396902, 95.16341895893969, 96.03240364439274,
  96.9059996312159, 97.78421388448044, 98.6670533535366, 99.55452497210776,
];

class Hct {
  constructor(argb) {
    this.argb = argb;
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = lstarFromArgb(argb);
    this.argb = argb;
  }

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

  setInternalState(argb) {
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = lstarFromArgb(argb);
    this.argb = argb;
  }
}

class Blend {
  static harmonize(designColor, sourceColor) {
    const fromHct = Hct.fromInt(designColor);
    const toHct = Hct.fromInt(sourceColor);
    const differenceDegrees$1 = differenceDegrees(fromHct.hue, toHct.hue);
    const rotationDegrees = Math.min(differenceDegrees$1 * 0.5, 15.0);
    const outputHue = sanitizeDegreesDouble(
      fromHct.hue + rotationDegrees * rotationDirection(fromHct.hue, toHct.hue),
    );
    return Hct.from(outputHue, fromHct.chroma, fromHct.tone).toInt();
  }

  static hctHue(from, to, amount) {
    const ucs = Blend.cam16Ucs(from, to, amount);
    const ucsCam = Cam16.fromInt(ucs);
    const fromCam = Cam16.fromInt(from);
    const blended = Hct.from(ucsCam.hue, fromCam.chroma, lstarFromArgb(from));
    return blended.toInt();
  }

  static cam16Ucs(from, to, amount) {
    const fromCam = Cam16.fromInt(from);
    const toCam = Cam16.fromInt(to);
    const fromJ = fromCam.jstar;
    const fromA = fromCam.astar;
    const fromB = fromCam.bstar;
    const toJ = toCam.jstar;
    const toA = toCam.astar;
    const toB = toCam.bstar;
    const jstar = fromJ + (toJ - fromJ) * amount;
    const astar = fromA + (toA - fromA) * amount;
    const bstar = fromB + (toB - fromB) * amount;
    return Cam16.fromUcs(jstar, astar, bstar).toInt();
  }
}

class TonalPalette {
  constructor(hue, chroma) {
    this.hue = hue;
    this.chroma = chroma;
    this.cache = new Map();
  }

  static fromInt(argb) {
    const hct = Hct.fromInt(argb);
    return TonalPalette.fromHueAndChroma(hct.hue, hct.chroma);
  }

  static fromHueAndChroma(hue, chroma) {
    return new TonalPalette(hue, chroma);
  }

  tone(tone) {
    let argb = this.cache.get(tone);
    if (argb === undefined) {
      argb = Hct.from(this.hue, this.chroma, tone).toInt();
      this.cache.set(tone, argb);
    }
    return argb;
  }
}

class CorePalette {
  constructor(argb, isContent) {
    const hct = Hct.fromInt(argb);
    const hue = hct.hue;
    const chroma = hct.chroma;
    if (isContent) {
      this.a1 = TonalPalette.fromHueAndChroma(hue, chroma);
      this.a2 = TonalPalette.fromHueAndChroma(hue, chroma / 3);
      this.a3 = TonalPalette.fromHueAndChroma(hue + 60, chroma / 2);
      this.n1 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 12, 4));
      this.n2 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 6, 8));
    } else {
      this.a1 = TonalPalette.fromHueAndChroma(hue, Math.max(48, chroma));
      this.a2 = TonalPalette.fromHueAndChroma(hue, 16);
      this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24);
      this.n1 = TonalPalette.fromHueAndChroma(hue, 4);
      this.n2 = TonalPalette.fromHueAndChroma(hue, 8);
    }
    this.error = TonalPalette.fromHueAndChroma(25, 84);
  }

  static of(argb) {
    return new CorePalette(argb, false);
  }

  static contentOf(argb) {
    return new CorePalette(argb, true);
  }
}

class Scheme {
  constructor(props) {
    this.props = props;
  }

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
      inversePrimary: core.a1.tone(80),
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
      inversePrimary: core.a1.tone(40),
    });
  }

  toJSON() {
    return Object.assign({}, this.props);
  }
}

const hexFromArgb = (argb) => {
  const r = redFromArgb(argb);
  const g = greenFromArgb(argb);
  const b = blueFromArgb(argb);
  const outParts = [r.toString(16), g.toString(16), b.toString(16)];

  for (const [i, part] of outParts.entries()) {
    if (part.length === 1) {
      outParts[i] = `0${part}`;
    }
  }
  return `#${outParts.join('')}`;
};

const argbFromHex = (hex) => {
  hex = hex.replace('#', '');
  const isThree = hex.length === 3;
  const isSix = hex.length === 6;
  const isEight = hex.length === 8;
  if (!isThree && !isSix && !isEight) {
    throw new Error(`unexpected hex ${hex}`);
  }
  let r = 0;
  let g = 0;
  let b = 0;
  if (isThree) {
    r = parseIntHex(hex.slice(0, 1).repeat(2));
    g = parseIntHex(hex.slice(1, 2).repeat(2));
    b = parseIntHex(hex.slice(2, 3).repeat(2));
  } else if (isSix) {
    r = parseIntHex(hex.slice(0, 2));
    g = parseIntHex(hex.slice(2, 4));
    b = parseIntHex(hex.slice(4, 6));
  } else if (isEight) {
    r = parseIntHex(hex.slice(2, 4));
    g = parseIntHex(hex.slice(4, 6));
    b = parseIntHex(hex.slice(6, 8));
  }
  return ((255 << 24) | ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) | (b & 0x0ff)) >>> 0;
};
function parseIntHex(value) {
  return parseInt(value, 16);
}

function themeFromSourceColor(source, customColors = []) {
  const palette = CorePalette.of(source);
  return {
    source,
    schemes: {
      light: Scheme.light(source),
      dark: Scheme.dark(source),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
    customColors: customColors.map((c) => customColor(source, c)),
  };
}

function customColor(source, color) {
  let value = color.value;
  const from = value;
  const to = source;
  if (color.blend) {
    value = Blend.harmonize(from, to);
  }
  const palette = CorePalette.of(value);
  const tones = palette.a1;
  return {
    color,
    value,
    light: {
      color: tones.tone(40),
      onColor: tones.tone(100),
      colorContainer: tones.tone(90),
      onColorContainer: tones.tone(10),
    },
    dark: {
      color: tones.tone(80),
      onColor: tones.tone(20),
      colorContainer: tones.tone(30),
      onColorContainer: tones.tone(90),
    },
  };
}
export { argbFromHex, hexFromArgb, themeFromSourceColor };
