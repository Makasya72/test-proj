import { chromium } from "playwright";
import { Prisma } from "@prisma/client";
import { db } from "../lib/db";
import {
  cleanModel,
  cleanTitle,
  detectBrandFromText,
  normalizeEngineCapacity,
  normalizeLocation,
  translateBrand,
  translateDescription,
  translateValue,
} from "../lib/translate";

type ScrapedCar = {
  sourceUrl: string;
  externalId: string | null;
  title: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  mileageKm: number | null;
  priceJpy: number | null;
  totalPriceJpy: number | null;
  bodyType: string | null;
  transmission: string | null;
  fuelType: string | null;
  color: string | null;
  location: string | null;
  engineCapacity: string | null;
  imageUrl: string | null;
  gallery: string[];
  description: string | null;
  rawPayload: Prisma.InputJsonValue;
};

const BASE_URL = process.env.SCRAPER_BASE_URL || "https://www.carsensor.net/";
const LIST_URL =
  process.env.SCRAPER_LIST_URL || "https://www.carsensor.net/usedcar/";
const MAX_PAGES = Number(process.env.SCRAPER_MAX_PAGES || 3);

const BRAND_MAP: Record<string, string> = {
  トヨタ: "Toyota",
  日産: "Nissan",
  ニッサン: "Nissan",
  ホンダ: "Honda",
  マツダ: "Mazda",
  スズキ: "Suzuki",
  ダイハツ: "Daihatsu",
  スバル: "Subaru",
  レクサス: "Lexus",
  三菱: "Mitsubishi",
  ミツビシ: "Mitsubishi",
  いすゞ: "Isuzu",
  イスズ: "Isuzu",
  光岡: "Mitsuoka",
  ミツオカ: "Mitsuoka",
  アウディ: "Audi",
  BMW: "BMW",
  "メルセデス・ベンツ": "Mercedes-Benz",
  ベンツ: "Mercedes-Benz",
  フォルクスワーゲン: "Volkswagen",
  VW: "Volkswagen",
  ポルシェ: "Porsche",
  プジョー: "Peugeot",
  ルノー: "Renault",
  フィアット: "Fiat",
  アルファロメオ: "Alfa Romeo",
  ボルボ: "Volvo",
  ミニ: "MINI",
  MINI: "MINI",
  ジープ: "Jeep",
  シボレー: "Chevrolet",
  フォード: "Ford",
  ジャガー: "Jaguar",
  ランドローバー: "Land Rover",
  ランドローバ: "Land Rover",
  フェラーリ: "Ferrari",
  ランボルギーニ: "Lamborghini",
  ベントレー: "Bentley",
  ロールスロイス: "Rolls-Royce",
  テスラ: "Tesla",
  BYD: "BYD",
};

const DICTIONARY: Record<string, string> = {
  // body types
  "クロカン・ＳＵＶ": "SUV",
  クロカンSUV: "SUV",
  ＳＵＶ: "SUV",
  SUV: "SUV",
  セダン: "Sedan",
  ミニバン: "Minivan",
  ハッチバック: "Hatchback",
  クーペ: "Coupe",
  オープン: "Convertible",
  ワゴン: "Wagon",
  軽自動車: "Kei car",

  // fuel
  ガソリン: "Petrol",
  ディーゼル: "Diesel",
  ハイブリッド: "Hybrid",
  電気: "Electric",
  EV: "Electric",

  // transmission
  オートマ: "Automatic",
  ＡＴ: "Automatic",
  AT: "Automatic",
  ＭＴ: "Manual",
  MT: "Manual",
  CVT: "CVT",
  インパネAT: "Dashboard Automatic",
  フロアAT: "Floor Automatic",

  // colors
  ブラック: "Black",
  ホワイト: "White",
  パール: "Pearl",
  シルバー: "Silver",
  グレー: "Gray",
  ブルー: "Blue",
  レッド: "Red",
  グリーン: "Green",
  イエロー: "Yellow",
  ブラウン: "Brown",
  パールホワイト: "Pearl White",
  ピュアホワイトパール: "Pure White Pearl",
  ホワイトパール: "White Pearl",
  ブラックマイカ: "Black Mica",

  // common car terms
  禁煙車: "Non-smoking",
  ワンオーナー: "One owner",
  修復歴なし: "No accident history",
  修復歴有: "Accident history",
  純正ナビ: "OEM navigation",
  メモリーナビ: "Memory navigation",
  バックカメラ: "Rear camera",
  全周囲カメラ: "360 camera",
  ドラレコ: "Dashcam",
  ETC: "ETC",
  LEDヘッドライト: "LED headlights",
  オートハイビーム: "Auto high beam",
  スマートキー: "Smart key",
  プッシュスタート: "Push start",
  シートヒーター: "Seat heater",
  両側電動スライドドア: "Dual power sliding doors",
  片側電動スライドドア: "Single power sliding door",
  電動スライドドア: "Power sliding door",
  衝突被害軽減ブレーキ: "Collision mitigation braking",
  衝突軽減ブレーキ: "Collision mitigation braking",
  安全装備: "Safety package",
  横滑り防止装置: "Stability control",
  横滑り防止: "Stability control",
  盗難防止装置: "Anti-theft system",
  クルーズコントロール: "Cruise control",
  アダプティブクルーズコントロール: "Adaptive cruise control",
  レーンアシスト: "Lane assist",
  レーンキープアシスト: "Lane keep assist",
  アイドリングストップ: "Idle stop",
  Bluetooth再生: "Bluetooth audio",
  フルセグ: "Full-segment TV",
  障害物センサー: "Parking sensors",
  アルミホイール: "Alloy wheels",
  本革シート: "Leather seats",
  サンルーフ: "Sunroof",

  // description phrases
  内外装: "Interior/exterior",
  目立たない: "minor",
  軽微なキズ: "minor scratches",
  ヘコミ: "dents",
  少し認められます: "slightly visible",
  良好な状態です: "in good condition",
  状態良好: "good condition",
  走行少なめ: "low mileage",
  程度良好: "well kept",
};
const PREFECTURE_MAP: Record<string, string> = {
  北海道: "Hokkaido",
  青森県: "Aomori",
  岩手県: "Iwate",
  宮城県: "Miyagi",
  秋田県: "Akita",
  山形県: "Yamagata",
  福島県: "Fukushima",
  茨城県: "Ibaraki",
  栃木県: "Tochigi",
  群馬県: "Gunma",
  埼玉県: "Saitama",
  千葉県: "Chiba",
  東京都: "Tokyo",
  神奈川県: "Kanagawa",
  新潟県: "Niigata",
  富山県: "Toyama",
  石川県: "Ishikawa",
  福井県: "Fukui",
  山梨県: "Yamanashi",
  長野県: "Nagano",
  岐阜県: "Gifu",
  静岡県: "Shizuoka",
  愛知県: "Aichi",
  三重県: "Mie",
  滋賀県: "Shiga",
  京都府: "Kyoto",
  大阪府: "Osaka",
  兵庫県: "Hyogo",
  奈良県: "Nara",
  和歌山県: "Wakayama",
  鳥取県: "Tottori",
  島根県: "Shimane",
  岡山県: "Okayama",
  広島県: "Hiroshima",
  山口県: "Yamaguchi",
  徳島県: "Tokushima",
  香川県: "Kagawa",
  愛媛県: "Ehime",
  高知県: "Kochi",
  福岡県: "Fukuoka",
  佐賀県: "Saga",
  長崎県: "Nagasaki",
  熊本県: "Kumamoto",
  大分県: "Oita",
  宮崎県: "Miyazaki",
  鹿児島県: "Kagoshima",
  沖縄県: "Okinawa",
};

function translate(value: string | null | undefined): string | null {
  if (!value) return null;

  let result = normalizeWhitespace(value);

  for (const [jp, en] of Object.entries(PREFECTURE_MAP)) {
    result = result.replaceAll(jp, en);
  }

  for (const [jp, en] of Object.entries(DICTIONARY)) {
    result = result.replaceAll(jp, en);
  }

  result = result
    .replaceAll("　", " ")
    .replace(/\s+/g, " ")
    .replace(/\s+\)/g, ")")
    .replace(/\(\s+/g, "(")
    .trim();

  return result || null;
}

function shortenModel(value: string | null | undefined): string | null {
  const translated = translate(value);
  if (!translated) return null;

  return translated
    .replace(/\bNon-smoking\b/gi, "")
    .replace(/\bOne owner\b/gi, "")
    .replace(/\bOEM navigation\b/gi, "")
    .replace(/\bRear camera\b/gi, "")
    .replace(/\b360 camera\b/gi, "")
    .replace(/\bLED headlights\b/gi, "")
    .replace(/\bSmart key\b/gi, "")
    .replace(/\bBluetooth audio\b/gi, "")
    .replace(/\bSeat heater\b/gi, "")
    .replace(/\bLane assist\b/gi, "")
    .replace(/\bCruise control\b/gi, "")
    .replace(/\bIdle stop\b/gi, "")
    .replace(/\bDashcam\b/gi, "")
    .replace(/\bETC\b/gi, "")
    .replace(/\bFull-segment TV\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[(),]?\s*$/g, "")
    .trim();
}

const JAPANESE_LABEL_MAP: Record<
  string,
  keyof Pick<
    ScrapedCar,
    | "bodyType"
    | "transmission"
    | "fuelType"
    | "color"
    | "location"
    | "engineCapacity"
  >
> = {
  ボディタイプ: "bodyType",
  車体色: "color",
  色: "color",
  燃料: "fuelType",
  ミッション: "transmission",
  駆動方式: "transmission",
  排気量: "engineCapacity",
  地域: "location",
  住所: "location",
};

function normalizeWhitespace(value: string | null | undefined): string {
  return (value || "").replace(/\s+/g, " ").replace(/[　]+/g, " ").trim();
}

function toAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const cleaned = url.trim();
  if (!cleaned) return null;
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://"))
    return cleaned;
  if (cleaned.startsWith("//")) return `https:${cleaned}`;
  try {
    return new URL(cleaned, BASE_URL).toString();
  } catch {
    return null;
  }
}

function parsePrice(text: string | null | undefined): number | null {
  const normalized = normalizeWhitespace(text);
  if (!normalized) return null;

  const cleaned = normalized.replace(/,/g, "");

  const yenMatch = cleaned.match(/¥\s*([\d]+)/);
  if (yenMatch) {
    const value = Number(yenMatch[1]);
    return Number.isSafeInteger(value) ? value : null;
  }

  const manMatch = cleaned.match(/([\d.]+)\s*万円/);
  if (manMatch) {
    const value = Math.round(Number(manMatch[1]) * 10000);
    return Number.isSafeInteger(value) ? value : null;
  }

  const enManMatch = cleaned.match(/([\d.]+)\s*万/);
  if (enManMatch) {
    const value = Math.round(Number(enManMatch[1]) * 10000);
    return Number.isSafeInteger(value) ? value : null;
  }

  const plainMatch = cleaned.match(/\b(\d{3,8})\b/);
  if (plainMatch) {
    const value = Number(plainMatch[1]);
    return Number.isSafeInteger(value) ? value : null;
  }

  return null;
}

function parseMileageKm(text: string | null | undefined): number | null {
  const normalized = normalizeWhitespace(text);
  if (!normalized) return null;

  const cleaned = normalized.replace(/,/g, "");

  const manMatch = cleaned.match(/([\d.]+)\s*万\s*km/i);
  if (manMatch) {
    const value = Math.round(Number(manMatch[1]) * 10000);
    return Number.isSafeInteger(value) ? value : null;
  }

  const kmMatch = cleaned.match(/(\d{1,7})\s*km/i);
  if (kmMatch) {
    const value = Number(kmMatch[1]);
    return Number.isSafeInteger(value) ? value : null;
  }

  return null;
}

function parseYear(text: string | null | undefined): number | null {
  const normalized = normalizeWhitespace(text);
  if (!normalized) return null;

  const western = normalized.match(/\b(19\d{2}|20\d{2})\b/);
  if (western) return Number(western[1]);

  const reiwa = normalized.match(/令和\s*(\d+)/);
  if (reiwa) return 2018 + Number(reiwa[1]);

  const heisei = normalized.match(/平成\s*(\d+)/);
  if (heisei) return 1988 + Number(heisei[1]);

  const shortJp = normalized.match(/(R|H)\s*(\d{1,2})/i);
  if (shortJp) {
    const era = shortJp[1].toUpperCase();
    const value = Number(shortJp[2]);
    return era === "R" ? 2018 + value : 1988 + value;
  }

  return null;
}

function sanitizeTitle(title: string): string {
  return normalizeWhitespace(
    title
      .replace(/\s*\|\s*.*/g, "")
      .replace(/【.*?】/g, "")
      .replace(/\[.*?\]/g, "")
  );
}

function splitBrandAndModel(title: string): {
  brand: string | null;
  model: string | null;
} {
  const cleanTitle = sanitizeTitle(title);
  if (!cleanTitle) {
    return { brand: null, model: null };
  }

  for (const [jp, en] of Object.entries(BRAND_MAP)) {
    if (
      cleanTitle.startsWith(jp + " ") ||
      cleanTitle === jp ||
      cleanTitle.startsWith(jp)
    ) {
      const model = cleanTitle
        .replace(new RegExp(`^${escapeRegExp(jp)}\\s*`), "")
        .trim();
      return {
        brand: en,
        model: model || null,
      };
    }
  }

  const firstToken = cleanTitle.split(" ")[0];
  if (BRAND_MAP[firstToken]) {
    return {
      brand: BRAND_MAP[firstToken],
      model: cleanTitle.slice(firstToken.length).trim() || null,
    };
  }

  const shortBrand = cleanTitle.split(/[・ ]/)[0];
  if (BRAND_MAP[shortBrand]) {
    return {
      brand: BRAND_MAP[shortBrand],
      model: cleanTitle.replace(shortBrand, "").trim() || null,
    };
  }

  return {
    brand: null,
    model: cleanTitle,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractExternalId(sourceUrl: string): string | null {
  try {
    const url = new URL(sourceUrl);
    const fromPath = url.pathname.match(/\/([^/]+)\.html?$/i);
    if (fromPath?.[1]) return fromPath[1];

    const fromId = url.searchParams.get("STID");
    if (fromId) return fromId;

    const fromCarId = url.searchParams.get("CARC");
    if (fromCarId) return fromCarId;

    return null;
  } catch {
    return null;
  }
}

async function textBySelectors(
  scope: any,
  selectors: string[]
): Promise<string | null> {
  for (const selector of selectors) {
    const locator = scope.locator(selector).first();
    if (await locator.count()) {
      const text = normalizeWhitespace(await locator.textContent());
      if (text) return text;
    }
  }
  return null;
}

async function attrBySelectors(
  scope: any,
  selectors: string[],
  attr: string
): Promise<string | null> {
  for (const selector of selectors) {
    const locator = scope.locator(selector).first();
    if (await locator.count()) {
      const value = await locator.getAttribute(attr);
      const normalized = normalizeWhitespace(value);
      if (normalized) return normalized;
    }
  }
  return null;
}

async function getBestImageFromCard(card: any): Promise<string | null> {
  const src =
    (await attrBySelectors(card, ["img"], "src")) ||
    (await attrBySelectors(card, ["img"], "data-src")) ||
    (await attrBySelectors(card, ["img"], "data-original"));

  if (src) return toAbsoluteUrl(src);

  const srcset = await attrBySelectors(card, ["img"], "srcset");
  if (srcset) {
    const first = srcset.split(",")[0]?.trim().split(" ")[0];
    return toAbsoluteUrl(first);
  }

  return null;
}

async function scrapeDetails(detailPage: any, sourceUrl: string) {
  await detailPage.goto(sourceUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const title =
    (await textBySelectors(detailPage, [
      "h1",
      ".contents h1",
      ".car_title",
      ".headingWrap h1",
      ".cf h1",
    ])) || "";

  const price =
    parsePrice(
      await textBySelectors(detailPage, [
        ".mainPrice",
        ".carPrice",
        ".totalPrice .price",
        '[class*="price"]',
      ])
    ) || null;

  const imageCandidates = await detailPage
    .locator("img")
    .evaluateAll((imgs: Element[]) => {
      return imgs
        .map((img) => {
          const el = img as HTMLImageElement;
          return (
            el.getAttribute("data-src") ||
            el.getAttribute("src") ||
            el.getAttribute("data-original") ||
            ""
          );
        })
        .filter((src) => {
          const value = (src || "").toLowerCase();
          return (
            Boolean(value) &&
            !value.includes("logo") &&
            !value.includes("icon") &&
            !value.includes("common") &&
            !value.includes("banner") &&
            !value.includes("btn") &&
            !value.includes("noimage")
          );
        });
    });

  const gallery = Array.from(
    new Set(
      imageCandidates
        .map((item: string) => {
          if (!item) return null;

          const cleaned = item.trim();
          if (!cleaned) return null;

          let absoluteUrl: string | null = null;

          if (cleaned.startsWith("//")) {
            absoluteUrl = `https:${cleaned}`;
          } else if (
            cleaned.startsWith("http://") ||
            cleaned.startsWith("https://")
          ) {
            absoluteUrl = cleaned;
          } else {
            try {
              absoluteUrl = new URL(
                cleaned,
                "https://www.carsensor.net/"
              ).toString();
            } catch {
              absoluteUrl = null;
            }
          }

          if (!absoluteUrl) return null;

          const lower = absoluteUrl.toLowerCase();

          if (
            lower.includes("logo") ||
            lower.includes("icon") ||
            lower.includes("common") ||
            lower.includes("banner") ||
            lower.includes("parts") ||
            lower.includes("btn") ||
            lower.includes("noimage") ||
            lower.includes("spacer")
          ) {
            return null;
          }

          if (!/\.(jpg|jpeg|png|webp)(\?|$)/i.test(lower)) {
            return null;
          }

          return absoluteUrl;
        })
        .filter((item: string | null | undefined): item is string =>
          Boolean(item)
        )
    )
  );

  const pairs = await detailPage
    .locator("tr")
    .evaluateAll((rows: Element[]) => {
      const result: { key: string; value: string }[] = [];

      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("th,td")).map((cell) =>
          (cell.textContent || "").replace(/\s+/g, " ").trim()
        );

        if (cells.length >= 2) {
          result.push({ key: cells[0], value: cells[1] });
        }
      }

      return result;
    });

  let bodyType: string | null = null;
  let transmission: string | null = null;
  let fuelType: string | null = null;
  let color: string | null = null;
  let location: string | null = null;
  let engineCapacity: string | null = null;
  let totalPriceJpy: number | null = null;
  let mileageKm: number | null = null;
  let year: number | null = null;

  for (const pair of pairs) {
    const key = normalizeWhitespace(pair.key);
    const value = normalizeWhitespace(pair.value);
    if (!key || !value) continue;

    if (/支払総額|総額/i.test(key)) {
      const parsed = parsePrice(value);
      if (parsed !== null && parsed < 100000000) {
        totalPriceJpy = parsed;
      }
    }

    if (/走行距離/i.test(key)) {
      mileageKm = parseMileageKm(value) ?? mileageKm;
    }

    if (/年式|初度登録|登録年/i.test(key)) {
      year = parseYear(value) ?? year;
    }

    const mappedKey = JAPANESE_LABEL_MAP[key];
    if (!mappedKey) continue;

    if (mappedKey === "bodyType") bodyType = value;
    if (mappedKey === "transmission") transmission = value;
    if (mappedKey === "fuelType") fuelType = value;
    if (mappedKey === "color") color = value;
    if (mappedKey === "location") location = value;
    if (mappedKey === "engineCapacity") engineCapacity = value;
  }

  const description =
    (await textBySelectors(detailPage, [
      ".js_readmore_target",
      ".carDescription",
      ".description",
      ".shopComment",
      ".cassetteWrap",
    ])) || null;

  return {
    title: sanitizeTitle(title),
    priceJpy: price,
    totalPriceJpy,
    mileageKm,
    year,
    bodyType,
    transmission,
    fuelType,
    color,
    location,
    engineCapacity,
    imageUrl: gallery[0] || null,
    gallery,
    description,
    rawDetailPairs: pairs,
  };
}

async function scrapeListPage(
  page: any,
  pageNumber: number
): Promise<ScrapedCar[]> {
  const targetUrl =
    pageNumber === 1
      ? LIST_URL
      : `${LIST_URL}${LIST_URL.includes("?") ? "&" : "?"}page=${pageNumber}`;

  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  const cards = page.locator('a[href*="/usedcar/detail/"]');
  const count = await cards.count();

  const results: ScrapedCar[] = [];

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const href = await card.getAttribute("href");
    const sourceUrl = toAbsoluteUrl(href);

    if (!sourceUrl || !sourceUrl.includes("/usedcar/detail/")) {
      continue;
    }

    const title =
      (await textBySelectors(card, [
        "h3",
        "h2",
        '[class*="title"]',
        ".cassetteCarName",
        ".carName",
        ".js-gtm-click",
      ])) ||
      normalizeWhitespace(await card.textContent()) ||
      "Untitled";

    const priceText = await textBySelectors(card, [
      '[class*="price"]',
      ".totalPrice",
      ".mainPrice",
      ".carPrice",
    ]);

    const mileageText = await textBySelectors(card, [
      "text=/走行距離/i",
      '[class*="distance"]',
      '[class*="mileage"]',
    ]);

    const yearText = await textBySelectors(card, [
      "text=/年式|初度登録/i",
      '[class*="year"]',
    ]);

    const locationText = await textBySelectors(card, [
      "text=/都道府県|地域/i",
      '[class*="pref"]',
      '[class*="shop"]',
    ]);

    const imageUrl = await getBestImageFromCard(card);
    const split = splitBrandAndModel(title);

    results.push({
      sourceUrl,
      externalId: extractExternalId(sourceUrl),
      title: sanitizeTitle(title),
      brand: split.brand,
      model: split.model,
      year: parseYear(yearText),
      mileageKm: parseMileageKm(mileageText),
      priceJpy: parsePrice(priceText),
      totalPriceJpy: null,
      bodyType: null,
      transmission: null,
      fuelType: null,
      color: null,
      location:
        locationText?.replace(/^.*?(都道府県|地域)\s*/i, "").trim() || null,
      engineCapacity: null,
      imageUrl,
      gallery: imageUrl ? [imageUrl] : [],
      description: null,
      rawPayload: {
        source: "list",
        pageNumber,
        listPrice: priceText,
        listMileage: mileageText,
        listYear: yearText,
        listLocation: locationText,
      },
    });
  }

  return results;
}

async function parseAndSave() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "ja-JP",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  const listPage = await context.newPage();
  const detailPage = await context.newPage();

  const collected = new Map<string, ScrapedCar>();

  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    const items = await scrapeListPage(listPage, pageNumber);

    for (const item of items) {
      if (!collected.has(item.sourceUrl)) {
        collected.set(item.sourceUrl, item);
      }
    }
  }

  let saved = 0;

  for (const item of collected.values()) {
    try {
      const details = await scrapeDetails(detailPage, item.sourceUrl);

      const bestTitle = details.title || item.title;
      const split = splitBrandAndModel(bestTitle);

      const safePriceJpy =
        details.priceJpy !== null && details.priceJpy < 100000000
          ? details.priceJpy
          : item.priceJpy !== null && item.priceJpy < 100000000
          ? item.priceJpy
          : null;

      const safeTotalPriceJpy =
        details.totalPriceJpy !== null && details.totalPriceJpy < 100000000
          ? details.totalPriceJpy
          : item.totalPriceJpy !== null && item.totalPriceJpy < 100000000
          ? item.totalPriceJpy
          : null;

      const merged: ScrapedCar = {
        ...item,
        title: cleanTitle(bestTitle) || bestTitle,
        brand:
          detectBrandFromText(bestTitle) ||
          translateBrand(split.brand || item.brand) ||
          split.brand ||
          item.brand,
        model: cleanModel(split.model || item.model),
        year: details.year ?? item.year,
        mileageKm: details.mileageKm ?? item.mileageKm,
        priceJpy: safePriceJpy,
        totalPriceJpy: safeTotalPriceJpy,
        priceRub: null,
        totalPriceRub: null,
        bodyType: translateValue(details.bodyType ?? item.bodyType),
        transmission: translateValue(details.transmission ?? item.transmission),
        fuelType: translateValue(details.fuelType ?? item.fuelType),
        color: translateValue(details.color ?? item.color),
        location: normalizeLocation(details.location ?? item.location),
        engineCapacity: normalizeEngineCapacity(
          details.engineCapacity ?? item.engineCapacity
        ),
        imageUrl:
          typeof details.imageUrl === "string"
            ? details.imageUrl
            : typeof item.imageUrl === "string"
            ? item.imageUrl
            : null,
        gallery: details.gallery.length ? details.gallery : item.gallery,
        description: translateDescription(
          details.description ?? item.description
        ),
        rawPayload: {
          ...(item.rawPayload || {}),
          detailPairs: details.rawDetailPairs,
        },
      };

      await db.car.upsert({
        where: { sourceUrl: merged.sourceUrl },
        update: {
          externalId: merged.externalId,
          title: merged.title,
          brand: merged.brand,
          model: merged.model,
          year: merged.year,
          mileageKm: merged.mileageKm,
          priceJpy: merged.priceJpy,
          totalPriceJpy: merged.totalPriceJpy,
          bodyType: merged.bodyType,
          transmission: merged.transmission,
          fuelType: merged.fuelType,
          color: merged.color,
          location: merged.location,
          engineCapacity: merged.engineCapacity,
          imageUrl: merged.imageUrl,
          gallery: merged.gallery,
          description: merged.description,
          rawPayload: merged.rawPayload,
        },
        create: {
          sourceUrl: merged.sourceUrl,
          externalId: merged.externalId,
          title: merged.title,
          brand: merged.brand,
          model: merged.model,
          year: merged.year,
          mileageKm: merged.mileageKm,
          priceJpy: merged.priceJpy,
          totalPriceJpy: merged.totalPriceJpy,
          bodyType: merged.bodyType,
          transmission: merged.transmission,
          fuelType: merged.fuelType,
          color: merged.color,
          location: merged.location,
          engineCapacity: merged.engineCapacity,
          imageUrl: merged.imageUrl,
          gallery: merged.gallery,
          description: merged.description,
          rawPayload: merged.rawPayload,
        },
      });

      saved++;
    } catch (error) {
      console.error(`Failed to process ${item.sourceUrl}:`, error);
    }
  }

  await detailPage.close();
  await listPage.close();
  await context.close();
  await browser.close();

  return saved;
}

async function main() {
  try {
    const saved = await parseAndSave();
    console.log(`Saved/updated ${saved} records.`);
  } catch (error) {
    console.error("Scraper failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
