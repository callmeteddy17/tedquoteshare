import { connectDB } from '@/utils/database';
import Quote from '@/models/quote';

export const POST = async (req, res) => {
  const { userId, quote, tag } = await req.json();
  try {
    await connectDB();
    const newQuote = new Quote({
      author: userId,
      quote,
      tag,
    });
    await newQuote.save();
    return new Response(JSON.stringify(newQuote), {
      status: 201,
    });
  } catch (err) {
    return new Response('Create Fail', {
      status: 500,
    });
  }
};
