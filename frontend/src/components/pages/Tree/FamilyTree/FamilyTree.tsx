import { useEffect, useState } from "react";
import ReactFlow, { Background, ConnectionLineType, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "../CustomNode/CustomNode";
import { IntermediateNode } from "../IntermediateNode/IntermediateNode";
import buildTree from "./buildTree";
import { FamilyNode } from "@/interfaces/Node";
import { Edge } from "@/interfaces/Edge";
import { Member } from "@/interfaces/Member";

const nodeTypes = {
  person: CustomNode,
  intermediate: IntermediateNode,
};

interface FamilyTreeProps {
  members: Member[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ members }) => {
  const [nodes, setNodes] = useState<FamilyNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const generatedNodes: FamilyNode[] = [];
    const generatedEdges: Edge[] = [];

    // Conversion de chaque membre en nœud de type "person"
    members.forEach((member) => {
      generatedNodes.push({
        id: member.id.toString(),
        type: "person",
        data: {
          label: `${member.firstName + " " + member.lastName}`,
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
        position: { x: 0, y: 0 },
      });
    });

    // Conversion des relations en arêtes
    members.forEach((member) => {
      if (member.father) {
        generatedEdges.push({
          id: `edge-${member.id}-${member.father.id}`,
          source: member.id.toString(),
          target: member.father.id.toString(),
        });
      }
      if (member.mother) {
        generatedEdges.push({
          id: `edge-${member.id}-${member.mother.id}`,
          source: member.id.toString(),
          target: member.mother.id.toString(),
        });
      }
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = buildTree(
      generatedNodes,
      generatedEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [members]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FamilyTree;
