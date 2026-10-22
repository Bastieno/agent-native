/**
 * Who may create an account, and who may use the assistant without a school
 * profile.
 *
 * A school's people are invited; nobody else needs an account. An address may
 * sign up when a school already counts it as a member (a provisioned head is
 * one) or when a school's pending staff or student list still holds an
 * invitation for it. A cancelled invitation no longer counts.
 *
 * Open sign-up is the local default (`AUTO_CREATE_DEFAULT_ORG`): every
 * newcomer gets a workspace of their own, which is how the simulations and a
 * fresh checkout work. `server/plugins/signup-policy.ts` refuses that in
 * production unless `ALLOW_OPEN_SIGNUP` says it is deliberate.
 */
import {
  candidateOrgsFor,
  findPendingInvite,
  orgRoleFor,
} from "./school-access.js";

export const NOT_INVITED =
  "This address hasn't been invited to a school here. Ask your school to invite you, then sign up with the exact address they used.";

export function signUpIsOpen(): boolean {
  return !!process.env.AUTO_CREATE_DEFAULT_ORG;
}

/** Whether any school counts this address as a member. */
export async function isOrgMember(email: string): Promise<boolean> {
  for (const orgId of await candidateOrgsFor(email)) {
    if (await orgRoleFor(orgId, email)) return true;
  }
  return false;
}

/** Whether a school holds a member or a live invitation for this address. */
export async function isExpectedBySchool(email: string): Promise<boolean> {
  const orgs = await candidateOrgsFor(email);
  for (const orgId of orgs) {
    if (await orgRoleFor(orgId, email)) return true;
  }
  return !!(await findPendingInvite(email, orgs));
}

/** The rule handed to `createAuthPlugin({ allowSignUp })`. */
export async function allowSchoolSignUp({
  email,
}: {
  email: string;
}): Promise<true | string> {
  if (signUpIsOpen()) return true;
  return (await isExpectedBySchool(email)) ? true : NOT_INVITED;
}
