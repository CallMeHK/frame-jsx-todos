export default class h {
  constructor($root, newNode) {
    this.$root = $root;
    this.$state={}
    this.oldNode = null;
    this.newNode = newNode;
  }
  static dom(type, props, children) {
    if (typeof type !== "string") {
      return type(props);
    }
    if (arguments.length > 3) {
      children = [children];
      for (let i = 3; i < arguments.length; i++) {
        children.push(arguments[i]);
      }
    } else if (children !== undefined && children.children) {
      children = [children];
    }

    return {
      type,
      props,
      children
    };
  }

  static createElement(node) {
    if (typeof node === "string") {
      return document.createTextNode(node);
    }

    const $el = document.createElement(node.type);
    if (node.props !== null) {
      Object.keys(node.props).forEach(prop => {
        if (prop.match(/^on/)) {
          $el.addEventListener(prop.replace(/on/,'').toLowerCase(),node.props[prop])
        } else {
          prop === "className"
            ? $el.setAttribute("class", node.props[prop])
            : $el.setAttribute(prop, node.props[prop]);
        }
      });
    }
    if (typeof node.children === "string") {
      $el.innerText = node.children;
    } else if (typeof node.children !== "undefined") {
      node.children
        .map(elt => {
          return h.createElement(elt);
        })
        .forEach(elt => $el.appendChild(elt));
    }
    return $el;
  }

  static changed(node1, node2) {
    const nodeTypeCheck = node1.type !== node2.type;
    let childTypeCheck = false;
    if (
      typeof node1.children !== "object" &&
      node1.children !== node2.children
    ) {
      childTypeCheck = true;
    }
    return nodeTypeCheck || childTypeCheck;
  }

  //  NEED TO QUENE CHANGES, MANY ISSUES OTHERWISE
  static diffQuene($parent, oldNode, newNode, index = 0, diffs = []) {
    // if there is no old node
    if (!oldNode) {
      diffs.push({ method: "add", $parent, $child: null, node: newNode });
    }
    // if there is no new node
    else if (!newNode) {
      diffs.push({
        method: "remove",
        $parent,
        $child: $parent.childNodes[index],
        node: null
      });
    }
    // if new and old do not have the same type OR they are not an array AND are not equivalent
    else if (h.changed(oldNode, newNode)) {
      diffs.push({
        method: "replace",
        $parent,
        $child: $parent.childNodes[index],
        node: newNode
      });
    }
    // if there is a node with a type
    else if (newNode.type && typeof newNode.children === "object") {
      // get the length of both the old node and new node children array
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      // walk through each node
      for (let i = 0; i < newLength || i < oldLength; i++) {
        h.diffQuene(
          $parent.childNodes[index],
          oldNode.children[i],
          newNode.children[i],
          i,
          diffs
        );
      }
    }
    return diffs;
  }

  static differ($parent, oldNode, newNode) {
    let quene = h.diffQuene($parent, oldNode, newNode);
    console.log(quene);
    quene.forEach(elt => {
      if (elt.method === "add") {
        elt.$parent.appendChild(h.createElement(elt.node));
      } else if (elt.method === "remove") {
        elt.$parent.removeChild(elt.$child);
      } else if (elt.method === "replace") {
        elt.$parent.replaceChild(h.createElement(elt.node), elt.$child);
      }
    });
    return quene;
  }

  static createDom($root, newNode) {
    h.differ($root, null, newNode);
    return new h($root, newNode);
  }

  render(newNode) {
    this.oldNode = this.newNode;
    this.newNode = newNode;
    h.differ(this.$root, this.oldNode, this.newNode);
    console.log(this);
  }
}
