import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session) {
    // return <PublicProfile />
  }

  return <main></main>;
};

export default ProfilePage;
