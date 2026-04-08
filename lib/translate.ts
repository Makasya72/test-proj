export const brandMap: Record<string, string> = {
  'トヨタ': 'Toyota',
  '日産': 'Nissan',
  'ホンダ': 'Honda',
  'スズキ': 'Suzuki',
  'ダイハツ': 'Daihatsu',
  'マツダ': 'Mazda',
  'スバル': 'Subaru',
  '三菱': 'Mitsubishi',
  'レクサス': 'Lexus',
  'メルセデス・ベンツ': 'Mercedes-Benz',
  'ＢＭＷ': 'BMW',
  'BMW': 'BMW',
  'フォルクスワーゲン': 'Volkswagen',
  'アウディ': 'Audi',
  'ミニ': 'MINI',
  'ボルボ': 'Volvo',
  'プジョー': 'Peugeot',
  'アルファ ロメオ': 'Alfa Romeo',
  'アルファロメオ': 'Alfa Romeo',
  'フィアット': 'Fiat',
  'ジープ': 'Jeep',
  'シボレー': 'Chevrolet',
  'フォード': 'Ford',
  'ポルシェ': 'Porsche',
  'ジャガー': 'Jaguar',
  'ランドローバー': 'Land Rover',
};

export const fieldMap: Record<string, string> = {
  'メーカー車名': 'brandModel',
  '年式': 'year',
  '走行距離': 'mileage',
  '価格': 'price',
  '本体価格': 'basePrice',
  '総額': 'totalPrice',
  '地域': 'location',
  'ボディタイプ': 'bodyType',
  '燃料': 'fuelType',
  'ミッション': 'transmission',
  '色': 'color',
  '排気量': 'engineCapacity'
};

const dictionary: Record<string, string> = {
  'クロカン・ＳＵＶ': 'SUV',
  'クロカンSUV': 'SUV',
  'ＳＵＶ': 'SUV',
  'SUV': 'SUV',
  'セダン': 'Sedan',
  'ミニバン': 'Minivan',
  'ハッチバック': 'Hatchback',
  'クーペ': 'Coupe',
  'オープン': 'Convertible',
  'ワゴン': 'Wagon',
  '軽自動車': 'Kei car',

  'ガソリン': 'Petrol',
  'ディーゼル': 'Diesel',
  'ハイブリッド': 'Hybrid',
  '電気': 'Electric',
  'EV': 'Electric',

  'オートマ': 'Automatic',
  'ＡＴ': 'Automatic',
  'AT': 'Automatic',
  'ＭＴ': 'Manual',
  'MT': 'Manual',
  'CVT': 'CVT',
  'インパネAT': 'Dashboard Automatic',
  'フロアAT': 'Floor Automatic',

  'ブラック': 'Black',
  'ホワイト': 'White',
  'パール': 'Pearl',
  'シルバー': 'Silver',
  'グレー': 'Gray',
  'ブルー': 'Blue',
  'レッド': 'Red',
  'グリーン': 'Green',
  'イエロー': 'Yellow',
  'ブラウン': 'Brown',
  'パープル': 'Purple',
  'ゴールド': 'Gold',
  'ベージュ': 'Beige',
  'パールホワイト': 'Pearl White',
  'ピュアホワイトパール': 'Pure White Pearl',
  'ホワイトパール': 'White Pearl',
  'ブラックマイカ': 'Black Mica',

  '禁煙車': 'Non-smoking',
  'ワンオーナー': 'One owner',
  '修復歴なし': 'No accident history',
  '修復歴有': 'Accident history',
  '純正ナビ': 'OEM navigation',
  'メモリーナビ': 'Memory navigation',
  'バックカメラ': 'Rear camera',
  '全周囲カメラ': '360 camera',
  'ドラレコ': 'Dashcam',
  'ETC': 'ETC',
  'LEDヘッドライト': 'LED headlights',
  'オートハイビーム': 'Auto high beam',
  'スマートキー': 'Smart key',
  'プッシュスタート': 'Push start',
  'シートヒーター': 'Seat heater',
  '革シート': 'Leather seats',
  '本革シート': 'Leather seats',
  '両側電動スライドドア': 'Dual power sliding doors',
  '片側電動スライドドア': 'Single power sliding door',
  '電動スライドドア': 'Power sliding door',
  '衝突被害軽減ブレーキ': 'Collision mitigation braking',
  '衝突軽減ブレーキ': 'Collision mitigation braking',
  '安全装備': 'Safety package',
  '横滑り防止装置': 'Stability control',
  '横滑り防止': 'Stability control',
  '盗難防止装置': 'Anti-theft system',
  'クルーズコントロール': 'Cruise control',
  'アダプティブクルーズコントロール': 'Adaptive cruise control',
  'レーンアシスト': 'Lane assist',
  'レーンキープアシスト': 'Lane keep assist',
  'アイドリングストップ': 'Idle stop',
  'Bluetooth再生': 'Bluetooth audio',
  'フルセグ': 'Full-segment TV',
  '障害物センサー': 'Parking sensors',
  'アルミホイール': 'Alloy wheels',
  'サンルーフ': 'Sunroof',
  'パワーシート': 'Power seat',
  'コーナーセンサー': 'Corner sensors',
  'オートライト': 'Auto lights',

  '内外装': 'Interior/exterior',
  '多少のキズ': 'minor scratches',
  '軽微なキズ': 'minor scratches',
  'ヘコミ': 'dents',
  '少し認められます': 'slightly visible',
  '少し認められる': 'slightly visible',
  '良好な状態です': 'in good condition',
  '状態良好': 'good condition',
};

const prefectureMap: Record<string, string> = {
  '北海道': 'Hokkaido',
  '青森県': 'Aomori',
  '岩手県': 'Iwate',
  '宮城県': 'Miyagi',
  '秋田県': 'Akita',
  '山形県': 'Yamagata',
  '福島県': 'Fukushima',
  '茨城県': 'Ibaraki',
  '栃木県': 'Tochigi',
  '群馬県': 'Gunma',
  '埼玉県': 'Saitama',
  '千葉県': 'Chiba',
  '東京都': 'Tokyo',
  '神奈川県': 'Kanagawa',
  '新潟県': 'Niigata',
  '富山県': 'Toyama',
  '石川県': 'Ishikawa',
  '福井県': 'Fukui',
  '山梨県': 'Yamanashi',
  '長野県': 'Nagano',
  '岐阜県': 'Gifu',
  '静岡県': 'Shizuoka',
  '愛知県': 'Aichi',
  '三重県': 'Mie',
  '滋賀県': 'Shiga',
  '京都府': 'Kyoto',
  '大阪府': 'Osaka',
  '兵庫県': 'Hyogo',
  '奈良県': 'Nara',
  '和歌山県': 'Wakayama',
  '鳥取県': 'Tottori',
  '島根県': 'Shimane',
  '岡山県': 'Okayama',
  '広島県': 'Hiroshima',
  '山口県': 'Yamaguchi',
  '徳島県': 'Tokushima',
  '香川県': 'Kagawa',
  '愛媛県': 'Ehime',
  '高知県': 'Kochi',
  '福岡県': 'Fukuoka',
  '佐賀県': 'Saga',
  '長崎県': 'Nagasaki',
  '熊本県': 'Kumamoto',
  '大分県': 'Oita',
  '宮崎県': 'Miyazaki',
  '鹿児島県': 'Kagoshima',
  '沖縄県': 'Okinawa'
};

export function translateBrand(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return brandMap[trimmed] || trimmed;
}

export function translateFieldKey(value: string) {
  return fieldMap[value.trim()] || value.trim();
}

function normalizeWhitespace(value?: string | null) {
  if (!value) return null;
  const text = value.replace(/[　]/g, ' ').replace(/\s+/g, ' ').trim();
  return text || null;
}

export function detectBrandFromText(value?: string | null) {
  const text = normalizeWhitespace(value);
  if (!text) return null;

  for (const [jp, en] of Object.entries(brandMap)) {
    if (text.includes(jp) || text.includes(en)) {
      return en;
    }
  }

  if (/Alfa Romeo/i.test(text)) return 'Alfa Romeo';
  if (/Mercedes-Benz/i.test(text)) return 'Mercedes-Benz';
  if (/\bBMW\b/i.test(text)) return 'BMW';
  if (/Toyota/i.test(text)) return 'Toyota';
  if (/Honda/i.test(text)) return 'Honda';
  if (/Nissan/i.test(text)) return 'Nissan';
  if (/Suzuki/i.test(text)) return 'Suzuki';

  return null;
}

export function translateValue(value?: string | null) {
  const text = normalizeWhitespace(value);
  if (!text) return null;

  let result = text;

  for (const [jp, en] of Object.entries(prefectureMap)) {
    result = result.replaceAll(jp, en);
  }

  for (const [jp, en] of Object.entries(brandMap)) {
    result = result.replaceAll(jp, en);
  }

  for (const [jp, en] of Object.entries(dictionary)) {
    result = result.replaceAll(jp, en);
  }

  result = result
    .replace(/[ぁ-んァ-ン一-龯]{2,}/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[・]/g, ' ')
    .trim();

  return result || null;
}

export function cleanTitle(value?: string | null) {
  const text = translateValue(value);
  if (!text) return null;

  let result = text
    .replace(/\(D席\/N席\)/gi, '')
    .replace(/D席\/N席/gi, '')
    .replace(/\bNon-smoking\b/gi, '')
    .replace(/\bOne owner\b/gi, '')
    .replace(/\bOEM navigation\b/gi, '')
    .replace(/\bMemory navigation\b/gi, '')
    .replace(/\bRear camera\b/gi, '')
    .replace(/\b360 camera\b/gi, '')
    .replace(/\bDashcam\b/gi, '')
    .replace(/\bETC\b/gi, '')
    .replace(/\bLED headlights\b/gi, '')
    .replace(/\bSmart key\b/gi, '')
    .replace(/\bSeat heater\b/gi, '')
    .replace(/\bPower seat\b/gi, '')
    .replace(/\bBluetooth audio\b/gi, '')
    .replace(/\bCruise control\b/gi, '')
    .replace(/\bLane assist\b/gi, '')
    .replace(/\bAuto lights\b/gi, '')
    .replace(/\bCorner sensors\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const parts = result.split(/\s+/);
  if (parts.length > 10) {
    result = parts.slice(0, 10).join(' ');
  }

  return result;
}

export function cleanModel(value?: string | null) {
  const text = translateValue(value);
  if (!text) return null;

  return text
    .replace(/\(D席\/N席\)/gi, '')
    .replace(/D席\/N席/gi, '')
    .replace(/\bNon-smoking\b/gi, '')
    .replace(/\bOne owner\b/gi, '')
    .replace(/\bOEM navigation\b/gi, '')
    .replace(/\bMemory navigation\b/gi, '')
    .replace(/\bRear camera\b/gi, '')
    .replace(/\b360 camera\b/gi, '')
    .replace(/\bDashcam\b/gi, '')
    .replace(/\bETC\b/gi, '')
    .replace(/\bLED headlights\b/gi, '')
    .replace(/\bSmart key\b/gi, '')
    .replace(/\bBluetooth audio\b/gi, '')
    .replace(/\bCruise control\b/gi, '')
    .replace(/\bLane assist\b/gi, '')
    .replace(/\bAuto lights\b/gi, '')
    .replace(/\bCorner sensors\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function translateDescription(value?: string | null) {
  const text = normalizeWhitespace(value);
  if (!text) return 'Used vehicle in decent overall condition.';

  let result = text;

  for (const [jp, en] of Object.entries(dictionary)) {
    result = result.replaceAll(jp, en);
  }

  result = result
    .replaceAll('に', ' ')
    .replaceAll('、', ', ')
    .replaceAll('。', '.')
    .replace(/\bminorminor\b/gi, 'minor')
    .replace(/\bdentscondition\b/gi, 'dents, overall condition')
    .replace(/[ぁ-んァ-ン一-龯]{2,}/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (/Interior\/exterior.*minor scratches.*dents/i.test(result)) {
    return 'Interior/exterior: minor scratches and slight dents are visible, overall in good condition.';
  }

  if (!result || result.length < 12) {
    return 'Used vehicle in decent overall condition.';
  }

  return result;
}

export function normalizeLocation(value?: string | null) {
  const text = translateValue(value);
  if (!text) return null;

  return text
    .replace(/Adachi-ku/gi, 'Adachi')
    .replace(/-shi/gi, '')
    .replace(/-ku/gi, '')
    .replace(/市/gi, '')
    .replace(/区/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function normalizeEngineCapacity(value?: string | null) {
  const text = translateValue(value);
  if (!text) return null;

  const match = text.match(/(\d{3,5})\s*cc/i);
  if (!match) return text;

  const cc = Number(match[1]);
  return `${cc} cc`;
}