import type { APIRoute } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export const prerender = false;

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const supabase = getSupabaseClient(locals);

    const body = await request.json().catch(() => null);

    if (!body || !body.email || !body.name) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide at least your name and email.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const name = sanitizeHtml(body.name || '');
    const email = sanitizeHtml(body.email || '');
    const company = sanitizeHtml(body.company || 'Not specified');
    const services = Array.isArray(body.services) ? body.services.join(', ') : sanitizeHtml(body.services || 'General Inquiry');
    const budget = sanitizeHtml(body.budget || 'Flexible');
    const brief = sanitizeHtml(body.brief || 'No brief provided');

    const formattedInquiry = `=== NEW AGENCY INQUIRY ===\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nServices: ${services}\nBudget: ${budget}\n\nBrief:\n${brief}`;

    if (supabase) {
      // Insert into suggestions table using existing schema
      const { error } = await supabase.from('suggestions').insert([
        {
          suggestion: formattedInquiry,
          email: email,
          route: '/contact',
          page_title: 'Agency Consultation Inquiry'
        }
      ]);

      if (error) {
        console.error('Supabase inquiry insert error:', error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! Your project brief has been received. Our team will contact you within 24 business hours.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error handling inquiry submission:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'An internal server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

