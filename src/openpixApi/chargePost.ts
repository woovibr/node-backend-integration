import { baseUrl, getAuthorization } from './api';

const url = '/api/openpix/v1/charge'

const getUrl = () => `${baseUrl}${url}`;

export type ChargePostResponse = {
  chargeID: string,
  correlationID: string,
  brCode: string,


}

export type Customer = {
  name: string,
  taxID: string,
  email: string,
  phone: string,
}
export type ChargePostPayload = {
  correlationID: string,
  value: number;
  comment?: string;
  customer?: Customer;
  error?: string;
};
export const chargePost = async (payload: ChargePostPayload): Promise<ChargePostResponse> => {
  const response = await fetch(getUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  const data = await response.json();

  console.log({
    data,
  });

  return data;
}
