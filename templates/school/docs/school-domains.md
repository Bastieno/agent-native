# A school's own address

Each school can have its own address, `<slug>.ellai.dev`. The slug maps to the
school in the `school_domains` table. Addresses not in the table (localhost, the
shared demo URL) behave as before.

## What the app does

- Signing in at one school's address does not sign anyone in at another's:
  cookies are per host.
- A signed-in account that belongs to other schools but not this one is refused
  on this address (`403`, `wrong-school`; the session endpoint answers
  `wrongSchool: true`). Someone with no school yet may pass, because an
  invitation is matched by email at their first sign-in.
- Someone in several schools acts in the school whose address they are using.
- Invitations and the provisioning email link to the school's own address.

## Give a new school an address

1. Provision it, with a slug (3-40 letters, numbers, hyphens; `www`, `api`,
   `admin`, `demo` and a few more are reserved):

   ```bash
   pnpm provision:school --name "Green Valley Academy" --headEmail head@example.com --slug greenvalley
   ```

   Against production, run it with the deployment's `DATABASE_URL`
   (`~/.crestfield-demo.env`). `SCHOOL_BASE_DOMAIN` overrides `ellai.dev`.

2. Cloudflare DNS for `ellai.dev`: add a `CNAME` named `greenvalley` pointing at
   `cname.vercel-dns.com`, **DNS only** (grey cloud), not proxied.

3. Add the domain to the Vercel project:

   ```bash
   npx vercel domains add greenvalley.ellai.dev
   ```

   (or Project > Settings > Domains). Vercel issues the certificate once the
   CNAME resolves.

Locally, `*.localhost` resolves to 127.0.0.1, so a school can be tried at
`http://greenvalley.localhost:8131` after inserting its row.

## Not yet verified

- Sign-in, password reset and email-verification links on a second host in a
  production build. The framework builds those from one `BETTER_AUTH_URL`; local
  dev accepts another host, production may need that host trusted. Test on the
  first real school address before relying on it.
- Branded sign-in page by host.
- Steps 2 and 3 are manual; a script using a Cloudflare token and a Vercel token
  can do them once the pattern is proven.
