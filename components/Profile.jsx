import QuoteCard from './QuoteCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <div className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc mt-5 text-left">{desc}</p>
      <div className="mt-16 quote_layout">
        {data.map((quote) => {
          return (
            <QuoteCard
              key={quote._id}
              post={quote}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
