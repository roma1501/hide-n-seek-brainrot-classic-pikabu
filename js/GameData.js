// GameData.js — данные игры «Brainrot Hide and Seek»: карты-темы, искатели, облики, усиления.
// Пути ассетов — литералами (сборщик берёт в архив только их). Числа правил — в Constants.js (блок HS_*).

/** @typedef {{ ru: string, en: string }} LocText */
/** @typedef {'common' | 'rare' | 'epic' | 'legendary' | 'mythic'} Rarity */

/** Карты по порядку прохождения: id карты в Maps.js, искатель, цвет темы (UI, конус). */
const HS_MAPS = [
    { id: 'mint', seeker: 'tung', name: { ru: 'Мятный лабиринт', en: 'Mint Maze' }, color: '#5fe0a8', sky: '#9fe3ff' },
    { id: 'citrus', seeker: 'tralalero', name: { ru: 'Цитрусовый парк', en: 'Citrus Park' }, color: '#ff8a3d', sky: '#a6e6ff' },
    { id: 'block', seeker: 'ballerina', name: { ru: 'Блочный городок', en: 'Block Town' }, color: '#ff9ed2', sky: '#b4ecff' },
    { id: 'candy', seeker: 'chimpanzini', name: { ru: 'Конфетная арена', en: 'Candy Arena' }, color: '#ff7ac8', sky: '#ffd6f0' },
    { id: 'tropic', seeker: 'lirili', name: { ru: 'Тропический остров', en: 'Tropical Island' }, color: '#2fd4c4', sky: '#7fdcff' },
    { id: 'toy', seeker: 'cappuccino', name: { ru: 'Фабрика игрушек', en: 'Toy Factory' }, color: '#ffd23d', sky: '#c4d8ff' },
    { id: 'ice', seeker: 'patapim', name: { ru: 'Ледяная арена', en: 'Ice Arena' }, color: '#9fd8ff', sky: '#d8f1ff' },
    { id: 'neon', seeker: 'bombardiro', name: { ru: 'Неоновая крыша', en: 'Neon Rooftop' }, color: '#ff3df0', sky: '#2a1a5c' },
    { id: 'space', seeker: 'boneca', name: { ru: 'Космическая станция', en: 'Space Station' }, color: '#ff9a2e', sky: '#14183a' },
    { id: 'carnival', seeker: 'vaca', name: { ru: 'Аркадный карнавал', en: 'Arcade Carnival' }, color: '#3de0ff', sky: '#5a3d9e' },
];

/**
 * Искатели (брейнроты). Вкладка «Персонажи» магазина: за кого играть в режиме «Искать».
 * scale — множитель модели (рост 200–260 px), speed — множитель скорости (визуальный характер,
 * баланс выравнивает HS_SEEKER_SPEED), price — монеты или кристаллы; default — дан сразу.
 */
const HS_SEEKERS = [
    { id: 'tung', model: 'assets/models/seekers/tung.glb', icon: 'assets/ui/icons/seeker-tung.webp', name: { ru: 'Тунг Тунг Сахур', en: 'Tung Tung Sahur' }, rarity: 'common', price: { coins: 0 }, default: true, color: '#c98a4b' },
    { id: 'tralalero', model: 'assets/models/seekers/tralalero.glb', icon: 'assets/ui/icons/seeker-tralalero.webp', name: { ru: 'Тралалеро', en: 'Tralalero' }, rarity: 'rare', price: { coins: 850 }, color: '#7ab8ff' },
    { id: 'ballerina', model: 'assets/models/seekers/ballerina.glb', icon: 'assets/ui/icons/seeker-ballerina.webp', name: { ru: 'Балерина Капучина', en: 'Ballerina Cappuccina' }, rarity: 'epic', price: { coins: 1200 }, color: '#ffb6d9' },
    { id: 'chimpanzini', model: 'assets/models/seekers/chimpanzini.glb', icon: 'assets/ui/icons/seeker-chimpanzini.webp', name: { ru: 'Шимпанзини', en: 'Chimpanzini' }, rarity: 'common', price: { coins: 400 }, color: '#ffe14d' },
    { id: 'lirili', model: 'assets/models/seekers/lirili.glb', icon: 'assets/ui/icons/seeker-lirili.webp', name: { ru: 'Лирили Ларила', en: 'Lirili Larila' }, rarity: 'epic', price: { coins: 1500 }, color: '#7fd06a' },
    { id: 'cappuccino', model: 'assets/models/seekers/cappuccino.glb', icon: 'assets/ui/icons/seeker-cappuccino.webp', name: { ru: 'Капучино Ассасино', en: 'Cappuccino Assassino' }, rarity: 'rare', price: { coins: 950 }, color: '#5a4636' },
    { id: 'patapim', model: 'assets/models/seekers/patapim.glb', icon: 'assets/ui/icons/seeker-patapim.webp', name: { ru: 'Брр Брр Патапим', en: 'Brr Brr Patapim' }, rarity: 'rare', price: { coins: 950 }, color: '#5ea34a' },
    { id: 'bombardiro', model: 'assets/models/seekers/bombardiro.glb', icon: 'assets/ui/icons/seeker-bombardiro.webp', name: { ru: 'Бомбардиро', en: 'Bombardiro' }, rarity: 'legendary', price: { gems: 60 }, color: '#6b8f4e' },
    { id: 'boneca', model: 'assets/models/seekers/boneca.glb', icon: 'assets/ui/icons/seeker-boneca.webp', name: { ru: 'Бонека Амбалабу', en: 'Boneca Ambalabu' }, rarity: 'epic', price: { coins: 1800 }, color: '#4fbf5a' },
    { id: 'vaca', model: 'assets/models/seekers/vaca.glb', icon: 'assets/ui/icons/seeker-vaca.webp', name: { ru: 'Ла Вака Сатурно', en: 'La Vaca Saturno' }, rarity: 'legendary', price: { gems: 80 }, color: '#e8e8f0' },
    { id: 'trippi', model: 'assets/models/seekers/trippi.glb', icon: 'assets/ui/icons/seeker-trippi.webp', name: { ru: 'Трипи Тропи', en: 'Trippi Troppi' }, rarity: 'rare', price: { coins: 1100 }, color: '#ff9a3d' },
    { id: 'bombombini', model: 'assets/models/seekers/bombombini.glb', icon: 'assets/ui/icons/seeker-bombombini.webp', name: { ru: 'Бомбомбини Гусини', en: 'Bombombini Gusini' }, rarity: 'epic', price: { coins: 2000 }, color: '#f2f2f2' },
    { id: 'frigo', model: 'assets/models/seekers/frigo.glb', icon: 'assets/ui/icons/seeker-frigo.webp', name: { ru: 'Фриго Камело', en: 'Frigo Camelo' }, rarity: 'rare', price: { coins: 1300 }, color: '#d9b26b' },
    { id: 'burbaloni', model: 'assets/models/seekers/burbaloni.glb', icon: 'assets/ui/icons/seeker-burbaloni.webp', name: { ru: 'Бурбалони Лулилоли', en: 'Burbaloni Luliloli' }, rarity: 'legendary', price: { gems: 100 }, color: '#c8955c' },
    { id: 'orangutini', model: 'assets/models/seekers/orangutini.glb', icon: 'assets/ui/icons/seeker-orangutini.webp', name: { ru: 'Орангутини Ананасини', en: 'Orangutini Ananassini' }, rarity: 'mythic', price: { gems: 150 }, color: '#ffc93d' },
];

/** Облики прячущегося (вкладка «Облики»). Редкие и выше — со следом/аурой (GameFX.skinAura). */
const HS_SKINS = [
    { id: 'default', model: 'assets/models/chars/skin-default.glb', icon: 'assets/ui/icons/skin-default.webp', name: { ru: 'Новичок', en: 'Rookie' }, rarity: 'common', price: { coins: 0 }, default: true },
    { id: 'neon', model: 'assets/models/chars/skin-neon.glb', icon: 'assets/ui/icons/skin-neon.webp', name: { ru: 'Неон', en: 'Neon' }, rarity: 'rare', price: { coins: 250 } },
    { id: 'skater', model: 'assets/models/chars/skin-skater.glb', icon: 'assets/ui/icons/skin-skater.webp', name: { ru: 'Скейтер', en: 'Skater' }, rarity: 'common', price: { coins: 400 } },
    { id: 'pilot', model: 'assets/models/chars/skin-pilot.glb', icon: 'assets/ui/icons/skin-pilot.webp', name: { ru: 'Пилот', en: 'Pilot' }, rarity: 'common', price: { coins: 350 } },
    { id: 'hoodie_pink', model: 'assets/models/chars/skin-hoodie_pink.glb', icon: 'assets/ui/icons/skin-hoodie_pink.webp', name: { ru: 'Розовое худи', en: 'Pink Hoodie' }, rarity: 'common', price: { coins: 300 } },
    { id: 'sport', model: 'assets/models/chars/skin-sport.glb', icon: 'assets/ui/icons/skin-sport.webp', name: { ru: 'Спортсмен', en: 'Athlete' }, rarity: 'common', price: { coins: 450 } },
    { id: 'chef', model: 'assets/models/chars/skin-chef.glb', icon: 'assets/ui/icons/skin-chef.webp', name: { ru: 'Шеф', en: 'Chef' }, rarity: 'rare', price: { coins: 600 } },
    { id: 'explorer', model: 'assets/models/chars/skin-explorer.glb', icon: 'assets/ui/icons/skin-explorer.webp', name: { ru: 'Исследователь', en: 'Explorer' }, rarity: 'rare', price: { coins: 650 } },
    { id: 'ninja', model: 'assets/models/chars/skin-ninja.glb', icon: 'assets/ui/icons/skin-ninja.webp', name: { ru: 'Ниндзя', en: 'Ninja' }, rarity: 'epic', price: { coins: 500 } },
    { id: 'cyber', model: 'assets/models/chars/skin-cyber.glb', icon: 'assets/ui/icons/skin-cyber.webp', name: { ru: 'Кибер', en: 'Cyber' }, rarity: 'epic', price: { coins: 600 } },
    { id: 'robot', model: 'assets/models/chars/skin-robot.glb', icon: 'assets/ui/icons/skin-robot.webp', name: { ru: 'Робот', en: 'Robot' }, rarity: 'rare', price: { coins: 800 } },
    { id: 'pirate', model: 'assets/models/chars/skin-pirate.glb', icon: 'assets/ui/icons/skin-pirate.webp', name: { ru: 'Пират', en: 'Pirate' }, rarity: 'epic', price: { coins: 1000 } },
    { id: 'cowboy', model: 'assets/models/chars/skin-cowboy.glb', icon: 'assets/ui/icons/skin-cowboy.webp', name: { ru: 'Ковбой', en: 'Cowboy' }, rarity: 'rare', price: { coins: 900 } },
    { id: 'zombie_fun', model: 'assets/models/chars/skin-zombie_fun.glb', icon: 'assets/ui/icons/skin-zombie_fun.webp', name: { ru: 'Зомби', en: 'Zombie' }, rarity: 'epic', price: { coins: 1200 } },
    { id: 'astro', model: 'assets/models/chars/skin-astro.glb', icon: 'assets/ui/icons/skin-astro.webp', name: { ru: 'Астронавт', en: 'Astronaut' }, rarity: 'legendary', price: { gems: 50 } },
    { id: 'knight', model: 'assets/models/chars/skin-knight.glb', icon: 'assets/ui/icons/skin-knight.webp', name: { ru: 'Рыцарь', en: 'Knight' }, rarity: 'mythic', price: { gems: 120 } },
];

/** Усиления (вкладка «Усиления»): расходники, копятся в save.power; тратятся в раунде. */
const HS_POWERUPS = [
    { id: 'dash', icon: 'assets/ui/btn-dash.webp', name: { ru: 'Рывок', en: 'Dash' }, desc: { ru: 'Резкий бросок вперёд', en: 'A quick burst forward' }, rarity: 'common', price: { coins: 150 }, pack: 3 },
    { id: 'decoy', icon: 'assets/ui/btn-decoy.webp', name: { ru: 'Обманка', en: 'Decoy' }, desc: { ru: 'Отвлекает искателя на 3 сек.', en: 'Distracts the seeker for 3 s' }, rarity: 'epic', price: { coins: 200 }, pack: 3 },
    { id: 'shield', icon: 'assets/ui/icons/power-shield.webp', name: { ru: 'Щит', en: 'Shield' }, desc: { ru: 'Спасает от одной поимки', en: 'Saves you from one catch' }, rarity: 'rare', price: { coins: 300 }, pack: 1 },
    { id: 'magnet', icon: 'assets/ui/icons/power-magnet.webp', name: { ru: 'Магнит', en: 'Magnet' }, desc: { ru: 'Монеты летят к тебе весь раунд', en: 'Coins fly to you all round' }, rarity: 'rare', price: { coins: 250 }, pack: 1 },
];

/** Цвета редкости: рамка карточки, свечение, след. */
const HS_RARITY = {
    common: { color: '#8fb6d9', ru: 'Обычный', en: 'Common' },
    rare: { color: '#3d9bff', ru: 'Редкий', en: 'Rare' },
    epic: { color: '#b24dff', ru: 'Эпик', en: 'Epic' },
    legendary: { color: '#ffb02e', ru: 'Легенда', en: 'Legendary' },
    mythic: { color: '#ff3d6e', ru: 'Миф', en: 'Mythic' },
};

/** Ники ботов (по языку): как у живых игроков, без пометки «бот». */
const HS_BOT_NAMES = {
    ru: ['Кексик228', 'ТёмаПро', 'Лисичка_07', 'НиндзяВаня', 'Мармеладка', 'Сашка2013', 'КотБатон', 'Пельмешка', 'Димон_ТОП',
        'ЗайкаЛиза', 'Барсик777', 'ТурбоКирилл', 'Ромашка_12', 'Тихоня', 'Шустрик2014', 'КапитанМакс', 'Печенька', 'Ёжик_Соня',
        'Бублик99', 'Арсений_Про', 'Малинка', 'ГромМатвей', 'Пончик_Аня', 'СуперЛёха'],
    en: ['xXShadowXx', 'PizzaKid_09', 'LilyBloom', 'NoobSlayer22', 'CoolDude2013', 'BunnyHop', 'ZoeyPlays', 'TacoMaster',
        'Sk8rBoi', 'MintyFresh', 'JaxonGG', 'Pixel_Panda', 'SneakyPete', 'Cupcake_Queen', 'TurboTyler', 'MiaMoon',
        'BlazeRunner', 'Nugget_77', 'EllaBear', 'CaptainLeo', 'Waffle_Wizard', 'LunaLight', 'DashDylan', 'SoupLord'],
};

/** @param {{ ru: string, en: string }} t */
function hsText(t) { return t ? (t[Lang.code === 'en' ? 'en' : 'ru'] || t.ru) : ''; }

/** @param {string} id */
function hsMap(id) { return HS_MAPS.find(m => m.id === id) || HS_MAPS[0]; }
/** @param {string} id */
function hsSeeker(id) { return HS_SEEKERS.find(s => s.id === id) || HS_SEEKERS[0]; }
/** Облик: из каталога магазина (там и новые, и эксклюзивы), иначе из HS_SKINS. @param {string} id */
function hsSkin(id) {
    const it = typeof HS_SHOP_ITEMS !== 'undefined' ? HS_SHOP_ITEMS.find(i => i.id === id && i.tab === 'skin') : null;
    if (it) return /** @type {any} */ (it);
    return HS_SKINS.find(s => s.id === id) || HS_SKINS[0];
}
/** Искатель для игрока или карты: модель, окраска варианта, имя. @param {string} id */
function hsSeekerDef(id) {
    const it = typeof HS_SHOP_ITEMS !== 'undefined' ? HS_SHOP_ITEMS.find(i => i.id === id && i.tab === 'seeker') : null;
    const base = hsSeeker((it && it.base) || id);
    return { id, model: it ? it.model : base.model, tint: it ? it.tint || '' : '', name: it ? it.name : base.name, color: base.color };
}
/** Предмет магазина по id. @param {string} id */
function hsItem(id) { return typeof HS_SHOP_ITEMS !== 'undefined' ? HS_SHOP_ITEMS.find(i => i.id === id) || null : null; }

/** Daily Gift: дни 1–6 (по нарастающей), день 7 — эксклюзивный скин (очередь HS_DAILY_EXCLUSIVE). */
const HS_DAILY_REWARDS = [
    { coins: 100 }, { coins: 150, gems: 5 }, { coins: 200, randomItems: 1, maxRarity: 'rare' },
    { coins: 300, gems: 10 }, { coins: 400, randomItems: 1, maxRarity: 'epic' }, { coins: 600, gems: 20 },
];
const HS_DAILY_EXCLUSIVE = ['daily_dragon', 'daily_king', 'daily_galaxy'];

/** Колесо фортуны: в основном валюта, реже кристаллы и предметы магазина. */
const HS_WHEEL_SECTORS = [
    { coins: 50, weight: 22 }, { coins: 10, gems: 5, weight: 12 }, { coins: 120, weight: 18 }, { randomItem: true, maxRarity: 'rare', weight: 9 },
    { coins: 250, weight: 12 }, { coins: 20, gems: 15, weight: 5 }, { coins: 500, weight: 5 }, { randomItem: true, maxRarity: 'legendary', weight: 3 },
];
