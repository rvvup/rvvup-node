import type { ConnectionCreateInput } from "@rvvup/node-openapi";
import { ConnectionsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class Connections extends BaseApi<ConnectionsApi> {
  constructor(client: RvvupClient) {
    super(client, new ConnectionsApi());
  }

  create(input: ConnectionCreateInput) {
    return this.api.createConnection(this.client._merchantId, input);
  }

  get(id: string) {
    return this.api.getConnection(this.client._merchantId, id);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listConnections(this.client._merchantId, offset, limit);
  }

  disconnect(id: string) {
    return this.api.disconnectConnection(this.client._merchantId, id);
  }
}
