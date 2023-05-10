import Link from 'next/link';
import React from 'react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text blue_gradient text-left">{type} Post</h1>
      <p className="desc mt-5 text-left max-w-md">
        {type} and share your quote.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="quote">
          <span className="font-satoshi font-semibold text-base text-gray-50">
            Your Quote
          </span>
          <textarea
            id="quote"
            value={post.quote}
            placeholder="Write here..."
            className="form_textarea"
            onChange={(e) =>
              setPost({ ...post, quote: e.target.value })
            }></textarea>
        </label>
        <label htmlFor="tag">
          <span className="font-satoshi font-semibold text-base text-gray-50">
            Tag
          </span>
          <input
            id="tag"
            value={post.tag}
            placeholder="Write tag here... (#coding, #teddy, #javascript)"
            className="form_input"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={'/'} className="text-gray-600 text-sm">
            Cancel
          </Link>

          <button
            className="px-5 py-1 text-sm border black_btn"
            type="submit"
            disabled={submitting}>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
