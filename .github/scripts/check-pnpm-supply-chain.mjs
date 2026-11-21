// pnpm のサプライチェーン対策が外れていないかを確かめる。
// minimumReleaseAge は pnpm 10.16 で入った設定で、それより古い pnpm では黙って無視される。
// そのため設定値だけでなく packageManager のバージョンも見る。
import { readFileSync } from "node:fs";

const MinimumReleaseAgeMinutes = 10080;
const MinimumPnpm = [10, 16, 0];

const workspace = readFileSync("pnpm-workspace.yaml", "utf8");
const ageMatch = workspace.match(/^minimumReleaseAge:\s*(\d+)\s*$/m);
const age = ageMatch ? Number(ageMatch[1]) : 0;

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const pmMatch = String(pkg.packageManager ?? "").match(/^pnpm@(\d+)\.(\d+)\.(\d+)/);
const pnpmVersion = pmMatch ? pmMatch.slice(1, 4).map(Number) : [0, 0, 0];

const isPnpmNewEnough =
  pnpmVersion[0] !== MinimumPnpm[0]
    ? pnpmVersion[0] > MinimumPnpm[0]
    : pnpmVersion[1] !== MinimumPnpm[1]
      ? pnpmVersion[1] > MinimumPnpm[1]
      : pnpmVersion[2] >= MinimumPnpm[2];

const errors = [
  ...(age >= MinimumReleaseAgeMinutes
    ? []
    : [`pnpm-workspace.yaml の minimumReleaseAge が ${MinimumReleaseAgeMinutes} 未満です（現在: ${age}）`]),
  ...(isPnpmNewEnough
    ? []
    : [`package.json の packageManager が pnpm@${MinimumPnpm.join(".")} 未満です（現在: ${pkg.packageManager}）`]),
];

for (const error of errors) console.error(`::error::${error}`);
process.exit(errors.length === 0 ? 0 : 1);
