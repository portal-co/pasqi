"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toToSignArrayBuffer = toToSignArrayBuffer;
function toToSignArrayBuffer(params) {
    return new TextEncoder().encode(JSON.stringify({
        type: params.type,
        challenge: params.challenge.toBase64(),
        origin: params.origin ?? location.origin
    }));
}
