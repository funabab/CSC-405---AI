type Node = {
  name: string;
  parent?: Node;
  children?: Node[];
  setParent: (node: Node) => Node;
  setChildren: (...args: Node[]) => Node;
};

type SearchResult = {
  searchingPath: string[];
  solutionPath: string[];
};

function createNode(name: string): Node {
  return {
    name,
    setParent(node) {
      this.parent = node;
      return this;
    },
    setChildren(...children) {
      this.children = children;
      return this;
    },
  };
}

function backtrace(startNode: Node): string[] {
  let node: Node | undefined = startNode;
  const result: string[] = [];

  while (node) {
    result.unshift(node.name);
    node = node.parent;
  }

  return result;
}

function depthFirstSearch(rootNode: Node, goal: string): SearchResult {
  const visitedNodes: Node[] = [rootNode];
  const nodeStack: Node[] = [rootNode];
  const searchingPath: string[] = [];
  let reachedGoal = false;

  while (nodeStack.length > 0 && !reachedGoal) {
    const node = nodeStack.pop();
    searchingPath.push(node!.name);

    if (node?.children && node.children.length > 0) {
      for (const childNode of node.children) {
        if (!visitedNodes.includes(childNode)) {
          visitedNodes.push(childNode);
          nodeStack.push(childNode);

          if (childNode.name === goal) {
            searchingPath.push(childNode.name);
            reachedGoal = true;
            break;
          }
        }
      }
    }
  }

  const solutionPath =
    visitedNodes.length > 1 ? backtrace(visitedNodes.at(-1)!) : [];

  return { searchingPath, solutionPath };
}

function breathFirstSearch(rootNode: Node, goal: string): SearchResult {
  const visitedNodes: Node[] = [rootNode];
  const nodeQueue: Node[] = [rootNode];
  const searchingPath: string[] = [];
  let reachedGoal = false;

  while (nodeQueue.length > 0 && !reachedGoal) {
    const node = nodeQueue.shift();
    searchingPath.push(node!.name);

    if (node?.children && node.children.length > 0) {
      for (const childNode of node.children) {
        if (!visitedNodes.includes(childNode)) {
          visitedNodes.push(childNode);
          nodeQueue.push(childNode);

          if (childNode.name === goal) {
            searchingPath.push(childNode.name);
            reachedGoal = true;
            break;
          }
        }
      }
    }
  }

  const solutionPath =
    visitedNodes.length > 1 ? backtrace(visitedNodes.at(-1)!) : [];

  return { searchingPath, solutionPath };
}

const nodeA = createNode("A");
const nodeB = createNode("B").setParent(nodeA);
const nodeC = createNode("C").setParent(nodeB);
const nodeD = createNode("D").setParent(nodeA);
const nodeE = createNode("E").setParent(nodeA);
const nodeF = createNode("F").setParent(nodeE);
const nodeG = createNode("G").setParent(nodeD);
const nodeH = createNode("H").setParent(nodeD);
const nodeI = createNode("I").setParent(nodeG);
const nodeJ = createNode("J").setParent(nodeG);
const nodeK = createNode("K").setParent(nodeH);
const nodeL = createNode("L").setParent(nodeF);

nodeA.setChildren(nodeB, nodeD, nodeE);
nodeB.setChildren(nodeC);
nodeD.setChildren(nodeC, nodeG, nodeH);
nodeG.setChildren(nodeI, nodeJ);
nodeH.setChildren(nodeK);
nodeE.setChildren(nodeF);
nodeF.setChildren(nodeL);

console.log("dfs", "->", depthFirstSearch(nodeA, "K"));
console.log("bfs", "->", breathFirstSearch(nodeA, "K"));
