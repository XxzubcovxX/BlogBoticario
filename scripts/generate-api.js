const fs = require('fs');
const path = require('path');

// Caminhos baseados na raiz do projeto
const contentDir = path.join(__dirname, '../content');
const outputDir = path.join(__dirname, '../assets');
const outputFile = path.join(outputDir, 'produtos.json');

// 1. Garante que a pasta de saída existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 2. Lê todos os arquivos da pasta content
try {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));

    const produtos = files.map(file => {
        const rawData = fs.readFileSync(path.join(contentDir, file));
        return JSON.parse(rawData);
    });

    // 3. Salva o arquivo único (Nossa API Estática)
    fs.writeFileSync(outputFile, JSON.stringify(produtos, null, 2));

    console.log(`✅ SUCESSO: ${produtos.length} produtos compilados em assets/produtos.json`);

} catch (err) {
    console.error("❌ ERRO: Verifique se a pasta 'content' existe e tem arquivos .json inside.");
    console.error(err);
}