const SHEET_NAME = 'Contactos';
const DEMO_EMAIL = 'brunoairesaugusto@gmail.com';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sh.getLastRow() === 0) {
      sh.appendRow(['timestamp', 'type', 'name', 'email', 'phone', 'clinic', 'message', 'patientName', 'patientEmail', 'patientPhone', 'clinicSelected']);
    }

    sh.appendRow([
      body.timestamp || new Date().toISOString(),
      body.type || '',
      body.name || '',
      body.email || '',
      body.phone || '',
      body.clinic || '',
      body.message || '',
      body.patientName || '',
      body.patientEmail || '',
      body.patientPhone || '',
      body.clinicSelected || ''
    ]);

    if (body.type === 'lead') {
      MailApp.sendEmail({
        to: DEMO_EMAIL,
        subject: `Pedido de marcação demo — ${body.name || 'Paciente'}`,
        body:
`Novo pedido de marcação demo\n\nNome: ${body.name || '-'}\nEmail: ${body.email || '-'}\nTelefone: ${body.phone || '-'}\nClínica: ${body.clinic || '-'}\nMensagem: ${body.message || '-'}\nSelecionada no mapa: ${body.clinicSelected || '-'}\n\nOrigem: Protótipo REDE AORRISO`
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'REDE AORRISO API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
