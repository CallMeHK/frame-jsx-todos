/** @jsx h.dom */
// forked!
import h from "./frame";
import "./styles.css";

let $root = document.getElementById("app");
let $state;

const App = props => {
  if (!$state) {
    $state = {
      internal: { list: ["beer", "cheese", "soup"] },
      get get() {
        return this.internal;
      },
      set set(val) {
        this.internal = val;
        dom.render(<App />);
      }
    };
  }

  const onClick = () => {
    $state.set = { ...$state.get, list: [...$state.get.list, "beer"] };
  };

  return (
    <div>
      <h2>State</h2>
      <button onClick={onClick}>Add beer</button>
      <ul>
        {$state.get.list.map(elt => (
          <li>{elt}</li>
        ))}
      </ul>
    </div>
  );
};

let dom = h.createDom($root, <App />);

console.log(dom);
