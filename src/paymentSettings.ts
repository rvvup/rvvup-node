import type { PaymentSettingsContext } from "@rvvup/node-openapi";
import { PaymentSettingsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

type PaymentSettingsOptions = Pagination & {
  /** Merchant public key */
  mpk?: string;
};

export class PaymentSettings extends BaseApi<PaymentSettingsApi> {
  constructor(client: RvvupClient) {
    super(client, new PaymentSettingsApi());
  }

  get(context: PaymentSettingsContext, { offset, limit, mpk }: PaymentSettingsOptions = {}) {
    return this.api.getPaymentSettings(this.client._merchantId, context, offset, limit, mpk);
  }
}
