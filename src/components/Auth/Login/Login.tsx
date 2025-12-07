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

/**
 * Login Component
 *
 * Handles user authentication with email and password validation.
 * Integrates with React Hook Form for form state management and Zod for schema validation.
 *
 * Features:
 * - Email and password validation using Zod schema
 * - Real-time form validation (onChange mode)
 * - Loading state management during submission
 * - Callback URL support for redirecting after login
 * - Accessibility features (aria-label, error linking)
 * - Responsive design with mobile support
 * - Cookie-based session management
 *
 * Validation Rules:
 * - Email: Valid email format required
 * - Password: Minimum 8 characters required
 *
 * @component
 * @example
 * // Basic login form
 * <Login />
 *
 * @example
 * // With callback URL in query params
 * // URL: /auth/login?callbackUrl=/dashboard
 * <Login />
 *
 * Flow:
 * 1. User enters email and password
 * 2. Form validates in real-time
 * 3. Submit button enables when valid
 * 4. On submit, sets auth cookie
 * 5. Redirects to callback URL or dashboard
 *
 * @returns Rendered login form component
 */
export default function Login() {
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") ?? "/users";
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  /**
   * Handles form submission
   * Sets auth cookie and redirects to callback URL
   *
   * @param formData - Validated login form data
   */
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
        aria-label="Login form"
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
          <a
            href="#"
            className={styles["forgot-password"]}
            aria-label="Forgot your password"
          >
            Forgot PASSWORD?
          </a>
        </div>
        <Button
          type="submit"
          style={{
            marginTop: "30px",
          }}
          fullWidth
          disabled={!isValid}
          loading={isSubmitting}
          ariaLabel={isSubmitting ? "Logging in" : "Log in"}
        >
          log in
        </Button>
      </form>
    </div>
  );
}
