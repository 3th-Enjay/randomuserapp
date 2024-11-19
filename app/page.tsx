import React from 'react';
import Image from 'next/image';
import { FiPhone, FiMail, FiMapPin, FiUser } from 'react-icons/fi';

interface Profile {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
}

async function fetchProfileData(): Promise<Profile> {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data.results[0];
}

export default async function ProfilePage() {
  let profile: Profile | null = null;

  try {
    profile = await fetchProfileData();
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-200 to-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-gradient-to-t from-blue-500 to-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <Image
              src={profile.picture.large}
              alt={`${profile.name.first} ${profile.name.last}`}
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4">{`${profile.name.title} ${profile.name.first} ${profile.name.last}`}</h2>
            <p className="text-sm text-gray-600">{profile.gender}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <FiMail className="text-blue-500" size={20} />
              <p className="text-gray-700">{profile.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-blue-500" size={20} />
              <p className="text-gray-700">{profile.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <FiMapPin className="text-blue-500" size={20} />
              <p className="text-gray-700">
                {`${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state}, ${profile.location.country}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
