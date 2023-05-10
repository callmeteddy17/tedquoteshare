import { connectDB } from '@/utils/database';
import Quote from '@/models/quote';

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const quotes = await Quote.findById(params.id).populate('author');
    if (!quotes) return new Response('Quote not found', { status: 404 });
    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
export const PATCH = async (req, { params }) => {
  const { quote, tag } = await req.json();
  try {
    await connectDB();
    const exitstingQuote = await Quote.findById(params.id);

    if (!exitstingQuote)
      return new Response('Quote not found', { status: 404 });

    exitstingQuote.quote = quote;
    exitstingQuote.tag = tag;

    await exitstingQuote.save();
    return new Response(JSON.stringify(exitstingQuote), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    await Quote.findByIdAndRemove(params.id);
    return new Response('Quote deleted', { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
