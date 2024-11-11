import { Member } from "../interfaces/Member";

const API_URL = "http://localhost:3000/api/members";

// Fonction pour vérifier le statut des réponses et personnaliser les messages d'erreur
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

export const getMembers = async (): Promise<Member[]> => {
  try {
    const response = await fetch(API_URL);
    checkResponseStatus(response);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    throw error;
  }
};

export const saveMember = async (member: Member): Promise<Member> => {
  try {
    const method = member.id ? "PUT" : "POST";
    const url = member.id ? `${API_URL}/${member.id}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    checkResponseStatus(response);
    return await response.json();
  } catch (error) {
    console.error(
      `Erreur lors de l'enregistrement du membre: ${
        member.id || "nouveau membre"
      }`,
      error
    );
    throw error;
  }
};

export const deleteMember = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    checkResponseStatus(response);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du membre avec ID: ${id}`,
      error
    );
    throw error;
  }
};

export const getMember = async (id: number): Promise<Member> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    checkResponseStatus(response);
    return await response.json();
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du membre avec ID: ${id}`,
      error
    );
    throw error;
  }
};
