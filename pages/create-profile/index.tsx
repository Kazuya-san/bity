import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";

const styles = {
  centerScreen: "flex justify-center items-center h-screen",
  submitBtn:
    "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition m-4",
  center: "flex justify-center items-center flex-col",
  inputStyles:
    "border-2 border-gray-300 bg-white h-10 px-1 pr-1 w-[400px] rounded-lg text-sm focus:outline-none",
  labelSyles: "block text-gray-700 text-sm font-bold mb-2",
};

const CreateProfile: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [likedCategories, setLikedCategories] = useState<string>("");
  const [githubProfile, setGithubProfile] = useState<string>("");
  const [youtubeChannel, setYoutubeChannel] = useState<string>("");
  const [skills, setSkills] = useState<string>("");

  const router: NextRouter = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();

    try {
      const profile = {
        name,
        email,
        likedCategories,
        githubProfile,
        youtubeChannel,
        skills,
      };

      let response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      let json = await response.json();
      console.log(json);

      await router.push("/dashboard");

      console.log("submit");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.center}>
      <h1 className="text-4xl mt-5">Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="name">
            Name
          </label>
          <input
            className={styles.inputStyles}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="email">
            Email
          </label>
          <input
            className={styles.inputStyles}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="githubProfile">
            Github Profile
          </label>
          <input
            className={styles.inputStyles}
            type="text"
            name="githubProfile"
            id="githubProfile"
            value={githubProfile}
            onChange={(e) => setGithubProfile(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="youtubeChannel">
            Youtube Channel
          </label>
          <input
            className={styles.inputStyles}
            type="text"
            name="youtubeChannel"
            id="youtubeChannel"
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="likedCategories">
            Liked Categories
          </label>
          <input
            className={styles.inputStyles}
            type="text"
            name="likedCategories"
            id="likedCategories"
            value={likedCategories}
            onChange={(e) => setLikedCategories(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className={styles.labelSyles} htmlFor="skills">
            Skills
          </label>
          <input
            className={styles.inputStyles}
            type="text"
            name="skills"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
