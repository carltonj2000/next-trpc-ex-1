import { useRouter } from "next/router";
import Error from "next/error";
import { trpc } from "../../utils/trpc";

function Post() {
  const router = useRouter();
  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(["posts.post", { postId }]);

  if (isLoading) return <p>Loading Post</p>;
  if (!data) return <Error statusCode={404} />;
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div>
        <h1 className="text-xl mb-3 py-1 px-2 text-center font-bold">
          {data?.title}
        </h1>
        <p className="border-2 border-gray-100 rounded-md p-1">{data?.body}</p>
      </div>
    </div>
  );
}

export default Post;
