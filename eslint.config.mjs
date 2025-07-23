import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-var-requires": "off", // ✅ allow require()
      "no-console": "warn", // optional: allow console.log without errors
      ignoreDuringBuilds: true, // optional: ignore console logs during production builds
    },
  },
];

export default eslintConfig;
