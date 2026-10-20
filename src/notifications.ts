import type { NotificationSubscriptionCreateInput } from "@rvvup/node-openapi";
import { NotificationsApi } from "@rvvup/node-openapi";
import { BaseApi } from "./api";
import type { RvvupClient } from "./client";
import type { Pagination } from "./types";

export class Notifications extends BaseApi<NotificationsApi> {
  constructor(client: RvvupClient) {
    super(client, new NotificationsApi());
  }

  createSubscription(input: NotificationSubscriptionCreateInput) {
    return this.api.createNotificationSubscription(this.client._merchantId, input);
  }

  getSubscription(id: string) {
    return this.api.getNotificationSubscription(this.client._merchantId, id);
  }

  listSubscriptions({ offset, limit }: Pagination = {}) {
    return this.api.listNotificationSubscriptions(this.client._merchantId, offset, limit);
  }
}
