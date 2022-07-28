import Link from "next/link";
import { trpc } from "../../utils/trpc";

function Posts() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No Posts!</p>;
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <span className="font-bold mr-2">{p.title}</span>

            <Link href={`/posts/${p.id}`}>
              <span className="italic">read more ...</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
