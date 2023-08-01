import {MissingHeaderException} from "./exception/missing-header.exception";
import * as path from "path";
import {readFileSync} from "fs";
import crypto from "node:crypto";
import {InvalidSignatureException} from "./exception/invalid-signature.exception";

export class NotificationVerifier {

    private publicKey: string = null;

    async verify(response: Response) : Promise<void | never> {

        if(!this.publicKey) {
            this.publicKey = readFileSync(path.resolve('./key/coinbase.pub')).toString();
        }

        const signatureToBeValidated = response.headers.get('CB-SIGNATURE')

        if (!signatureToBeValidated) {
            throw new MissingHeaderException('CB-SIGNATURE header is missing')
        }

        const jsonBody = await response.json()
        const bodyToBeValidated = JSON.stringify(jsonBody)


        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(bodyToBeValidated);

        if(!verifier.verify(this.publicKey, signatureToBeValidated, 'base64')) {
            throw new InvalidSignatureException('Signature is invalid')
        }


    }

}