import Login from "@/components/Auth/Login/Login";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
