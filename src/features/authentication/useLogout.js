import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {logout as logoutApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: logout, isLoading} = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", {replace: true});
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  return {logout, isLoading};
}
