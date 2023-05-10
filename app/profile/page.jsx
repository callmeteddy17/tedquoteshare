'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Profile from '@/components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const handleEdit = (post) => {
    router.push(`/update-quote?id=${post}`);
  };
  const handleDelete = async (post) => {
    const confirmed = confirm('Are you sure to delete this post?');
    if (confirmed) {
      try {
        await fetch(`api/quote/${post}`, {
          method: 'DELETE',
        });
        const filterPost = posts.filter((item) => item._id !== post);
        setPosts(filterPost);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const respone = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await respone.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
