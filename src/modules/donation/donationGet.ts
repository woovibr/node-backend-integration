import { Context } from 'koa';
import { Types } from 'mongoose';
import Donation from './DonationModel';

export const donationGet = async (ctx: Context) => {
  const { id } = ctx.params;

  if (!Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = {
      error: 'id is invalid',
    };
  }

  const donation = await Donation.findOne({
    _id: id,
  }).lean();

  ctx.body = {
    comment: donation.comment,
    value: donation.value,
    id: donation._id.toString(),
    status: donation.status,
    brCode: donation.brCode,
  };
  ctx.status = 200;
}
