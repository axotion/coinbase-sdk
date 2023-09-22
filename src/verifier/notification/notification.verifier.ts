import { MissingHeaderException } from './exception/missing-header.exception';
import * as path from 'path';
import { readFileSync } from 'fs';
import crypto from 'node:crypto';
import { InvalidSignatureException } from './exception/invalid-signature.exception';

export class NotificationVerifier {
  private publicKey: string = null;

  async verify(jsonBody: string, cbSignatureHeader: string): Promise<void | never> {
    if (!this.publicKey) {
      this.publicKey = readFileSync(
        path.resolve(__dirname + '/coinbase.pub'),
      ).toString();
    }


    if (!cbSignatureHeader || cbSignatureHeader === '') {
      throw new MissingHeaderException('CB-SIGNATURE header is missing');
    }

   
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(jsonBody);

    if (!verifier.verify(this.publicKey, cbSignatureHeader, 'base64')) {
      throw new InvalidSignatureException('Signature is invalid');
    }
  }
}
