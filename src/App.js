import { useRef, useState } from 'react';
import './App.css';

function App() {
  // 初期値
  const initialState = [];

  // 登録 input
  const registInput = useRef(null);

  // useState
  const [list, setList] = useState(initialState);

  // 更新内容input入力時のstate更新
  //リストから更新対象のオブジェクトのtargetプロパティのみを更新する
  const inputUpdate = () => {
    setList(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      list.map((val, index) =>
        index === i ? { ...val, target: event.target.value } : { ...val }
      )
    );
  }


  return (
    <div className="App">
      <h1>todolistの削除</h1>

      <div>
        <input type="text" ref={registInput}></input>
        <button className="button">登録</button>
        <button className="button">クリア</button>
      </div>

      <h1 style={ { textAlign: "left" } }>ToDo List</h1>
      <ul style={{ textAlign: "left" }}>
        {list.map((todoList, i) => (
          <li key={i}>
            <button>削除</button>
            <input
              type="text"
              value={todoList.target}
              onChange={(e) => inputUpdate(e, i) }
            ></input>
            <button>更新</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
