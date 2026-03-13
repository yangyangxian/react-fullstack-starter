---
name: upgrading-npm-dependencies
description: Use when upgrading outdated npm dependencies in this monorepo and you need package order, major-version approval gates, and build verification
---

# Upgrading NPM Dependencies

## Overview

Use this skill when updating dependencies in this repository. The workflow is strict:

1. Upgrade in this order: `common` -> `client` -> `server`.
2. Use `npm-check-updates` to inspect and rewrite version ranges in `package.json`.
3. Minor and patch updates can be applied directly.
4. Major updates require stopping and asking for human confirmation before changing anything.
5. After upgrades, reinstall dependencies and run build scripts to confirm the repo still compiles.

## When To Use

- `npm outdated` shows stale packages in one or more workspaces.
- The user asks to upgrade dependencies, refresh packages, or bump versions.
- You need a safe default that respects shared-package dependencies across the monorepo.

Do not use this skill for adding brand new packages for a feature. That is a normal implementation task.

## Required Order

Always process workspaces in this exact sequence:

1. `common`
2. `client`
3. `server`

Reason: `client` and `server` both depend on the built output and contracts from `common`.

## Version Rules

- Patch update: apply directly.
- Minor update: apply directly.
- Major update: stop, summarize the package name plus current and target versions, and ask the user whether to proceed.

Treat a change as major when the leftmost non-zero semver component changes.

Examples:

- `1.4.2 -> 1.5.0`: allowed without confirmation.
- `1.4.2 -> 1.4.3`: allowed without confirmation.
- `1.4.2 -> 2.0.0`: requires confirmation.
- `0.8.4 -> 0.9.0`: requires confirmation because for `0.x`, the minor bump is potentially breaking.

## Workflow

### 1. Inspect candidate upgrades

Check each workspace separately with `npm-check-updates` so the output stays attributable and reflects version declaration changes:

```bash
npx npm-check-updates --packageFile common/package.json
npx npm-check-updates --packageFile client/package.json
npx npm-check-updates --packageFile server/package.json
```

If there are no candidate upgrades in a workspace, continue to the next one.

### 2. Split updates by risk

For each workspace, separate dependencies into:

- safe updates: patch and minor
- blocked updates: major

If any blocked updates are found, do not upgrade that package yet. Ask the user for confirmation first.

Use this format when stopping:

```text
Major updates found in <workspace>:
- <package>: <current> -> <latest>

Minor/patch updates are ready to apply now. Confirm whether major updates should also be included.
```

### 3. Apply safe updates only

Rewrite `package.json` version ranges workspace by workspace.

Preferred commands:

```bash
npx npm-check-updates --packageFile common/package.json -u
npx npm-check-updates --packageFile client/package.json -u
npx npm-check-updates --packageFile server/package.json -u
```

If a specific package must be targeted, use `npm-check-updates` filters or install the exact approved version in the same workspace rather than upgrading unrelated packages.

### 4. Reinstall after rewriting versions

After `package.json` changes, reinstall dependencies so the lockfile and installed modules match the declared versions.

Preferred commands:

```bash
npm install --prefix common
npm install --prefix client
npm install --prefix server
```

### 5. Build after upgrades

Build verification is mandatory.

Run workspace builds in the same dependency order:

```bash
npm run build:common
npm run build:client
npm run build:server
```

Then run the root build for final confirmation:

```bash
npm run build
```

If any build fails, stop and report:

- which workspace failed
- the package upgrades that preceded the failure
- the first relevant error

## Output Expectations

When reporting results, include:

- upgraded workspaces
- packages updated automatically
- any major updates left pending approval
- whether `npm run build` passed or failed

## Common Mistakes

- Upgrading `client` or `server` before `common`.
- Applying a major bump without explicit approval.
- Treating `0.x` minor bumps as safe.
- Using `npm update` as the main upgrade mechanism when the project expects `npm-check-updates` to rewrite declared versions.
- Finishing the version bump without running build scripts.
- Reporting success after only rewriting versions or reinstalling packages without compile verification.