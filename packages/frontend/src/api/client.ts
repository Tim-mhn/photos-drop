import { Auth0VueClient } from "@auth0/auth0-vue";
import axios from "axios";
import { inject, Plugin } from "vue";

export function useAPIClient(): APIClient {
  const client = inject<APIClient>(API_CLIENT_KEY);
  if (!client) throw new Error("No APIClient has been provided");
  return client;
}

export const API_CLIENT_KEY = "API_CLIENT_KEY" as const;
export class APIClient {
  constructor(private authClient: Auth0VueClient) {}
  async get<T>(url: string) {
    const headers = await this._buildAuthHeaders();
    const res = await axios.get<T>(url, {
      headers,
    });
    return res.data;
  }

  async post<I, O>(url: string, data?: I) {
    const headers = await this._buildAuthHeaders();
    return axios.post<O>(url, data, { headers });
  }

  private async _buildAuthHeaders() {
    const token = await this.authClient.getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

export const createApiClient = (auth0: Auth0VueClient) => {
  const apiClientPlugin: Plugin = {
    install: (app, _options) => {
      const apiClient = new APIClient(auth0);
      app.provide(API_CLIENT_KEY, apiClient);
    },
  };

  return apiClientPlugin;
};
