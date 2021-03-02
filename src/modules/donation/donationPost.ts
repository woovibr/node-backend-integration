import { ParameterizedContext } from 'koa';
import { chargePost as chargePostApi } from '../../openpixApi/chargePost';
import Donation from './DonationModel';

type ChargePostBody = {
  comment: string,
  value: number,
}
export const donationPost = async (ctx: ParameterizedContext<{}, {}, ChargePostBody>) => {
  const { body } = ctx.request;

  const donation = await new Donation({
    comment: body.comment,
    value: body.value,
  }).save();

  const payload = {
    correlationID: donation._id.toString(),
    value: body.value,
    comment: body.comment,
  }
  const { brCode, error } = await chargePostApi(payload);

  if (error) {
    ctx.status = 400;
    ctx.body = {
      error,
    };
    return;
  }

  await Donation.updateOne({
    _id: donation._id,
  }, {
    $set: {
      brCode,
    },
  });

  ctx.body = {
    comment: donation.comment,
    value: donation.value,
    id: donation._id.toString(),
    status: donation.status,
    brCode,
  };
  ctx.status = 200;
}
