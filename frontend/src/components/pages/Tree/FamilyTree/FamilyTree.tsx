// FamilyTree.tsx
import { Node } from "@/interfaces/Node";
import { Edge } from "@/interfaces/Edge";
import { Member } from "@/interfaces/Member";
import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "../CustomNode/CustomNode";
import buildTree from "./buildTree";

const nodeTypes = {
  custom: CustomNode,
};

interface FamilyTreeProps {
  members: Member[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ members }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Construire les nœuds
    const generatedNodes = members.map((member) => ({
      id: member.id.toString(),
      label: `${member.firstName} ${member.lastName}`,
      type: "custom", // Type de nœud personnalisé
      data: {
        label: `${member.firstName} ${member.lastName}`,
        firstName: member.firstName,
        lastName: member.lastName,
        gender: member.gender,
        birthDate: member.birthDate
          ? member.birthDate.toLocaleDateString()
          : null,
        deathDate: member.deathDate
          ? member.deathDate.toLocaleDateString()
          : null,
        father: {
          firstName: member.father?.firstName || "N/A",
          lastName: member.father?.lastName || "N/A",
        },
        mother: {
          firstName: member.mother?.firstName || "N/A",
          lastName: member.mother?.lastName || "N/A",
        },
        spouse: {
          firstName: member.spouse?.firstName || "N/A",
          lastName: member.spouse?.lastName || "N/A",
        },
      },
      position: { x: 0, y: 0 }, // temp
    }));

    // Construire les arêtes
    const generatedEdges = members.flatMap((member) => {
      const edges = [];
      if (member.fatherId) {
        edges.push({
          id: `e${member.fatherId}-${member.id}`,
          source: member.fatherId.toString(),
          target: member.id.toString(),
        });
      }
      if (member.motherId) {
        edges.push({
          id: `e${member.motherId}-${member.id}`,
          source: member.motherId.toString(),
          target: member.id.toString(),
        });
      }
      return edges;
    });

    // Positionnement hiérarchique
    const { nodes: layoutedNodes, edges: layoutedEdges } = buildTree(
      generatedNodes,
      generatedEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [members]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FamilyTree;
