import { config } from '../config';

export const baseUrl = config.OPENPIX_API;

export const getAuthorization = () => config.APP_ID;
