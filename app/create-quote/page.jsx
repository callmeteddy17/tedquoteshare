'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Form from '@/components/Form';

const CreateQuote = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: '',
    tag: '',
  });

  const createQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const respone = await fetch('/api/quote/new', {
        method: 'POST',
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user.id,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createQuote}
    />
  );
};

export default CreateQuote;
