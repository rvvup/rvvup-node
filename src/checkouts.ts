import type { CheckoutCreateInput } from "@rvvup/node-openapi";
import { CheckoutsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class Checkouts extends BaseApi<CheckoutsApi> {
  constructor(client: RvvupClient) {
    super(client, new CheckoutsApi());
  }

  create(input: CheckoutCreateInput, idempotencyKey?: string) {
    return this.api.createCheckout(this.client._merchantId, input, idempotencyKey);
  }

  get(id: string) {
    return this.api.getCheckout(id, this.client._merchantId);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listCheckouts(this.client._merchantId, offset, limit);
  }

  paymentMethods(id: string, { offset, limit }: Pagination = {}) {
    return this.api.listCheckoutPaymentMethods(id, this.client._merchantId, offset, limit);
  }
}
