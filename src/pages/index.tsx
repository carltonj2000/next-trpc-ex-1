import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["hello"]);

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;
  return (
    <div className="bg-red-100">
      <h1>hi</h1>
      <code>{JSON.stringify(data, null, 2)}</code>
    </div>
  );
};

export default Home;
