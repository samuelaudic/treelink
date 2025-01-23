import { Member } from "../interfaces/Member";

const API_URL = "http://localhost:3000/api/members";

const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout = 5000
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(
        () => reject(new Error("Timeout dépassé pour la requête")),
        timeout
      )
    ),
  ]);
};

const checkResponseStatus = (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Erreur HTTP! Statut : ${response.status}`;
    switch (response.status) {
      case 400:
        errorMessage = "Requête incorrecte.";
        break;
      case 404:
        errorMessage = "Ressource non trouvée.";
        break;
      case 500:
        errorMessage = "Erreur interne du serveur.";
        break;
      default:
        errorMessage = `Erreur inattendue : ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response;
};

const transformMemberDates = (member: Member): Member => ({
  ...member,
  birthDate: member.birthDate ? new Date(member.birthDate) : null,
  deathDate: member.deathDate ? new Date(member.deathDate) : null,
  createdAt: new Date(member.createdAt),
});

const getMemberById = async (id: number): Promise<Member | null> => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      method: "GET",
    });
    checkResponseStatus(response);
    const member: Member = await response.json();
    return transformMemberDates(member);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du membre avec ID: ${id}`,
      error
    );
    return null;
  }
};

export const getMembers = async (): Promise<Member[]> => {
  try {
    const response = await fetchWithTimeout(API_URL, { method: "GET" });
    checkResponseStatus(response);
    const members: Member[] = await response.json();

    const membersWithFamilyInfo = await Promise.all(
      members.map(async (member) => {
        const updatedMember = await transformMemberDates(member);

        if (updatedMember.fatherId) {
          updatedMember.father = await getMemberById(updatedMember.fatherId);
        }

        if (updatedMember.motherId) {
          updatedMember.mother = await getMemberById(updatedMember.motherId);
        }

        if (updatedMember.spouseId) {
          updatedMember.spouse = await getMemberById(updatedMember.spouseId);
        }

        return updatedMember;
      })
    );

    return membersWithFamilyInfo;
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    throw new Error("Impossible de récupérer la liste des membres.");
  }
};

export const saveMember = async (
  member: Partial<Member> & { id?: number }
): Promise<Member> => {
  try {
    const method = member.id ? "PUT" : "POST";
    const url = member.id ? `${API_URL}/${member.id}` : API_URL;

    const response = await fetchWithTimeout(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    checkResponseStatus(response);
    const savedMember: Member = await response.json();
    return transformMemberDates(savedMember);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    throw new Error("Impossible de sauvegarder le membre.");
  }
};

export const deleteMember = async (id: number): Promise<void> => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    checkResponseStatus(response);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du membre avec ID: ${id}`,
      error
    );
    throw new Error("Impossible de supprimer le membre.");
  }
};

export const updateMember = async (member: Member): Promise<Member> => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${member.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    checkResponseStatus(response);
    const updatedMember: Member = await response.json();
    return transformMemberDates(updatedMember);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw new Error("Impossible de mettre à jour le membre.");
  }
};
