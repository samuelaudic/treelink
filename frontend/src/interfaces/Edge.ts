interface Edge {
  id: string;
  source: string;
  target: string;
  type?: "smoothstep" | "straight";
}

export type { Edge };
