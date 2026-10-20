import type { LogCreateInput } from "@rvvup/node-openapi";
import { LogsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

export class Logs extends BaseApi<LogsApi> {
  constructor(client: RvvupClient) {
    super(client, new LogsApi());
  }

  create(input: LogCreateInput) {
    return this.api.createLog(this.client._merchantId, input);
  }
}
