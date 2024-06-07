import type { PaymentLinkCreateInput } from "@rvvup/node-openapi";
import { PaymentLinksApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class PaymentLinks extends BaseApi<PaymentLinksApi> {
  constructor(client: RvvupClient) {
    super(client, new PaymentLinksApi());
  }

  create(input: PaymentLinkCreateInput) {
    return this.api.createPaymentLink(this.client._merchantId, input);
  }

  get(id: string) {
    return this.api.getPaymentLink(id, this.client._merchantId);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listPaymentLinks(this.client._merchantId, offset, limit);
  }

  deactivate(id: string) {
    return this.api.deactivatePaymentLink(id, this.client._merchantId);
  }
}
