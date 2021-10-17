import React from "react";
import "./App.css";

// React Calendar, axios のimport文追加
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// axios で取得するjsonファイルのパスを宣言
const URL = "/static/database.json";

// App クラス コンポーネント
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      database: [],
      loading: true
    };
  }

  // Component が Mount された後に実行されるメソッド
  // Ajax を使ったデータ フェッチなどの処理を記述
  componentDidMount() {
    this.getJson();
  }

  // jsonファイルを取得する関数定義
  // response データと取得結果の状態をstateに設定
  getJson = () => {
    axios.get(URL).then((res) => {
      this.setState({
        database: res.data,
        loading: false
      });
    });
  };

  // カレンダーのタイルに表示する内容を取得する関数定義
  getTileContent = (calendar) => {
    // 日付フォーマット処理(YYYYMMDD)
    let year = calendar.date.getFullYear();
    let month = calendar.date.getMonth() + 1;
    let day = calendar.date.getDate();
    month = ("0" + month).slice(-2);
    day = ("0" + day).slice(-2);
    let formatDate = year + month + day;
    // タイルに表示する内容の初期化
    let message = "";

    // 取得したjsonデータを読み込みカレンダーの日付と一致する場合にタイル内容設定
    this.state.database.forEach((element) => {
      if (formatDate === element.startDate) {
        message = element.content;
      }
    }); // end forEach

    // タイルに表示する内容を返却
    return <p>{message}　</p>;
  };

  render() {
    // jsonファイルの読み込み中は以下を表示
    if (this.state.loading) {
      return <div>Now loading</div>;
    }

    // jsonファイルの読み込み完了後にカレンダー表示
    return (
      <div>
        <Calendar
          value={new Date(2021, 8, 1)} // デモ用に固定値を指定
          tileContent={this.getTileContent}
        />
      </div>
    );
  }
}

export default App;
