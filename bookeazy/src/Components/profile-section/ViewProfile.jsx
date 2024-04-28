import React from "react";
import { useEffect, useState } from "react";
import "./viewprofile.css"; // Import CSS file
import { useParams } from "react-router-dom";
import axios from "./../../../axios.config";

const ViewProfile = (props) => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState();
  const [errorOccured, setErrorOccured] = useState(false);
  console.log(username);
  // const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/serviceperson/${username}`);
        // setProfileData(response.data);
        console.log(response.data);
        const b = response.data.bookings.filter((d) => d.endTime != null);
        setProfileData({ ...response.data, bookings: b });
      } catch (error) {
        setErrorOccured(true);
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [username]);

  // Sample data for demonstration
  // const profileData = {
  //   name: "John Doe",
  //   image: "profile.jpg",
  //   qualifications: "Bachelor's in Computer Science",
  //   services: ["Web Development", "Mobile App Development"],
  //   bio: "Experienced software engineer with a passion for creating efficient and scalable applications.",
  //   phone: "123-456-7890",
  //   email: "john@example.com",
  //   address: "123 Main St, City, Country",
  //   reviews: [
  //     { id: 1, text: "Great service!", rating: 5 },
  //     { id: 2, text: "Very professional.", rating: 4 },
  //     { id: 3, text: "Could improve response time.", rating: 3 },
  //     { id: 4, text: "Impressive work!", rating: 5 },
  //   ],
  // };
  if(errorOccured){
    return <p>Error occured..</p>;
  }
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img src={profileData.image ? profileData.image : `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${profileData.name}`} alt={profileData.name} />
        <h2>{profileData.name}</h2>
      </div>
      <div className="profile-right">
      <div className="imgAndtitle">
      <img src="/src/assets/qualification.png"/>
        <h3>Qualifications:</h3>
        </div>
        <p>{profileData.qualification}</p>
        <div className="imgAndtitle">
        <img src="/src/assets/services.png"/>
        <h3>Offered Services:</h3>
        </div>
        <ul>
          {profileData.servicesOffered.map((service, index) => (
            <li className="list" key={index}>{service.service.name}</li>
          ))}
        </ul>
        <div className="imgAndtitle">
        <img src="/src/assets/biography.png"/>
        <h3>Bio:</h3>
        </div>
        <p>{profileData.bio}</p>
        <div className="imgAndtitle">
        <img src="/src/assets/communicate.png"/>
        <h3>Contact Information:</h3>
        </div>
        <p className="list">
          <strong>Phone:</strong> {profileData.phone}
        </p>
        <p className="list">
          <strong>Email:</strong> {profileData.email}
        </p>
        <p className="list">
          <strong>Address:</strong> {profileData.address}
        </p>
        <h3>Reviews:</h3>
        <div className="review-list">
          {/* {profileData.bookings.map((review) => (
            <div key={review._id} className="review">
              <p>{review.feedback?.content?.overall}</p>
              <p>
                Rating:
                {Math.ceil(3 + 2 * review.feedback?.calculatedRating)}
              </p>
            </div>
          ))} */}
          {
            profileData.bookings.length!==0 ? profileData.bookings.map(review=><StarCard key={review._id} review={review}/>) : <p>No reviews yet.</p>
          }
        </div>
        <button className="load-more-button">Load More Reviews</button>
      </div>
    </div>
  );
};

function StarCard({review}){
  if(review?.feedback?.calculatedRating){
    let starCard=[]
    for(let i=0; i<Math.ceil(3 + 2*review?.feedback?.calculatedRating); i++){
      starCard.push(<i className="fa-solid fa-star" style={{color:"gold"}} key={i}></i>)
    }
    return (
      <div className="review">
                <p>{review.feedback?.content?.overall}</p>
                <p>
                  Rating:
                  {starCard.map(s=>s)}
                </p>
              </div>
    )
  }
  else{
    return (<div className="review"><p>No review.</p></div>)
  }
}

export default ViewProfile;
