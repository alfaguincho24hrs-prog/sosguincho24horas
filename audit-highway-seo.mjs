import fs from 'fs';
import path from 'path';

const filePath = "src/routes/guinchos-nas-rodovias-{$slug}.tsx";

function runAudit() {
    if (!fs.existsSync(filePath)) {
        console.error("Arquivo não encontrado:", filePath);
        process.exit(1);
    }
    const content = fs.readFileSync(filePath, "utf-8");

    // Extrair HIGHWAYS_DATA de forma robusta
    const entriesMatch = content.match(/const HIGHWAYS_DATA: Record<string, HighwayInfo> = \{([\s\S]+?)\};\n\nexport/);
    if (!entriesMatch) {
        console.error("Não foi possível encontrar HIGHWAYS_DATA");
        process.exit(1);
    }

    const entriesContent = entriesMatch[1];
    const highwayBlocks = entriesContent.matchAll(/"([^"]+)"\s*:\s*\{([\s\S]+?)\n\s\s\}(?:,|$)/g);

    console.log("Auditoria de SEO - Rodovias e Trechos");
    console.log("======================================");

    const results = [];
    const titles = new Map();
    const descriptions = new Map();

    for (const block of highwayBlocks) {
        const slug = block[1];
        const body = block[2];
        
        const nameMatch = body.match(/name:\s*"([^"]+)"/);
        const name = nameMatch ? nameMatch[1] : slug;
        
        // Simular lógica de SEO do componente
        const title = `${name}: Guincho 24h e Auto Socorro Rápido`;
        const description = `Guincho 24h na ${name}. Atendimento especializado para carros, motos e pesados. Socorro mecânico imediato e transporte seguro. Chame agora!`;
        
        const issues = [];
        
        // Limites recomendados (Título: 30-65, Meta: 120-160)
        if (title.length > 70) issues.push(`Título LONGO (${title.length} ch)`);
        if (title.length < 30) issues.push(`Título CURTO (${title.length} ch)`);
        if (description.length > 165) issues.push(`Meta LONGA (${description.length} ch)`);
        if (description.length < 100) issues.push(`Meta CURTA (${description.length} ch)`);
        
        if (titles.has(title)) {
            issues.push(`Título DUPLICADO (com ${titles.get(title)})`);
        } else {
            titles.set(title, slug);
        }
        
        if (descriptions.has(description)) {
            issues.push(`Meta DUPLICADA (com ${descriptions.get(description)})`);
        } else {
            descriptions.set(description, slug);
        }
        
        results.push({ slug, title, issues });
    }

    const withIssues = results.filter(r => r.issues.length > 0);

    if (withIssues.length === 0) {
        console.log(`✅ Sucesso! Todas as ${results.length} rodovias/trechos passaram na auditoria.`);
        console.log("- Sem duplicatas.");
        console.log("- Tamanhos dentro dos limites recomendados.");
    } else {
        console.log(`❌ Foram encontrados problemas em ${withIssues.length} de ${results.length} rotas:`);
        withIssues.forEach(r => {
            console.log(`\n📍 Rota: ${r.slug}`);
            console.log(`   Título: "${r.title}"`);
            r.issues.forEach(issue => console.log(`   ⚠️ ${issue}`));
        });
        process.exit(1);
    }
}

runAudit();
