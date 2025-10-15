// メニュートグル
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    }
  });
});

// ヘッダースクロール効果
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    } else {
      header.style.boxShadow = "none";
    }
  }
});

// ヒーロー背景画像スライダー
const hero = document.querySelector(".hero");
if (hero) {
  let currentBg = 1;
  const totalBgs = 3;

  function changeHeroBackground() {
    // 現在のクラスを削除
    hero.classList.remove("bg-1", "bg-2", "bg-3");

    // 次の背景に切り替え
    currentBg = currentBg >= totalBgs ? 1 : currentBg + 1;

    // 新しいクラスを追加（bg-1はデフォルトなので、bg-2とbg-3のみ追加）
    if (currentBg === 2) {
      hero.classList.add("bg-2");
    } else if (currentBg === 3) {
      hero.classList.add("bg-3");
    }
  }

  // 12秒ごとに背景を変更
  setInterval(changeHeroBackground, 12000);
}
