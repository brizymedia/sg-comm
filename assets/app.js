/* SG COMM(에스지씨오엠엠) 홈페이지 — 공통 스크립트 (외부 라이브러리 없음) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  /* ---------- 회사 정보 · 문의 폼 전송처 ----------
     FORM_ENDPOINT 가 비어 있으면: 휴대폰은 문자 앱이 열리고(SMS_TO 로), PC 는 내용을 복사한 뒤 전화 안내.
     오픈할 때 큰길브리지 공용 문의 서버(앱스 스크립트) 주소를 넣으면 대표님 메일로 간다. */
  var FORM_ENDPOINT = '';
  var SMS_TO = '010-2224-7770';
  var TEL = '032-441-2249';
  var COMPANY = 'SG COMM';

  /* ---------- 공지사항 (맨 앞이 최신. n: true 는 상단 고정) ---------- */
  var NOTICES = [
    { d: '2026.10.05', t: 'SG COMM 홈페이지를 새로 단장했습니다.', b: '행사대행부터 무대 · 음향 · 조명 · 영상 장비 렌탈까지 한곳에서 상담하세요.', n: true },
    { d: '2026.10.05', t: '연중무휴로 행사 상담을 받고 있습니다.', b: '급한 행사도 바로 연락 주세요. 대표전화 032-441-2249' },
    { d: '2026.10.05', t: '보유 장비 · 렌탈 기준가를 한 페이지에 정리했습니다.', b: '음향 A~E세트, 조명 A~E세트, 무대 · LED 전광판 · 중계카메라 · 행사용품' }
  ];

  /* ---------- 자료실 ---------- */
  var FILES = [
    { d: '2026.10.05', t: '장비 렌탈 기준가표 — 음향 · 조명 · 무대 · 영상 · 행사용품', k: '보유 장비 페이지', u: 'equipment.html' },
    { d: '2026.10.05', t: 'LED 전광판 인치별 크기표 (4:3 · 16:9, 150 · 200 · 300인치)', k: '보유 장비 페이지', u: 'equipment.html#video' },
    { d: '2026.10.05', t: '행사대행 · 전문인력(MC · 감독 · 스텝 · 도우미) 운영 기준가', k: '하는 일 페이지', u: 'service.html#staff' }
  ];

  /* ---------- 현장 사진 (assets/img/works/w01~ · 썸네일 t01~)
     c: cere 기공·준공·개관식 · fest 축제·공연 · meet 포럼·시상·기업행사 · design 무대 디자인 시안 ---------- */
  var WORKS = [
    { i: 1, t: '인천 해외 문화예술교류축제 메인 무대', o: '축제 · 인천', c: 'fest' },
    { i: 2, t: '2024 국제해양 · 안전대전 개막 무대', o: '전시 · 박람회', c: 'meet' },
    { i: 3, t: '국제해양 · 안전대전 개막 테이프 커팅', o: '전시 · 박람회', c: 'meet cere' },
    { i: 4, t: '국제해양 · 안전대전 행사장 객석 · 백월', o: '전시 · 박람회', c: 'meet' },
    { i: 5, t: '제4회 진주 재즈 콘서트 무대 조명', o: '공연 · 진주', c: 'fest' },
    { i: 6, t: '2024 서울 마포 토정월드 페스티벌 LED 무대', o: '축제 · 서울 마포', c: 'fest' },
    { i: 7, t: '토정월드 페스티벌 야외 공연', o: '축제 · 서울 마포', c: 'fest' },
    { i: 8, t: '2024 청소년 정책 100인 토론회 음향 콘솔', o: '토론회', c: 'meet' },
    { i: 9, t: '청소년 정책 100인 토론회 행사장', o: '토론회', c: 'meet' },
    { i: 10, t: '상전 유통 학술시상식 무대 · 스크린', o: '시상식', c: 'meet' },
    { i: 11, t: '시상식 연회장 음향 · 영상 운영', o: '시상식', c: 'meet' },
    { i: 12, t: 'LG U+ 「내편하자」 기자간담회', o: '기업행사', c: 'meet' },
    { i: 13, t: '해양경찰 관현악단 새봄 음악회', o: '공연', c: 'fest' },
    { i: 14, t: '동문건설 워크숍 음향 운영', o: '기업행사 · 워크숍', c: 'meet' },
    { i: 15, t: '2022 인천광역시 평생교육포럼 · 비전선포식', o: '포럼 · 인천', c: 'meet cere' },
    { i: 16, t: '일신공원 어린이물놀이장 준공식', o: '준공식 · 인천 부평', c: 'cere' },
    { i: 17, t: '계양구 청소년문화의 집 건립공사 기공식', o: '기공식 · 인천 계양', c: 'cere' },
    { i: 18, t: '부평2동 행정복지센터 건립 기공식', o: '기공식 · 인천 부평', c: 'cere' },
    { i: 19, t: '송도 워터프런트 건설공사 기공식', o: '기공식 · 인천 송도', c: 'cere' },
    { i: 20, t: '십정녹지 야외무대 설치공사 준공식', o: '준공식 · 인천 부평', c: 'cere' },
    { i: 21, t: '성남시 의료원 개원식 무대', o: '개원식 · 성남', c: 'cere' },
    { i: 22, t: '성남문화예술교육센터 개관식', o: '개관식 · 성남', c: 'cere' },
    { i: 23, t: '제78회 나무심기 행사 · 백운근린공원 준공식', o: '준공식 · 인천', c: 'cere' },
    { i: 24, t: '해양재난구조대 발대식', o: '발대식', c: 'cere meet' },
    { i: 25, t: '해양경찰청 입주식', o: '기념식 · 인천', c: 'cere' },
    { i: 26, t: '2013 인천공항 우수항공사 시상식', o: '시상식 · 인천공항', c: 'meet' },
    { i: 27, t: '2019 Spring Festival 「봄바람을 BSB와 함께」', o: '축제', c: 'fest' },
    { i: 28, t: '인천 중구 마을공동체 리뷰축제', o: '축제 · 인천 중구', c: 'fest' },
    { i: 29, t: '제12회 2017 광명시 문화의 한마당', o: '축제 · 광명', c: 'fest' },
    { i: 30, t: '제15회 금융투자인 마라톤대회 백월', o: '체육행사', c: 'fest' },
    { i: 31, t: '제5회 서울무용영화제 「영화와 춤추다」', o: '공연 · 서울', c: 'fest' },
    { i: 32, t: '인천 해외 문화예술교류축제 공연', o: '축제 · 인천', c: 'fest' },
    { i: 33, t: '문화예술교류축제 야외 무대 · LED', o: '축제 · 인천', c: 'fest' },
    { i: 34, t: '문화예술교류축제 포토 홍보관', o: '축제 · 인천', c: 'fest design' },
    { i: 35, t: '2018 제96회 어린이날 행사', o: '축제 · 인천', c: 'fest' },
    { i: 36, t: '푸드락 페스티벌 트러스 무대', o: '축제', c: 'fest' },
    { i: 37, t: '야외 행사 무대 디자인 시안 (3D)', o: '무대 디자인', c: 'design' },
    { i: 38, t: '문화 페스티벌 트러스 무대 시안 (3D)', o: '무대 디자인', c: 'design' },
    { i: 39, t: '축제 메인 무대 디자인 시안 (3D)', o: '무대 디자인', c: 'design' },
    { i: 40, t: '문화예술교류축제 무대 백드롭 시안', o: '무대 디자인', c: 'design' },
    { i: 41, t: '어린이날 행사 무대 디자인 시안', o: '무대 디자인', c: 'design' },
    { i: 42, t: '기념식 무대 디자인 시안 (3D)', o: '무대 디자인', c: 'design' }
  ];
  var IMG = 'assets/img/works/';
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------- 네이버 블로그 행사 기록 (blog.naver.com/sugoo99 — 새 글은 맨 앞에) ---------- */
  var BLOG = [
    { d: "2025.04.11", t: "인천 중구 마을공동체 리뷰축제", u: "https://blog.naver.com/sugoo99/223829945845" },
    { d: "2025.04.11", t: "2024 청소년 정책 100인토론회", u: "https://blog.naver.com/sugoo99/223829930662" },
    { d: "2025.04.11", t: "일신공원 어린이물놀이장 준공식", u: "https://blog.naver.com/sugoo99/223829927215" },
    { d: "2025.04.11", t: "2024 국제해양.안전대전", u: "https://blog.naver.com/sugoo99/223829923933" },
    { d: "2025.04.11", t: "2024 국제해양.안전대전", u: "https://blog.naver.com/sugoo99/223829919125" },
    { d: "2025.04.11", t: "상전 유통 학술시상식", u: "https://blog.naver.com/sugoo99/223829907259" },
    { d: "2025.04.11", t: "2023년 제3회 생활체육교실운영 발표회", u: "https://blog.naver.com/sugoo99/223829900575" },
    { d: "2025.04.11", t: "LG U 플러스 \"내편하자\" 기자간담회", u: "https://blog.naver.com/sugoo99/223829890025" },
    { d: "2025.04.11", t: "해양경찰 관현악단 새봄 음악회", u: "https://blog.naver.com/sugoo99/223829878149" },
    { d: "2025.04.11", t: "동문건설 워크샵", u: "https://blog.naver.com/sugoo99/223829876441" },
    { d: "2025.04.11", t: "김포시 아동보호전문기관 개관식", u: "https://blog.naver.com/sugoo99/223829873476" },
    { d: "2025.04.11", t: "2022 인천광역시 평생학습도시 평생교육포럼및 비전선포식", u: "https://blog.naver.com/sugoo99/223829865826" },
    { d: "2025.04.10", t: "계양구 청소년문화의 집 건립공사 기공식", u: "https://blog.naver.com/sugoo99/223828637857" },
    { d: "2025.04.10", t: "성남문화예술교육센터 개관식", u: "https://blog.naver.com/sugoo99/223828625625" },
    { d: "2025.04.10", t: "길주로 도시바람길 연결숲 조성공사 착공식", u: "https://blog.naver.com/sugoo99/223828621219" },
    { d: "2025.04.10", t: "부평2동 행정복지센터 건립 기공식", u: "https://blog.naver.com/sugoo99/223828605199" },
    { d: "2025.04.10", t: "씨사이드 파크 가족문화 나들이", u: "https://blog.naver.com/sugoo99/223828600999" },
    { d: "2025.04.10", t: "2019 spring festival '봄바람을 bsb와 함께'", u: "https://blog.naver.com/sugoo99/223828597504" },
    { d: "2025.04.10", t: "어린이날 행사 \"씨사이드와 함께 가족문화 나들이\"", u: "https://blog.naver.com/sugoo99/223828589368" },
    { d: "2025.04.10", t: "제4회 진주 재즈 콘서트", u: "https://blog.naver.com/sugoo99/223828584271" },
    { d: "2025.04.10", t: "2016 제5회 미래도시 그리기 대회", u: "https://blog.naver.com/sugoo99/223828572114" },
    { d: "2025.04.10", t: "2017년 불법 외국어선 단속역량 경연대회", u: "https://blog.naver.com/sugoo99/223828553201" },
    { d: "2025.04.10", t: "인천 개항장 여행 \"밤마실\"", u: "https://blog.naver.com/sugoo99/223828547748" },
    { d: "2025.04.10", t: "제12회 2017 광명시 문화의 한마당", u: "https://blog.naver.com/sugoo99/223828516081" },
    { d: "2025.04.10", t: "성남시 의료원 개원식", u: "https://blog.naver.com/sugoo99/223828464745" },
    { d: "2025.04.10", t: "길주로 도시바람길 연결숲 조성공사 착공식", u: "https://blog.naver.com/sugoo99/223828456972" },
    { d: "2025.04.10", t: "십정녹지 야외무대 설치공사 준공식", u: "https://blog.naver.com/sugoo99/223828449117" },
    { d: "2025.04.09", t: "제80회 식목일 나무심기 행사", u: "https://blog.naver.com/sugoo99/223827397126" },
    { d: "2025.04.09", t: "제 80회 식목일 나무심기 행사 현수막", u: "https://blog.naver.com/sugoo99/223827394824" },
    { d: "2025.04.09", t: "2017 경향포럼", u: "https://blog.naver.com/sugoo99/223827380110" },
    { d: "2025.04.09", t: "제15회 금융투자인 마라톤대회", u: "https://blog.naver.com/sugoo99/223827374939" },
    { d: "2025.04.09", t: "제 96회 어린이날 행사", u: "https://blog.naver.com/sugoo99/223827365307" },
    { d: "2025.04.09", t: "해질녁서 동틀때까지 생명사랑 밤길걷기", u: "https://blog.naver.com/sugoo99/223827361549" },
    { d: "2025.04.09", t: "제5회 서울무용영화제 영화와 춤추다", u: "https://blog.naver.com/sugoo99/223827281147" },
    { d: "2025.04.09", t: "제 78회 나무심기행사 백운근린공원 4단계 조성사업 준공식", u: "https://blog.naver.com/sugoo99/223827270629" },
    { d: "2025.04.09", t: "굴포공원 실내배드미턴장 조성사업 준공식", u: "https://blog.naver.com/sugoo99/223827240103" },
    { d: "2025.04.09", t: "6.25전쟁 참전 호국유공자 기념비 제막식", u: "https://blog.naver.com/sugoo99/223827237739" },
    { d: "2025.04.09", t: "해양재난구조대 발대식", u: "https://blog.naver.com/sugoo99/223827234285" },
    { d: "2025.04.09", t: "2024 서울 마포 토정월드 페스티벌", u: "https://blog.naver.com/sugoo99/223827231229" },
    { d: "2025.04.09", t: "동암마을 주민공동이용시설 준공식", u: "https://blog.naver.com/sugoo99/223827228841" },
    { d: "2025.04.09", t: "송도 워터프런트 건설공사 기공식", u: "https://blog.naver.com/sugoo99/223827215007" },
    { d: "2025.04.09", t: "일신동 주민센터 건립기공식", u: "https://blog.naver.com/sugoo99/223827198567" },
    { d: "2025.04.09", t: "2013년 인천공항 우수항공사 시상식", u: "https://blog.naver.com/sugoo99/223827194402" },
    { d: "2025.04.09", t: "길주로 도시바람길 연결숲 조성공사 착공식", u: "https://blog.naver.com/sugoo99/223827191493" },
    { d: "2025.04.08", t: "상꾸지어린이공원 준공식", u: "https://blog.naver.com/sugoo99/223826569217" },
    { d: "2019.03.11", t: "인천 해외 문화예술교류축제 무대 백드롭세트 및 포토홍보관", u: "https://blog.naver.com/sugoo99/221485351348" },
    { d: "2019.03.11", t: "인천해양경찰청 홍보관", u: "https://blog.naver.com/sugoo99/221485347520" },
    { d: "2019.03.11", t: "2018 제96회 어린이날 행사", u: "https://blog.naver.com/sugoo99/221485343918" },
    { d: "2019.03.11", t: "해양경찰청 입주식", u: "https://blog.naver.com/sugoo99/221485338168" },
    { d: "2019.03.11", t: "인천 해외 문화예술교류축제", u: "https://blog.naver.com/sugoo99/221485329212" },
  ];

  /* ---------- 머리 띠 · 모바일 메뉴 · 맨 위로 ---------- */
  var hd = $('#hd'), totop = $('#totop');
  function onScroll() {
    var y = window.scrollY;
    if (hd) hd.classList.toggle('stuck', y > 40);
    if (totop) totop.classList.toggle('on', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  var curPage = location.pathname.split('/').pop() || 'index.html';
  $$('.hd nav a, .sheet nav a').forEach(function (a) { if ((a.getAttribute('href') || '').split('#')[0] === curPage) a.classList.add('act'); });

  var burger = $('#burger'), sheet = $('#sheet');
  function closeSheet() { if (!sheet) return; sheet.classList.remove('on'); burger.classList.remove('x'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      var on = sheet.classList.toggle('on'); burger.classList.toggle('x', on); burger.setAttribute('aria-expanded', on);
      document.body.style.overflow = on ? 'hidden' : '';
    });
    $$('a, .x', sheet).forEach(function (a) { a.addEventListener('click', closeSheet); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('on')) closeSheet(); });
  }

  /* ---------- 콘솔 히어로 ----------
     페이더 4개(무대 · 음향 · 조명 · 영상). 하나를 올리면 배경 현장 사진이 바뀌고 파란 빔이 훑고 지나간다.
     가만히 두면 5.5초마다 다음 채널 페이더가 저절로 올라간다. 폰에서는 같은 단추가 4칸 탭이 된다. */
  var hero = $('#hero');
  if (hero) {
    var chs = $$('.ch', hero), bgs = $$('.bg', hero), beams = $('.beams', hero), ro = $('#readout');
    var small = window.matchMedia('(max-width: 960px)');
    var CH = [
      { h: '무대 — 디자인부터 설치 · 철거까지', p: '조립식 무대 · 트러스 · 백월(백세트)을 행사 콘셉트에 맞게 디자인해 직접 설치합니다.', u: 'equipment.html#stage', l: '무대 세트 보기' },
      { h: '음향 — 소형 A세트부터 대형 E세트', p: 'QSC 스피커 · X32 디지털 믹서 · 무선마이크 구성. 배송 · 설치 · 운영 · 철거 포함.', u: 'equipment.html#sound', l: '음향 세트 보기' },
      { h: '조명 — 무빙 LED · 빔 · 스팟', p: '무빙 라이트 패키지, 팔로우 스팟, 포그머신, 트러스까지 무대를 살리는 빛.', u: 'equipment.html#light', l: '조명 세트 보기' },
      { h: '영상 — LED 전광판 · 중계카메라', p: '150 ~ 300인치 LED 전광판과 카메라 2대 라이브 송출 · 녹화.', u: 'equipment.html#video', l: '영상 장비 보기' }
    ];
    var cur = -1, timer = null, hold = 0;
    // 화면 폭에 맞는 사진만 불러온다
    function loadBg(i) { var b = bgs[i]; if (!b || b.getAttribute('data-ok')) return; var src = b.getAttribute(small.matches ? 'data-m' : 'data-d'); b.style.backgroundImage = 'url(' + src + ')'; b.setAttribute('data-ok', '1'); }
    function setLevel(c, lv) { c.style.setProperty('--lv', lv); }
    function go(i, user) {
      i = (i + chs.length) % chs.length;
      if (i === cur) return;
      cur = i; loadBg(i); loadBg((i + 1) % chs.length);
      chs.forEach(function (c, k) { var on = k === i; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); setLevel(c, on ? .86 : .16); });
      bgs.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      if (!reduce && beams) { beams.classList.remove('sweep', 'idle'); void beams.offsetWidth; beams.classList.add('sweep'); clearTimeout(beams._t); beams._t = setTimeout(function () { beams.classList.remove('sweep'); beams.classList.add('idle'); }, 2900); }
      if (ro) {
        var d = CH[i];
        ro.innerHTML = '<div class="fade"><p class="scr"><i></i>CH ' + (i + 1) + ' · ON AIR</p><h2>' + d.h + '</h2><p>' + d.p + '</p><a href="' + d.u + '">' + d.l + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>';
      }
      if (user) hold = Date.now() + 12000;
    }
    function tick() { if (Date.now() < hold || document.hidden) return; go(cur + 1); }
    function start() { clearInterval(timer); if (!reduce) timer = setInterval(tick, 5500); }
    chs.forEach(function (c, i) {
      c.addEventListener('click', function () { go(i, true); });
      // 페이더 끌어 올리기 (데스크톱)
      var f = $('.fader', c);
      if (!f) return;
      f.addEventListener('pointerdown', function (e) {
        if (small.matches) return;
        e.preventDefault(); e.stopPropagation(); f.setPointerCapture(e.pointerId); c.classList.add('drag');
        function lvAt(ev) { var r = f.getBoundingClientRect(); return Math.max(0, Math.min(1, (r.bottom - 6 - ev.clientY) / (r.height - 12))); }
        setLevel(c, lvAt(e));
        function mv(ev) { var lv = lvAt(ev); setLevel(c, lv); if (lv > .55 && cur !== i) go(i, true); }
        function up(ev) { f.removeEventListener('pointermove', mv); f.removeEventListener('pointerup', up); f.removeEventListener('pointercancel', up); c.classList.remove('drag'); var lv = lvAt(ev); if (lv > .4) { cur = -1; go(i, true); } else setLevel(c, i === cur ? .86 : .16); }
        f.addEventListener('pointermove', mv); f.addEventListener('pointerup', up); f.addEventListener('pointercancel', up);
      });
    });
    loadBg(0);
    go(0); start();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
    small.addEventListener && small.addEventListener('change', function () { bgs.forEach(function (b) { b.removeAttribute('data-ok'); }); loadBg(cur); });
  }

  /* ---------- 등장 ---------- */
  var rvs = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  } else rvs.forEach(function (el) { el.classList.add('in'); });

  /* ---------- 갤러리 (대문 7장 · 현장 사진 전체) ---------- */
  function card(w, k) {
    return '<figure data-k="' + k + '" data-c="' + w.c + '"><img src="' + IMG + 't' + pad(w.i) + '.webp" alt="' + esc(w.t) + '" loading="lazy" width="640" height="480"><figcaption><em>' + esc(w.o) + '</em><b>' + esc(w.t) + '</b></figcaption></figure>';
  }
  var gal = $('#gal'), pf = $('#pfGrid'), list = [];
  if (gal) { list = [1, 2, 5, 6, 10, 16, 19, 33, 37].map(function (i) { return WORKS[i - 1]; }); gal.innerHTML = list.map(card).join(''); }
  if (pf) { list = WORKS; pf.innerHTML = list.map(card).join(''); }
  var grid = gal || pf, lb = $('#lb');
  if (grid && lb) {
    var figs = $$('figure', grid), lbImg = $('#lbImg'), lbT = $('#lbT'), lbM = $('#lbM'), lbK = 0, lastFocus = null;
    function vis() { return figs.filter(function (f) { return !f.classList.contains('hide'); }).map(function (f) { return +f.getAttribute('data-k'); }); }
    function openLb(k) { var w = list[k]; lbK = k; lbImg.src = IMG + 'w' + pad(w.i) + '.webp'; lbImg.alt = w.t; lbT.textContent = w.t; lbM.textContent = w.o; if (!lb.classList.contains('on')) lastFocus = document.activeElement; lb.classList.add('on'); document.body.style.overflow = 'hidden'; $('.x', lb).focus(); }
    function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
    function step(d) { var v = vis(), i = v.indexOf(lbK); openLb(v[(i + d + v.length) % v.length]); }
    figs.forEach(function (f) { f.tabIndex = 0; f.setAttribute('role', 'button'); f.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(+f.getAttribute('data-k')); } }); });
    grid.addEventListener('click', function (e) { var f = e.target.closest('figure'); if (f) openLb(+f.getAttribute('data-k')); });
    $('.x', lb).addEventListener('click', closeLb); $('.p', lb).addEventListener('click', function () { step(-1); }); $('.n', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }, { passive: true });
    var filters = $('#filters');
    if (filters) {
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        $$('button', filters).forEach(function (x) { x.classList.remove('act'); x.setAttribute('aria-pressed', 'false'); }); b.classList.add('act'); b.setAttribute('aria-pressed', 'true');
        var f = b.getAttribute('data-f');
        figs.forEach(function (fg) { fg.classList.toggle('hide', f !== 'all' && fg.getAttribute('data-c').split(' ').indexOf(f) < 0); });
      });
      $$('button', filters).forEach(function (b) { var f = b.getAttribute('data-f'), n = f === 'all' ? WORKS.length : WORKS.filter(function (w) { return w.c.split(' ').indexOf(f) >= 0; }).length; var s = document.createElement('small'); s.textContent = ' ' + n; b.appendChild(s); });
    }
  }

  /* ---------- 공지 · 블로그 미리보기 ---------- */
  $$('[data-notice]').forEach(function (el) {
    var n = +el.getAttribute('data-notice') || 3;
    el.innerHTML = NOTICES.length ? NOTICES.slice(0, n).map(function (x) { return '<li><small>' + x.d + '</small><b>' + esc(x.t) + (x.n ? '<span class="new">NEW</span>' : '') + '</b></li>'; }).join('') : '<li><b>등록된 공지가 없습니다.</b></li>';
  });
  $$('[data-blog]').forEach(function (el) {
    var n = +el.getAttribute('data-blog') || 5;
    el.innerHTML = BLOG.slice(0, n).map(function (b) { return '<a href="' + b.u + '" target="_blank" rel="noopener"><small>' + b.d + '</small><b>' + esc(b.t) + '</b>' + ARR + '</a>'; }).join('');
  });
  $$('[data-blogcount]').forEach(function (el) { el.textContent = BLOG.length; });

  /* ---------- 공지 · 블로그 · 자료실 페이지 ---------- */
  var tabs = $('#btabs');
  if (tabs) {
    var tbs = $$('button', tabs), panes = $$('.pane');
    function showTab(id) {
      tbs.forEach(function (b) { var on = b.getAttribute('data-t') === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      panes.forEach(function (p) { p.classList.toggle('on', p.id === id); });
    }
    tbs.forEach(function (b) { b.addEventListener('click', function () { showTab(b.getAttribute('data-t')); history.replaceState(null, '', '#' + b.getAttribute('data-t')); }); });
    $('[data-t="notice"] small', tabs).textContent = NOTICES.length;
    $('[data-t="blog"] small', tabs).textContent = BLOG.length;
    $('[data-t="files"] small', tabs).textContent = FILES.length;
    function fromHash() { var h = location.hash.slice(1); showTab(['notice', 'blog', 'files'].indexOf(h) >= 0 ? h : 'notice'); }
    fromHash(); window.addEventListener('hashchange', fromHash);
    $('#noticeBoard').innerHTML = NOTICES.length ? NOTICES.map(function (x, i) {
      return '<li><span class="no' + (x.n ? ' pin' : '') + '">' + (x.n ? '공지' : NOTICES.length - i) + '</span><b>' + esc(x.t) + (x.b ? '<small>' + esc(x.b) + '</small>' : '') + '</b><span class="d">' + x.d + '</span></li>';
    }).join('') : '<li class="empty">등록된 공지가 없습니다.</li>';
    var bb = $('#blogBoard'), pager = $('#blogPager'), q = $('#blogQ'), PER = 10, pg = 0, rows = BLOG;
    function drawBlog() {
      var total = Math.max(1, Math.ceil(rows.length / PER)); pg = Math.min(pg, total - 1);
      bb.innerHTML = rows.length ? rows.slice(pg * PER, pg * PER + PER).map(function (b) {
        return '<a class="row" href="' + b.u + '" target="_blank" rel="noopener"><span class="no">' + (BLOG.length - BLOG.indexOf(b)) + '</span><b>' + esc(b.t) + '</b><span class="d">' + b.d + '</span></a>';
      }).join('') : '<div class="row empty">찾는 글이 없습니다.</div>';
      var h = ''; for (var i = 0; i < total; i++) h += '<button type="button" class="' + (i === pg ? 'on' : '') + '" data-p="' + i + '" aria-label="' + (i + 1) + '쪽">' + (i + 1) + '</button>';
      pager.innerHTML = total > 1 ? h : '';
    }
    pager.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; pg = +b.getAttribute('data-p'); drawBlog(); bb.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); });
    q.addEventListener('input', function () { var k = q.value.trim(); rows = k ? BLOG.filter(function (b) { return b.t.indexOf(k) >= 0; }) : BLOG; pg = 0; drawBlog(); });
    drawBlog();
    var FI = '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg></span>';
    $('#fileBoard').innerHTML = FILES.map(function (f) { return '<a class="row" href="' + f.u + '">' + FI + '<b>' + esc(f.t) + '<small>' + esc(f.k) + '</small></b><span class="d">' + f.d + '</span></a>'; }).join('');
  }

  /* ---------- 장비 세트 → 문의 폼으로 ---------- */
  $$('[data-ask]').forEach(function (a) { a.setAttribute('href', 'contact.html#q=' + encodeURIComponent(a.getAttribute('data-ask') + ' 견적 문의드립니다.')); });

  /* ---------- 문의 보내기 ---------- */
  function isMobile() { return /iPhone|iPad|Android/i.test(navigator.userAgent); }
  function send(text, data, done) {
    function local() {
      if (isMobile()) { var ios = /iPhone|iPad/i.test(navigator.userAgent); location.href = 'sms:' + SMS_TO + (ios ? '&' : '?') + 'body=' + encodeURIComponent(text); done(true); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {});
      done(false);
    }
    if (!FORM_ENDPOINT) { local(); return; }
    data.at = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }); data.page = location.href; data.service = '[' + COMPANY + '] ' + (data.type || '행사') + ' 문의';
    data.message = text; data.phone = data.tel || ''; data.website = '';
    if (data.org) data.name = data.name + ' (' + data.org + ')';
    fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.ok) done(true); else local(); })
      .catch(local);
  }
  var form = $('#quoteForm');
  if (form) {
    var doneBox = $('#formDone');
    var pre = location.hash.match(/^#q=(.+)$/);
    if (pre && form.elements.msg) { try { form.elements.msg.value = decodeURIComponent(pre[1]); } catch (e) {} }
    var pt = location.hash.match(/^#type=(.+)$/);
    if (pt) { try { var want = decodeURIComponent(pt[1]); $$('option', form.elements.type).forEach(function (o) { if (o.value.indexOf(want) >= 0) form.elements.type.value = o.value; }); } catch (e) {} }
    $$('input,select,textarea', form).forEach(function (el) { el.addEventListener('input', function () { el.classList.remove('bad'); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.website && form.elements.website.value) return; // 스팸 봇 함정
      var d = {}; ['name', 'tel', 'org', 'type', 'date', 'place', 'people', 'msg'].forEach(function (k) { d[k] = form.elements[k] ? form.elements[k].value.trim() : ''; });
      d.need = $$('input[name="need"]:checked', form).map(function (x) { return x.value; }).join(', ');
      if (!d.name || !d.tel) { var el = d.name ? form.elements.tel : form.elements.name; el.classList.add('bad'); el.focus(); alert('성함과 연락처는 꼭 적어 주세요.'); return; }
      if (!$('#fAgree').checked) { alert('개인정보 수집 · 이용에 동의해 주세요.'); return; }
      var text = '[' + COMPANY + ' 행사 문의]\n성함: ' + d.name + '\n연락처: ' + d.tel + '\n기관 · 회사: ' + (d.org || '-') + '\n행사 종류: ' + d.type + '\n날짜: ' + (d.date || '-') + '\n장소: ' + (d.place || '-') + '\n인원: ' + (d.people || '-') + '\n필요한 것: ' + (d.need || '-') + '\n내용: ' + (d.msg || '-');
      send(text, d, function (sent) {
        doneBox.classList.add('on');
        $('p', doneBox).innerHTML = sent
          ? '문의가 전달되었습니다. 확인하는 대로 연락드리겠습니다. 급하시면 <b>' + TEL + '</b> 로 전화 주세요.'
          : '문의 내용을 복사해 두었습니다. <b>' + TEL + '</b> 로 전화 주시거나, <b>' + SMS_TO + '</b> 로 문자에 붙여 넣어 보내 주세요.';
        doneBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      });
    });
  }
})();
