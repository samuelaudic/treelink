import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMembers,
  saveMember,
  updateMember,
  deleteMember,
} from "../services/MemberService";
import { Member } from "../interfaces/Member";

const MEMBERS_QUERY_KEY = ["members"] as const;

// Récupérer la liste des membres
export const useMembers = () => {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: getMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Sauvegarder un membre
export const useSaveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
};

// Mettre à jour un membre
export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
};

// Supprimer un membre
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
};
