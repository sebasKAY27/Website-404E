// Apps Script: DO POST response HTML (close tab after 10s)
const SHEET_ID = '1s92hWhl4qBrd00SZgLu26Ni4BtvysyCOp41VSiMgJdY';
const SHEET_NAME = 'Escuadron404 Contactos';

function doPost(e) {
  try {
    const params = e.parameter || {};
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp','Empresa','NombreContacto','EmailCorporativo','Telefono','TipoServicio','Presupuesto','PlayerName','HighScore','DescripcionProyecto','Terms','Nombre','Email','Mensaje','RawPayload']);
    }

    const row = [
      new Date(),
      params.empresa || '',
      params.nombreContacto || '',
      params.emailCorporativo || '',
      params.telefono || '',
      params.tipoServicio || '',
      params.presupuesto || '',
      params['player-name'] || '',
      params['high-score'] || '',
      params.descripcionProyecto || '',
      typeof params.terms !== 'undefined' ? String(params.terms) : '',
      params.Nombre || params.nombreContacto || '',
      params.Email || params.emailCorporativo || '',
      params.Mensaje || params.descripcionProyecto || '',
      JSON.stringify(params)
    ];

    sheet.appendRow(row);

    // If JSON requested, return JSON
    if ((params._format && params._format.toLowerCase() === 'json') || (params.format && params.format.toLowerCase() === 'json')) {
      return ContentService.createTextOutput(JSON.stringify({ success: true, lastRow: sheet.getLastRow() })).setMimeType(ContentService.MimeType.JSON);
    }

    // Else return HTML that will close the tab after 10 seconds
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gracias</title><style>body{background:#0a0a0a;color:#fff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0} .card{max-width:520px;padding:24px;border-radius:12px;text-align:center;border:1px solid rgba(255,255,255,0.04)} .btn{display:inline-block;margin-top:12px;padding:10px 16px;background:#8b5cf6;color:#fff;text-decoration:none;border-radius:8px}</style></head><body><div class="card"><h1>¡Gracias! ✅</h1><p>Hemos recibido tu solicitud. Esta ventana se cerrará automáticamente en 10 segundos.</p><p><a class="btn" href="${safeUrl('https://sebaskay27.github.io/Website-404E/index.html')}" target="_blank">Volver al sitio</a></p><script>setTimeout(function(){try{window.close();}catch(e){/* ignore */} },10000);</script></div></body></html>`;

    return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    return HtmlService.createHtmlOutput('<pre>Error: '+String(err)+'</pre>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function safeUrl(url) { return String(url).replace(/"/g,'%22').replace(/</g,'%3C').replace(/>/g,'%3E'); }
