import { HttpBearerAuth } from "@rvvup/node-openapi";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { AccountStatements } from "./accountStatements";
import { Checkouts } from "./checkouts";
import { CheckoutTemplates } from "./checkoutTemplates";
import { Connections } from "./connections";
import { Logs } from "./logs";
import { Notifications } from "./notifications";
import { PaymentLinks } from "./paymentLinks";
import { PaymentMethods } from "./paymentMethods";
import { PaymentSessions } from "./paymentSessions";
import { PaymentSettings } from "./paymentSettings";
import { Refunds } from "./refunds";
import { Statements } from "./statements";
import { Themes } from "./themes";
import { Webhooks } from "./webhooks";
import { createDebugger } from "./utils";

const debug = createDebugger("client");

type RvvupClientOptions = {
  baseUrl?: string;
  merchantId?: string;
};

type RvvupJwtPayload = JwtPayload & {
  merchantId?: string;
  dashboardUrl?: string;
  live?: boolean;
};

/**
 * Rvvup API client
 * @throws {Error}
 */
export class RvvupClient {
  _baseUrl: string;
  _merchantId: string;
  _auth: HttpBearerAuth;

  readonly accountStatements: AccountStatements;
  readonly checkouts: Checkouts;
  readonly checkoutTemplates: CheckoutTemplates;
  readonly connections: Connections;
  readonly logs: Logs;
  readonly notifications: Notifications;
  readonly paymentLinks: PaymentLinks;
  readonly paymentMethods: PaymentMethods;
  readonly paymentSessions: PaymentSessions;
  readonly paymentSettings: PaymentSettings;
  readonly refunds: Refunds;
  readonly statements: Statements;
  readonly themes: Themes;
  readonly webhooks: Webhooks;

  constructor(authToken: string, options: RvvupClientOptions = {}) {
    const jwt = jwtDecode<RvvupJwtPayload>(authToken);
    const baseUrl = options.baseUrl ?? (typeof jwt.aud !== "string" ? null : jwt.aud.replace("/graphql", ""));
    const merchantId = options.merchantId ?? jwt.merchantId;

    if (typeof baseUrl !== "string") {
      throw new Error("No baseUrl found in JWT payload or options");
    }

    if (typeof merchantId !== "string") {
      throw new Error("No merchantId found in JWT payload or options");
    }

    this._baseUrl = baseUrl;
    this._merchantId = merchantId;

    this._auth = new HttpBearerAuth();
    this._auth.accessToken = authToken;

    this.accountStatements = new AccountStatements(this);
    this.checkouts = new Checkouts(this);
    this.checkoutTemplates = new CheckoutTemplates(this);
    this.connections = new Connections(this);
    this.logs = new Logs(this);
    this.notifications = new Notifications(this);
    this.paymentLinks = new PaymentLinks(this);
    this.paymentMethods = new PaymentMethods(this);
    this.paymentSessions = new PaymentSessions(this);
    this.paymentSettings = new PaymentSettings(this);
    this.refunds = new Refunds(this);
    this.statements = new Statements(this);
    this.themes = new Themes(this);
    this.webhooks = new Webhooks(this);

    debug("Rvvup SDK initialized. Merchant: %s, Env: %s", merchantId, jwt.live ? "live" : "sandbox");
  }
}
