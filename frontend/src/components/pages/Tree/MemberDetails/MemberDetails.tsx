import { Member } from "@/interfaces/Member";
import React from "react";

interface MemberDetailsProps {
  selectedMember: Member;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ selectedMember }) => {
  return (
    <>
      <div>
        {selectedMember && (
          <>
            <h2 className="text-lg font-semibold mb-2">Détails du membre</h2>
            <div className="flex items-center space-x-2">
              <span>{selectedMember.firstName}</span>
              <span>{selectedMember.lastName}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MemberDetails;
