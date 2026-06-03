import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_URL = "https://w.app/guincho24horas";
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
const TEL_REGEX = /tel:[0-9+]+/g;

console.log('--- Iniciando validação de links de contato ---');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const waMatches = content.match(WA_REGEX);
  const telMatches = content.match(TEL_REGEX);

  if (waMatches) {
    waMatches.forEach(match => {
      console.error(`ERRO: Link wa.me antigo encontrado em ${file}: ${match}`);
      errors++;
    });
  }

  if (telMatches) {
    telMatches.forEach(match => {
      // Exceção opcional se houver algum motivo legítimo, mas o usuário pediu para garantir o correto
      console.error(`ERRO: Link de telefone antigo encontrado em ${file}: ${match}`);
      errors++;
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
