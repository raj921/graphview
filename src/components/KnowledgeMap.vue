<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

const container = ref<HTMLElement | null>(null);

interface Course {
  id: number | string;
  label: string;
  borderWidth?: number;
  opacity?: number;
  color?: {
    background?: string;
    border?: string;
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

interface Connection {
  from: number | string;
  to: number | string;
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
  hidden?: boolean;
}

// Define the courses data without fixed positions
const nodes = new DataSet<Course>([
  // Main nodes
  { id: 0, label: '0. Foundations' },
  { id: 1, label: '1. Basic ROS2' },
  { id: 2, label: '2. ROS Basics' },
  { id: 3, label: '3. Intermediate ROS2' },
  { id: 4, label: '4. Robotics Theory' },
  { id: 5, label: '5. Navigation ROS2' },
  { id: 7, label: '7. Manipulation' },
  { id: 8, label: '8. Robot Creation' },
  { id: 9, label: '9. Artificial Intelligence' },
  { id: 10, label: '10. ROS Debugging' },
  { id: 11, label: '11. Course of product' },
  { id: 12, label: '12. Web Devel for Robots' },
  { id: 13, label: '13. Simulation' },
  { id: 14, label: '14. Enterprise' },

  // Additional courses
  { id: 'cpp_basics', label: 'C++ Basics for robotics' },
  { id: 'linux', label: 'Linux for robotics' },
  { id: 'python', label: 'Python 3 for robotics' },
  { id: 'tf', label: 'TF in ROS2' },
  { id: 'urdf', label: 'URDF robot modelling ROS2' },
  { id: 'gazebo', label: 'Gazebo Sim with ROS2' },
  { id: 'behavior', label: 'Behavior Trees for ROS2' },
  { id: 'ros2_cpp', label: 'ROS2 Basics in 5 days (C++)' },
  { id: 'ros2_python', label: 'ROS2 Basics in 5 days (Python)' },
  { id: 'ros2_rust', label: 'ROS2 Basics in 3 days (Rust)' },
  { id: 'migration', label: 'ROS1-ROS2 Migration' },
  { id: 'advanced_cpp', label: 'Advanced Modern C++ for robotics' },
  { id: 'intermediate_cpp', label: 'Intermediate ROS2 (C++)' },
  { id: 'intermediate_python', label: 'Intermediate ROS2 (Python)' },
  { id: 'ros2_control', label: 'ROS2 Control' },
  { id: 'ros2_security', label: 'ROS2 Security' },
  { id: 'rtab', label: 'RTAB' },
  { id: 'nav2', label: 'Nav2 Basics' },
  { id: 'nav_advanced', label: 'Nav Advanced' }
]);

// Define the connections
const edges = new DataSet<Connection>([
  // Core path connections
  { from: 0, to: 1 },
  { from: 1, to: 3 },
  { from: 3, to: 5 },
  { from: 5, to: 7 },
  { from: 5, to: 8 },

  // Foundation connections
  { from: 0, to: 'cpp_basics' },
  { from: 0, to: 'linux' },
  { from: 0, to: 'python' },
  { from: 0, to: 2 },

  // Basic ROS2 connections
  { from: 1, to: 'tf' },
  { from: 1, to: 'urdf' },
  { from: 1, to: 'ros2_cpp' },
  { from: 1, to: 'ros2_python' },
  { from: 1, to: 'ros2_rust' },
  { from: 1, to: 'ros2_security' },

  // Intermediate connections
  { from: 3, to: 'behavior' },
  { from: 3, to: 'migration' },
  { from: 3, to: 'advanced_cpp' },
  { from: 3, to: 'intermediate_cpp' },
  { from: 3, to: 'intermediate_python' },
  { from: 3, to: 'ros2_control' },

  // Navigation connections
  { from: 5, to: 'rtab' },
  { from: 5, to: 'nav2' },
  { from: 5, to: 'nav_advanced' },

  // Other connections
  { from: 2, to: 'gazebo' }
]);

onMounted(() => {
  if (container.value) {
    const data = {
      nodes: nodes,
      edges: edges
    };

    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: {
          size: 12,
          color: 'grey',
          face: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',

        },
        borderWidth: 1,
        color: {
          border: '#666666',
          background: 'grey',

          highlight: {
            border: '#FFB74D',
            background: '#FFB74D'
          },
          hover:{
            border: '#FFB74D',
            background: '#FFB74D'
          }
        }
      },
      edges: {
        width: 2,
        color: {
          color: '#999999',
          opacity: 0.8
        },
        smooth: {
          type: 'continuous',
          roundness: 0.2
        }
      },
      physics: {
        enabled: true,
        stabilization: false, // Disable stabilization for continuous motion
        barnesHut: {
          gravitationalConstant: -3000, // Increased gravitationalConstant for more spread out layout
          centralGravity: 0.2, // Increased centralGravity to keep nodes from flying away
          springLength: 80, // Reduced springLength for tighter clusters
          springConstant: 0.03, // Reduced springConstant for softer motion
          damping: 0.2, // Increased damping for smoother, slower motion
          avoidOverlap: 0.5 // Increased avoidOverlap to reduce node overlap
        },
        // solver: 'forceAtlas2Based', // Alternative solver - you can try this too
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true,
        hover: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: true
      }
    };

    // Create the network
    const network = new Network(container.value, data, options);

    // Create a canvas element for drawing the outer circle
    const canvas = container.value.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    let activeCircle: { x: number, y: number, radius: number } | null = null;
    let lastClickedNodeId: string | number | null = null; // ✅ Track last clicked node

    // Store original colors and sizes
    const originalNodeColors = new Map();
    const originalEdgeColors = new Map();
    nodes.forEach((node: Course) => {
      originalNodeColors.set(node.id, structuredClone(node.color) || structuredClone(options.nodes.color));
    });
    edges.forEach((edge: Connection) => {
      originalEdgeColors.set(`${edge.from}-${edge.to}`, structuredClone(edge.color) || structuredClone(options.edges.color));
    });

    // Function to draw the outer circle
    const drawOuterCircle = (x: number, y: number, radius: number) => {
      if (!ctx) return;

      // Draw black border circle
      ctx.beginPath();
      ctx.arc(x, y, radius + 16, 0, 2 * Math.PI);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Handle node click
    network.on('click', (params: { nodes: (string | number)[], pointer: { canvas: { x: number, y: number } } }) => {
      const clickedNodeId = params.nodes[0];

      if (clickedNodeId) {
        // Reset previous node highlighting if a different node is clicked
        if (lastClickedNodeId && lastClickedNodeId !== clickedNodeId) {
          resetHighlighting(); // Call reset function
        }
        lastClickedNodeId = clickedNodeId; // Update last clicked node

        const canvasPosition = network.getPosition(clickedNodeId);
        const scale = network.getScale();

        // Calculate the circle position and size using canvas coordinates
        activeCircle = {
          x: canvasPosition.x,
          y: canvasPosition.y,
          radius: (16 * 0.5) / scale
        };

        // Get connected nodes and edges
        const connectedNodes = new Set<string | number>();
        const connectedEdges = new Set<string>();

        edges.forEach((edge: Connection) => {
          if (edge.from === clickedNodeId) {
            connectedNodes.add(edge.to);
            connectedEdges.add(`${edge.from}-${edge.to}`);
          }
          if (edge.to === clickedNodeId) {
            connectedNodes.add(edge.from);
            connectedEdges.add(`${edge.from}-${edge.to}`);
          }
        });
        connectedNodes.add(clickedNodeId);

        // Update all nodes - blur unconnected nodes
        nodes.forEach((node: Course) => {
          if (node.id === clickedNodeId) {
            // Selected node
            nodes.update({
              id: node.id,
              color: {
                background: '#FFB74D',
                border: '#FFB74D'
              },
              font: {
                color: '#000000'
              },
              size: 16,
              opacity: 1
            });
          } else if (connectedNodes.has(node.id)) {
            // Connected nodes
            nodes.update({
              id: node.id,
              color: {
                background: "rgba(128, 128, 128, 0.3)",
                border: "rgba(128, 128, 128, 0.3)",
              },
              font: {
                color: '#000000'
              },
              size: 16,
              opacity: 1
            });
          } else {
            // Unconnected nodes - completely hidden
            nodes.update({
              id: node.id,
              color: {
                background: 'rgba(128, 128, 128, 0.4)', // ✅ Grey with 40% transparency
                 border: 'rgba(128, 128, 128, 0.4)'
              },
              font: {
                color:'rgba(0, 0, 0, 0.3)'
              },
              size: 16,

            });
          }
        });

        // Update all edges - highlight connected edges, show all edges first then hide unconnected
        edges.forEach((edge: Connection) => {
          edges.update({ // Ensure all edges are initially visible
            ...edge,
            hidden: false
          });
        });
        edges.forEach((edge: Connection) => { // Then selectively hide unconnected ones
          const edgeId = `${edge.from}-${edge.to}`;
          if (connectedEdges.has(edgeId)) {
            edges.update({
            ...edge,
              color: {
                color: '#FFB74D',
                opacity: 1
              },
              width: 2,
              shadow: {
                enabled: true,
                color: '#FFB74D'
              }
            });
          } else {
            edges.update({
            ...edge,
              hidden: true
            });
          }
        });


      } else {
        resetHighlighting();
        activeCircle = null;
        lastClickedNodeId = null; // Reset last clicked node
      }
    });

    function resetHighlighting() { // ✅ Reset highlighting function
      activeCircle = null;
      nodes.forEach((node: Course) => {
        nodes.update({
          id: node.id,
          color: originalNodeColors.get(node.id), // Use stored original color
          font: {
            color: '#333333'
          },
          size: 16,
          opacity: 1
        });
      });
      edges.forEach((edge: Connection) => {
        const edgeId = `${edge.from}-${edge.to}`;
        edges.update({
          ...edge,
          color: originalEdgeColors.get(edgeId) || { // Use stored original edge color, default if not found
            color: '#999999',
            opacity: 0.8
          },
          width: 2,
          hidden: false
        });
      });
    }


    // Add event listener for "afterDrawing" to draw the outer circle
    network.on('afterDrawing', () => {
      if (activeCircle) {
        const { x, y, radius } = activeCircle;
        drawOuterCircle(x, y, radius);
      }
    });

    // Handle zoom events to adjust circle size
    network.on('zoom', () => {
      if (activeCircle) {
        const scale = network.getScale();
        activeCircle.radius = (16 * 0.5) / scale;
      }
    });

    // Handle drag events to move the circle with the node
    network.on('dragStart', () => {
      activeCircle = null;
    });
  }
});
</script>

<template>
  <div class="knowledge-map">
    <h2>Graph view</h2>
    <div ref="container" class="map-container"></div>
  </div>
</template>

<style scoped>
.knowledge-map {
  width: 100%;
  height: 100vh;
  background-color: white;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: white;
}

h2 { /* Basic styling for the heading - adjust as needed */
  text-align: center;
  padding: 20px 0;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: #333;
}
</style>