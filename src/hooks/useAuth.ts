import { trpc } from "@/providers/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    // onSettled لا onSuccess: حتى لو فشل الطلب (جلسة منتهية مثلًا) نُخرج
    // المستخدم محليًا بدل أن يبدو الزر وكأنه لا يعمل.
    onSettled: () => {
      // clear() يمسح الكاش فورًا. لولاه تبقى بيانات المستخدم القديمة محفوظة
      // (React Query يحتفظ بآخر بيانات ناجحة حتى عند فشل الطلب التالي)،
      // فتقرأها صفحة الدخول وتعيدنا إلى /admin مباشرة.
      queryClient.clear();
      navigate(redirectPath, { replace: true });
    },
  });

  const logout = useCallback(() => logoutMutation.mutate(), [logoutMutation]);

  useEffect(() => {
    if (redirectOnUnauthenticated && !isLoading && !user) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, isLoading, user, navigate, redirectPath]);

  return useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoading,
      error,
      refetch,
      logout,
    }),
    [user, isLoading, error, refetch, logout],
  );
}
