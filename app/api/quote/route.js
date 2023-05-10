import { connectDB } from '@/utils/database';
import Quote from '@/models/quote';

export const GET = async (req) => {
  try {
    await connectDB();
    const quotes = await Quote.find().populate('author');

    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
