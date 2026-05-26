# Dentária PT — Protótipo iOS-style

Protótipo mobile-first para clínicas dentárias nacionais (com dados demo da zona do Porto).

## Funcionalidades incluídas
- Pesquisa por zona/nome
- Mapa interativo com clínicas
- Página de detalhe (descrição, serviços, tabela de preços, links sociais)
- Tab **Tira-dúvidas** com chatbot básico + disclaimer médico
- **Marcar agora**: abre sempre email demo para `brunoairesaugusto@gmail.com`
- Login simples de paciente para captação de contacto
- Registo de contactos em Google Sheet (via Google Apps Script, opcional)

## Executar local
```bash
cd "/Users/nia_santos/Documents/Nia Vault/Projectos/clinicas-dentarias-prototipo"
python3 -m http.server 8080
```
Abrir: `http://localhost:8080`

## Ligar Google Sheet + envio email automático
1. Criar Google Sheet nova.
2. Extensões → Apps Script.
3. Colar conteúdo de `google-apps-script/Code.gs`.
4. Deploy → New deployment → Web app:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copiar URL `/exec`.
6. Em `app.js`, substituir:
   - `COLOCA_AQUI_O_URL_DO_APPS_SCRIPT_EXEC`
7. Publicar novamente.

Com isto:
- Todos os `login` e `lead` ficam na Sheet.
- Em `lead`, o Apps Script envia email para `brunoairesaugusto@gmail.com`.

## Nota
Sem Apps Script configurado, o protótipo continua funcional, mas o registo remoto fica desativado (modo demo local).