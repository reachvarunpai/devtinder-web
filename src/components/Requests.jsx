import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

    if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } = 
        request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20  rounded-full "
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              {about ? (
                <p className="mt-1 text-gray-300">{about}</p>
              ) : (
                <p className="mt-1 text-gray-500 italic">This is default about the User</p>
              )}
            </div>
            <div>
              <button className="btn btn-primary mx-2" 
              onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
                </button>
              <button className="btn btn-secondary mx-2"
              onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;