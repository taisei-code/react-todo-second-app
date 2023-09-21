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
  const inputUpdate = (event, i) => {
    setList(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      list.map((val, index) =>
        // index が一致していればtargetを上書き
        index === i ? { ...val, target: event.target.value } : { ...val }
      )
    );
  };

  // todolistへの追加 （inputで入力した値を,オブジェクトにしてsetStateで追加）
  const add = () => {
    // 値がない場合は追加しない
    if (!registInput.current.value) return;
    setList((prevList) => [
      // 直前のstateをスプレッド構文で展開
      ...prevList,
      // 新規オブジェクトを追加
      { title: registInput.current.value, target: "" },
    ]);
  };

  // todolistの更新
  const upd = (i) => {
    setList(
      // 更新内容inputを変更した時点でstateの配列に格納されているオブジェクトのtargetは
      // 更新されているため、更新ボタン押下時は更新対象オブジェクトのterget→titleで更新した
      // 新規配列をmapで作成し、stateにセットする
      list.map((val, index) =>
        index === i ? { ...val, title: val.target } : { ...val }
      )
    );
  };

  // todolistの削除
  const del = (i) => {
    // indexが一致したtodoは除去する
    setList(list.filter((_, index) => index !== i));
  };

  return (
    <div className="App">
      <h1>todolistの削除</h1>

      <div>
        <input type="text" ref={registInput}></input>
        <button className="button" onClick={add}>
          登録
        </button>
        <button className="button">クリア</button>
      </div>

      <h1 style={{ textAlign: "left" }}>ToDo List</h1>
      <ul style={{ textAlign: "left" }}>
        {list.map((todoList, i) => (
          <li key={i}>
            {todoList.title}
            <input
              type="text"
              value={todoList.target}
              onChange={(e) => inputUpdate(e, i)}
            ></input>
            <button className="button" onClick={() => upd(i)}>
              更新
            </button>
            <button className="button" onClick={() => del(i)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
