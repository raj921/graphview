declare module 'vis-network' {
  export interface Node {
    id: string | number;
    label: string;
    opacity?: number;
    color?: {
      border?: string;
      background?: string;
      highlight?: {
        border?: string;
        background?: string;
      };
      hover?: {
        border?: string;
        background?: string;
      };
    };
    font?: {
      color?: string;
      size?: number;
      face?: string;
      bold?: boolean | {
        color?: string;
        size?: number;
      };
    };
    size?: number;
    shadow?: {
      enabled?: boolean;
      color?: string;
      size?: number;
      x?: number;
      y?: number;
    };
  }

  export interface Edge {
    from: string | number;
    to: string | number;
    color?: {
      color?: string;
      opacity?: number;
      highlight?: string;
      hover?: string;
    };
    width?: number;
    shadow?: {
      enabled?: boolean;
      color?: string;
    };
  }

  export interface Options {
    nodes?: {
      shape?: string;
      size?: number;
      font?: {
        size?: number;
        color?: string;
        face?: string;
        bold?: {
          color?: string;
          size?: number;
        };
      };
      borderWidth?: number;
      color?: {
        border?: string;
        background?: string;
        highlight?: {
          border?: string;
          background?: string;
        };
        hover?: {
          border?: string;
          background?: string;
        };
      };
      shadow?: {
        enabled?: boolean;
        color?: string;
        size?: number;
        x?: number;
        y?: number;
      };
    };
    edges?: {
      width?: number;
      color?: {
        color?: string;
        opacity?: number;
        highlight?: string;
        hover?: string;
      };
      smooth?: {
        type?: string;
        roundness?: number;
        forceDirection?: string;
      };
      hoverWidth?: number;
    };
    physics?: {
      enabled?: boolean;
      barnesHut?: {
        gravitationalConstant?: number;
        centralGravity?: number;
        springLength?: number;
        springConstant?: number;
        damping?: number;
        avoidOverlap?: number;
      };
    };
    interaction?: {
      dragNodes?: boolean;
      dragView?: boolean;
      zoomView?: boolean;
      hover?: boolean;
      hoverConnectedEdges?: boolean;
      selectConnectedEdges?: boolean;
      navigationButtons?: boolean;
      keyboard?: boolean;
    };
  }

  export class Network {
    constructor(
      container: HTMLElement,
      data: { nodes: any; edges: any },
      options?: Options
    );
    on(event: string, callback: (params: any) => void): void;
    getPosition(nodeId: string | number): { x: number; y: number };
    getScale(): number;
    canvasToDOM(position: { x: number; y: number }): { x: number; y: number };
  }
}

declare module 'vis-data' {
  export class DataSet<T = any> {
    constructor(data?: T[]);
    add(data: T | T[]): void;
    update(data: Partial<T> | Partial<T>[]): void;
    remove(id: string | number | (string | number)[]): void;
    forEach(callback: (item: T) => void): void;
  }

  export type Edge = import('vis-network').Edge;
} 