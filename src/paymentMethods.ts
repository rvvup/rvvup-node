import { PaymentMethodsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

type PaymentMethodsFilter = {
  currency?: string;
  amount?: string;
  includeInactive?: boolean;
};

export class PaymentMethods extends BaseApi<PaymentMethodsApi> {
  constructor(client: RvvupClient) {
    super(client, new PaymentMethodsApi());
  }

  list({ currency, amount, includeInactive }: PaymentMethodsFilter = {}) {
    return this.api.listPaymentMethods(this.client._merchantId, currency, amount, includeInactive);
  }
}
