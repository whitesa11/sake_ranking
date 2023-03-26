//ランキングデータを取得
/*　
通常のfech()だと、CORSポリシーに関してエラーが出てしまうため、
ORS proxy serverを利用する必要がある 
*/

const rankingsUrl = "https://muro.sakenowa.com/sakenowa-data/api/rankings";
const brandsUrl = "https://muro.sakenowa.com/sakenowa-data/api/brands";

const proxyUrl = 'https://api.allorigins.win/raw?url=';

// 銘柄IDと銘柄名のマップを作成する関数
async function getBrandMap() {
    const response = await fetch(proxyUrl + brandsUrl);
    const json = await response.json();
    const brandMap = {}; //新しいオブジェクトを作る
    for (const brand of json.brands) {
      brandMap[brand.id] = brand.name;
    }
    return brandMap;
  }

  // ランキング情報を取得し、ランキング表を生成する関数
  async function createRankingTable() {
    const response = await fetch(proxyUrl + rankingsUrl);
    const json = await response.json();
    const brandMap = await getBrandMap();
    const tbody = document.getElementById("rankings");
    for (const item of json.overall.slice(0, 20)) {
      const tr = document.createElement("tr");
      const rankTd = document.createElement("td");
      const nameTd = document.createElement("td");
      const scoreTd = document.createElement("td");
      rankTd.textContent = item.rank;
      nameTd.textContent = brandMap[item.brandId];
      scoreTd.textContent = item.score.toFixed(2);
      tr.appendChild(rankTd);
      tr.appendChild(nameTd);
      tr.appendChild(scoreTd);
      tbody.appendChild(tr);
    }

    // 現在の月の情報を得る
  const date = new Date();
  const formattedDate = date.toLocaleString('ja-JP', { year: "numeric", month: 'long', timeZone: 'Asia/Tokyo' }); // 文字に直す

  // HTML内にいつの情報かを表示する
  const currentMonthElement = document.getElementById("currentMonth");
  currentMonthElement.textContent = (formattedDate + '現在');
  }

  createRankingTable();


