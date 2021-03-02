import { ParameterizedContext } from 'koa';
import { debugConsole } from './debugConsole';
import Donation, { DONATION_STATUS } from './modules/donation/DonationModel';

export type WebhookPostBody = {
  charges: ChargesItem[]
  pix: PixItem[]
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

export const webhookPost = async (ctx: ParameterizedContext<{}, {}, WebhookPostBody>) => {
  debugConsole({
    body: ctx.request.body,
    params: ctx.params,
  });

  const { charges, pixTransactions } = ctx.request.body;

  for (const charge of charges) {
    const donation = await Donation.findOne({
      _id: charge.correlationID,
    });

    if (!donation) {
      continue;
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
  }

  ctx.body = {};
  ctx.status = 200;
}
