"use client";
import { createContext, useState } from "react";

export const ProfileImageContext = createContext();

export function ProfileImageProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ProfileImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
}
