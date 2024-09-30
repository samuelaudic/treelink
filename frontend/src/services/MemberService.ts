import { Member } from "../interfaces/Member";

const API_URL = "http://localhost:3000/api/members";

export const getMembers = async (): Promise<Member[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const saveMember = async (member: Member): Promise<Member> => {
  const method = member.id ? "PUT" : "POST";
  const url = member.id ? `${API_URL}/${member.id}` : API_URL;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });

  return response.json();
};

export const deleteMember = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
