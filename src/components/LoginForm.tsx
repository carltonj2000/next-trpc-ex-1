import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const [verified, verifiedSet] = useState({});
  const { error, isLoading } = trpc.useQuery(["users.verify-otp", { hash }], {
    onSuccess: (data) => {
      verifiedSet(data);
    },
  });

  const redirect = verified?.redirect?.includes("login")
    ? "/"
    : verified?.redirect || "/";
  console.log("redirect", redirect);
  // router.push(redirect );

  return (
    <div>
      <h1>Verification</h1>
      {error && <p className="bg-red-100">{error.message}</p>}
      {isLoading ? (
        <p>Inprogress</p>
      ) : Object.keys(verified).length === 0 ? (
        <p>Failed</p>
      ) : (
        <p>Verified</p>
      )}
    </div>
  );
}

function LoginForm() {
  const [success, successSet] = useState(false);
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      successSet(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    console.log("onSub");
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <div className="prose flex flex-col gap-1 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 items-center mb-10"
      >
        {error && (
          <p className="text-red-800 bg-red-100 px-4 py-2">{error.message}</p>
        )}
        {success && (
          <p className="text-green-800 bg-green-100 px-4 py-2">
            Check Your Email
          </p>
        )}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register("email")}
          className="input input-bordered"
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
  );
}

export default LoginForm;
