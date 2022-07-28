import type { NextPage } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";

const Home: NextPage = () => {
  const user = useUserContext();

  if (!user) return <LoginForm />;

  return (
    <div className="flex justify-center items-center h-full">
      <Link href="/posts/new">Create Post</Link>
    </div>
  );
};

export default Home;
