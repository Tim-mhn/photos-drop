import { Auth0VueClient } from "@auth0/auth0-vue";
import axios, { AxiosError } from "axios";
import { auth0 } from "../auth";

export const API_CLIENT_KEY = "API_CLIENT_KEY" as const;
export class APIClient {
  constructor(private authClient: Auth0VueClient) {}
  async get<T>(url: string) {
    const headers = await this._buildAuthHeaders();
    try {
      const res = await axios.get<T>(url, {
        headers,
      });
      return res.data;
    } catch (err) {
      this._throwHttpResponseError(err as AxiosError);
    }
  }

  async post<I, O>(url: string, data?: I) {
    const headers = await this._buildAuthHeaders();
    try {
      return await axios.post<O>(url, data, { headers });
    } catch (err) {
      this._throwHttpResponseError(err as AxiosError);
    }
  }

  private async _buildAuthHeaders() {
    const token = await this.authClient.getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private _throwHttpResponseError(err: AxiosError) {
    const httpError = err.response?.data;
    throw httpError;
  }
}

export const apiClient = new APIClient(auth0);
