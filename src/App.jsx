import { useEffect, useState } from "react";
import { shop } from "./data/shop";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = form.get("name");
    const phone = form.get("phone");
    const message = form.get("message");

    const subject = encodeURIComponent(`網站詢問｜${name}`);

    const body = encodeURIComponent(
      `姓名：${name}\n電話：${phone}\n\n詢問內容：\n${message}`
    );

    window.location.href =
      `mailto:${shop.email}?subject=${subject}&body=${body}`;
  };

  const categories = ["全部", "咖啡", "茶飲", "甜點"];

  const filteredMenu =
    activeCategory === "全部"
      ? shop.menu
      : shop.menu.filter(
          (item) => item.category === activeCategory
        );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="site">
      {/* 導覽列 */}
      <header className={`navbar ${scrolled ? "navbarScrolled" : ""}`}>
  <a className="brand" href="#home">
    <span className="brandZh">{shop.name}</span>
    <span className="brandEn">{shop.englishName}</span>
  </a>

  <button
    className={`menuToggle ${mobileMenuOpen ? "open" : ""}`}
    type="button"
    aria-label="開啟選單"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    <span></span>
    <span></span>
  </button>

  <nav className={`navLinks ${mobileMenuOpen ? "mobileOpen" : ""}`}>
    <a href="#about" onClick={() => setMobileMenuOpen(false)}>
      關於我們
    </a>

    <a href="#menu" onClick={() => setMobileMenuOpen(false)}>
      精選菜單
    </a>

    <a href="#visit" onClick={() => setMobileMenuOpen(false)}>
      店家資訊
    </a>

    <a
      href="#contact"
      className="navContact"
      onClick={() => setMobileMenuOpen(false)}
    >
      聯絡我們
    </a>
  </nav>
</header>

      <main>
        {/* 首頁 */}
        <section className="hero" id="home">
          <div className="heroShade" />

          <div className="heroContent">
            <p className="eyebrow">COFFEE · DESSERT · MOMENTS</p>

            <h1>{shop.name}</h1>

            <p className="heroEnglish">{shop.englishName}</p>

            <p className="heroSlogan">{shop.slogan}</p>

            <div className="heroActions">
              <a className="btn btnPrimary" href="#menu">
                查看菜單
              </a>

              <a className="btn btnOutline" href="#visit">
                店家資訊
              </a>
            </div>
          </div>

          <div className="scrollHint">
            <span>SCROLL</span>
            <div />
          </div>
        </section>

        {/* 關於我們 */}
        <section className="section about" id="about">
          <div className="sectionHeading">
            <p>ABOUT US</p>
            <h2>
              一杯咖啡，
              <br />
              一段屬於自己的時間。
            </h2>
          </div>

          <div className="aboutContent">
            <p>{shop.description}</p>

            <div className="features">
              {shop.features.map((feature, index) => (
                <article className="feature" key={feature.title}>
                  <span>0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 菜單 */}
        <section className="menuSection" id="menu">
          <div className="menuInner">
            <div className="sectionHeading lightHeading">
              <p>OUR MENU</p>
              <h2>精選菜單</h2>
            </div>

            <div className="menuGrid">
              {shop.menu.map((item) => (
                <article className="menuItem" key={item.id}>
                  <div>
                    <span className="menuCategory">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.englishName}</p>
                  </div>

                  <strong>NT$ {item.price}</strong>
                </article>
              ))}
            </div>

            <p className="menuNote">
              MENU · 部分商品依現場供應狀況調整
            </p>
          </div>
        </section>

        {/* 品牌展示區 */}
        <section className="experience">
          <div className="experienceImage" />

          <div className="experienceContent">
            <p className="smallTitle">THE EXPERIENCE</p>

            <h2>
              不只是咖啡，
              <br />
              也是生活的一部分。
            </h2>

            <p>
              找個靠窗的位置，點一杯喜歡的咖啡。
              不論工作、閱讀，或只是什麼都不做，
              都能在這裡留下一段自己的時間。
            </p>

            <a href="#visit">來暮光坐坐 →</a>
          </div>
        </section>

      {/* Gallery */}
<section className="gallerySection">
  <div className="galleryHeader">
    <p>OUR SPACE</p>
    <h2>暮光日常</h2>
    <span>
      咖啡、甜點與一點慢下來的時間。
    </span>
  </div>

  <div className="galleryGrid">
    {(shop.gallery ?? []).map((photo, index) => (
      <div
        className={`galleryItem galleryItem${index + 1}`}
        key={photo.id}
      >
        <img
          src={photo.image}
          alt={photo.alt}
          loading="lazy"
        />

        <div className="galleryOverlay">
          <span>TWILIGHT CAFE</span>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* 店家資訊 */}
        <section className="section visit" id="visit">
          <div>
            <div className="sectionHeading">
              <p>VISIT US</p>
              <h2>來店資訊</h2>
            </div>

            <div className="visitInfo">
              <div>
                <span>ADDRESS</span>
                <p>{shop.address}</p>
              </div>

              <div>
                <span>OPENING HOURS</span>
                <p>週一至週五　{shop.hours.weekday}</p>
                <p>週六至週日　{shop.hours.weekend}</p>
              </div>

              <div>
                <span>PHONE</span>
                <p>{shop.phone}</p>
              </div>
            </div>
          </div>

          <div className="mapBox">
  <iframe
    title={`${shop.name} 地圖`}
    src={`https://www.google.com/maps?q=${encodeURIComponent(
      shop.mapQuery
    )}&output=embed`}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />

  <div className="mapInfo">
    <span>GOOGLE MAPS</span>

    <h3>{shop.name}</h3>

    <p>{shop.address}</p>

    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        shop.mapQuery
      )}`}
      target="_blank"
      rel="noreferrer"
    >
      查看地圖 →
    </a>
  </div>
</div>
        </section>

        {/* 預約表單 */}
<section className="inquirySection">
  <div className="inquiryIntro">
    <p>RESERVATION & CONTACT</p>

    <h2>
      想預約座位，
      <br />
      或有其他問題？
    </h2>

    <span>
      留下基本資訊，我們會盡快與你聯絡。
    </span>
  </div>

  <form
    className="inquiryForm"
    onSubmit={handleContactSubmit}
  >
    <label>
      <span>姓名</span>
      <input
        type="text"
        name="name"
        placeholder="請輸入姓名"
        required
      />
    </label>

    <label>
      <span>電話</span>
      <input
        type="tel"
        name="phone"
        placeholder="09xx-xxx-xxx"
        required
      />
    </label>

    <label>
      <span>詢問內容</span>
      <textarea
        name="message"
        rows="5"
        placeholder="例如：想詢問 4 人座位預約..."
        required
      />
    </label>

    <button type="submit">
      送出詢問 →
    </button>
  </form>
</section>

      {/* 聯絡 */}
        <section className="contact" id="contact">
          <p>STAY CONNECTED</p>

          <h2>
            今天，
            <br />
            也來喝杯咖啡吧。
          </h2>

          <div className="socialLinks">
            <a href={shop.social.line}>LINE</a>
            <a href={shop.social.instagram}>INSTAGRAM</a>
            <a href={shop.social.facebook}>FACEBOOK</a>
          </div>
        </section>
      </main>

      {/* 浮動聯絡按鈕 */}
<div className="floatingContact">
  <a
    href={shop.social.line}
    className="floatingLine"
    aria-label="LINE 聯絡"
  >
    LINE
  </a>

  <a
    href={`tel:${shop.phone}`}
    className="floatingPhone"
    aria-label="電話聯絡"
  >
    電話
  </a>
</div>

      <footer>
        <div>
          <strong>{shop.name}</strong>
          <span>{shop.englishName}</span>
        </div>

        <p>© 2026 {shop.englishName}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;