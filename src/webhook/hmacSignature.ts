import {
  BinaryToTextEncoding,
  createHmac,
} from 'crypto';

export const hmacCalculateSignature = (
  key: string,
  body: string,
  encoding: BinaryToTextEncoding = 'base64',
): string => createHmac('sha1', key).update(body).digest(encoding);

export const hmacVerifySignature = (
  key: string,
  body: string,
  headerSignature: string,
  encoding: BinaryToTextEncoding = 'base64',
) => {
  const signature = hmacCalculateSignature(key, body, encoding);

  return signature === headerSignature;
};
