import { Handle, Position } from "reactflow";

export const IntermediateNode: React.FC = () => {
  return (
    <div style={{ width: "10px", height: "10px", background: "transparent" }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#fff" }}
        id="from-parents"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#fff" }}
        id="to-children"
      />
    </div>
  );
};
