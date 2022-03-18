import { useQuery, useMutation, useQueryClient } from "react-query";
import registerService from "../services/register-service";

const useRegisterUser = () => {
  return useMutation((data) => registerService.createUser(data));
};

const useUsers = () => {
  return useQuery(["users"], () => registerService.fetchUsers(), {
    select: (data) => {
      data.map((value) => {
        value.contact_no = value.country_code + value.phone_no;
        return value;
      });
      return data;
    },
  });
};

const useUser = (userId) => {
  return useQuery(["user", userId], () => registerService.fetchUser(userId), {
    enabled: !!userId,
  });
};

const useUpdateUser = () => {
  return useMutation((data) => {
    return registerService.updateUser(data);
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => registerService.deleteUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export { useRegisterUser, useUsers, useUser, useUpdateUser, useDeleteUser };
