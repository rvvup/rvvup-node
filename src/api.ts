import type { Authentication } from "@rvvup/node-openapi";
import { version } from "../package.json";
import { RvvupClient } from "./client";

/**
 * Default API interface to get all apis prepared.
 * Required as there is no inheritance in the generated code.
 */
interface IApi {
  set basePath(basePath: string);
  set defaultHeaders(defaultHeaders: any);
  setDefaultAuthentication(auth: Authentication): void;
}

export class BaseApi<TApi extends IApi> {
  constructor(protected client: RvvupClient, protected api: TApi) {
    this.api.basePath = client._baseUrl;
    this.api.setDefaultAuthentication(client._auth);
    this.api.defaultHeaders = {
      "User-Agent": `rvvup-node-sdk/${version}`,
    };
  }
}
