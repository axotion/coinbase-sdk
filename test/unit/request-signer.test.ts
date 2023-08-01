import {HttpMethod} from "../../src/shared/http/http-method";
import {signRequest} from "../../src/client/request/signer/request.signer";

it('Should return valid signed request', () => {

    const timestamp = 1690904843;
    const secret = 'AOjWmUrO77a9lGA7qFCoO9Vq8rnC4pdc'
    const method = HttpMethod.GET;
    const path = '/v2/accounts?limit=10&order=asc'
    const validSignature = 'cd26adb2313534e41ce44cc67e862544b2aed65caa2251c143188440786c2b00';

    const signedRequest = signRequest(secret, timestamp, method, path, '')
    expect(signedRequest).toBe(validSignature);

})
