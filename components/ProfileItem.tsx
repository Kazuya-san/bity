import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProfileItem = ({ profile, styles }: { profile: any; styles: any }) => {
  return (
    <div className={`${styles.center} flex-col pt-5`}>
      <h1 className="text-4xl">Profile</h1>

      <Image
        src={profile.image as any}
        alt="Picture of the author"
        className="rounded-full"
        width={100}
        height={100}
      />

      <Link href="/profile/[...pid]" as={`/profile/${profile.userId}`}>
        <a className="inline">
          <p>{profile.name}</p>
        </a>
      </Link>
      <p>Email: {profile.email}</p>
      <p>Github Profile: {profile.githubProfile}</p>
      <p>Yotube Channel: {profile.youtubeProfile}</p>
      <div className="flex items-center justify-center">
        Skills:
        {profile.skills.map((skill: string, i: string) => {
          return (
            <div
              key={i}
              className="
            bg-gray-200 
            rounded
            p-2
            m-2
            text-gray-700
            text-sm
            font-semibold
          "
            >
              {skill}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        Liked Categories:
        {profile.likedCategories.map((cat: string, i: string) => {
          return (
            <div
              key={i}
              className="
            bg-gray-200 
            rounded
            p-2
            m-2
            text-gray-700
            text-sm
            font-semibold
          "
            >
              {cat}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileItem;
