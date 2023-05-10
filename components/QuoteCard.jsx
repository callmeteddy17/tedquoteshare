'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const QuoteCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copy, setCopy] = useState('');

  const handleCopy = () => {
    setCopy(post.quote);
    navigator.clipboard.writeText(post.quote);
    setTimeout(() => setCopy(''), 3000);
  };

  const handleClick = () => {
    console.log(session);
    if (post.author._id === session.user.id) {
      router.push('/profile');
    } else {
      router.push(`/profile/${post.author._id}?name=${post.author.userName}`);
    }
  };

  return (
    <div className="quote_card">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleClick}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.author.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold ">
              {post.author.userName}
            </h3>
            <i className="font-inter text-sm text-gray-100">
              {post.author.email}
            </i>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy"
            src={
              copy === post.quote
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-50">"{post.quote}"</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      {session?.user.id === post.author._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t pt-3 border-gray-100">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post._id)}>
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post._id)}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
