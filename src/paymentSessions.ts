import type { PaymentSessionCreateInput } from "@rvvup/node-openapi";
import { PaymentSessionsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

export class PaymentSessions extends BaseApi<PaymentSessionsApi> {
  constructor(client: RvvupClient) {
    super(client, new PaymentSessionsApi());
  }

  create(checkoutId: string, input: PaymentSessionCreateInput) {
    return this.api.createPaymentSession(this.client._merchantId, checkoutId, input);
  }

  get(checkoutId: string, id: string) {
    return this.api.getPaymentSession(this.client._merchantId, checkoutId, id);
  }
}
