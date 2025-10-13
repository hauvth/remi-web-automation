import * as imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/constant';
import { logger } from './logger';
const config = {
  imap: {
    user: TEST_EMAIL,
    password: TEST_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 30000,
  },
};

function decodeQuotedPrintable(str: string): string {
  return str
    .replace(/=\r?\n/g, '') // xóa dòng ngắt MIME
    .replace(/=3D/g, '=') // decode dấu "="
    .replace(/=([A-F0-9]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export async function getRemitanoVerificationLink(timeout = 60000): Promise<string> {
  logger.info('📧 Connecting to email server to fetch verification link...');
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const end = Date.now() + timeout;
  while (Date.now() < end) {
    const searchCriteria = ['UNSEEN', ['OR', ['FROM', '@remitano.com'], ['SUBJECT', 'Remitano']]];
    const fetchOptions = {
      bodies: ['HEADER.FIELDS (FROM)', 'TEXT'],
      markSeen: true,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    if (messages.length > 0) {
      const msg = messages[messages.length - 1];
      const htmlPart = msg.parts.find(p => p.which === 'TEXT');

      const rawBody = htmlPart?.body || '';
      const parsed = await simpleParser(rawBody);

      const htmlText = decodeQuotedPrintable(parsed.text || '');
      const match = htmlText.match(/https:\/\/remitano\.com\/vn\/login[^"'<\s]+/);

      if (match) {
        const link = match[0];
        await connection.end();
        return link;
      } else {
        logger.error('⚠️ No Remitano link found in email body');
      }
    }
    await new Promise(r => setTimeout(r, 3000));
  }

  await connection.end();
  throw new Error('Not found email in 60s');
}
