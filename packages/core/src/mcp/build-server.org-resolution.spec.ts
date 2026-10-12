import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./builtin-tools.js", () => ({ getBuiltinCrossAppTools: () => ({}) }));

const resolveOrgByDomainMock = vi.fn();
const resolveOrgIdForEmailMock = vi.fn();
vi.mock("../org/context.js", () => ({
  resolveOrgByDomain: (...a: any[]) => resolveOrgByDomainMock(...a),
  resolveOrgIdForEmail: (...a: any[]) => resolveOrgIdForEmailMock(...a),
}));

const { resolveCallerOrgId } = await import("./build-server.js");

describe("resolveCallerOrgId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resolveOrgByDomainMock.mockResolvedValue(null);
    resolveOrgIdForEmailMock.mockResolvedValue(null);
  });

  it("uses the org named by the token's domain first", async () => {
    resolveOrgByDomainMock.mockResolvedValue({ orgId: "org-domain" });
    resolveOrgIdForEmailMock.mockResolvedValue("org-member");
    const orgId = await resolveCallerOrgId({
      userEmail: "head@school.ng",
      orgDomain: "school.ng",
      oauthClientId: "client-1",
      oauthScopes: ["mcp:read", "mcp:write"],
    });
    expect(orgId).toBe("org-domain");
    expect(resolveOrgIdForEmailMock).not.toHaveBeenCalled();
  });

  it("falls back to an OAuth caller's own membership when no domain matches", async () => {
    resolveOrgIdForEmailMock.mockResolvedValue("org-member");
    const orgId = await resolveCallerOrgId({
      userEmail: "head@gmail.com",
      orgDomain: undefined,
      oauthClientId: "client-1",
      oauthScopes: ["mcp:read", "mcp:write"],
    });
    expect(orgId).toBe("org-member");
    expect(resolveOrgIdForEmailMock).toHaveBeenCalledWith("head@gmail.com");
  });

  it("returns no org for an OAuth caller who belongs to none", async () => {
    const orgId = await resolveCallerOrgId({
      userEmail: "stranger@gmail.com",
      orgDomain: undefined,
      oauthClientId: "client-1",
    });
    expect(orgId).toBeUndefined();
  });

  it("never looks up membership for a caller whose email is only claimed", async () => {
    // Static-token callers carry an email from a header they wrote themselves.
    resolveOrgIdForEmailMock.mockResolvedValue("org-member");
    const orgId = await resolveCallerOrgId({
      userEmail: "head@gmail.com",
      orgDomain: undefined,
    });
    expect(orgId).toBeUndefined();
    expect(resolveOrgIdForEmailMock).not.toHaveBeenCalled();
  });

  it("returns no org when there is no caller", async () => {
    expect(await resolveCallerOrgId(undefined)).toBeUndefined();
  });
});
