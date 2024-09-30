import React, { createContext, useState } from "react";

// Create context for profile image
export const ProfileImageContext = createContext();

// Profile Image Provider to wrap your app
export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null); // Initial state for profile image

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};
