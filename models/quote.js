import mongoose, { Schema, model, models } from 'mongoose';

const QuoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  quote: {
    type: String,
    require: [true, 'Quote is required.'],
  },
  tag: {
    type: String,
    require: [true, 'Tag is required.'],
  },
});
const Quote = models.Quote || model('Quote', QuoteSchema);

export default Quote;
