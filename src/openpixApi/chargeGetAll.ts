import { baseUrl, getAuthorization } from './api';

const url = '/api/openpix/v1/charge'

const getUrl = () => `${baseUrl}${url}`;

export const chargeGetAll = async () => {
  const response = await fetch(getUrl(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  });

  const data = await response.json();

  return data;
}
