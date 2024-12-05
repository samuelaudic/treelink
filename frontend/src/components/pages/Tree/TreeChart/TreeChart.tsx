import { Member } from "@/interfaces/Member";
import React from "react";

interface TreeChartProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
}

interface nodeProps {
  name: string;
  attributes: {
    Gender: string;
    Birth: string;
  };
  children: nodeProps[];
}

const TreeChart: React.FC<TreeChartProps> = ({ members, onSelectMember }) => {
  // Fonction pour construire les données de l'arbre
  const buildTreeData = (members: Member[]) => {
    const rootMember = members.find(
      (member) => !member.father && !member.mother
    );

    const buildNode = (member: Member): nodeProps => ({
      name: `${member.firstName} ${member.lastName}`,
      attributes: {
        Gender: member.gender,
        Birth: member.birthDate?.toLocaleDateString() ?? "Unknown",
      },
      children: members
        .filter(
          (child) =>
            child.fatherId === member.id || child.motherId === member.id
        )
        .map(buildNode),
    });

    return rootMember ? buildNode(rootMember) : null;
  };

  const treeData = buildTreeData(members);

  if (!treeData) {
    return <p>Impossible de construire l'arbre généalogique.</p>;
  }

  return (
    <div className="tree-container">
      <TreeNode
        data={treeData}
        orientation="vertical"
        translate={{ x: 400, y: 100 }}
        onClick={(nodeData) => {
          const member = members.find(
            (member) =>
              member.firstName + " " + member.lastName === nodeData.name
          );
          if (member) onSelectMember(member);
        }}
      />
    </div>
  );
};

export default TreeChart;
