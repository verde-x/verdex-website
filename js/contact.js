// Formspreeフォーム送信処理
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // ボタンを無効化して二重送信を防止
    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";

    // フォームデータを取得
    const formData = new FormData(form);

    try {
      // FormspreeにAJAX送信
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // 送信成功
        formStatus.innerHTML = `
          <div class="success-message">
            <p><strong>✓ 送信完了</strong></p>
            <p>お問い合わせありがとうございます。<br>担当者より折り返しご連絡いたします。</p>
          </div>
        `;
        formStatus.className = "form-status success";
        formStatus.style.display = "block";

        // フォームをリセット
        form.reset();

        // 3秒後にメッセージをスクロール表示
        setTimeout(() => {
          formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        // サーバーエラー
        const data = await response.json();
        throw new Error(
          data.error || "送信中にエラーが発生しました。"
        );
      }
    } catch (error) {
      // エラー処理
      console.error("Error:", error);
      formStatus.innerHTML = `
        <div class="error-message">
          <p><strong>✗ 送信エラー</strong></p>
          <p>申し訳ございません。送信中にエラーが発生しました。<br>お手数ですが、時間をおいて再度お試しください。</p>
        </div>
      `;
      formStatus.className = "form-status error";
      formStatus.style.display = "block";

      setTimeout(() => {
        formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } finally {
      // ボタンを再度有効化
      submitBtn.disabled = false;
      submitBtn.textContent = "送信する";
    }
  });
}
