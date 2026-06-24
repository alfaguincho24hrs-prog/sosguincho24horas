import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_WA = "https://wa.me/5511996451510";
const ALLOWED_TEL = "tel:+5511996451510";
const SRC_DIR = path.join(__dirname, 'src');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles(SRC_DIR);
let errors = 0;

const WA_REGEX = /https:\/\/wa\.me\/[0-9]+/g;
const TEL_REGEX = /tel:\+?[0-9]+/g;
const OLD_WAPP_REGEX = /https:\/\/w\.app\/guincho24horas/g;

console.log('--- Iniciando validação de links de contato ---');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  const oldWapp = content.match(OLD_WAPP_REGEX);
  if (oldWapp) {
    oldWapp.forEach(match => {
      console.error(`ERRO: Link w.app antigo encontrado em ${file}: ${match}`);
      errors++;
    });
  }

  const waMatches = content.match(WA_REGEX);
  if (waMatches) {
    waMatches.forEach(match => {
      if (match !== ALLOWED_WA) {
        console.error(`ERRO: Link wa.me incorreto em ${file}: ${match}`);
        errors++;
      }
    });
  }

  const telMatches = content.match(TEL_REGEX);
  if (telMatches) {
    telMatches.forEach(match => {
      if (match !== ALLOWED_TEL) {
        console.error(`ERRO: Link de telefone incorreto em ${file}: ${match}`);
        errors++;
      }
    });
  }
});


if (errors > 0) {
  console.error(`--- Validação falhou: ${errors} links incorretos encontrados ---`);
  process.exit(1);
} else {
  console.log('--- Sucesso: Todos os links estão corretos! ---');
  process.exit(0);
}
