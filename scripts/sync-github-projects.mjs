import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const owner = process.env.GITHUB_USERNAME || "khrizenriquez";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsDirectory = path.join(root, "src", "content", "projects");
const genericCover = "/projects/repo-generic/cover.svg";

const languageLabels = {
  CSS: "CSS",
  Go: "Go",
  HTML: "HTML",
  Java: "Java",
  JavaScript: "JavaScript",
  PHP: "PHP",
  Python: "Python",
  Ruby: "Ruby",
  Shell: "Shell",
  Swift: "Swift",
  TypeScript: "TypeScript",
};

const summaryOverrides = {
  "mas-generosidad-beneficiarios":
    "Catalogo publico y editor administrativo para las historias de beneficiarios de Mas Generosidad.",
  "reservas-app":
    "Cliente movil nativo para gestionar reservas de laboratorios en Android y iOS.",
  "reservas-front":
    "Base documental para reconstruir la interfaz web de gestion de reservas.",
  "reservas-api":
    "API orientada a contratos para gestionar reservas de laboratorios de computo.",
  "car-fuel-notebook":
    "Aplicacion local-first para registrar consumo, recorridos y costos de combustible.",
  "our-story":
    "Experiencia visual que convierte una conversacion en una historia clara y facil de leer.",
  net_crawler:
    "Laboratorio local-first de observabilidad para una red Wi-Fi autorizada.",
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yamlString(value) {
  return JSON.stringify(value);
}

function getType(repository) {
  if (repository.homepage) return "Demo publica";
  if (["Python", "Go"].includes(repository.language)) return "Backend";
  if (repository.language === "Swift") return "Aplicacion movil";
  if (["JavaScript", "TypeScript", "CSS", "HTML"].includes(repository.language)) {
    return "Proyecto web";
  }
  return "Repositorio";
}

function getSummary(repository) {
  return (
    summaryOverrides[repository.name] ||
    repository.description?.trim() ||
    `Repositorio publico de GitHub desarrollado principalmente con ${repository.language || "tecnologias web"}.`
  );
}

function getStack(repository) {
  return [languageLabels[repository.language] || repository.language || "GitHub"];
}

async function fetchRepositories() {
  const repositories = [];

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "khrizenriquez-portfolio-sync",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API respondio con ${response.status} ${response.statusText}`);
    }

    const pageRepositories = await response.json();
    repositories.push(...pageRepositories);
    if (pageRepositories.length < 100) return repositories;
  }
}

async function main() {
  const files = (await readdir(projectsDirectory)).filter((file) => file.endsWith(".md"));
  const existingRepositories = new Set();

  for (const file of files) {
    const content = await readFile(path.join(projectsDirectory, file), "utf8");
    const repositoryUrl = content.match(/^repo:\s*["']?([^"'\n]+)["']?$/m)?.[1];
    if (repositoryUrl) existingRepositories.add(repositoryUrl.replace(/\/$/, ""));
  }

  const repositories = (await fetchRepositories())
    .filter((repository) => !repository.fork && !repository.archived)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const missingRepositories = repositories.filter(
    (repository) => !existingRepositories.has(repository.html_url),
  );

  for (const [index, repository] of missingRepositories.entries()) {
    const slug = slugify(repository.name);
    const filePath = path.join(projectsDirectory, `${slug}.md`);
    const hasDemo = Boolean(repository.homepage);
    const summary = getSummary(repository);
    const frontmatter = [
      "---",
      `title: ${yamlString(repository.name)}`,
      `slug: ${yamlString(slug)}`,
      "featured: false",
      `order: ${6 + index}`,
      'language: "es"',
      `type: ${yamlString(getType(repository))}`,
      "stack:",
      ...getStack(repository).map((item) => `  - ${yamlString(item)}`),
      `cover: ${yamlString(genericCover)}`,
      `coverAlt: ${yamlString(`Portada generica para el repositorio ${repository.name}`)}`,
      `repo: ${yamlString(repository.html_url)}`,
      ...(hasDemo ? [`demo: ${yamlString(repository.homepage)}`] : []),
      `cta: ${yamlString(hasDemo ? "Ver demo" : "Ver repositorio")}`,
      `summary: ${yamlString(summary)}`,
      "---",
      summary,
      "",
    ].join("\n");

    await writeFile(filePath, frontmatter, "utf8");
    console.log(`Added ${path.relative(root, filePath)}`);
  }

  console.log(
    `GitHub repos: ${repositories.length}; nuevas fichas: ${missingRepositories.length}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
