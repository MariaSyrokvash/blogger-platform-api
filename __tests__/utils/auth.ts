import {APP_CONFIG} from "../../src/config";

export function generateBasicAuthToken() {
  const credentials = `${APP_CONFIG.AUTH.BASIC.LOGIN}:${APP_CONFIG.AUTH.BASIC.PASSWORD}`;
  const token = Buffer.from(credentials).toString('base64');
  return `Basic ${token}`;
}
