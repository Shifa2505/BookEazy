import React from 'react';
import { useEffect, useState } from "react";
import './viewprofile.css'; // Import CSS file
import { useParams } from 'react-router-dom';
import axios from "./../../../axios.config";

const ViewProfile = (props) => {
  const { username } = useParams();
  console.log(username);
  // const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/serviceperson/${username}`);
        // setProfileData(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [username]);

  

  // Sample data for demonstration
  const profileData = {
    name: "John Doe",
    image: "profile.jpg",
    qualifications: "Bachelor's in Computer Science",
    services: ["Web Development", "Mobile App Development"],
    bio: "Experienced software engineer with a passion for creating efficient and scalable applications.",
    phone: "123-456-7890",
    email: "john@example.com",
    address: "123 Main St, City, Country",
    reviews: [
      { id: 1, text: "Great service!", rating: 5 },
      { id: 2, text: "Very professional.", rating: 4 },
      { id: 3, text: "Could improve response time.", rating: 3 },
      { id: 4, text: "Impressive work!", rating: 5 },
    ],
  };
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img src={profileData.image} alt={profileData.name} />
        <h2>{profileData.name}</h2>
      </div>
      <div className="profile-right">
        <h3>Qualifications:</h3>
        <p>{profileData.qualifications}</p>
        <h3>Offered Services:</h3>
        <ul>
          {profileData.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
        <h3>Bio:</h3>
        <p>{profileData.bio}</p>
        <h3>Contact Information:</h3>
        <p><strong>Phone:</strong> {profileData.phone}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Address:</strong> {profileData.address}</p>
        <h3>Reviews:</h3>
        <div className="review-list">
          {profileData.reviews.map(review => (
            <div key={review.id} className="review">
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
        <button className="load-more-button">Load More Reviews</button>
      </div>
    </div>
  );
};

export default ViewProfile;
