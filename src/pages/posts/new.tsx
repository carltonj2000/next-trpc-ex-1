import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["posts.create"], {
    onSuccess({ id }) {
      router.push(`/posts/${id}`);
    },
  });

  const submit = (values: CreatePostInput) => {
    mutate(values);
  };
  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center"
      >
        {error && error.message}
        <h1 className="text-2xl font-bold mb-3">Create Posts</h1>
        <input
          type="text"
          placeholder="Your post title"
          {...register("title")}
          className="input input-bordered"
        />
        <textarea
          placeholder="Post text"
          {...register("body")}
          className="textarea textarea-bordered mt-1 w-full"
        />
        <button className="btn mt-2">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
