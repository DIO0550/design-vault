// 生成した全パターンの DESIGN.md を、Google の DESIGN.md 仕様の公式 linter（@google/design.md）で検査する。
// error が 1 つでもあれば失敗する。warning は件数と中身を出すだけにする（composer の primary 地の白文字のように、
// UI 案どおりにしてコントラスト不足を承知している組や、部品から参照しない色があるため）。
import { readdirSync, readFileSync } from "node:fs";
import { lint } from "@google/design.md/linter";

const ReferencesDir = "plugins/design-system/skills/design-system/references";

const files = readdirSync(ReferencesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `${ReferencesDir}/${entry.name}/DESIGN.md`);

const reports = files.map((file) => ({ file, findings: lint(readFileSync(file, "utf8")).findings }));

for (const { file, findings } of reports) {
  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");
  console.log(`${file}: error ${errors.length} / warning ${warnings.length}`);
  for (const f of errors) console.log(`::error file=${file}::${f.rule} ${f.path ?? ""}: ${f.message}`);
  for (const f of warnings) console.log(`  warning ${f.rule} ${f.path ?? ""}: ${f.message}`);
}

if (reports.some(({ findings }) => findings.some((f) => f.severity === "error"))) process.exit(1);
