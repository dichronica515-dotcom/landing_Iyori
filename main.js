// ============================================
//  星埜イヨリ Landing Page - main.js
//  スクロールアニメーションの制御
// ============================================

// -----------------------------------------------
// Intersection Observer を使ったスクロールアニメーション
//
// 「Intersection Observer」とは何か？
//   → 「ある要素が画面（ビューポート）に入ってきたか」を
//     監視し続けてくれる、静かな見張り番のようなものです。
//     かつてはスクロールのたびにJSを実行するという
//     負荷の高い処理が必要でしたが、これを使えば効率的に
//     動作します。無理な負担をかけないことが、長く続ける
//     コツだと私は思っています。
// -----------------------------------------------

// Step 1: 見張り番（Observer）の設定を定義する
const observerOptions = {
    root: null,         // null = ブラウザの表示領域全体を「検知エリア」にする
    rootMargin: '0px',  // 検知エリアのオフセット（今回は調整なし）
    threshold: 0.12,    // 要素の12%が画面に入ったらアニメーション発動
                        // 少し早めに気づく。患者の変化を見逃さないように。
};

// Step 2: 「画面に入ってきた」と検知した時に実行する処理を定義する
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        // entry.isIntersecting = 「今、画面の中に入っているか？」を示すフラグ
        if (entry.isIntersecting) {
            // 画面に入ってきたら '.is-visible' クラスを付け加える
            // ——ゆっくりでいい。確認できたら、そっと現れてください。
            entry.target.classList.add('is-visible');

            // 一度表示されたら、監視をやめる（不要な処理は残さない）
            observer.unobserve(entry.target);
        }
    });
};

// Step 3: 見張り番（Observer）を作成する
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Step 4: アニメーションさせたい要素を見張り番に登録する
// '.fade-up' クラスが付いた要素をすべて選んで、静かに任せます。
document.querySelectorAll('.fade-up').forEach((element) => {
    observer.observe(element);
});
