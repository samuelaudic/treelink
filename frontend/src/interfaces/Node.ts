import { Node as ReactFlowNode } from "reactflow";

export type NodeType = "person" | "intermediate";

interface BaseNodeData {
  label: string;
}

export interface PersonData extends BaseNodeData {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string | null;
  deathDate: string | null;
  father: {
    firstName: string;
    lastName: string;
  } | null;
  mother: {
    firstName: string;
    lastName: string;
  } | null;
  spouse: {
    firstName: string;
    lastName: string;
  } | null;
}

export interface IntermediateData extends BaseNodeData {
  label: string;
}

export type NodeData = PersonData | IntermediateData;

export interface FamilyNode extends ReactFlowNode<NodeData> {
  type: NodeType;
}

export interface PersonNode extends FamilyNode {
  type: "person";
  data: PersonData;
}

export interface IntermediateNode extends FamilyNode {
  type: "intermediate";
  data: IntermediateData;
}
