import {
  createOnboardingPlugin,
  registerOnboardingStep,
} from "@agent-native/core/onboarding";
import { BOOKS_SETUP_STEPS } from "../lib/setup-steps.js";

/**
 * Books' setup checklist. Lives in server/plugins/ so the framework skips its
 * default onboarding plugin and these steps share the route handlers' registry.
 */
const basePlugin = createOnboardingPlugin();

export default async (nitroApp: any): Promise<void> => {
  await basePlugin(nitroApp);
  for (const step of BOOKS_SETUP_STEPS) registerOnboardingStep(step);
};
