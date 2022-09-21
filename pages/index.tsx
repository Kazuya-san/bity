import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

const Landing: NextPage<{ users: User[]; profile: any }> = ({
  users,
  profile,
}: {
  users: User[];
  profile: any;
}) => {
  // console.log(users);
  console.log(profile);
  return <div>Index</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // const profile = await prisma.profile.findMany({
  //   where: {
  //     userId: session?.user?.id,
  //   },
  // });

  const profile = await prisma.profile.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  if (!profile) {
    return {
      redirect: {
        destination: "/create-profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      users: [],
      profile,
    },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const users = await prisma.user.findMany();
//   return {
//     props: {
//       users,
//     },
//   };
// };

export default Landing;
