import { useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import  createUser from "../../amplify/create-user/resource";

const StudentView = () => {
  const { user, signOut } = useAuthenticator();
  const [userLocation, setUserLocation]: any = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
            // what to do once we have the position
        },
        (error) => {
            // display an error if we cant get the users position
            console.log('Error getting user location:', error);
        }
    );  
    console.log('Getting the user location...');
  } else {
      // display an error if not supported
      console.log('Geolocation is not supported by this browser.');
  }
  };

  function submitAttendance() {
    getUserLocation();
    const username = user?.signInDetails?.loginId;
    console.log(username)
  }

  function test() {
    let test = createUser;
    console.log(test);
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={submitAttendance}>Confirm Attendance</button>
      <button onClick={test}>Test</button>
      {userLocation && (
      <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
      </div>)}
     </main>
  );
}

export default StudentView