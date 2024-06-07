import type { StatementExportRequest } from "@rvvup/node-openapi";
import { StatementExportsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

export class Statements extends BaseApi<StatementExportsApi> {
  constructor(client: RvvupClient) {
    super(client, new StatementExportsApi());
  }

  export(filter: StatementExportRequest) {
    return this.api.exportStatement(this.client._merchantId, filter);
  }
}
