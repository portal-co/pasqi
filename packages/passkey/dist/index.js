export function toToSignArrayBuffer(params) {
    return new TextEncoder().encode(JSON.stringify({
        type: params.type,
        challenge: params.challenge.toBase64(),
        origin: params.origin ?? location.origin
    }));
}
