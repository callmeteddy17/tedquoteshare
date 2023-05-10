'use client';
import { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';
import Loader from './Loader';

const QuoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 quote_layout">
      {data.map((quote) => {
        return (
          <QuoteCard
            key={quote._id}
            post={quote}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const respone = await fetch('/api/quote');
      const data = await respone.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  const filterQuotes = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.author.userName) ||
        regex.test(item.tag) ||
        regex.test(item.quote)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterQuotes(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer glassmorphism"
        />
      </form>
      {searchText ? (
        <QuoteCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <QuoteCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
