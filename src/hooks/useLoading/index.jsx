import { LoadingContext } from "@/context/LoadingContext";
import { useContext } from "react";

export const useLoading = () => {
  const loading = useContext(LoadingContext);
  if (!loading) {
    throw new Error("useLoading phải được dùng bên trong <LoadingProvider>");
  }
  return loading;
};
