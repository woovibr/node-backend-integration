import { ParameterizedContext } from 'koa';
import { debugConsole } from '../debugConsole';
import Donation, { DONATION_STATUS } from '../modules/donation/DonationModel';
import { Types } from 'mongoose';
import { hmacCalculateSignature, hmacVerifySignature } from './hmacSignature';
import { config } from '../config';

export type WebhookPostBody = {
  charge: ChargesItem,
  pix: PixItem
}
export type ChargesItem = {
  _id: string
  status: string
  customer: null
  value: number
  comment: string
  createdBy: string
  company: string
  transactionID: string
  correlationID: string
  createdAt: string
  updatedAt: string
}
export type PixItem = {
  _id: string
  charge: string
  time: string
  value: number
  transactionID: string
  infoPagador: string
  raw: Raw
}
export type Raw = {
  horario: string
  valor: string
  endToEndId: string
  txid: string
  infoPagador: string
}

export const webhookSecret = 'Do not tell anyone';

export const webhookPost = async (ctx: ParameterizedContext<{}, {}, WebhookPostBody>) => {
  debugConsole({
    body: ctx.request.body,
    params: ctx.params,
    headers: ctx.headers,
  });

  // this make sure this call was made by OpenPix services
  if (ctx.headers.authorization !== webhookSecret) {
    ctx.status = 401;
    ctx.body = {
      error: 'Invalid Authorization',
    };
    return;
  }

  // validate HMAC Signature
  if (!hmacVerifySignature(
    config.HMAC_SECRET_KEY,
    JSON.stringify(ctx.request.body),
    ctx.headers['x-openpix-signature']
  )) {
    ctx.status = 401;
    ctx.body = {
      error: 'Invalid HMAC',
    };
    return;
  }

  // eslint-disable-next-link
  const { charge, pixTransaction } = ctx.request.body;

  // webhook payload of test
  if (!charge && !pixTransaction) {
    ctx.status = 200;
    return;
  }

  if (!Types.ObjectId.isValid(charge.correlationID)) {
    console.log('invalid correlationID: ', {
      charge,
    });
    return;
  }

  const donation = await Donation.findOne({
    _id: charge.correlationID,
  });

  if (!donation) {
    ctx.body = {};
    ctx.status = 200;
    return;
  }

  // donation was paied
  if (charge.status === 'COMPLETED') {
    await Donation.updateOne({
      _id: donation._id,
    }, {
      $set: {
        status: DONATION_STATUS.PAIED,
      },
    });
  }

  ctx.body = {};
  ctx.status = 200;
}
