// FormSubmit webhook → GitHub issues (private leads-queue repo)
// Env vars: GITHUB_TOKEN, LEADS_REPO (default: dgon-jd/leads-queue)

export const config = { runtime: 'edge' };

const GITHUB_API = 'https://api.github.com';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN not configured');
    return new Response('Server misconfiguration', { status: 500 });
  }

  const leadsRepo = process.env.LEADS_REPO || 'dgon-jd/leads-queue';

  let body;
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      body = Object.fromEntries(new URLSearchParams(text));
    }
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  // Strip FormSubmit internal fields
  const { _subject, _captcha, _template, _next, _honey, _cc, ...leadData } = body;

  const email = leadData.email || leadData.Email || 'unknown';
  const now = new Date().toISOString();

  const issueTitle = `Lead: ${email} — ${now.slice(0, 10)}`;
  const issueBody = [
    '## New AI Advisory Lead',
    '',
    `**Submitted:** ${now}`,
    '',
    '### Form Data',
    ...Object.entries(leadData).map(([k, v]) => `- **${k}**: ${v}`),
    '',
    '---',
    '_Auto-created by Vercel webhook from FormSubmit_',
  ].join('\n');

  const ghRes = await fetch(`${GITHUB_API}/repos/${leadsRepo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ title: issueTitle, body: issueBody, labels: ['lead'] }),
  });

  if (!ghRes.ok) {
    const err = await ghRes.text();
    console.error('GitHub API error:', ghRes.status, err);
    return new Response('Failed to queue lead', { status: 502 });
  }

  return new Response('OK', { status: 200 });
}
