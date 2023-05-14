type Node = {
  name: string;
  children?: Node[];
};

function createNode(name: string, children?: Node[]): Node {
  return {
    name,
    children,
  };
}

function depthFirstSearch(rootNode: Node, goal: string): string[] {
  const result: string[] = [];

  function tranverse(node: Node) {
    if (result.includes(node.name)) {
      return false;
    }

    result.push(node.name);
    if (node.name === goal) {
      return true;
    }

    if (!node.children) {
      return false;
    }
    for (const childNode of node.children) {
      if (tranverse(childNode)) {
        return true;
      }
    }
    return false;
  }

  tranverse(rootNode);
  return result;
}

const nodeA = createNode("A");
const nodeB = createNode("B");
const nodeC = createNode("C");
const nodeD = createNode("D");
const nodeE = createNode("E");
const nodeF = createNode("F");
const nodeG = createNode("G");
const nodeH = createNode("H");
const nodeI = createNode("I");
const nodeJ = createNode("J");
const nodeK = createNode("K");
const nodeL = createNode("L");

nodeA.children = [nodeB, nodeD, nodeE];
nodeB.children = [nodeC];
nodeD.children = [nodeC, nodeG, nodeH];
nodeG.children = [nodeI, nodeJ];
nodeH.children = [nodeK];
nodeE.children = [nodeF];
nodeF.children = [nodeL];

console.log(depthFirstSearch(nodeA, "K"));
