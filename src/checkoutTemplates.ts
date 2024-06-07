import type { CheckoutTemplateCreateInput, CheckoutTemplateUpdateInput } from "@rvvup/node-openapi";
import { CheckoutTemplatesApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class CheckoutTemplates extends BaseApi<CheckoutTemplatesApi> {
  constructor(client: RvvupClient) {
    super(client, new CheckoutTemplatesApi());
  }

  create(input: CheckoutTemplateCreateInput) {
    return this.api.createCheckoutTemplate(this.client._merchantId, input);
  }

  get(id: string) {
    return this.api.getCheckoutTemplate(id, this.client._merchantId);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listCheckoutTemplates(this.client._merchantId, offset, limit);
  }

  update(id: string, input: CheckoutTemplateUpdateInput) {
    return this.api.updateCheckoutTemplate(id, this.client._merchantId, input);
  }
}
