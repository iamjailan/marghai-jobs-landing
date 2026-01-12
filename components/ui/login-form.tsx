"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux";
import { useCreateAccount, useLoginAccount } from "@/query/hooks";
import { setLoginToken } from "@/store/authSlice";
import { useI18n } from "@/lib/i18n";

type LoginFormData = {
  email: string;
  password: string;
  company: string;
};

type LoginFormProps = React.ComponentProps<"div"> & {
  mode?: "signin" | "signup";
};

export function LoginForm({
  className,
  mode = "signin",
  ...props
}: LoginFormProps) {
  const { t, isRTL } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const dispatch = useAppDispatch();
  const useAccount = useCreateAccount();
  const loginAccount = useLoginAccount();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    if (mode === "signup") {
      useAccount.mutate(
        {
          email: data.email,
          first_name: data.company,
          last_name: data.company,
          company: data.company,
          password: data.password,
        },
        {
          onSuccess: (res) => {
            router.push("/post");
            dispatch(setLoginToken(res?.token?.access_token));
          },
        }
      );
    } else {
      loginAccount.mutate(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (res) => {
            dispatch(setLoginToken(res?.token?.access_token));
            router.push("/post");
          },
        }
      );
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      dir={isRTL ? "rtl" : "ltr"}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "signin" ? t("login.loginTitle") : t("login.signupTitle")}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? t("login.loginDescription")
              : t("login.signupDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t("login.email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@marghai.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: t("login.emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("login.invalidEmail"),
                    },
                  })}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="company">
                    {t("login.company")}
                  </FieldLabel>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Wadan Group of companies"
                    aria-invalid={errors.company ? "true" : "false"}
                    {...register("company", {
                      required: t("login.companyRequired"),
                    })}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.company.message}
                    </p>
                  )}
                </Field>
              )}

              <Field>
                <div
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <FieldLabel htmlFor="password">
                    {t("login.password")}
                  </FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </a> */}
                </div>

                <Input
                  id="password"
                  type="password"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: t("login.passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("login.passwordMinLength"),
                    },
                  })}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="cursor-pointer disabled:cursor-not-allowed"
                  disabled={loginAccount.isPending || useAccount.isPending}
                >
                  {loginAccount.isPending || useAccount.isPending
                    ? mode === "signin"
                      ? t("login.loggingIn")
                      : t("login.signingUp")
                    : mode === "signin"
                    ? t("login.login")
                    : t("login.signup")}
                </Button>
                <FieldDescription className="text-center">
                  {mode === "signin" ? (
                    <>
                      {t("login.dontHaveAccount")}{" "}
                      <Link href="/signup">{t("login.signUpLink")}</Link>
                    </>
                  ) : (
                    <>
                      {t("login.alreadyHaveAccount")}{" "}
                      <Link href="/login">{t("login.loginLink")}</Link>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>

          {loginAccount.isError && (
            <p className="mt-1 text-sm text-center text-destructive">
              {loginAccount.error.message}
            </p>
          )}

          {useAccount.isError && (
            <p className="mt-1 text-sm text-center text-destructive">
              {useAccount.error.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
