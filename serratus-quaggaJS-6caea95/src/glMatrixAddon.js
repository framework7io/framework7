/*
<augmentedJS: A javascript library for natural feature tracking>
Copyright (C) 2011 
 - Christoph Oberhofer (ar.oberhofer@gmail.com)
 - Jens Grubert (jg@jensgrubert.de)
 - Gerhard Reitmayr (reitmayr@icg.tugraz.at)
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/*
 * glMatrixAddon.js
 * Extension to the glMatrix library. The original glMatrix library
 * was created by Brandon Jones.
 */


mat4.xVec4 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z + mat[3]*w;
	dest[1] = mat[4]*x + mat[5]*y + mat[6]*z + mat[7]*w;
	dest[2] = mat[8]*x + mat[9]*y + mat[10]*z + mat[11]*w;
	dest[3] = mat[12]*x + mat[13]*y + mat[14]*z + mat[15]*w;
	
	return dest;
};

mat3.scale = function(mat, scalar, dest){
	if(!dest || mat == dest) {
		mat[0] *= scalar;
		mat[1] *= scalar;
		mat[2] *= scalar;
		mat[3] *= scalar;
		mat[4] *= scalar;
		mat[5] *= scalar;
		mat[6] *= scalar;
		mat[7] *= scalar;
		mat[8] *= scalar;
		return mat;
	}
	dest = mat3.create();
	dest[0] = mat[0]*scalar;
	dest[1] = mat[1]*scalar;
	dest[2] = mat[2]*scalar;
	dest[3] = mat[3]*scalar;
	dest[4] = mat[4]*scalar;
	dest[5] = mat[5]*scalar;
	dest[6] = mat[6]*scalar;
	dest[7] = mat[7]*scalar;
	dest[8] = mat[8]*scalar;
	return dest;
};

mat3.inverse = function(mat, dest){
	if(!dest) { dest = mat; }
	
	var ha00 = mat[0], ha01 = mat[1], ha02 = mat[2];
	var ha10 = mat[3], ha11 = mat[4], ha12 = mat[5];
	var ha20 = mat[6], ha21 = mat[7], ha22 = mat[8];
	
	var invDetA = 1/(ha00*ha11*ha22 + ha01*ha12*ha20 + ha02*ha10*ha21 - ha02*ha11*ha20 - ha01*ha10*ha22 - ha00*ha12*ha21);
	dest[0] = (ha11*ha22 - ha12*ha21)*invDetA;
	dest[1] = (ha02*ha21 - ha01*ha22)*invDetA;
	dest[2] = (ha01*ha12 - ha02*ha11)*invDetA;
	dest[3] = (ha12*ha20 - ha10*ha22)*invDetA;
	dest[4] = (ha00*ha22 - ha02*ha20)*invDetA;
	dest[5] = (ha02*ha10 - ha00*ha12)*invDetA;
	dest[6] = (ha10*ha21 - ha11*ha20)*invDetA;
	dest[7] = (ha01*ha20 - ha00*ha21)*invDetA;
	dest[8] = (ha00*ha11 - ha01*ha10)*invDetA;
	return dest;
};

mat3.multiply = function(mat, mat2, dest) {
	if(!dest) { dest = mat; }
	
	var ha00 = mat[0], ha01 = mat[1], ha02 = mat[2];
	var ha10 = mat[3], ha11 = mat[4], ha12 = mat[5];
	var ha20 = mat[6], ha21 = mat[7], ha22 = mat[8];
	
	var hb00 = mat2[0], hb01 = mat2[1], hb02 = mat2[2];
	var hb10 = mat2[3], hb11 = mat2[4], hb12 = mat2[5];
	var hb20 = mat2[6], hb21 = mat2[7], hb22 = mat2[8];
	
	dest[0] = ha00*hb00 + ha01*hb10 + ha02*hb20;
	dest[1] = ha00*hb01 + ha01*hb11 + ha02*hb21;
	dest[2] = ha00*hb02 + ha01*hb12 + ha02*hb22;
	
	dest[3] = ha10*hb00 + ha11*hb10 + ha12*hb20;
	dest[4] = ha10*hb01 + ha11*hb11 + ha12*hb21;
	dest[5] = ha10*hb02 + ha11*hb12 + ha12*hb22;
	
	dest[6] = ha20*hb00 + ha21*hb10 + ha22*hb20;
	dest[7] = ha20*hb01 + ha21*hb11 + ha22*hb21;
	dest[8] = ha20*hb02 + ha21*hb12 + ha22*hb22;
	return dest;
};

mat3.xVec3 = function(mat, vec, dest){
	if(!dest) { dest = vec; }
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z;
	dest[1] = mat[3]*x + mat[4]*y + mat[5]*z;
	dest[2] = mat[6]*x + mat[7]*y + mat[8]*z;
	
	return dest;
};

var vec4={};

vec4.create = function(vec){
	var dest;
	
	if(vec) {
		dest = new glMatrixArrayType(4);
		dest[0] = vec[0];
		dest[1] = vec[1];
		dest[2] = vec[2];
		dest[3] = vec[3];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0,0]);
		else
			dest = new glMatrixArrayType(4);
	}
	
	return dest;
};

vec4.project = function(vec, dest){
	if(!dest) { dest = vec; }
	
	dest[0] = vec[0]/vec[3];
	dest[1] = vec[1]/vec[3];
	dest[2] = vec[2]/vec[3];
	return dest;
};

vec4.scale = function(vec, val, dest){
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		vec[4] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	dest[3] = vec[3]*val;
	return dest;
};

vec4.xMat4 = function(vec, mat, dest){
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
	dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;
	
	return dest;
};


var mat2 = {};

mat2.create = function(mat){
	var dest;
	
	if(mat) {
		dest = new glMatrixArrayType(4);
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
	} else {
		if(glMatrixArrayType === Array)
			dest  = new glMatrixArrayType([0,0,0,0]);
		else
			dest = new glMatrixArrayType(4);
	}
	
	return dest;
};

mat2.xVec2 = function(mat, vec, dest){
	if(!dest) { dest = vec; }
	var x = vec[0], y = vec[1];
	
	dest[0] = mat[0]*x + mat[1]*y;
	dest[1] = mat[2]*x + mat[3]*y;
	
	return dest;
};

mat2.scale = function(mat, scale, dest){
	if(!dest || mat == dest) {
		mat[0] *= scale;
		mat[1] *= scale;
		mat[2] *= scale;
		mat[3] *= scale;
		return mat;
	}
	
	dest[0] = mat[0]*scale;
	dest[1] = mat[1]*scale;
	dest[2] = mat[2]*scale;
	dest[3] = mat[3]*scale;
	return dest;
};

mat2.determinant = function(mat){
	return mat[0]*mat[3] - mat[1]*mat[2];
};

mat2.inverse = function(mat){
  var scale = 1/(mat2.determinant(mat));
  var a = mat[3]*scale,
      b = -mat[1]*scale,
      c = -mat[2]*scale,
      d = mat[0];
  mat[0] = a;
  mat[1] = b;
  mat[2] = c;
  mat[3] = d;
  return mat;
};

var vec2 = {};
vec2.create = function(vec){
	var dest;
	
	if(vec) {
		dest = new glMatrixArrayType(2);
		dest[0] = vec[0];
		dest[1] = vec[1];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0]);
		else
			dest = new glMatrixArrayType(2);
	}
	
	return dest;
};

vec2.subtract = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	return dest;
};

vec2.add = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] += vec2[0];
		vec[1] += vec2[1];
		return vec;
	}
	
	dest[0] = vec[0] + vec2[0];
	dest[1] = vec[1] + vec2[1];
	return dest;
};

vec2.scale = function(vec, val, dest) {
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	return dest;
};

vec2.normalize = function(vec, dest) {
  if(!dest) { dest = vec; }
  
  var x = vec[0], y = vec[1];
  var len = Math.sqrt(x*x + y*y);
  
  if (!len) {
    dest[0] = 0;
    dest[1] = 0;
    return dest;
  } else if (len == 1) {
    dest[0] = x;
    dest[1] = y;
    return dest;
  }
  
  len = 1 / len;
  dest[0] = x*len;
  dest[1] = y*len;
  return dest;
};

vec2.dot = function(vec, vec2){
  return vec[0]*vec2[0] + vec[1]*vec2[1];
};

vec2.multiply = function(vec, vec2, dest){
  if(!dest) { dest = vec; }
  
  dest[0] = vec[0]*vec2[0];
  dest[1] = vec[1]*vec2[1];
  return dest;
};

/**
 * @param vec vec2 to be unprojected [x,y] -> [x,y,1]
 * @returns vec3 unprojected vector
 */
vec2.unproject = function(vec){
	return vec3.create([vec[0], vec[1], 1]);
};

vec2.length = function(vec){
  return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
};

vec2.perspectiveProject = function(vec){
  var result = vec2.create(vec);
  return vec2.scale(result, 1/vec[2]);
};

/**
 * @param vec vec3 to be projected [x,y,z] -> [x/z,y/z]
 * @returns vec2 projected vector
 */
vec3.project = function(vec){
	return vec2.scale(vec2.create(vec), 1/vec[2]);
};

var vec6 = {};
vec6.scale = function(vec, val, dest){
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		vec[3] *= val;
		vec[4] *= val;
		vec[5] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	dest[3] = vec[3]*val;
	dest[4] = vec[4]*val;
	dest[5] = vec[5]*val;
	return dest;
};

vec6.subtract = function(vec, vec2, dest){
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		vec[2] -= vec2[2];
		vec[3] -= vec2[3];
		vec[4] -= vec2[4];
		vec[5] -= vec2[5];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	dest[2] = vec[2] - vec2[2];
	dest[3] = vec[3] - vec2[3];
	dest[4] = vec[4] - vec2[4];
	dest[5] = vec[5] - vec2[5];
	return dest;
};

vec6.dot = function(vec, vec2){
	return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2] + vec[3]*vec2[3] + vec[4]*vec2[4] + vec[5]*vec2[5];
};

var mat6 = {};
mat6.xVec6 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2], u = vec[3], w = vec[4], v = vec[5];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z + mat[3]*u + mat[4]*w + mat[5]*v;
	dest[1] = mat[6]*x + mat[7]*y + mat[8]*z + mat[9]*u + mat[10]*w + mat[11]*v;
	dest[2] = mat[12]*x + mat[13]*y + mat[14]*z + mat[15]*u + mat[16]*w + mat[17]*v;
	dest[3] = mat[18]*x + mat[19]*y + mat[20]*z + mat[21]*u + mat[22]*w + mat[23]*v;
	dest[4] = mat[24]*x + mat[25]*y + mat[26]*z + mat[27]*u + mat[28]*w + mat[29]*v;
	dest[5] = mat[30]*x + mat[31]*y + mat[32]*z + mat[33]*u + mat[34]*w + mat[35]*v;
	
	return dest;
};

mat3.xVec3 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z;
	dest[1] = mat[3]*x + mat[4]*y + mat[5]*z;
	dest[2] = mat[6]*x + mat[7]*y + mat[8]*z;
	
	return dest;
};