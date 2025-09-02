const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-200 w-80 shadow-md rounded-xl border border-base-300">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
          className="h-56 w-full object-cover rounded-t-xl"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500">{age + ", " + gender}</p>
        )}
        <p className="text-sm mt-2">{about}</p>
        <div className="card-actions justify-center mt-4 space-x-3">
          <button className="btn btn-sm btn-outline btn-primary">Ignore</button>
          <button className="btn btn-sm btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
