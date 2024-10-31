import { HttpBearerAuth } from "@rvvup/node-openapi";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Checkouts } from "./checkouts";
import { CheckoutTemplates } from "./checkoutTemplates";
import { PaymentLinks } from "./paymentLinks";
import { PaymentSessions } from "./paymentSessions";
import { Statements } from "./statements";
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

  readonly checkouts: Checkouts;
  readonly checkoutTemplates: CheckoutTemplates;
  readonly paymentLinks: PaymentLinks;
  readonly paymentSessions: PaymentSessions;
  readonly statements: Statements;
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

    this.checkouts = new Checkouts(this);
    this.checkoutTemplates = new CheckoutTemplates(this);
    this.paymentLinks = new PaymentLinks(this);
    this.paymentSessions = new PaymentSessions(this);
    this.statements = new Statements(this);
    this.webhooks = new Webhooks(this);

    debug("Rvvup SDK initialized. Merchant: %s, Env: %s", merchantId, jwt.live ? "live" : "sandbox");
  }
}
