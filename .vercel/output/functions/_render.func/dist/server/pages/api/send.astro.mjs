import { k as getAugmentedNamespace } from '../../chunks/astro/server_DF6iNv_q.mjs';
import crypto from 'node:crypto';
export { renderers } from '../../renderers.mjs';

var dist = {};

var application = {};

var applicationIn = {};

var hasRequiredApplicationIn;

function requireApplicationIn () {
	if (hasRequiredApplicationIn) return applicationIn;
	hasRequiredApplicationIn = 1;
	Object.defineProperty(applicationIn, "__esModule", { value: true });
	applicationIn.ApplicationInSerializer = void 0;
	applicationIn.ApplicationInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            metadata: object["metadata"],
	            name: object["name"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            metadata: self.metadata,
	            name: self.name,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	        };
	    },
	};
	
	return applicationIn;
}

var applicationOut = {};

var hasRequiredApplicationOut;

function requireApplicationOut () {
	if (hasRequiredApplicationOut) return applicationOut;
	hasRequiredApplicationOut = 1;
	Object.defineProperty(applicationOut, "__esModule", { value: true });
	applicationOut.ApplicationOutSerializer = void 0;
	applicationOut.ApplicationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            id: object["id"],
	            metadata: object["metadata"],
	            name: object["name"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            id: self.id,
	            metadata: self.metadata,
	            name: self.name,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	        };
	    },
	};
	
	return applicationOut;
}

var applicationPatch = {};

var hasRequiredApplicationPatch;

function requireApplicationPatch () {
	if (hasRequiredApplicationPatch) return applicationPatch;
	hasRequiredApplicationPatch = 1;
	Object.defineProperty(applicationPatch, "__esModule", { value: true });
	applicationPatch.ApplicationPatchSerializer = void 0;
	applicationPatch.ApplicationPatchSerializer = {
	    _fromJsonObject(object) {
	        return {
	            metadata: object["metadata"],
	            name: object["name"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            metadata: self.metadata,
	            name: self.name,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	        };
	    },
	};
	
	return applicationPatch;
}

var listResponseApplicationOut = {};

var hasRequiredListResponseApplicationOut;

function requireListResponseApplicationOut () {
	if (hasRequiredListResponseApplicationOut) return listResponseApplicationOut;
	hasRequiredListResponseApplicationOut = 1;
	Object.defineProperty(listResponseApplicationOut, "__esModule", { value: true });
	listResponseApplicationOut.ListResponseApplicationOutSerializer = void 0;
	const applicationOut_1 = requireApplicationOut();
	listResponseApplicationOut.ListResponseApplicationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => applicationOut_1.ApplicationOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => applicationOut_1.ApplicationOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseApplicationOut;
}

var request = {};

var util = {};

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	Object.defineProperty(util, "__esModule", { value: true });
	util.ApiException = void 0;
	class ApiException extends Error {
	    constructor(code, body, headers) {
	        super(`HTTP-Code: ${code}\nHeaders: ${JSON.stringify(headers)}`);
	        this.code = code;
	        this.body = body;
	        this.headers = {};
	        headers.forEach((value, name) => {
	            this.headers[name] = value;
	        });
	    }
	}
	util.ApiException = ApiException;
	
	return util;
}

const max = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

const nil = '00000000-0000-0000-0000-000000000000';

const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  let v;
  const arr = new Uint8Array(16);

  // Parse ########-....-....-....-............
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff;

  // Parse ........-####-....-....-............
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff;

  // Parse ........-....-####-....-............
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff;

  // Parse ........-....-....-####-............
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff;

  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;
let _clockseq;

// Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node;
  let clockseq = options.clockseq;

  // v1 only: Use cached `node` and `clockseq` values
  if (!options._v6) {
    if (!node) {
      node = _nodeId;
    }
    if (clockseq == null) {
      clockseq = _clockseq;
    }
  }

  // Handle cases where we need entropy.  We do this lazily to minimize issues
  // related to insufficient system entropy.  See #189
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();

    // Randomize node
    if (node == null) {
      node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];

      // v1 only: cache node value for reuse
      if (!_nodeId && !options._v6) {
        // per RFC4122 4.5: Set MAC multicast bit (v1 only)
        node[0] |= 0x01; // Set multicast bit

        _nodeId = node;
      }
    }

    // Randomize clockseq
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
      if (_clockseq === undefined && !options._v6) {
        _clockseq = clockseq;
      }
    }
  }

  // v1 & v6 timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so time is
  // handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  let msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || unsafeStringify(b);
}

/**
 * Convert a v1 UUID to a v6 UUID
 *
 * @param {string|Uint8Array} uuid - The v1 UUID to convert to v6
 * @returns {string|Uint8Array} The v6 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
function v1ToV6(uuid) {
  const v1Bytes = typeof uuid === 'string' ? parse(uuid) : uuid;
  const v6Bytes = _v1ToV6(v1Bytes);
  return typeof uuid === 'string' ? unsafeStringify(v6Bytes) : v6Bytes;
}

// Do the field transformation needed for v1 -> v6
function _v1ToV6(v1Bytes, randomize = false) {
  return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL$1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }
    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }

    // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }

  // Function#name is not settable on some platforms (#270)
  try {
    generateUUID.name = name;
  } catch (err) {}

  // For CommonJS default export support
  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }
  return crypto.createHash('md5').update(bytes).digest();
}

const v3 = v35('v3', 0x30, md5);

const native = {
  randomUUID: crypto.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }
  return crypto.createHash('sha1').update(bytes).digest();
}

const v5 = v35('v5', 0x50, sha1);

/**
 *
 * @param {object} options
 * @param {Uint8Array=} buf
 * @param {number=} offset
 * @returns
 */
function v6(options = {}, buf, offset = 0) {
  // v6 is v1 with different field layout, so we start with a v1 UUID, albeit
  // with slightly different behavior around how the clock_seq and node fields
  // are randomized, which is why we call v1 with _v6: true.
  let bytes = v1({
    ...options,
    _v6: true
  }, new Uint8Array(16));

  // Reorder the fields to v6 layout.
  bytes = v1ToV6(bytes);

  // Return as a byte array if requested
  if (buf) {
    for (let i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return unsafeStringify(bytes);
}

/**
 * Convert a v6 UUID to a v1 UUID
 *
 * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6
 * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
function v6ToV1(uuid) {
  const v6Bytes = typeof uuid === 'string' ? parse(uuid) : uuid;
  const v1Bytes = _v6ToV1(v6Bytes);
  return typeof uuid === 'string' ? unsafeStringify(v1Bytes) : v1Bytes;
}

// Do the field transformation needed for v6 -> v1
function _v6ToV1(v6Bytes) {
  return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}

/**
 * UUID V7 - Unix Epoch time-based UUID
 *
 * The IETF has published RFC9562, introducing 3 new UUID versions (6,7,8). This
 * implementation of V7 is based on the accepted, though not yet approved,
 * revisions.
 *
 * RFC 9562:https://www.rfc-editor.org/rfc/rfc9562.html Universally Unique
 * IDentifiers (UUIDs)

 *
 * Sample V7 value:
 * https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value
 *
 * Monotonic Bit Layout: RFC rfc9562.6.2 Method 1, Dedicated Counter Bits ref:
 *     https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-5.1
 *
 *   0                   1                   2                   3 0 1 2 3 4 5 6
 *   7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                          unix_ts_ms                           |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |          unix_ts_ms           |  ver  |        seq_hi         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |var|               seq_low               |        rand         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                             rand                              |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * seq is a 31 bit serialized counter; comprised of 12 bit seq_hi and 19 bit
 * seq_low, and randomly initialized upon timestamp change. 31 bit counter size
 * was selected as any bitwise operations in node are done as _signed_ 32 bit
 * ints. we exclude the sign bit.
 */

let _seqLow = null;
let _seqHigh = null;
let _msecs = 0;
function v7(options, buf, offset) {
  options = options || {};

  // initialize buffer and pointer
  let i = buf && offset || 0;
  const b = buf || new Uint8Array(16);

  // rnds is Uint8Array(16) filled with random bytes
  const rnds = options.random || (options.rng || rng)();

  // milliseconds since unix epoch, 1970-01-01 00:00
  const msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // seq is user provided 31 bit counter
  let seq = options.seq !== undefined ? options.seq : null;

  // initialize local seq high/low parts
  let seqHigh = _seqHigh;
  let seqLow = _seqLow;

  // check if clock has advanced and user has not provided msecs
  if (msecs > _msecs && options.msecs === undefined) {
    _msecs = msecs;

    // unless user provided seq, reset seq parts
    if (seq !== null) {
      seqHigh = null;
      seqLow = null;
    }
  }

  // if we have a user provided seq
  if (seq !== null) {
    // trim provided seq to 31 bits of value, avoiding overflow
    if (seq > 0x7fffffff) {
      seq = 0x7fffffff;
    }

    // split provided seq into high/low parts
    seqHigh = seq >>> 19 & 0xfff;
    seqLow = seq & 0x7ffff;
  }

  // randomly initialize seq
  if (seqHigh === null || seqLow === null) {
    seqHigh = rnds[6] & 0x7f;
    seqHigh = seqHigh << 8 | rnds[7];
    seqLow = rnds[8] & 0x3f; // pad for var
    seqLow = seqLow << 8 | rnds[9];
    seqLow = seqLow << 5 | rnds[10] >>> 3;
  }

  // increment seq if within msecs window
  if (msecs + 10000 > _msecs && seq === null) {
    if (++seqLow > 0x7ffff) {
      seqLow = 0;
      if (++seqHigh > 0xfff) {
        seqHigh = 0;

        // increment internal _msecs. this allows us to continue incrementing
        // while staying monotonic. Note, once we hit 10k milliseconds beyond system
        // clock, we will reset breaking monotonicity (after (2^31)*10000 generations)
        _msecs++;
      }
    }
  } else {
    // resetting; we have advanced more than
    // 10k milliseconds beyond system clock
    _msecs = msecs;
  }
  _seqHigh = seqHigh;
  _seqLow = seqLow;

  // [bytes 0-5] 48 bits of local timestamp
  b[i++] = _msecs / 0x10000000000 & 0xff;
  b[i++] = _msecs / 0x100000000 & 0xff;
  b[i++] = _msecs / 0x1000000 & 0xff;
  b[i++] = _msecs / 0x10000 & 0xff;
  b[i++] = _msecs / 0x100 & 0xff;
  b[i++] = _msecs & 0xff;

  // [byte 6] - set 4 bits of version (7) with first 4 bits seq_hi
  b[i++] = seqHigh >>> 4 & 0x0f | 0x70;

  // [byte 7] remaining 8 bits of seq_hi
  b[i++] = seqHigh & 0xff;

  // [byte 8] - variant (2 bits), first 6 bits seq_low
  b[i++] = seqLow >>> 13 & 0x3f | 0x80;

  // [byte 9] 8 bits seq_low
  b[i++] = seqLow >>> 5 & 0xff;

  // [byte 10] remaining 5 bits seq_low, 3 bits random
  b[i++] = seqLow << 3 & 0xff | rnds[10] & 0x07;

  // [bytes 11-15] always random
  b[i++] = rnds[11];
  b[i++] = rnds[12];
  b[i++] = rnds[13];
  b[i++] = rnds[14];
  b[i++] = rnds[15];
  return buf || unsafeStringify(b);
}

function version$1(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.slice(14, 15), 16);
}

const esmNode = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    MAX: max,
    NIL: nil,
    parse,
    stringify,
    v1,
    v1ToV6,
    v3,
    v4,
    v5,
    v6,
    v6ToV1,
    v7,
    validate,
    version: version$1
}, Symbol.toStringTag, { value: 'Module' }));

const require$$1 = /*@__PURE__*/getAugmentedNamespace(esmNode);

var hasRequiredRequest;

function requireRequest () {
	if (hasRequiredRequest) return request;
	hasRequiredRequest = 1;
	(function (exports$1) {
		var __awaiter = (request && request.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.SvixRequest = exports$1.HttpMethod = exports$1.LIB_VERSION = void 0;
		const util_1 = requireUtil();
		const uuid_1 = require$$1;
		exports$1.LIB_VERSION = "1.76.1";
		const USER_AGENT = `svix-libs/${exports$1.LIB_VERSION}/javascript`;
		(function (HttpMethod) {
		    HttpMethod["GET"] = "GET";
		    HttpMethod["HEAD"] = "HEAD";
		    HttpMethod["POST"] = "POST";
		    HttpMethod["PUT"] = "PUT";
		    HttpMethod["DELETE"] = "DELETE";
		    HttpMethod["CONNECT"] = "CONNECT";
		    HttpMethod["OPTIONS"] = "OPTIONS";
		    HttpMethod["TRACE"] = "TRACE";
		    HttpMethod["PATCH"] = "PATCH";
		})(exports$1.HttpMethod || (exports$1.HttpMethod = {}));
		class SvixRequest {
		    constructor(method, path) {
		        this.method = method;
		        this.path = path;
		        this.queryParams = {};
		        this.headerParams = {};
		    }
		    setPathParam(name, value) {
		        const newPath = this.path.replace(`{${name}}`, encodeURIComponent(value));
		        if (this.path === newPath) {
		            throw new Error(`path parameter ${name} not found`);
		        }
		        this.path = newPath;
		    }
		    setQueryParam(name, value) {
		        if (value === undefined || value === null) {
		            return;
		        }
		        if (typeof value === "string") {
		            this.queryParams[name] = value;
		        }
		        else if (typeof value === "boolean" || typeof value === "number") {
		            this.queryParams[name] = value.toString();
		        }
		        else if (value instanceof Date) {
		            this.queryParams[name] = value.toISOString();
		        }
		        else if (value instanceof Array) {
		            if (value.length > 0) {
		                this.queryParams[name] = value.join(",");
		            }
		        }
		        else {
		            throw new Error(`query parameter ${name} has unsupported type`);
		        }
		    }
		    setHeaderParam(name, value) {
		        if (value === undefined) {
		            return;
		        }
		        this.headerParams[name] = value;
		    }
		    setBody(value) {
		        this.body = JSON.stringify(value);
		    }
		    send(ctx, parseResponseBody) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield this.sendInner(ctx);
		            if (response.status == 204) {
		                return null;
		            }
		            const responseBody = yield response.text();
		            return parseResponseBody(JSON.parse(responseBody));
		        });
		    }
		    sendNoResponseBody(ctx) {
		        return __awaiter(this, void 0, void 0, function* () {
		            yield this.sendInner(ctx);
		        });
		    }
		    sendInner(ctx) {
		        var _a, _b;
		        return __awaiter(this, void 0, void 0, function* () {
		            const url = new URL(ctx.baseUrl + this.path);
		            for (const [name, value] of Object.entries(this.queryParams)) {
		                url.searchParams.set(name, value);
		            }
		            if (this.headerParams["idempotency-key"] === undefined &&
		                this.method.toUpperCase() === "POST") {
		                this.headerParams["idempotency-key"] = "auto_" + (0, uuid_1.v4)();
		            }
		            const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		            if (this.body != null) {
		                this.headerParams["content-type"] = "application/json";
		            }
		            const isCredentialsSupported = "credentials" in Request.prototype;
		            const response = yield sendWithRetry(url, {
		                method: this.method.toString(),
		                body: this.body,
		                headers: Object.assign({ accept: "application/json, */*;q=0.8", authorization: `Bearer ${ctx.token}`, "user-agent": USER_AGENT, "svix-req-id": randomId.toString() }, this.headerParams),
		                credentials: isCredentialsSupported ? "same-origin" : undefined,
		                signal: ctx.timeout !== undefined ? AbortSignal.timeout(ctx.timeout) : undefined,
		            }, ctx.retryScheduleInMs, (_a = ctx.retryScheduleInMs) === null || _a === void 0 ? void 0 : _a[0], ((_b = ctx.retryScheduleInMs) === null || _b === void 0 ? void 0 : _b.length) || ctx.numRetries);
		            return filterResponseForErrors(response);
		        });
		    }
		}
		exports$1.SvixRequest = SvixRequest;
		function filterResponseForErrors(response) {
		    return __awaiter(this, void 0, void 0, function* () {
		        if (response.status < 300) {
		            return response;
		        }
		        const responseBody = yield response.text();
		        if (response.status === 422) {
		            throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
		        }
		        if (response.status >= 400 && response.status <= 499) {
		            throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
		        }
		        throw new util_1.ApiException(response.status, responseBody, response.headers);
		    });
		}
		function sendWithRetry(url, init, retryScheduleInMs, nextInterval = 50, triesLeft = 2, retryCount = 1) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const sleep = (interval) => new Promise((resolve) => setTimeout(resolve, interval));
		        try {
		            const response = yield fetch(url, init);
		            if (triesLeft <= 0 || response.status < 500) {
		                return response;
		            }
		        }
		        catch (e) {
		            if (triesLeft <= 0) {
		                throw e;
		            }
		        }
		        yield sleep(nextInterval);
		        init.headers["svix-retry-count"] = retryCount.toString();
		        nextInterval = (retryScheduleInMs === null || retryScheduleInMs === void 0 ? void 0 : retryScheduleInMs[retryCount]) || nextInterval * 2;
		        return yield sendWithRetry(url, init, retryScheduleInMs, nextInterval, --triesLeft, ++retryCount);
		    });
		}
		
	} (request));
	return request;
}

var hasRequiredApplication;

function requireApplication () {
	if (hasRequiredApplication) return application;
	hasRequiredApplication = 1;
	Object.defineProperty(application, "__esModule", { value: true });
	application.Application = void 0;
	const applicationIn_1 = requireApplicationIn();
	const applicationOut_1 = requireApplicationOut();
	const applicationPatch_1 = requireApplicationPatch();
	const listResponseApplicationOut_1 = requireListResponseApplicationOut();
	const request_1 = requireRequest();
	class Application {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app");
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseApplicationOut_1.ListResponseApplicationOutSerializer._fromJsonObject);
	    }
	    create(applicationIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
	        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
	    }
	    getOrCreate(applicationIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
	        request.setQueryParam("get_if_exists", true);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
	        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
	    }
	    get(appId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}");
	        request.setPathParam("app_id", appId);
	        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
	    }
	    update(appId, applicationIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}");
	        request.setPathParam("app_id", appId);
	        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
	        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
	    }
	    delete(appId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}");
	        request.setPathParam("app_id", appId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    patch(appId, applicationPatch) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}");
	        request.setPathParam("app_id", appId);
	        request.setBody(applicationPatch_1.ApplicationPatchSerializer._toJsonObject(applicationPatch));
	        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
	    }
	}
	application.Application = Application;
	
	return application;
}

var authentication = {};

var appPortalAccessIn = {};

var appPortalCapability = {};

var hasRequiredAppPortalCapability;

function requireAppPortalCapability () {
	if (hasRequiredAppPortalCapability) return appPortalCapability;
	hasRequiredAppPortalCapability = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.AppPortalCapabilitySerializer = exports$1.AppPortalCapability = void 0;
		(function (AppPortalCapability) {
		    AppPortalCapability["ViewBase"] = "ViewBase";
		    AppPortalCapability["ViewEndpointSecret"] = "ViewEndpointSecret";
		    AppPortalCapability["ManageEndpointSecret"] = "ManageEndpointSecret";
		    AppPortalCapability["ManageTransformations"] = "ManageTransformations";
		    AppPortalCapability["CreateAttempts"] = "CreateAttempts";
		    AppPortalCapability["ManageEndpoint"] = "ManageEndpoint";
		})(exports$1.AppPortalCapability || (exports$1.AppPortalCapability = {}));
		exports$1.AppPortalCapabilitySerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (appPortalCapability));
	return appPortalCapability;
}

var hasRequiredAppPortalAccessIn;

function requireAppPortalAccessIn () {
	if (hasRequiredAppPortalAccessIn) return appPortalAccessIn;
	hasRequiredAppPortalAccessIn = 1;
	Object.defineProperty(appPortalAccessIn, "__esModule", { value: true });
	appPortalAccessIn.AppPortalAccessInSerializer = void 0;
	const appPortalCapability_1 = requireAppPortalCapability();
	const applicationIn_1 = requireApplicationIn();
	appPortalAccessIn.AppPortalAccessInSerializer = {
	    _fromJsonObject(object) {
	        var _a;
	        return {
	            application: object["application"]
	                ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"])
	                : undefined,
	            capabilities: (_a = object["capabilities"]) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._fromJsonObject(item)),
	            expiry: object["expiry"],
	            featureFlags: object["featureFlags"],
	            readOnly: object["readOnly"],
	            sessionId: object["sessionId"],
	        };
	    },
	    _toJsonObject(self) {
	        var _a;
	        return {
	            application: self.application
	                ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application)
	                : undefined,
	            capabilities: (_a = self.capabilities) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._toJsonObject(item)),
	            expiry: self.expiry,
	            featureFlags: self.featureFlags,
	            readOnly: self.readOnly,
	            sessionId: self.sessionId,
	        };
	    },
	};
	
	return appPortalAccessIn;
}

var appPortalAccessOut = {};

var hasRequiredAppPortalAccessOut;

function requireAppPortalAccessOut () {
	if (hasRequiredAppPortalAccessOut) return appPortalAccessOut;
	hasRequiredAppPortalAccessOut = 1;
	Object.defineProperty(appPortalAccessOut, "__esModule", { value: true });
	appPortalAccessOut.AppPortalAccessOutSerializer = void 0;
	appPortalAccessOut.AppPortalAccessOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            token: object["token"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            token: self.token,
	            url: self.url,
	        };
	    },
	};
	
	return appPortalAccessOut;
}

var applicationTokenExpireIn = {};

var hasRequiredApplicationTokenExpireIn;

function requireApplicationTokenExpireIn () {
	if (hasRequiredApplicationTokenExpireIn) return applicationTokenExpireIn;
	hasRequiredApplicationTokenExpireIn = 1;
	Object.defineProperty(applicationTokenExpireIn, "__esModule", { value: true });
	applicationTokenExpireIn.ApplicationTokenExpireInSerializer = void 0;
	applicationTokenExpireIn.ApplicationTokenExpireInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            expiry: object["expiry"],
	            sessionIds: object["sessionIds"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            expiry: self.expiry,
	            sessionIds: self.sessionIds,
	        };
	    },
	};
	
	return applicationTokenExpireIn;
}

var dashboardAccessOut = {};

var hasRequiredDashboardAccessOut;

function requireDashboardAccessOut () {
	if (hasRequiredDashboardAccessOut) return dashboardAccessOut;
	hasRequiredDashboardAccessOut = 1;
	Object.defineProperty(dashboardAccessOut, "__esModule", { value: true });
	dashboardAccessOut.DashboardAccessOutSerializer = void 0;
	dashboardAccessOut.DashboardAccessOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            token: object["token"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            token: self.token,
	            url: self.url,
	        };
	    },
	};
	
	return dashboardAccessOut;
}

var hasRequiredAuthentication;

function requireAuthentication () {
	if (hasRequiredAuthentication) return authentication;
	hasRequiredAuthentication = 1;
	Object.defineProperty(authentication, "__esModule", { value: true });
	authentication.Authentication = void 0;
	const appPortalAccessIn_1 = requireAppPortalAccessIn();
	const appPortalAccessOut_1 = requireAppPortalAccessOut();
	const applicationTokenExpireIn_1 = requireApplicationTokenExpireIn();
	const dashboardAccessOut_1 = requireDashboardAccessOut();
	const request_1 = requireRequest();
	class Authentication {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    appPortalAccess(appId, appPortalAccessIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app-portal-access/{app_id}");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(appPortalAccessIn_1.AppPortalAccessInSerializer._toJsonObject(appPortalAccessIn));
	        return request.send(this.requestCtx, appPortalAccessOut_1.AppPortalAccessOutSerializer._fromJsonObject);
	    }
	    expireAll(appId, applicationTokenExpireIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app/{app_id}/expire-all");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(applicationTokenExpireIn_1.ApplicationTokenExpireInSerializer._toJsonObject(applicationTokenExpireIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    dashboardAccess(appId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/dashboard-access/{app_id}");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
	    }
	    logout(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/logout");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	authentication.Authentication = Authentication;
	
	return authentication;
}

var backgroundTask = {};

var backgroundTaskOut = {};

var backgroundTaskStatus = {};

var hasRequiredBackgroundTaskStatus;

function requireBackgroundTaskStatus () {
	if (hasRequiredBackgroundTaskStatus) return backgroundTaskStatus;
	hasRequiredBackgroundTaskStatus = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.BackgroundTaskStatusSerializer = exports$1.BackgroundTaskStatus = void 0;
		(function (BackgroundTaskStatus) {
		    BackgroundTaskStatus["Running"] = "running";
		    BackgroundTaskStatus["Finished"] = "finished";
		    BackgroundTaskStatus["Failed"] = "failed";
		})(exports$1.BackgroundTaskStatus || (exports$1.BackgroundTaskStatus = {}));
		exports$1.BackgroundTaskStatusSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (backgroundTaskStatus));
	return backgroundTaskStatus;
}

var backgroundTaskType = {};

var hasRequiredBackgroundTaskType;

function requireBackgroundTaskType () {
	if (hasRequiredBackgroundTaskType) return backgroundTaskType;
	hasRequiredBackgroundTaskType = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.BackgroundTaskTypeSerializer = exports$1.BackgroundTaskType = void 0;
		(function (BackgroundTaskType) {
		    BackgroundTaskType["EndpointReplay"] = "endpoint.replay";
		    BackgroundTaskType["EndpointRecover"] = "endpoint.recover";
		    BackgroundTaskType["ApplicationStats"] = "application.stats";
		    BackgroundTaskType["MessageBroadcast"] = "message.broadcast";
		    BackgroundTaskType["SdkGenerate"] = "sdk.generate";
		    BackgroundTaskType["EventTypeAggregate"] = "event-type.aggregate";
		    BackgroundTaskType["ApplicationPurgeContent"] = "application.purge_content";
		})(exports$1.BackgroundTaskType || (exports$1.BackgroundTaskType = {}));
		exports$1.BackgroundTaskTypeSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (backgroundTaskType));
	return backgroundTaskType;
}

var hasRequiredBackgroundTaskOut;

function requireBackgroundTaskOut () {
	if (hasRequiredBackgroundTaskOut) return backgroundTaskOut;
	hasRequiredBackgroundTaskOut = 1;
	Object.defineProperty(backgroundTaskOut, "__esModule", { value: true });
	backgroundTaskOut.BackgroundTaskOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	backgroundTaskOut.BackgroundTaskOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"],
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data,
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	        };
	    },
	};
	
	return backgroundTaskOut;
}

var listResponseBackgroundTaskOut = {};

var hasRequiredListResponseBackgroundTaskOut;

function requireListResponseBackgroundTaskOut () {
	if (hasRequiredListResponseBackgroundTaskOut) return listResponseBackgroundTaskOut;
	hasRequiredListResponseBackgroundTaskOut = 1;
	Object.defineProperty(listResponseBackgroundTaskOut, "__esModule", { value: true });
	listResponseBackgroundTaskOut.ListResponseBackgroundTaskOutSerializer = void 0;
	const backgroundTaskOut_1 = requireBackgroundTaskOut();
	listResponseBackgroundTaskOut.ListResponseBackgroundTaskOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseBackgroundTaskOut;
}

var hasRequiredBackgroundTask;

function requireBackgroundTask () {
	if (hasRequiredBackgroundTask) return backgroundTask;
	hasRequiredBackgroundTask = 1;
	Object.defineProperty(backgroundTask, "__esModule", { value: true });
	backgroundTask.BackgroundTask = void 0;
	const backgroundTaskOut_1 = requireBackgroundTaskOut();
	const listResponseBackgroundTaskOut_1 = requireListResponseBackgroundTaskOut();
	const request_1 = requireRequest();
	class BackgroundTask {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task");
	        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
	        request.setQueryParam("task", options === null || options === void 0 ? void 0 : options.task);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseBackgroundTaskOut_1.ListResponseBackgroundTaskOutSerializer._fromJsonObject);
	    }
	    listByEndpoint(options) {
	        return this.list(options);
	    }
	    get(taskId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task/{task_id}");
	        request.setPathParam("task_id", taskId);
	        return request.send(this.requestCtx, backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject);
	    }
	}
	backgroundTask.BackgroundTask = BackgroundTask;
	
	return backgroundTask;
}

var endpoint = {};

var endpointHeadersIn = {};

var hasRequiredEndpointHeadersIn;

function requireEndpointHeadersIn () {
	if (hasRequiredEndpointHeadersIn) return endpointHeadersIn;
	hasRequiredEndpointHeadersIn = 1;
	Object.defineProperty(endpointHeadersIn, "__esModule", { value: true });
	endpointHeadersIn.EndpointHeadersInSerializer = void 0;
	endpointHeadersIn.EndpointHeadersInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	        };
	    },
	};
	
	return endpointHeadersIn;
}

var endpointHeadersOut = {};

var hasRequiredEndpointHeadersOut;

function requireEndpointHeadersOut () {
	if (hasRequiredEndpointHeadersOut) return endpointHeadersOut;
	hasRequiredEndpointHeadersOut = 1;
	Object.defineProperty(endpointHeadersOut, "__esModule", { value: true });
	endpointHeadersOut.EndpointHeadersOutSerializer = void 0;
	endpointHeadersOut.EndpointHeadersOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	            sensitive: object["sensitive"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	            sensitive: self.sensitive,
	        };
	    },
	};
	
	return endpointHeadersOut;
}

var endpointHeadersPatchIn = {};

var hasRequiredEndpointHeadersPatchIn;

function requireEndpointHeadersPatchIn () {
	if (hasRequiredEndpointHeadersPatchIn) return endpointHeadersPatchIn;
	hasRequiredEndpointHeadersPatchIn = 1;
	Object.defineProperty(endpointHeadersPatchIn, "__esModule", { value: true });
	endpointHeadersPatchIn.EndpointHeadersPatchInSerializer = void 0;
	endpointHeadersPatchIn.EndpointHeadersPatchInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            deleteHeaders: object["deleteHeaders"],
	            headers: object["headers"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            deleteHeaders: self.deleteHeaders,
	            headers: self.headers,
	        };
	    },
	};
	
	return endpointHeadersPatchIn;
}

var endpointIn = {};

var hasRequiredEndpointIn;

function requireEndpointIn () {
	if (hasRequiredEndpointIn) return endpointIn;
	hasRequiredEndpointIn = 1;
	Object.defineProperty(endpointIn, "__esModule", { value: true });
	endpointIn.EndpointInSerializer = void 0;
	endpointIn.EndpointInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            headers: object["headers"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            secret: object["secret"],
	            uid: object["uid"],
	            url: object["url"],
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            headers: self.headers,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            secret: self.secret,
	            uid: self.uid,
	            url: self.url,
	            version: self.version,
	        };
	    },
	};
	
	return endpointIn;
}

var endpointOut = {};

var hasRequiredEndpointOut;

function requireEndpointOut () {
	if (hasRequiredEndpointOut) return endpointOut;
	hasRequiredEndpointOut = 1;
	Object.defineProperty(endpointOut, "__esModule", { value: true });
	endpointOut.EndpointOutSerializer = void 0;
	endpointOut.EndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            createdAt: new Date(object["createdAt"]),
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            id: object["id"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	            url: object["url"],
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            createdAt: self.createdAt,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            id: self.id,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	            url: self.url,
	            version: self.version,
	        };
	    },
	};
	
	return endpointOut;
}

var endpointPatch = {};

var hasRequiredEndpointPatch;

function requireEndpointPatch () {
	if (hasRequiredEndpointPatch) return endpointPatch;
	hasRequiredEndpointPatch = 1;
	Object.defineProperty(endpointPatch, "__esModule", { value: true });
	endpointPatch.EndpointPatchSerializer = void 0;
	endpointPatch.EndpointPatchSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            secret: object["secret"],
	            uid: object["uid"],
	            url: object["url"],
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            secret: self.secret,
	            uid: self.uid,
	            url: self.url,
	            version: self.version,
	        };
	    },
	};
	
	return endpointPatch;
}

var endpointSecretOut = {};

var hasRequiredEndpointSecretOut;

function requireEndpointSecretOut () {
	if (hasRequiredEndpointSecretOut) return endpointSecretOut;
	hasRequiredEndpointSecretOut = 1;
	Object.defineProperty(endpointSecretOut, "__esModule", { value: true });
	endpointSecretOut.EndpointSecretOutSerializer = void 0;
	endpointSecretOut.EndpointSecretOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return endpointSecretOut;
}

var endpointSecretRotateIn = {};

var hasRequiredEndpointSecretRotateIn;

function requireEndpointSecretRotateIn () {
	if (hasRequiredEndpointSecretRotateIn) return endpointSecretRotateIn;
	hasRequiredEndpointSecretRotateIn = 1;
	Object.defineProperty(endpointSecretRotateIn, "__esModule", { value: true });
	endpointSecretRotateIn.EndpointSecretRotateInSerializer = void 0;
	endpointSecretRotateIn.EndpointSecretRotateInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return endpointSecretRotateIn;
}

var endpointStats = {};

var hasRequiredEndpointStats;

function requireEndpointStats () {
	if (hasRequiredEndpointStats) return endpointStats;
	hasRequiredEndpointStats = 1;
	Object.defineProperty(endpointStats, "__esModule", { value: true });
	endpointStats.EndpointStatsSerializer = void 0;
	endpointStats.EndpointStatsSerializer = {
	    _fromJsonObject(object) {
	        return {
	            fail: object["fail"],
	            pending: object["pending"],
	            sending: object["sending"],
	            success: object["success"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            fail: self.fail,
	            pending: self.pending,
	            sending: self.sending,
	            success: self.success,
	        };
	    },
	};
	
	return endpointStats;
}

var endpointTransformationIn = {};

var hasRequiredEndpointTransformationIn;

function requireEndpointTransformationIn () {
	if (hasRequiredEndpointTransformationIn) return endpointTransformationIn;
	hasRequiredEndpointTransformationIn = 1;
	Object.defineProperty(endpointTransformationIn, "__esModule", { value: true });
	endpointTransformationIn.EndpointTransformationInSerializer = void 0;
	endpointTransformationIn.EndpointTransformationInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            code: object["code"],
	            enabled: object["enabled"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            code: self.code,
	            enabled: self.enabled,
	        };
	    },
	};
	
	return endpointTransformationIn;
}

var endpointTransformationOut = {};

var hasRequiredEndpointTransformationOut;

function requireEndpointTransformationOut () {
	if (hasRequiredEndpointTransformationOut) return endpointTransformationOut;
	hasRequiredEndpointTransformationOut = 1;
	Object.defineProperty(endpointTransformationOut, "__esModule", { value: true });
	endpointTransformationOut.EndpointTransformationOutSerializer = void 0;
	endpointTransformationOut.EndpointTransformationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            code: object["code"],
	            enabled: object["enabled"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            code: self.code,
	            enabled: self.enabled,
	        };
	    },
	};
	
	return endpointTransformationOut;
}

var endpointTransformationPatch = {};

var hasRequiredEndpointTransformationPatch;

function requireEndpointTransformationPatch () {
	if (hasRequiredEndpointTransformationPatch) return endpointTransformationPatch;
	hasRequiredEndpointTransformationPatch = 1;
	Object.defineProperty(endpointTransformationPatch, "__esModule", { value: true });
	endpointTransformationPatch.EndpointTransformationPatchSerializer = void 0;
	endpointTransformationPatch.EndpointTransformationPatchSerializer = {
	    _fromJsonObject(object) {
	        return {
	            code: object["code"],
	            enabled: object["enabled"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            code: self.code,
	            enabled: self.enabled,
	        };
	    },
	};
	
	return endpointTransformationPatch;
}

var endpointUpdate = {};

var hasRequiredEndpointUpdate;

function requireEndpointUpdate () {
	if (hasRequiredEndpointUpdate) return endpointUpdate;
	hasRequiredEndpointUpdate = 1;
	Object.defineProperty(endpointUpdate, "__esModule", { value: true });
	endpointUpdate.EndpointUpdateSerializer = void 0;
	endpointUpdate.EndpointUpdateSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            url: object["url"],
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            url: self.url,
	            version: self.version,
	        };
	    },
	};
	
	return endpointUpdate;
}

var eventExampleIn = {};

var hasRequiredEventExampleIn;

function requireEventExampleIn () {
	if (hasRequiredEventExampleIn) return eventExampleIn;
	hasRequiredEventExampleIn = 1;
	Object.defineProperty(eventExampleIn, "__esModule", { value: true });
	eventExampleIn.EventExampleInSerializer = void 0;
	eventExampleIn.EventExampleInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            eventType: object["eventType"],
	            exampleIndex: object["exampleIndex"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            eventType: self.eventType,
	            exampleIndex: self.exampleIndex,
	        };
	    },
	};
	
	return eventExampleIn;
}

var listResponseEndpointOut = {};

var hasRequiredListResponseEndpointOut;

function requireListResponseEndpointOut () {
	if (hasRequiredListResponseEndpointOut) return listResponseEndpointOut;
	hasRequiredListResponseEndpointOut = 1;
	Object.defineProperty(listResponseEndpointOut, "__esModule", { value: true });
	listResponseEndpointOut.ListResponseEndpointOutSerializer = void 0;
	const endpointOut_1 = requireEndpointOut();
	listResponseEndpointOut.ListResponseEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => endpointOut_1.EndpointOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => endpointOut_1.EndpointOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseEndpointOut;
}

var messageOut = {};

var hasRequiredMessageOut;

function requireMessageOut () {
	if (hasRequiredMessageOut) return messageOut;
	hasRequiredMessageOut = 1;
	Object.defineProperty(messageOut, "__esModule", { value: true });
	messageOut.MessageOutSerializer = void 0;
	messageOut.MessageOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            eventId: object["eventId"],
	            eventType: object["eventType"],
	            id: object["id"],
	            payload: object["payload"],
	            tags: object["tags"],
	            timestamp: new Date(object["timestamp"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            eventId: self.eventId,
	            eventType: self.eventType,
	            id: self.id,
	            payload: self.payload,
	            tags: self.tags,
	            timestamp: self.timestamp,
	        };
	    },
	};
	
	return messageOut;
}

var recoverIn = {};

var hasRequiredRecoverIn;

function requireRecoverIn () {
	if (hasRequiredRecoverIn) return recoverIn;
	hasRequiredRecoverIn = 1;
	Object.defineProperty(recoverIn, "__esModule", { value: true });
	recoverIn.RecoverInSerializer = void 0;
	recoverIn.RecoverInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            since: new Date(object["since"]),
	            until: object["until"] ? new Date(object["until"]) : null,
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            since: self.since,
	            until: self.until,
	        };
	    },
	};
	
	return recoverIn;
}

var recoverOut = {};

var hasRequiredRecoverOut;

function requireRecoverOut () {
	if (hasRequiredRecoverOut) return recoverOut;
	hasRequiredRecoverOut = 1;
	Object.defineProperty(recoverOut, "__esModule", { value: true });
	recoverOut.RecoverOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	recoverOut.RecoverOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	        };
	    },
	};
	
	return recoverOut;
}

var replayIn = {};

var hasRequiredReplayIn;

function requireReplayIn () {
	if (hasRequiredReplayIn) return replayIn;
	hasRequiredReplayIn = 1;
	Object.defineProperty(replayIn, "__esModule", { value: true });
	replayIn.ReplayInSerializer = void 0;
	replayIn.ReplayInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            since: new Date(object["since"]),
	            until: object["until"] ? new Date(object["until"]) : null,
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            since: self.since,
	            until: self.until,
	        };
	    },
	};
	
	return replayIn;
}

var replayOut = {};

var hasRequiredReplayOut;

function requireReplayOut () {
	if (hasRequiredReplayOut) return replayOut;
	hasRequiredReplayOut = 1;
	Object.defineProperty(replayOut, "__esModule", { value: true });
	replayOut.ReplayOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	replayOut.ReplayOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	        };
	    },
	};
	
	return replayOut;
}

var hasRequiredEndpoint;

function requireEndpoint () {
	if (hasRequiredEndpoint) return endpoint;
	hasRequiredEndpoint = 1;
	Object.defineProperty(endpoint, "__esModule", { value: true });
	endpoint.Endpoint = void 0;
	const endpointHeadersIn_1 = requireEndpointHeadersIn();
	const endpointHeadersOut_1 = requireEndpointHeadersOut();
	const endpointHeadersPatchIn_1 = requireEndpointHeadersPatchIn();
	const endpointIn_1 = requireEndpointIn();
	const endpointOut_1 = requireEndpointOut();
	const endpointPatch_1 = requireEndpointPatch();
	const endpointSecretOut_1 = requireEndpointSecretOut();
	const endpointSecretRotateIn_1 = requireEndpointSecretRotateIn();
	const endpointStats_1 = requireEndpointStats();
	const endpointTransformationIn_1 = requireEndpointTransformationIn();
	const endpointTransformationOut_1 = requireEndpointTransformationOut();
	const endpointTransformationPatch_1 = requireEndpointTransformationPatch();
	const endpointUpdate_1 = requireEndpointUpdate();
	const eventExampleIn_1 = requireEventExampleIn();
	const listResponseEndpointOut_1 = requireListResponseEndpointOut();
	const messageOut_1 = requireMessageOut();
	const recoverIn_1 = requireRecoverIn();
	const recoverOut_1 = requireRecoverOut();
	const replayIn_1 = requireReplayIn();
	const replayOut_1 = requireReplayOut();
	const request_1 = requireRequest();
	class Endpoint {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(appId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint");
	        request.setPathParam("app_id", appId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseEndpointOut_1.ListResponseEndpointOutSerializer._fromJsonObject);
	    }
	    create(appId, endpointIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(endpointIn_1.EndpointInSerializer._toJsonObject(endpointIn));
	        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
	    }
	    get(appId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
	    }
	    update(appId, endpointId, endpointUpdate) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointUpdate_1.EndpointUpdateSerializer._toJsonObject(endpointUpdate));
	        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
	    }
	    delete(appId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    patch(appId, endpointId, endpointPatch) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointPatch_1.EndpointPatchSerializer._toJsonObject(endpointPatch));
	        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
	    }
	    getHeaders(appId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
	    }
	    updateHeaders(appId, endpointId, endpointHeadersIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointHeadersIn_1.EndpointHeadersInSerializer._toJsonObject(endpointHeadersIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    headersUpdate(appId, endpointId, endpointHeadersIn) {
	        return this.updateHeaders(appId, endpointId, endpointHeadersIn);
	    }
	    patchHeaders(appId, endpointId, endpointHeadersPatchIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointHeadersPatchIn_1.EndpointHeadersPatchInSerializer._toJsonObject(endpointHeadersPatchIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    headersPatch(appId, endpointId, endpointHeadersPatchIn) {
	        return this.patchHeaders(appId, endpointId, endpointHeadersPatchIn);
	    }
	    recover(appId, endpointId, recoverIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(recoverIn_1.RecoverInSerializer._toJsonObject(recoverIn));
	        return request.send(this.requestCtx, recoverOut_1.RecoverOutSerializer._fromJsonObject);
	    }
	    replayMissing(appId, endpointId, replayIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/replay-missing");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(replayIn_1.ReplayInSerializer._toJsonObject(replayIn));
	        return request.send(this.requestCtx, replayOut_1.ReplayOutSerializer._fromJsonObject);
	    }
	    getSecret(appId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, endpointSecretOut_1.EndpointSecretOutSerializer._fromJsonObject);
	    }
	    rotateSecret(appId, endpointId, endpointSecretRotateIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(endpointSecretRotateIn_1.EndpointSecretRotateInSerializer._toJsonObject(endpointSecretRotateIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    sendExample(appId, endpointId, eventExampleIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/send-example");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(eventExampleIn_1.EventExampleInSerializer._toJsonObject(eventExampleIn));
	        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
	    }
	    getStats(appId, endpointId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/stats");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setQueryParam("since", options === null || options === void 0 ? void 0 : options.since);
	        request.setQueryParam("until", options === null || options === void 0 ? void 0 : options.until);
	        return request.send(this.requestCtx, endpointStats_1.EndpointStatsSerializer._fromJsonObject);
	    }
	    transformationGet(appId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, endpointTransformationOut_1.EndpointTransformationOutSerializer._fromJsonObject);
	    }
	    patchTransformation(appId, endpointId, endpointTransformationPatch) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointTransformationPatch_1.EndpointTransformationPatchSerializer._toJsonObject(endpointTransformationPatch));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    transformationPartialUpdate(appId, endpointId, endpointTransformationIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(endpointTransformationIn_1.EndpointTransformationInSerializer._toJsonObject(endpointTransformationIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	endpoint.Endpoint = Endpoint;
	
	return endpoint;
}

var environment = {};

var environmentIn = {};

var connectorIn = {};

var connectorKind = {};

var hasRequiredConnectorKind;

function requireConnectorKind () {
	if (hasRequiredConnectorKind) return connectorKind;
	hasRequiredConnectorKind = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.ConnectorKindSerializer = exports$1.ConnectorKind = void 0;
		(function (ConnectorKind) {
		    ConnectorKind["Custom"] = "Custom";
		    ConnectorKind["CloseCrm"] = "CloseCRM";
		    ConnectorKind["CustomerIo"] = "CustomerIO";
		    ConnectorKind["Discord"] = "Discord";
		    ConnectorKind["Hubspot"] = "Hubspot";
		    ConnectorKind["Inngest"] = "Inngest";
		    ConnectorKind["Loops"] = "Loops";
		    ConnectorKind["Resend"] = "Resend";
		    ConnectorKind["Salesforce"] = "Salesforce";
		    ConnectorKind["Segment"] = "Segment";
		    ConnectorKind["Sendgrid"] = "Sendgrid";
		    ConnectorKind["Slack"] = "Slack";
		    ConnectorKind["Teams"] = "Teams";
		    ConnectorKind["TriggerDev"] = "TriggerDev";
		    ConnectorKind["Windmill"] = "Windmill";
		    ConnectorKind["Zapier"] = "Zapier";
		})(exports$1.ConnectorKind || (exports$1.ConnectorKind = {}));
		exports$1.ConnectorKindSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (connectorKind));
	return connectorKind;
}

var hasRequiredConnectorIn;

function requireConnectorIn () {
	if (hasRequiredConnectorIn) return connectorIn;
	hasRequiredConnectorIn = 1;
	Object.defineProperty(connectorIn, "__esModule", { value: true });
	connectorIn.ConnectorInSerializer = void 0;
	const connectorKind_1 = requireConnectorKind();
	connectorIn.ConnectorInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            filterTypes: object["filterTypes"],
	            instructions: object["instructions"],
	            instructionsLink: object["instructionsLink"],
	            kind: object["kind"]
	                ? connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"])
	                : undefined,
	            logo: object["logo"],
	            name: object["name"],
	            transformation: object["transformation"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            filterTypes: self.filterTypes,
	            instructions: self.instructions,
	            instructionsLink: self.instructionsLink,
	            kind: self.kind ? connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind) : undefined,
	            logo: self.logo,
	            name: self.name,
	            transformation: self.transformation,
	        };
	    },
	};
	
	return connectorIn;
}

var eventTypeIn = {};

var hasRequiredEventTypeIn;

function requireEventTypeIn () {
	if (hasRequiredEventTypeIn) return eventTypeIn;
	hasRequiredEventTypeIn = 1;
	Object.defineProperty(eventTypeIn, "__esModule", { value: true });
	eventTypeIn.EventTypeInSerializer = void 0;
	eventTypeIn.EventTypeInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            archived: object["archived"],
	            deprecated: object["deprecated"],
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            groupName: object["groupName"],
	            name: object["name"],
	            schemas: object["schemas"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            archived: self.archived,
	            deprecated: self.deprecated,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            groupName: self.groupName,
	            name: self.name,
	            schemas: self.schemas,
	        };
	    },
	};
	
	return eventTypeIn;
}

var hasRequiredEnvironmentIn;

function requireEnvironmentIn () {
	if (hasRequiredEnvironmentIn) return environmentIn;
	hasRequiredEnvironmentIn = 1;
	Object.defineProperty(environmentIn, "__esModule", { value: true });
	environmentIn.EnvironmentInSerializer = void 0;
	const connectorIn_1 = requireConnectorIn();
	const eventTypeIn_1 = requireEventTypeIn();
	environmentIn.EnvironmentInSerializer = {
	    _fromJsonObject(object) {
	        var _a, _b;
	        return {
	            connectors: (_a = object["connectors"]) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._fromJsonObject(item)),
	            eventTypes: (_b = object["eventTypes"]) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._fromJsonObject(item)),
	            settings: object["settings"],
	        };
	    },
	    _toJsonObject(self) {
	        var _a, _b;
	        return {
	            connectors: (_a = self.connectors) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._toJsonObject(item)),
	            eventTypes: (_b = self.eventTypes) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._toJsonObject(item)),
	            settings: self.settings,
	        };
	    },
	};
	
	return environmentIn;
}

var environmentOut = {};

var connectorOut = {};

var hasRequiredConnectorOut;

function requireConnectorOut () {
	if (hasRequiredConnectorOut) return connectorOut;
	hasRequiredConnectorOut = 1;
	Object.defineProperty(connectorOut, "__esModule", { value: true });
	connectorOut.ConnectorOutSerializer = void 0;
	const connectorKind_1 = requireConnectorKind();
	connectorOut.ConnectorOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            filterTypes: object["filterTypes"],
	            id: object["id"],
	            instructions: object["instructions"],
	            instructionsLink: object["instructionsLink"],
	            kind: connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]),
	            logo: object["logo"],
	            name: object["name"],
	            orgId: object["orgId"],
	            transformation: object["transformation"],
	            updatedAt: new Date(object["updatedAt"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            filterTypes: self.filterTypes,
	            id: self.id,
	            instructions: self.instructions,
	            instructionsLink: self.instructionsLink,
	            kind: connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind),
	            logo: self.logo,
	            name: self.name,
	            orgId: self.orgId,
	            transformation: self.transformation,
	            updatedAt: self.updatedAt,
	        };
	    },
	};
	
	return connectorOut;
}

var eventTypeOut = {};

var hasRequiredEventTypeOut;

function requireEventTypeOut () {
	if (hasRequiredEventTypeOut) return eventTypeOut;
	hasRequiredEventTypeOut = 1;
	Object.defineProperty(eventTypeOut, "__esModule", { value: true });
	eventTypeOut.EventTypeOutSerializer = void 0;
	eventTypeOut.EventTypeOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            archived: object["archived"],
	            createdAt: new Date(object["createdAt"]),
	            deprecated: object["deprecated"],
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            groupName: object["groupName"],
	            name: object["name"],
	            schemas: object["schemas"],
	            updatedAt: new Date(object["updatedAt"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            archived: self.archived,
	            createdAt: self.createdAt,
	            deprecated: self.deprecated,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            groupName: self.groupName,
	            name: self.name,
	            schemas: self.schemas,
	            updatedAt: self.updatedAt,
	        };
	    },
	};
	
	return eventTypeOut;
}

var hasRequiredEnvironmentOut;

function requireEnvironmentOut () {
	if (hasRequiredEnvironmentOut) return environmentOut;
	hasRequiredEnvironmentOut = 1;
	Object.defineProperty(environmentOut, "__esModule", { value: true });
	environmentOut.EnvironmentOutSerializer = void 0;
	const connectorOut_1 = requireConnectorOut();
	const eventTypeOut_1 = requireEventTypeOut();
	environmentOut.EnvironmentOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            eventTypes: object["eventTypes"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
	            settings: object["settings"],
	            transformationTemplates: object["transformationTemplates"].map((item) => connectorOut_1.ConnectorOutSerializer._fromJsonObject(item)),
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            eventTypes: self.eventTypes.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
	            settings: self.settings,
	            transformationTemplates: self.transformationTemplates.map((item) => connectorOut_1.ConnectorOutSerializer._toJsonObject(item)),
	            version: self.version,
	        };
	    },
	};
	
	return environmentOut;
}

var hasRequiredEnvironment;

function requireEnvironment () {
	if (hasRequiredEnvironment) return environment;
	hasRequiredEnvironment = 1;
	Object.defineProperty(environment, "__esModule", { value: true });
	environment.Environment = void 0;
	const environmentIn_1 = requireEnvironmentIn();
	const environmentOut_1 = requireEnvironmentOut();
	const request_1 = requireRequest();
	class Environment {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    export(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/export");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.send(this.requestCtx, environmentOut_1.EnvironmentOutSerializer._fromJsonObject);
	    }
	    import(environmentIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/import");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(environmentIn_1.EnvironmentInSerializer._toJsonObject(environmentIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	environment.Environment = Environment;
	
	return environment;
}

var eventType = {};

var eventTypeImportOpenApiIn = {};

var hasRequiredEventTypeImportOpenApiIn;

function requireEventTypeImportOpenApiIn () {
	if (hasRequiredEventTypeImportOpenApiIn) return eventTypeImportOpenApiIn;
	hasRequiredEventTypeImportOpenApiIn = 1;
	Object.defineProperty(eventTypeImportOpenApiIn, "__esModule", { value: true });
	eventTypeImportOpenApiIn.EventTypeImportOpenApiInSerializer = void 0;
	eventTypeImportOpenApiIn.EventTypeImportOpenApiInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            dryRun: object["dryRun"],
	            replaceAll: object["replaceAll"],
	            spec: object["spec"],
	            specRaw: object["specRaw"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            dryRun: self.dryRun,
	            replaceAll: self.replaceAll,
	            spec: self.spec,
	            specRaw: self.specRaw,
	        };
	    },
	};
	
	return eventTypeImportOpenApiIn;
}

var eventTypeImportOpenApiOut = {};

var eventTypeImportOpenApiOutData = {};

var eventTypeFromOpenApi = {};

var hasRequiredEventTypeFromOpenApi;

function requireEventTypeFromOpenApi () {
	if (hasRequiredEventTypeFromOpenApi) return eventTypeFromOpenApi;
	hasRequiredEventTypeFromOpenApi = 1;
	Object.defineProperty(eventTypeFromOpenApi, "__esModule", { value: true });
	eventTypeFromOpenApi.EventTypeFromOpenApiSerializer = void 0;
	eventTypeFromOpenApi.EventTypeFromOpenApiSerializer = {
	    _fromJsonObject(object) {
	        return {
	            deprecated: object["deprecated"],
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            groupName: object["groupName"],
	            name: object["name"],
	            schemas: object["schemas"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            deprecated: self.deprecated,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            groupName: self.groupName,
	            name: self.name,
	            schemas: self.schemas,
	        };
	    },
	};
	
	return eventTypeFromOpenApi;
}

var hasRequiredEventTypeImportOpenApiOutData;

function requireEventTypeImportOpenApiOutData () {
	if (hasRequiredEventTypeImportOpenApiOutData) return eventTypeImportOpenApiOutData;
	hasRequiredEventTypeImportOpenApiOutData = 1;
	Object.defineProperty(eventTypeImportOpenApiOutData, "__esModule", { value: true });
	eventTypeImportOpenApiOutData.EventTypeImportOpenApiOutDataSerializer = void 0;
	const eventTypeFromOpenApi_1 = requireEventTypeFromOpenApi();
	eventTypeImportOpenApiOutData.EventTypeImportOpenApiOutDataSerializer = {
	    _fromJsonObject(object) {
	        var _a;
	        return {
	            modified: object["modified"],
	            toModify: (_a = object["to_modify"]) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._fromJsonObject(item)),
	        };
	    },
	    _toJsonObject(self) {
	        var _a;
	        return {
	            modified: self.modified,
	            to_modify: (_a = self.toModify) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._toJsonObject(item)),
	        };
	    },
	};
	
	return eventTypeImportOpenApiOutData;
}

var hasRequiredEventTypeImportOpenApiOut;

function requireEventTypeImportOpenApiOut () {
	if (hasRequiredEventTypeImportOpenApiOut) return eventTypeImportOpenApiOut;
	hasRequiredEventTypeImportOpenApiOut = 1;
	Object.defineProperty(eventTypeImportOpenApiOut, "__esModule", { value: true });
	eventTypeImportOpenApiOut.EventTypeImportOpenApiOutSerializer = void 0;
	const eventTypeImportOpenApiOutData_1 = requireEventTypeImportOpenApiOutData();
	eventTypeImportOpenApiOut.EventTypeImportOpenApiOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._fromJsonObject(object["data"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._toJsonObject(self.data),
	        };
	    },
	};
	
	return eventTypeImportOpenApiOut;
}

var eventTypePatch = {};

var hasRequiredEventTypePatch;

function requireEventTypePatch () {
	if (hasRequiredEventTypePatch) return eventTypePatch;
	hasRequiredEventTypePatch = 1;
	Object.defineProperty(eventTypePatch, "__esModule", { value: true });
	eventTypePatch.EventTypePatchSerializer = void 0;
	eventTypePatch.EventTypePatchSerializer = {
	    _fromJsonObject(object) {
	        return {
	            archived: object["archived"],
	            deprecated: object["deprecated"],
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            groupName: object["groupName"],
	            schemas: object["schemas"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            archived: self.archived,
	            deprecated: self.deprecated,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            groupName: self.groupName,
	            schemas: self.schemas,
	        };
	    },
	};
	
	return eventTypePatch;
}

var eventTypeUpdate = {};

var hasRequiredEventTypeUpdate;

function requireEventTypeUpdate () {
	if (hasRequiredEventTypeUpdate) return eventTypeUpdate;
	hasRequiredEventTypeUpdate = 1;
	Object.defineProperty(eventTypeUpdate, "__esModule", { value: true });
	eventTypeUpdate.EventTypeUpdateSerializer = void 0;
	eventTypeUpdate.EventTypeUpdateSerializer = {
	    _fromJsonObject(object) {
	        return {
	            archived: object["archived"],
	            deprecated: object["deprecated"],
	            description: object["description"],
	            featureFlag: object["featureFlag"],
	            featureFlags: object["featureFlags"],
	            groupName: object["groupName"],
	            schemas: object["schemas"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            archived: self.archived,
	            deprecated: self.deprecated,
	            description: self.description,
	            featureFlag: self.featureFlag,
	            featureFlags: self.featureFlags,
	            groupName: self.groupName,
	            schemas: self.schemas,
	        };
	    },
	};
	
	return eventTypeUpdate;
}

var listResponseEventTypeOut = {};

var hasRequiredListResponseEventTypeOut;

function requireListResponseEventTypeOut () {
	if (hasRequiredListResponseEventTypeOut) return listResponseEventTypeOut;
	hasRequiredListResponseEventTypeOut = 1;
	Object.defineProperty(listResponseEventTypeOut, "__esModule", { value: true });
	listResponseEventTypeOut.ListResponseEventTypeOutSerializer = void 0;
	const eventTypeOut_1 = requireEventTypeOut();
	listResponseEventTypeOut.ListResponseEventTypeOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseEventTypeOut;
}

var hasRequiredEventType;

function requireEventType () {
	if (hasRequiredEventType) return eventType;
	hasRequiredEventType = 1;
	Object.defineProperty(eventType, "__esModule", { value: true });
	eventType.EventType = void 0;
	const eventTypeImportOpenApiIn_1 = requireEventTypeImportOpenApiIn();
	const eventTypeImportOpenApiOut_1 = requireEventTypeImportOpenApiOut();
	const eventTypeIn_1 = requireEventTypeIn();
	const eventTypeOut_1 = requireEventTypeOut();
	const eventTypePatch_1 = requireEventTypePatch();
	const eventTypeUpdate_1 = requireEventTypeUpdate();
	const listResponseEventTypeOut_1 = requireListResponseEventTypeOut();
	const request_1 = requireRequest();
	class EventType {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type");
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        request.setQueryParam("include_archived", options === null || options === void 0 ? void 0 : options.includeArchived);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        return request.send(this.requestCtx, listResponseEventTypeOut_1.ListResponseEventTypeOutSerializer._fromJsonObject);
	    }
	    create(eventTypeIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(eventTypeIn_1.EventTypeInSerializer._toJsonObject(eventTypeIn));
	        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
	    }
	    importOpenapi(eventTypeImportOpenApiIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type/import/openapi");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(eventTypeImportOpenApiIn_1.EventTypeImportOpenApiInSerializer._toJsonObject(eventTypeImportOpenApiIn));
	        return request.send(this.requestCtx, eventTypeImportOpenApiOut_1.EventTypeImportOpenApiOutSerializer._fromJsonObject);
	    }
	    get(eventTypeName) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type/{event_type_name}");
	        request.setPathParam("event_type_name", eventTypeName);
	        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
	    }
	    update(eventTypeName, eventTypeUpdate) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/event-type/{event_type_name}");
	        request.setPathParam("event_type_name", eventTypeName);
	        request.setBody(eventTypeUpdate_1.EventTypeUpdateSerializer._toJsonObject(eventTypeUpdate));
	        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
	    }
	    delete(eventTypeName, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/event-type/{event_type_name}");
	        request.setPathParam("event_type_name", eventTypeName);
	        request.setQueryParam("expunge", options === null || options === void 0 ? void 0 : options.expunge);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    patch(eventTypeName, eventTypePatch) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/event-type/{event_type_name}");
	        request.setPathParam("event_type_name", eventTypeName);
	        request.setBody(eventTypePatch_1.EventTypePatchSerializer._toJsonObject(eventTypePatch));
	        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
	    }
	}
	eventType.EventType = EventType;
	
	return eventType;
}

var health = {};

var hasRequiredHealth;

function requireHealth () {
	if (hasRequiredHealth) return health;
	hasRequiredHealth = 1;
	Object.defineProperty(health, "__esModule", { value: true });
	health.Health = void 0;
	const request_1 = requireRequest();
	class Health {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    get() {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/health");
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	health.Health = Health;
	
	return health;
}

var ingest = {};

var ingestSourceConsumerPortalAccessIn = {};

var hasRequiredIngestSourceConsumerPortalAccessIn;

function requireIngestSourceConsumerPortalAccessIn () {
	if (hasRequiredIngestSourceConsumerPortalAccessIn) return ingestSourceConsumerPortalAccessIn;
	hasRequiredIngestSourceConsumerPortalAccessIn = 1;
	Object.defineProperty(ingestSourceConsumerPortalAccessIn, "__esModule", { value: true });
	ingestSourceConsumerPortalAccessIn.IngestSourceConsumerPortalAccessInSerializer = void 0;
	ingestSourceConsumerPortalAccessIn.IngestSourceConsumerPortalAccessInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            expiry: object["expiry"],
	            readOnly: object["readOnly"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            expiry: self.expiry,
	            readOnly: self.readOnly,
	        };
	    },
	};
	
	return ingestSourceConsumerPortalAccessIn;
}

var ingestEndpoint = {};

var ingestEndpointHeadersIn = {};

var hasRequiredIngestEndpointHeadersIn;

function requireIngestEndpointHeadersIn () {
	if (hasRequiredIngestEndpointHeadersIn) return ingestEndpointHeadersIn;
	hasRequiredIngestEndpointHeadersIn = 1;
	Object.defineProperty(ingestEndpointHeadersIn, "__esModule", { value: true });
	ingestEndpointHeadersIn.IngestEndpointHeadersInSerializer = void 0;
	ingestEndpointHeadersIn.IngestEndpointHeadersInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	        };
	    },
	};
	
	return ingestEndpointHeadersIn;
}

var ingestEndpointHeadersOut = {};

var hasRequiredIngestEndpointHeadersOut;

function requireIngestEndpointHeadersOut () {
	if (hasRequiredIngestEndpointHeadersOut) return ingestEndpointHeadersOut;
	hasRequiredIngestEndpointHeadersOut = 1;
	Object.defineProperty(ingestEndpointHeadersOut, "__esModule", { value: true });
	ingestEndpointHeadersOut.IngestEndpointHeadersOutSerializer = void 0;
	ingestEndpointHeadersOut.IngestEndpointHeadersOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	            sensitive: object["sensitive"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	            sensitive: self.sensitive,
	        };
	    },
	};
	
	return ingestEndpointHeadersOut;
}

var ingestEndpointIn = {};

var hasRequiredIngestEndpointIn;

function requireIngestEndpointIn () {
	if (hasRequiredIngestEndpointIn) return ingestEndpointIn;
	hasRequiredIngestEndpointIn = 1;
	Object.defineProperty(ingestEndpointIn, "__esModule", { value: true });
	ingestEndpointIn.IngestEndpointInSerializer = void 0;
	ingestEndpointIn.IngestEndpointInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            description: object["description"],
	            disabled: object["disabled"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            secret: object["secret"],
	            uid: object["uid"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            description: self.description,
	            disabled: self.disabled,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            secret: self.secret,
	            uid: self.uid,
	            url: self.url,
	        };
	    },
	};
	
	return ingestEndpointIn;
}

var ingestEndpointOut = {};

var hasRequiredIngestEndpointOut;

function requireIngestEndpointOut () {
	if (hasRequiredIngestEndpointOut) return ingestEndpointOut;
	hasRequiredIngestEndpointOut = 1;
	Object.defineProperty(ingestEndpointOut, "__esModule", { value: true });
	ingestEndpointOut.IngestEndpointOutSerializer = void 0;
	ingestEndpointOut.IngestEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            description: object["description"],
	            disabled: object["disabled"],
	            id: object["id"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            description: self.description,
	            disabled: self.disabled,
	            id: self.id,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	            url: self.url,
	        };
	    },
	};
	
	return ingestEndpointOut;
}

var ingestEndpointSecretIn = {};

var hasRequiredIngestEndpointSecretIn;

function requireIngestEndpointSecretIn () {
	if (hasRequiredIngestEndpointSecretIn) return ingestEndpointSecretIn;
	hasRequiredIngestEndpointSecretIn = 1;
	Object.defineProperty(ingestEndpointSecretIn, "__esModule", { value: true });
	ingestEndpointSecretIn.IngestEndpointSecretInSerializer = void 0;
	ingestEndpointSecretIn.IngestEndpointSecretInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return ingestEndpointSecretIn;
}

var ingestEndpointSecretOut = {};

var hasRequiredIngestEndpointSecretOut;

function requireIngestEndpointSecretOut () {
	if (hasRequiredIngestEndpointSecretOut) return ingestEndpointSecretOut;
	hasRequiredIngestEndpointSecretOut = 1;
	Object.defineProperty(ingestEndpointSecretOut, "__esModule", { value: true });
	ingestEndpointSecretOut.IngestEndpointSecretOutSerializer = void 0;
	ingestEndpointSecretOut.IngestEndpointSecretOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return ingestEndpointSecretOut;
}

var ingestEndpointTransformationOut = {};

var hasRequiredIngestEndpointTransformationOut;

function requireIngestEndpointTransformationOut () {
	if (hasRequiredIngestEndpointTransformationOut) return ingestEndpointTransformationOut;
	hasRequiredIngestEndpointTransformationOut = 1;
	Object.defineProperty(ingestEndpointTransformationOut, "__esModule", { value: true });
	ingestEndpointTransformationOut.IngestEndpointTransformationOutSerializer = void 0;
	ingestEndpointTransformationOut.IngestEndpointTransformationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            code: object["code"],
	            enabled: object["enabled"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            code: self.code,
	            enabled: self.enabled,
	        };
	    },
	};
	
	return ingestEndpointTransformationOut;
}

var ingestEndpointTransformationPatch = {};

var hasRequiredIngestEndpointTransformationPatch;

function requireIngestEndpointTransformationPatch () {
	if (hasRequiredIngestEndpointTransformationPatch) return ingestEndpointTransformationPatch;
	hasRequiredIngestEndpointTransformationPatch = 1;
	Object.defineProperty(ingestEndpointTransformationPatch, "__esModule", { value: true });
	ingestEndpointTransformationPatch.IngestEndpointTransformationPatchSerializer = void 0;
	ingestEndpointTransformationPatch.IngestEndpointTransformationPatchSerializer = {
	    _fromJsonObject(object) {
	        return {
	            code: object["code"],
	            enabled: object["enabled"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            code: self.code,
	            enabled: self.enabled,
	        };
	    },
	};
	
	return ingestEndpointTransformationPatch;
}

var ingestEndpointUpdate = {};

var hasRequiredIngestEndpointUpdate;

function requireIngestEndpointUpdate () {
	if (hasRequiredIngestEndpointUpdate) return ingestEndpointUpdate;
	hasRequiredIngestEndpointUpdate = 1;
	Object.defineProperty(ingestEndpointUpdate, "__esModule", { value: true });
	ingestEndpointUpdate.IngestEndpointUpdateSerializer = void 0;
	ingestEndpointUpdate.IngestEndpointUpdateSerializer = {
	    _fromJsonObject(object) {
	        return {
	            description: object["description"],
	            disabled: object["disabled"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            description: self.description,
	            disabled: self.disabled,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            url: self.url,
	        };
	    },
	};
	
	return ingestEndpointUpdate;
}

var listResponseIngestEndpointOut = {};

var hasRequiredListResponseIngestEndpointOut;

function requireListResponseIngestEndpointOut () {
	if (hasRequiredListResponseIngestEndpointOut) return listResponseIngestEndpointOut;
	hasRequiredListResponseIngestEndpointOut = 1;
	Object.defineProperty(listResponseIngestEndpointOut, "__esModule", { value: true });
	listResponseIngestEndpointOut.ListResponseIngestEndpointOutSerializer = void 0;
	const ingestEndpointOut_1 = requireIngestEndpointOut();
	listResponseIngestEndpointOut.ListResponseIngestEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseIngestEndpointOut;
}

var hasRequiredIngestEndpoint;

function requireIngestEndpoint () {
	if (hasRequiredIngestEndpoint) return ingestEndpoint;
	hasRequiredIngestEndpoint = 1;
	Object.defineProperty(ingestEndpoint, "__esModule", { value: true });
	ingestEndpoint.IngestEndpoint = void 0;
	const ingestEndpointHeadersIn_1 = requireIngestEndpointHeadersIn();
	const ingestEndpointHeadersOut_1 = requireIngestEndpointHeadersOut();
	const ingestEndpointIn_1 = requireIngestEndpointIn();
	const ingestEndpointOut_1 = requireIngestEndpointOut();
	const ingestEndpointSecretIn_1 = requireIngestEndpointSecretIn();
	const ingestEndpointSecretOut_1 = requireIngestEndpointSecretOut();
	const ingestEndpointTransformationOut_1 = requireIngestEndpointTransformationOut();
	const ingestEndpointTransformationPatch_1 = requireIngestEndpointTransformationPatch();
	const ingestEndpointUpdate_1 = requireIngestEndpointUpdate();
	const listResponseIngestEndpointOut_1 = requireListResponseIngestEndpointOut();
	const request_1 = requireRequest();
	class IngestEndpoint {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(sourceId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint");
	        request.setPathParam("source_id", sourceId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseIngestEndpointOut_1.ListResponseIngestEndpointOutSerializer._fromJsonObject);
	    }
	    create(sourceId, ingestEndpointIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint");
	        request.setPathParam("source_id", sourceId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(ingestEndpointIn_1.IngestEndpointInSerializer._toJsonObject(ingestEndpointIn));
	        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
	    }
	    get(sourceId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
	    }
	    update(sourceId, endpointId, ingestEndpointUpdate) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(ingestEndpointUpdate_1.IngestEndpointUpdateSerializer._toJsonObject(ingestEndpointUpdate));
	        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
	    }
	    delete(sourceId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getHeaders(sourceId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, ingestEndpointHeadersOut_1.IngestEndpointHeadersOutSerializer._fromJsonObject);
	    }
	    updateHeaders(sourceId, endpointId, ingestEndpointHeadersIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(ingestEndpointHeadersIn_1.IngestEndpointHeadersInSerializer._toJsonObject(ingestEndpointHeadersIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getSecret(sourceId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, ingestEndpointSecretOut_1.IngestEndpointSecretOutSerializer._fromJsonObject);
	    }
	    rotateSecret(sourceId, endpointId, ingestEndpointSecretIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret/rotate");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(ingestEndpointSecretIn_1.IngestEndpointSecretInSerializer._toJsonObject(ingestEndpointSecretIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getTransformation(sourceId, endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, ingestEndpointTransformationOut_1.IngestEndpointTransformationOutSerializer._fromJsonObject);
	    }
	    setTransformation(sourceId, endpointId, ingestEndpointTransformationPatch) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
	        request.setPathParam("source_id", sourceId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(ingestEndpointTransformationPatch_1.IngestEndpointTransformationPatchSerializer._toJsonObject(ingestEndpointTransformationPatch));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	ingestEndpoint.IngestEndpoint = IngestEndpoint;
	
	return ingestEndpoint;
}

var ingestSource = {};

var ingestSourceIn = {};

var adobeSignConfig = {};

var hasRequiredAdobeSignConfig;

function requireAdobeSignConfig () {
	if (hasRequiredAdobeSignConfig) return adobeSignConfig;
	hasRequiredAdobeSignConfig = 1;
	Object.defineProperty(adobeSignConfig, "__esModule", { value: true });
	adobeSignConfig.AdobeSignConfigSerializer = void 0;
	adobeSignConfig.AdobeSignConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            clientId: object["clientId"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            clientId: self.clientId,
	        };
	    },
	};
	
	return adobeSignConfig;
}

var airwallexConfig = {};

var hasRequiredAirwallexConfig;

function requireAirwallexConfig () {
	if (hasRequiredAirwallexConfig) return airwallexConfig;
	hasRequiredAirwallexConfig = 1;
	Object.defineProperty(airwallexConfig, "__esModule", { value: true });
	airwallexConfig.AirwallexConfigSerializer = void 0;
	airwallexConfig.AirwallexConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return airwallexConfig;
}

var checkbookConfig = {};

var hasRequiredCheckbookConfig;

function requireCheckbookConfig () {
	if (hasRequiredCheckbookConfig) return checkbookConfig;
	hasRequiredCheckbookConfig = 1;
	Object.defineProperty(checkbookConfig, "__esModule", { value: true });
	checkbookConfig.CheckbookConfigSerializer = void 0;
	checkbookConfig.CheckbookConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return checkbookConfig;
}

var cronConfig = {};

var hasRequiredCronConfig;

function requireCronConfig () {
	if (hasRequiredCronConfig) return cronConfig;
	hasRequiredCronConfig = 1;
	Object.defineProperty(cronConfig, "__esModule", { value: true });
	cronConfig.CronConfigSerializer = void 0;
	cronConfig.CronConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            contentType: object["contentType"],
	            payload: object["payload"],
	            schedule: object["schedule"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            contentType: self.contentType,
	            payload: self.payload,
	            schedule: self.schedule,
	        };
	    },
	};
	
	return cronConfig;
}

var docusignConfig = {};

var hasRequiredDocusignConfig;

function requireDocusignConfig () {
	if (hasRequiredDocusignConfig) return docusignConfig;
	hasRequiredDocusignConfig = 1;
	Object.defineProperty(docusignConfig, "__esModule", { value: true });
	docusignConfig.DocusignConfigSerializer = void 0;
	docusignConfig.DocusignConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return docusignConfig;
}

var easypostConfig = {};

var hasRequiredEasypostConfig;

function requireEasypostConfig () {
	if (hasRequiredEasypostConfig) return easypostConfig;
	hasRequiredEasypostConfig = 1;
	Object.defineProperty(easypostConfig, "__esModule", { value: true });
	easypostConfig.EasypostConfigSerializer = void 0;
	easypostConfig.EasypostConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return easypostConfig;
}

var githubConfig = {};

var hasRequiredGithubConfig;

function requireGithubConfig () {
	if (hasRequiredGithubConfig) return githubConfig;
	hasRequiredGithubConfig = 1;
	Object.defineProperty(githubConfig, "__esModule", { value: true });
	githubConfig.GithubConfigSerializer = void 0;
	githubConfig.GithubConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return githubConfig;
}

var hubspotConfig = {};

var hasRequiredHubspotConfig;

function requireHubspotConfig () {
	if (hasRequiredHubspotConfig) return hubspotConfig;
	hasRequiredHubspotConfig = 1;
	Object.defineProperty(hubspotConfig, "__esModule", { value: true });
	hubspotConfig.HubspotConfigSerializer = void 0;
	hubspotConfig.HubspotConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return hubspotConfig;
}

var orumIoConfig = {};

var hasRequiredOrumIoConfig;

function requireOrumIoConfig () {
	if (hasRequiredOrumIoConfig) return orumIoConfig;
	hasRequiredOrumIoConfig = 1;
	Object.defineProperty(orumIoConfig, "__esModule", { value: true });
	orumIoConfig.OrumIoConfigSerializer = void 0;
	orumIoConfig.OrumIoConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            publicKey: object["publicKey"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            publicKey: self.publicKey,
	        };
	    },
	};
	
	return orumIoConfig;
}

var pandaDocConfig = {};

var hasRequiredPandaDocConfig;

function requirePandaDocConfig () {
	if (hasRequiredPandaDocConfig) return pandaDocConfig;
	hasRequiredPandaDocConfig = 1;
	Object.defineProperty(pandaDocConfig, "__esModule", { value: true });
	pandaDocConfig.PandaDocConfigSerializer = void 0;
	pandaDocConfig.PandaDocConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return pandaDocConfig;
}

var portIoConfig = {};

var hasRequiredPortIoConfig;

function requirePortIoConfig () {
	if (hasRequiredPortIoConfig) return portIoConfig;
	hasRequiredPortIoConfig = 1;
	Object.defineProperty(portIoConfig, "__esModule", { value: true });
	portIoConfig.PortIoConfigSerializer = void 0;
	portIoConfig.PortIoConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return portIoConfig;
}

var rutterConfig = {};

var hasRequiredRutterConfig;

function requireRutterConfig () {
	if (hasRequiredRutterConfig) return rutterConfig;
	hasRequiredRutterConfig = 1;
	Object.defineProperty(rutterConfig, "__esModule", { value: true });
	rutterConfig.RutterConfigSerializer = void 0;
	rutterConfig.RutterConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return rutterConfig;
}

var segmentConfig = {};

var hasRequiredSegmentConfig;

function requireSegmentConfig () {
	if (hasRequiredSegmentConfig) return segmentConfig;
	hasRequiredSegmentConfig = 1;
	Object.defineProperty(segmentConfig, "__esModule", { value: true });
	segmentConfig.SegmentConfigSerializer = void 0;
	segmentConfig.SegmentConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return segmentConfig;
}

var shopifyConfig = {};

var hasRequiredShopifyConfig;

function requireShopifyConfig () {
	if (hasRequiredShopifyConfig) return shopifyConfig;
	hasRequiredShopifyConfig = 1;
	Object.defineProperty(shopifyConfig, "__esModule", { value: true });
	shopifyConfig.ShopifyConfigSerializer = void 0;
	shopifyConfig.ShopifyConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return shopifyConfig;
}

var slackConfig = {};

var hasRequiredSlackConfig;

function requireSlackConfig () {
	if (hasRequiredSlackConfig) return slackConfig;
	hasRequiredSlackConfig = 1;
	Object.defineProperty(slackConfig, "__esModule", { value: true });
	slackConfig.SlackConfigSerializer = void 0;
	slackConfig.SlackConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return slackConfig;
}

var stripeConfig = {};

var hasRequiredStripeConfig;

function requireStripeConfig () {
	if (hasRequiredStripeConfig) return stripeConfig;
	hasRequiredStripeConfig = 1;
	Object.defineProperty(stripeConfig, "__esModule", { value: true });
	stripeConfig.StripeConfigSerializer = void 0;
	stripeConfig.StripeConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return stripeConfig;
}

var svixConfig = {};

var hasRequiredSvixConfig;

function requireSvixConfig () {
	if (hasRequiredSvixConfig) return svixConfig;
	hasRequiredSvixConfig = 1;
	Object.defineProperty(svixConfig, "__esModule", { value: true });
	svixConfig.SvixConfigSerializer = void 0;
	svixConfig.SvixConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return svixConfig;
}

var telnyxConfig = {};

var hasRequiredTelnyxConfig;

function requireTelnyxConfig () {
	if (hasRequiredTelnyxConfig) return telnyxConfig;
	hasRequiredTelnyxConfig = 1;
	Object.defineProperty(telnyxConfig, "__esModule", { value: true });
	telnyxConfig.TelnyxConfigSerializer = void 0;
	telnyxConfig.TelnyxConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            publicKey: object["publicKey"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            publicKey: self.publicKey,
	        };
	    },
	};
	
	return telnyxConfig;
}

var vapiConfig = {};

var hasRequiredVapiConfig;

function requireVapiConfig () {
	if (hasRequiredVapiConfig) return vapiConfig;
	hasRequiredVapiConfig = 1;
	Object.defineProperty(vapiConfig, "__esModule", { value: true });
	vapiConfig.VapiConfigSerializer = void 0;
	vapiConfig.VapiConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return vapiConfig;
}

var veriffConfig = {};

var hasRequiredVeriffConfig;

function requireVeriffConfig () {
	if (hasRequiredVeriffConfig) return veriffConfig;
	hasRequiredVeriffConfig = 1;
	Object.defineProperty(veriffConfig, "__esModule", { value: true });
	veriffConfig.VeriffConfigSerializer = void 0;
	veriffConfig.VeriffConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return veriffConfig;
}

var zoomConfig = {};

var hasRequiredZoomConfig;

function requireZoomConfig () {
	if (hasRequiredZoomConfig) return zoomConfig;
	hasRequiredZoomConfig = 1;
	Object.defineProperty(zoomConfig, "__esModule", { value: true });
	zoomConfig.ZoomConfigSerializer = void 0;
	zoomConfig.ZoomConfigSerializer = {
	    _fromJsonObject(object) {
	        return {
	            secret: object["secret"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            secret: self.secret,
	        };
	    },
	};
	
	return zoomConfig;
}

var hasRequiredIngestSourceIn;

function requireIngestSourceIn () {
	if (hasRequiredIngestSourceIn) return ingestSourceIn;
	hasRequiredIngestSourceIn = 1;
	Object.defineProperty(ingestSourceIn, "__esModule", { value: true });
	ingestSourceIn.IngestSourceInSerializer = void 0;
	const adobeSignConfig_1 = requireAdobeSignConfig();
	const airwallexConfig_1 = requireAirwallexConfig();
	const checkbookConfig_1 = requireCheckbookConfig();
	const cronConfig_1 = requireCronConfig();
	const docusignConfig_1 = requireDocusignConfig();
	const easypostConfig_1 = requireEasypostConfig();
	const githubConfig_1 = requireGithubConfig();
	const hubspotConfig_1 = requireHubspotConfig();
	const orumIoConfig_1 = requireOrumIoConfig();
	const pandaDocConfig_1 = requirePandaDocConfig();
	const portIoConfig_1 = requirePortIoConfig();
	const rutterConfig_1 = requireRutterConfig();
	const segmentConfig_1 = requireSegmentConfig();
	const shopifyConfig_1 = requireShopifyConfig();
	const slackConfig_1 = requireSlackConfig();
	const stripeConfig_1 = requireStripeConfig();
	const svixConfig_1 = requireSvixConfig();
	const telnyxConfig_1 = requireTelnyxConfig();
	const vapiConfig_1 = requireVapiConfig();
	const veriffConfig_1 = requireVeriffConfig();
	const zoomConfig_1 = requireZoomConfig();
	ingestSourceIn.IngestSourceInSerializer = {
	    _fromJsonObject(object) {
	        const type = object["type"];
	        function getConfig(type) {
	            switch (type) {
	                case "generic-webhook":
	                    return {};
	                case "cron":
	                    return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
	                case "adobe-sign":
	                    return adobeSignConfig_1.AdobeSignConfigSerializer._fromJsonObject(object["config"]);
	                case "beehiiv":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "brex":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "checkbook":
	                    return checkbookConfig_1.CheckbookConfigSerializer._fromJsonObject(object["config"]);
	                case "clerk":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "docusign":
	                    return docusignConfig_1.DocusignConfigSerializer._fromJsonObject(object["config"]);
	                case "easypost":
	                    return easypostConfig_1.EasypostConfigSerializer._fromJsonObject(object["config"]);
	                case "github":
	                    return githubConfig_1.GithubConfigSerializer._fromJsonObject(object["config"]);
	                case "guesty":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "hubspot":
	                    return hubspotConfig_1.HubspotConfigSerializer._fromJsonObject(object["config"]);
	                case "incident-io":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "lithic":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "nash":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "orum-io":
	                    return orumIoConfig_1.OrumIoConfigSerializer._fromJsonObject(object["config"]);
	                case "panda-doc":
	                    return pandaDocConfig_1.PandaDocConfigSerializer._fromJsonObject(object["config"]);
	                case "port-io":
	                    return portIoConfig_1.PortIoConfigSerializer._fromJsonObject(object["config"]);
	                case "pleo":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "replicate":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "resend":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "rutter":
	                    return rutterConfig_1.RutterConfigSerializer._fromJsonObject(object["config"]);
	                case "safebase":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "sardine":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "segment":
	                    return segmentConfig_1.SegmentConfigSerializer._fromJsonObject(object["config"]);
	                case "shopify":
	                    return shopifyConfig_1.ShopifyConfigSerializer._fromJsonObject(object["config"]);
	                case "slack":
	                    return slackConfig_1.SlackConfigSerializer._fromJsonObject(object["config"]);
	                case "stripe":
	                    return stripeConfig_1.StripeConfigSerializer._fromJsonObject(object["config"]);
	                case "stych":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "svix":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "zoom":
	                    return zoomConfig_1.ZoomConfigSerializer._fromJsonObject(object["config"]);
	                case "telnyx":
	                    return telnyxConfig_1.TelnyxConfigSerializer._fromJsonObject(object["config"]);
	                case "vapi":
	                    return vapiConfig_1.VapiConfigSerializer._fromJsonObject(object["config"]);
	                case "open-ai":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "render":
	                    return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
	                case "veriff":
	                    return veriffConfig_1.VeriffConfigSerializer._fromJsonObject(object["config"]);
	                case "airwallex":
	                    return airwallexConfig_1.AirwallexConfigSerializer._fromJsonObject(object["config"]);
	                default:
	                    throw new Error(`Unexpected type: ${type}`);
	            }
	        }
	        return {
	            type,
	            config: getConfig(type),
	            metadata: object["metadata"],
	            name: object["name"],
	            uid: object["uid"],
	        };
	    },
	    _toJsonObject(self) {
	        let config;
	        switch (self.type) {
	            case "generic-webhook":
	                config = {};
	                break;
	            case "cron":
	                config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
	                break;
	            case "adobe-sign":
	                config = adobeSignConfig_1.AdobeSignConfigSerializer._toJsonObject(self.config);
	                break;
	            case "beehiiv":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "brex":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "checkbook":
	                config = checkbookConfig_1.CheckbookConfigSerializer._toJsonObject(self.config);
	                break;
	            case "clerk":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "docusign":
	                config = docusignConfig_1.DocusignConfigSerializer._toJsonObject(self.config);
	                break;
	            case "easypost":
	                config = easypostConfig_1.EasypostConfigSerializer._toJsonObject(self.config);
	                break;
	            case "github":
	                config = githubConfig_1.GithubConfigSerializer._toJsonObject(self.config);
	                break;
	            case "guesty":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "hubspot":
	                config = hubspotConfig_1.HubspotConfigSerializer._toJsonObject(self.config);
	                break;
	            case "incident-io":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "lithic":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "nash":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "orum-io":
	                config = orumIoConfig_1.OrumIoConfigSerializer._toJsonObject(self.config);
	                break;
	            case "panda-doc":
	                config = pandaDocConfig_1.PandaDocConfigSerializer._toJsonObject(self.config);
	                break;
	            case "port-io":
	                config = portIoConfig_1.PortIoConfigSerializer._toJsonObject(self.config);
	                break;
	            case "pleo":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "replicate":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "resend":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "rutter":
	                config = rutterConfig_1.RutterConfigSerializer._toJsonObject(self.config);
	                break;
	            case "safebase":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "sardine":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "segment":
	                config = segmentConfig_1.SegmentConfigSerializer._toJsonObject(self.config);
	                break;
	            case "shopify":
	                config = shopifyConfig_1.ShopifyConfigSerializer._toJsonObject(self.config);
	                break;
	            case "slack":
	                config = slackConfig_1.SlackConfigSerializer._toJsonObject(self.config);
	                break;
	            case "stripe":
	                config = stripeConfig_1.StripeConfigSerializer._toJsonObject(self.config);
	                break;
	            case "stych":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "svix":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "zoom":
	                config = zoomConfig_1.ZoomConfigSerializer._toJsonObject(self.config);
	                break;
	            case "telnyx":
	                config = telnyxConfig_1.TelnyxConfigSerializer._toJsonObject(self.config);
	                break;
	            case "vapi":
	                config = vapiConfig_1.VapiConfigSerializer._toJsonObject(self.config);
	                break;
	            case "open-ai":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "render":
	                config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
	                break;
	            case "veriff":
	                config = veriffConfig_1.VeriffConfigSerializer._toJsonObject(self.config);
	                break;
	            case "airwallex":
	                config = airwallexConfig_1.AirwallexConfigSerializer._toJsonObject(self.config);
	                break;
	        }
	        return {
	            type: self.type,
	            config: config,
	            metadata: self.metadata,
	            name: self.name,
	            uid: self.uid,
	        };
	    },
	};
	
	return ingestSourceIn;
}

var ingestSourceOut = {};

var adobeSignConfigOut = {};

var hasRequiredAdobeSignConfigOut;

function requireAdobeSignConfigOut () {
	if (hasRequiredAdobeSignConfigOut) return adobeSignConfigOut;
	hasRequiredAdobeSignConfigOut = 1;
	Object.defineProperty(adobeSignConfigOut, "__esModule", { value: true });
	adobeSignConfigOut.AdobeSignConfigOutSerializer = void 0;
	adobeSignConfigOut.AdobeSignConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return adobeSignConfigOut;
}

var airwallexConfigOut = {};

var hasRequiredAirwallexConfigOut;

function requireAirwallexConfigOut () {
	if (hasRequiredAirwallexConfigOut) return airwallexConfigOut;
	hasRequiredAirwallexConfigOut = 1;
	Object.defineProperty(airwallexConfigOut, "__esModule", { value: true });
	airwallexConfigOut.AirwallexConfigOutSerializer = void 0;
	airwallexConfigOut.AirwallexConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return airwallexConfigOut;
}

var checkbookConfigOut = {};

var hasRequiredCheckbookConfigOut;

function requireCheckbookConfigOut () {
	if (hasRequiredCheckbookConfigOut) return checkbookConfigOut;
	hasRequiredCheckbookConfigOut = 1;
	Object.defineProperty(checkbookConfigOut, "__esModule", { value: true });
	checkbookConfigOut.CheckbookConfigOutSerializer = void 0;
	checkbookConfigOut.CheckbookConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return checkbookConfigOut;
}

var docusignConfigOut = {};

var hasRequiredDocusignConfigOut;

function requireDocusignConfigOut () {
	if (hasRequiredDocusignConfigOut) return docusignConfigOut;
	hasRequiredDocusignConfigOut = 1;
	Object.defineProperty(docusignConfigOut, "__esModule", { value: true });
	docusignConfigOut.DocusignConfigOutSerializer = void 0;
	docusignConfigOut.DocusignConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return docusignConfigOut;
}

var easypostConfigOut = {};

var hasRequiredEasypostConfigOut;

function requireEasypostConfigOut () {
	if (hasRequiredEasypostConfigOut) return easypostConfigOut;
	hasRequiredEasypostConfigOut = 1;
	Object.defineProperty(easypostConfigOut, "__esModule", { value: true });
	easypostConfigOut.EasypostConfigOutSerializer = void 0;
	easypostConfigOut.EasypostConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return easypostConfigOut;
}

var githubConfigOut = {};

var hasRequiredGithubConfigOut;

function requireGithubConfigOut () {
	if (hasRequiredGithubConfigOut) return githubConfigOut;
	hasRequiredGithubConfigOut = 1;
	Object.defineProperty(githubConfigOut, "__esModule", { value: true });
	githubConfigOut.GithubConfigOutSerializer = void 0;
	githubConfigOut.GithubConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return githubConfigOut;
}

var hubspotConfigOut = {};

var hasRequiredHubspotConfigOut;

function requireHubspotConfigOut () {
	if (hasRequiredHubspotConfigOut) return hubspotConfigOut;
	hasRequiredHubspotConfigOut = 1;
	Object.defineProperty(hubspotConfigOut, "__esModule", { value: true });
	hubspotConfigOut.HubspotConfigOutSerializer = void 0;
	hubspotConfigOut.HubspotConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return hubspotConfigOut;
}

var orumIoConfigOut = {};

var hasRequiredOrumIoConfigOut;

function requireOrumIoConfigOut () {
	if (hasRequiredOrumIoConfigOut) return orumIoConfigOut;
	hasRequiredOrumIoConfigOut = 1;
	Object.defineProperty(orumIoConfigOut, "__esModule", { value: true });
	orumIoConfigOut.OrumIoConfigOutSerializer = void 0;
	orumIoConfigOut.OrumIoConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            publicKey: object["publicKey"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            publicKey: self.publicKey,
	        };
	    },
	};
	
	return orumIoConfigOut;
}

var pandaDocConfigOut = {};

var hasRequiredPandaDocConfigOut;

function requirePandaDocConfigOut () {
	if (hasRequiredPandaDocConfigOut) return pandaDocConfigOut;
	hasRequiredPandaDocConfigOut = 1;
	Object.defineProperty(pandaDocConfigOut, "__esModule", { value: true });
	pandaDocConfigOut.PandaDocConfigOutSerializer = void 0;
	pandaDocConfigOut.PandaDocConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return pandaDocConfigOut;
}

var portIoConfigOut = {};

var hasRequiredPortIoConfigOut;

function requirePortIoConfigOut () {
	if (hasRequiredPortIoConfigOut) return portIoConfigOut;
	hasRequiredPortIoConfigOut = 1;
	Object.defineProperty(portIoConfigOut, "__esModule", { value: true });
	portIoConfigOut.PortIoConfigOutSerializer = void 0;
	portIoConfigOut.PortIoConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return portIoConfigOut;
}

var rutterConfigOut = {};

var hasRequiredRutterConfigOut;

function requireRutterConfigOut () {
	if (hasRequiredRutterConfigOut) return rutterConfigOut;
	hasRequiredRutterConfigOut = 1;
	Object.defineProperty(rutterConfigOut, "__esModule", { value: true });
	rutterConfigOut.RutterConfigOutSerializer = void 0;
	rutterConfigOut.RutterConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return rutterConfigOut;
}

var segmentConfigOut = {};

var hasRequiredSegmentConfigOut;

function requireSegmentConfigOut () {
	if (hasRequiredSegmentConfigOut) return segmentConfigOut;
	hasRequiredSegmentConfigOut = 1;
	Object.defineProperty(segmentConfigOut, "__esModule", { value: true });
	segmentConfigOut.SegmentConfigOutSerializer = void 0;
	segmentConfigOut.SegmentConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return segmentConfigOut;
}

var shopifyConfigOut = {};

var hasRequiredShopifyConfigOut;

function requireShopifyConfigOut () {
	if (hasRequiredShopifyConfigOut) return shopifyConfigOut;
	hasRequiredShopifyConfigOut = 1;
	Object.defineProperty(shopifyConfigOut, "__esModule", { value: true });
	shopifyConfigOut.ShopifyConfigOutSerializer = void 0;
	shopifyConfigOut.ShopifyConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return shopifyConfigOut;
}

var slackConfigOut = {};

var hasRequiredSlackConfigOut;

function requireSlackConfigOut () {
	if (hasRequiredSlackConfigOut) return slackConfigOut;
	hasRequiredSlackConfigOut = 1;
	Object.defineProperty(slackConfigOut, "__esModule", { value: true });
	slackConfigOut.SlackConfigOutSerializer = void 0;
	slackConfigOut.SlackConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return slackConfigOut;
}

var stripeConfigOut = {};

var hasRequiredStripeConfigOut;

function requireStripeConfigOut () {
	if (hasRequiredStripeConfigOut) return stripeConfigOut;
	hasRequiredStripeConfigOut = 1;
	Object.defineProperty(stripeConfigOut, "__esModule", { value: true });
	stripeConfigOut.StripeConfigOutSerializer = void 0;
	stripeConfigOut.StripeConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return stripeConfigOut;
}

var svixConfigOut = {};

var hasRequiredSvixConfigOut;

function requireSvixConfigOut () {
	if (hasRequiredSvixConfigOut) return svixConfigOut;
	hasRequiredSvixConfigOut = 1;
	Object.defineProperty(svixConfigOut, "__esModule", { value: true });
	svixConfigOut.SvixConfigOutSerializer = void 0;
	svixConfigOut.SvixConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return svixConfigOut;
}

var telnyxConfigOut = {};

var hasRequiredTelnyxConfigOut;

function requireTelnyxConfigOut () {
	if (hasRequiredTelnyxConfigOut) return telnyxConfigOut;
	hasRequiredTelnyxConfigOut = 1;
	Object.defineProperty(telnyxConfigOut, "__esModule", { value: true });
	telnyxConfigOut.TelnyxConfigOutSerializer = void 0;
	telnyxConfigOut.TelnyxConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            publicKey: object["publicKey"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            publicKey: self.publicKey,
	        };
	    },
	};
	
	return telnyxConfigOut;
}

var vapiConfigOut = {};

var hasRequiredVapiConfigOut;

function requireVapiConfigOut () {
	if (hasRequiredVapiConfigOut) return vapiConfigOut;
	hasRequiredVapiConfigOut = 1;
	Object.defineProperty(vapiConfigOut, "__esModule", { value: true });
	vapiConfigOut.VapiConfigOutSerializer = void 0;
	vapiConfigOut.VapiConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return vapiConfigOut;
}

var veriffConfigOut = {};

var hasRequiredVeriffConfigOut;

function requireVeriffConfigOut () {
	if (hasRequiredVeriffConfigOut) return veriffConfigOut;
	hasRequiredVeriffConfigOut = 1;
	Object.defineProperty(veriffConfigOut, "__esModule", { value: true });
	veriffConfigOut.VeriffConfigOutSerializer = void 0;
	veriffConfigOut.VeriffConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return veriffConfigOut;
}

var zoomConfigOut = {};

var hasRequiredZoomConfigOut;

function requireZoomConfigOut () {
	if (hasRequiredZoomConfigOut) return zoomConfigOut;
	hasRequiredZoomConfigOut = 1;
	Object.defineProperty(zoomConfigOut, "__esModule", { value: true });
	zoomConfigOut.ZoomConfigOutSerializer = void 0;
	zoomConfigOut.ZoomConfigOutSerializer = {
	    _fromJsonObject(object) {
	        return {};
	    },
	    _toJsonObject(self) {
	        return {};
	    },
	};
	
	return zoomConfigOut;
}

var hasRequiredIngestSourceOut;

function requireIngestSourceOut () {
	if (hasRequiredIngestSourceOut) return ingestSourceOut;
	hasRequiredIngestSourceOut = 1;
	Object.defineProperty(ingestSourceOut, "__esModule", { value: true });
	ingestSourceOut.IngestSourceOutSerializer = void 0;
	const adobeSignConfigOut_1 = requireAdobeSignConfigOut();
	const airwallexConfigOut_1 = requireAirwallexConfigOut();
	const checkbookConfigOut_1 = requireCheckbookConfigOut();
	const cronConfig_1 = requireCronConfig();
	const docusignConfigOut_1 = requireDocusignConfigOut();
	const easypostConfigOut_1 = requireEasypostConfigOut();
	const githubConfigOut_1 = requireGithubConfigOut();
	const hubspotConfigOut_1 = requireHubspotConfigOut();
	const orumIoConfigOut_1 = requireOrumIoConfigOut();
	const pandaDocConfigOut_1 = requirePandaDocConfigOut();
	const portIoConfigOut_1 = requirePortIoConfigOut();
	const rutterConfigOut_1 = requireRutterConfigOut();
	const segmentConfigOut_1 = requireSegmentConfigOut();
	const shopifyConfigOut_1 = requireShopifyConfigOut();
	const slackConfigOut_1 = requireSlackConfigOut();
	const stripeConfigOut_1 = requireStripeConfigOut();
	const svixConfigOut_1 = requireSvixConfigOut();
	const telnyxConfigOut_1 = requireTelnyxConfigOut();
	const vapiConfigOut_1 = requireVapiConfigOut();
	const veriffConfigOut_1 = requireVeriffConfigOut();
	const zoomConfigOut_1 = requireZoomConfigOut();
	ingestSourceOut.IngestSourceOutSerializer = {
	    _fromJsonObject(object) {
	        const type = object["type"];
	        function getConfig(type) {
	            switch (type) {
	                case "generic-webhook":
	                    return {};
	                case "cron":
	                    return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
	                case "adobe-sign":
	                    return adobeSignConfigOut_1.AdobeSignConfigOutSerializer._fromJsonObject(object["config"]);
	                case "beehiiv":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "brex":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "checkbook":
	                    return checkbookConfigOut_1.CheckbookConfigOutSerializer._fromJsonObject(object["config"]);
	                case "clerk":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "docusign":
	                    return docusignConfigOut_1.DocusignConfigOutSerializer._fromJsonObject(object["config"]);
	                case "easypost":
	                    return easypostConfigOut_1.EasypostConfigOutSerializer._fromJsonObject(object["config"]);
	                case "github":
	                    return githubConfigOut_1.GithubConfigOutSerializer._fromJsonObject(object["config"]);
	                case "guesty":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "hubspot":
	                    return hubspotConfigOut_1.HubspotConfigOutSerializer._fromJsonObject(object["config"]);
	                case "incident-io":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "lithic":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "nash":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "orum-io":
	                    return orumIoConfigOut_1.OrumIoConfigOutSerializer._fromJsonObject(object["config"]);
	                case "panda-doc":
	                    return pandaDocConfigOut_1.PandaDocConfigOutSerializer._fromJsonObject(object["config"]);
	                case "port-io":
	                    return portIoConfigOut_1.PortIoConfigOutSerializer._fromJsonObject(object["config"]);
	                case "pleo":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "replicate":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "resend":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "rutter":
	                    return rutterConfigOut_1.RutterConfigOutSerializer._fromJsonObject(object["config"]);
	                case "safebase":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "sardine":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "segment":
	                    return segmentConfigOut_1.SegmentConfigOutSerializer._fromJsonObject(object["config"]);
	                case "shopify":
	                    return shopifyConfigOut_1.ShopifyConfigOutSerializer._fromJsonObject(object["config"]);
	                case "slack":
	                    return slackConfigOut_1.SlackConfigOutSerializer._fromJsonObject(object["config"]);
	                case "stripe":
	                    return stripeConfigOut_1.StripeConfigOutSerializer._fromJsonObject(object["config"]);
	                case "stych":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "svix":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "zoom":
	                    return zoomConfigOut_1.ZoomConfigOutSerializer._fromJsonObject(object["config"]);
	                case "telnyx":
	                    return telnyxConfigOut_1.TelnyxConfigOutSerializer._fromJsonObject(object["config"]);
	                case "vapi":
	                    return vapiConfigOut_1.VapiConfigOutSerializer._fromJsonObject(object["config"]);
	                case "open-ai":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "render":
	                    return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
	                case "veriff":
	                    return veriffConfigOut_1.VeriffConfigOutSerializer._fromJsonObject(object["config"]);
	                case "airwallex":
	                    return airwallexConfigOut_1.AirwallexConfigOutSerializer._fromJsonObject(object["config"]);
	                default:
	                    throw new Error(`Unexpected type: ${type}`);
	            }
	        }
	        return {
	            type,
	            config: getConfig(type),
	            createdAt: new Date(object["createdAt"]),
	            id: object["id"],
	            ingestUrl: object["ingestUrl"],
	            metadata: object["metadata"],
	            name: object["name"],
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	        };
	    },
	    _toJsonObject(self) {
	        let config;
	        switch (self.type) {
	            case "generic-webhook":
	                config = {};
	                break;
	            case "cron":
	                config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
	                break;
	            case "adobe-sign":
	                config = adobeSignConfigOut_1.AdobeSignConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "beehiiv":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "brex":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "checkbook":
	                config = checkbookConfigOut_1.CheckbookConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "clerk":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "docusign":
	                config = docusignConfigOut_1.DocusignConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "easypost":
	                config = easypostConfigOut_1.EasypostConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "github":
	                config = githubConfigOut_1.GithubConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "guesty":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "hubspot":
	                config = hubspotConfigOut_1.HubspotConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "incident-io":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "lithic":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "nash":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "orum-io":
	                config = orumIoConfigOut_1.OrumIoConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "panda-doc":
	                config = pandaDocConfigOut_1.PandaDocConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "port-io":
	                config = portIoConfigOut_1.PortIoConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "pleo":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "replicate":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "resend":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "rutter":
	                config = rutterConfigOut_1.RutterConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "safebase":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "sardine":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "segment":
	                config = segmentConfigOut_1.SegmentConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "shopify":
	                config = shopifyConfigOut_1.ShopifyConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "slack":
	                config = slackConfigOut_1.SlackConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "stripe":
	                config = stripeConfigOut_1.StripeConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "stych":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "svix":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "zoom":
	                config = zoomConfigOut_1.ZoomConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "telnyx":
	                config = telnyxConfigOut_1.TelnyxConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "vapi":
	                config = vapiConfigOut_1.VapiConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "open-ai":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "render":
	                config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "veriff":
	                config = veriffConfigOut_1.VeriffConfigOutSerializer._toJsonObject(self.config);
	                break;
	            case "airwallex":
	                config = airwallexConfigOut_1.AirwallexConfigOutSerializer._toJsonObject(self.config);
	                break;
	        }
	        return {
	            type: self.type,
	            config: config,
	            createdAt: self.createdAt,
	            id: self.id,
	            ingestUrl: self.ingestUrl,
	            metadata: self.metadata,
	            name: self.name,
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	        };
	    },
	};
	
	return ingestSourceOut;
}

var listResponseIngestSourceOut = {};

var hasRequiredListResponseIngestSourceOut;

function requireListResponseIngestSourceOut () {
	if (hasRequiredListResponseIngestSourceOut) return listResponseIngestSourceOut;
	hasRequiredListResponseIngestSourceOut = 1;
	Object.defineProperty(listResponseIngestSourceOut, "__esModule", { value: true });
	listResponseIngestSourceOut.ListResponseIngestSourceOutSerializer = void 0;
	const ingestSourceOut_1 = requireIngestSourceOut();
	listResponseIngestSourceOut.ListResponseIngestSourceOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => ingestSourceOut_1.IngestSourceOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseIngestSourceOut;
}

var rotateTokenOut = {};

var hasRequiredRotateTokenOut;

function requireRotateTokenOut () {
	if (hasRequiredRotateTokenOut) return rotateTokenOut;
	hasRequiredRotateTokenOut = 1;
	Object.defineProperty(rotateTokenOut, "__esModule", { value: true });
	rotateTokenOut.RotateTokenOutSerializer = void 0;
	rotateTokenOut.RotateTokenOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            ingestUrl: object["ingestUrl"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            ingestUrl: self.ingestUrl,
	        };
	    },
	};
	
	return rotateTokenOut;
}

var hasRequiredIngestSource;

function requireIngestSource () {
	if (hasRequiredIngestSource) return ingestSource;
	hasRequiredIngestSource = 1;
	Object.defineProperty(ingestSource, "__esModule", { value: true });
	ingestSource.IngestSource = void 0;
	const ingestSourceIn_1 = requireIngestSourceIn();
	const ingestSourceOut_1 = requireIngestSourceOut();
	const listResponseIngestSourceOut_1 = requireListResponseIngestSourceOut();
	const rotateTokenOut_1 = requireRotateTokenOut();
	const request_1 = requireRequest();
	class IngestSource {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source");
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseIngestSourceOut_1.ListResponseIngestSourceOutSerializer._fromJsonObject);
	    }
	    create(ingestSourceIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
	        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
	    }
	    get(sourceId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}");
	        request.setPathParam("source_id", sourceId);
	        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
	    }
	    update(sourceId, ingestSourceIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}");
	        request.setPathParam("source_id", sourceId);
	        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
	        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
	    }
	    delete(sourceId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}");
	        request.setPathParam("source_id", sourceId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    rotateToken(sourceId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/token/rotate");
	        request.setPathParam("source_id", sourceId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.send(this.requestCtx, rotateTokenOut_1.RotateTokenOutSerializer._fromJsonObject);
	    }
	}
	ingestSource.IngestSource = IngestSource;
	
	return ingestSource;
}

var hasRequiredIngest;

function requireIngest () {
	if (hasRequiredIngest) return ingest;
	hasRequiredIngest = 1;
	Object.defineProperty(ingest, "__esModule", { value: true });
	ingest.Ingest = void 0;
	const dashboardAccessOut_1 = requireDashboardAccessOut();
	const ingestSourceConsumerPortalAccessIn_1 = requireIngestSourceConsumerPortalAccessIn();
	const ingestEndpoint_1 = requireIngestEndpoint();
	const ingestSource_1 = requireIngestSource();
	const request_1 = requireRequest();
	class Ingest {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    get endpoint() {
	        return new ingestEndpoint_1.IngestEndpoint(this.requestCtx);
	    }
	    get source() {
	        return new ingestSource_1.IngestSource(this.requestCtx);
	    }
	    dashboard(sourceId, ingestSourceConsumerPortalAccessIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/dashboard");
	        request.setPathParam("source_id", sourceId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(ingestSourceConsumerPortalAccessIn_1.IngestSourceConsumerPortalAccessInSerializer._toJsonObject(ingestSourceConsumerPortalAccessIn));
	        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
	    }
	}
	ingest.Ingest = Ingest;
	
	return ingest;
}

var integration = {};

var integrationIn = {};

var hasRequiredIntegrationIn;

function requireIntegrationIn () {
	if (hasRequiredIntegrationIn) return integrationIn;
	hasRequiredIntegrationIn = 1;
	Object.defineProperty(integrationIn, "__esModule", { value: true });
	integrationIn.IntegrationInSerializer = void 0;
	integrationIn.IntegrationInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            featureFlags: object["featureFlags"],
	            name: object["name"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            featureFlags: self.featureFlags,
	            name: self.name,
	        };
	    },
	};
	
	return integrationIn;
}

var integrationKeyOut = {};

var hasRequiredIntegrationKeyOut;

function requireIntegrationKeyOut () {
	if (hasRequiredIntegrationKeyOut) return integrationKeyOut;
	hasRequiredIntegrationKeyOut = 1;
	Object.defineProperty(integrationKeyOut, "__esModule", { value: true });
	integrationKeyOut.IntegrationKeyOutSerializer = void 0;
	integrationKeyOut.IntegrationKeyOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return integrationKeyOut;
}

var integrationOut = {};

var hasRequiredIntegrationOut;

function requireIntegrationOut () {
	if (hasRequiredIntegrationOut) return integrationOut;
	hasRequiredIntegrationOut = 1;
	Object.defineProperty(integrationOut, "__esModule", { value: true });
	integrationOut.IntegrationOutSerializer = void 0;
	integrationOut.IntegrationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            featureFlags: object["featureFlags"],
	            id: object["id"],
	            name: object["name"],
	            updatedAt: new Date(object["updatedAt"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            featureFlags: self.featureFlags,
	            id: self.id,
	            name: self.name,
	            updatedAt: self.updatedAt,
	        };
	    },
	};
	
	return integrationOut;
}

var integrationUpdate = {};

var hasRequiredIntegrationUpdate;

function requireIntegrationUpdate () {
	if (hasRequiredIntegrationUpdate) return integrationUpdate;
	hasRequiredIntegrationUpdate = 1;
	Object.defineProperty(integrationUpdate, "__esModule", { value: true });
	integrationUpdate.IntegrationUpdateSerializer = void 0;
	integrationUpdate.IntegrationUpdateSerializer = {
	    _fromJsonObject(object) {
	        return {
	            featureFlags: object["featureFlags"],
	            name: object["name"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            featureFlags: self.featureFlags,
	            name: self.name,
	        };
	    },
	};
	
	return integrationUpdate;
}

var listResponseIntegrationOut = {};

var hasRequiredListResponseIntegrationOut;

function requireListResponseIntegrationOut () {
	if (hasRequiredListResponseIntegrationOut) return listResponseIntegrationOut;
	hasRequiredListResponseIntegrationOut = 1;
	Object.defineProperty(listResponseIntegrationOut, "__esModule", { value: true });
	listResponseIntegrationOut.ListResponseIntegrationOutSerializer = void 0;
	const integrationOut_1 = requireIntegrationOut();
	listResponseIntegrationOut.ListResponseIntegrationOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => integrationOut_1.IntegrationOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => integrationOut_1.IntegrationOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseIntegrationOut;
}

var hasRequiredIntegration;

function requireIntegration () {
	if (hasRequiredIntegration) return integration;
	hasRequiredIntegration = 1;
	Object.defineProperty(integration, "__esModule", { value: true });
	integration.Integration = void 0;
	const integrationIn_1 = requireIntegrationIn();
	const integrationKeyOut_1 = requireIntegrationKeyOut();
	const integrationOut_1 = requireIntegrationOut();
	const integrationUpdate_1 = requireIntegrationUpdate();
	const listResponseIntegrationOut_1 = requireListResponseIntegrationOut();
	const request_1 = requireRequest();
	class Integration {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(appId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration");
	        request.setPathParam("app_id", appId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseIntegrationOut_1.ListResponseIntegrationOutSerializer._fromJsonObject);
	    }
	    create(appId, integrationIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(integrationIn_1.IntegrationInSerializer._toJsonObject(integrationIn));
	        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
	    }
	    get(appId, integId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("integ_id", integId);
	        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
	    }
	    update(appId, integId, integrationUpdate) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/integration/{integ_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("integ_id", integId);
	        request.setBody(integrationUpdate_1.IntegrationUpdateSerializer._toJsonObject(integrationUpdate));
	        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
	    }
	    delete(appId, integId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/integration/{integ_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("integ_id", integId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getKey(appId, integId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}/key");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("integ_id", integId);
	        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
	    }
	    rotateKey(appId, integId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration/{integ_id}/key/rotate");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("integ_id", integId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
	    }
	}
	integration.Integration = Integration;
	
	return integration;
}

var message = {};

var expungeAllContentsOut = {};

var hasRequiredExpungeAllContentsOut;

function requireExpungeAllContentsOut () {
	if (hasRequiredExpungeAllContentsOut) return expungeAllContentsOut;
	hasRequiredExpungeAllContentsOut = 1;
	Object.defineProperty(expungeAllContentsOut, "__esModule", { value: true });
	expungeAllContentsOut.ExpungeAllContentsOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	expungeAllContentsOut.ExpungeAllContentsOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	        };
	    },
	};
	
	return expungeAllContentsOut;
}

var listResponseMessageOut = {};

var hasRequiredListResponseMessageOut;

function requireListResponseMessageOut () {
	if (hasRequiredListResponseMessageOut) return listResponseMessageOut;
	hasRequiredListResponseMessageOut = 1;
	Object.defineProperty(listResponseMessageOut, "__esModule", { value: true });
	listResponseMessageOut.ListResponseMessageOutSerializer = void 0;
	const messageOut_1 = requireMessageOut();
	listResponseMessageOut.ListResponseMessageOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => messageOut_1.MessageOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => messageOut_1.MessageOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseMessageOut;
}

var messagePoller = {};

var pollingEndpointConsumerSeekIn = {};

var hasRequiredPollingEndpointConsumerSeekIn;

function requirePollingEndpointConsumerSeekIn () {
	if (hasRequiredPollingEndpointConsumerSeekIn) return pollingEndpointConsumerSeekIn;
	hasRequiredPollingEndpointConsumerSeekIn = 1;
	Object.defineProperty(pollingEndpointConsumerSeekIn, "__esModule", { value: true });
	pollingEndpointConsumerSeekIn.PollingEndpointConsumerSeekInSerializer = void 0;
	pollingEndpointConsumerSeekIn.PollingEndpointConsumerSeekInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            after: new Date(object["after"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            after: self.after,
	        };
	    },
	};
	
	return pollingEndpointConsumerSeekIn;
}

var pollingEndpointConsumerSeekOut = {};

var hasRequiredPollingEndpointConsumerSeekOut;

function requirePollingEndpointConsumerSeekOut () {
	if (hasRequiredPollingEndpointConsumerSeekOut) return pollingEndpointConsumerSeekOut;
	hasRequiredPollingEndpointConsumerSeekOut = 1;
	Object.defineProperty(pollingEndpointConsumerSeekOut, "__esModule", { value: true });
	pollingEndpointConsumerSeekOut.PollingEndpointConsumerSeekOutSerializer = void 0;
	pollingEndpointConsumerSeekOut.PollingEndpointConsumerSeekOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            iterator: object["iterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            iterator: self.iterator,
	        };
	    },
	};
	
	return pollingEndpointConsumerSeekOut;
}

var pollingEndpointOut = {};

var pollingEndpointMessageOut = {};

var hasRequiredPollingEndpointMessageOut;

function requirePollingEndpointMessageOut () {
	if (hasRequiredPollingEndpointMessageOut) return pollingEndpointMessageOut;
	hasRequiredPollingEndpointMessageOut = 1;
	Object.defineProperty(pollingEndpointMessageOut, "__esModule", { value: true });
	pollingEndpointMessageOut.PollingEndpointMessageOutSerializer = void 0;
	pollingEndpointMessageOut.PollingEndpointMessageOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            eventId: object["eventId"],
	            eventType: object["eventType"],
	            headers: object["headers"],
	            id: object["id"],
	            payload: object["payload"],
	            tags: object["tags"],
	            timestamp: new Date(object["timestamp"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            eventId: self.eventId,
	            eventType: self.eventType,
	            headers: self.headers,
	            id: self.id,
	            payload: self.payload,
	            tags: self.tags,
	            timestamp: self.timestamp,
	        };
	    },
	};
	
	return pollingEndpointMessageOut;
}

var hasRequiredPollingEndpointOut;

function requirePollingEndpointOut () {
	if (hasRequiredPollingEndpointOut) return pollingEndpointOut;
	hasRequiredPollingEndpointOut = 1;
	Object.defineProperty(pollingEndpointOut, "__esModule", { value: true });
	pollingEndpointOut.PollingEndpointOutSerializer = void 0;
	const pollingEndpointMessageOut_1 = requirePollingEndpointMessageOut();
	pollingEndpointOut.PollingEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	        };
	    },
	};
	
	return pollingEndpointOut;
}

var hasRequiredMessagePoller;

function requireMessagePoller () {
	if (hasRequiredMessagePoller) return messagePoller;
	hasRequiredMessagePoller = 1;
	Object.defineProperty(messagePoller, "__esModule", { value: true });
	messagePoller.MessagePoller = void 0;
	const pollingEndpointConsumerSeekIn_1 = requirePollingEndpointConsumerSeekIn();
	const pollingEndpointConsumerSeekOut_1 = requirePollingEndpointConsumerSeekOut();
	const pollingEndpointOut_1 = requirePollingEndpointOut();
	const request_1 = requireRequest();
	class MessagePoller {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    poll(appId, sinkId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("sink_id", sinkId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("event_type", options === null || options === void 0 ? void 0 : options.eventType);
	        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
	        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
	        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
	    }
	    consumerPoll(appId, sinkId, consumerId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("sink_id", sinkId);
	        request.setPathParam("consumer_id", consumerId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
	    }
	    consumerSeek(appId, sinkId, consumerId, pollingEndpointConsumerSeekIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}/seek");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("sink_id", sinkId);
	        request.setPathParam("consumer_id", consumerId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(pollingEndpointConsumerSeekIn_1.PollingEndpointConsumerSeekInSerializer._toJsonObject(pollingEndpointConsumerSeekIn));
	        return request.send(this.requestCtx, pollingEndpointConsumerSeekOut_1.PollingEndpointConsumerSeekOutSerializer._fromJsonObject);
	    }
	}
	messagePoller.MessagePoller = MessagePoller;
	
	return messagePoller;
}

var messageIn = {};

var hasRequiredMessageIn;

function requireMessageIn () {
	if (hasRequiredMessageIn) return messageIn;
	hasRequiredMessageIn = 1;
	Object.defineProperty(messageIn, "__esModule", { value: true });
	messageIn.MessageInSerializer = void 0;
	const applicationIn_1 = requireApplicationIn();
	messageIn.MessageInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            application: object["application"]
	                ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"])
	                : undefined,
	            channels: object["channels"],
	            eventId: object["eventId"],
	            eventType: object["eventType"],
	            payload: object["payload"],
	            payloadRetentionHours: object["payloadRetentionHours"],
	            payloadRetentionPeriod: object["payloadRetentionPeriod"],
	            tags: object["tags"],
	            transformationsParams: object["transformationsParams"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            application: self.application
	                ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application)
	                : undefined,
	            channels: self.channels,
	            eventId: self.eventId,
	            eventType: self.eventType,
	            payload: self.payload,
	            payloadRetentionHours: self.payloadRetentionHours,
	            payloadRetentionPeriod: self.payloadRetentionPeriod,
	            tags: self.tags,
	            transformationsParams: self.transformationsParams,
	        };
	    },
	};
	
	return messageIn;
}

var hasRequiredMessage;

function requireMessage () {
	if (hasRequiredMessage) return message;
	hasRequiredMessage = 1;
	Object.defineProperty(message, "__esModule", { value: true });
	message.messageInRaw = message.Message = void 0;
	const expungeAllContentsOut_1 = requireExpungeAllContentsOut();
	const listResponseMessageOut_1 = requireListResponseMessageOut();
	const messageOut_1 = requireMessageOut();
	const messagePoller_1 = requireMessagePoller();
	const request_1 = requireRequest();
	const messageIn_1 = requireMessageIn();
	class Message {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    get poller() {
	        return new messagePoller_1.MessagePoller(this.requestCtx);
	    }
	    list(appId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg");
	        request.setPathParam("app_id", appId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
	        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
	        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
	        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
	        return request.send(this.requestCtx, listResponseMessageOut_1.ListResponseMessageOutSerializer._fromJsonObject);
	    }
	    create(appId, messageIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg");
	        request.setPathParam("app_id", appId);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(messageIn_1.MessageInSerializer._toJsonObject(messageIn));
	        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
	    }
	    expungeAllContents(appId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/expunge-all-contents");
	        request.setPathParam("app_id", appId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.send(this.requestCtx, expungeAllContentsOut_1.ExpungeAllContentsOutSerializer._fromJsonObject);
	    }
	    get(appId, msgId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
	    }
	    expungeContent(appId, msgId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/content");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	message.Message = Message;
	function messageInRaw(eventType, payload, contentType) {
	    const headers = contentType ? { "content-type": contentType } : undefined;
	    return {
	        eventType,
	        payload: {},
	        transformationsParams: {
	            rawPayload: payload,
	            headers,
	        },
	    };
	}
	message.messageInRaw = messageInRaw;
	
	return message;
}

var messageAttempt = {};

var listResponseEndpointMessageOut = {};

var endpointMessageOut = {};

var messageStatus = {};

var hasRequiredMessageStatus;

function requireMessageStatus () {
	if (hasRequiredMessageStatus) return messageStatus;
	hasRequiredMessageStatus = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.MessageStatusSerializer = exports$1.MessageStatus = void 0;
		(function (MessageStatus) {
		    MessageStatus[MessageStatus["Success"] = 0] = "Success";
		    MessageStatus[MessageStatus["Pending"] = 1] = "Pending";
		    MessageStatus[MessageStatus["Fail"] = 2] = "Fail";
		    MessageStatus[MessageStatus["Sending"] = 3] = "Sending";
		})(exports$1.MessageStatus || (exports$1.MessageStatus = {}));
		exports$1.MessageStatusSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (messageStatus));
	return messageStatus;
}

var messageStatusText = {};

var hasRequiredMessageStatusText;

function requireMessageStatusText () {
	if (hasRequiredMessageStatusText) return messageStatusText;
	hasRequiredMessageStatusText = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.MessageStatusTextSerializer = exports$1.MessageStatusText = void 0;
		(function (MessageStatusText) {
		    MessageStatusText["Success"] = "success";
		    MessageStatusText["Pending"] = "pending";
		    MessageStatusText["Fail"] = "fail";
		    MessageStatusText["Sending"] = "sending";
		})(exports$1.MessageStatusText || (exports$1.MessageStatusText = {}));
		exports$1.MessageStatusTextSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (messageStatusText));
	return messageStatusText;
}

var hasRequiredEndpointMessageOut;

function requireEndpointMessageOut () {
	if (hasRequiredEndpointMessageOut) return endpointMessageOut;
	hasRequiredEndpointMessageOut = 1;
	Object.defineProperty(endpointMessageOut, "__esModule", { value: true });
	endpointMessageOut.EndpointMessageOutSerializer = void 0;
	const messageStatus_1 = requireMessageStatus();
	const messageStatusText_1 = requireMessageStatusText();
	endpointMessageOut.EndpointMessageOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            eventId: object["eventId"],
	            eventType: object["eventType"],
	            id: object["id"],
	            nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
	            payload: object["payload"],
	            status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
	            tags: object["tags"],
	            timestamp: new Date(object["timestamp"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            eventId: self.eventId,
	            eventType: self.eventType,
	            id: self.id,
	            nextAttempt: self.nextAttempt,
	            payload: self.payload,
	            status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
	            tags: self.tags,
	            timestamp: self.timestamp,
	        };
	    },
	};
	
	return endpointMessageOut;
}

var hasRequiredListResponseEndpointMessageOut;

function requireListResponseEndpointMessageOut () {
	if (hasRequiredListResponseEndpointMessageOut) return listResponseEndpointMessageOut;
	hasRequiredListResponseEndpointMessageOut = 1;
	Object.defineProperty(listResponseEndpointMessageOut, "__esModule", { value: true });
	listResponseEndpointMessageOut.ListResponseEndpointMessageOutSerializer = void 0;
	const endpointMessageOut_1 = requireEndpointMessageOut();
	listResponseEndpointMessageOut.ListResponseEndpointMessageOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseEndpointMessageOut;
}

var listResponseMessageAttemptOut = {};

var messageAttemptOut = {};

var messageAttemptTriggerType = {};

var hasRequiredMessageAttemptTriggerType;

function requireMessageAttemptTriggerType () {
	if (hasRequiredMessageAttemptTriggerType) return messageAttemptTriggerType;
	hasRequiredMessageAttemptTriggerType = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.MessageAttemptTriggerTypeSerializer = exports$1.MessageAttemptTriggerType = void 0;
		(function (MessageAttemptTriggerType) {
		    MessageAttemptTriggerType[MessageAttemptTriggerType["Scheduled"] = 0] = "Scheduled";
		    MessageAttemptTriggerType[MessageAttemptTriggerType["Manual"] = 1] = "Manual";
		})(exports$1.MessageAttemptTriggerType || (exports$1.MessageAttemptTriggerType = {}));
		exports$1.MessageAttemptTriggerTypeSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (messageAttemptTriggerType));
	return messageAttemptTriggerType;
}

var hasRequiredMessageAttemptOut;

function requireMessageAttemptOut () {
	if (hasRequiredMessageAttemptOut) return messageAttemptOut;
	hasRequiredMessageAttemptOut = 1;
	Object.defineProperty(messageAttemptOut, "__esModule", { value: true });
	messageAttemptOut.MessageAttemptOutSerializer = void 0;
	const messageAttemptTriggerType_1 = requireMessageAttemptTriggerType();
	const messageOut_1 = requireMessageOut();
	const messageStatus_1 = requireMessageStatus();
	const messageStatusText_1 = requireMessageStatusText();
	messageAttemptOut.MessageAttemptOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            endpointId: object["endpointId"],
	            id: object["id"],
	            msg: object["msg"]
	                ? messageOut_1.MessageOutSerializer._fromJsonObject(object["msg"])
	                : undefined,
	            msgId: object["msgId"],
	            response: object["response"],
	            responseDurationMs: object["responseDurationMs"],
	            responseStatusCode: object["responseStatusCode"],
	            status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
	            timestamp: new Date(object["timestamp"]),
	            triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._fromJsonObject(object["triggerType"]),
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            endpointId: self.endpointId,
	            id: self.id,
	            msg: self.msg ? messageOut_1.MessageOutSerializer._toJsonObject(self.msg) : undefined,
	            msgId: self.msgId,
	            response: self.response,
	            responseDurationMs: self.responseDurationMs,
	            responseStatusCode: self.responseStatusCode,
	            status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
	            timestamp: self.timestamp,
	            triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._toJsonObject(self.triggerType),
	            url: self.url,
	        };
	    },
	};
	
	return messageAttemptOut;
}

var hasRequiredListResponseMessageAttemptOut;

function requireListResponseMessageAttemptOut () {
	if (hasRequiredListResponseMessageAttemptOut) return listResponseMessageAttemptOut;
	hasRequiredListResponseMessageAttemptOut = 1;
	Object.defineProperty(listResponseMessageAttemptOut, "__esModule", { value: true });
	listResponseMessageAttemptOut.ListResponseMessageAttemptOutSerializer = void 0;
	const messageAttemptOut_1 = requireMessageAttemptOut();
	listResponseMessageAttemptOut.ListResponseMessageAttemptOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseMessageAttemptOut;
}

var listResponseMessageEndpointOut = {};

var messageEndpointOut = {};

var hasRequiredMessageEndpointOut;

function requireMessageEndpointOut () {
	if (hasRequiredMessageEndpointOut) return messageEndpointOut;
	hasRequiredMessageEndpointOut = 1;
	Object.defineProperty(messageEndpointOut, "__esModule", { value: true });
	messageEndpointOut.MessageEndpointOutSerializer = void 0;
	const messageStatus_1 = requireMessageStatus();
	const messageStatusText_1 = requireMessageStatusText();
	messageEndpointOut.MessageEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            channels: object["channels"],
	            createdAt: new Date(object["createdAt"]),
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            id: object["id"],
	            nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
	            rateLimit: object["rateLimit"],
	            status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	            url: object["url"],
	            version: object["version"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            channels: self.channels,
	            createdAt: self.createdAt,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            id: self.id,
	            nextAttempt: self.nextAttempt,
	            rateLimit: self.rateLimit,
	            status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
	            statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	            url: self.url,
	            version: self.version,
	        };
	    },
	};
	
	return messageEndpointOut;
}

var hasRequiredListResponseMessageEndpointOut;

function requireListResponseMessageEndpointOut () {
	if (hasRequiredListResponseMessageEndpointOut) return listResponseMessageEndpointOut;
	hasRequiredListResponseMessageEndpointOut = 1;
	Object.defineProperty(listResponseMessageEndpointOut, "__esModule", { value: true });
	listResponseMessageEndpointOut.ListResponseMessageEndpointOutSerializer = void 0;
	const messageEndpointOut_1 = requireMessageEndpointOut();
	listResponseMessageEndpointOut.ListResponseMessageEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseMessageEndpointOut;
}

var hasRequiredMessageAttempt;

function requireMessageAttempt () {
	if (hasRequiredMessageAttempt) return messageAttempt;
	hasRequiredMessageAttempt = 1;
	Object.defineProperty(messageAttempt, "__esModule", { value: true });
	messageAttempt.MessageAttempt = void 0;
	const listResponseEndpointMessageOut_1 = requireListResponseEndpointMessageOut();
	const listResponseMessageAttemptOut_1 = requireListResponseMessageAttemptOut();
	const listResponseMessageEndpointOut_1 = requireListResponseMessageEndpointOut();
	const messageAttemptOut_1 = requireMessageAttemptOut();
	const request_1 = requireRequest();
	class MessageAttempt {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    listByEndpoint(appId, endpointId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
	        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
	        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
	        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
	        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
	        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        request.setQueryParam("with_msg", options === null || options === void 0 ? void 0 : options.withMsg);
	        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
	        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
	    }
	    listByMsg(appId, msgId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/msg/{msg_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
	        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
	        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
	        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
	        request.setQueryParam("endpoint_id", options === null || options === void 0 ? void 0 : options.endpointId);
	        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
	        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
	        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
	    }
	    listAttemptedMessages(appId, endpointId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
	        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
	        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
	        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
	        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
	        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
	        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
	        return request.send(this.requestCtx, listResponseEndpointMessageOut_1.ListResponseEndpointMessageOutSerializer._fromJsonObject);
	    }
	    get(appId, msgId, attemptId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setPathParam("attempt_id", attemptId);
	        return request.send(this.requestCtx, messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject);
	    }
	    expungeContent(appId, msgId, attemptId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/content");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setPathParam("attempt_id", attemptId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    listAttemptedDestinations(appId, msgId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        return request.send(this.requestCtx, listResponseMessageEndpointOut_1.ListResponseMessageEndpointOutSerializer._fromJsonObject);
	    }
	    resend(appId, msgId, endpointId, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend");
	        request.setPathParam("app_id", appId);
	        request.setPathParam("msg_id", msgId);
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	messageAttempt.MessageAttempt = MessageAttempt;
	
	return messageAttempt;
}

var operationalWebhook = {};

var operationalWebhookEndpoint = {};

var listResponseOperationalWebhookEndpointOut = {};

var operationalWebhookEndpointOut = {};

var hasRequiredOperationalWebhookEndpointOut;

function requireOperationalWebhookEndpointOut () {
	if (hasRequiredOperationalWebhookEndpointOut) return operationalWebhookEndpointOut;
	hasRequiredOperationalWebhookEndpointOut = 1;
	Object.defineProperty(operationalWebhookEndpointOut, "__esModule", { value: true });
	operationalWebhookEndpointOut.OperationalWebhookEndpointOutSerializer = void 0;
	operationalWebhookEndpointOut.OperationalWebhookEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            createdAt: new Date(object["createdAt"]),
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            id: object["id"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            updatedAt: new Date(object["updatedAt"]),
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            createdAt: self.createdAt,
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            id: self.id,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            updatedAt: self.updatedAt,
	            url: self.url,
	        };
	    },
	};
	
	return operationalWebhookEndpointOut;
}

var hasRequiredListResponseOperationalWebhookEndpointOut;

function requireListResponseOperationalWebhookEndpointOut () {
	if (hasRequiredListResponseOperationalWebhookEndpointOut) return listResponseOperationalWebhookEndpointOut;
	hasRequiredListResponseOperationalWebhookEndpointOut = 1;
	Object.defineProperty(listResponseOperationalWebhookEndpointOut, "__esModule", { value: true });
	listResponseOperationalWebhookEndpointOut.ListResponseOperationalWebhookEndpointOutSerializer = void 0;
	const operationalWebhookEndpointOut_1 = requireOperationalWebhookEndpointOut();
	listResponseOperationalWebhookEndpointOut.ListResponseOperationalWebhookEndpointOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            data: object["data"].map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject(item)),
	            done: object["done"],
	            iterator: object["iterator"],
	            prevIterator: object["prevIterator"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            data: self.data.map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._toJsonObject(item)),
	            done: self.done,
	            iterator: self.iterator,
	            prevIterator: self.prevIterator,
	        };
	    },
	};
	
	return listResponseOperationalWebhookEndpointOut;
}

var operationalWebhookEndpointHeadersIn = {};

var hasRequiredOperationalWebhookEndpointHeadersIn;

function requireOperationalWebhookEndpointHeadersIn () {
	if (hasRequiredOperationalWebhookEndpointHeadersIn) return operationalWebhookEndpointHeadersIn;
	hasRequiredOperationalWebhookEndpointHeadersIn = 1;
	Object.defineProperty(operationalWebhookEndpointHeadersIn, "__esModule", { value: true });
	operationalWebhookEndpointHeadersIn.OperationalWebhookEndpointHeadersInSerializer = void 0;
	operationalWebhookEndpointHeadersIn.OperationalWebhookEndpointHeadersInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	        };
	    },
	};
	
	return operationalWebhookEndpointHeadersIn;
}

var operationalWebhookEndpointHeadersOut = {};

var hasRequiredOperationalWebhookEndpointHeadersOut;

function requireOperationalWebhookEndpointHeadersOut () {
	if (hasRequiredOperationalWebhookEndpointHeadersOut) return operationalWebhookEndpointHeadersOut;
	hasRequiredOperationalWebhookEndpointHeadersOut = 1;
	Object.defineProperty(operationalWebhookEndpointHeadersOut, "__esModule", { value: true });
	operationalWebhookEndpointHeadersOut.OperationalWebhookEndpointHeadersOutSerializer = void 0;
	operationalWebhookEndpointHeadersOut.OperationalWebhookEndpointHeadersOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            headers: object["headers"],
	            sensitive: object["sensitive"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            headers: self.headers,
	            sensitive: self.sensitive,
	        };
	    },
	};
	
	return operationalWebhookEndpointHeadersOut;
}

var operationalWebhookEndpointIn = {};

var hasRequiredOperationalWebhookEndpointIn;

function requireOperationalWebhookEndpointIn () {
	if (hasRequiredOperationalWebhookEndpointIn) return operationalWebhookEndpointIn;
	hasRequiredOperationalWebhookEndpointIn = 1;
	Object.defineProperty(operationalWebhookEndpointIn, "__esModule", { value: true });
	operationalWebhookEndpointIn.OperationalWebhookEndpointInSerializer = void 0;
	operationalWebhookEndpointIn.OperationalWebhookEndpointInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            secret: object["secret"],
	            uid: object["uid"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            secret: self.secret,
	            uid: self.uid,
	            url: self.url,
	        };
	    },
	};
	
	return operationalWebhookEndpointIn;
}

var operationalWebhookEndpointSecretIn = {};

var hasRequiredOperationalWebhookEndpointSecretIn;

function requireOperationalWebhookEndpointSecretIn () {
	if (hasRequiredOperationalWebhookEndpointSecretIn) return operationalWebhookEndpointSecretIn;
	hasRequiredOperationalWebhookEndpointSecretIn = 1;
	Object.defineProperty(operationalWebhookEndpointSecretIn, "__esModule", { value: true });
	operationalWebhookEndpointSecretIn.OperationalWebhookEndpointSecretInSerializer = void 0;
	operationalWebhookEndpointSecretIn.OperationalWebhookEndpointSecretInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return operationalWebhookEndpointSecretIn;
}

var operationalWebhookEndpointSecretOut = {};

var hasRequiredOperationalWebhookEndpointSecretOut;

function requireOperationalWebhookEndpointSecretOut () {
	if (hasRequiredOperationalWebhookEndpointSecretOut) return operationalWebhookEndpointSecretOut;
	hasRequiredOperationalWebhookEndpointSecretOut = 1;
	Object.defineProperty(operationalWebhookEndpointSecretOut, "__esModule", { value: true });
	operationalWebhookEndpointSecretOut.OperationalWebhookEndpointSecretOutSerializer = void 0;
	operationalWebhookEndpointSecretOut.OperationalWebhookEndpointSecretOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            key: object["key"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            key: self.key,
	        };
	    },
	};
	
	return operationalWebhookEndpointSecretOut;
}

var operationalWebhookEndpointUpdate = {};

var hasRequiredOperationalWebhookEndpointUpdate;

function requireOperationalWebhookEndpointUpdate () {
	if (hasRequiredOperationalWebhookEndpointUpdate) return operationalWebhookEndpointUpdate;
	hasRequiredOperationalWebhookEndpointUpdate = 1;
	Object.defineProperty(operationalWebhookEndpointUpdate, "__esModule", { value: true });
	operationalWebhookEndpointUpdate.OperationalWebhookEndpointUpdateSerializer = void 0;
	operationalWebhookEndpointUpdate.OperationalWebhookEndpointUpdateSerializer = {
	    _fromJsonObject(object) {
	        return {
	            description: object["description"],
	            disabled: object["disabled"],
	            filterTypes: object["filterTypes"],
	            metadata: object["metadata"],
	            rateLimit: object["rateLimit"],
	            uid: object["uid"],
	            url: object["url"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            description: self.description,
	            disabled: self.disabled,
	            filterTypes: self.filterTypes,
	            metadata: self.metadata,
	            rateLimit: self.rateLimit,
	            uid: self.uid,
	            url: self.url,
	        };
	    },
	};
	
	return operationalWebhookEndpointUpdate;
}

var hasRequiredOperationalWebhookEndpoint;

function requireOperationalWebhookEndpoint () {
	if (hasRequiredOperationalWebhookEndpoint) return operationalWebhookEndpoint;
	hasRequiredOperationalWebhookEndpoint = 1;
	Object.defineProperty(operationalWebhookEndpoint, "__esModule", { value: true });
	operationalWebhookEndpoint.OperationalWebhookEndpoint = void 0;
	const listResponseOperationalWebhookEndpointOut_1 = requireListResponseOperationalWebhookEndpointOut();
	const operationalWebhookEndpointHeadersIn_1 = requireOperationalWebhookEndpointHeadersIn();
	const operationalWebhookEndpointHeadersOut_1 = requireOperationalWebhookEndpointHeadersOut();
	const operationalWebhookEndpointIn_1 = requireOperationalWebhookEndpointIn();
	const operationalWebhookEndpointOut_1 = requireOperationalWebhookEndpointOut();
	const operationalWebhookEndpointSecretIn_1 = requireOperationalWebhookEndpointSecretIn();
	const operationalWebhookEndpointSecretOut_1 = requireOperationalWebhookEndpointSecretOut();
	const operationalWebhookEndpointUpdate_1 = requireOperationalWebhookEndpointUpdate();
	const request_1 = requireRequest();
	class OperationalWebhookEndpoint {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    list(options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint");
	        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
	        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
	        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
	        return request.send(this.requestCtx, listResponseOperationalWebhookEndpointOut_1.ListResponseOperationalWebhookEndpointOutSerializer._fromJsonObject);
	    }
	    create(operationalWebhookEndpointIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(operationalWebhookEndpointIn_1.OperationalWebhookEndpointInSerializer._toJsonObject(operationalWebhookEndpointIn));
	        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
	    }
	    get(endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
	    }
	    update(endpointId, operationalWebhookEndpointUpdate) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(operationalWebhookEndpointUpdate_1.OperationalWebhookEndpointUpdateSerializer._toJsonObject(operationalWebhookEndpointUpdate));
	        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
	    }
	    delete(endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
	        request.setPathParam("endpoint_id", endpointId);
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getHeaders(endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, operationalWebhookEndpointHeadersOut_1.OperationalWebhookEndpointHeadersOutSerializer._fromJsonObject);
	    }
	    updateHeaders(endpointId, operationalWebhookEndpointHeadersIn) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
	        request.setPathParam("endpoint_id", endpointId);
	        request.setBody(operationalWebhookEndpointHeadersIn_1.OperationalWebhookEndpointHeadersInSerializer._toJsonObject(operationalWebhookEndpointHeadersIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	    getSecret(endpointId) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret");
	        request.setPathParam("endpoint_id", endpointId);
	        return request.send(this.requestCtx, operationalWebhookEndpointSecretOut_1.OperationalWebhookEndpointSecretOutSerializer._fromJsonObject);
	    }
	    rotateSecret(endpointId, operationalWebhookEndpointSecretIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret/rotate");
	        request.setPathParam("endpoint_id", endpointId);
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(operationalWebhookEndpointSecretIn_1.OperationalWebhookEndpointSecretInSerializer._toJsonObject(operationalWebhookEndpointSecretIn));
	        return request.sendNoResponseBody(this.requestCtx);
	    }
	}
	operationalWebhookEndpoint.OperationalWebhookEndpoint = OperationalWebhookEndpoint;
	
	return operationalWebhookEndpoint;
}

var hasRequiredOperationalWebhook;

function requireOperationalWebhook () {
	if (hasRequiredOperationalWebhook) return operationalWebhook;
	hasRequiredOperationalWebhook = 1;
	Object.defineProperty(operationalWebhook, "__esModule", { value: true });
	operationalWebhook.OperationalWebhook = void 0;
	const operationalWebhookEndpoint_1 = requireOperationalWebhookEndpoint();
	class OperationalWebhook {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    get endpoint() {
	        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
	    }
	}
	operationalWebhook.OperationalWebhook = OperationalWebhook;
	
	return operationalWebhook;
}

var statistics = {};

var aggregateEventTypesOut = {};

var hasRequiredAggregateEventTypesOut;

function requireAggregateEventTypesOut () {
	if (hasRequiredAggregateEventTypesOut) return aggregateEventTypesOut;
	hasRequiredAggregateEventTypesOut = 1;
	Object.defineProperty(aggregateEventTypesOut, "__esModule", { value: true });
	aggregateEventTypesOut.AggregateEventTypesOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	aggregateEventTypesOut.AggregateEventTypesOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	        };
	    },
	};
	
	return aggregateEventTypesOut;
}

var appUsageStatsIn = {};

var hasRequiredAppUsageStatsIn;

function requireAppUsageStatsIn () {
	if (hasRequiredAppUsageStatsIn) return appUsageStatsIn;
	hasRequiredAppUsageStatsIn = 1;
	Object.defineProperty(appUsageStatsIn, "__esModule", { value: true });
	appUsageStatsIn.AppUsageStatsInSerializer = void 0;
	appUsageStatsIn.AppUsageStatsInSerializer = {
	    _fromJsonObject(object) {
	        return {
	            appIds: object["appIds"],
	            since: new Date(object["since"]),
	            until: new Date(object["until"]),
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            appIds: self.appIds,
	            since: self.since,
	            until: self.until,
	        };
	    },
	};
	
	return appUsageStatsIn;
}

var appUsageStatsOut = {};

var hasRequiredAppUsageStatsOut;

function requireAppUsageStatsOut () {
	if (hasRequiredAppUsageStatsOut) return appUsageStatsOut;
	hasRequiredAppUsageStatsOut = 1;
	Object.defineProperty(appUsageStatsOut, "__esModule", { value: true });
	appUsageStatsOut.AppUsageStatsOutSerializer = void 0;
	const backgroundTaskStatus_1 = requireBackgroundTaskStatus();
	const backgroundTaskType_1 = requireBackgroundTaskType();
	appUsageStatsOut.AppUsageStatsOutSerializer = {
	    _fromJsonObject(object) {
	        return {
	            id: object["id"],
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
	            unresolvedAppIds: object["unresolvedAppIds"],
	        };
	    },
	    _toJsonObject(self) {
	        return {
	            id: self.id,
	            status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
	            task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
	            unresolvedAppIds: self.unresolvedAppIds,
	        };
	    },
	};
	
	return appUsageStatsOut;
}

var hasRequiredStatistics;

function requireStatistics () {
	if (hasRequiredStatistics) return statistics;
	hasRequiredStatistics = 1;
	Object.defineProperty(statistics, "__esModule", { value: true });
	statistics.Statistics = void 0;
	const aggregateEventTypesOut_1 = requireAggregateEventTypesOut();
	const appUsageStatsIn_1 = requireAppUsageStatsIn();
	const appUsageStatsOut_1 = requireAppUsageStatsOut();
	const request_1 = requireRequest();
	class Statistics {
	    constructor(requestCtx) {
	        this.requestCtx = requestCtx;
	    }
	    aggregateAppStats(appUsageStatsIn, options) {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stats/usage/app");
	        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
	        request.setBody(appUsageStatsIn_1.AppUsageStatsInSerializer._toJsonObject(appUsageStatsIn));
	        return request.send(this.requestCtx, appUsageStatsOut_1.AppUsageStatsOutSerializer._fromJsonObject);
	    }
	    aggregateEventTypes() {
	        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stats/usage/event-types");
	        return request.send(this.requestCtx, aggregateEventTypesOut_1.AggregateEventTypesOutSerializer._fromJsonObject);
	    }
	}
	statistics.Statistics = Statistics;
	
	return statistics;
}

var HttpErrors = {};

var hasRequiredHttpErrors;

function requireHttpErrors () {
	if (hasRequiredHttpErrors) return HttpErrors;
	hasRequiredHttpErrors = 1;
	Object.defineProperty(HttpErrors, "__esModule", { value: true });
	HttpErrors.HTTPValidationError = HttpErrors.ValidationError = HttpErrors.HttpErrorOut = void 0;
	class HttpErrorOut {
	    static getAttributeTypeMap() {
	        return HttpErrorOut.attributeTypeMap;
	    }
	}
	HttpErrors.HttpErrorOut = HttpErrorOut;
	HttpErrorOut.discriminator = undefined;
	HttpErrorOut.mapping = undefined;
	HttpErrorOut.attributeTypeMap = [
	    {
	        name: "code",
	        baseName: "code",
	        type: "string",
	        format: "",
	    },
	    {
	        name: "detail",
	        baseName: "detail",
	        type: "string",
	        format: "",
	    },
	];
	class ValidationError {
	    static getAttributeTypeMap() {
	        return ValidationError.attributeTypeMap;
	    }
	}
	HttpErrors.ValidationError = ValidationError;
	ValidationError.discriminator = undefined;
	ValidationError.mapping = undefined;
	ValidationError.attributeTypeMap = [
	    {
	        name: "loc",
	        baseName: "loc",
	        type: "Array<string>",
	        format: "",
	    },
	    {
	        name: "msg",
	        baseName: "msg",
	        type: "string",
	        format: "",
	    },
	    {
	        name: "type",
	        baseName: "type",
	        type: "string",
	        format: "",
	    },
	];
	class HTTPValidationError {
	    static getAttributeTypeMap() {
	        return HTTPValidationError.attributeTypeMap;
	    }
	}
	HttpErrors.HTTPValidationError = HTTPValidationError;
	HTTPValidationError.discriminator = undefined;
	HTTPValidationError.mapping = undefined;
	HTTPValidationError.attributeTypeMap = [
	    {
	        name: "detail",
	        baseName: "detail",
	        type: "Array<ValidationError>",
	        format: "",
	    },
	];
	
	return HttpErrors;
}

var webhook = {};

var timing_safe_equal = {};

var hasRequiredTiming_safe_equal;

function requireTiming_safe_equal () {
	if (hasRequiredTiming_safe_equal) return timing_safe_equal;
	hasRequiredTiming_safe_equal = 1;
	Object.defineProperty(timing_safe_equal, "__esModule", { value: true });
	timing_safe_equal.timingSafeEqual = void 0;
	function assert(expr, msg = "") {
	    if (!expr) {
	        throw new Error(msg);
	    }
	}
	function timingSafeEqual(a, b) {
	    if (a.byteLength !== b.byteLength) {
	        return false;
	    }
	    if (!(a instanceof DataView)) {
	        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
	    }
	    if (!(b instanceof DataView)) {
	        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
	    }
	    assert(a instanceof DataView);
	    assert(b instanceof DataView);
	    const length = a.byteLength;
	    let out = 0;
	    let i = -1;
	    while (++i < length) {
	        out |= a.getUint8(i) ^ b.getUint8(i);
	    }
	    return out === 0;
	}
	timing_safe_equal.timingSafeEqual = timingSafeEqual;
	
	return timing_safe_equal;
}

var base64 = {};

var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;
	// Copyright (C) 2016 Dmitry Chestnykh
	// MIT License. See LICENSE file for details.
	var __extends = (base64 && base64.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(base64, "__esModule", { value: true });
	/**
	 * Package base64 implements Base64 encoding and decoding.
	 */
	// Invalid character used in decoding to indicate
	// that the character to decode is out of range of
	// alphabet and cannot be decoded.
	var INVALID_BYTE = 256;
	/**
	 * Implements standard Base64 encoding.
	 *
	 * Operates in constant time.
	 */
	var Coder = /** @class */ (function () {
	    // TODO(dchest): methods to encode chunk-by-chunk.
	    function Coder(_paddingCharacter) {
	        if (_paddingCharacter === void 0) { _paddingCharacter = "="; }
	        this._paddingCharacter = _paddingCharacter;
	    }
	    Coder.prototype.encodedLength = function (length) {
	        if (!this._paddingCharacter) {
	            return (length * 8 + 5) / 6 | 0;
	        }
	        return (length + 2) / 3 * 4 | 0;
	    };
	    Coder.prototype.encode = function (data) {
	        var out = "";
	        var i = 0;
	        for (; i < data.length - 2; i += 3) {
	            var c = (data[i] << 16) | (data[i + 1] << 8) | (data[i + 2]);
	            out += this._encodeByte((c >>> 3 * 6) & 63);
	            out += this._encodeByte((c >>> 2 * 6) & 63);
	            out += this._encodeByte((c >>> 1 * 6) & 63);
	            out += this._encodeByte((c >>> 0 * 6) & 63);
	        }
	        var left = data.length - i;
	        if (left > 0) {
	            var c = (data[i] << 16) | (left === 2 ? data[i + 1] << 8 : 0);
	            out += this._encodeByte((c >>> 3 * 6) & 63);
	            out += this._encodeByte((c >>> 2 * 6) & 63);
	            if (left === 2) {
	                out += this._encodeByte((c >>> 1 * 6) & 63);
	            }
	            else {
	                out += this._paddingCharacter || "";
	            }
	            out += this._paddingCharacter || "";
	        }
	        return out;
	    };
	    Coder.prototype.maxDecodedLength = function (length) {
	        if (!this._paddingCharacter) {
	            return (length * 6 + 7) / 8 | 0;
	        }
	        return length / 4 * 3 | 0;
	    };
	    Coder.prototype.decodedLength = function (s) {
	        return this.maxDecodedLength(s.length - this._getPaddingLength(s));
	    };
	    Coder.prototype.decode = function (s) {
	        if (s.length === 0) {
	            return new Uint8Array(0);
	        }
	        var paddingLength = this._getPaddingLength(s);
	        var length = s.length - paddingLength;
	        var out = new Uint8Array(this.maxDecodedLength(length));
	        var op = 0;
	        var i = 0;
	        var haveBad = 0;
	        var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
	        for (; i < length - 4; i += 4) {
	            v0 = this._decodeChar(s.charCodeAt(i + 0));
	            v1 = this._decodeChar(s.charCodeAt(i + 1));
	            v2 = this._decodeChar(s.charCodeAt(i + 2));
	            v3 = this._decodeChar(s.charCodeAt(i + 3));
	            out[op++] = (v0 << 2) | (v1 >>> 4);
	            out[op++] = (v1 << 4) | (v2 >>> 2);
	            out[op++] = (v2 << 6) | v3;
	            haveBad |= v0 & INVALID_BYTE;
	            haveBad |= v1 & INVALID_BYTE;
	            haveBad |= v2 & INVALID_BYTE;
	            haveBad |= v3 & INVALID_BYTE;
	        }
	        if (i < length - 1) {
	            v0 = this._decodeChar(s.charCodeAt(i));
	            v1 = this._decodeChar(s.charCodeAt(i + 1));
	            out[op++] = (v0 << 2) | (v1 >>> 4);
	            haveBad |= v0 & INVALID_BYTE;
	            haveBad |= v1 & INVALID_BYTE;
	        }
	        if (i < length - 2) {
	            v2 = this._decodeChar(s.charCodeAt(i + 2));
	            out[op++] = (v1 << 4) | (v2 >>> 2);
	            haveBad |= v2 & INVALID_BYTE;
	        }
	        if (i < length - 3) {
	            v3 = this._decodeChar(s.charCodeAt(i + 3));
	            out[op++] = (v2 << 6) | v3;
	            haveBad |= v3 & INVALID_BYTE;
	        }
	        if (haveBad !== 0) {
	            throw new Error("Base64Coder: incorrect characters for decoding");
	        }
	        return out;
	    };
	    // Standard encoding have the following encoded/decoded ranges,
	    // which we need to convert between.
	    //
	    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
	    // Index:   0 - 25                    26 - 51              52 - 61   62  63
	    // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
	    //
	    // Encode 6 bits in b into a new character.
	    Coder.prototype._encodeByte = function (b) {
	        // Encoding uses constant time operations as follows:
	        //
	        // 1. Define comparison of A with B using (A - B) >>> 8:
	        //          if A > B, then result is positive integer
	        //          if A <= B, then result is 0
	        //
	        // 2. Define selection of C or 0 using bitwise AND: X & C:
	        //          if X == 0, then result is 0
	        //          if X != 0, then result is C
	        //
	        // 3. Start with the smallest comparison (b >= 0), which is always
	        //    true, so set the result to the starting ASCII value (65).
	        //
	        // 4. Continue comparing b to higher ASCII values, and selecting
	        //    zero if comparison isn't true, otherwise selecting a value
	        //    to add to result, which:
	        //
	        //          a) undoes the previous addition
	        //          b) provides new value to add
	        //
	        var result = b;
	        // b >= 0
	        result += 65;
	        // b > 25
	        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
	        // b > 51
	        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
	        // b > 61
	        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 43);
	        // b > 62
	        result += ((62 - b) >>> 8) & ((62 - 43) - 63 + 47);
	        return String.fromCharCode(result);
	    };
	    // Decode a character code into a byte.
	    // Must return 256 if character is out of alphabet range.
	    Coder.prototype._decodeChar = function (c) {
	        // Decoding works similar to encoding: using the same comparison
	        // function, but now it works on ranges: result is always incremented
	        // by value, but this value becomes zero if the range is not
	        // satisfied.
	        //
	        // Decoding starts with invalid value, 256, which is then
	        // subtracted when the range is satisfied. If none of the ranges
	        // apply, the function returns 256, which is then checked by
	        // the caller to throw error.
	        var result = INVALID_BYTE; // start with invalid character
	        // c == 43 (c > 42 and c < 44)
	        result += (((42 - c) & (c - 44)) >>> 8) & (-INVALID_BYTE + c - 43 + 62);
	        // c == 47 (c > 46 and c < 48)
	        result += (((46 - c) & (c - 48)) >>> 8) & (-INVALID_BYTE + c - 47 + 63);
	        // c > 47 and c < 58
	        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
	        // c > 64 and c < 91
	        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
	        // c > 96 and c < 123
	        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
	        return result;
	    };
	    Coder.prototype._getPaddingLength = function (s) {
	        var paddingLength = 0;
	        if (this._paddingCharacter) {
	            for (var i = s.length - 1; i >= 0; i--) {
	                if (s[i] !== this._paddingCharacter) {
	                    break;
	                }
	                paddingLength++;
	            }
	            if (s.length < 4 || paddingLength > 2) {
	                throw new Error("Base64Coder: incorrect padding");
	            }
	        }
	        return paddingLength;
	    };
	    return Coder;
	}());
	base64.Coder = Coder;
	var stdCoder = new Coder();
	function encode(data) {
	    return stdCoder.encode(data);
	}
	base64.encode = encode;
	function decode(s) {
	    return stdCoder.decode(s);
	}
	base64.decode = decode;
	/**
	 * Implements URL-safe Base64 encoding.
	 * (Same as Base64, but '+' is replaced with '-', and '/' with '_').
	 *
	 * Operates in constant time.
	 */
	var URLSafeCoder = /** @class */ (function (_super) {
	    __extends(URLSafeCoder, _super);
	    function URLSafeCoder() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    // URL-safe encoding have the following encoded/decoded ranges:
	    //
	    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -   _
	    // Index:   0 - 25                    26 - 51              52 - 61   62  63
	    // ASCII:  65 - 90                    97 - 122             48 - 57   45  95
	    //
	    URLSafeCoder.prototype._encodeByte = function (b) {
	        var result = b;
	        // b >= 0
	        result += 65;
	        // b > 25
	        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
	        // b > 51
	        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
	        // b > 61
	        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 45);
	        // b > 62
	        result += ((62 - b) >>> 8) & ((62 - 45) - 63 + 95);
	        return String.fromCharCode(result);
	    };
	    URLSafeCoder.prototype._decodeChar = function (c) {
	        var result = INVALID_BYTE;
	        // c == 45 (c > 44 and c < 46)
	        result += (((44 - c) & (c - 46)) >>> 8) & (-INVALID_BYTE + c - 45 + 62);
	        // c == 95 (c > 94 and c < 96)
	        result += (((94 - c) & (c - 96)) >>> 8) & (-INVALID_BYTE + c - 95 + 63);
	        // c > 47 and c < 58
	        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
	        // c > 64 and c < 91
	        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
	        // c > 96 and c < 123
	        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
	        return result;
	    };
	    return URLSafeCoder;
	}(Coder));
	base64.URLSafeCoder = URLSafeCoder;
	var urlSafeCoder = new URLSafeCoder();
	function encodeURLSafe(data) {
	    return urlSafeCoder.encode(data);
	}
	base64.encodeURLSafe = encodeURLSafe;
	function decodeURLSafe(s) {
	    return urlSafeCoder.decode(s);
	}
	base64.decodeURLSafe = decodeURLSafe;
	base64.encodedLength = function (length) {
	    return stdCoder.encodedLength(length);
	};
	base64.maxDecodedLength = function (length) {
	    return stdCoder.maxDecodedLength(length);
	};
	base64.decodedLength = function (s) {
	    return stdCoder.decodedLength(s);
	};
	
	return base64;
}

var sha256$1 = {exports: {}};

var sha256 = sha256$1.exports;

var hasRequiredSha256;

function requireSha256 () {
	if (hasRequiredSha256) return sha256$1.exports;
	hasRequiredSha256 = 1;
	(function (module) {
		(function (root, factory) {
		    // Hack to make all exports of this module sha256 function object properties.
		    var exports$1 = {};
		    factory(exports$1);
		    var sha256 = exports$1["default"];
		    for (var k in exports$1) {
		        sha256[k] = exports$1[k];
		    }
		        
		    {
		        module.exports = sha256;
		    }
		})(sha256, function(exports$1) {
		exports$1.__esModule = true;
		// SHA-256 (+ HMAC and PBKDF2) for JavaScript.
		//
		// Written in 2014-2016 by Dmitry Chestnykh.
		// Public domain, no warranty.
		//
		// Functions (accept and return Uint8Arrays):
		//
		//   sha256(message) -> hash
		//   sha256.hmac(key, message) -> mac
		//   sha256.pbkdf2(password, salt, rounds, dkLen) -> dk
		//
		//  Classes:
		//
		//   new sha256.Hash()
		//   new sha256.HMAC(key)
		//
		exports$1.digestLength = 32;
		exports$1.blockSize = 64;
		// SHA-256 constants
		var K = new Uint32Array([
		    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
		    0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
		    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
		    0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
		    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
		    0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
		    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
		    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
		    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
		    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
		    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
		    0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
		    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
		]);
		function hashBlocks(w, v, p, pos, len) {
		    var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
		    while (len >= 64) {
		        a = v[0];
		        b = v[1];
		        c = v[2];
		        d = v[3];
		        e = v[4];
		        f = v[5];
		        g = v[6];
		        h = v[7];
		        for (i = 0; i < 16; i++) {
		            j = pos + i * 4;
		            w[i] = (((p[j] & 0xff) << 24) | ((p[j + 1] & 0xff) << 16) |
		                ((p[j + 2] & 0xff) << 8) | (p[j + 3] & 0xff));
		        }
		        for (i = 16; i < 64; i++) {
		            u = w[i - 2];
		            t1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10);
		            u = w[i - 15];
		            t2 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3);
		            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
		        }
		        for (i = 0; i < 64; i++) {
		            t1 = (((((e >>> 6 | e << (32 - 6)) ^ (e >>> 11 | e << (32 - 11)) ^
		                (e >>> 25 | e << (32 - 25))) + ((e & f) ^ (~e & g))) | 0) +
		                ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;
		            t2 = (((a >>> 2 | a << (32 - 2)) ^ (a >>> 13 | a << (32 - 13)) ^
		                (a >>> 22 | a << (32 - 22))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
		            h = g;
		            g = f;
		            f = e;
		            e = (d + t1) | 0;
		            d = c;
		            c = b;
		            b = a;
		            a = (t1 + t2) | 0;
		        }
		        v[0] += a;
		        v[1] += b;
		        v[2] += c;
		        v[3] += d;
		        v[4] += e;
		        v[5] += f;
		        v[6] += g;
		        v[7] += h;
		        pos += 64;
		        len -= 64;
		    }
		    return pos;
		}
		// Hash implements SHA256 hash algorithm.
		var Hash = /** @class */ (function () {
		    function Hash() {
		        this.digestLength = exports$1.digestLength;
		        this.blockSize = exports$1.blockSize;
		        // Note: Int32Array is used instead of Uint32Array for performance reasons.
		        this.state = new Int32Array(8); // hash state
		        this.temp = new Int32Array(64); // temporary state
		        this.buffer = new Uint8Array(128); // buffer for data to hash
		        this.bufferLength = 0; // number of bytes in buffer
		        this.bytesHashed = 0; // number of total bytes hashed
		        this.finished = false; // indicates whether the hash was finalized
		        this.reset();
		    }
		    // Resets hash state making it possible
		    // to re-use this instance to hash other data.
		    Hash.prototype.reset = function () {
		        this.state[0] = 0x6a09e667;
		        this.state[1] = 0xbb67ae85;
		        this.state[2] = 0x3c6ef372;
		        this.state[3] = 0xa54ff53a;
		        this.state[4] = 0x510e527f;
		        this.state[5] = 0x9b05688c;
		        this.state[6] = 0x1f83d9ab;
		        this.state[7] = 0x5be0cd19;
		        this.bufferLength = 0;
		        this.bytesHashed = 0;
		        this.finished = false;
		        return this;
		    };
		    // Cleans internal buffers and re-initializes hash state.
		    Hash.prototype.clean = function () {
		        for (var i = 0; i < this.buffer.length; i++) {
		            this.buffer[i] = 0;
		        }
		        for (var i = 0; i < this.temp.length; i++) {
		            this.temp[i] = 0;
		        }
		        this.reset();
		    };
		    // Updates hash state with the given data.
		    //
		    // Optionally, length of the data can be specified to hash
		    // fewer bytes than data.length.
		    //
		    // Throws error when trying to update already finalized hash:
		    // instance must be reset to use it again.
		    Hash.prototype.update = function (data, dataLength) {
		        if (dataLength === void 0) { dataLength = data.length; }
		        if (this.finished) {
		            throw new Error("SHA256: can't update because hash was finished.");
		        }
		        var dataPos = 0;
		        this.bytesHashed += dataLength;
		        if (this.bufferLength > 0) {
		            while (this.bufferLength < 64 && dataLength > 0) {
		                this.buffer[this.bufferLength++] = data[dataPos++];
		                dataLength--;
		            }
		            if (this.bufferLength === 64) {
		                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
		                this.bufferLength = 0;
		            }
		        }
		        if (dataLength >= 64) {
		            dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
		            dataLength %= 64;
		        }
		        while (dataLength > 0) {
		            this.buffer[this.bufferLength++] = data[dataPos++];
		            dataLength--;
		        }
		        return this;
		    };
		    // Finalizes hash state and puts hash into out.
		    //
		    // If hash was already finalized, puts the same value.
		    Hash.prototype.finish = function (out) {
		        if (!this.finished) {
		            var bytesHashed = this.bytesHashed;
		            var left = this.bufferLength;
		            var bitLenHi = (bytesHashed / 0x20000000) | 0;
		            var bitLenLo = bytesHashed << 3;
		            var padLength = (bytesHashed % 64 < 56) ? 64 : 128;
		            this.buffer[left] = 0x80;
		            for (var i = left + 1; i < padLength - 8; i++) {
		                this.buffer[i] = 0;
		            }
		            this.buffer[padLength - 8] = (bitLenHi >>> 24) & 0xff;
		            this.buffer[padLength - 7] = (bitLenHi >>> 16) & 0xff;
		            this.buffer[padLength - 6] = (bitLenHi >>> 8) & 0xff;
		            this.buffer[padLength - 5] = (bitLenHi >>> 0) & 0xff;
		            this.buffer[padLength - 4] = (bitLenLo >>> 24) & 0xff;
		            this.buffer[padLength - 3] = (bitLenLo >>> 16) & 0xff;
		            this.buffer[padLength - 2] = (bitLenLo >>> 8) & 0xff;
		            this.buffer[padLength - 1] = (bitLenLo >>> 0) & 0xff;
		            hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
		            this.finished = true;
		        }
		        for (var i = 0; i < 8; i++) {
		            out[i * 4 + 0] = (this.state[i] >>> 24) & 0xff;
		            out[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;
		            out[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;
		            out[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;
		        }
		        return this;
		    };
		    // Returns the final hash digest.
		    Hash.prototype.digest = function () {
		        var out = new Uint8Array(this.digestLength);
		        this.finish(out);
		        return out;
		    };
		    // Internal function for use in HMAC for optimization.
		    Hash.prototype._saveState = function (out) {
		        for (var i = 0; i < this.state.length; i++) {
		            out[i] = this.state[i];
		        }
		    };
		    // Internal function for use in HMAC for optimization.
		    Hash.prototype._restoreState = function (from, bytesHashed) {
		        for (var i = 0; i < this.state.length; i++) {
		            this.state[i] = from[i];
		        }
		        this.bytesHashed = bytesHashed;
		        this.finished = false;
		        this.bufferLength = 0;
		    };
		    return Hash;
		}());
		exports$1.Hash = Hash;
		// HMAC implements HMAC-SHA256 message authentication algorithm.
		var HMAC = /** @class */ (function () {
		    function HMAC(key) {
		        this.inner = new Hash();
		        this.outer = new Hash();
		        this.blockSize = this.inner.blockSize;
		        this.digestLength = this.inner.digestLength;
		        var pad = new Uint8Array(this.blockSize);
		        if (key.length > this.blockSize) {
		            (new Hash()).update(key).finish(pad).clean();
		        }
		        else {
		            for (var i = 0; i < key.length; i++) {
		                pad[i] = key[i];
		            }
		        }
		        for (var i = 0; i < pad.length; i++) {
		            pad[i] ^= 0x36;
		        }
		        this.inner.update(pad);
		        for (var i = 0; i < pad.length; i++) {
		            pad[i] ^= 0x36 ^ 0x5c;
		        }
		        this.outer.update(pad);
		        this.istate = new Uint32Array(8);
		        this.ostate = new Uint32Array(8);
		        this.inner._saveState(this.istate);
		        this.outer._saveState(this.ostate);
		        for (var i = 0; i < pad.length; i++) {
		            pad[i] = 0;
		        }
		    }
		    // Returns HMAC state to the state initialized with key
		    // to make it possible to run HMAC over the other data with the same
		    // key without creating a new instance.
		    HMAC.prototype.reset = function () {
		        this.inner._restoreState(this.istate, this.inner.blockSize);
		        this.outer._restoreState(this.ostate, this.outer.blockSize);
		        return this;
		    };
		    // Cleans HMAC state.
		    HMAC.prototype.clean = function () {
		        for (var i = 0; i < this.istate.length; i++) {
		            this.ostate[i] = this.istate[i] = 0;
		        }
		        this.inner.clean();
		        this.outer.clean();
		    };
		    // Updates state with provided data.
		    HMAC.prototype.update = function (data) {
		        this.inner.update(data);
		        return this;
		    };
		    // Finalizes HMAC and puts the result in out.
		    HMAC.prototype.finish = function (out) {
		        if (this.outer.finished) {
		            this.outer.finish(out);
		        }
		        else {
		            this.inner.finish(out);
		            this.outer.update(out, this.digestLength).finish(out);
		        }
		        return this;
		    };
		    // Returns message authentication code.
		    HMAC.prototype.digest = function () {
		        var out = new Uint8Array(this.digestLength);
		        this.finish(out);
		        return out;
		    };
		    return HMAC;
		}());
		exports$1.HMAC = HMAC;
		// Returns SHA256 hash of data.
		function hash(data) {
		    var h = (new Hash()).update(data);
		    var digest = h.digest();
		    h.clean();
		    return digest;
		}
		exports$1.hash = hash;
		// Function hash is both available as module.hash and as default export.
		exports$1["default"] = hash;
		// Returns HMAC-SHA256 of data under the key.
		function hmac(key, data) {
		    var h = (new HMAC(key)).update(data);
		    var digest = h.digest();
		    h.clean();
		    return digest;
		}
		exports$1.hmac = hmac;
		// Fills hkdf buffer like this:
		// T(1) = HMAC-Hash(PRK, T(0) | info | 0x01)
		function fillBuffer(buffer, hmac, info, counter) {
		    // Counter is a byte value: check if it overflowed.
		    var num = counter[0];
		    if (num === 0) {
		        throw new Error("hkdf: cannot expand more");
		    }
		    // Prepare HMAC instance for new data with old key.
		    hmac.reset();
		    // Hash in previous output if it was generated
		    // (i.e. counter is greater than 1).
		    if (num > 1) {
		        hmac.update(buffer);
		    }
		    // Hash in info if it exists.
		    if (info) {
		        hmac.update(info);
		    }
		    // Hash in the counter.
		    hmac.update(counter);
		    // Output result to buffer and clean HMAC instance.
		    hmac.finish(buffer);
		    // Increment counter inside typed array, this works properly.
		    counter[0]++;
		}
		var hkdfSalt = new Uint8Array(exports$1.digestLength); // Filled with zeroes.
		function hkdf(key, salt, info, length) {
		    if (salt === void 0) { salt = hkdfSalt; }
		    if (length === void 0) { length = 32; }
		    var counter = new Uint8Array([1]);
		    // HKDF-Extract uses salt as HMAC key, and key as data.
		    var okm = hmac(salt, key);
		    // Initialize HMAC for expanding with extracted key.
		    // Ensure no collisions with `hmac` function.
		    var hmac_ = new HMAC(okm);
		    // Allocate buffer.
		    var buffer = new Uint8Array(hmac_.digestLength);
		    var bufpos = buffer.length;
		    var out = new Uint8Array(length);
		    for (var i = 0; i < length; i++) {
		        if (bufpos === buffer.length) {
		            fillBuffer(buffer, hmac_, info, counter);
		            bufpos = 0;
		        }
		        out[i] = buffer[bufpos++];
		    }
		    hmac_.clean();
		    buffer.fill(0);
		    counter.fill(0);
		    return out;
		}
		exports$1.hkdf = hkdf;
		// Derives a key from password and salt using PBKDF2-HMAC-SHA256
		// with the given number of iterations.
		//
		// The number of bytes returned is equal to dkLen.
		//
		// (For better security, avoid dkLen greater than hash length - 32 bytes).
		function pbkdf2(password, salt, iterations, dkLen) {
		    var prf = new HMAC(password);
		    var len = prf.digestLength;
		    var ctr = new Uint8Array(4);
		    var t = new Uint8Array(len);
		    var u = new Uint8Array(len);
		    var dk = new Uint8Array(dkLen);
		    for (var i = 0; i * len < dkLen; i++) {
		        var c = i + 1;
		        ctr[0] = (c >>> 24) & 0xff;
		        ctr[1] = (c >>> 16) & 0xff;
		        ctr[2] = (c >>> 8) & 0xff;
		        ctr[3] = (c >>> 0) & 0xff;
		        prf.reset();
		        prf.update(salt);
		        prf.update(ctr);
		        prf.finish(u);
		        for (var j = 0; j < len; j++) {
		            t[j] = u[j];
		        }
		        for (var j = 2; j <= iterations; j++) {
		            prf.reset();
		            prf.update(u).finish(u);
		            for (var k = 0; k < len; k++) {
		                t[k] ^= u[k];
		            }
		        }
		        for (var j = 0; j < len && i * len + j < dkLen; j++) {
		            dk[i * len + j] = t[j];
		        }
		    }
		    for (var i = 0; i < len; i++) {
		        t[i] = u[i] = 0;
		    }
		    for (var i = 0; i < 4; i++) {
		        ctr[i] = 0;
		    }
		    prf.clean();
		    return dk;
		}
		exports$1.pbkdf2 = pbkdf2;
		}); 
	} (sha256$1));
	return sha256$1.exports;
}

var hasRequiredWebhook;

function requireWebhook () {
	if (hasRequiredWebhook) return webhook;
	hasRequiredWebhook = 1;
	Object.defineProperty(webhook, "__esModule", { value: true });
	webhook.Webhook = webhook.WebhookVerificationError = void 0;
	const timing_safe_equal_1 = requireTiming_safe_equal();
	const base64 = requireBase64();
	const sha256 = requireSha256();
	const WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
	class ExtendableError extends Error {
	    constructor(message) {
	        super(message);
	        Object.setPrototypeOf(this, ExtendableError.prototype);
	        this.name = "ExtendableError";
	        this.stack = new Error(message).stack;
	    }
	}
	class WebhookVerificationError extends ExtendableError {
	    constructor(message) {
	        super(message);
	        Object.setPrototypeOf(this, WebhookVerificationError.prototype);
	        this.name = "WebhookVerificationError";
	    }
	}
	webhook.WebhookVerificationError = WebhookVerificationError;
	class Webhook {
	    constructor(secret, options) {
	        if (!secret) {
	            throw new Error("Secret can't be empty.");
	        }
	        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
	            if (secret instanceof Uint8Array) {
	                this.key = secret;
	            }
	            else {
	                this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
	            }
	        }
	        else {
	            if (typeof secret !== "string") {
	                throw new Error("Expected secret to be of type string");
	            }
	            if (secret.startsWith(Webhook.prefix)) {
	                secret = secret.substring(Webhook.prefix.length);
	            }
	            this.key = base64.decode(secret);
	        }
	    }
	    verify(payload, headers_) {
	        const headers = {};
	        for (const key of Object.keys(headers_)) {
	            headers[key.toLowerCase()] = headers_[key];
	        }
	        let msgId = headers["svix-id"];
	        let msgSignature = headers["svix-signature"];
	        let msgTimestamp = headers["svix-timestamp"];
	        if (!msgSignature || !msgId || !msgTimestamp) {
	            msgId = headers["webhook-id"];
	            msgSignature = headers["webhook-signature"];
	            msgTimestamp = headers["webhook-timestamp"];
	            if (!msgSignature || !msgId || !msgTimestamp) {
	                throw new WebhookVerificationError("Missing required headers");
	            }
	        }
	        const timestamp = this.verifyTimestamp(msgTimestamp);
	        const computedSignature = this.sign(msgId, timestamp, payload);
	        const expectedSignature = computedSignature.split(",")[1];
	        const passedSignatures = msgSignature.split(" ");
	        const encoder = new globalThis.TextEncoder();
	        for (const versionedSignature of passedSignatures) {
	            const [version, signature] = versionedSignature.split(",");
	            if (version !== "v1") {
	                continue;
	            }
	            if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
	                return JSON.parse(payload.toString());
	            }
	        }
	        throw new WebhookVerificationError("No matching signature found");
	    }
	    sign(msgId, timestamp, payload) {
	        if (typeof payload === "string") ;
	        else if (payload.constructor.name === "Buffer") {
	            payload = payload.toString();
	        }
	        else {
	            throw new Error("Expected payload to be of type string or Buffer. Please refer to https://docs.svix.com/receiving/verifying-payloads/how for more information.");
	        }
	        const encoder = new TextEncoder();
	        const timestampNumber = Math.floor(timestamp.getTime() / 1000);
	        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
	        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
	        return `v1,${expectedSignature}`;
	    }
	    verifyTimestamp(timestampHeader) {
	        const now = Math.floor(Date.now() / 1000);
	        const timestamp = parseInt(timestampHeader, 10);
	        if (isNaN(timestamp)) {
	            throw new WebhookVerificationError("Invalid Signature Headers");
	        }
	        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
	            throw new WebhookVerificationError("Message timestamp too old");
	        }
	        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
	            throw new WebhookVerificationError("Message timestamp too new");
	        }
	        return new Date(timestamp * 1000);
	    }
	}
	webhook.Webhook = Webhook;
	Webhook.prefix = "whsec_";
	
	return webhook;
}

var models = {};

var endpointDisabledTrigger = {};

var hasRequiredEndpointDisabledTrigger;

function requireEndpointDisabledTrigger () {
	if (hasRequiredEndpointDisabledTrigger) return endpointDisabledTrigger;
	hasRequiredEndpointDisabledTrigger = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.EndpointDisabledTriggerSerializer = exports$1.EndpointDisabledTrigger = void 0;
		(function (EndpointDisabledTrigger) {
		    EndpointDisabledTrigger["Manual"] = "manual";
		    EndpointDisabledTrigger["Automatic"] = "automatic";
		})(exports$1.EndpointDisabledTrigger || (exports$1.EndpointDisabledTrigger = {}));
		exports$1.EndpointDisabledTriggerSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (endpointDisabledTrigger));
	return endpointDisabledTrigger;
}

var ordering = {};

var hasRequiredOrdering;

function requireOrdering () {
	if (hasRequiredOrdering) return ordering;
	hasRequiredOrdering = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.OrderingSerializer = exports$1.Ordering = void 0;
		(function (Ordering) {
		    Ordering["Ascending"] = "ascending";
		    Ordering["Descending"] = "descending";
		})(exports$1.Ordering || (exports$1.Ordering = {}));
		exports$1.OrderingSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (ordering));
	return ordering;
}

var statusCodeClass = {};

var hasRequiredStatusCodeClass;

function requireStatusCodeClass () {
	if (hasRequiredStatusCodeClass) return statusCodeClass;
	hasRequiredStatusCodeClass = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.StatusCodeClassSerializer = exports$1.StatusCodeClass = void 0;
		(function (StatusCodeClass) {
		    StatusCodeClass[StatusCodeClass["CodeNone"] = 0] = "CodeNone";
		    StatusCodeClass[StatusCodeClass["Code1xx"] = 100] = "Code1xx";
		    StatusCodeClass[StatusCodeClass["Code2xx"] = 200] = "Code2xx";
		    StatusCodeClass[StatusCodeClass["Code3xx"] = 300] = "Code3xx";
		    StatusCodeClass[StatusCodeClass["Code4xx"] = 400] = "Code4xx";
		    StatusCodeClass[StatusCodeClass["Code5xx"] = 500] = "Code5xx";
		})(exports$1.StatusCodeClass || (exports$1.StatusCodeClass = {}));
		exports$1.StatusCodeClassSerializer = {
		    _fromJsonObject(object) {
		        return object;
		    },
		    _toJsonObject(self) {
		        return self;
		    },
		};
		
	} (statusCodeClass));
	return statusCodeClass;
}

var hasRequiredModels;

function requireModels () {
	if (hasRequiredModels) return models;
	hasRequiredModels = 1;
	(function (exports$1) {
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.StatusCodeClass = exports$1.Ordering = exports$1.MessageStatusText = exports$1.MessageStatus = exports$1.MessageAttemptTriggerType = exports$1.EndpointDisabledTrigger = exports$1.ConnectorKind = exports$1.BackgroundTaskType = exports$1.BackgroundTaskStatus = exports$1.AppPortalCapability = void 0;
		var appPortalCapability_1 = requireAppPortalCapability();
		Object.defineProperty(exports$1, "AppPortalCapability", { enumerable: true, get: function () { return appPortalCapability_1.AppPortalCapability; } });
		var backgroundTaskStatus_1 = requireBackgroundTaskStatus();
		Object.defineProperty(exports$1, "BackgroundTaskStatus", { enumerable: true, get: function () { return backgroundTaskStatus_1.BackgroundTaskStatus; } });
		var backgroundTaskType_1 = requireBackgroundTaskType();
		Object.defineProperty(exports$1, "BackgroundTaskType", { enumerable: true, get: function () { return backgroundTaskType_1.BackgroundTaskType; } });
		var connectorKind_1 = requireConnectorKind();
		Object.defineProperty(exports$1, "ConnectorKind", { enumerable: true, get: function () { return connectorKind_1.ConnectorKind; } });
		var endpointDisabledTrigger_1 = requireEndpointDisabledTrigger();
		Object.defineProperty(exports$1, "EndpointDisabledTrigger", { enumerable: true, get: function () { return endpointDisabledTrigger_1.EndpointDisabledTrigger; } });
		var messageAttemptTriggerType_1 = requireMessageAttemptTriggerType();
		Object.defineProperty(exports$1, "MessageAttemptTriggerType", { enumerable: true, get: function () { return messageAttemptTriggerType_1.MessageAttemptTriggerType; } });
		var messageStatus_1 = requireMessageStatus();
		Object.defineProperty(exports$1, "MessageStatus", { enumerable: true, get: function () { return messageStatus_1.MessageStatus; } });
		var messageStatusText_1 = requireMessageStatusText();
		Object.defineProperty(exports$1, "MessageStatusText", { enumerable: true, get: function () { return messageStatusText_1.MessageStatusText; } });
		var ordering_1 = requireOrdering();
		Object.defineProperty(exports$1, "Ordering", { enumerable: true, get: function () { return ordering_1.Ordering; } });
		var statusCodeClass_1 = requireStatusCodeClass();
		Object.defineProperty(exports$1, "StatusCodeClass", { enumerable: true, get: function () { return statusCodeClass_1.StatusCodeClass; } });
		
	} (models));
	return models;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports$1) {
		var __createBinding = (dist && dist.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (dist && dist.__exportStar) || function(m, exports$1) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
		};
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.Svix = exports$1.messageInRaw = exports$1.ValidationError = exports$1.HttpErrorOut = exports$1.HTTPValidationError = exports$1.ApiException = void 0;
		const application_1 = requireApplication();
		const authentication_1 = requireAuthentication();
		const backgroundTask_1 = requireBackgroundTask();
		const endpoint_1 = requireEndpoint();
		const environment_1 = requireEnvironment();
		const eventType_1 = requireEventType();
		const health_1 = requireHealth();
		const ingest_1 = requireIngest();
		const integration_1 = requireIntegration();
		const message_1 = requireMessage();
		const messageAttempt_1 = requireMessageAttempt();
		const operationalWebhook_1 = requireOperationalWebhook();
		const statistics_1 = requireStatistics();
		const operationalWebhookEndpoint_1 = requireOperationalWebhookEndpoint();
		var util_1 = requireUtil();
		Object.defineProperty(exports$1, "ApiException", { enumerable: true, get: function () { return util_1.ApiException; } });
		var HttpErrors_1 = requireHttpErrors();
		Object.defineProperty(exports$1, "HTTPValidationError", { enumerable: true, get: function () { return HttpErrors_1.HTTPValidationError; } });
		Object.defineProperty(exports$1, "HttpErrorOut", { enumerable: true, get: function () { return HttpErrors_1.HttpErrorOut; } });
		Object.defineProperty(exports$1, "ValidationError", { enumerable: true, get: function () { return HttpErrors_1.ValidationError; } });
		__exportStar(requireWebhook(), exports$1);
		__exportStar(requireModels(), exports$1);
		var message_2 = requireMessage();
		Object.defineProperty(exports$1, "messageInRaw", { enumerable: true, get: function () { return message_2.messageInRaw; } });
		const REGIONS = [
		    { region: "us", url: "https://api.us.svix.com" },
		    { region: "eu", url: "https://api.eu.svix.com" },
		    { region: "in", url: "https://api.in.svix.com" },
		    { region: "ca", url: "https://api.ca.svix.com" },
		    { region: "au", url: "https://api.au.svix.com" },
		];
		class Svix {
		    constructor(token, options = {}) {
		        var _a, _b, _c;
		        const regionalUrl = (_a = REGIONS.find((x) => x.region === token.split(".")[1])) === null || _a === void 0 ? void 0 : _a.url;
		        const baseUrl = (_c = (_b = options.serverUrl) !== null && _b !== void 0 ? _b : regionalUrl) !== null && _c !== void 0 ? _c : "https://api.svix.com";
		        if (options.retryScheduleInMs) {
		            this.requestCtx = {
		                baseUrl,
		                token,
		                timeout: options.requestTimeout,
		                retryScheduleInMs: options.retryScheduleInMs,
		            };
		            return;
		        }
		        if (options.numRetries) {
		            this.requestCtx = {
		                baseUrl,
		                token,
		                timeout: options.requestTimeout,
		                numRetries: options.numRetries,
		            };
		            return;
		        }
		        this.requestCtx = {
		            baseUrl,
		            token,
		            timeout: options.requestTimeout,
		        };
		    }
		    get application() {
		        return new application_1.Application(this.requestCtx);
		    }
		    get authentication() {
		        return new authentication_1.Authentication(this.requestCtx);
		    }
		    get backgroundTask() {
		        return new backgroundTask_1.BackgroundTask(this.requestCtx);
		    }
		    get endpoint() {
		        return new endpoint_1.Endpoint(this.requestCtx);
		    }
		    get environment() {
		        return new environment_1.Environment(this.requestCtx);
		    }
		    get eventType() {
		        return new eventType_1.EventType(this.requestCtx);
		    }
		    get health() {
		        return new health_1.Health(this.requestCtx);
		    }
		    get ingest() {
		        return new ingest_1.Ingest(this.requestCtx);
		    }
		    get integration() {
		        return new integration_1.Integration(this.requestCtx);
		    }
		    get message() {
		        return new message_1.Message(this.requestCtx);
		    }
		    get messageAttempt() {
		        return new messageAttempt_1.MessageAttempt(this.requestCtx);
		    }
		    get operationalWebhook() {
		        return new operationalWebhook_1.OperationalWebhook(this.requestCtx);
		    }
		    get statistics() {
		        return new statistics_1.Statistics(this.requestCtx);
		    }
		    get operationalWebhookEndpoint() {
		        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
		    }
		}
		exports$1.Svix = Svix;
		
	} (dist));
	return dist;
}

var distExports = requireDist();

//#region package.json
var version = "6.6.0";

//#endregion
//#region src/common/utils/build-pagination-query.ts
/**
* Builds a query string from pagination options
* @param options - Pagination options containing limit and either after or before (but not both)
* @returns Query string (without leading '?') or empty string if no options
*/
function buildPaginationQuery(options) {
	const searchParams = new URLSearchParams();
	if (options.limit !== void 0) searchParams.set("limit", options.limit.toString());
	if ("after" in options && options.after !== void 0) searchParams.set("after", options.after);
	if ("before" in options && options.before !== void 0) searchParams.set("before", options.before);
	return searchParams.toString();
}

//#endregion
//#region src/api-keys/api-keys.ts
var ApiKeys = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/api-keys", payload, options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/api-keys?${queryString}` : "/api-keys";
		return await this.resend.get(url);
	}
	async remove(id) {
		return await this.resend.delete(`/api-keys/${id}`);
	}
};

//#endregion
//#region src/common/utils/parse-email-to-api-options.ts
function parseAttachments(attachments) {
	return attachments?.map((attachment) => ({
		content: attachment.content,
		filename: attachment.filename,
		path: attachment.path,
		content_type: attachment.contentType,
		content_id: attachment.contentId
	}));
}
function parseEmailToApiOptions(email) {
	return {
		attachments: parseAttachments(email.attachments),
		bcc: email.bcc,
		cc: email.cc,
		from: email.from,
		headers: email.headers,
		html: email.html,
		reply_to: email.replyTo,
		scheduled_at: email.scheduledAt,
		subject: email.subject,
		tags: email.tags,
		text: email.text,
		to: email.to,
		template: email.template ? {
			id: email.template.id,
			variables: email.template.variables
		} : void 0,
		topic_id: email.topicId
	};
}

//#endregion
//#region src/render.ts
async function render(node) {
	let render$1;
	try {
		({render: render$1} = await import('../../chunks/render_resend_Bs-YE6Qm.mjs'));
	} catch {
		throw new Error("Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.");
	}
	return render$1(node);
}

//#endregion
//#region src/batch/batch.ts
var Batch = class {
	constructor(resend) {
		this.resend = resend;
	}
	async send(payload, options) {
		return this.create(payload, options);
	}
	async create(payload, options) {
		const emails = [];
		for (const email of payload) {
			if (email.react) {
				email.html = await render(email.react);
				email.react = void 0;
			}
			emails.push(parseEmailToApiOptions(email));
		}
		return await this.resend.post("/emails/batch", emails, {
			...options,
			headers: {
				"x-batch-validation": options?.batchValidation ?? "strict",
				...options?.headers
			}
		});
	}
};

//#endregion
//#region src/broadcasts/broadcasts.ts
var Broadcasts = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.post("/broadcasts", {
			name: payload.name,
			segment_id: payload.segmentId,
			audience_id: payload.audienceId,
			preview_text: payload.previewText,
			from: payload.from,
			html: payload.html,
			reply_to: payload.replyTo,
			subject: payload.subject,
			text: payload.text,
			topic_id: payload.topicId
		}, options);
	}
	async send(id, payload) {
		return await this.resend.post(`/broadcasts/${id}/send`, { scheduled_at: payload?.scheduledAt });
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/broadcasts?${queryString}` : "/broadcasts";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/broadcasts/${id}`);
	}
	async remove(id) {
		return await this.resend.delete(`/broadcasts/${id}`);
	}
	async update(id, payload) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.patch(`/broadcasts/${id}`, {
			name: payload.name,
			segment_id: payload.segmentId,
			audience_id: payload.audienceId,
			from: payload.from,
			html: payload.html,
			text: payload.text,
			subject: payload.subject,
			reply_to: payload.replyTo,
			preview_text: payload.previewText,
			topic_id: payload.topicId
		});
	}
};

//#endregion
//#region src/common/utils/parse-contact-properties-to-api-options.ts
function parseContactPropertyFromApi(contactProperty) {
	return {
		id: contactProperty.id,
		key: contactProperty.key,
		createdAt: contactProperty.created_at,
		type: contactProperty.type,
		fallbackValue: contactProperty.fallback_value
	};
}
function parseContactPropertyToApiOptions(contactProperty) {
	if ("key" in contactProperty) return {
		key: contactProperty.key,
		type: contactProperty.type,
		fallback_value: contactProperty.fallbackValue
	};
	return { fallback_value: contactProperty.fallbackValue };
}

//#endregion
//#region src/contact-properties/contact-properties.ts
var ContactProperties = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(options) {
		const apiOptions = parseContactPropertyToApiOptions(options);
		return await this.resend.post("/contact-properties", apiOptions);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contact-properties?${queryString}` : "/contact-properties";
		const response = await this.resend.get(url);
		if (response.data) return {
			data: {
				...response.data,
				data: response.data.data.map((apiContactProperty) => parseContactPropertyFromApi(apiContactProperty))
			},
			headers: response.headers,
			error: null
		};
		return response;
	}
	async get(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const response = await this.resend.get(`/contact-properties/${id}`);
		if (response.data) return {
			data: {
				object: "contact_property",
				...parseContactPropertyFromApi(response.data)
			},
			headers: response.headers,
			error: null
		};
		return response;
	}
	async update(payload) {
		if (!payload.id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const apiOptions = parseContactPropertyToApiOptions(payload);
		return await this.resend.patch(`/contact-properties/${payload.id}`, apiOptions);
	}
	async remove(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.delete(`/contact-properties/${id}`);
	}
};

//#endregion
//#region src/contacts/segments/contact-segments.ts
var ContactSegments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async list(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contacts/${identifier}/segments?${queryString}` : `/contacts/${identifier}/segments`;
		return await this.resend.get(url);
	}
	async add(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		return this.resend.post(`/contacts/${identifier}/segments/${options.segmentId}`);
	}
	async remove(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		return this.resend.delete(`/contacts/${identifier}/segments/${options.segmentId}`);
	}
};

//#endregion
//#region src/contacts/topics/contact-topics.ts
var ContactTopics = class {
	constructor(resend) {
		this.resend = resend;
	}
	async update(payload) {
		if (!payload.id && !payload.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = payload.email ? payload.email : payload.id;
		return this.resend.patch(`/contacts/${identifier}/topics`, payload.topics);
	}
	async list(options) {
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.id;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contacts/${identifier}/topics?${queryString}` : `/contacts/${identifier}/topics`;
		return this.resend.get(url);
	}
};

//#endregion
//#region src/contacts/contacts.ts
var Contacts = class {
	constructor(resend) {
		this.resend = resend;
		this.topics = new ContactTopics(this.resend);
		this.segments = new ContactSegments(this.resend);
	}
	async create(payload, options = {}) {
		if (!payload.audienceId) return await this.resend.post("/contacts", {
			unsubscribed: payload.unsubscribed,
			email: payload.email,
			first_name: payload.firstName,
			last_name: payload.lastName,
			properties: payload.properties
		}, options);
		return await this.resend.post(`/audiences/${payload.audienceId}/contacts`, {
			unsubscribed: payload.unsubscribed,
			email: payload.email,
			first_name: payload.firstName,
			last_name: payload.lastName,
			properties: payload.properties
		}, options);
	}
	async list(options = {}) {
		const segmentId = options.segmentId ?? options.audienceId;
		if (!segmentId) {
			const queryString$1 = buildPaginationQuery(options);
			const url$1 = queryString$1 ? `/contacts?${queryString$1}` : "/contacts";
			return await this.resend.get(url$1);
		}
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/segments/${segmentId}/contacts?${queryString}` : `/segments/${segmentId}/contacts`;
		return await this.resend.get(url);
	}
	async get(options) {
		if (typeof options === "string") return this.resend.get(`/contacts/${options}`);
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!options.audienceId) return this.resend.get(`/contacts/${options?.email ? options?.email : options?.id}`);
		return this.resend.get(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`);
	}
	async update(options) {
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!options.audienceId) return await this.resend.patch(`/contacts/${options?.email ? options?.email : options?.id}`, {
			unsubscribed: options.unsubscribed,
			first_name: options.firstName,
			last_name: options.lastName,
			properties: options.properties
		});
		return await this.resend.patch(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`, {
			unsubscribed: options.unsubscribed,
			first_name: options.firstName,
			last_name: options.lastName,
			properties: options.properties
		});
	}
	async remove(payload) {
		if (typeof payload === "string") return this.resend.delete(`/contacts/${payload}`);
		if (!payload.id && !payload.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!payload.audienceId) return this.resend.delete(`/contacts/${payload?.email ? payload?.email : payload?.id}`);
		return this.resend.delete(`/audiences/${payload.audienceId}/contacts/${payload?.email ? payload?.email : payload?.id}`);
	}
};

//#endregion
//#region src/common/utils/parse-domain-to-api-options.ts
function parseDomainToApiOptions(domain) {
	return {
		name: domain.name,
		region: domain.region,
		custom_return_path: domain.customReturnPath,
		capabilities: domain.capabilities,
		open_tracking: domain.openTracking,
		click_tracking: domain.clickTracking,
		tls: domain.tls
	};
}

//#endregion
//#region src/domains/domains.ts
var Domains = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/domains", parseDomainToApiOptions(payload), options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/domains?${queryString}` : "/domains";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/domains/${id}`);
	}
	async update(payload) {
		return await this.resend.patch(`/domains/${payload.id}`, {
			click_tracking: payload.clickTracking,
			open_tracking: payload.openTracking,
			tls: payload.tls,
			capabilities: payload.capabilities
		});
	}
	async remove(id) {
		return await this.resend.delete(`/domains/${id}`);
	}
	async verify(id) {
		return await this.resend.post(`/domains/${id}/verify`);
	}
};

//#endregion
//#region src/emails/attachments/attachments.ts
var Attachments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async get(options) {
		const { emailId, id } = options;
		return await this.resend.get(`/emails/${emailId}/attachments/${id}`);
	}
	async list(options) {
		const { emailId } = options;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/${emailId}/attachments?${queryString}` : `/emails/${emailId}/attachments`;
		return await this.resend.get(url);
	}
};

//#endregion
//#region src/emails/receiving/attachments/attachments.ts
var Attachments$1 = class {
	constructor(resend) {
		this.resend = resend;
	}
	async get(options) {
		const { emailId, id } = options;
		return await this.resend.get(`/emails/receiving/${emailId}/attachments/${id}`);
	}
	async list(options) {
		const { emailId } = options;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/receiving/${emailId}/attachments?${queryString}` : `/emails/receiving/${emailId}/attachments`;
		return await this.resend.get(url);
	}
};

//#endregion
//#region src/emails/receiving/receiving.ts
var Receiving = class {
	constructor(resend) {
		this.resend = resend;
		this.attachments = new Attachments$1(resend);
	}
	async get(id) {
		return await this.resend.get(`/emails/receiving/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/receiving?${queryString}` : "/emails/receiving";
		return await this.resend.get(url);
	}
};

//#endregion
//#region src/emails/emails.ts
var Emails = class {
	constructor(resend) {
		this.resend = resend;
		this.attachments = new Attachments(resend);
		this.receiving = new Receiving(resend);
	}
	async send(payload, options = {}) {
		return this.create(payload, options);
	}
	async create(payload, options = {}) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.post("/emails", parseEmailToApiOptions(payload), options);
	}
	async get(id) {
		return await this.resend.get(`/emails/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails?${queryString}` : "/emails";
		return await this.resend.get(url);
	}
	async update(payload) {
		return await this.resend.patch(`/emails/${payload.id}`, { scheduled_at: payload.scheduledAt });
	}
	async cancel(id) {
		return await this.resend.post(`/emails/${id}/cancel`);
	}
};

//#endregion
//#region src/segments/segments.ts
var Segments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/segments", payload, options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/segments?${queryString}` : "/segments";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/segments/${id}`);
	}
	async remove(id) {
		return await this.resend.delete(`/segments/${id}`);
	}
};

//#endregion
//#region src/common/utils/get-pagination-query-properties.ts
function getPaginationQueryProperties(options = {}) {
	const query = new URLSearchParams();
	if (options.before) query.set("before", options.before);
	if (options.after) query.set("after", options.after);
	if (options.limit) query.set("limit", options.limit.toString());
	return query.size > 0 ? `?${query.toString()}` : "";
}

//#endregion
//#region src/common/utils/parse-template-to-api-options.ts
function parseVariables(variables) {
	return variables?.map((variable) => ({
		key: variable.key,
		type: variable.type,
		fallback_value: variable.fallbackValue
	}));
}
function parseTemplateToApiOptions(template) {
	return {
		name: "name" in template ? template.name : void 0,
		subject: template.subject,
		html: template.html,
		text: template.text,
		alias: template.alias,
		from: template.from,
		reply_to: template.replyTo,
		variables: parseVariables(template.variables)
	};
}

//#endregion
//#region src/templates/chainable-template-result.ts
var ChainableTemplateResult = class {
	constructor(promise, publishFn) {
		this.promise = promise;
		this.publishFn = publishFn;
	}
	then(onfulfilled, onrejected) {
		return this.promise.then(onfulfilled, onrejected);
	}
	async publish() {
		const { data, error } = await this.promise;
		if (error) return {
			data: null,
			headers: null,
			error
		};
		return this.publishFn(data.id);
	}
};

//#endregion
//#region src/templates/templates.ts
var Templates = class {
	constructor(resend) {
		this.resend = resend;
	}
	create(payload) {
		return new ChainableTemplateResult(this.performCreate(payload), this.publish.bind(this));
	}
	async performCreate(payload) {
		if (payload.react) {
			if (!this.renderAsync) try {
				const { renderAsync } = await import('../../chunks/render_resend_Bs-YE6Qm.mjs');
				this.renderAsync = renderAsync;
			} catch {
				throw new Error("Failed to render React component. Make sure to install `@react-email/render`");
			}
			payload.html = await this.renderAsync(payload.react);
		}
		return this.resend.post("/templates", parseTemplateToApiOptions(payload));
	}
	async remove(identifier) {
		return await this.resend.delete(`/templates/${identifier}`);
	}
	async get(identifier) {
		return await this.resend.get(`/templates/${identifier}`);
	}
	async list(options = {}) {
		return this.resend.get(`/templates${getPaginationQueryProperties(options)}`);
	}
	duplicate(identifier) {
		return new ChainableTemplateResult(this.resend.post(`/templates/${identifier}/duplicate`), this.publish.bind(this));
	}
	async publish(identifier) {
		return await this.resend.post(`/templates/${identifier}/publish`);
	}
	async update(identifier, payload) {
		return await this.resend.patch(`/templates/${identifier}`, parseTemplateToApiOptions(payload));
	}
};

//#endregion
//#region src/topics/topics.ts
var Topics = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload) {
		const { defaultSubscription, ...body } = payload;
		return await this.resend.post("/topics", {
			...body,
			default_subscription: defaultSubscription
		});
	}
	async list() {
		return await this.resend.get("/topics");
	}
	async get(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.get(`/topics/${id}`);
	}
	async update(payload) {
		if (!payload.id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.patch(`/topics/${payload.id}`, payload);
	}
	async remove(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.delete(`/topics/${id}`);
	}
};

//#endregion
//#region src/webhooks/webhooks.ts
var Webhooks = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/webhooks", payload, options);
	}
	async get(id) {
		return await this.resend.get(`/webhooks/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/webhooks?${queryString}` : "/webhooks";
		return await this.resend.get(url);
	}
	async update(id, payload) {
		return await this.resend.patch(`/webhooks/${id}`, payload);
	}
	async remove(id) {
		return await this.resend.delete(`/webhooks/${id}`);
	}
	verify(payload) {
		return new distExports.Webhook(payload.webhookSecret).verify(payload.payload, {
			"svix-id": payload.headers.id,
			"svix-timestamp": payload.headers.timestamp,
			"svix-signature": payload.headers.signature
		});
	}
};

//#endregion
//#region src/resend.ts
const defaultBaseUrl = "https://api.resend.com";
const defaultUserAgent = `resend-node:${version}`;
const baseUrl = typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
const userAgent = typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
var Resend = class {
	constructor(key) {
		this.key = key;
		this.apiKeys = new ApiKeys(this);
		this.segments = new Segments(this);
		this.audiences = this.segments;
		this.batch = new Batch(this);
		this.broadcasts = new Broadcasts(this);
		this.contacts = new Contacts(this);
		this.contactProperties = new ContactProperties(this);
		this.domains = new Domains(this);
		this.emails = new Emails(this);
		this.webhooks = new Webhooks(this);
		this.templates = new Templates(this);
		this.topics = new Topics(this);
		if (!key) {
			if (typeof process !== "undefined" && process.env) this.key = process.env.RESEND_API_KEY;
			if (!this.key) throw new Error("Missing API key. Pass it to the constructor `new Resend(\"re_123\")`");
		}
		this.headers = new Headers({
			Authorization: `Bearer ${this.key}`,
			"User-Agent": userAgent,
			"Content-Type": "application/json"
		});
	}
	async fetchRequest(path, options = {}) {
		try {
			const response = await fetch(`${baseUrl}${path}`, options);
			if (!response.ok) try {
				const rawError = await response.text();
				return {
					data: null,
					error: JSON.parse(rawError),
					headers: Object.fromEntries(response.headers.entries())
				};
			} catch (err) {
				if (err instanceof SyntaxError) return {
					data: null,
					error: {
						name: "application_error",
						statusCode: response.status,
						message: "Internal server error. We are unable to process your request right now, please try again later."
					},
					headers: Object.fromEntries(response.headers.entries())
				};
				const error = {
					message: response.statusText,
					statusCode: response.status,
					name: "application_error"
				};
				if (err instanceof Error) return {
					data: null,
					error: {
						...error,
						message: err.message
					},
					headers: Object.fromEntries(response.headers.entries())
				};
				return {
					data: null,
					error,
					headers: Object.fromEntries(response.headers.entries())
				};
			}
			return {
				data: await response.json(),
				error: null,
				headers: Object.fromEntries(response.headers.entries())
			};
		} catch {
			return {
				data: null,
				error: {
					name: "application_error",
					statusCode: null,
					message: "Unable to fetch data. The request could not be resolved."
				},
				headers: null
			};
		}
	}
	async post(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		if (options.idempotencyKey) headers.set("Idempotency-Key", options.idempotencyKey);
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async get(path, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "GET",
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async put(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async patch(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "PATCH",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async delete(path, query) {
		const requestOptions = {
			method: "DELETE",
			body: JSON.stringify(query),
			headers: this.headers
		};
		return this.fetchRequest(path, requestOptions);
	}
};

const prerender = false;
const POST = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY;
  console.log(`[API/send] Received request. RESEND_API_KEY exists: ${!!apiKey}`);
  if (!apiKey) {
    console.error("[API/send] Error: RESEND_API_KEY is missing from environment variables.");
    return new Response(
      JSON.stringify({
        message: "Configuration Error: RESEND_API_KEY is missing"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  const resend = new Resend(apiKey);
  try {
    const data = await request.json();
    const { name, phone, email, comuna, artefacto, problem, recaptchaToken } = data;
    console.log(`[API/send] Payload received: Name=${name}, Phone=${phone}, Email=${email}`);
    const recaptchaSecret = undefined                                     || process.env.RECAPTCHA_SECRET_KEY;
    console.log(`[API/send] Recaptcha Secret exists: ${!!recaptchaSecret}`);
    if (recaptchaSecret && recaptchaToken) {
      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
      });
      const recaptchaData = await recaptchaResponse.json();
      console.log("[API/send] Recaptcha verification result:", recaptchaData);
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.warn(`[API/send] reCAPTCHA blocked: Score ${recaptchaData.score}`);
        return new Response(
          JSON.stringify({
            message: "Lo sentimos, detectamos tráfico inusual. Intenta más tarde."
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } else if (!recaptchaSecret) {
      console.warn("[API/send] reCAPTCHA skipped: SECRET_KEY missing in environment variables.");
    }
    console.log("[API/send] Sending email to owner...");
    const ownerEmail = await resend.emails.send({
      from: "Lux Max Web <contacto@luxmax.cl>",
      to: ["contacto@luxmax.cl"],
      cc: ["walterreyes1606@gmail.com"],
      subject: `🔥 Nuevo Lead: ${name} (${artefacto})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">Nuevo Cliente Potencial</h1>
          <p>Un usuario ha solicitado visita técnica desde la web.</p>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📞 Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>✉️ Email:</strong> ${email}</p>
            <p><strong>📍 Comuna:</strong> ${comuna}</p>
            <p><strong>🔧 Artefacto:</strong> ${artefacto}</p>
            <p><strong>📝 Problema:</strong> ${problem}</p>
          </div>
          
          <p>Contactar lo antes posible para agendar.</p>
        </div>
      `
    });
    if (ownerEmail.error) {
      console.error("[API/send] Error sending owner email:", ownerEmail.error);
      throw new Error(`Failed to send owner email: ${ownerEmail.error.message}`);
    }
    console.log("[API/send] Owner email sent successfully:", ownerEmail.data);
    console.log("[API/send] Sending confirmation email to client...");
    const clientEmail = await resend.emails.send({
      from: "Lux Max Servicio Técnico <contacto@luxmax.cl>",
      to: [email],
      subject: "✅ Hemos recibido tu solicitud - Lux Max",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <div style="background: #1e3a8a; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">¡Solicitud Recibida!</h1>
          </div>
          <div style="border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #334155;">Hola <strong>${name}</strong>,</p>
            <p style="color: #64748b; font-size: 16px;">Gracias por confiar en Lux Max. Ya tenemos tus datos y la descripción de tu problema con tu <strong>${artefacto}</strong>.</p>
            
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 25px 0; text-align: left;">
              <p style="margin: 0; color: #065f46;"><strong>🕒 Próximo paso:</strong> Un técnico especialista te contactará en los próximos minutos al <strong>${phone}</strong> para coordinar la visita.</p>
            </div>

            <p style="font-size: 14px; color: #94a3b8;">Si es una urgencia, puedes llamarnos directamente.</p>
            
            <a href="tel:+56967140558" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 10px;">Llamar Ahora</a>
          </div>
        </div>
      `
    });
    if (clientEmail.error) {
      console.error("[API/send] Error sending client email:", clientEmail.error);
      console.warn("Client email failed but owner email succeeded.");
    } else {
      console.log("[API/send] Client email sent successfully:", clientEmail.data);
    }
    return new Response(
      JSON.stringify({
        message: "Emails sent successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("[API/send] CRITICAL ERROR:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
        stack: error.stack
        // Optional: remove in production if preferred
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
