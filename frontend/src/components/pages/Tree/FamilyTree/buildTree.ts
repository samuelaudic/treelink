import { Edge } from "@/interfaces/Edge";
import { Node } from "@/interfaces/Node";
import dagre from "dagre";

function buildTree(
  nodes: Node[],
  edges: Edge[]
): { nodes: Node[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return { ...node, position: { x: position.x, y: position.y } };
  });

  return { nodes: layoutedNodes, edges };
}

export default buildTree;
