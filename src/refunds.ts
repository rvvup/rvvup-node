import type { RefundCreateInput } from "@rvvup/node-openapi";
import { RefundsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

export class Refunds extends BaseApi<RefundsApi> {
  constructor(client: RvvupClient) {
    super(client, new RefundsApi());
  }

  create(paymentSessionId: string, input: RefundCreateInput, idempotencyKey?: string) {
    return this.api.createRefund(this.client._merchantId, paymentSessionId, input, idempotencyKey);
  }
}
