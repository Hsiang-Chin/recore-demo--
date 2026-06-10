<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

interface FaqItem {
  q: string
  a: string
  img?: string
}

interface FaqSection {
  id: string
  icon: string
  title: string
  items: FaqItem[]
}

const sections: FaqSection[] = [
  {
    id: 'usage',
    icon: '📖',
    title: '使用教學',
    items: [
      {
        q: '第一次使用前需要做什麼準備？',
        a: '收到商品後，請先將瑞兒外褲用清水輕柔手洗並晾乾，以去除製程中的少量棉絮，提升吸水效能。替換芯可直接使用，無需預洗。',
      },
      {
        q: '如何正確穿戴瑞兒外褲？',
        a: '① 拿取替換芯。\n② 抽換替換芯。\n③ 魔鬼氈穿戴固定。\n④ 輕鬆捲起降低垃圾面積。',
        img: '/images/usage-steps.png',
      },
      {
        q: '多久需要更換替換芯？',
        a: '一般建議每 3-4 小時或確認芯體已濕透時更換。排便後請立即更換。瑞兒外褲可繼續使用，只需取出用過的替換芯丟棄，再放入新的替換芯即可。',
      },
      {
        q: '瑞兒外褲如何清洗？',
        a: '・一般髒污：直接放入洗衣機，建議 30°C 以下溫水，洗衣袋保護。\n・排便後：先以冷水沖洗乾淨後再入洗衣機，勿用熱水避免色素固著。\n・勿使用含螢光劑或柔軟精的洗劑，以免影響防水層效能。\n・自然晾乾或低溫烘乾，避免高溫破壞彈性材質。',
      },
      {
        q: '替換芯如何正確安裝與取出？',
        a: '安裝：將替換芯有印花的一面朝上（貼合寶寶肌膚面），放入外褲內側長條形凹槽，芯體四角對齊槽位即完成。\n取出：更換時直接從外褲中抽出替換芯，外褲若無明顯髒污可繼續使用，視情況決定是否清洗。',
      },
      {
        q: '外褲尺寸如何選擇？',
        a: '建議依寶寶體重對照選擇：\n・S 號：4-8 kg\n・M 號：6-11 kg\n・L 號：9-14 kg\n・XL 號：12 kg 以上\n體重落在兩個尺寸之間時，建議選較大尺寸，以確保腿部舒適不緊繃。',
      },
    ],
  },
  {
    id: 'subscription',
    icon: '📦',
    title: '訂閱方案',
    items: [
      {
        q: '訂閱後如何修改方案或尺寸？',
        a: '登入會員後台後，進入「訂閱管理」頁面，可隨時調整替換芯尺寸（S / M / L / XL）及每次配送的數量。變更將於下次出貨週期生效。',
      },
      {
        q: '最低訂閱期限是多久？',
        a: '瑞可爾採用彈性訂閱制，沒有最低訂閱期限。您可以在任何時間點暫停或取消訂閱，不收取任何違約金。',
      },
      {
        q: '可以同時訂購多種尺寸嗎？',
        a: '目前每筆訂閱固定一種尺寸，若需多種尺寸（例如家有雙胞胎），建議分別建立兩筆訂閱，每筆訂閱享有獨立的 85 折優惠。',
      },
      {
        q: '訂閱折扣怎麼計算？',
        a: '訂閱方案享有固定 85 折優惠（相較單次購買售價）。每次扣款時依當期訂閱定價計算，優惠不重複累計。環保積分另計，可於後台兌換折扣。',
      },
    ],
  },
  {
    id: 'delivery',
    icon: '🚚',
    title: '配送與取貨',
    items: [
      {
        q: '多久會配送一次？',
        a: '您可選擇每 2 週、每 4 週或每 8 週配送一次。系統也會根據寶寶月齡自動提醒您是否需要調整頻率，確保備貨充足不斷貨。',
      },
      {
        q: '支援哪些配送與取貨方式？',
        a: '目前提供三種方式：\n・宅配到府（黑貓宅急便）\n・超商取貨（7-ELEVEN / 全家）\n・智能櫃取貨（蝦皮智取 / 郵政 i 郵箱）\n超商與智能櫃取貨免運費，宅配到府每筆訂單運費 60 元，單筆消費滿 999 元免運。',
      },
      {
        q: '下訂後可以更改配送地址或取貨門市嗎？',
        a: '訂單確認後 2 小時內可在會員後台修改配送資訊。出貨後若需變更，請聯繫客服，我們將協助您與物流方確認是否可攔截改派。',
      },
      {
        q: '如何追蹤訂單出貨狀態？',
        a: '出貨後系統將發送 Email 及簡訊通知，內含物流追蹤連結。您也可在會員後台「訂單記錄」頁面即時查看最新配送狀態。',
      },
    ],
  },
  {
    id: 'material',
    icon: '🍃',
    title: '材質與安全',
    items: [
      {
        q: '竹纖維對寶寶皮膚安全嗎？',
        a: '瑞可爾採用 FSC 認證的天然竹纖維，不含螢光增白劑、香料及有害化學物質，天然抑菌且透氣性佳，特別適合敏感肌與過敏體質的寶寶。已通過 SGS 皮膚刺激性測試。',
      },
      {
        q: '什麼是 PLA 材質？有什麼優點？',
        a: 'PLA（聚乳酸）是由甘蔗或玉米澱粉提煉的生物基材料，與石化塑料相比可降低碳排放。瑞可爾以 PLA 製作防水薄膜，且屬植物來源，對寶寶和環境更友善。',
      },
      {
        q: '替換芯用完後如何處理？',
        a: '替換芯主體為 PLA 生物基材料，建議依一般垃圾處理（目前台灣家庭端無法自行堆肥）。瑞可爾未來計畫建立回收計畫，訂閱用戶可累積環保積分參與回收換購。',
      },
      {
        q: '瑞兒外褲通過哪些認證？',
        a: '瑞兒外褲通過 OEKO-TEX STANDARD 100 認證（有害物質限量），以及 SGS 皮膚刺激性與抗菌測試。竹纖維原料取得 FSC 森林管理認證，確保來源永續。',
      },
    ],
  },
  {
    id: 'return',
    icon: '🔄',
    title: '退換貨與暫停',
    items: [
      {
        q: '如何暫停訂閱？',
        a: '登入會員後台，前往「訂閱管理」，點選「暫停訂閱」並選擇暫停期間（最長 90 天）。暫停期間不會扣款或出貨，到期後自動恢復。',
      },
      {
        q: '收到商品有瑕疵或與訂單不符怎麼辦？',
        a: '請於收貨後 7 日內聯繫客服（Email：recore@mcut.edu.tw 或電話：02-2908-9899），並附上訂單編號及商品照片。確認後將安排免費換貨或全額退款，無需負擔退件運費。',
      },
      {
        q: '一般情況下可以退貨嗎？',
        a: '依消保法 7 日鑑賞期，收到商品後 7 日內（商品未拆封、未使用）可申請退貨，退款將於退貨確認後 5-7 個工作天原路退回。替換芯因衛生考量，拆封後恕不接受退換。',
      },
      {
        q: '如何永久取消訂閱？',
        a: '於會員後台點選「取消訂閱」，填寫取消原因後確認送出。取消後本期若已出貨則正常收件，下一個配送週期起停止扣款。如需協助，歡迎聯繫客服。',
      },
    ],
  },
]

const openItems = ref<Set<string>>(new Set())

function toggleItem(key: string) {
  if (openItems.value.has(key)) {
    openItems.value.delete(key)
  } else {
    openItems.value.add(key)
  }
}

function isOpen(key: string) {
  return openItems.value.has(key)
}

function scrollToSection(id: string) {
  const el = document.getElementById(`faq-${id}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="faq-view">
    <!-- 頂部導覽列 -->
    <header class="faq-header">
      <button class="back-btn" @click="appStore.closeFaq" aria-label="返回">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="faq-title">常見問題</span>
      <div style="width: 40px"></div>
    </header>

    <!-- 分類快速跳轉 -->
    <nav class="faq-nav">
      <button
        v-for="s in sections"
        :key="s.id"
        class="faq-nav-btn"
        @click="scrollToSection(s.id)"
      >
        <span class="faq-nav-icon">{{ s.icon }}</span>
        <span class="faq-nav-label">{{ s.title }}</span>
      </button>
    </nav>

    <!-- FAQ 內容 -->
    <div class="faq-content">
      <section
        v-for="section in sections"
        :key="section.id"
        :id="`faq-${section.id}`"
        class="faq-section"
      >
        <div class="section-heading">
          <span class="section-icon">{{ section.icon }}</span>
          <h2 class="section-title">{{ section.title }}</h2>
        </div>

        <div class="accordion">
          <div
            v-for="(item, idx) in section.items"
            :key="idx"
            class="accordion-item"
            :class="{ open: isOpen(`${section.id}-${idx}`) }"
          >
            <button
              class="accordion-q"
              @click="toggleItem(`${section.id}-${idx}`)"
              :aria-expanded="isOpen(`${section.id}-${idx}`)"
            >
              <span class="q-text">{{ item.q }}</span>
              <svg
                class="accordion-arrow"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <Transition name="accordion">
              <div v-if="isOpen(`${section.id}-${idx}`)" class="accordion-a">
                <p class="a-text" :class="{ 'a-text-bold': !!item.img }">{{ item.a }}</p>
                <img
                  v-if="item.img"
                  :src="item.img"
                  alt="使用步驟說明圖"
                  class="a-img"
                />
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- 底部聯繫 -->
      <div class="faq-contact">
        <p class="contact-title">找不到答案？</p>
        <p class="contact-desc">歡迎透過以下方式聯繫我們的客服團隊</p>
        <div class="contact-links">
          <a class="contact-link" href="mailto:recore@mcut.edu.tw">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2"/>
            </svg>
            recore@mcut.edu.tw
          </a>
          <a class="contact-link" href="tel:0229089899">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3-8.57A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"/>
            </svg>
            02-2908-9899
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-view {
  position: absolute;
  inset: 0;
  z-index: 200;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 頂部 Header */
.faq-header {
  height: 56px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 4px;
  flex-shrink: 0;
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.back-btn:active {
  background: rgba(255, 255, 255, 0.15);
}

.faq-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.04em;
}

/* 快速跳轉分類列 */
.faq-nav {
  display: flex;
  gap: 0;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.faq-nav::-webkit-scrollbar {
  display: none;
}

.faq-nav-btn {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background var(--transition-fast);
  border-bottom: 2px solid transparent;
}
.faq-nav-btn:active {
  background: var(--color-background);
}
.faq-nav-btn:hover {
  border-bottom-color: var(--color-primary);
}

.faq-nav-icon {
  font-size: 18px;
  line-height: 1;
}
.faq-nav-label {
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* 可捲動內容區 */
.faq-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}

/* 每個分類區塊 */
.faq-section {
  padding-top: 8px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 20px 12px;
  border-bottom: 1px solid var(--color-border);
}
.section-icon {
  font-size: 20px;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.02em;
}

/* 手風琴 */
.accordion {
  background: var(--color-white);
}

.accordion-item {
  border-bottom: 1px solid var(--color-border);
}
.accordion-item:last-child {
  border-bottom: none;
}

.accordion-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background var(--transition-fast);
}
.accordion-q:active {
  background: var(--color-background);
}

.q-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
  flex: 1;
}

.accordion-arrow {
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: transform 0.3s ease;
}
.accordion-item.open .accordion-arrow {
  transform: rotate(180deg);
}

.accordion-a {
  padding: 0 20px 16px;
  background: var(--color-background);
}
.a-text {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.75;
  white-space: pre-line;
}
.a-text-bold {
  font-weight: 700;
  color: var(--color-text);
}
.a-img {
  width: 100%;
  display: block;
  height: auto;
  margin-top: 16px;
  border-radius: var(--radius-sm);
}

/* 手風琴展開動畫 */
.accordion-enter-active {
  transition: all 0.28s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}
.accordion-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 400px;
}

/* 底部聯繫區 */
.faq-contact {
  margin: 24px 20px 40px;
  padding: 20px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  text-align: center;
}
.contact-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
}
.contact-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-primary);
  text-decoration: none;
  padding: 10px 16px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  transition: background var(--transition-fast), color var(--transition-fast);
}
.contact-link:active {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .faq-header {
    height: 64px;
  }
  .section-heading {
    padding: 24px 28px 14px;
  }
  .accordion-q {
    padding: 18px 28px;
  }
  .accordion-a {
    padding: 0 28px 18px;
  }
  .faq-contact {
    margin: 28px 28px 48px;
  }
  .contact-links {
    flex-direction: row;
    justify-content: center;
  }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .section-heading {
    padding: 28px 48px 16px;
  }
  .accordion-q {
    padding: 20px 48px;
  }
  .accordion-q .q-text {
    font-size: 15px;
  }
  .accordion-a {
    padding: 0 48px 20px;
  }
  .a-text {
    font-size: 14px;
  }
  .faq-contact {
    margin: 32px 48px 56px;
  }
}
</style>
