// pnpm-lock.yaml に載っている全パッケージ（間接依存を含む）が、lock を更新した時点で
// 公開から minimumReleaseAge 以上経っていたかをレジストリの公開日時で確かめる。
// pnpm の minimumReleaseAge は解決時にしか効かず、--frozen-lockfile や手で書き換えた lock は素通りするため。
// 基準時刻は lock を最後に変えたコミットの日時（未コミットの変更があれば現在時刻）。
// 現在時刻を基準にしないのは、時間が経つほど検査が甘くなり、新しすぎる版を入れた事実が消えるため。
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const LockfilePath = "pnpm-lock.yaml";
const Registry = "https://registry.npmjs.org";
const Concurrency = 16;

const readMinimumReleaseAgeMinutes = () => {
  const match = readFileSync("pnpm-workspace.yaml", "utf8").match(/^minimumReleaseAge:\s*(\d+)\s*$/m);
  return match ? Number(match[1]) : 0;
};

const git = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const readLockfileChangedAt = () => {
  const hasUncommittedChange = git(["status", "--porcelain", "--", LockfilePath]) !== "";
  const committedAt = git(["log", "-1", "--format=%cI", "--", LockfilePath]);
  return hasUncommittedChange || committedAt === "" ? new Date() : new Date(committedAt);
};

/** lock の packages: 節から name@version を取り出す（snapshots: 節は peer 解決の写しなので見ない）。 */
const collectLockedPackages = () => {
  const lockfile = readFileSync(LockfilePath, "utf8");
  const section = lockfile.split(/^packages:\n/m)[1]?.split(/^\S/m)[0] ?? "";
  return [...section.matchAll(/^ {2}'?((?:@[^/@'\s]+\/)?[^@'\s]+)@([^':(\s]+)'?:/gm)].map(([, name, version]) => ({
    name,
    version,
  }));
};

const fetchPublishedAt = async ({ name, version }) => {
  const response = await fetch(`${Registry}/${name.replace("/", "%2F")}`);
  const publishedAt = response.ok ? (await response.json()).time?.[version] : undefined;
  return { name, version, publishedAt: publishedAt ? new Date(publishedAt) : undefined };
};

const mapWithConcurrency = async (items, limit, fn) => {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    results.push(...(await Promise.all(items.slice(i, i + limit).map(fn))));
  }
  return results;
};

const minimumAgeMinutes = readMinimumReleaseAgeMinutes();
const changedAt = readLockfileChangedAt();
const deadline = new Date(changedAt.getTime() - minimumAgeMinutes * 60_000);
const packages = collectLockedPackages();
const published = await mapWithConcurrency(packages, Concurrency, fetchPublishedAt);

const unknown = published.filter((p) => p.publishedAt === undefined);
const tooNew = published.filter((p) => p.publishedAt !== undefined && p.publishedAt > deadline);

console.log(
  `${packages.length} 件を確認（基準: lock 更新 ${changedAt.toISOString()} の ${minimumAgeMinutes} 分前 = ${deadline.toISOString()}）`,
);
for (const p of unknown) console.error(`::error::${p.name}@${p.version} の公開日時をレジストリから取得できません`);
for (const p of tooNew) {
  console.error(`::error::${p.name}@${p.version} は ${p.publishedAt.toISOString()} 公開で、基準より新しいです`);
}
process.exit(unknown.length + tooNew.length === 0 ? 0 : 1);
