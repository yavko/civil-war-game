export interface battle {
  name: string;
	type: "battle" | "siege" | "campaign";
  description: string;
  imageUrl: string;
  involved: string[];
  confederacy: {
    numbers: number;
  };
  union: {
    numbers: number;
  };
  winner: "confederacy" | "union";
}

export interface event {
  name: string;
  description: string;
  imageUrl: string;
  involved: string[];
}

export interface person {
  name: string;
  role: string;
  significance: string;
  who: string;
  imageUrl: string;
}

export interface timeline {
  name: string;
  type: "battle" | "person" | "event" | "northvsouth";
  data?: battle | person | event;
}
