import type { ThemeCreateInput, ThemeUpdateInput } from "@rvvup/node-openapi";
import { ThemesApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class Themes extends BaseApi<ThemesApi> {
  constructor(client: RvvupClient) {
    super(client, new ThemesApi());
  }

  create(input: ThemeCreateInput) {
    return this.api.createTheme(this.client._merchantId, input);
  }

  get(id: string) {
    return this.api.getTheme(this.client._merchantId, id);
  }

  list({ offset, limit }: Pagination = {}) {
    return this.api.listThemes(this.client._merchantId, offset, limit);
  }

  update(id: string, input: ThemeUpdateInput) {
    return this.api.updateTheme(this.client._merchantId, id, input);
  }
}
