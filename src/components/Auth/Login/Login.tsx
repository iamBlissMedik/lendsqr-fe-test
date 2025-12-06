"use client";
import { Controller, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import Image from "next/image";
import { InputField } from "../../InputField/InputField";
import { PasswordField } from "../../InputField/PasswordField";
import Button from "../../ui/Button/Button";
import { LoginFormValues, loginSchema } from "@/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
type FormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") ?? "/users";
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: LoginFormValues) => {
    document.cookie = `auth=true; path=/;`;
    router.push(callbackUrl);
  };
  return (
    <div className={styles["login-container"]}>
      <Image
        src="/sign-in.svg"
        alt="signin"
        width={600}
        height={338}
        className={styles["signin-img"]}
      />
      <form
        className={styles["form-container"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <div className={styles["inputfield-container"]}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                placeholder="Email"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField
                placeholder="Password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
              />
            )}
          />
          <p className={styles["forgot-password"]}>Forgot PASSWORD?</p>
        </div>
        <Button
          style={{
            marginTop: "30px",
          }}
          fullWidth
          disabled={!isValid}
        >
          log in
        </Button>
      </form>
    </div>
  );
}
