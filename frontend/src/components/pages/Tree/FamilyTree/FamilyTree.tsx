import { Edge } from "@/interfaces/Edge";
import { Node } from "@/interfaces/Node";
import { getMembers } from "@/services/MemberService";
import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "../CustomNode/CustomNode";
import { IntermediateNode } from "../IntermediateNode/IntermediateNode";
import buildTree from "./buildTree";

const nodeTypes = {
  custom: CustomNode,
  intermediate: IntermediateNode,
};

const FamilyTree = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getMembers();

      // Noeuds
      const generatedNodes = [];
      const unionNodes = new Map();

      members.map((member) => {
        generatedNodes.push({
          id: member.id.toString(),
          type: "custom",
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
            father: member.father,
            mother: member.mother,
            spouse: member.spouse,
          },
          position: { x: 0, y: 0 },
        });

        if (member.fatherId && member.motherId) {
          const unionId = `union-${member.fatherId}-${member.motherId}`;
          if (!unionNodes.has(unionId)) {
            unionNodes.set(unionId, {
              id: unionId,
              type: "custom",
              data: { label: "" },
              position: { x: 0, y: 0 },
            });
          }
        }
      });
      generatedNodes.push(...Array.from(unionNodes.values()));

      // Arêtes
      const generatedEdges = [];

      members.forEach((member) => {
        if (member.fatherId && member.motherId) {
          const unionId = `union-${member.fatherId}-${member.motherId}`;

          generatedEdges.push({
            id: `edge-father-${member.fatherId}-${unionId}`,
            source: member.fatherId.toString(),
            target: unionId,
          });

          generatedEdges.push({
            id: `edge-mother-${member.motherId}-${unionId}`,
            source: member.motherId.toString(),
            target: unionId,
          });

          generatedEdges.push({
            id: `edge-${unionId}-${member.id}`,
            source: unionId,
            target: member.id.toString(),
          });
        }
      });
      generatedEdges.push(...Array.from(unionNodes.values()));

      const { nodes: layoutedNodes, edges: layoutedEdges } = buildTree(
        generatedNodes,
        generatedEdges
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    };

    fetchMembers();
  }, []);

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
