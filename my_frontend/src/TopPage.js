import { Link } from "react-router-dom";

function TopPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row text-center align-items-center">
          <h1>Welcome to my project!!</h1>
        </div>

        <div className="row text-center">
          <h2>作成したアプリケーションを公開していきます</h2>
          <p>今後、随時更新していきます</p>
        </div>

        <div className="row text-center align-items-center">
          <h3>コンテンツ一覧</h3>
        </div>
        <div className="row text-center align-items-center">
          <Link to="/chat">AIと会話しよう!!</Link>
        </div>
      </div>
    </>
  );
}

export default TopPage;
