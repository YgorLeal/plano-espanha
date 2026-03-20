#!/usr/bin/env node

/**
 * Script para criar novo post no blog.
 * Uso: node scripts/new-post.mjs "Título do Post"
 *
 * Para automação com IA:
 * 1. IA chama este script (ou cria o .md diretamente)
 * 2. git add + git commit + git push
 * 3. Cloudflare Pages detecta o push e faz deploy automático
 */

import fs from "fs";
import path from "path";

const title = process.argv[2];

if (!title) {
  console.error("Uso: node scripts/new-post.mjs \"Título do Post\"");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const date = new Date().toISOString().split("T")[0];

const template = `---
title: "${title}"
description: ""
date: "${date}"
author: "Plano Espanha"
category: "Geral"
tags: []
---

## ${title}

Escreva seu conteúdo aqui.
`;

const filepath = path.join("content", "blog", `${slug}.md`);

if (fs.existsSync(filepath)) {
  console.error(`Arquivo já existe: ${filepath}`);
  process.exit(1);
}

fs.writeFileSync(filepath, template);
console.log(`✅ Post criado: ${filepath}`);
console.log(`\nPróximos passos:`);
console.log(`  1. Edite o arquivo: ${filepath}`);
console.log(`  2. git add ${filepath}`);
console.log(`  3. git commit -m "post: ${title}"`);
console.log(`  4. git push (Cloudflare deploya automaticamente)`);
