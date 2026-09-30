import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
const modules = [
  "Perbankan",
  "Pengenalan OJK dan Waspada Investasi",
  "Perencanaan Keuangan",
  "Pasar Modal",
  "Pergadaian",
  "Perusahaan Pembiayaan",
  "Asuransi",
  "Dana Pensiun",
  "Fintech",
  "Digital Financial Literacy",
  "Keuangan Syariah",
  "Bulion",
  "Aset Kripto",
  "Lembaga Keuangan Mikro",
  "Lembaga Penjaminan",
  "Perusahaan Modal Ventura",
];
const lessons = [
  "Pengenalan Keuangan Syariah",
  "Tujuan Keuangan Syariah",
  "Dasar Hukum Keuangan Syariah",
  "Konsep Uang dan Harta",
  "Hal-Hal yang Dilarang dalam Keuangan Syariah",
  "Pengenalan Akad",
  "Perbedaan Keuangan Syariah dan Konvensional",
  "Produk dan Layanan Keuangan Syariah",
  "Mini Game 1",
  "Mini Game 2",
];
const leaders = [
  "angelinaguo",
  "vellyciazheng",
  "cindyangelica",
  "vronzz",
  "patriciaang",
];
const events = [
  "OJK PEDULI Cerdas (Capacity Building Duta Edukasi dan Literasi Keuangan Se-Indonesia) Seri ke-9 Tahun 2026",
  "OJK PEDULI Cerdas (Capacity Building Duta Edukasi dan Literasi Keuangan Se-Indonesia) Seri ke-8",
  "OJK PEDULI CERDAS Seri #7 2026",
  "OJK PEDULI Cerdas (Capacity Building Edukasi dan Literasi Keuangan) Seri #6 Tahun 2026",
  "OJK PEDULI Cerdas (Capacity Building Edukasi dan Literasi Keuangan Duta Se-Indonesia) Seri #5 Tahun 2026",
  "Webinar Perayaan Hari Kartini",
  "OJK PEDULI Cerdas (Capacity Building Edukasi dan Literasi Keuangan Duta Se-Indonesia) Seri #4 Tahun 2026",
  "OJK Cerdas (Capacity Building Edukasi dan Literasi Keuangan Duta Se-Indonesia) Seri #3 Tahun 2026",
];
const questions = [
  {
    text: "Apa prinsip utama keuangan syariah?",
    answers: [
      "Keadilan dan kegiatan usaha yang sesuai prinsip syariah",
      "Keuntungan tanpa memperhatikan risiko",
      "Bunga tetap pada semua transaksi",
    ],
    correct: 0,
  },
  {
    text: "Kesepakatan antara para pihak dalam transaksi disebut …",
    answers: ["Dividen", "Akad", "Inflasi"],
    correct: 1,
  },
  {
    text: "Manakah contoh pengelolaan keuangan yang baik?",
    answers: [
      "Menghabiskan seluruh pendapatan",
      "Berutang tanpa perencanaan",
      "Menyusun anggaran dan menyiapkan dana darurat",
    ],
    correct: 2,
  },
];
function Icon({ name, className = "", ...props }) {
  return (
    <i
      aria-hidden="true"
      className={`fa-solid fa-${name} ${className}`}
      {...props}
    />
  );
}
function Picture({ name, alt = "", ...props }) {
  return <img src={`/assets/${name}.png`} alt={alt} {...props} />;
}
function routeInfo() {
  const u = new URL(location.href);
  return {
    path: u.pathname,
    module: Number(u.searchParams.get("module") ?? 10),
    level: u.searchParams.get("level") || "Basic",
    item: u.searchParams.get("item") || "0",
  };
}
export function App() {
  const [route, setRoute] = useState(routeInfo),
    [menu, setMenu] = useState(""),
    [modal, setModal] = useState(null),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("default"),
    [progress, setProgress] = useState({}),
    [profile, setProfile] = useState({
      name: "lutfiacr",
      email: "lutfia2603@gmail.com",
      photo: "student",
    }),
    [chat, setChat] = useState(false),
    [messages, setMessages] = useState([]),
    [draft, setDraft] = useState(""),
    [testStarted, setTestStarted] = useState(false),
    [answers, setAnswers] = useState({}),
    [result, setResult] = useState(null);
  const moduleIndex =
      Number.isInteger(route.module) && route.module >= 0 && route.module < 16
        ? route.module
        : 10,
    moduleName = modules[moduleIndex],
    key = `${moduleIndex}-${route.level}`,
    state = progress[key] || { pre: false, done: [], post: false };
  const dashboard = route.path === "/" || route.path === "/Dashboard",
    category = route.path.startsWith("/Course/"),
    detail = route.path === "/Activity/detail";
  useEffect(() => {
    const handler = () => setRoute(routeInfo());
    addEventListener("popstate", handler);
    return () => removeEventListener("popstate", handler);
  }, []);
  useEffect(() => {
    document.title = `${dashboard ? "Dashboard" : category ? "Kategori Modul " + moduleName : detail ? "Detail Aktivitas" : moduleName + " " + route.level} — LMSKU`;
    setTestStarted(false);
    setAnswers({});
    setResult(null);
    setMenu("");
  }, [route]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setModal(null);
        setMenu("");
        setChat(false);
      }
    };
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, []);
  function go(url) {
    history.pushState({}, "", url);
    setRoute(routeInfo());
    scrollTo(0, 0);
  }
  const courseURL = (index = moduleIndex) =>
    `/Course/show/${index === 10 ? "16" : index + 1}/acs?module=${index}`;
  const activityURL = (level = route.level) =>
    `/Activity/show/47?module=${moduleIndex}&level=${level}`;
  const detailURL = (item) =>
    `/Activity/detail?module=${moduleIndex}&level=${route.level}&item=${item}`;
  function updateProgress(change) {
    setProgress((p) => ({ ...p, [key]: { ...state, ...change } }));
  }
  const back = () =>
    go(detail ? activityURL() : category ? "/Dashboard" : courseURL());
  const backButton = (
    <div className="back-row">
      <button className="red-button" onClick={back}>
        Kembali
      </button>
    </div>
  );
  function openInfo(title, body) {
    setModal({ type: "info", title, body });
  }
  function SideProfile() {
    return (
      <aside className="profile-panel">
        <h2>ACTIVITY</h2>
        <Picture name={profile.photo} className="student" />
        <h3>{profile.name}</h3>
        <p className="profile-email">{profile.email}</p>
        <button
          className="outline-button"
          onClick={() => setModal({ type: "photo", title: "Ubah Foto" })}
        >
          <Icon name="pen" /> Ubah Foto
        </button>
        <div className="point-card">
          <div className="point-heading">
            <Picture name="points-person" />
            <div>
              <strong>Riwayat</strong>
              <span>Poin Saya</span>
            </div>
          </div>
          <button
            className="point-row"
            onClick={() =>
              openInfo(
                "Riwayat Poin Saya",
                "Progres dan poin latihan berlaku selama sesi halaman terbuka.",
              )
            }
          >
            <div>
              <strong>
                Riwayat Poin
                <br /> Saya
              </strong>
              <span>
                Jumlah poin tahun
                <br /> berjalan
              </span>
            </div>
            <b>
              {30 +
                (state.pre ? 10 : 0) +
                state.done.length * 10 +
                (state.post ? 30 : 0)}{" "}
              <Icon name="chart-line" />
            </b>
          </button>
          <button
            className="point-row"
            onClick={() =>
              openInfo(
                "Peringkat Saya",
                "Peringkat dari seluruh peserta belum tersedia untuk sesi demo ini.",
              )
            }
          >
            <div>
              <strong>Peringkat Saya</strong>
              <span>
                Peringkat saya dari
                <br /> seluruh peserta
              </span>
            </div>
            <b className="teal">
              - <Icon name="star-half-stroke" />
            </b>
          </button>
          <button
            className="point-row"
            onClick={() =>
              openInfo(
                "Merchandise ditukar",
                "Belum ada merchandise yang ditukar.",
              )
            }
          >
            <strong>
              Merchandise
              <br />
              ditukar
            </strong>
            <b>
              0 <Icon name="ticket" className="peach" />
            </b>
          </button>
          <button
            className="point-row"
            onClick={() =>
              openInfo(
                "Merchandise Tersedia",
                "Katalog tidak tersedia pada referensi. Penukaran tidak dilakukan oleh prototipe lokal ini.",
              )
            }
          >
            <strong>
              Merchandise
              <br />
              Tersedia
            </strong>
            <Icon name="heart" className="red" />
          </button>
          <button
            className="point-row"
            onClick={() =>
              openInfo(
                "Keterangan Learning Poin",
                "Simulasi: pre-test 10 poin, setiap materi 10 poin, dan post-test 30 poin. Nilai ini bukan ketentuan resmi LMSKU.",
              )
            }
          >
            <strong>
              Keterangan
              <br />
              Learning Poin
            </strong>
            <Icon name="file-lines" className="lavender" />
          </button>
        </div>
      </aside>
    );
  }
  function tile(name, label, item, extra = "") {
    return (
      <button
        className={`activity-tile ${extra}`}
        onClick={() => go(detailURL(item))}
      >
        <Picture name={name} />
        <span>{label}</span>
        {(item === "pre"
          ? state.pre
          : item === "post"
            ? state.post
            : state.done.includes(Number(item))) && (
          <Icon name="circle-check" className="completed" />
        )}
      </button>
    );
  }
  function renderDetail() {
    const isPre = route.item === "pre",
      isPost = route.item === "post",
      isTest = isPre || isPost,
      isVideo = route.item === "video",
      index = Number(route.item),
      title = isTest
        ? isPre
          ? "Pre-test"
          : "Post-test"
        : isVideo
          ? `Video edukasi ${moduleName}`
          : `${index + 1}. ${lessons[index] || "Materi"}`,
      locked =
        (!isTest && !isVideo && !state.pre) ||
        (isPost && state.done.length < 10),
      completed = isPre
        ? state.pre
        : isPost
          ? state.post
          : state.done.includes(index);
    return (
      <section className="panel detail-panel">
        <h1>
          <Picture name={isTest ? "test" : isVideo ? "video" : "document"} />
          <Icon name={completed ? "square-check" : "expand"} />
          {title}
        </h1>
        <div className={`status-alert ${completed ? "success" : ""}`}>
          <Icon name={completed ? "check-circle" : "copy"} />{" "}
          {completed
            ? "Anda Telah Menyelesaikan Aktivitas Ini"
            : "Anda Belum Menyelesaikan Aktivitas Ini"}
        </div>
        {locked ? (
          <div className="locked-alert">
            <div>
              <Icon name="box-archive" /> {title}
            </div>
            <span>
              Tidak tersedia, kecuali: Aktivitas{" "}
              <strong>{isPost ? "seluruh materi" : "Pre-test"}</strong> ditandai
              selesai
            </span>
          </div>
        ) : (
          <div className="unlocked-content">
            <span className="demo-label">
              Simulasi lokal • konten aktivitas tidak tersedia pada screenshot
            </span>
            {isTest ? (
              <>
                {!testStarted && result === null ? (
                  <div className="test-intro">
                    <h2>{title}</h2>
                    <p>
                      Uji pemahaman Anda dengan {questions.length} pertanyaan
                      latihan.
                    </p>
                    <p>
                      {isPre
                        ? "Selesaikan pre-test untuk membuka materi pembelajaran."
                        : "Seluruh materi telah selesai. Lanjutkan ke post-test."}
                    </p>
                    <button
                      className="red-button"
                      onClick={() => setTestStarted(true)}
                    >
                      {completed ? "Ulangi Latihan" : "Mulai " + title}
                    </button>
                  </div>
                ) : result !== null ? (
                  <div className="test-result">
                    <Icon name="circle-check" />
                    <h2>{title} selesai</h2>
                    <p>
                      Nilai latihan Anda: <strong>{result}/100</strong>
                    </p>
                    <p>
                      {isPre
                        ? "Materi pembelajaran sekarang tersedia."
                        : "Selamat, seluruh rangkaian pembelajaran telah selesai."}
                    </p>
                    <button
                      className="red-button"
                      onClick={() => go(activityURL())}
                    >
                      Kembali ke Aktivitas
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setResult(
                        Math.round(
                          (questions.filter((q, i) => answers[i] === q.correct)
                            .length /
                            3) *
                            100,
                        ),
                      );
                      updateProgress(isPre ? { pre: true } : { post: true });
                    }}
                  >
                    {questions.map((q, i) => (
                      <fieldset key={q.text}>
                        <legend>
                          {i + 1}. {q.text}
                        </legend>
                        {q.answers.map((a, j) => (
                          <label className="answer" key={a}>
                            <input
                              required
                              type="radio"
                              name={`question-${i}`}
                              checked={answers[i] === j}
                              onChange={() =>
                                setAnswers({ ...answers, [i]: j })
                              }
                            />
                            {a}
                          </label>
                        ))}
                      </fieldset>
                    ))}
                    <button className="red-button" type="submit">
                      Kirim Jawaban
                    </button>
                  </form>
                )}
              </>
            ) : isVideo ? (
              <>
                <h2>{title}</h2>
                <p>
                  Video asli tidak disertakan dalam referensi. Anda dapat
                  melanjutkan ke pre-test melalui daftar aktivitas.
                </p>
                <button
                  className="red-button"
                  onClick={() => go(detailURL("pre"))}
                >
                  Lanjut ke Pre-test
                </button>
              </>
            ) : (
              <>
                <h2>{title}</h2>
                <p>
                  Materi latihan ini merepresentasikan alur membuka dan
                  menyelesaikan aktivitas. Isi modul resmi tidak direplikasi
                  karena membutuhkan akses ke materi aslinya.
                </p>
                <p>
                  Keuangan syariah menekankan keadilan, transparansi, dan
                  kesepakatan yang jelas dalam kegiatan keuangan.
                </p>
                <button
                  className="red-button"
                  onClick={() => {
                    updateProgress({
                      done: [...new Set([...state.done, index])],
                    });
                    go(activityURL());
                  }}
                >
                  {completed ? "Kembali ke Aktivitas" : "Tandai Selesai"}
                </button>
              </>
            )}
          </div>
        )}
        {backButton}
      </section>
    );
  }
  const filtered = modules
    .map((name, index) => ({ name, index }))
    .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "za"
          ? b.name.localeCompare(a.name)
          : a.index - b.index,
    );
  function ModuleCard({ name, index, available = false }) {
    return (
      <article className={`module-card ${available ? "available" : ""}`}>
        <button
          className="module-art"
          onClick={() => go(courseURL(index))}
          aria-label={`Buka Modul ${name}`}
        >
          <Picture
            name={available ? "learning" : `module-${index}`}
            alt={`Modul ${name}`}
          />
        </button>
        <p>Modul {name}</p>
        <button className="enter-button" onClick={() => go(courseURL(index))}>
          Masuk
        </button>
      </article>
    );
  }
  return (
    <>
      <header className="topbar">
        <button
          className="brand"
          aria-label="Dashboard"
          onClick={() => go("/Dashboard")}
        >
          <Picture name="lms-logo" />
        </button>
        <span className="date">
          RABU, 30 SEPTEMBER 2026 <Icon name="calendar-days" />
        </span>
        <div className="top-actions">
          <span className="last-login">
            <Icon name="clock" />
            Last Login : 2026-09-30 09:28:29
          </span>
          <button
            className="notification"
            aria-label="Notifikasi"
            aria-expanded={menu === "notifications"}
            onClick={() =>
              setMenu(menu === "notifications" ? "" : "notifications")
            }
          >
            <small>1</small>
            <Icon name="bell" />
            <Icon name="caret-down" />
          </button>
          <button
            className="account-button"
            aria-label="Menu akun"
            aria-expanded={menu === "account"}
            onClick={() => setMenu(menu === "account" ? "" : "account")}
          >
            <Picture
              name={
                dashboard
                  ? "avatar-header"
                  : profile.photo === "student"
                    ? "student-header"
                    : profile.photo
              }
            />
            <span className="online" />
            <Icon name="caret-down" />
          </button>
        </div>
        {menu && (
          <div className="header-menu">
            {menu === "notifications" ? (
              <>
                <strong>Notifikasi</strong>
                <p>Selamat datang di LMSKU!</p>
                <button onClick={() => setMenu("")}>Tandai sudah dibaca</button>
              </>
            ) : (
              <>
                <strong>{profile.name}</strong>
                <button
                  onClick={() => {
                    setModal({ type: "profile", title: "Profil Saya" });
                    setMenu("");
                  }}
                >
                  Profil Saya
                </button>
                <button onClick={() => go("/Dashboard")}>Dashboard</button>
                <button
                  onClick={() => {
                    setProgress({});
                    setMenu("");
                    openInfo(
                      "Sesi demo direset",
                      "Progres latihan telah direset.",
                    );
                  }}
                >
                  Reset Sesi Demo
                </button>
              </>
            )}
          </div>
        )}
      </header>
      <nav className="red-rail" aria-label="Navigasi utama">
        <button
          title="Dashboard"
          aria-label="Kembali ke Dashboard"
          onClick={() => go("/Dashboard")}
        >
          <Icon name="house" />
        </button>
      </nav>
      <main className={dashboard ? "dashboard-main" : "course-main"}>
        {dashboard ? (
          <div className="dashboard-sheet">
            <section className="welcome">
              <Picture name="female" />
              <div>
                <h1>
                  <strong>Halloo,</strong>{" "}
                  {profile.name === "lutfiacr" ? "lutfiac" : profile.name} !{" "}
                  <Icon name="hand" className="wave" />
                </h1>
                <p>
                  {profile.email === "lutfia2603@gmail.com"
                    ? "lutfia260310@gmail.com"
                    : profile.email}
                </p>
              </div>
              <button
                aria-label="Edit profil"
                onClick={() =>
                  setModal({ type: "profile", title: "Profil Saya" })
                }
              >
                <Icon name="pen" />
              </button>
            </section>
            <Picture
              name="hero"
              className="hero"
              alt="Belajar seru di LMS — Learning Management System"
            />
            <section className="stats">
              {[
                ["chart-line", "410 Poin", "Jumlah Poin Tahun Berjalan"],
                [
                  "star-half-stroke",
                  "18396",
                  "Peringkat Saya dari Seluruh Peserta",
                ],
                ["ticket", "2", "Jumlah Sertifikat"],
                ["award", "-", "Kegiatan Saya"],
              ].map(([icon, value, label], i) => (
                <button
                  key={label}
                  onClick={() =>
                    openInfo(
                      label,
                      `${value} — data tampilan contoh dari screenshot.`,
                    )
                  }
                >
                  <span className={`stat-icon stat-${i}`}>
                    <Icon name={icon} />
                  </span>
                  <span>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                </button>
              ))}
            </section>
            <section className="leaderboard">
              <div className="section-line">
                <h2>5 User Peringkat Tertinggi</h2>
                <span>
                  <Icon name="calendar" /> Agustus 2026
                </span>
              </div>
              <div className="leaders">
                {leaders.map((name, i) => (
                  <div key={name}>
                    <Picture name={`leader-${i}`} />
                    <div className={`leader-name rank-${i}`}>
                      <span className="rank">
                        <Icon name="award" />
                        <b>{i + 1}</b>
                      </span>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="module-section accessed">
              <h2>Modul yang telah diakses</h2>
              <div className="module-grid">
                {modules.map((name, index) => (
                  <ModuleCard key={name} {...{ name, index }} />
                ))}
              </div>
            </section>
            <section className="module-section available-section">
              <div className="section-line">
                <h2>Modul yang tersedia</h2>
                <div className="filters">
                  <select
                    aria-label="Urutkan modul"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="default">A-Z</option>
                    <option value="az">Nama A-Z</option>
                    <option value="za">Nama Z-A</option>
                  </select>
                  <div className="search">
                    <input
                      aria-label="Cari modul"
                      placeholder="Cari modul"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Icon name="magnifying-glass" />
                  </div>
                </div>
              </div>
              <div className="module-grid">
                {filtered.map((m) => (
                  <ModuleCard key={m.index} {...m} available />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="empty-state">
                  Tidak ada modul yang cocok dengan “{query}”.{" "}
                  <button onClick={() => setQuery("")}>Hapus pencarian</button>
                </p>
              )}
            </section>
            <section className="academy">
              <div className="section-line">
                <h2>LMSKU ACADEMY</h2>
                <button
                  className="text-link"
                  onClick={() =>
                    openInfo(
                      "LMSKU Academy",
                      "Daftar kelas mengikuti screenshot. Pendaftaran tidak tersedia dalam prototipe lokal.",
                    )
                  }
                >
                  Lihat Selengkapnya
                </button>
              </div>
              <h3>Kelas Online Edukasi Keuangan</h3>
              <div className="academy-grid">
                {events.map((title, i) => (
                  <article className="event-card" key={title}>
                    <button
                      className="event-image"
                      onClick={() =>
                        openInfo(
                          title,
                          "Sesi telah berakhir. Informasi acara mengikuti tampilan referensi.",
                        )
                      }
                    >
                      <Picture name={`academy-${i}`} alt={title} />
                    </button>
                    <h4>{title}</h4>
                    <p>
                      <Icon name="users" /> {550 + i * 12}
                    </p>
                    <p>
                      <Icon name="user" />{" "}
                      {
                        [
                          "Woro Ariyandini",
                          "Chirina Albandar",
                          "KADIX EKA YUPITRA",
                          "OJK Indonesia",
                          "Yudi Adi Pradana",
                          "Berbagai Narasumber Menarik",
                          "M. Yusuf Muda",
                          "OJK",
                        ][i]
                      }
                    </p>
                    <p>
                      <Icon name="calendar" />{" "}
                      {
                        [
                          "Thursday, 10 September 2026",
                          "Monday, 10 August 2026",
                          "Thursday, 16 July 2026",
                          "Wednesday, 10 June 2026",
                          "Friday, 08 May 2026",
                          "Tuesday, 21 April 2026",
                          "Friday, 10 April 2026",
                          "Tuesday, 10 March 2026",
                        ][i]
                      }{" "}
                      09:00 - 11:00 WIB
                    </p>
                    <button className="ended-button" disabled>
                      Sesi Telah Berakhir
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <section className="resource-section">
              {[
                [
                  "e-library",
                  "Akses e-library OJK",
                  "Lihat disini",
                  "https://perpustakaan.ojk.go.id/",
                ],
                [
                  "Minisite Sikapi Uangmu",
                  "Materi literasi dan edukasi keuangan serta buku panduan Learning Management System dapat diakses melalui minisite SikapiUangmu",
                  "Masuk",
                  "https://sikapiuangmu.ojk.go.id/",
                ],
              ].map(([title, description, label, url]) => (
                <article className="resource" key={title}>
                  <div>
                    <h3>
                      <Icon name="clipboard" /> {title}
                    </h3>
                    <p>{description}</p>
                  </div>
                  <a
                    className="red-button"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                </article>
              ))}
            </section>
          </div>
        ) : detail ? (
          renderDetail()
        ) : (
          <div className="course-layout">
            <section
              className={`panel ${category ? "category-panel" : "activities-panel"}`}
            >
              <h1>
                {category
                  ? `Kategori Modul ${moduleName}`
                  : `${moduleName} ${route.level}`}
              </h1>
              {category ? (
                <div className="category-grid">
                  {["Basic", "Intermediate"].map((level) => (
                    <button
                      className="category-tile"
                      key={level}
                      onClick={() => go(activityURL(level))}
                    >
                      <Picture name="document" />
                      <span>
                        {moduleName}
                        <br />
                        {level}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="activities-body">
                  <h2>Video ILM (Iklan Layanan Masyarakat)</h2>
                  <div className="activity-group video-group">
                    {tile("video", `Video edukasi ${moduleName}`, "video")}
                  </div>
                  <h2>Pre Test</h2>
                  {tile("test", "Pre-test", "pre", "single-tile")}
                  <h2 className="material-heading">
                    Materi {moduleName} {route.level}
                  </h2>
                  <div className="activity-group material-grid">
                    {lessons.map((name, i) => (
                      <React.Fragment key={name}>
                        {tile(
                          "document",
                          `${i + 1}. ${moduleIndex === 10 ? name : name.replaceAll("Keuangan Syariah", moduleName)}`,
                          String(i),
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <h2>Post Test</h2>
                  {tile("test", "Post-test", "post", "single-tile")}
                </div>
              )}
              {backButton}
            </section>
            <SideProfile />
          </div>
        )}
      </main>
      <button
        className="chat-launcher"
        onClick={() => setChat(!chat)}
        aria-expanded={chat}
      >
        <Picture name="chat" />
        <span>
          <strong>Forum Diskusi</strong>
          <small>Anda Aktif</small>
        </span>
      </button>
      {chat && (
        <section className="chat-panel">
          <div className="chat-title">
            <strong>Forum Diskusi</strong>
            <button onClick={() => setChat(false)} aria-label="Tutup forum">
              <Icon name="xmark" />
            </button>
          </div>
          <div className="chat-messages">
            <p className="chat-hint">
              Ruang diskusi demo lokal. Pesan hanya tampil pada sesi ini.
            </p>
            {messages.map((m, i) => (
              <div className="chat-message" key={i}>
                <strong>{profile.name}</strong>
                <p>{m}</p>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) {
                setMessages([...messages, draft.trim()]);
                setDraft("");
              }
            }}
          >
            <input
              aria-label="Pesan diskusi"
              placeholder="Tulis pesan..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button aria-label="Kirim pesan" type="submit">
              <Icon name="paper-plane" />
            </button>
          </form>
        </section>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <h2 id="modal-title">{modal.title}</h2>
              <button
                autoFocus
                aria-label="Tutup"
                onClick={() => setModal(null)}
              >
                <Icon name="xmark" />
              </button>
            </div>
            {modal.type === "profile" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  setProfile({
                    ...profile,
                    name: data.get("name"),
                    email: data.get("email"),
                  });
                  setModal(null);
                }}
              >
                <label>
                  Nama
                  <input name="name" required defaultValue={profile.name} />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={profile.email}
                  />
                </label>
                <button className="red-button" type="submit">
                  Simpan
                </button>
              </form>
            ) : modal.type === "photo" ? (
              <>
                <p>Pilih foto profil</p>
                <div className="photo-options">
                  {["student", "female", "avatar"].map((name) => (
                    <button
                      aria-label={`Pilih foto ${name}`}
                      key={name}
                      className={profile.photo === name ? "selected" : ""}
                      onClick={() => {
                        setProfile({ ...profile, photo: name });
                        setModal(null);
                      }}
                    >
                      <Picture name={name} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>{modal.body}</p>
                <button className="red-button" onClick={() => setModal(null)}>
                  Tutup
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
