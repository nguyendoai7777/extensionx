import { resolve } from 'path';
import { readFileSync } from 'fs';

/**
 * resolved paths alias from tsconfig.json
 * ```ts
 * export default defineConfig({
 *   plugins: [react()],
 *   resolve: {
 *     alias: resolvePaths()
 *   }
 * });
 * ```
 * 
 * */

function resolvePaths() {
  const tsConfigRaw = (readFileSync('./tsconfig.json', 'utf-8'));
  const cleanedTsConfig = tsConfigRaw.replace(/\/\/.*$/gm, '') // removed comment with format /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const paths = JSON.parse(cleanedTsConfig).compilerOptions?.paths || {};
  const aliases: Record<string, any> = {};
  for (const key in paths) {
    if (Object.hasOwnProperty.call(paths, key)) {
      const aliasKey = key.replace('/*', '');
      const aliasPath = paths[key][0].replace('/*', '');
      aliases[aliasKey] = resolve(__dirname, aliasPath);
    }
  }
  return aliases;
}
