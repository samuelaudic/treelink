import dagre from "dagre";
import { Edge } from "@/interfaces/Edge";
import { FamilyNode } from "@/interfaces/Node";

/**
 * Génère un arbre généalogique à partir de nœuds et d'arêtes
 * @param nodes - Personnes
 * @param edges - Connexions
 * @returns { nodes: FamilyNode[], edges: Edge[] }
 */
function buildTree(
  nodes: FamilyNode[],
  edges: Edge[]
): { nodes: FamilyNode[]; edges: Edge[] } {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: "TB",
    nodesep: 180,
    ranksep: 120,
    marginx: 50,
    marginy: 50,
  });

  const NODE_WIDTH = 180;
  const NODE_HEIGHT = 60;

  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
      graph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const position = graph.node(node.id);
    return {
      ...node,
      position: {
        x: position.x,
        y: position.y,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export default buildTree;
