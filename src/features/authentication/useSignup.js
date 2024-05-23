import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup() {
  const {mutate: signup, isLoading} = useMutation({
    mutationFn: signupApi,
    mutationKey: ["user"],
    onSuccess: data => {
      console.log(data);
      toast.success("Account successfully created! Please verify the new account from the user's email address.");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("There was a problem signing the user");
    }
  });

  return {signup, isLoading};
}
