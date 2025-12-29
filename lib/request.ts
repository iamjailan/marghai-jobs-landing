import { logout } from "@/store/authSlice";
import { RootState, store } from "@/store/store";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiRequest = async ({
  body,
  method = "GET",
  url,
  isAuth = false,
}: {
  body?: BodyInit;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  isAuth?: boolean;
}) => {
  try {
    let response;
    const state = store.getState() as RootState;

    if (isAuth) {
      response = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.statusCode === 401 && state.auth.isLoggedIn) {
          store.dispatch(logout());
          window.location.href = "/";
          return;
        }

        throw errorData.message || "An unexpected error occurred";
      }

      const data = await response.json();
      return data;
    }

    response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw errorData.message || "An unexpected error occurred";
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "string") {
      throw new Error(error);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
