import { afterEach, describe, expect, it } from "vitest";
import {
  brandingForRequest,
  safeDisplayName,
  setEmailBrandingResolver,
} from "./email-branding.js";
import { fromWithName } from "./email.js";

const req = (headers: Record<string, string>) =>
  new Request("http://x/", { headers });

describe("email branding", () => {
  afterEach(() => {
    setEmailBrandingResolver(null);
    delete process.env.EMAIL_FROM;
  });

  it("gives defaults when no resolver is registered", async () => {
    expect(await brandingForRequest(req({ host: "a.dev" }))).toBeNull();
  });

  it("resolves the forwarded host before the host header", async () => {
    setEmailBrandingResolver((host) => ({ name: host }));
    const b = await brandingForRequest(
      req({ host: "internal", "x-forwarded-host": "School.EXAMPLE.com" }),
    );
    expect(b?.name).toBe("school.example.com");
  });

  it("falls back to defaults when the lookup throws", async () => {
    setEmailBrandingResolver(() => {
      throw new Error("db down");
    });
    expect(await brandingForRequest(req({ host: "a.dev" }))).toBeNull();
  });

  it("replaces only the display name of the sender", () => {
    process.env.EMAIL_FROM = "Ellai <noreply@ellai.dev>";
    expect(fromWithName("Crestfield College")).toBe(
      "Crestfield College <noreply@ellai.dev>",
    );
    process.env.EMAIL_FROM = "noreply@ellai.dev";
    expect(fromWithName("YellowVille")).toBe("YellowVille <noreply@ellai.dev>");
    expect(fromWithName(undefined)).toBeUndefined();
  });

  it("strips characters that could break the header", () => {
    expect(safeDisplayName('Evil"\r\nBcc: x <a@b.c>')).toBe(
      "Evil Bcc: x a@b.c",
    );
  });
});
