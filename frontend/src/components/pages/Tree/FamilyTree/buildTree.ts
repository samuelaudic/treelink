import dagre from "dagre";
import { Edge } from "@/interfaces/Edge";
import { FamilyNode } from "@/interfaces/Node";

/**
 * Génère un layout en arbre généalogique avec DagreJS.
 * @param nodes - Liste des nœuds.
 * @param edges - Liste des connexions.
 * @param options - Options pour personnaliser le layout et les dimensions des différents types de nœuds (facultatif).
 * @returns Un objet contenant les nœuds avec leur position mise à jour et les arêtes.
 */
function buildTree(
  nodes: FamilyNode[],
  edges: Edge[],
  options?: {
    personNodeWidth?: number;
    personNodeHeight?: number;
    intermediateNodeWidth?: number;
    intermediateNodeHeight?: number;
    rankdir?: "TB" | "LR";
    marginX?: number;
    marginY?: number;
  }
): { nodes: FamilyNode[]; edges: Edge[] } {
  // Paramètres par défaut pour chaque type de nœud
  const personNodeWidth = options?.personNodeWidth ?? 150;
  const personNodeHeight = options?.personNodeHeight ?? 50;
  const intermediateNodeWidth = options?.intermediateNodeWidth ?? 10;
  const intermediateNodeHeight = options?.intermediateNodeHeight ?? 10;
  const rankdir = options?.rankdir ?? "TB";
  const marginX = options?.marginX ?? 50;
  const marginY = options?.marginY ?? 50;

  // Initialisation du graphe Dagre
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir, marginx: marginX, marginy: marginY });

  // Ajout des nœuds au graphe selon leur type
  nodes.forEach((node) => {
    let width, height;
    if (node.type === "person") {
      width = personNodeWidth;
      height = personNodeHeight;
    } else if (node.type === "intermediate") {
      width = intermediateNodeWidth;
      height = intermediateNodeHeight;
    } else {
      width = personNodeWidth;
      height = personNodeHeight;
    }

    if (!node.id) {
      console.warn("Un nœud sans identifiant a été ignoré", node);
      return;
    }
    dagreGraph.setNode(node.id, { width, height });
  });

  // Ajout des arêtes en vérifiant que les nœuds existent
  edges.forEach((edge) => {
    if (!dagreGraph.hasNode(edge.source)) {
      console.warn(`Nœud source ${edge.source} non trouvé pour l'arête`, edge);
      return;
    }
    if (!dagreGraph.hasNode(edge.target)) {
      console.warn(`Nœud cible ${edge.target} non trouvé pour l'arête`, edge);
      return;
    }
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calcul du layout avec gestion d'erreur
  try {
    dagre.layout(dagreGraph);
  } catch (error) {
    console.error("Erreur lors du calcul du layout avec DagreJS:", error);
  }

  // Mise à jour des positions des nœuds
  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);
    if (!position) {
      console.warn(`Position non trouvée pour le nœud ${node.id}`);
      return { ...node, position: { x: 0, y: 0 } };
    }
    return { ...node, position: { x: position.x, y: position.y } };
  });

  return { nodes: layoutedNodes, edges };
}

export default buildTree;
