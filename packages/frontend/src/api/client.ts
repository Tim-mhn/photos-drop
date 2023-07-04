import { Auth0VueClient } from "@auth0/auth0-vue";
import axios, { AxiosError, AxiosResponse } from "axios";
import { auth0 } from "../auth";

export const API_CLIENT_KEY = "API_CLIENT_KEY" as const;

type HttpObserve = "data" | "response";

type ApiOptions = {
  responseType: "json" | "blob";
  observe: HttpObserve;
};

export class APIClient {
  constructor(private authClient: Auth0VueClient) {}

  private readonly DEFAULT_OPTIONS: ApiOptions = {
    observe: "data",
    responseType: "json",
  };

  async get<T>(
    url: string,
    opts: {
      responseType: "json";
      observe: "data";
    },
  ): Promise<T>;

  async get<T>(
    url: string,
    opts: {
      responseType: "blob";
      observe: "response";
    },
  ): Promise<AxiosResponse<T>>;

  async get<T>(url: string, opts: Partial<ApiOptions>) {
    return this._request<T>("GET", url, opts);
  }

  async _request<T, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: {
      responseType: "json";
      observe: "data";
    },
    data?: Input,
  ): Promise<T>;

  async _request<T, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: Partial<ApiOptions>,
    data?: Input,
  ): Promise<T>;

  async _request<T, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: {
      responseType: "blob";
      observe: "response";
    },
    data?: Input,
  ): Promise<AxiosResponse<T>>;

  async _request<T = Blob, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: {
      responseType: "blob";
      observe: "data";
    },
    data?: Input,
  ): Promise<Blob>;

  async _request<T, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: {
      responseType: "json";
      observe: "response";
    },
    data?: Input,
  ): Promise<AxiosResponse<T>>;

  async _request<T, Input = any>(
    method: "GET" | "POST",
    url: string,
    opts: Partial<ApiOptions>,
    data?: Input,
  ) {
    try {
      const options = {
        ...this.DEFAULT_OPTIONS,
        ...opts,
      };
      const headers = await this._buildAuthHeaders();

      let res: AxiosResponse<T>;

      if (method === "GET")
        res = await axios.get<T>(url, {
          headers,
          responseType: options.responseType,
        });
      else
        res = await axios.post<T>(url, data, {
          headers,
          responseType: options.responseType,
        });

      if (options.observe === "response") return res;
      return res.data;
    } catch (err) {
      this._throwHttpResponseError(err as AxiosError);
    }
  }

  async post<I, O>(
    url: string,
    data: I,
    opts: {
      responseType: "json";
      observe: "data";
    },
  ): Promise<O>;

  async post<I, O>(
    url: string,
    data: I,
    opts: {
      responseType: "blob";
      observe: "response";
    },
  ): Promise<AxiosResponse<O>>;

  async post<I, O>(url: string, data: I, opts: Partial<ApiOptions>) {
    return this._request<O, I>("POST", url, opts, data);
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
