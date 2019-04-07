/** @jsx h.dom */
// forked!
import h from "./frame";
import "./styles.css";
let $root = document.getElementById("app");



const Item = props => (
  <li style="display:flex;width:150px;justify-content:space-between">
    <div>{props.item}</div>
    <div>
      <button onClick={props.remove}>Delete</button>
      <button onClick={() => props.edit('newElt',props.index)}>Edit</button>
    </div>
  </li>
);

todos = ["beer", "cheese", "soup"];

const App = props => {
  const onEnter = e => {
    var key = e.which || e.keyCode;
    if (key === 13) {
      dom.render(<App todos={[...todos, e.target.value]} />);
      todos = [...todos, e.target.value];
      e.target.value = "";
    }
  };

  const addBeer = () => {
    dom.render(<App todos={[...todos, "BEER"]} />);
    todos = [...todos, "BEER"];
  };

  const removeElt = i => {
    todos.splice(i, 1);
    dom.render(<App todos={todos} />);
  };
  const editElt = (newElt,i) => {
    console.log(newElt,i)
  }

  return (
    <div>
      <h1>Todos</h1>
      <input onKeydown={onEnter} id="todo" />
      <button onClick={addBeer}>add todo</button>
      <div>
        <ul>
          {props.todos.map((todo, i) => (
            <Item item={todo} index={i} remove={() => removeElt(i)} edit={editElt} />
          ))}
        </ul>
      </div>
    </div>
  );
};

let todos = ["beer", "cheese", "soup"];

let dom = h.createDom($root, <App todos={todos} />);

console.log(dom);
