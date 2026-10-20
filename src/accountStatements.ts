import type { AccountStatementCreateInput } from "@rvvup/node-openapi";
import { AccountStatementsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";

export class AccountStatements extends BaseApi<AccountStatementsApi> {
  constructor(client: RvvupClient) {
    super(client, new AccountStatementsApi());
  }

  create(input: AccountStatementCreateInput, idempotencyKey?: string) {
    return this.api.createAccountStatement(this.client._merchantId, input, idempotencyKey);
  }

  get(id: string) {
    return this.api.getAccountStatement(this.client._merchantId, id);
  }

  checkout(id: string, checkoutId: string) {
    return this.api.getCheckoutForAccountStatement(this.client._merchantId, id, checkoutId);
  }

  theme(id: string) {
    return this.api.getThemeForAccountStatement(this.client._merchantId, id);
  }
}
