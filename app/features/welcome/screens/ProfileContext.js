import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    basicInfo: {
      name: '',
      occupation: '',
      location: '',
    },
    interestAreas: [],
    bio: '',
    profilePhoto: null,
    experience: '',
  });

  const updateProfileData = (section, data) => {
    setProfileData(prevData => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileData = () => useContext(ProfileContext);