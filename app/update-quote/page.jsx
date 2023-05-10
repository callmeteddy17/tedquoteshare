'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Form from '@/components/Form';

const EditQuote = () => {
  const searchParam = useSearchParams();
  const quoteId = searchParam.get('id');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: '',
    tag: '',
  });

  useEffect(() => {
    const getQuoteDetail = async () => {
      const respone = await fetch(`/api/quote/${quoteId}`);
      const data = await respone.json();
      setPost({
        quote: data.quote,
        tag: data.tag,
      });
    };
    if (quoteId) getQuoteDetail();
  }, [quoteId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!quoteId) return alert('Missing Quote');

    try {
      const respone = await fetch(`/api/quote/${quoteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag.replace(' ', '').toLowerCase(),
        }),
      });
      if (respone.ok) {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default EditQuote;
