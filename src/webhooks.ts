import type { WebhookCreateInput, WebhookUpdateInput } from "@rvvup/node-openapi";
import { WebhooksApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class Webhooks extends BaseApi<WebhooksApi> {
  constructor(client: RvvupClient) {
    super(client, new WebhooksApi());
  }

  create(input: WebhookCreateInput) {
    return this.api.createWebhook(this.client._merchantId, input);
  }

  get(id: string) {
    return this.api.getWebhook(id, this.client._merchantId);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listWebhooks(this.client._merchantId, offset, limit);
  }

  update(id: string, input: WebhookUpdateInput) {
    return this.api.updateWebhook(id, this.client._merchantId, input);
  }
}
