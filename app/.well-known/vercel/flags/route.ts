import { getProviderData } from "@flags-sdk/vercel";
import { createFlagsDiscoveryEndpoint } from "flags/next";

import * as flags from "@/lib/flags";

// Flags Explorer in the Vercel Toolbar reads the store's flags here, to show and override them.
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData(flags));
