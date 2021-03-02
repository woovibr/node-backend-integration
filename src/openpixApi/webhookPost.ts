import { baseUrl, getAuthorization } from './api';

const url = '/api/openpix/v1/webhook';

const getUrl = () => `${baseUrl}${url}`;

type WebhookPayload = {

};
export const webhookPost = async (payload: WebhookPayload) => {
  const response = await fetch(getUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data;
}
