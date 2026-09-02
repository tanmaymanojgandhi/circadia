#!/usr/bin/env node
/**
 * Setup Git Hooks for Circadia repository
 *
 * Installs:
 * - .git/hooks/pre-push : runs 'npm run lint' before every push
 */

const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const gitHooksDir = path.join(rootDir, '.git', 'hooks')

if (!fs.existsSync(path.join(rootDir, '.git'))) {
  console.log('[hooks] No .git directory found; skipping hook installation.')
  process.exit(0)
}

if (!fs.existsSync(gitHooksDir)) {
  fs.mkdirSync(gitHooksDir, { recursive: true })
}

const prePushScript = `#!/usr/bin/env sh
# Circadia Git Pre-Push Hook
echo ""
echo "🔍 Running Circadia pre-push lint and syntax validation..."
node scripts/lint.js

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Push rejected: linting or syntax errors detected!"
  echo "Please resolve the errors above before pushing."
  echo ""
  exit 1
fi

echo "✅ Pre-push validation passed. Proceeding with push..."
echo ""
exit 0
`

const hookPath = path.join(gitHooksDir, 'pre-push')
fs.writeFileSync(hookPath, prePushScript, { encoding: 'utf-8', mode: 0o755 })

try {
  fs.chmodSync(hookPath, 0o755)
} catch (e) {
  // chmod may be no-op on Windows, which is normal
}

console.log('[hooks] Git pre-push hook installed successfully at .git/hooks/pre-push')
