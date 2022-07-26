import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }
  return (
    <div className="prose flex flex-col gap-1 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 items-center mb-9"
      >
        {error && (
          <p className="text-red-800 bg-red-100 px-4 py-2">{error.message}</p>
        )}

        <h1>Register</h1>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register("email")}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="name"
          {...register("name")}
          className="input input-bordered"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
}

export default RegisterPage;
