import crypto from 'crypto'

import { config } from '../config';

export const algorithm = 'sha256';
export const signatureFormat = 'base64';

type VerifyPayloadType = {
  payload: string;
  signature: string;
}

export const verifyPayload = ({payload, signature}: VerifyPayloadType) => {
  const publicKey = Buffer.from(config.WEBHOOK_PUBLIC_KEY, 'base64').toString('utf-8');
  const verify = crypto.createVerify(algorithm);

  verify.write(Buffer.from(payload));
  verify.end();

  const isValid = verify.verify(publicKey, signature, signatureFormat);

  return isValid;
}