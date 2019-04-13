/** @jsx h.dom */
// forked!
import h from "./frame";
import "./styles.css";

let $root = document.getElementById("app");
let $state = {
  listInternal: ["beer", "cheese", "soup"],
  get list() {
    return this.listInternal;
  },
  set list(val) {
    this.listInternal = val;
    dom.render(<App />);
  }
};

const App = props => {

  const onEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        $state.list = [...$state.list, e.target.value]
        e.target.value = ''
    }
  }

  return (
    <div>
      <h2>List</h2>
      <input onKeyup={onEnter} />
      <ul>
        {$state.list.map(elt => (
          <li>{elt}</li>
        ))}
      </ul>
    </div>
  );
};

let dom = h.createDom($root, <App />);

console.log(dom);
