// GameUI.js — интерфейс «Brainrot Hide and Seek»: меню, HUD, баннеры, ники, результат, магазин, настройки,
// оформление туториала. DOM поверх холста, стили вставляются из этого файла (<style id="hs-ui-css">).
// Контракт — docs/GAME-SPEC.md, раздел «GameUI (вызывает Game)». Тексты — ключи «ui.*» и «hud.*» (ru и en).
//
// Размеры. Меню, магазин, результат и баннеры меряются в «u» — единице текущего экрана (--u на #hs-ui, считает
// resize()); в CSS ниже запись «18u» превращается в calc(var(--u)*18). HUD раскладывает HudLayout: каждый блок
// — рамка data-hl, внутри .hs-fit проектного размера, масштаб --fit = размер блока / проектный размер.
// Анимации — только transform и opacity; при prefers-reduced-motion тряска и бесконечные петли отключены.

// ---------------------------------------------------------------------------------------------------------
// Тексты
// ---------------------------------------------------------------------------------------------------------

Object.assign(LANG_STRINGS.ru, {
    'ui.logo1': 'HIDE N SEEK',
    'ui.logo2': 'BRAINROT CLASSIC',
    'ui.play': 'ИГРАТЬ',
    'ui.roleHide': 'ПРЯТАТЬСЯ',
    'ui.roleSeek': 'ИСКАТЬ',
    'ui.shop': 'МАГАЗИН',
    'ui.skins': 'ОБЛИКИ',
    'ui.settings': 'НАСТРОЙКИ',
    'ui.seeker': 'Ищет',
    'ui.level': 'УРОВЕНЬ {n}',
    'ui.close': 'Закрыть',
    'ui.back': 'НАЗАД',
    'ui.tab.seekers': 'ПЕРСОНАЖИ',
    'ui.tab.skins': 'ОБЛИКИ',
    'ui.tab.power': 'УСИЛЕНИЯ',
    'ui.kind.seekers': 'Персонаж',
    'ui.kind.skins': 'Облик',
    'ui.kind.power': 'Усиление',
    'ui.owned': 'ПОЛУЧЕН',
    'ui.equipped': 'ВЫБРАН',
    'ui.buy': 'КУПИТЬ',
    'ui.wear': 'НАДЕТЬ',
    'ui.pick': 'ВЫБРАТЬ',
    'ui.free': 'БЕСПЛАТНО',
    'ui.noCoins': 'Не хватает монет!',
    'ui.noGems': 'Не хватает кристаллов!',
    'ui.noBuy': 'Не получилось купить',
    'ui.have': 'Есть: {n}',
    'ui.pack': '×{n}',
    'ui.sfx': 'Звуки',
    'ui.music': 'Музыка',
    'ui.quality': 'Графика',
    'ui.q.auto': 'АВТО',
    'ui.q.low': 'НИЗКАЯ',
    'ui.q.medium': 'СРЕДНЯЯ',
    'ui.q.high': 'ВЫСОКАЯ',
    'ui.on': 'ВКЛ',
    'ui.off': 'ВЫКЛ',
    'ui.howto': 'КАК ИГРАТЬ',
    'ui.prev': 'Назад',
    'ui.next': 'Вперёд',
    'hud.hide': 'ПРЯЧЬСЯ!',
    'hud.seek': 'ИЩЕТ!',
    'hud.wait': 'ЖДИ!',
    'hud.hunt': 'ЛОВИ!',
    'hud.caught': 'Поймано {a}/{b}',
    'hud.dash': 'РЫВОК',
    'hud.lunge': 'ВЫПАД',
    'hud.decoy': 'ОБМАНКА',
    'hud.hidden': 'В УКРЫТИИ',
    'hud.shield': 'ЩИТ',
    'hud.keySpace': 'Пробел',
    'bn.hide': 'ПРЯЧЬСЯ!',
    'bn.hideSeeker': 'ВСЕ ПРЯЧУТСЯ!',
    'bn.seek': 'ИЩЕТ!',
    'bn.hunt': 'ИЩИ!',
    'bn.spotted': 'ТЕБЯ ЗАМЕТИЛИ!',
    'bn.caught': 'ПОЙМАН!',
    'bn.saved': 'ЩИТ СПАС!',
    'bn.last10': '10 СЕКУНД!',
    'bn.botCaught': 'ПОЙМАН!',
    'bn.sufCaught': 'пойман!',
    'bn.sufFound': 'найден!',
    'hud.tutorial': 'ОБУЧЕНИЕ',
    'bn.found': 'НАШЁЛ!',
    'res.winHide': 'ТЫ СПРЯТАЛСЯ!',
    'res.winSeek': 'ВСЕ НАЙДЕНЫ!',
    'res.loseHide': 'ТЕБЯ НАШЛИ!',
    'res.loseSeek': 'ВРЕМЯ ВЫШЛО',
    'res.next': 'ДАЛЕЕ',
    'res.retry': 'ЕЩЁ РАЗ',
    'res.menu': 'МЕНЮ',
    'res.shop': 'МАГАЗИН',
    'res.newLevel': 'НОВЫЙ УРОВЕНЬ!',
    'res.unlocked': 'НОВАЯ КАРТА ОТКРЫТА!',
    'res.survived': 'Спрятались: {a}/{b}',
    'res.caught': 'Поймано: {a}/{b}',
    'res.time': 'Время {t}',
    'res.reward': 'НАГРАДА',
    'res.xp': 'ОПЫТ',
});
Object.assign(LANG_STRINGS.en, {
    'ui.logo1': 'HIDE N SEEK',
    'ui.logo2': 'BRAINROT CLASSIC',
    'ui.play': 'PLAY',
    'ui.roleHide': 'HIDE',
    'ui.roleSeek': 'SEEK',
    'ui.shop': 'SHOP',
    'ui.skins': 'SKINS',
    'ui.settings': 'SETTINGS',
    'ui.seeker': 'Seeker',
    'ui.level': 'LEVEL {n}',
    'ui.close': 'Close',
    'ui.back': 'BACK',
    'ui.tab.seekers': 'CHARACTERS',
    'ui.tab.skins': 'SKINS',
    'ui.tab.power': 'POWER-UPS',
    'ui.kind.seekers': 'Character',
    'ui.kind.skins': 'Skin',
    'ui.kind.power': 'Power-up',
    'ui.owned': 'OWNED',
    'ui.equipped': 'SELECTED',
    'ui.buy': 'BUY',
    'ui.wear': 'WEAR',
    'ui.pick': 'SELECT',
    'ui.free': 'FREE',
    'ui.noCoins': 'Not enough coins!',
    'ui.noGems': 'Not enough gems!',
    'ui.noBuy': 'Could not buy it',
    'ui.have': 'Owned: {n}',
    'ui.pack': '×{n}',
    'ui.sfx': 'Sounds',
    'ui.music': 'Music',
    'ui.quality': 'Graphics',
    'ui.q.auto': 'AUTO',
    'ui.q.low': 'LOW',
    'ui.q.medium': 'MEDIUM',
    'ui.q.high': 'HIGH',
    'ui.on': 'ON',
    'ui.off': 'OFF',
    'ui.howto': 'HOW TO PLAY',
    'ui.prev': 'Previous',
    'ui.next': 'Next',
    'hud.hide': 'HIDE!',
    'hud.seek': 'SEEKING!',
    'hud.wait': 'WAIT!',
    'hud.hunt': 'CATCH!',
    'hud.caught': 'Caught {a}/{b}',
    'hud.dash': 'DASH',
    'hud.lunge': 'LUNGE',
    'hud.decoy': 'DECOY',
    'hud.hidden': 'HIDDEN',
    'hud.shield': 'SHIELD',
    'hud.keySpace': 'Space',
    'bn.hide': 'HIDE!',
    'bn.hideSeeker': 'EVERYONE IS HIDING!',
    'bn.seek': 'SEEKING!',
    'bn.hunt': 'SEEK!',
    'bn.spotted': 'YOU WERE SPOTTED!',
    'bn.caught': 'CAUGHT!',
    'bn.saved': 'SHIELD SAVED!',
    'bn.last10': '10 SECONDS!',
    'bn.botCaught': 'CAUGHT!',
    'bn.sufCaught': 'caught!',
    'bn.sufFound': 'found!',
    'hud.tutorial': 'TUTORIAL',
    'bn.found': 'FOUND ONE!',
    'res.winHide': 'YOU HID WELL!',
    'res.winSeek': 'ALL FOUND!',
    'res.loseHide': 'YOU WERE FOUND!',
    'res.loseSeek': 'TIME IS UP',
    'res.next': 'NEXT',
    'res.retry': 'AGAIN',
    'res.menu': 'MENU',
    'res.shop': 'SHOP',
    'res.newLevel': 'LEVEL UP!',
    'res.unlocked': 'NEW MAP UNLOCKED!',
    'res.survived': 'Hidden: {a}/{b}',
    'res.caught': 'Caught: {a}/{b}',
    'res.time': 'Time {t}',
    'res.reward': 'REWARD',
    'res.xp': 'XP',
});

// Этап 2: монетизация — магазин из 7 вкладок, реклама, подарок дня, колесо, предложения в раунде.
Object.assign(LANG_STRINGS.ru, {
    'ui.gift': 'ПОДАРОК',
    'ui.wheel': 'КОЛЕСО',
    'ui.locked': 'ЗАКРЫТО',
    'ui.bought': 'КУПЛЕНО',
    'ui.wearing': 'НАДЕТО',
    'ui.unequip': 'СНЯТЬ',
    'ui.exclusive': 'ПОДАРОК ДНЯ',
    'ui.adProg': 'За рекламу {a}/{b}',
    'ui.watchAd': 'ПОСМОТРЕТЬ РЕКЛАМУ',
    'ui.forAd': 'ЗА РЕКЛАМУ',
    'ui.adRunning': 'РЕКЛАМА…',
    'ui.wait': 'ПОДОЖДИ…',
    'ui.waitN': 'Через {n} с',
    'ui.adFail': 'Реклама не засчиталась. Прогресс сохранён, попробуй ещё раз.',
    'ui.adNone': 'Реклама сейчас недоступна. Попробуй позже.',
    'ui.needCoins': 'Не хватает монет: {n}',
    'ui.coinsAd': '+{n} монет за рекламу',
    'ui.coinsAd0': 'Монеты за рекламу',
    'ui.gemsAd': '+{n} кристаллов за рекламу',
    'ui.gemsAd0': 'Кристаллы за рекламу',
    'ui.popCoins': 'монет',
    'ui.popGems': 'кристаллов',
    'ui.popSub': 'за просмотр рекламы',
    'ui.opened': 'ОТКРЫТО!',
    'ui.peek': 'Посмотреть на сцене',
    'ui.empty': 'Здесь пока пусто',
    'ui.shopSoon': 'Магазин скоро откроется',
    'ui.gotIt': 'КРУТО!',
    'ui.got': 'ТЫ ПОЛУЧИЛ!',
    'ui.dup': 'Такой предмет уже есть, вместо него монеты',
    'ui.mystery': 'Случайный предмет',
    'ui.dg.title': 'ПОДАРОК ДНЯ',
    'ui.dg.claim': 'ЗАБРАТЬ',
    'ui.dg.x2': 'x2 ЗА РЕКЛАМУ',
    'ui.dg.done': 'ПОЛУЧЕНО',
    'ui.dg.next': 'Следующий подарок через {t}',
    'ui.dg.goal': 'ЭКСКЛЮЗИВНЫЙ СКИН',
    'ui.dg.goalSub': 'Нигде больше не продаётся',
    'ui.dg.big': 'КРУПНАЯ НАГРАДА',
    'ui.dg.today': 'СЕГОДНЯ',
    'ui.dg.tomorrow': 'ЗАВТРА',
    'ui.dg.got': 'ПОЛУЧЕНО',
    'ui.wh.title': 'КОЛЕСО ФОРТУНЫ',
    'ui.wh.free': 'КРУТИТЬ БЕСПЛАТНО',
    'ui.wh.freeIn': 'Бесплатно через {t}',
    'ui.wh.ad': 'ЕЩЁ ВРАЩЕНИЕ ЗА РЕКЛАМУ',
    'ui.wh.left': 'Осталось {a} из {b}',
    'ui.wh.spinning': 'КРУТИТСЯ…',
    'ui.wh.win': 'ВЫИГРЫШ!',
    'res.x2': 'x2 МОНЕТ ЗА РЕКЛАМУ',
    'res.x2done': 'УДВОЕНО!',
    'res.x2sub': 'ещё +{n}',
    'offer.revive.t': 'ТЕБЯ ПОЙМАЛИ!',
    'offer.revive.s': 'Продолжить за рекламу',
    'offer.revive.b': 'ПРОДОЛЖИТЬ',
    'offer.time.t': 'ВРЕМЯ ВЫШЛО!',
    'offer.time.s': '+20 секунд за рекламу',
    'offer.time.b': '+20 СЕКУНД',
    'offer.no': 'Нет, спасибо',
    'hud.decoyAd': '+1 ЗА РЕКЛАМУ',
});
Object.assign(LANG_STRINGS.en, {
    'ui.gift': 'GIFT',
    'ui.wheel': 'WHEEL',
    'ui.locked': 'LOCKED',
    'ui.bought': 'OWNED',
    'ui.wearing': 'EQUIPPED',
    'ui.unequip': 'TAKE OFF',
    'ui.exclusive': 'DAILY GIFT',
    'ui.adProg': 'Watch ads {a}/{b}',
    'ui.watchAd': 'WATCH AD',
    'ui.forAd': 'WATCH AD',
    'ui.adRunning': 'AD PLAYING…',
    'ui.wait': 'WAIT…',
    'ui.waitN': 'In {n} s',
    'ui.adFail': 'The ad was not counted. Your progress is saved, try again.',
    'ui.adNone': 'No ad right now. Try again later.',
    'ui.needCoins': 'Not enough coins: {n}',
    'ui.coinsAd': '+{n} coins: watch an ad',
    'ui.coinsAd0': 'Coins: watch an ad',
    'ui.gemsAd': '+{n} gems: watch an ad',
    'ui.gemsAd0': 'Gems: watch an ad',
    'ui.popCoins': 'coins',
    'ui.popGems': 'gems',
    'ui.popSub': 'for watching an ad',
    'ui.opened': 'UNLOCKED!',
    'ui.peek': 'See it on stage',
    'ui.empty': 'Nothing here yet',
    'ui.shopSoon': 'The shop opens soon',
    'ui.gotIt': 'AWESOME!',
    'ui.got': 'YOU GOT!',
    'ui.dup': 'You already have it, coins instead',
    'ui.mystery': 'Random item',
    'ui.dg.title': 'DAILY GIFT',
    'ui.dg.claim': 'CLAIM',
    'ui.dg.x2': 'x2: WATCH AD',
    'ui.dg.done': 'CLAIMED',
    'ui.dg.next': 'Next gift in {t}',
    'ui.dg.goal': 'EXCLUSIVE SKIN',
    'ui.dg.goalSub': 'Not sold anywhere else',
    'ui.dg.big': 'BIG REWARD',
    'ui.dg.today': 'TODAY',
    'ui.dg.tomorrow': 'TOMORROW',
    'ui.dg.got': 'CLAIMED',
    'ui.wh.title': 'WHEEL OF FORTUNE',
    'ui.wh.free': 'SPIN FOR FREE',
    'ui.wh.freeIn': 'Free in {t}',
    'ui.wh.ad': 'SPIN AGAIN: WATCH AD',
    'ui.wh.left': '{a} of {b} left',
    'ui.wh.spinning': 'SPINNING…',
    'ui.wh.win': 'YOU WON!',
    'res.x2': 'x2 COINS: WATCH AD',
    'res.x2done': 'DOUBLED!',
    'res.x2sub': '+{n} more',
    'offer.revive.t': 'YOU WERE CAUGHT!',
    'offer.revive.s': 'Continue: watch an ad',
    'offer.revive.b': 'CONTINUE',
    'offer.time.t': 'TIME IS UP!',
    'offer.time.s': '+20 seconds: watch an ad',
    'offer.time.b': '+20 SECONDS',
    'offer.no': 'No, thanks',
    'hud.decoyAd': '+1: WATCH AD',
});
Object.assign(LANG_STRINGS.ru, {
    'ui.dg.excl': 'ЭКСКЛЮЗИВ',
    'ui.dg.in': 'Через {n} дн.',
    'ui.wh.ready': 'Бесплатное вращение готово!',
    'ui.wh.nextFree': 'Следующее бесплатное через',
});
Object.assign(LANG_STRINGS.en, {
    'ui.dg.excl': 'EXCLUSIVE',
    'ui.dg.in': 'In {n} days',
    'ui.wh.ready': 'Your free spin is ready!',
    'ui.wh.nextFree': 'Next free spin in',
});

// ---------------------------------------------------------------------------------------------------------
// Иконки (инлайн SVG): без файлов, цвета заданы в самих рисунках
// ---------------------------------------------------------------------------------------------------------

/** Кубок кнопки «Рекорды» (крупный, в цвет кнопок «Подарок» и «Колесо»). */
const HSUI_CUP = '<svg viewBox="0 0 48 48"><path d="M13 7h22v9c0 8-5 13.5-11 13.5S13 24 13 16z" fill="#ffd23d" stroke="#6e4300" stroke-width="2.6" stroke-linejoin="round"/><path d="M16 9h6v10c0 3 1 5 2 6-4-.5-8-4-8-10z" fill="#fff3a8" opacity=".75"/><path d="M13 10H6.5c0 6.5 3.4 10 8.8 10M35 10h6.5c0 6.5-3.4 10-8.8 10" fill="none" stroke="#6e4300" stroke-width="2.8" stroke-linecap="round"/><path d="M13 10H6.5c0 6.5 3.4 10 8.8 10M35 10h6.5c0 6.5-3.4 10-8.8 10" fill="none" stroke="#ffd23d" stroke-width="1.4" stroke-linecap="round"/><path d="M20.5 29h7v5.5h-7z" fill="#ffb81c" stroke="#6e4300" stroke-width="2.2"/><rect x="12.5" y="34" width="23" height="8" rx="2.4" fill="#ff7a3d" stroke="#6e4300" stroke-width="2.4"/><rect x="17" y="36.4" width="14" height="3.2" rx="1.2" fill="#ffd23d"/><path d="M24 11.5l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="#fff" stroke="#6e4300" stroke-width="1"/></svg>';

const HSUI_ICON = {
    eyeOff: '<svg viewBox="0 0 24 24"><path d="M1.8 12S5.4 5.6 12 5.6 22.2 12 22.2 12 18.6 18.4 12 18.4 1.8 12 1.8 12z" fill="#f4fbff"/><circle cx="12" cy="12" r="3.6" fill="#1a4fd0"/><path d="M4 3.6l16 16.8" stroke="#0a1a52" stroke-width="5.2" stroke-linecap="round"/><path d="M4 3.6l16 16.8" stroke="#ff5469" stroke-width="3" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 1.8l8.4 3v6.3c0 5.2-3.6 9.2-8.4 11.1C7.2 20.3 3.6 16.3 3.6 11.1V4.8z" fill="#42c8ff" stroke="#0a2a8f" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 4.6l5.6 2v4.5c0 3.7-2.4 6.6-5.6 8.1-3.2-1.5-5.6-4.4-5.6-8.1V6.6z" fill="#b6efff"/><path d="M12 7.6l1.3 2.8 3 .4-2.2 2 .6 3-2.7-1.5-2.7 1.5.6-3-2.2-2 3-.4z" fill="#fff"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M4.5 12.8l5 5 10-11" fill="none" stroke="#0a3a14" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 12.8l5 5 10-11" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M1.6 3.2h3.4l2.6 11.4h11l2.4-8.2H6.2" fill="none" stroke="#0a3a14" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.6 3.2h3.4l2.6 11.4h11l2.4-8.2H6.2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="19.4" r="2.2" fill="#fff" stroke="#0a3a14" stroke-width="1.4"/><circle cx="17.6" cy="19.4" r="2.2" fill="#fff" stroke="#0a3a14" stroke-width="1.4"/></svg>',
    shirt: '<svg viewBox="0 0 24 24"><path d="M8.4 3.2L2.2 6.4l2.2 4.6 2.4-1V20.6h10.4V10l2.4 1 2.2-4.6-6.2-3.2c-.6 1.6-1.9 2.4-3.6 2.4s-3-.8-3.6-2.4z" fill="#7be0ff" stroke="#0a2a8f" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    bolt: '<svg viewBox="0 0 24 24"><path d="M13.8 1.6L4.2 13.4h6.2l-1.4 9 9.8-12.4h-6.4z" fill="#ffd93a" stroke="#0a2a8f" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7.4" r="4.4" fill="#f4fbff" stroke="#0a2a8f" stroke-width="1.6"/><path d="M3.4 21.6c0-5 3.8-8 8.6-8s8.6 3 8.6 8z" fill="#f4fbff" stroke="#0a2a8f" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    house: '<svg viewBox="0 0 24 24"><path d="M2.6 11.6L12 3l9.4 8.6h-2.6V20.6h-4.6v-6H9.2v6H4.6V11.6z" fill="#7be0ff" stroke="#0a2a8f" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24"><path d="M15.6 4.2L7 12l8.6 7.8z" fill="#fff" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24"><path d="M8.4 4.2L17 12l-8.6 7.8z" fill="#fff" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M6.4 3.6L20 12 6.4 20.4z" fill="#fff" stroke="#0a3a14" stroke-width="2.2" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 1.6l3.1 6.7 7.3.9-5.4 5 1.4 7.2L12 17.8 5.6 22.4 7 15.2 1.6 10.2l7.3-.9z" fill="currentColor" stroke="#0a1a52" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M9 3.6l11-2v14.6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><circle cx="6.4" cy="17.6" r="3.6" fill="#fff"/><circle cx="17.4" cy="15.4" r="3.4" fill="#fff"/><path d="M9.8 17.6V4.4" stroke="#fff" stroke-width="2.4"/></svg>',
    speaker: '<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4.4v14.8L7 15H3z" fill="#fff"/><path d="M15.4 8.4a5 5 0 010 7.2M18 5.6a9 9 0 010 12.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>',
    gfx: '<svg viewBox="0 0 24 24"><rect x="2.4" y="4.6" width="19.2" height="12.8" rx="2.4" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M8 20.6h8M12 17.6v3" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>',
    question: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd93a" stroke="#0a1a52" stroke-width="1.8"/><path d="M8.6 9.4c0-2 1.4-3.2 3.4-3.2s3.4 1.2 3.4 3c0 2.6-3.4 2.6-3.4 5.2" fill="none" stroke="#0a1a52" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.6" fill="#0a1a52"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="#e8eef8" stroke-width="2"/></svg>',
    arrow: '<svg viewBox="0 0 48 40"><path d="M44 20L10 2.4c-1.8-.9-3.6.8-2.8 2.6L13 20 7.2 35c-.8 1.8 1 3.5 2.8 2.6z" fill="#ff3347" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/></svg>',
    silhouette: '<svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="12" fill="currentColor"/><path d="M8 62c0-17 10-26 24-26s24 9 24 26z" fill="currentColor"/></svg>',
    playY: '<svg viewBox="0 0 24 24"><path d="M6.4 3.6L20 12 6.4 20.4z" fill="#fff" stroke="#6e4300" stroke-width="2.2" stroke-linejoin="round"/></svg>',
    playG: '<svg viewBox="0 0 24 24"><path d="M6.4 3.6L20 12 6.4 20.4z" fill="#fff" stroke="#0a4d19" stroke-width="2.2" stroke-linejoin="round"/></svg>',
    hat: '<svg viewBox="0 0 24 24"><path d="M3 19h18l-1.4-3.4H4.4z" fill="#7be0ff" stroke="#0a2a8f" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.6 15.6L8 6.8C8.3 5 9.7 4 12 4s3.7 1 4 2.8l1.4 8.8z" fill="#7be0ff" stroke="#0a2a8f" stroke-width="1.8" stroke-linejoin="round"/><path d="M7.2 12.2h9.6" stroke="#0a2a8f" stroke-width="1.8"/></svg>',
    trail: '<svg viewBox="0 0 24 24"><path d="M13.4 10.6L2.6 21.4M12 12.8L6 22.4M15.8 12.4L10.6 22.4" stroke="#7be0ff" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="17" cy="7" r="4.4" fill="#ffd93a" stroke="#0a2a8f" stroke-width="1.7"/></svg>',
    aura: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="9.4" ry="4.6" fill="none" stroke="#0a2a8f" stroke-width="4.4"/><ellipse cx="12" cy="16" rx="9.4" ry="4.6" fill="none" stroke="#7be0ff" stroke-width="2.4"/><path d="M12 1.8l1.7 4.2 4.2 1.7-4.2 1.7L12 13.6 10.3 9.4 6.1 7.7 10.3 6z" fill="#ffd93a" stroke="#0a2a8f" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M7 3h10v6.4a5 5 0 01-10 0z" fill="#ffd93a" stroke="#0a2a8f" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 5H3.6c0 4 1.6 5.6 3.8 5.8M17 5h3.4c0 4-1.6 5.6-3.8 5.8" fill="none" stroke="#0a2a8f" stroke-width="1.8" stroke-linecap="round"/><path d="M12 14.4V18M8.4 21h7.2M9.6 18h4.8" stroke="#0a2a8f" stroke-width="2.4" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="#0a1a52" stroke-width="4" stroke-linecap="round"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="#e8eef8" stroke-width="2.2" stroke-linecap="round"/><rect x="4.6" y="10.6" width="14.8" height="11" rx="2.6" fill="#ffd23d" stroke="#6e4300" stroke-width="1.8"/><circle cx="12" cy="16" r="1.7" fill="#6e4300"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M1.8 12S5.4 5.6 12 5.6 22.2 12 22.2 12 18.6 18.4 12 18.4 1.8 12 1.8 12z" fill="#f4fbff" stroke="#0a2a8f" stroke-width="1.5"/><circle cx="12" cy="12" r="3.8" fill="#1a4fd0" stroke="#0a2a8f" stroke-width="1.2"/><circle cx="13.2" cy="10.8" r="1.2" fill="#fff"/></svg>',
    gift: '<svg viewBox="0 0 48 48"><path d="M24 15C15 3 6 6 10 12c2.6 3.6 9 3 14 3zM24 15c9-12 18-9 14-3-2.6 3.6-9 3-14 3z" fill="#ffd23d" stroke="#6e4300" stroke-width="2.4" stroke-linejoin="round"/><rect x="7" y="21" width="34" height="22" rx="3" fill="#ff4d6a" stroke="#4a0a20" stroke-width="2.6"/><rect x="4" y="14.6" width="40" height="9" rx="2.8" fill="#ff7a8e" stroke="#4a0a20" stroke-width="2.6"/><rect x="20.4" y="14.6" width="7.2" height="28.4" fill="#ffd23d" stroke="#6e4300" stroke-width="1.8"/></svg>',
    giftQ: '<svg viewBox="0 0 48 48"><rect x="7" y="21" width="34" height="22" rx="3" fill="#a05bff" stroke="#2c0a68" stroke-width="2.6"/><rect x="4" y="14.6" width="40" height="9" rx="2.8" fill="#c58bff" stroke="#2c0a68" stroke-width="2.6"/><path d="M24 14.6C16 4 8 7 11.4 12c2.4 3 8.6 2.6 12.6 2.6zM24 14.6c8-10.6 16-7.6 12.6-2.6-2.4 3-8.6 2.6-12.6 2.6z" fill="#ffd23d" stroke="#6e4300" stroke-width="2.2" stroke-linejoin="round"/><text x="24" y="38.4" text-anchor="middle" font-size="17" font-weight="900" fill="#fff" stroke="#2c0a68" stroke-width="2.2" paint-order="stroke" font-family="Rubik,system-ui,sans-serif">?</text></svg>',
    closeX: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/></svg>',
};

// ---------------------------------------------------------------------------------------------------------
// CSS. «Nu» = N × единица экрана (--u). Путь картинок — от корня игры, литералом.
// ---------------------------------------------------------------------------------------------------------

const HSUI_CSS = `
@font-face{font-family:'HsRubik';src:url('assets/fonts/rubik.ttf') format('truetype');font-weight:300 900;font-display:swap}

#hs-ui{position:fixed;inset:0;z-index:20;pointer-events:none;overflow:hidden;--u:1px;font-family:'HsRubik','Rubik',system-ui,sans-serif;font-weight:800;color:#fff;
  -webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;text-rendering:optimizeLegibility;
  --nv0:#050f33;--nv1:#0a2272;--nv2:#1546c4;--cy:#59c8ff;--cy2:#a8ecff;--gold:#ffd23d}
#hs-ui *,#hs-ui *::before,#hs-ui *::after{box-sizing:border-box}
:where(#hs-ui) button{font:inherit;color:inherit;border:0;padding:0;margin:0;background:none;cursor:pointer;touch-action:manipulation;outline:none;-webkit-appearance:none;appearance:none}
:where(#hs-ui) img{display:block;pointer-events:none;-webkit-user-drag:none}
:where(#hs-ui) svg{display:block}
#hs-ui [hidden]{display:none!important}

/* обводка текста: тёмный контур 8 направлений + глубина */
.hs-o{--s:2u;--ol:#0a1840;text-shadow:var(--s) 0 0 var(--ol),calc(var(--s)*-1) 0 0 var(--ol),0 var(--s) 0 var(--ol),0 calc(var(--s)*-1) 0 var(--ol),
  var(--s) var(--s) 0 var(--ol),calc(var(--s)*-1) var(--s) 0 var(--ol),var(--s) calc(var(--s)*-1) 0 var(--ol),calc(var(--s)*-1) calc(var(--s)*-1) 0 var(--ol),0 calc(var(--s)*1.7) 0 var(--ol),0 calc(var(--s)*2.4) calc(var(--s)*1.4) rgba(0,0,0,.35)}
/* большой заголовок: слой контура (3D-глубина) под слоем с градиентом. <span class="hs-big" data-text><span class="tx"> */
.hs-big{position:relative;display:block;isolation:isolate;font-weight:900;line-height:1;text-align:center}
.hs-big .tx{position:relative;z-index:1;background:linear-gradient(180deg,var(--g1,#fff8b0) 0,var(--g2,#ffd23d) 48%,var(--g3,#ff9a1c) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
.hs-big::before,.hs-big::after{content:attr(data-text);position:absolute;left:0;right:0;top:0;padding:inherit;z-index:0;color:var(--ol,#0a1a52);-webkit-text-fill-color:var(--ol,#0a1a52);-webkit-text-stroke:var(--sk,10u) var(--ol,#0a1a52);pointer-events:none}
.hs-big::before{transform:translateY(var(--dp,5u));text-shadow:0 calc(var(--dp,5u)*1.4) calc(var(--dp,5u)*1.6) rgba(0,0,0,.4)}

/* панели и кнопки */
.hs-panel{position:relative;border-radius:22u;background:linear-gradient(180deg,#1b52d6 0,#0f3597 6%,#0a2577 32%,#071a58 100%);border:3u solid #62cdff;
  box-shadow:0 0 0 4u #0b2c93,0 0 0 6u #07164f,0 0 28u 6u rgba(60,160,255,.5),0 18u 38u rgba(0,0,0,.55),inset 0 0 0 2u rgba(255,255,255,.12),inset 0 -14u 26u rgba(0,8,46,.55)}
.hs-inset{border-radius:16u;background:linear-gradient(180deg,rgba(2,12,52,.78),rgba(5,20,74,.62));border:2u solid rgba(80,170,255,.45);box-shadow:inset 0 4u 12u rgba(0,0,0,.45)}
.hs-pill{position:relative;display:flex;align-items:center;gap:6u;height:38u;padding:0 14u 0 38u;border-radius:99u;background:linear-gradient(180deg,#0f3190,#061a58);border:2.5u solid #3f95ff;
  box-shadow:0 3u 0 #04123d,0 0 12u rgba(60,160,255,.35),inset 0 2u 0 rgba(255,255,255,.2);font-size:20u;line-height:1;min-width:92u}
.hs-pill-ic{position:absolute;left:-7u;top:50%;height:46u;width:46u;object-fit:contain;transform:translateY(-52%);filter:drop-shadow(0 2u 0 rgba(0,0,0,.35))}
.hs-pill-n{flex:1;text-align:right;font-variant-numeric:tabular-nums}
.hs-pill.bump{animation:hs-bump .45s cubic-bezier(.3,1.6,.5,1)}

.hs-btn{--b1:#7cff6b;--b2:#1fc03a;--b3:#0e6e22;--bo:#0a4d19;--th:6u;position:relative;display:flex;align-items:center;justify-content:center;gap:8u;overflow:hidden;border-radius:16u;
  background:linear-gradient(180deg,var(--b1) 0,var(--b2) 52%,color-mix(in srgb,var(--b2) 82%,#000) 100%);border:3u solid var(--bo);
  box-shadow:0 var(--th) 0 var(--b3),0 calc(var(--th) + 3u) 0 var(--bo),0 calc(var(--th) + 8u) 14u rgba(0,0,0,.4),inset 0 3u 0 rgba(255,255,255,.55),inset 0 -5u 0 rgba(0,0,0,.16);
  transition:transform .09s,box-shadow .09s,filter .15s;font-weight:900;text-transform:uppercase;letter-spacing:.02em;pointer-events:auto}
.hs-btn:active:not(.off){transform:translateY(var(--th));box-shadow:0 0 0 var(--b3),0 3u 0 var(--bo),0 4u 8u rgba(0,0,0,.35),inset 0 3u 0 rgba(255,255,255,.4),inset 0 -5u 0 rgba(0,0,0,.16)}
.hs-btn.yellow{--b1:#fff17a;--b2:#ffc61f;--b3:#b87400;--bo:#6e4300}
.hs-btn.red{--b1:#ff8a8a;--b2:#ee2f3d;--b3:#8c1220;--bo:#52091a}
.hs-btn.blue{--b1:#6fd5ff;--b2:#1d8cf0;--b3:#0b4aa8;--bo:#072e72}
.hs-btn.navy{--b1:#2c63e0;--b2:#123da8;--b3:#07226d;--bo:#041348}
.hs-btn.off{filter:saturate(.35) brightness(.8);cursor:default}
.hs-btn svg{width:1.15em;height:1.15em;flex:none;filter:drop-shadow(0 2u 0 rgba(0,0,0,.35))}
.hs-btn .t{position:relative;z-index:1}
/* блик по кнопке */
.hs-shine::after{content:'';position:absolute;top:-20%;bottom:-20%;left:-40%;width:28%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.7),transparent);transform:translateX(-120%) skewX(-18deg);animation:hs-shine 3.6s ease-in-out infinite;animation-delay:var(--sd,0s);pointer-events:none}
.hs-shake{animation:hs-shake .42s cubic-bezier(.36,.07,.19,.97) both}

.hs-hint{min-height:1.3em;color:#ff6b78;font-size:15u;text-align:center;text-shadow:0 2u 0 #3a0610,0 0 8u rgba(255,60,80,.45);opacity:0;transition:opacity .2s}
.hs-hint.on{opacity:1}

/* экраны */
.hs-screen{position:absolute;inset:0;display:none;pointer-events:none}
.hs-screen.on{display:block}
.hs-screen.out{opacity:0;transition:opacity .22s ease-in;transform:scale(1.03);transition:opacity .22s ease-in,transform .22s ease-in}
.hs-screen.in .hs-a{animation:hs-pop .62s cubic-bezier(.2,.9,.3,1) backwards;animation-delay:calc(var(--d,0)*70ms)}
.hs-screen.in .hs-a.left{animation-name:hs-slideL}
.hs-screen.in .hs-a.right{animation-name:hs-slideR}
.hs-screen.in .hs-a.top{animation-name:hs-slideT}
.hs-screen.in .hs-a.bottom{animation-name:hs-slideB}

/* ---------- ГЛАВНОЕ МЕНЮ ---------- */
.hs-menu{--mp:14u;padding:calc(var(--mp) + env(safe-area-inset-top,0px)) calc(var(--mp) + env(safe-area-inset-right,0px)) calc(var(--mp) + env(safe-area-inset-bottom,0px)) calc(var(--mp) + env(safe-area-inset-left,0px))}
.hs-menu::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 55% at 50% 50%,transparent 58%,rgba(4,16,64,.46) 100%),linear-gradient(180deg,rgba(4,14,60,.5) 0,transparent 24%,transparent 62%,rgba(4,14,60,.6) 100%)}
.hs-m-top{position:absolute;left:calc(var(--mp) + env(safe-area-inset-left,0px));right:calc(var(--mp) + env(safe-area-inset-right,0px));top:calc(var(--mp) + env(safe-area-inset-top,0px));display:flex;justify-content:space-between;align-items:flex-start;gap:10u}
.hs-mapcard{position:relative;display:flex;align-items:center;gap:10u;height:56u;padding:0 8u 0 8u;border-radius:18u;background:linear-gradient(180deg,rgba(15,50,150,.96),rgba(6,22,82,.96));border:3u solid var(--mc,#5fe0a8);
  box-shadow:0 4u 0 #04123d,0 0 18u -2u var(--mc,#5fe0a8),inset 0 2u 0 rgba(255,255,255,.18);max-width:62%}
.hs-mapnum{flex:none;display:flex;align-items:center;justify-content:center;width:42u;height:42u;border-radius:13u;background:var(--mc,#5fe0a8);color:#07204d;font-size:22u;font-weight:900;box-shadow:inset 0 3u 0 rgba(255,255,255,.5),inset 0 -4u 0 rgba(0,0,0,.2)}
.hs-mapname{display:flex;flex-direction:column;min-width:0;line-height:1.05}
.hs-mapname b{font-size:19u;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:230u}
.hs-mapname small{font-size:12u;font-weight:700;color:#9fc8ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:230u}
.hs-seekic{flex:none;width:44u;height:44u;border-radius:50%;background:radial-gradient(circle at 50% 40%,#2a62dc,#0a2272);border:2.5u solid var(--mc,#5fe0a8);overflow:hidden;display:flex;align-items:center;justify-content:center}
.hs-seekic img{width:100%;height:100%;object-fit:contain}
.hs-m-wallet{display:flex;gap:14u;padding-left:6u}
.hs-logo{position:absolute;left:50%;top:calc(var(--mp) + env(safe-area-inset-top,0px) + 48u);transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;--ol:#0a1a52}
.hs-logo-in{display:flex;flex-direction:column;align-items:center;transform:rotate(-4deg);animation:hs-logo 4.4s ease-in-out infinite}
.hs-logo-1{font-size:58u;letter-spacing:.015em;--sk:13u;--dp:6u;padding:0 8u;white-space:nowrap}
.hs-logo-2{font-size:31u;margin-top:2u;letter-spacing:.06em;white-space:nowrap;--g1:#d7fbff;--g2:#59d4ff;--g3:#1d86ee;--sk:10u;--dp:4u;padding:0 6u}
.hs-m-left{position:absolute;left:calc(var(--mp) + env(safe-area-inset-left,0px));top:50%;transform:translateY(-44%);display:flex;flex-direction:column;gap:14u;align-items:center}
.hs-tool{position:relative;width:92u;height:92u;background-size:100% 100%;background-repeat:no-repeat;pointer-events:auto;transition:transform .1s;filter:drop-shadow(0 5u 0 rgba(3,10,50,.7)) drop-shadow(0 8u 8u rgba(0,0,0,.35))}
.hs-tool:active{transform:translateY(4u) scale(.96);filter:drop-shadow(0 1u 0 rgba(3,10,50,.7))}
.hs-tool.shop{background-image:url('assets/ui/btn-shop.webp')}
.hs-tool.skins{background-image:url('assets/ui/btn-skins.webp')}
.hs-tool.gear{background-image:url('assets/ui/btn-settings.webp')}
.hs-tool.close{background-image:url('assets/ui/btn-close.webp');width:46u;height:44u}
.hs-tool span{position:absolute;left:17%;right:17%;bottom:11%;height:14.5%;display:flex;align-items:center;justify-content:center;font-size:11.5u;font-weight:900;letter-spacing:.02em;line-height:1;text-shadow:0 1.5u 0 #04123d}
.hs-tool .dot{position:absolute;right:-4u;top:-4u;width:20u;height:20u;border-radius:50%;background:#ff3a4e;border:2.5u solid #fff;animation:hs-pulse 1.1s ease-in-out infinite}
.hs-m-bottom{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--mp) + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:12u;width:min(330u,94%)}
.hs-m-bottom>.hs-a{width:100%;display:flex;justify-content:center}
.hs-seg{position:relative;display:grid;grid-template-columns:1fr 1fr;width:100%;height:48u;padding:4u;border-radius:99u;background:linear-gradient(180deg,#041348,#0a2475);border:3u solid #3f95ff;box-shadow:0 4u 0 #04123d,0 0 16u rgba(60,160,255,.4);pointer-events:auto}
.hs-seg i{position:absolute;left:4u;top:4u;bottom:4u;width:calc(50% - 4u);border-radius:99u;background:linear-gradient(180deg,#fff17a,#ffc61f);box-shadow:0 3u 0 #b87400,inset 0 2u 0 rgba(255,255,255,.6);transition:transform .32s cubic-bezier(.3,1.5,.5,1)}
.hs-seg.seek i{transform:translateX(100%)}
.hs-seg button{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:6u;font-size:17u;font-weight:900;letter-spacing:.02em;color:#a9c9ff;transition:color .2s}
.hs-seg button.on{color:#3b2400}
.hs-seg button svg{width:20u;height:20u}
.hs-play{width:94%;height:92u;font-size:46u;border-radius:26u;--th:9u;animation:hs-play 1.5s ease-in-out infinite}
.hs-play svg{width:.9em;height:.9em}
.hs-play .t{text-shadow:0 3u 0 #0a4d19,2u 0 0 #0a4d19,-2u 0 0 #0a4d19,0 -2u 0 #0a4d19}
.hs-lvl{position:relative;width:80%;height:44u;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6u 12u 0;border-radius:14u;background:linear-gradient(180deg,rgba(10,38,120,.92),rgba(5,20,70,.92));border:2.5u solid #3f95ff;box-shadow:0 3u 0 #04123d}
.hs-lvl b{font-size:14u;font-weight:900;line-height:1;letter-spacing:.03em}
.hs-bar{position:relative;width:100%;height:12u;margin-top:4u;border-radius:99u;background:#030c30;box-shadow:inset 0 2u 4u rgba(0,0,0,.7),0 0 0 2u #1a56d8;overflow:hidden}
.hs-bar i{position:absolute;left:0;top:0;bottom:0;width:100%;border-radius:99u;background:linear-gradient(180deg,#fff08a,#ffc61f 55%,#ee9a0a);transform-origin:0 50%;transform:scaleX(var(--f,0));transition:transform .5s cubic-bezier(.3,1.2,.5,1);box-shadow:inset 0 2u 0 rgba(255,255,255,.55)}
.hs-bar i::after{content:'';position:absolute;top:0;bottom:0;width:30%;left:0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);animation:hs-barshine 2.4s linear infinite}
.hs-fcoins{position:absolute;inset:0;overflow:hidden}
.hs-fcoin{position:absolute;bottom:-60u;width:calc(26u*var(--sz,1));height:calc(27u*var(--sz,1));left:var(--x,50%);opacity:0;background:url('assets/ui/icon-coin.webp') center/contain no-repeat;animation:hs-coinfloat var(--t,11s) linear infinite;animation-delay:var(--dl,0s)}

/* ---------- ОКНА (магазин, подарок, колесо, настройки, результат) ---------- */
.hs-win{background:radial-gradient(ellipse at 50% 40%,rgba(10,40,130,.68),rgba(2,8,36,.9));pointer-events:auto;-webkit-backdrop-filter:none;z-index:10}
.hs-shopwin{position:absolute;inset:calc(2.2% + env(safe-area-inset-top,0px)) calc(2% + env(safe-area-inset-right,0px)) calc(2.2% + env(safe-area-inset-bottom,0px)) calc(2% + env(safe-area-inset-left,0px));margin:auto;max-width:1120u;max-height:660u;display:flex;flex-direction:column;padding:12u 14u 14u;gap:8u;transition:opacity .22s,transform .22s}
.hs-sh-head{display:flex;align-items:center;gap:12u;flex:none;min-height:52u}
.hs-sh-title{font-size:32u;letter-spacing:.01em;--ol:#0a1a52;--g1:#fff;--g2:#f2f7ff;--g3:#c6dbff;--sk:9u;--dp:4u;margin-right:6u;flex:none;padding:0 4u}
.hs-tabs{display:flex;gap:6u;flex:none;min-width:0}
.hs-tab{position:relative;display:flex;align-items:center;justify-content:center;gap:6u;height:42u;padding:0 8u;border-radius:14u;background:linear-gradient(180deg,#102f95,#071d63);border:2.5u solid #3f95ff;box-shadow:0 4u 0 #04123d,inset 0 2u 0 rgba(255,255,255,.18);font-size:max(9.5px,14u);font-weight:900;color:#d4e6ff;white-space:nowrap;transition:transform .12s,box-shadow .12s;flex:1 1 0;min-width:0}
.hs-tab svg{width:21u;height:21u;flex:none}
.hs-tab span{overflow:hidden;text-overflow:ellipsis}
.hs-tab:active{transform:translateY(3u);box-shadow:0 1u 0 #04123d}
.hs-tab.on{flex:1.5 1 0;background:linear-gradient(180deg,#fff17a,#ffc61f);border-color:#6e4300;color:#3b2400;box-shadow:0 4u 0 #b87400,0 7u 0 #6e4300,inset 0 2u 0 rgba(255,255,255,.7);text-shadow:none;animation:hs-tabin .4s cubic-bezier(.3,1.6,.5,1)}
.hs-sh-wallet{display:flex;gap:20u;flex:none;margin-left:auto;padding:0 8u 0 6u}
.hs-sh-wallet .hs-pill{min-width:0;font-size:18u}
.hs-sh-body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,36%);gap:12u}
.hs-sh-body.power{grid-template-columns:minmax(0,1fr)}
.hs-sh-body.power .hs-sh-grid{--cols:4;align-content:stretch;grid-auto-rows:minmax(0,1fr)}
.hs-sh-grid{--cols:3;min-height:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;padding:6u 6u 10u;display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));gap:12u;align-content:start;scrollbar-width:thin;scrollbar-color:#3f95ff #04123d;-webkit-overflow-scrolling:touch;touch-action:pan-y}
.hs-sh-grid::-webkit-scrollbar{width:8px}
.hs-sh-grid::-webkit-scrollbar-thumb{background:#3f95ff;border-radius:8px}
.hs-sh-grid::-webkit-scrollbar-track{background:#04123d;border-radius:8px}
.hs-sh-empty{grid-column:1/-1;align-self:center;text-align:center;padding:30u;font-size:20u;color:#9fc8ff}

/* карточка товара */
.hs-card{--rc:#8fb6d9;--rca:rgba(143,182,217,.4);position:relative;aspect-ratio:275/360;width:100%;background:url('assets/ui/item-card.webp') center/100% 100% no-repeat;text-align:center;transition:transform .15s cubic-bezier(.3,1.5,.5,1),filter .2s;
  filter:drop-shadow(0 4u 0 rgba(3,10,50,.6));animation:hs-cardin .5s cubic-bezier(.2,1,.3,1) backwards;animation-delay:calc(var(--i,0)*38ms);pointer-events:auto}
.hs-card::before{content:'';position:absolute;left:8%;right:8%;top:6%;bottom:12%;border-radius:12u;background:radial-gradient(ellipse at 50% 62%,var(--rca),transparent 70%);pointer-events:none}
.hs-card:active{transform:scale(.97)}
.hs-card.sel{transform:translateY(-3u) scale(1.03);z-index:2;filter:drop-shadow(0 0 10u var(--rc)) drop-shadow(0 0 3u var(--rc)) drop-shadow(0 4u 0 rgba(3,10,50,.6))}
.hs-card.sel::after{content:'';position:absolute;inset:1%;border-radius:14u;border:3u solid var(--rc);opacity:.9;pointer-events:none;animation:hs-selring 1.3s ease-in-out infinite}
.hs-card .nm{position:absolute;left:6%;right:6%;top:6.5%;font-size:13u;font-weight:900;line-height:1.05;text-shadow:0 2u 0 #04123d,0 0 4u #04123d;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;height:2.1em;display:flex;align-items:center;justify-content:center}
.hs-card .rr{position:absolute;left:50%;top:21%;transform:translateX(-50%);padding:1u 9u 2u;border-radius:99u;font-size:10.5u;font-weight:900;color:#fff;background:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.45));border:1.5u solid var(--rc);color:var(--rc);box-shadow:0 0 6u var(--rca);white-space:nowrap;line-height:1.2;text-shadow:none}
.hs-card .im{position:absolute;left:8%;right:8%;top:29%;bottom:23%;display:flex;align-items:center;justify-content:center}
.hs-card.locked .im .hs-ic{opacity:.82}
.hs-card .rd{display:none;position:absolute;left:8%;top:21%;width:11u;height:11u;border-radius:50%;background:var(--rc);border:2u solid #fff;box-shadow:0 0 6u var(--rc);z-index:2}
.hs-low .hs-card .rd{display:block}
.hs-card .lk{position:absolute;right:9%;top:30%;width:24u;height:24u;z-index:2;filter:drop-shadow(0 2u 0 rgba(0,0,0,.5))}
.hs-card .lk svg{width:100%;height:100%}
.hs-card .st{position:absolute;left:12.5%;right:12.5%;top:77.5%;height:12.5%;display:flex;align-items:center;justify-content:center;gap:5u;font-size:max(9px,14u);font-weight:900;line-height:1;border-radius:99u}
.hs-card .st.own{background:linear-gradient(180deg,#43d95a,#18a637);color:#fff;border:2u solid #0a5a1a;box-shadow:0 2u 0 #08481a;text-shadow:0 1.5u 0 #0a4a18}
.hs-card .st.eq{background:linear-gradient(180deg,#4fd4ff,#1090e8);color:#fff;border:2u solid #05508f;box-shadow:0 2u 0 #04407a;text-shadow:0 1.5u 0 #05407a}
.hs-card .st.own svg,.hs-card .st.eq svg{width:15u;height:15u;flex:none}
.hs-card .st img{height:20u;width:20u;object-fit:contain}
.hs-card .st.cant{color:#ff8b95}
.hs-card .st.ad{overflow:hidden;background:linear-gradient(180deg,#041348,#0a2272);border:2u solid #2d6fe0;box-shadow:0 2u 0 #04123d;color:#fff;font-size:max(9px,11.5u);text-shadow:0 1.5u 0 #04123d;white-space:nowrap}
.hs-card .st.ad i{position:absolute;left:0;top:0;bottom:0;width:calc(var(--p,0)*100%);background:linear-gradient(180deg,#fff08a,#ffb81c);opacity:.5;transition:width .5s cubic-bezier(.3,1.2,.5,1)}
.hs-card .st.ad span{position:relative;z-index:1}
.hs-card .st.ex{background:linear-gradient(180deg,#a05bff,#6a1fd0);border:2u solid #2c0a68;box-shadow:0 2u 0 #2c0a68;color:#fff;font-size:max(8px,11u);text-shadow:0 1.5u 0 #2c0a68;white-space:nowrap}
.hs-card .st.ex svg{width:16u;height:16u;flex:none}
.hs-card .sp{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:14u}
.hs-spk{position:absolute;left:var(--x);top:var(--y);width:calc(8u*var(--z,1));height:calc(8u*var(--z,1));background:var(--rc);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);opacity:0;animation:hs-twinkle var(--t,2.2s) ease-in-out infinite;animation-delay:var(--dl,0s)}
.hs-ic{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.hs-ic img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 6u 6u rgba(0,0,0,.45))}
.hs-ic.miss{color:var(--rc);opacity:.8}
.hs-ic.miss svg{width:62%;height:62%;filter:drop-shadow(0 4u 0 rgba(0,0,0,.4))}
.hs-card.r-legendary::before,.hs-card.r-mythic::before{animation:hs-glowpulse 2s ease-in-out infinite}
.hs-card.r-legendary .nm,.hs-card.r-mythic .nm{color:#fff3c4}
.hs-card.r-epic .shn,.hs-card.r-legendary .shn,.hs-card.r-mythic .shn{position:absolute;inset:4% 5% 10%;overflow:hidden;border-radius:14u;pointer-events:none}
.hs-card .shn::after{content:'';position:absolute;top:-20%;bottom:-20%;left:-30%;width:26%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);transform:translateX(-140%) skewX(-18deg);animation:hs-shine 4.2s ease-in-out infinite;animation-delay:var(--sd,0s)}

/* предпросмотр */
.hs-prev{--rc:#8fb6d9;--rca:rgba(143,182,217,.5);position:relative;display:flex;flex-direction:column;align-items:center;min-height:0;padding:10u 12u 12u;gap:5u;border-radius:20u;background:radial-gradient(ellipse at 50% 50%,#1e5fe0 0,#0d3aa6 38%,#071c64 100%);border:3u solid #3f95ff;box-shadow:inset 0 0 28u rgba(0,0,40,.6),0 0 0 2u #07164f}
.hs-prev-name{font-size:28u;font-weight:900;line-height:1.05;text-align:center;max-width:100%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;padding-bottom:3u}
.hs-prev-kind{display:flex;align-items:center;gap:8u;font-size:max(9px,13u);color:#a9c9ff;font-weight:800}
.hs-prev-kind .rr{padding:1u 10u 2u;border-radius:99u;border:1.5u solid var(--rc);color:var(--rc);background:rgba(0,0,0,.35);font-size:max(9px,12u);font-weight:900;box-shadow:0 0 8u var(--rca)}
.hs-stage{position:relative;flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}
.hs-glow{position:absolute;left:50%;top:48%;width:92%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,var(--rca) 0,transparent 66%);animation:hs-glowpulse 2.6s ease-in-out infinite}
.hs-platform{position:absolute;left:50%;bottom:2%;width:86%;height:22%;transform:translateX(-50%)}
.hs-platform::before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,#3c6fd8,#12307e 62%,#0a1d57);box-shadow:0 6u 0 #061546,0 0 0 3u #5ccaff,0 0 24u 4u var(--rc)}
.hs-platform i{position:absolute;inset:12% 6%;border-radius:50%;background:conic-gradient(from 0deg,transparent 0,var(--rc) 12%,transparent 30%,transparent 50%,var(--rc) 62%,transparent 80%);opacity:.85;animation:hs-spin 3.2s linear infinite;-webkit-mask:radial-gradient(ellipse closest-side,transparent 78%,#000 82%);mask:radial-gradient(ellipse closest-side,transparent 78%,#000 82%)}
.hs-prev-img{position:relative;width:78%;height:86%;margin-bottom:8%;animation:hs-bob 2.8s ease-in-out infinite}
.hs-prev-img.swap{animation:hs-swap .45s cubic-bezier(.3,1.5,.5,1),hs-bob 2.8s ease-in-out .45s infinite}
.hs-prev-img .hs-ic img{filter:drop-shadow(0 12u 10u rgba(0,0,0,.5))}
.hs-prev .hs-spk{opacity:0}
.hs-prev-state{position:absolute;left:2u;top:2u;z-index:3;display:flex;align-items:center;gap:5u;padding:2u 10u 3u 7u;border-radius:99u;font-size:max(9px,12u);font-weight:900;line-height:1.1;background:rgba(3,10,50,.7);border:2u solid #6d86c4;color:#d4e6ff}
.hs-prev-state svg{width:15u;height:15u;flex:none}
.hs-prev-state.own{background:linear-gradient(180deg,#43d95a,#18a637);border-color:#0a5a1a;color:#fff}
.hs-prev-state.eq{background:linear-gradient(180deg,#4fd4ff,#1090e8);border-color:#05508f;color:#fff}
.hs-eye{position:absolute;right:2u;top:2u;z-index:3;width:40u;height:40u;border-radius:12u;background:linear-gradient(180deg,#1d4fd0,#0a2577);border:2.5u solid #5ccaff;box-shadow:0 3u 0 #04123d;display:flex;align-items:center;justify-content:center;pointer-events:auto;transition:transform .1s}
.hs-eye svg{width:24u;height:24u}
.hs-eye:active{transform:translateY(2u)}
.hs-nav{position:absolute;top:46%;width:34u;height:44u;border-radius:12u;background:linear-gradient(180deg,#1d4fd0,#0a2577);border:2.5u solid #5ccaff;box-shadow:0 3u 0 #04123d;display:flex;align-items:center;justify-content:center;pointer-events:auto;z-index:3}
.hs-nav svg{width:18u;height:18u}
.hs-nav.l{left:-2u}
.hs-nav.r{right:-2u}
.hs-nav:active{transform:translateY(2u)}
.hs-prev-price{display:flex;align-items:center;justify-content:center;gap:8u;width:78%;min-height:44u;border-radius:14u;background:linear-gradient(180deg,#041348,#0a2272);border:2.5u solid #2d6fe0;font-size:28u;font-weight:900;box-shadow:inset 0 3u 6u rgba(0,0,0,.55);position:relative;z-index:1}
.hs-prev-price img{height:32u;width:32u;object-fit:contain}
.hs-prev-price.cant{color:#ff7d89}
.hs-prev-price.own{color:#8dff9d;font-size:21u}
.hs-prev-price.eq{color:#8fe3ff;font-size:21u}
.hs-prev-price.ex{color:#e0c4ff;font-size:17u}
.hs-prev-price.ex svg{width:30u;height:30u;flex:none}
.hs-prev-price.ad{position:relative;flex-direction:column;gap:3u;padding:5u 10u 6u;font-size:max(10px,15u);overflow:hidden}
.hs-prev-price.ad .bar{position:relative;width:100%;height:12u;border-radius:99u;background:#030c30;box-shadow:inset 0 2u 4u rgba(0,0,0,.7),0 0 0 2u #1a56d8;overflow:hidden}
.hs-prev-price.ad .bar i{position:absolute;left:0;top:0;bottom:0;width:calc(var(--p,0)*100%);border-radius:99u;background:linear-gradient(180deg,#fff08a,#ffc61f 55%,#ee9a0a);box-shadow:inset 0 2u 0 rgba(255,255,255,.55);transition:width .6s cubic-bezier(.3,1.2,.5,1)}
.hs-prev-price.bump{animation:hs-bump .45s cubic-bezier(.3,1.6,.5,1)}
.hs-act{width:100%;height:56u;font-size:25u;margin-top:1u;flex:none}
.hs-act.eq,.hs-act.owned{--b1:#6fd5ff;--b2:#1d8cf0;--b3:#0b4aa8;--bo:#072e72}
.hs-act.eq{cursor:default}
.hs-act.eq::after{display:none}
.hs-act.small,.hs-prev-ad{height:38u;font-size:14u}
.hs-prev-ad{width:100%;flex:none;gap:6u;line-height:1.05}
.hs-prev-ad img{width:22u;height:22u;object-fit:contain;flex:none}
.hs-prev .hs-hint,.hs-peek .hs-hint{min-height:0;display:none;font-size:max(10px,13.5u);line-height:1.12}
.hs-prev .hs-hint.on,.hs-peek .hs-hint.on{display:block}
.hs-hint.good{color:#8dff9d;text-shadow:0 2u 0 #06361a}
.hs-btn .t.sm{font-size:.82em}
.hs-btn.busy{filter:saturate(.5) brightness(.85)}

/* режим «на сцене»: окно прячется, остаётся нижняя панель, 3D-герой виден за ней */
.hs-shop.peek{background:radial-gradient(ellipse at 50% 40%,rgba(10,40,130,.06),rgba(2,8,36,.4))}
.hs-shop.peek .hs-shopwin{opacity:0;transform:scale(.96);pointer-events:none}
.hs-peek{position:absolute;left:50%;bottom:calc(14u + env(safe-area-inset-bottom,0px));transform:translate(-50%,40u);opacity:0;pointer-events:none;width:min(94%,640u);display:flex;align-items:center;gap:10u;padding:10u 12u;flex-wrap:wrap;justify-content:center;transition:opacity .22s,transform .25s cubic-bezier(.3,1.4,.5,1)}
.hs-shop.peek .hs-peek{opacity:1;transform:translate(-50%,0);pointer-events:auto}
.hs-peek .pi{flex:1 1 150u;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2u}
.hs-peek .pn{font-size:22u;font-weight:900;line-height:1.05;text-align:center}
.hs-peek .pr{padding:1u 10u 2u;border-radius:99u;border:1.5u solid var(--rc);color:var(--rc);background:rgba(0,0,0,.35);font-size:12u;font-weight:900}
.hs-peek .hs-btn{height:52u;font-size:21u;padding:0 16u;flex:1 1 150u}
.hs-peek .hs-btn.back{flex:0 0 auto}
.hs-peek .hs-hint{flex:1 0 100%}

/* усиления */
.hs-pcard{--rc:#8fb6d9;--rca:rgba(143,182,217,.5);position:relative;display:flex;flex-direction:column;align-items:center;min-height:0;padding:10u 10u 10u;gap:6u;border-radius:18u;background:linear-gradient(180deg,#0d3399,#071c64);border:3u solid var(--rc);box-shadow:0 5u 0 #04123d,0 0 18u -4u var(--rc),inset 0 0 26u rgba(0,0,40,.5);
  animation:hs-cardin .5s cubic-bezier(.2,1,.3,1) backwards;animation-delay:calc(var(--i,0)*70ms);pointer-events:auto}
.hs-pcard h3{margin:0;font-size:22u;font-weight:900;line-height:1;text-shadow:0 2u 0 #04123d}
.hs-pcard p{margin:0;font-size:12.5u;font-weight:700;color:#bcd6ff;text-align:center;line-height:1.15;min-height:2.3em;max-width:100%}
.hs-pcard .stg{position:relative;flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}
.hs-pcard .stg .hs-glow{width:100%}
.hs-pcard .stg .hs-platform{height:24%;bottom:6%;width:78%}
.hs-pcard .stg .pi{position:relative;width:62%;height:78%;margin-bottom:10%;animation:hs-bob 2.6s ease-in-out infinite;animation-delay:var(--i,0)s}
.hs-pcard .stg .pi img{max-height:100%}
.hs-pcard .pk{display:flex;gap:6u;align-items:center;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.hs-pcard .pk span{padding:2u 12u 3u;border-radius:99u;background:#041348;border:2u solid #2d6fe0;font-size:16u;font-weight:900}
.hs-pcard .pk span.have{color:#9fe8ff;font-size:max(9px,12.5u);border-color:#1b9acb}
.hs-pcard .pk span.have.bump{animation:hs-bump .45s cubic-bezier(.3,1.6,.5,1)}
.hs-pcard .pr{display:flex;align-items:center;justify-content:center;gap:8u;width:100%;height:34u;border-radius:12u;background:linear-gradient(180deg,#041348,#0a2272);border:2.5u solid #2d6fe0;font-size:21u;font-weight:900;box-shadow:inset 0 3u 5u rgba(0,0,0,.5);position:relative;z-index:1;flex:none}
.hs-pcard .pr img{height:26u;width:26u;object-fit:contain}
.hs-pcard .pr.cant{color:#ff7d89}
.hs-pcard .hs-btn{width:100%;height:42u;font-size:18u;flex:none}
.hs-pcard .hs-btn.ad{height:42u;font-size:max(9.5px,14.5u);line-height:1.05}
.hs-pcard .hs-hint{min-height:0;font-size:max(10px,12.5u);display:none;text-align:center;line-height:1.1}
.hs-pcard .hs-hint.on{display:block}
.hs-pcard.flash::after,.hs-prev.flash::after{content:'';position:absolute;inset:-3u;border-radius:inherit;background:radial-gradient(circle,#fff,rgba(255,255,255,.2) 60%,transparent);opacity:0;animation:hs-flash .55s ease-out;pointer-events:none;z-index:5}

/* слои эффектов поверх окон: монеты, всплески */
.hs-fxl{position:absolute;inset:0;pointer-events:none;z-index:70;overflow:hidden}
.hs-fly{position:absolute;left:0;top:0;width:26u;height:27u;margin:-13u 0 0 -13u;background:url('assets/ui/icon-coin.webp') center/contain no-repeat;pointer-events:none;will-change:transform,opacity}
.hs-star{pointer-events:none}
.hs-bst{position:absolute;left:0;top:0;width:calc(16u*var(--z,1));height:calc(16u*var(--z,1));margin:calc(-8u*var(--z,1)) 0 0 calc(-8u*var(--z,1));background:var(--c,#ffe45c);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);will-change:transform,opacity}

/* кнопки «+» у кошелька и всплывающее предложение рекламы */
.hs-pill.hasplus{padding-right:30u}
.hs-plus{position:absolute;right:-9u;top:50%;width:31u;height:31u;margin-top:-15.5u;border-radius:50%;pointer-events:auto;background:linear-gradient(180deg,#9bff86,#1fc03a);border:2.5u solid #0a4d19;box-shadow:0 3u 0 #0a4d19,0 0 10u rgba(120,255,110,.5),inset 0 2u 0 rgba(255,255,255,.55);color:#fff;font-size:25u;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;text-shadow:0 2u 0 #0a4d19;transition:transform .1s;padding-bottom:2u}
.hs-plus:active{transform:translateY(2u) scale(.94)}
.hs-plus.glow{animation:hs-pulse 1.4s ease-in-out infinite}
.hs-pop{position:absolute;z-index:50;display:flex;flex-direction:column;gap:8u;padding:12u 14u 14u;width:min(310u,94%);border-radius:18u;pointer-events:auto;animation:hs-popin .3s cubic-bezier(.3,1.6,.5,1) backwards;transform-origin:90% 0}
.hs-pop .row{display:flex;align-items:center;gap:10u}
.hs-pop .pi{width:46u;height:46u;object-fit:contain;flex:none;filter:drop-shadow(0 3u 0 rgba(0,0,0,.4))}
.hs-pop .pt{display:flex;flex-direction:column;min-width:0;line-height:1.1}
.hs-pop .pt b{font-size:25u;font-weight:900}
.hs-pop .pt small{font-size:13u;font-weight:800;color:#bcd6ff}
.hs-pop .hs-btn{height:46u;font-size:16u;width:100%}
.hs-pop .hs-hint{min-height:0;display:none;font-size:13u}
.hs-pop .hs-hint.on{display:block}

/* окно награды */
.hs-prize{position:absolute;inset:0;z-index:55;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 45%,rgba(14,50,150,.8),rgba(2,8,38,.94));pointer-events:auto;animation:hs-fadein .25s ease-out}
.hs-prize .rays{position:absolute;left:50%;top:50%;width:max(150%,1100u);aspect-ratio:1;margin:calc(max(150%,1100u)/-2) 0 0 calc(max(150%,1100u)/-2);opacity:.55;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,236,150,.55) 0 8deg,transparent 8deg 24deg);-webkit-mask:radial-gradient(circle,#000 0,transparent 52%);mask:radial-gradient(circle,#000 0,transparent 52%);animation:hs-spin 24s linear infinite;pointer-events:none;will-change:transform}
.hs-pz-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:12u;width:min(94%,520u);max-height:96%;padding:44u 20u 18u;animation:hs-pop .6s cubic-bezier(.2,1.2,.3,1) backwards}
.hs-pz-title{position:absolute;left:50%;top:-28u;transform:translateX(-50%);max-width:112%;pointer-events:none;font-size:40u;--sk:9u;--dp:4u;--ol:#0a1a52;padding:0 10u;white-space:nowrap}
.hs-pz-row{display:flex;flex-wrap:wrap;gap:12u;justify-content:center;align-items:flex-start}
.hs-pz-it{--rc:#ffd23d;position:relative;display:flex;flex-direction:column;align-items:center;gap:4u;width:130u;padding:12u 8u 10u;border-radius:16u;background:radial-gradient(circle at 50% 38%,rgba(255,255,255,.18),transparent 66%),linear-gradient(180deg,#0d3399,#071c64);border:3u solid var(--rc);box-shadow:0 0 18u -2u var(--rc),0 5u 0 #04123d;animation:hs-pop .6s cubic-bezier(.2,1.4,.3,1) backwards;animation-delay:calc(var(--k,0)*160ms + 200ms)}
.hs-pz-it .big{width:84u;height:84u;display:flex;align-items:center;justify-content:center;animation:hs-bob 2.4s ease-in-out infinite}
.hs-pz-it .big img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6u 6u rgba(0,0,0,.45))}
.hs-pz-it .big .hs-ic{width:100%;height:100%}
.hs-pz-it b{font-size:26u;font-weight:900;line-height:1}
.hs-pz-it small{font-size:12.5u;font-weight:800;color:#d4e6ff;text-align:center;line-height:1.1;max-width:100%}
.hs-pz-it .rr{padding:0 8u 1u;border-radius:99u;border:1.5u solid var(--rc);color:var(--rc);background:rgba(0,0,0,.35);font-size:11u;font-weight:900}
.hs-pz-it.coin b{color:#ffe45c}
.hs-pz-it.gem b{color:#e6a8ff}
.hs-pz-note{font-size:13u;color:#bcd6ff;text-align:center}
.hs-pz-card .hs-btn{width:min(100%,300u);height:58u;font-size:26u}

/* ---------- ПОДАРОК ДНЯ ---------- */
.hs-dgwin{position:absolute;inset:0;margin:auto;width:min(96%,900u);height:max-content;max-height:96%;padding:12u 16u 16u;display:flex;flex-direction:column;gap:10u}
.hs-dg-head{display:flex;align-items:center;gap:12u;min-height:50u;flex:none}
.hs-dg-title{font-size:34u;--ol:#0a1a52;--g1:#fff8b0;--g2:#ffd23d;--g3:#ff9a1c;--sk:9u;--dp:4u;padding:0 4u;margin-right:auto;white-space:nowrap}
.hs-dg-head .hs-sh-wallet{margin-left:0}
.hs-dg-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,32%);gap:12u;min-height:0;flex:1 1 auto;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
.hs-dg-days{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10u}
.hs-dg-day{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:4u;min-height:116u;padding:8u 6u 8u;border-radius:16u;background:linear-gradient(180deg,#0f3597,#071c64);border:3u solid #3f95ff;box-shadow:0 4u 0 #04123d,inset 0 0 20u rgba(0,0,40,.45);animation:hs-cardin .5s cubic-bezier(.2,1,.3,1) backwards;animation-delay:calc(var(--i,0)*60ms)}
.hs-dg-day .dt{font-size:max(9px,13u);font-weight:900;letter-spacing:.03em;color:#cfe3ff}
.hs-dg-day .dr{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4u;min-height:0}
.hs-dg-day .rc{display:flex;align-items:center;gap:5u;font-size:max(11px,19u);font-weight:900;line-height:1}
.hs-dg-day .rc img{width:27u;height:27u;object-fit:contain;flex:none;filter:drop-shadow(0 2u 0 rgba(0,0,0,.4))}
.hs-dg-day .rc .hs-ic{width:34u;height:34u;flex:none}
.hs-dg-day .rc svg{width:32u;height:32u;flex:none}
.hs-dg-day .rc.gem b{color:#e6a8ff}
.hs-dg-day .rc.coin b{color:#ffe45c}
.hs-dg-day .ds{padding:1u 10u 2u;border-radius:99u;font-size:max(8.5px,11u);font-weight:900;line-height:1.1;background:rgba(0,0,0,.35);border:1.5u solid rgba(255,255,255,.25);color:#bcd6ff;white-space:nowrap}
.hs-dg-day.claimed{border-color:#3fcf5a;background:linear-gradient(180deg,#0e4a4c,#06303a)}
.hs-dg-day.claimed .dr,.hs-dg-day.claimed .dt{opacity:.4}
.hs-dg-day.claimed .ds{background:linear-gradient(180deg,#43d95a,#18a637);border-color:#0a5a1a;color:#fff}
.hs-dg-day .ck{position:absolute;right:5u;top:5u;width:30u;height:30u;border-radius:50%;background:linear-gradient(180deg,#59ee6c,#18a637);border:3u solid #0a5a1a;box-shadow:0 3u 0 #08481a;display:none;align-items:center;justify-content:center}
.hs-dg-day .ck svg{width:20u;height:20u}
.hs-dg-day.claimed .ck{display:flex;animation:hs-starpop .6s cubic-bezier(.2,1.8,.4,1) backwards}
.hs-dg-day.today{border-color:#ffd23d;background:linear-gradient(180deg,#1a58e0,#0b2c8c);box-shadow:0 4u 0 #b87400,0 0 22u 2u rgba(255,210,61,.7),inset 0 0 20u rgba(120,170,255,.4);animation:hs-cardin .5s cubic-bezier(.2,1,.3,1) backwards,hs-todayglow 1.4s ease-in-out .6s infinite;animation-delay:calc(var(--i,0)*60ms),0s;z-index:1}
.hs-dg-day.today .ds{background:linear-gradient(180deg,#fff17a,#ffc61f);border-color:#6e4300;color:#3b2400}
.hs-dg-day.tomorrow{border-color:#59c8ff}
.hs-dg-day.tomorrow .ds{color:#a8ecff;border-color:#59c8ff}
.hs-dg-day.locked{opacity:.85}
.hs-dg-day.locked .dr{opacity:.7}
.hs-dg-goal{--rc:#ff3d6e;--rca:rgba(255,61,110,.5);position:relative;display:flex;flex-direction:column;align-items:center;gap:4u;padding:10u 10u 10u;border-radius:18u;background:radial-gradient(ellipse at 50% 38%,#6a1fd0 0,#33107e 55%,#1a0a52 100%);border:3u solid var(--rc);box-shadow:0 5u 0 #04123d,0 0 22u -2u var(--rc),inset 0 0 26u rgba(0,0,40,.5);overflow:hidden;animation:hs-cardin .5s cubic-bezier(.2,1,.3,1) .45s backwards}
.hs-dg-goal .gt{display:flex;align-items:center;gap:8u;font-size:max(10px,14u);font-weight:900;color:#ffe9f0;position:relative;z-index:1}
.hs-dg-goal .gt b{padding:1u 10u 2u;border-radius:99u;background:linear-gradient(180deg,#ff6b8a,#e0184a);border:2u solid #5a0620;font-size:max(9px,12u)}
.hs-dg-goal .gs{position:relative;flex:1;min-height:90u;width:100%;display:flex;align-items:center;justify-content:center}
.hs-dg-goal .gs .rays{position:absolute;left:50%;top:50%;width:150%;aspect-ratio:1;margin-left:-75%;margin-top:-75%;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,200,230,.45) 0 8deg,transparent 8deg 24deg);-webkit-mask:radial-gradient(circle,#000 0,transparent 58%);mask:radial-gradient(circle,#000 0,transparent 58%);animation:hs-spin 20s linear infinite;will-change:transform}
.hs-dg-goal .gs .gi{position:relative;width:78%;height:92%;animation:hs-bob 2.8s ease-in-out infinite}
.hs-dg-goal .gn{font-size:21u;font-weight:900;line-height:1.05;text-align:center;position:relative;z-index:1}
.hs-dg-goal .gh{font-size:max(9px,12u);font-weight:800;color:#e9d4ff;text-align:center;line-height:1.1;position:relative;z-index:1}
.hs-dg-goal .ds{position:relative;z-index:1;padding:1u 12u 2u;border-radius:99u;font-size:max(9px,12u);font-weight:900;background:rgba(0,0,0,.4);border:1.5u solid rgba(255,255,255,.3);color:#d4c4ff}
.hs-dg-goal.claimed .ds{background:linear-gradient(180deg,#43d95a,#18a637);border-color:#0a5a1a;color:#fff}
.hs-dg-goal.today{box-shadow:0 5u 0 #04123d,0 0 26u 2u var(--rc)}
.hs-dg-goal .big{position:relative;z-index:1;display:flex;align-items:center;gap:8u;font-size:34u;font-weight:900;color:#ffe45c}
.hs-dg-goal .big img{width:54u;height:54u;object-fit:contain}
.hs-dg-foot{display:flex;gap:12u;align-items:stretch;flex:none}
.hs-dg-foot .hs-btn{height:62u;min-width:0}
.hs-dg-claim{flex:1.15 1 0;font-size:30u}
.hs-dg-x2{flex:1 1 0;font-size:19u;flex-direction:column;gap:1u;line-height:1.05;padding:0 8u}
.hs-dg-x2 .row{display:flex;align-items:center;gap:7u}
.hs-dg-x2 .sub{display:flex;gap:10u;align-items:center;font-size:max(10px,14u);color:#3b2400;text-shadow:none;font-weight:900}
.hs-dg-x2 .sub img{width:20u;height:20u;object-fit:contain}
.hs-dg-x2 .sub svg{width:20u;height:20u}
.hs-dg-x2 .sub span{display:flex;align-items:center;gap:3u}
.hs-dg-next{text-align:center;font-size:max(10px,17u);color:#bcd6ff;min-height:1.2em;font-variant-numeric:tabular-nums}
.hs-dg-win .hs-hint{min-height:0;display:none;font-size:max(10px,13.5u)}
.hs-dg-win .hs-hint.on{display:block}
.hs-dg-win .hs-hint.neutral{color:#bcd6ff;text-shadow:none}

/* ---------- КОЛЕСО ФОРТУНЫ ---------- */
.hs-whwin{position:absolute;inset:0;margin:auto;width:min(96%,860u);height:max-content;max-height:96%;padding:12u 16u 16u;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);grid-template-areas:'head head' 'disk side';gap:8u 18u;align-items:center}
.hs-wh-head{grid-area:head;display:flex;align-items:center;gap:12u;min-height:50u}
.hs-wh-title{font-size:32u;--ol:#0a1a52;--g1:#fff8b0;--g2:#ffd23d;--g3:#ff9a1c;--sk:9u;--dp:4u;padding:0 4u;margin-right:auto;white-space:nowrap}
.hs-wh-head .hs-sh-wallet{margin-left:0}
.hs-wh-area{grid-area:disk;display:flex;justify-content:center;align-items:center;min-width:0;padding-top:16u}
.hs-wh-stage{position:relative;width:var(--ds,260px);height:var(--ds,260px);flex:none}
.hs-wh-rim{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,#0a2272 0,#0a2272 70%,#ffd23d 71%,#ff9a1c 100%);box-shadow:0 0 0 4u #6e4300,0 8u 0 #4a2a00,0 14u 26u rgba(0,0,0,.55),0 0 30u 4u rgba(255,200,60,.35)}
.hs-wh-rim::after{content:'';position:absolute;inset:1.2%;border-radius:50%;background:repeating-conic-gradient(from 0deg,#fff6a8 0 2.5deg,transparent 2.5deg 15deg);-webkit-mask:radial-gradient(circle,transparent 90%,#000 91%,#000 97%,transparent 98%);mask:radial-gradient(circle,transparent 90%,#000 91%,#000 97%,transparent 98%);animation:hs-bulbs 1s steps(2) infinite}
.hs-wh-disk{position:absolute;inset:5.5%;border-radius:50%;overflow:hidden;box-shadow:0 0 0 3u #fff,inset 0 0 22u rgba(0,0,0,.35);will-change:transform;background:#0a2272}
.hs-wh-disk svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.hs-wh-disk .wd{stroke:#fff;stroke-width:.9;transition:filter .2s}
.hs-wh-disk .wd.win{animation:hs-wedge .5s ease-in-out infinite alternate}
.hs-wh-pz{position:absolute;left:50%;top:50%;width:0;height:0}
.hs-wh-pz .in{position:absolute;left:0;top:calc(var(--ds)*-.335);transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:1px;width:calc(var(--ds)*.25)}
.hs-wh-pz .in img{width:calc(var(--ds)*.115);height:calc(var(--ds)*.115);object-fit:contain;filter:drop-shadow(0 2px 0 rgba(0,0,0,.35))}
.hs-wh-pz .in .hs-ic{width:calc(var(--ds)*.15);height:calc(var(--ds)*.15)}
.hs-wh-pz .in .hs-ic img{width:100%;height:100%}
.hs-wh-pz .in b{font-size:max(9px,calc(var(--ds)*.052));font-weight:900;line-height:1;color:#fff;text-shadow:1px 0 0 #0a1840,-1px 0 0 #0a1840,0 1px 0 #0a1840,0 -1px 0 #0a1840,0 2px 0 #0a1840;font-variant-numeric:tabular-nums}
.hs-wh-pz.item .in{top:calc(var(--ds)*-.34)}
.hs-wh-pz.item .ring{padding:calc(var(--ds)*.006);border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.85),rgba(255,255,255,.25) 70%,transparent);box-shadow:0 0 0 2px var(--rc),0 0 10px var(--rc)}
.hs-wh-hub{position:absolute;left:50%;top:50%;width:19%;aspect-ratio:1;margin:-9.5% 0 0 -9.5%;border-radius:50%;background:radial-gradient(circle at 40% 30%,#fff3a0,#ffc61f 55%,#c47a00);border:calc(var(--ds)*.012) solid #6e4300;box-shadow:0 4u 0 #4a2a00,inset 0 3u 0 rgba(255,255,255,.6);z-index:2;display:flex;align-items:center;justify-content:center}
.hs-wh-hub::after{content:'';width:42%;height:42%;border-radius:50%;background:radial-gradient(circle at 40% 30%,#fff,#c9d2e8);box-shadow:inset 0 -3u 0 rgba(0,0,0,.2)}
.hs-wh-ptr{position:absolute;left:50%;top:-5.5%;width:12%;aspect-ratio:48/56;margin-left:-6%;z-index:3;transform-origin:50% 25%;filter:drop-shadow(0 4u 3u rgba(0,0,0,.5))}
.hs-wh-ptr svg{width:100%;height:100%}
.hs-wh-ptr.flick{animation:hs-flick .12s ease-out}
.hs-wh-side{grid-area:side;display:flex;flex-direction:column;gap:10u;min-width:0;justify-content:center}
.hs-wh-info{padding:10u 12u;text-align:center;font-size:max(10px,16u);color:#bcd6ff;font-weight:800;line-height:1.2}
.hs-wh-info b{display:block;font-size:22u;color:#fff}
.hs-wh-side .hs-btn{height:62u;font-size:22u;width:100%;line-height:1.05;min-width:0}
.hs-wh-ad{flex-direction:column;gap:1u;font-size:17u}
.hs-wh-ad .row{display:flex;align-items:center;gap:7u}
.hs-wh-ad .sub{font-size:max(10px,13u);color:#3b2400;text-shadow:none;font-weight:900}
.hs-wh-side .hs-hint{min-height:0;display:none;font-size:max(10px,13.5u)}
.hs-wh-side .hs-hint.on{display:block}
.hs-wh-side .hs-hint.neutral{color:#bcd6ff;text-shadow:none}

/* ---------- ПРЕДЛОЖЕНИЕ В РАУНДЕ ---------- */
.hs-offer{position:absolute;inset:0;z-index:45;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 45%,rgba(10,30,100,.45),rgba(2,6,30,.82));pointer-events:auto;animation:hs-fadein .22s ease-out}
.hs-offer.out{opacity:0;transition:opacity .2s}
.hs-of-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:10u;width:min(92%,430u);padding:58u 20u 18u;animation:hs-pop .55s cubic-bezier(.2,1.3,.3,1) backwards}
.hs-of-ring{position:absolute;left:50%;top:-44u;width:92u;height:92u;margin-left:-46u;filter:drop-shadow(0 5u 6u rgba(0,0,0,.5))}
.hs-of-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.hs-of-ring .bg{fill:#0a2272;stroke:#041348;stroke-width:12}
.hs-of-ring .tr{fill:none;stroke:#1a3a9a;stroke-width:9}
.hs-of-ring .pg{fill:none;stroke:#ffd23d;stroke-width:9;stroke-linecap:round;transition:stroke .3s}
.hs-of-ring.low .pg{stroke:#ff4d5e}
.hs-of-ring b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:40u;font-weight:900;font-variant-numeric:tabular-nums}
.hs-of-ring.low{animation:hs-pulse .5s ease-in-out infinite}
.hs-of-title{font-size:38u;--sk:9u;--dp:4u;--ol:#0a1a52;--g1:#ffd0d0;--g2:#ff5a66;--g3:#d4162a;padding:0 8u;margin-top:4u;max-width:100%}
.hs-offer.time .hs-of-title{--g1:#fff8b0;--g2:#ffd23d;--g3:#ff9a1c;--ol:#4a2a00}
.hs-of-sub{font-size:20u;font-weight:800;color:#d4e6ff;text-align:center;line-height:1.15}
.hs-of-card .hs-btn.go{width:100%;height:68u;font-size:26u;flex-direction:column;gap:0;line-height:1.05}
.hs-of-card .hs-btn.go .row{display:flex;align-items:center;gap:8u}
.hs-of-card .hs-btn.go .sub{font-size:max(11px,15u);text-shadow:0 1.5u 0 #0a4d19}
.hs-of-no{padding:8u 18u;border-radius:99u;font-size:17u;font-weight:800;color:#a9c9ff;background:rgba(3,10,50,.5);border:2u solid rgba(110,150,230,.5);pointer-events:auto}
.hs-of-no:active{transform:translateY(2u)}
.hs-of-card .hs-hint{min-height:0;display:none;font-size:14u}
.hs-of-card .hs-hint.on{display:block}

/* результат: кошелёк, x2 */
.hs-rtop{display:flex;flex-direction:column;align-items:center;gap:6u;width:100%}
.hs-rtop .hs-sh-wallet{margin:0;padding:0 10u 0 4u;gap:20u}
.hs-rtop .hs-sh-wallet .hs-pill{font-size:16u;height:34u;padding-left:34u}
.hs-rtop .hs-pill-ic{height:40u;width:40u}
.hs-x2{width:100%;height:56u;font-size:21u;flex-direction:column;gap:0;line-height:1.05;flex:none}
.hs-x2 .row{display:flex;align-items:center;gap:8u}
.hs-x2 .sub{font-size:max(10px,14u);color:#3b2400;text-shadow:none;font-weight:900}
.hs-x2.done{--b1:#7cff6b;--b2:#1fc03a;--b3:#0e6e22;--bo:#0a4d19;cursor:default}
.hs-x2 .hs-hint{display:none}

/* кнопки меню справа: подарок и колесо (рамка и значок рисуются здесь) */
.hs-m-right{position:absolute;right:calc(var(--mp) + env(safe-area-inset-right,0px));top:50%;transform:translateY(-44%);display:flex;flex-direction:column;gap:14u;align-items:center}
.hs-tool.fr{background:none;filter:drop-shadow(0 5u 0 rgba(3,10,50,.7)) drop-shadow(0 8u 8u rgba(0,0,0,.35))}
.hs-tool.fr::before{content:'';position:absolute;inset:3%;border-radius:20%;background:radial-gradient(ellipse at 50% 38%,#1b58e0,#0a2a8f 62%,#06185e);border:4u solid #38b8ff;box-shadow:0 0 0 2u #06236f,inset 0 0 14u rgba(0,10,60,.6),inset 0 2u 0 rgba(255,255,255,.28)}
.hs-tool.fr .ic{position:absolute;left:18%;right:18%;top:10%;height:56%;display:flex;align-items:center;justify-content:center}
.hs-tool.fr .ic svg{width:100%;height:100%;filter:drop-shadow(0 3u 0 rgba(0,0,0,.35))}
.hs-tool.fr span{background:linear-gradient(180deg,#0a2a80,#04154f);border:2u solid #2d6fe0;border-radius:99u;left:12%;right:12%;bottom:9%;height:17%;font-size:max(9px,11u)}
.hs-tool.fr.attn .ic{animation:hs-wiggle 1.6s ease-in-out infinite}
.hs-tool.fr.attn::before{animation:hs-tpulse 1.4s ease-in-out infinite}

/* настройки */
.hs-setwin{position:absolute;inset:0;margin:auto;width:min(94%,460u);height:max-content;max-height:94%;padding:14u 18u 18u;display:flex;flex-direction:column;gap:12u}
.hs-set-title{font-size:34u;text-align:center;--ol:#0a1a52;--g1:#fff;--g2:#f2f7ff;--g3:#c6dbff;--sk:8u;--dp:3u;align-self:center;padding:0 4u}
.hs-row{display:flex;align-items:center;gap:12u;min-height:50u;padding:6u 12u;font-size:20u;font-weight:900}
.hs-row>svg{width:28u;height:28u;flex:none}
.hs-row .lb{flex:1;min-width:0}
.hs-switch{position:relative;width:78u;height:38u;border-radius:99u;background:linear-gradient(180deg,#30385a,#1f2744);border:3u solid #131a38;box-shadow:inset 0 3u 6u rgba(0,0,0,.6);transition:background .2s;pointer-events:auto;flex:none}
.hs-switch::before{content:'';position:absolute;left:3u;top:50%;width:26u;height:26u;margin-top:-13u;border-radius:50%;background:linear-gradient(180deg,#fff,#c9d2e8);box-shadow:0 3u 0 rgba(0,0,0,.35);transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
.hs-switch.on{background:linear-gradient(180deg,#59ee6c,#1ea43a);border-color:#0a5a1a}
.hs-switch.on::before{transform:translateX(38u)}
.hs-qrow{display:flex;flex-direction:column;gap:8u;padding:8u 12u 12u}
.hs-qrow .hd{display:flex;align-items:center;gap:12u;font-size:20u;font-weight:900}
.hs-qrow .hd svg{width:28u;height:28u}
.hs-qseg{display:grid;grid-template-columns:repeat(4,1fr);gap:6u}
.hs-qseg button{height:38u;border-radius:11u;background:linear-gradient(180deg,#102f95,#071d63);border:2.5u solid #3f95ff;font-size:12.5u;font-weight:900;color:#c4dcff;box-shadow:0 3u 0 #04123d;pointer-events:auto;padding:0 2u;min-width:0;overflow:hidden;text-overflow:ellipsis}
.hs-qseg button.on{background:linear-gradient(180deg,#fff17a,#ffc61f);border-color:#6e4300;color:#3b2400;box-shadow:0 3u 0 #b87400}
.hs-set-btns{display:flex;gap:10u;margin-top:2u}
.hs-set-btns .hs-btn{flex:1;height:54u;font-size:19u}
.hs-set-close{position:absolute;right:-8u;top:-12u}

/* ---------- HUD ---------- */
.hs-hud{position:absolute;inset:0;pointer-events:none;--u:1px;z-index:1}
.hs-hb{pointer-events:none}
.hs-fit{position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(var(--fit,1))}
.hs-hb.map .hs-fit{width:250px;height:44px}
.hs-hb.players .hs-fit{width:128px;height:40px}
.hs-hb.timer .hs-fit{width:176px;height:80px}
.hs-hb.wallet .hs-fit{width:262px;height:42px}
.hs-hb.level .hs-fit{width:250px;height:50px}
.hs-hb.abil .hs-fit{width:198px;height:102px}
.hs-hb.status .hs-fit{width:170px;height:38px}
.hs-plate{position:absolute;inset:0;display:flex;align-items:center;gap:8px;padding:0 12px 0 6px;border-radius:15px;background:linear-gradient(180deg,rgba(15,52,155,.96),rgba(6,22,84,.96));border:2.5px solid var(--mc,#5ccaff);box-shadow:0 3px 0 #04123d,0 0 12px -2px var(--mc,#5ccaff),inset 0 2px 0 rgba(255,255,255,.18)}
.hs-plate .num{flex:none;display:flex;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 4px;border-radius:10px;background:var(--mc,#5ccaff);color:#07204d;font-size:17px;font-weight:900;box-shadow:inset 0 2px 0 rgba(255,255,255,.5),inset 0 -3px 0 rgba(0,0,0,.2)}
.hs-plate .nm{flex:1;min-width:0;font-size:15.5px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.01em}
.hs-hud .hs-pill{height:38px;padding:0 12px 0 36px;border-width:2.5px;font-size:20px;min-width:0;gap:4px}
.hs-hud .hs-pill-ic{left:-6px;height:44px;width:44px}
.hs-wal{position:absolute;inset:0;display:flex;gap:16px;justify-content:flex-end;align-items:center;padding-left:6px}
.hs-wal .hs-pill{flex:1}
.hs-hb.players .hs-pill{position:absolute;inset:1px 0 1px 0;height:auto;padding-left:34px;justify-content:center}
.hs-hb.players .hs-pill .hs-pill-n{text-align:center;flex:none}
.hs-hb.players .hs-pill-ic{height:30px;width:30px;left:4px;top:50%}
.hs-hb.players.seeker .hs-pill{padding-left:12px;font-size:15px}
.hs-hb.players.seeker .hs-pill-ic{display:none}
.hs-time{position:absolute;left:8px;right:8px;top:0;height:54px;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 14px 0 4px;border-radius:20px;background:linear-gradient(180deg,rgba(14,48,148,.97),rgba(5,20,78,.97));border:3px solid #5ccaff;box-shadow:0 4px 0 #04123d,0 0 16px rgba(60,160,255,.45),inset 0 2px 0 rgba(255,255,255,.2)}
.hs-time img{width:38px;height:36px;object-fit:contain;flex:none;margin-left:-6px;filter:drop-shadow(0 2px 0 rgba(0,0,0,.35))}
.hs-time b{font-size:36px;font-weight:900;line-height:1;font-variant-numeric:tabular-nums;letter-spacing:.01em;display:block}
.hs-time.low{border-color:#ff6b78;background:linear-gradient(180deg,rgba(120,10,40,.97),rgba(60,4,28,.97));animation:hs-tshake .5s ease-in-out infinite,hs-redpulse 1s ease-in-out infinite}
.hs-time.low b{color:#ff6672}
.hs-phase{position:absolute;left:50%;top:50px;min-width:116px;height:27px;padding:0 14px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:16px;font-weight:900;color:#5a3400;white-space:nowrap;
  background:linear-gradient(180deg,#ffe36a,#ffb81c);border:2.5px solid #7a4a00;box-shadow:0 3px 0 #a86a00,0 6px 8px rgba(0,0,0,.35),inset 0 2px 0 rgba(255,255,255,.6)}
.hs-phase.seek{color:#fff;background:linear-gradient(180deg,#ff6b6b,#e3202f);border-color:#6a0a16;box-shadow:0 3px 0 #8e1020,0 6px 8px rgba(0,0,0,.35),inset 0 2px 0 rgba(255,255,255,.4);text-shadow:0 1.5px 0 #6a0a16}
.hs-phase.pop{animation:hs-phasepop .5s cubic-bezier(.3,1.7,.5,1)}
.hs-hlvl{position:absolute;left:0;right:0;bottom:0;height:46px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:6px 14px 0;border-radius:14px 14px 18px 18px;background:linear-gradient(180deg,rgba(14,48,148,.96),rgba(5,20,78,.96));border:2.5px solid #3f95ff;box-shadow:0 3px 0 #04123d,inset 0 2px 0 rgba(255,255,255,.16)}
.hs-hlvl b{font-size:15px;line-height:1;font-weight:900;letter-spacing:.03em}
.hs-hlvl .hs-bar{height:13px;margin-top:5px}
.hs-ab{position:absolute;top:0;width:95px;height:98px;background-size:100% 100%;background-repeat:no-repeat;pointer-events:auto;transition:transform .08s,filter .2s;filter:drop-shadow(0 4px 0 rgba(3,10,50,.7)) drop-shadow(0 6px 6px rgba(0,0,0,.35));border-radius:30%}
.hs-ab.dash{left:0;background-image:url('assets/ui/btn-dash.webp')}
.hs-ab.decoy{right:0;background-image:url('assets/ui/btn-decoy.webp')}
.hs-ab:active{transform:scale(.93)}
.hs-ab.empty{filter:saturate(.4) brightness(.75) drop-shadow(0 4px 0 rgba(3,10,50,.7))}
.hs-ab .lb{position:absolute;left:16%;right:12%;bottom:7.5%;height:18%;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:900;line-height:1;text-shadow:0 1.5px 0 #04123d;letter-spacing:.02em;white-space:nowrap}
.hs-ab .cd{position:absolute;left:10%;top:8%;width:78%;height:64%;border-radius:50%;background:conic-gradient(rgba(2,8,40,.68) var(--cd,0%),transparent 0);pointer-events:none}
.hs-ab .rg{position:absolute;left:8%;top:6%;width:82%;height:68%;border-radius:50%;border:3px solid #fff;opacity:0;pointer-events:none}
.hs-ab.ready .rg{animation:hs-ready .7s ease-out}
.hs-ab .nn{position:absolute;right:1%;top:4%;min-width:30px;height:30px;padding:0 5px;display:flex;align-items:center;justify-content:center;border-radius:99px;font-size:17px;font-weight:900;line-height:1;background:radial-gradient(circle at 40% 30%,#c06bff,#7a1fe0);border:2.5px solid #2c0a68;box-shadow:0 2px 0 rgba(0,0,0,.4);text-shadow:0 1.5px 0 #2c0a68}
.hs-ab.dash .nn{background:radial-gradient(circle at 40% 30%,#7ee0ff,#1a86ee);border-color:#072e72;text-shadow:0 1.5px 0 #072e72}
.hs-ab.decoy .nn{left:63.3%;right:auto;top:8.3%;width:25.8%;min-width:0;height:28.4%;padding:0;margin:0;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1;background:none;border:0;box-shadow:none;font-size:18px}
.hs-ab .nn.pop{animation:hs-bump .4s cubic-bezier(.3,1.7,.5,1)}
.hs-ab.ad .lb{font-size:8.6px;letter-spacing:0;left:12%;right:10%;white-space:normal;text-align:center;line-height:.95;bottom:6%;height:19%}
.hs-ab.decoy.ad .nn svg{width:100%;height:100%;animation:hs-pulse 1.1s ease-in-out infinite}
.hs-ab.decoy.ad:not(.empty){animation:hs-pulse 1.6s ease-in-out infinite}
.hs-ab .key{position:absolute;left:-2px;top:-4px;min-width:26px;height:24px;padding:0 6px;display:none;align-items:center;justify-content:center;border-radius:7px;background:#f4f8ff;color:#0a1a52;font-size:12px;font-weight:900;box-shadow:0 3px 0 #7b8fb8,0 5px 6px rgba(0,0,0,.3);white-space:nowrap}
.hs-kb .hs-ab .key{display:flex}
.hs-chips{position:absolute;inset:0;display:flex;gap:8px;justify-content:center;align-items:center}
.hs-chip{display:flex;align-items:center;gap:6px;height:32px;padding:0 12px 0 8px;border-radius:99px;background:linear-gradient(180deg,rgba(14,48,148,.97),rgba(5,20,78,.97));border:2.5px solid #5ccaff;box-shadow:0 3px 0 #04123d;font-size:13px;font-weight:900;white-space:nowrap;animation:hs-chipin .4s cubic-bezier(.3,1.6,.5,1)}
.hs-chip svg{width:22px;height:22px;flex:none}
.hs-chip.sh{border-color:#42c8ff;box-shadow:0 3px 0 #04123d,0 0 12px #42c8ff}
.hs-chip.sh svg{animation:hs-pulse 1.1s ease-in-out infinite}

/* виньетка опасности, стрелка к искателю, ники, всплывающий текст */
.hs-vig{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .18s linear;z-index:0;will-change:opacity}
.hs-vig i{position:absolute;inset:-2%;background:radial-gradient(ellipse at 50% 50%,transparent 46%,rgba(255,20,40,.3) 80%,rgba(190,0,25,.62) 100%);transform-origin:50% 50%;animation:hs-vig var(--vp,1.1s) ease-in-out infinite;will-change:transform}
.hs-arrow{position:absolute;left:0;top:0;width:52u;height:44u;margin:-22u 0 0 -26u;pointer-events:none;opacity:0;will-change:transform,opacity;z-index:2;filter:drop-shadow(0 3u 3u rgba(0,0,0,.4))}
.hs-arrow.on{opacity:1}
.hs-arrow svg{width:100%;height:100%;animation:hs-arrowpulse .55s ease-in-out infinite alternate}
.hs-tags{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.hs-tag{position:absolute;left:0;top:0;will-change:transform}
.hs-tag-in{position:absolute;left:0;top:0;transform:translate(-50%,-100%);display:flex;align-items:center;gap:4px;padding:3px 10px 4px;border-radius:9px;background:rgba(7,14,40,.86);border:2px solid rgba(255,255,255,.14);box-shadow:0 2px 0 rgba(0,0,0,.45);font-size:13px;font-weight:900;line-height:1.1;white-space:nowrap;color:#fff;margin-top:-5px}
.hs-tag-in::after{content:'';position:absolute;left:50%;bottom:-6px;margin-left:-5px;border:5px solid transparent;border-top-color:rgba(7,14,40,.86);border-bottom:0}
.hs-tag.k-me .hs-tag-in{background:linear-gradient(180deg,#1ec4ff,#0a8ed8);border-color:#aef0ff;font-size:15px;padding:3px 13px 4px}
.hs-tag.k-me .hs-tag-in::after{border-top-color:#0a8ed8}
.hs-tag.k-seeker .hs-tag-in{color:#ff6b7a;border-color:rgba(255,80,100,.55);font-size:14px}
.hs-tag.s-hidden{opacity:.55}
.hs-tag.s-caught .hs-tag-in{background:rgba(74,80,96,.92);color:#c4cad8;border-color:rgba(200,210,230,.3)}
.hs-tag.s-caught .hs-tag-in::after{border-top-color:rgba(74,80,96,.92)}
.hs-tag .gr{width:13px;height:13px;flex:none}
.hs-tag .bang{position:absolute;left:50%;top:-30px;margin-left:-12px;width:24px;height:26px;border-radius:50% 50% 50% 8px;background:linear-gradient(180deg,#ff6572,#e0182c);border:2px solid #fff;color:#fff;font-size:17px;font-weight:900;display:none;align-items:center;justify-content:center;animation:hs-bang .5s cubic-bezier(.3,1.8,.5,1) both,hs-bangloop .7s ease-in-out .5s infinite alternate;box-shadow:0 2px 0 rgba(0,0,0,.4)}
.hs-tag.s-spotted .bang{display:flex}
.hs-tag.s-spotted .hs-tag-in{background:linear-gradient(180deg,#ff5463,#c4112a);border-color:#ffc4ca}
.hs-tag.s-spotted .hs-tag-in::after{border-top-color:#c4112a}
.hs-floats{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3}
.hs-float{position:absolute;left:0;top:0;display:flex;align-items:center;gap:3px;font-size:24u;font-weight:900;white-space:nowrap;will-change:transform,opacity;--s:2u;--ol:#4a2a00;color:#ffe45c}
.hs-float img{height:26u;width:26u;object-fit:contain}
.hs-float.gem{color:#e6a8ff;--ol:#3a0a5a}
.hs-float.xp{color:#9fe8ff;--ol:#06365a}
.hs-float.power{color:#fff;--ol:#2a0a5a}

/* баннеры */
.hs-banner{position:absolute;left:0;right:0;top:0;bottom:0;pointer-events:none;z-index:6}
.hs-bn{position:absolute;left:0;right:0;top:26%;display:flex;justify-content:center;align-items:center;height:0}
.hs-bn-rays{position:absolute;left:50%;top:50%;width:min(150%,1100u);aspect-ratio:1;margin:calc(min(150%,1100u)/-2) 0 0 calc(min(150%,1100u)/-2);border-radius:50%;opacity:0;
  background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.55) 0 7deg,transparent 7deg 20deg);-webkit-mask:radial-gradient(circle,#000 0,transparent 62%);mask:radial-gradient(circle,#000 0,transparent 62%);animation:hs-rays calc(var(--ms,1800)*1ms) linear both;will-change:transform,opacity;max-width:none}
.hs-bn-in{position:relative;max-width:94%;text-align:center;transform-origin:50% 60%;animation:hs-bnin calc(var(--ms,1800)*1ms) both;will-change:transform,opacity}
.hs-bn-txt{font-size:var(--fs,66u);letter-spacing:.015em;line-height:.98;--sk:12u;--dp:5u;--ol:#0a1a52;padding:0 10u}
.hs-bn.shaking .hs-bn-in{animation:hs-bnin calc(var(--ms,1800)*1ms) both,hs-bnshake .08s linear 8 .3s}
.hs-bn.yellow .hs-bn-txt{--g1:#fff8b0;--g2:#ffd23d;--g3:#ff9a1c}
.hs-bn.red .hs-bn-txt{--g1:#ffd0d0;--g2:#ff5a66;--g3:#d4162a;--ol:#4a0614}
.hs-bn.green .hs-bn-txt{--g1:#e6ffd0;--g2:#76f067;--g3:#1fb838;--ol:#08401a}
.hs-bn.orange .hs-bn-txt{--g1:#fff0b8;--g2:#ffa63a;--g3:#f0580e;--ol:#4a1a00}
.hs-bn.blue .hs-bn-txt{--g1:#e0f8ff;--g2:#59d4ff;--g3:#1d86ee;--ol:#0a1a52}
.hs-bn.small .hs-bn-txt{--fs:44u;--sk:9u;--dp:4u}
.hs-p .hs-bn-txt{--fs:50u;--sk:10u}
.hs-p .hs-bn.small .hs-bn-txt{--fs:36u}
.hs-bn.small{top:30%}

/* результат */
.hs-resultwin{background:radial-gradient(ellipse at 50% 45%,rgba(12,48,150,.72),rgba(2,8,38,.92))}
.hs-resultwin.lose{background:radial-gradient(ellipse at 50% 45%,rgba(60,14,70,.7),rgba(8,4,30,.94))}
.hs-r-rays{position:absolute;left:50%;top:38%;width:max(160%,1200u);aspect-ratio:1;margin:calc(max(160%,1200u)/-2) 0 0 calc(max(160%,1200u)/-2);opacity:.5;border-radius:50%;
  background:repeating-conic-gradient(from 0deg,rgba(255,236,150,.5) 0 8deg,transparent 8deg 24deg);-webkit-mask:radial-gradient(circle,#000 0,transparent 55%);mask:radial-gradient(circle,#000 0,transparent 55%);animation:hs-spin 26s linear infinite;pointer-events:none;will-change:transform}
.hs-resultwin.lose .hs-r-rays{opacity:.18;background:repeating-conic-gradient(from 0deg,rgba(255,120,150,.5) 0 8deg,transparent 8deg 24deg)}
.hs-confetti{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.hs-confetti i{position:absolute;top:-6%;left:var(--x);width:var(--w,9px);height:calc(var(--w,9px)*1.6);background:var(--c);border-radius:2px;opacity:0;animation:hs-fall var(--t,3.2s) linear infinite;animation-delay:var(--dl,0s);will-change:transform}
.hs-rpanel{position:absolute;inset:0;margin:auto;width:min(94%,560u);height:max-content;max-height:96%;padding:46u 22u 20u;display:flex;flex-direction:column;align-items:center;gap:12u}
.hs-rtitle{position:absolute;left:50%;top:-30u;transform:translateX(-50%);max-width:112%;display:flex;justify-content:center;pointer-events:none;z-index:2}
.hs-rtitle .hs-big{font-size:44u;--sk:10u;--dp:5u;line-height:.95;padding:0 10u}
.hs-resultwin.lose .hs-rtitle .hs-big{--g1:#ffd0d6;--g2:#ff6b8a;--g3:#d41a4e;--ol:#3a0620}
.hs-rmap{font-size:14u;color:#9fc8ff;font-weight:800;letter-spacing:.03em;margin-top:6u}
.hs-stars{display:flex;gap:6u;align-items:flex-end;justify-content:center;height:70u}
.hs-star{width:56u;height:56u;color:#2a3a78;transform:scale(.4);opacity:.6}
.hs-star:nth-child(2){width:70u;height:70u;margin-bottom:6u}
.hs-star.got{animation:hs-starpop .7s cubic-bezier(.2,1.8,.4,1) both;animation-delay:calc(var(--k,0)*220ms + 450ms);color:#ffd23d;filter:drop-shadow(0 0 10u rgba(255,210,60,.7))}
.hs-star.no{transform:scale(1);opacity:1;color:#18265e}
.hs-rcols{display:grid;grid-template-columns:1fr;gap:10u;width:100%}
.hs-rrows{display:flex;gap:10u;width:100%;justify-content:center}
.hs-rrow{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4u;padding:12u 6u 9u;opacity:0}
.hs-rrow img{height:36u;width:36u;object-fit:contain}
.hs-rrow .xpic{height:36u;min-width:36u;padding:0 10u;border-radius:99u;background:radial-gradient(circle at 40% 30%,#8ee8ff,#1a86ee);border:3u solid #072e72;display:flex;align-items:center;justify-content:center;font-size:15u;font-weight:900;color:#fff;text-shadow:0 2u 0 #072e72}
.hs-rrow b{font-size:28u;font-weight:900;line-height:1;font-variant-numeric:tabular-nums}
.hs-rrow.coin b{color:#ffe45c}
.hs-rrow.gem b{color:#e6a8ff}
.hs-rrow.xp b{color:#9fe8ff}
.hs-resultwin.in .hs-rrow{animation:hs-pop .55s cubic-bezier(.2,1.3,.3,1) both;animation-delay:calc(var(--k,0)*160ms + 700ms)}
.hs-rxp{width:100%;padding:8u 14u 12u;display:flex;flex-direction:column;gap:6u;align-items:center;position:relative}
.hs-rxp b{font-size:17u;font-weight:900;letter-spacing:.03em}
.hs-rxp .hs-bar{height:16u}
.hs-rxp .hs-bar i{transition:transform 1s cubic-bezier(.25,.9,.3,1)}
.hs-rxp b{align-self:flex-start}
.hs-lvlup{position:absolute;right:10u;top:6u;padding:3u 12u 5u;border-radius:99u;background:linear-gradient(180deg,#ff9fd0,#e0268a);border:2.5u solid #fff;font-size:13u;font-weight:900;box-shadow:0 3u 0 #7a0a48,0 0 14u rgba(255,80,170,.7);transform:scale(0) rotate(-8deg);white-space:nowrap}
.hs-lvlup.on{animation:hs-lvlup .7s cubic-bezier(.2,1.8,.4,1) both}
.hs-rstat{display:flex;gap:14u;flex-wrap:wrap;justify-content:center;font-size:14u;color:#bcd6ff;font-weight:800}
.hs-unlocked{padding:3u 12u 4u;border-radius:99u;background:linear-gradient(180deg,#59ee6c,#1ea43a);border:2.5u solid #0a5a1a;font-size:13u;font-weight:900;box-shadow:0 3u 0 #08481a;animation:hs-pulse 1.2s ease-in-out infinite}
.hs-rbtns{display:flex;gap:10u;width:100%;align-items:stretch;margin-top:4u}
.hs-rbtns .hs-btn{height:62u;font-size:21u;flex:1;min-width:0}
.hs-rbtns{flex-wrap:wrap}
.hs-rbtns .hs-btn.main{flex:1 0 100%;height:70u;font-size:30u}
.hs-rbtns .hs-btn.small{flex:.9;font-size:15u;flex-direction:column;gap:2u}
.hs-rbtns .hs-btn.small svg{width:26u;height:26u}

/* ---------- РАЗМЕТКА ПО ЭКРАНУ ---------- */
/* портрет */
.hs-p .hs-logo{top:calc(var(--mp) + env(safe-area-inset-top,0px) + 118u)}
.hs-p .hs-seg button{font-size:14.5u;gap:4u}
.hs-p .hs-seg button svg{display:none}
.hs-p .hs-logo-1{font-size:50u;--sk:11u}
.hs-p .hs-logo-2{font-size:27u}
.hs-p .hs-m-top{flex-direction:column;align-items:stretch;gap:10u}
.hs-p .hs-mapcard{max-width:none}
.hs-p .hs-mapname b,.hs-p .hs-mapname small{max-width:none;flex:1}
.hs-p .hs-m-wallet{justify-content:center;gap:16u}
.hs-p .hs-m-left{left:0;right:0;top:auto;bottom:calc(var(--mp) + env(safe-area-inset-bottom,0px));transform:none;flex-direction:row;justify-content:center;gap:18u}
.hs-p .hs-m-bottom{bottom:calc(var(--mp) + env(safe-area-inset-bottom,0px) + 100u)}
.hs-p .hs-m-bottom{width:min(310u,92%)}
.hs-p .hs-play{font-size:38u}
.hs-p .hs-rpanel{padding-top:50u}
.hs-p .hs-rtitle .hs-big{font-size:36u;--sk:8u}
.hs-p .hs-setwin{padding-top:18u}
/* низкий альбомный (640×360, 568×320) */
.hs-low .hs-logo{top:calc(var(--mp) + env(safe-area-inset-top,0px) - 2u)}
.hs-low .hs-logo-1{font-size:52u;--sk:10u}
.hs-low .hs-logo-2{font-size:27u}
.hs-low .hs-mapcard{height:46u;max-width:31%;gap:6u}
.hs-low .hs-seekic{display:none}
.hs-low .hs-mapnum{width:34u;height:34u;font-size:18u}
.hs-low .hs-mapname b{font-size:15u}
.hs-low .hs-mapname small{display:none}
.hs-low .hs-tool{width:76u;height:76u}
.hs-low .hs-tool.gear{width:56u;height:58u}
.hs-low .hs-m-left{gap:8u;transform:translateY(-38%)}
.hs-low .hs-m-bottom{width:300u}
.hs-low .hs-play{height:78u;font-size:40u}
.hs-low .hs-seg{height:42u}
.hs-low .hs-m-bottom{gap:8u}
.hs-low .hs-lvl{display:none}
.hs-l .hs-rpanel{width:min(96%,760u);padding:34u 16u 12u;display:grid;grid-template-columns:1fr 1fr;grid-template-areas:'map map' 'stars cols' 'stat cols' 'btns btns';gap:6u 14u;align-items:center}
.hs-l .hs-rtitle{top:-22u}
.hs-l .hs-rtitle .hs-big{font-size:34u;--sk:8u}
.hs-l .hs-stars{grid-area:stars;transform:scale(.8);height:56u}
.hs-l .hs-rcols{grid-area:cols}
.hs-l .hs-rstat{grid-area:stat}
.hs-l .hs-rbtns{grid-area:btns;margin-top:0;flex-wrap:nowrap}
.hs-l .hs-rbtns .hs-btn.main{flex:1.8}
.hs-l .hs-rbtns .hs-btn{height:48u;font-size:18u}
.hs-l .hs-rbtns .hs-btn.main{height:54u;font-size:24u}
.hs-l .hs-rrow b{font-size:22u}
.hs-l .hs-rrow{padding:6u 4u}
.hs-l .hs-rrow img{height:28u;width:28u}
.hs-l .hs-rrow .xpic{height:28u;min-width:28u;font-size:12u}
.hs-l .hs-rxp{padding:2u 8u 6u}
.hs-low .hs-bn.small{top:32%}
.hs-low .hs-setwin{padding:12u 16u 14u;gap:6u}
.hs-low .hs-row{min-height:40u;padding:2u 10u}
.hs-low .hs-qseg button{height:32u}
.hs-low .hs-set-btns .hs-btn{height:44u}
.hs-low .hs-set-title{font-size:26u}
/* малые экраны вообще: тексты не мельче читаемого */
.hs-tiny .hs-card .nm{font-size:11px}
.hs-lowfx .hs-fcoins,.hs-lowfx .hs-spk,.hs-lowfx .hs-confetti i:nth-child(3n){display:none}
.hs-lowfx .hs-shine::after{animation:none}


/* ---- магазин, подарок, колесо, предложения: портрет ---- */
.hs-p .hs-shopwin{max-width:640u;max-height:none;padding:10u 10u 12u;gap:6u}
.hs-p .hs-sh-head{gap:8u}
.hs-p .hs-sh-title{font-size:30u;--sk:7u}
.hs-p .hs-tab{flex:1 1 0;padding:0 4u;font-size:max(9.5px,12.5u);height:40u;gap:4u}
.hs-p .hs-tab.on{flex:3.1 1 0}
.hs-p .hs-tab:not(.on) span{display:none}
.hs-p .hs-tab svg{width:20u;height:20u}
.hs-p .hs-sh-wallet{gap:22u;padding:0 10u;order:3;flex:1 0 100%;justify-content:center;margin-left:0}
.hs-p .hs-sh-head,.hs-p .hs-dg-head,.hs-p .hs-wh-head{flex-wrap:wrap;row-gap:6u}
.hs-p .hs-sh-title,.hs-p .hs-dg-title,.hs-p .hs-wh-title{order:1;margin-right:auto}
.hs-p .hs-sh-head .hs-tool.close,.hs-p .hs-dg-head .hs-tool.close,.hs-p .hs-wh-head .hs-tool.close{order:2}
.hs-p .hs-sh-wallet .hs-pill{padding-left:32u;font-size:16u;height:34u}
.hs-p .hs-sh-wallet .hs-pill-ic{height:38u;width:38u}
.hs-p .hs-sh-body{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}
.hs-p .hs-prev{order:-1;display:grid;grid-template-columns:42% minmax(0,1fr);grid-template-rows:auto auto 1fr auto auto auto;column-gap:10u;row-gap:4u;padding:10u;align-items:center;justify-items:center}
.hs-p .hs-stage{grid-column:1;grid-row:1/7;height:100%;min-height:150u;align-self:stretch}
.hs-p .hs-prev-name{grid-column:2;grid-row:1;font-size:20u;width:100%}
.hs-p .hs-prev-kind{grid-column:2;grid-row:2}
.hs-p .hs-prev .hs-hint{grid-column:2;grid-row:3;align-self:end;font-size:max(10px,12.5u)}
.hs-p .hs-prev-price{grid-column:2;grid-row:4;width:100%;min-height:36u;font-size:22u}
.hs-p .hs-prev-price.ad{font-size:max(10px,13.5u)}
.hs-p .hs-prev-ad{grid-column:2;grid-row:5;height:36u;font-size:12.5u}
.hs-p .hs-act{grid-column:2;grid-row:6;height:48u;font-size:20u}
.hs-p .hs-nav{top:auto;bottom:4u;width:30u;height:36u}
.hs-p .hs-nav.l{left:4u}
.hs-p .hs-nav.r{right:4u}
.hs-p .hs-sh-grid{--cols:2;gap:10u}
.hs-p .hs-sh-body.power{grid-template-rows:minmax(0,1fr)}
.hs-p .hs-sh-body.power .hs-sh-grid{--cols:2;grid-auto-rows:auto}
.hs-p .hs-card .nm{font-size:14u}
.hs-p .hs-card .st{font-size:max(10px,14u)}
.hs-p .hs-peek{bottom:calc(10u + env(safe-area-inset-bottom,0px))}
.hs-p .hs-dgwin{padding:10u 10u 12u;gap:8u}
.hs-p .hs-dg-title{font-size:28u;--sk:7u}
.hs-p .hs-dg-body{grid-template-columns:minmax(0,1fr);gap:10u}
.hs-p .hs-dg-day{min-height:84u;padding:6u 4u}
.hs-p .hs-dg-goal{display:grid;grid-template-columns:40% minmax(0,1fr);grid-template-rows:auto 1fr auto auto;column-gap:10u;align-items:center;justify-items:center;padding:8u 10u}
.hs-p .hs-dg-goal .gs{grid-column:1;grid-row:1/5;min-height:84u;height:100%}
.hs-p .hs-dg-goal .gt{grid-column:2;grid-row:1}
.hs-p .hs-dg-goal .gn{grid-column:2;grid-row:2;align-self:end}
.hs-p .hs-dg-goal .gh{grid-column:2;grid-row:3}
.hs-p .hs-dg-goal .ds{grid-column:2;grid-row:4}
.hs-p .hs-dg-goal .big{grid-column:2;grid-row:2/4}
.hs-p .hs-dg-foot{flex-direction:column;gap:8u}
.hs-p .hs-dg-foot .hs-btn{flex:none;height:54u;min-height:54u}
.hs-p .hs-whwin{grid-template-columns:minmax(0,1fr);grid-template-areas:'head' 'disk' 'side';padding:10u 10u 14u;gap:6u}
.hs-p .hs-wh-side .hs-btn{height:56u}
.hs-p .hs-wh-title{font-size:26u;--sk:7u}
.hs-p .hs-m-right{right:calc(var(--mp) + env(safe-area-inset-right,0px));top:46%}
.hs-p .hs-m-right .hs-tool{width:76u;height:76u}
.hs-p .hs-rtop{flex-direction:column}
.hs-p .hs-of-title{font-size:32u}

/* ---- низкий альбомный (640×360, 568×320) ---- */
.hs-low .hs-tab{height:36u;font-size:max(9.5px,13u)}
.hs-low .hs-tab:not(.on) span{display:none}
.hs-low .hs-tab:not(.on){padding:0 6u}
.hs-low .hs-tab.on{flex:2.4 1 0}
.hs-low .hs-shopwin{inset:calc(1.5% + env(safe-area-inset-top,0px)) calc(1.5% + env(safe-area-inset-right,0px)) calc(1.5% + env(safe-area-inset-bottom,0px)) calc(1.5% + env(safe-area-inset-left,0px));max-height:none;padding:7u 10u 9u;gap:5u;max-width:none}
.hs-low .hs-sh-head{min-height:40u}
.hs-low .hs-sh-title{font-size:28u;--sk:7u}
.hs-low .hs-sh-wallet .hs-pill{height:32u;font-size:16u;padding-left:32u}
.hs-low .hs-sh-wallet .hs-pill-ic{height:38u;width:38u}
.hs-low .hs-sh-body{grid-template-columns:minmax(0,1fr) minmax(0,34%);gap:8u}
.hs-low .hs-sh-grid{--cols:3;gap:8u;padding:4u}
.hs-low .hs-card .nm{font-size:max(9.5px,12u);top:5.5%}
.hs-low .hs-card .rr{display:none}
.hs-low .hs-card .im{top:19%;bottom:24%}
.hs-low .hs-card .st{font-size:max(9px,12u)}
.hs-low .hs-card .lk{top:19%;width:20u;height:20u}
.hs-low .hs-prev{padding:6u 8u 8u;gap:3u}
.hs-low .hs-prev-name{font-size:19u}
.hs-low .hs-prev-kind{font-size:max(9px,11u)}
.hs-low .hs-prev-price{min-height:32u;font-size:22u;width:90%}
.hs-low .hs-prev-price.ad{font-size:max(9px,13u);padding:3u 8u 4u}
.hs-low .hs-prev-price.ad .bar{height:9u}
.hs-low .hs-act{height:42u;font-size:19u}
.hs-low .hs-prev-ad{height:32u;font-size:max(10px,11.5u)}
.hs-low .hs-prev .hs-hint{font-size:max(10px,11.5u)}
.hs-low .hs-eye{width:32u;height:32u}
.hs-low .hs-eye svg{width:20u;height:20u}
.hs-low .hs-prev-state{font-size:max(9px,10.5u)}
.hs-low .hs-pcard{padding:6u;gap:3u}
.hs-low .hs-pcard h3{font-size:16u}
.hs-low .hs-pcard p{display:none}
.hs-low .hs-pcard .pr{height:28u;font-size:17u}
.hs-low .hs-pcard .hs-btn{height:34u;font-size:15u}
.hs-low .hs-pcard .hs-btn.ad{height:34u;font-size:max(9.5px,12u)}
.hs-low .hs-dgwin{padding:8u 12u 10u;gap:6u}
.hs-low .hs-dg-head{min-height:40u}
.hs-low .hs-dg-title{font-size:26u;--sk:7u}
.hs-low .hs-dg-day{min-height:96u;padding:5u 4u}
.hs-low .hs-dg-day .rc{font-size:max(10px,17u)}
.hs-low .hs-dg-foot .hs-btn{height:48u}
.hs-low .hs-dg-claim{font-size:24u}
.hs-low .hs-dg-x2{font-size:15u}
.hs-low .hs-dg-next{font-size:max(10px,14u)}
.hs-low .hs-dg-goal .gn{font-size:17u}
.hs-low .hs-whwin{padding:6u 12u 8u;gap:4u 14u}
.hs-low .hs-wh-head{min-height:38u}
.hs-low .hs-wh-title{font-size:24u;--sk:7u}
.hs-low .hs-wh-area{padding-top:10u}
.hs-low .hs-wh-side .hs-btn{height:46u;font-size:17u}
.hs-low .hs-wh-info{padding:6u 8u;font-size:max(9.5px,13u)}
.hs-low .hs-wh-info b{font-size:17u}
.hs-low .hs-wh-ad{font-size:14u}
.hs-low .hs-m-right{gap:8u;transform:translateY(-38%)}
.hs-low .hs-m-right .hs-tool{width:70u;height:70u}
.hs-low .hs-pz-card{padding:38u 16u 12u;gap:8u}
.hs-low .hs-pz-it{width:104u;padding:8u 6u}
.hs-low .hs-pz-it .big{width:60u;height:60u}
.hs-low .hs-pz-card .hs-btn{height:46u;font-size:21u}
.hs-low .hs-of-card{padding:52u 18u 14u;gap:8u}
.hs-low .hs-of-title{font-size:30u}
.hs-low .hs-of-card .hs-btn.go{height:56u;font-size:22u}
.hs-l .hs-rtop{flex-direction:row;justify-content:space-between;grid-area:map}
.hs-l .hs-rtop .hs-rmap{flex:1;text-align:left;padding-left:8u}
.hs-l .hs-x2{height:44u;font-size:16u}
.hs-l .hs-x2 .sub{font-size:max(9px,11u)}
.hs-l .hs-rtop .hs-sh-wallet .hs-pill{height:28u;font-size:14u;padding-left:30u}
.hs-l .hs-rtop .hs-sh-wallet .hs-pill-ic{height:34u;width:34u}

/* ---------- ДЖОЙСТИК Input: рисуем поверх стилей движка ---------- */
html .lory-input-layer .lory-stick{border:0;background:url('assets/ui/joystick-base.webp') center/100% 100% no-repeat;border-radius:0;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))}
html .lory-input-layer .lory-stick.idle{opacity:.62}
html .lory-input-layer .lory-stick.on{opacity:.92}
html .lory-input-layer .lory-stick i{background:url('assets/ui/joystick-knob.webp') center/100% 100% no-repeat;opacity:1;width:41%;height:41%;margin:-20.5% 0 0 -20.5%;border-radius:0;filter:drop-shadow(0 3px 3px rgba(0,0,0,.4))}
html .lory-input-layer .lory-ctx{-webkit-tap-highlight-color:transparent}

/* ---------- Кадры ---------- */
@keyframes hs-pop{0%{opacity:0;transform:translateY(24u) scale(.62)}55%{opacity:1;transform:translateY(-5u) scale(1.07)}78%{transform:translateY(1u) scale(.985)}100%{opacity:1;transform:none}}
@keyframes hs-slideL{0%{opacity:0;transform:translateX(-90u) scale(.8)}60%{opacity:1;transform:translateX(8u) scale(1.04)}100%{opacity:1;transform:none}}
@keyframes hs-slideR{0%{opacity:0;transform:translateX(90u) scale(.8)}60%{opacity:1;transform:translateX(-8u) scale(1.04)}100%{opacity:1;transform:none}}
@keyframes hs-slideT{0%{opacity:0;transform:translateY(-70u) scale(.85)}60%{opacity:1;transform:translateY(6u) scale(1.03)}100%{opacity:1;transform:none}}
@keyframes hs-slideB{0%{opacity:0;transform:translateY(90u) scale(.8)}60%{opacity:1;transform:translateY(-8u) scale(1.04)}100%{opacity:1;transform:none}}
@keyframes hs-cardin{0%{opacity:0;transform:translateY(26u) scale(.7) rotate(-3deg)}60%{opacity:1;transform:translateY(-4u) scale(1.05) rotate(1deg)}100%{opacity:1;transform:none}}
@keyframes hs-play{0%,100%{transform:scale(1)}50%{transform:scale(1.055)}}
@keyframes hs-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes hs-shine{0%,55%{transform:translateX(-140%) skewX(-18deg)}100%{transform:translateX(620%) skewX(-18deg)}}
@keyframes hs-logo{0%,100%{transform:rotate(-4deg) translateY(0)}50%{transform:rotate(-2.5deg) translateY(-5u)}}
@keyframes hs-bump{0%{transform:scale(1)}35%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes hs-shake{10%,90%{transform:translateX(-2u)}20%,80%{transform:translateX(4u)}30%,50%,70%{transform:translateX(-7u)}40%,60%{transform:translateX(7u)}}
@keyframes hs-tshake{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(-2px,1px) rotate(-1.4deg)}50%{transform:translate(2px,-1px) rotate(1.4deg)}75%{transform:translate(-1px,-1px) rotate(-.8deg)}}
@keyframes hs-redpulse{0%,100%{box-shadow:0 4px 0 #4a0414,0 0 10px rgba(255,60,80,.4)}50%{box-shadow:0 4px 0 #4a0414,0 0 26px rgba(255,60,80,.95)}}
@keyframes hs-phasepop{0%{transform:translateX(-50%) scale(.3)}60%{transform:translateX(-50%) scale(1.25)}100%{transform:translateX(-50%) scale(1)}}
@keyframes hs-barshine{0%{transform:translateX(-120%)}100%{transform:translateX(420%)}}
@keyframes hs-coinfloat{0%{opacity:0;transform:translate3d(0,0,0) rotateY(0)}10%{opacity:.9}85%{opacity:.8}100%{opacity:0;transform:translate3d(var(--dx,20u),-115vh,0) rotateY(720deg)}}
@keyframes hs-glowpulse{0%,100%{opacity:.75;transform:translate(-50%,-50%) scale(.95)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}
@keyframes hs-spin{to{transform:rotate(360deg)}}
@keyframes hs-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9u)}}
@keyframes hs-swap{0%{transform:scale(.4) rotate(-8deg);opacity:0}60%{transform:scale(1.12) rotate(2deg);opacity:1}100%{transform:scale(1)}}
@keyframes hs-twinkle{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:1;transform:scale(1) rotate(90deg)}}
@keyframes hs-selring{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes hs-tabin{0%{transform:scale(.88)}100%{transform:scale(1)}}
@keyframes hs-flash{0%{opacity:.95}100%{opacity:0}}
@keyframes hs-ready{0%{opacity:.95;transform:scale(.9)}100%{opacity:0;transform:scale(1.5)}}
@keyframes hs-chipin{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes hs-vig{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes hs-arrowpulse{from{transform:scale(.88)}to{transform:scale(1.2)}}
@keyframes hs-bang{0%{transform:scale(0) translateY(10px)}100%{transform:scale(1) translateY(0)}}
@keyframes hs-bangloop{from{transform:translateY(0)}to{transform:translateY(-4px)}}
@keyframes hs-bnin{0%{opacity:0;transform:scale(.15) rotate(-8deg)}14%{opacity:1;transform:scale(1.35) rotate(3deg)}24%{transform:scale(.92) rotate(-1deg)}32%{transform:scale(1.06)}40%,82%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.2) translateY(-18u)}}
@keyframes hs-bnshake{0%{transform:translateX(0)}25%{transform:translateX(-8u)}50%{transform:translateX(0)}75%{transform:translateX(8u)}100%{transform:translateX(0)}}
@keyframes hs-rays{0%{opacity:0;transform:rotate(0) scale(.3)}14%{opacity:.9}70%{opacity:.7}100%{opacity:0;transform:rotate(60deg) scale(1.1)}}
@keyframes hs-fall{0%{opacity:0;transform:translate3d(0,0,0) rotate(0)}8%{opacity:1}100%{opacity:.9;transform:translate3d(var(--dx,0),112vh,0) rotate(var(--r,720deg))}}
@keyframes hs-starpop{0%{transform:scale(.2) rotate(-40deg);opacity:0}60%{transform:scale(1.35) rotate(8deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes hs-lvlup{0%{transform:scale(0) rotate(-8deg)}60%{transform:scale(1.25) rotate(4deg)}100%{transform:scale(1) rotate(-3deg)}}

@keyframes hs-popin{0%{opacity:0;transform:scale(.6) translateY(-10u)}100%{opacity:1;transform:none}}
@keyframes hs-fadein{from{opacity:0}to{opacity:1}}
@keyframes hs-todayglow{0%,100%{box-shadow:0 4u 0 #b87400,0 0 14u 0 rgba(255,210,61,.5),inset 0 0 20u rgba(120,170,255,.4)}50%{box-shadow:0 4u 0 #b87400,0 0 30u 6u rgba(255,210,61,.95),inset 0 0 20u rgba(120,170,255,.4)}}
@keyframes hs-bulbs{0%{opacity:1}100%{opacity:.35}}
@keyframes hs-wedge{from{filter:brightness(1)}to{filter:brightness(1.55) saturate(1.3)}}
@keyframes hs-flick{0%{transform:rotate(0)}40%{transform:rotate(-24deg)}100%{transform:rotate(0)}}
@keyframes hs-wiggle{0%,60%,100%{transform:rotate(0) scale(1)}70%{transform:rotate(-9deg) scale(1.08)}80%{transform:rotate(8deg) scale(1.08)}90%{transform:rotate(-4deg)}}
@keyframes hs-tpulse{0%,100%{box-shadow:0 0 0 2u #06236f,inset 0 0 14u rgba(0,10,60,.6),inset 0 2u 0 rgba(255,255,255,.28),0 0 0 0 rgba(255,210,61,0)}50%{box-shadow:0 0 0 2u #06236f,inset 0 0 14u rgba(0,10,60,.6),inset 0 2u 0 rgba(255,255,255,.28),0 0 16u 4u rgba(255,210,61,.85)}}

@media (prefers-reduced-motion:reduce){
  .hs-shake,.hs-time.low,.hs-bn.shaking .hs-bn-in,.hs-logo-in,.hs-play,.hs-shine::after,.hs-fcoin,.hs-confetti i,.hs-bn-rays,.hs-tag .bang,.hs-prev-img,.hs-pcard .stg .pi,.hs-prize .rays,.hs-wh-rim::after,.hs-dg-goal .gs .rays,.hs-dg-goal .gs .gi,.hs-pz-it .big,.hs-tool.fr.attn .ic,.hs-tool.fr.attn::before,.hs-dg-day.today,.hs-of-ring.low{animation:none!important}
  .hs-time.low{border-color:#ff6b78}
  .hs-bn-in{animation-duration:calc(var(--ms,1800)*1ms)!important}
}
`;

// ---------------------------------------------------------------------------------------------------------
// Оформление Tutorial (init({ css })): navy-панель с голубой кромкой, жёлтые акценты, шрифт игры
// ---------------------------------------------------------------------------------------------------------

const HSUI_TUT_CSS = `
.lory-tut{--tut-bg:#0a2272;--tut-fg:#ffffff;--tut-accent:#ffd23d;--tut-border:#62cdff;--tut-font:'HsRubik','Rubik',system-ui,sans-serif;--tut-radius:18px;--tut-accent-bg:linear-gradient(180deg,#fff17a,#ffc61f);font-weight:800}
.lory-tut-card{background:linear-gradient(180deg,#1b52d6 0,#0f3597 8%,#0a2577 40%,#071a58 100%);border:3px solid #62cdff;
  box-shadow:0 0 0 3px #0b2c93,0 0 0 5px #07164f,0 0 22px 4px rgba(60,160,255,.5),0 12px 26px rgba(0,0,0,.5),inset 0 0 0 2px rgba(255,255,255,.12)}
.lory-tut-card.lory-tut-ok{border-color:#76f067;box-shadow:0 0 0 3px #0e5a1d,0 0 0 5px #07164f,0 0 22px 4px rgba(90,240,100,.5),0 12px 26px rgba(0,0,0,.5)}
.lory-tut-title{font-weight:900;color:#ffd23d;text-shadow:0 2px 0 #0a1a52,2px 0 0 #0a1a52,-2px 0 0 #0a1a52,0 -2px 0 #0a1a52}
.lory-tut-hint{font-weight:800;text-shadow:0 2px 0 rgba(4,18,70,.8)}
.lory-tut-key{background:linear-gradient(180deg,#fff,#d4e2ff);color:#0a1a52;box-shadow:0 3px 0 #6d86c4;text-shadow:none}
.lory-tut-bar{background:rgba(2,10,50,.7);box-shadow:inset 0 2px 3px rgba(0,0,0,.6)}
.lory-tut-bar i{background:linear-gradient(180deg,#fff08a,#ffc61f)}
.lory-tut-skip{background:linear-gradient(180deg,#fff17a,#ffc61f);color:#3b2400;border:3px solid #6e4300;box-shadow:0 4px 0 #b87400;text-shadow:none;font-weight:900}
.lory-tut-skip:active{transform:translateY(3px);box-shadow:0 1px 0 #b87400}
.lory-tut-skip kbd{background:#3b2400;color:#ffe9a0}
.lory-tut-dots i{background:rgba(255,255,255,.25)}
.lory-tut-dots i.done{background:#ffd23d}
.lory-tut-final{background:linear-gradient(180deg,#1b52d6,#0a2577);border:3px solid #76f067;font-weight:900}
.lory-tut-hl{outline:4px solid #ffd23d;outline-offset:3px;border-radius:26%}
`;

// ---------------------------------------------------------------------------------------------------------
// Помощники
// ---------------------------------------------------------------------------------------------------------

/** «18u» -> calc(var(--u)*18) */
function hsuiCss(src) {
    return src.replace(/(^|[^\w.#-])(-?(?:\d+\.?\d*|\.\d+))u(?![\w-])/g, (m, a, n) => a + 'calc(var(--u)*' + n + ')');
}

/** @param {string} tag @param {string} [cls] @param {Element} [parent] @param {string} [html] @returns {HTMLElement} */
function hsuiEl(tag, cls, parent, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
}

/** @param {string} cls @param {Element} [parent] @param {string} [html] @returns {HTMLButtonElement} */
function hsuiBtn(cls, parent, html) {
    const b = /** @type {HTMLButtonElement} */ (hsuiEl('button', cls, parent, html));
    b.type = 'button';
    return b;
}

/** @param {string} src @param {string} [cls] @param {Element} [parent] @returns {HTMLImageElement} */
function hsuiImg(src, cls, parent) {
    const img = /** @type {HTMLImageElement} */ (hsuiEl('img', cls, parent));
    img.alt = '';
    img.draggable = false;
    img.src = src;
    return img;
}

/** Иконка товара: картинка; нет файла — силуэт цвета редкости, а не битая картинка. */
function hsuiIcon(src, parent, color, tab) {
    const box = hsuiEl('div', 'hs-ic', parent);
    if (color) box.style.setProperty('--rc', color);
    const glyph = () => (tab === 'skin' || tab === 'seeker' || !tab ? HSUI_ICON.silhouette : (HSUI_TABIC[tab] || HSUI_ICON.silhouette));
    if (!src) { box.classList.add('miss'); box.innerHTML = glyph(); return box; }
    const img = hsuiImg(src, '', box);
    img.onerror = () => { img.remove(); box.classList.add('miss'); box.innerHTML = glyph(); };
    return box;
}

/** Крупный заголовок с контуром и градиентом. */
function hsuiBig(text, cls, parent) {
    const el = hsuiEl('span', 'hs-big' + (cls ? ' ' + cls : ''), parent);
    el.dataset.text = text;
    hsuiEl('span', 'tx', el).textContent = text;
    return el;
}

function hsuiGame() { return typeof Game !== 'undefined' ? Game : null; }

/** Значок вкладки магазина по её id (запасной значок предмета без файла иконки — тот же). */
const HSUI_TABIC = {
    skin: HSUI_ICON.shirt, seeker: HSUI_ICON.person, hat: HSUI_ICON.hat, trail: HSUI_ICON.trail,
    aura: HSUI_ICON.aura, emote: HSUI_ICON.trophy, power: HSUI_ICON.bolt,
};

/** Сектор круга: путь «клина» от угла a0 до a1 (градусы по часовой от верха), радиус r, центр в (0,0). */
function hsuiWedge(r, a0, a1) {
    const p = (a) => { const t = a * Math.PI / 180; return (r * Math.sin(t)).toFixed(2) + ' ' + (-r * Math.cos(t)).toFixed(2); };
    return 'M0 0L' + p(a0) + 'A' + r + ' ' + r + ' 0 0 1 ' + p(a1) + 'Z';
}

/** Значок колеса для кнопки меню: 8 цветных секторов, ободок, стрелка. */
function hsuiWheelIcon() {
    const cols = ['#ff5d6c', '#ffb02e', '#3fc7ff', '#6ee86a', '#b66bff', '#ff8ad0', '#ffd23d', '#4f8bff'];
    let s = '<svg viewBox="-26 -26 52 52"><circle r="24" fill="#6e4300"/><circle r="22.4" fill="#ffd23d"/><g>';
    for (let i = 0; i < 8; i++) s += '<path d="' + hsuiWedge(19.4, (i - 0.5) * 45, (i + 0.5) * 45) + '" fill="' + cols[i] + '" stroke="#fff" stroke-width=".7"/>';
    s += '</g><circle r="4.6" fill="#ffd23d" stroke="#6e4300" stroke-width="1.4"/><circle r="1.7" fill="#fff"/>';
    s += '<path d="M0-21.6l-3.6-5.2h7.2z" fill="#ff3347" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    return s;
}

// ---------------------------------------------------------------------------------------------------------
// Магазин, реклама: доступ к модулям движка и Game. Любой из них может быть ещё не готов — код не падает.
// ---------------------------------------------------------------------------------------------------------

/** Shop, если он подключён (init с каталогом), иначе null. */
function hsuiShop() {
    try { return typeof Shop !== 'undefined' && Shop.items().length ? Shop : null; } catch (e) { return null; }
}
/** Game.ads или null. */
function hsuiAds() {
    const G = /** @type {any} */ (hsuiGame());
    return G && G.ads ? G.ads : null;
}
/** Есть ли что показывать: Game.ads готов и площадка умеет rewarded (в Telegram и т. п. кнопки «за рекламу» прячутся). */
function hsuiAdsOn() {
    if (!hsuiAds()) return false;
    try { if (typeof Platform !== 'undefined' && typeof Platform.rewardedSupported === 'function' && !Platform.rewardedSupported()) return false; } catch (e) { /* площадка не ответила — не прячем */ }
    return true;
}
/** «Через N с» во время общей паузы между rewarded, иначе ''. */
function hsuiAdWait() {
    const a = hsuiAds();
    if (!a || typeof a.label !== 'function') return '';
    try { return String(a.label() || ''); } catch (e) { return ''; }
}
/** Можно ли смотреть рекламу прямо сейчас (нет паузы и ничего не идёт). */
function hsuiAdReady() {
    const a = hsuiAds();
    if (!a) return false;
    try { return typeof a.ready === 'function' ? !!a.ready() : true; } catch (e) { return false; }
}
/** Сколько даёт «+» у кошелька. Game.ads.amount(kind) — если есть; иначе формула Game.ads (120 + 20 за уровень монет, 8 кристаллов). */
function hsuiAdAmount(kind) {
    const a = /** @type {any} */ (hsuiAds());
    try { if (a && typeof a.amount === 'function') { const v = Number(a.amount(kind)); if (v > 0) return Math.floor(v); } } catch (e) { /* ниже запасное */ }
    const G = /** @type {any} */ (hsuiGame());
    const lvl = G && G.save ? G.save.level | 0 : 1;
    return kind === 'gems' ? 8 : 120 + lvl * 20;
}
/** Монеты игрока: Shop.coins (единственный источник), пока Shop не готов — копия в Game.save. */
function hsuiCoins() {
    const S = hsuiShop();
    if (S) return S.coins | 0;
    const G = /** @type {any} */ (hsuiGame());
    return G && G.save ? G.save.coins | 0 : 0;
}
function hsuiGems() {
    const G = /** @type {any} */ (hsuiGame());
    return G && G.save ? G.save.gems | 0 : 0;
}

function hsuiSfx(name) {
    try { if (typeof GameFX !== 'undefined' && GameFX && typeof GameFX.sfx === 'function') GameFX.sfx(name); } catch (e) { /* звук не обязателен */ }
}

/** 1250 -> «1 250» (неразрывный пробел). */
function hsuiFmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
function hsuiPad2(n) { return (n < 10 ? '0' : '') + n; }
/** Таймер: вверх до целой секунды, m:ss. */
function hsuiTimer(sec) { const s = Math.max(0, Math.ceil(sec)); return Math.floor(s / 60) + ':' + hsuiPad2(s % 60); }
function hsuiClock(sec) { const s = Math.max(0, Math.round(sec)); return Math.floor(s / 60) + ':' + hsuiPad2(s % 60); }
function hsuiClamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function hsuiRgba(hex, a) {
    const h = String(hex).replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16) || 0;
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}

function hsuiRar(id) { return HS_RARITY[id] || HS_RARITY.common; }
function hsuiRarName(id) { const r = hsuiRar(id); return Lang.code === 'en' ? r.en : r.ru; }
/** Имя из строки или { ru, en }. */
function hsuiName(v) { return v && typeof v === 'object' ? hsText(v) : String(v == null ? '' : v); }

function hsuiReduced() { return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; }

/** Счётчик валюты: плашка с иконкой, числа считаются «вверх/вниз» и подпрыгивают при изменении. */
class HsCounter {
    /** @param {Element} parent @param {string} icon @param {string} [cls] @param {boolean} [plus] */
    constructor(parent, icon, cls, plus) {
        this.el = hsuiEl('div', 'hs-pill' + (cls ? ' ' + cls : ''), parent);
        this.icon = hsuiImg(icon, 'hs-pill-ic', this.el);
        this.num = hsuiEl('span', 'hs-pill-n', this.el, '0');
        /** Кнопка «+» (реклама за монеты / кристаллы). */
        this.plus = null;
        if (plus) {
            this.el.classList.add('hasplus');
            this.plus = hsuiBtn('hs-plus', this.el);
            this.plus.textContent = '+';
            this.plus.hidden = true;
        }
        this.val = 0; this.shown = 0; this.from = 0; this.t0 = 0; this.dur = 0; this.raf = 0; this.fallback = 0;
    }
    /** @param {number} v @param {boolean} [anim] */
    set(v, anim) {
        v = Math.max(0, Math.round(Number(v) || 0));
        if (v === this.val) return;
        this.val = v;
        if (!anim) { this._stop(); this.shown = v; this.num.textContent = hsuiFmt(v); return; }
        this.bump();
        this.from = this.shown;
        this.t0 = performance.now();
        this.dur = Math.min(900, 280 + Math.abs(v - this.from) * 5);
        clearTimeout(this.fallback);
        this.fallback = window.setTimeout(() => { this._stop(); this.shown = this.val; this.num.textContent = hsuiFmt(this.val); }, this.dur + 150);
        if (!this.raf) this.raf = requestAnimationFrame(() => this._tick());
    }
    _stop() { if (this.raf) cancelAnimationFrame(this.raf); this.raf = 0; clearTimeout(this.fallback); }
    _tick() {
        this.raf = 0;
        const p = hsuiClamp((performance.now() - this.t0) / this.dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
        this.shown = Math.round(this.from + (this.val - this.from) * e);
        this.num.textContent = hsuiFmt(this.shown);
        if (p < 1) this.raf = requestAnimationFrame(() => this._tick());
        else { this.shown = this.val; clearTimeout(this.fallback); }
    }
    bump() {
        this.el.classList.remove('bump');
        void this.el.offsetWidth;
        this.el.classList.add('bump');
    }
}

const HSUI_BANNERS = {
    hide: { k: 'bn.hide', c: 'yellow', ms: 2300 },
    seek: { k: 'bn.seek', c: 'red', ms: 2000, shake: true },
    hunt: { k: 'bn.hunt', c: 'green', ms: 1900 },
    spotted: { k: 'bn.spotted', c: 'red', ms: 1800, shake: true },
    caught: { k: 'bn.caught', c: 'red', ms: 2100, shake: true },
    saved: { k: 'bn.saved', c: 'blue', ms: 1800 },
    last10: { k: 'bn.last10', c: 'orange', ms: 1600, shake: true },
    botCaught: { k: 'bn.botCaught', c: 'blue', ms: 1700, small: true, suf: 'bn.sufCaught' },
    found: { k: 'bn.found', c: 'green', ms: 1700, small: true, suf: 'bn.sufFound' },
};

// ---------------------------------------------------------------------------------------------------------
// GameUI
// ---------------------------------------------------------------------------------------------------------

/** @satisfies {Record<string, any>} */
const GameUI = {
    /** Строка для Tutorial.init({ css }). */
    tutorialCss: HSUI_TUT_CSS,
    app: null,
    root: null,
    W: 960, H: 540, u: 1, portrait: false,
    /** 'hider' | 'seeker' — выбор в меню. */
    role: 'hider',
    _inited: false,
    _menuWanted: false,
    _hudOn: false,
    _open: '',          // 'shop' | 'settings' | ''
    _from: 'menu',      // куда вернуться из окна: 'menu' | 'result'
    _timers: new WeakMap(),
    _hb: /** @type {Record<string, any>} */ ({}),
    _c: /** @type {Record<string, any>} */ ({}),
    _tags: new Map(),
    _flo: /** @type {HTMLElement[]} */ ([]),
    _counters: /** @type {HsCounter[]} */ ([]),
    _hudMode: '',
    _resultOn: false,
    _rt: /** @type {number[]} */ ([]),

    // =====================================================================================
    // Запуск
    // =====================================================================================

    init(app) {
        if (this._inited || typeof document === 'undefined') return;
        this._inited = true;
        this.app = app;
        const st = document.createElement('style');
        st.id = 'hs-ui-css';
        st.textContent = hsuiCss(HSUI_CSS);
        document.head.appendChild(st);
        try { const stored = Store.get(GAME_ID + '.role'); if (stored === 'seeker' || stored === 'hider') this.role = stored; } catch (e) { /* без хранилища */ }

        const root = hsuiEl('div');
        root.id = 'hs-ui';
        document.body.appendChild(root);
        this.root = root;
        this.vig = hsuiEl('div', 'hs-vig', root);
        hsuiEl('i', '', this.vig);
        this.hud_el = hsuiEl('div', 'hs-hud', root);
        this.hud_el.hidden = true;
        this.tagsEl = hsuiEl('div', 'hs-tags', root);
        this.arrow = hsuiEl('div', 'hs-arrow', root, HSUI_ICON.arrow);
        this.floats = hsuiEl('div', 'hs-floats', root);
        this.banner_el = hsuiEl('div', 'hs-banner', root);
        this.fxl = hsuiEl('div', 'hs-fxl', root);
        if (typeof HudLayout !== 'undefined' && !HudLayout._inited) HudLayout.init({ app });
        this._buildHud();
        this._buildMenu();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 250));
        window.addEventListener('lory-viewcap', () => this.resize());
        window.addEventListener('lory-input-device', () => this._syncKeys());
        this._syncKeys();
        window.addEventListener('hs-save', () => this.refresh());
        if (typeof HudLayout !== 'undefined') HudLayout.onChange(() => this._fitAll());
        if (typeof Quality !== 'undefined' && Quality.onChange) Quality.onChange(() => this._fxLevel());
        this._fxLevel();
        this._startTicker();
    },

    /** Единица экрана и классы раскладки. */
    resize() {
        if (!this.root) return;
        const r = this.root.getBoundingClientRect();
        const W = Math.max(200, r.width || window.innerWidth), H = Math.max(200, r.height || window.innerHeight);
        const portrait = H > W * 1.02;
        const u = portrait ? hsuiClamp(Math.min(W / 420, H / 800), 0.6, 1.4) : hsuiClamp(Math.min(W / 960, H / 540), 0.5, 1.4);
        this.W = W; this.H = H; this.u = u; this.portrait = portrait;
        this.root.style.setProperty('--u', u.toFixed(3) + 'px');
        this.root.style.setProperty('--hh', H.toFixed(0) + 'px');
        const cl = this.root.classList;
        cl.toggle('hs-p', portrait);
        cl.toggle('hs-l', !portrait);
        cl.toggle('hs-low', !portrait && H < 430);
        cl.toggle('hs-tiny', Math.min(W, H) < 340);
        this._fitAll();
        if (this._open === 'wheel') this._wheelSize();
    },

    /** Подсказки клавиш на кнопках HUD: пока устройство не сенсорное (мышь-как-палец тоже с клавиатурой). */
    _syncKeys() {
        if (!this.root) return;
        const dev = typeof Input !== 'undefined' ? Input.device : 'keyboard';
        this.root.classList.toggle('hs-kb', dev !== 'touch');
    },

    _fxLevel() {
        if (!this.root) return;
        const lvl = typeof Quality !== 'undefined' ? Quality.level : 2;
        this.root.classList.toggle('hs-lowfx', lvl === 0 || hsuiReduced());
    },

    /** @param {HTMLElement} el @param {boolean} on */
    _show(el, on) {
        const prev = this._timers.get(el);
        if (prev) clearTimeout(prev);
        if (on) {
            el.classList.remove('out', 'in');
            el.classList.add('on');
            void el.offsetWidth;
            el.classList.add('in');
        } else {
            if (!el.classList.contains('on')) return;
            el.classList.add('out');
            this._timers.set(el, window.setTimeout(() => { el.classList.remove('on', 'out', 'in'); }, 240));
        }
    },

    /** Кнопка: звук клика и обработчик. */
    _bind(el, fn, sound) {
        el.addEventListener('click', e => {
            e.stopPropagation();
            if (sound !== false) hsuiSfx('click');
            fn(e);
        });
    },

    /** kind: 'coins' | 'gems' — у счётчика появляется «+» (реклама за валюту). */
    _counter(parent, icon, cls, kind) {
        const c = new HsCounter(parent, icon, cls, !!kind);
        this._counters.push(c);
        if (kind && c.plus) this._bind(c.plus, () => this._adPop(kind, c));
        return c;
    },

    // =====================================================================================
    // HUD
    // =====================================================================================

    _buildHud() {
        const hud = this.hud_el;
        const blk = (id, cls, dock, w, h, extra) => {
            const el = hsuiEl('div', 'hs-hb ' + cls, hud);
            const fit = hsuiEl('div', 'hs-fit', el);
            fit.style.width = w + 'px'; fit.style.height = h + 'px';
            this._hb[id] = { el, fit, dw: w, dh: h };
            if (typeof HudLayout !== 'undefined') HudLayout.block(id, Object.assign({ dock, w, h, el }, extra || {}));
            return fit;
        };
        // карта
        const fMap = blk('hs-map', 'map', 'tl', 250, 44);
        const plate = hsuiEl('div', 'hs-plate', fMap);
        this.hMapNum = hsuiEl('span', 'num', plate, '01');
        this.hMapName = hsuiEl('span', 'nm hs-o', plate);
        this.hMapName.style.setProperty('--s', '1.5px');
        this.hMapPlate = plate;
        // игроки / поймано
        const fPl = blk('hs-players', 'players', 'tl', 128, 40, { order: 1 });
        this.hPlayers = this._counter(fPl, 'assets/ui/icon-players.webp', '');
        this.hPlayers.num.textContent = '4/4';
        // таймер и фаза
        const fT = blk('hs-timer', 'timer', 'tc', 176, 80);
        const time = hsuiEl('div', 'hs-time', fT);
        time.dataset.hs = 'timer';
        hsuiImg('assets/ui/icon-timer.webp', '', time);
        this.hTimeB = hsuiEl('b', 'hs-o', time, '0:00');
        this.hTimeB.style.setProperty('--s', '2px');
        this.hTime = time;
        this.hPhase = hsuiEl('div', 'hs-phase', fT, '');
        // кошелёк
        const fW = blk('hs-wallet', 'wallet', 'tr', 262, 42);
        const wal = hsuiEl('div', 'hs-wal', fW);
        this.hCoin = this._counter(wal, 'assets/ui/icon-coin.webp', '');
        this.hCoin.el.dataset.hs = 'coins';
        this.hGem = this._counter(wal, 'assets/ui/icon-gem.webp', '');
        // уровень
        const fL = blk('hs-level', 'level', 'bc', 250, 50);
        const lv = hsuiEl('div', 'hs-hlvl', fL);
        this.hLvl = hsuiEl('b', 'hs-o', lv, '');
        this.hLvl.style.setProperty('--s', '1.5px');
        const bar = hsuiEl('div', 'hs-bar', lv);
        this.hBar = hsuiEl('i', '', bar);
        // состояние: в укрытии, щит
        const fS = blk('hs-status', 'status', 'bc', 170, 38, { order: 1, visible: () => this._hudOn && !!this._c.chips });
        this.hChips = hsuiEl('div', 'hs-chips', fS);
        this.chHide = hsuiEl('div', 'hs-chip', this.hChips, HSUI_ICON.eyeOff + '<span class="hs-o"></span>');
        this.chHide.lastElementChild.textContent = Lang.t('hud.hidden');
        this.chShield = hsuiEl('div', 'hs-chip sh', this.hChips, HSUI_ICON.shield + '<span class="hs-o"></span>');
        this.chShield.lastElementChild.textContent = Lang.t('hud.shield');
        this.chHide.hidden = true; this.chShield.hidden = true;
        // рывок и обманка
        const fA = blk('hs-abil', 'abil', 'br', 198, 102);
        this.abil = {};
        for (const k of ['dash', 'decoy']) {
            const b = hsuiBtn('hs-ab ' + k, fA);
            b.dataset.hs = k;
            b.setAttribute('aria-label', Lang.t('hud.' + k));
            const cd = hsuiEl('i', 'cd', b);
            hsuiEl('i', 'rg', b);
            const lb = hsuiEl('span', 'lb', b);
            lb.textContent = Lang.t('hud.' + k);
            const nn = hsuiEl('span', 'nn hs-o', b);
            nn.style.setProperty('--s', '1.5px');
            const key = hsuiEl('span', 'key', b);
            key.textContent = k === 'dash' ? Lang.t('hud.keySpace') : 'E';
            this.abil[k] = { b, cd, lb, nn, key, count: -1, cdPct: -1 };
            b.addEventListener('pointerdown', e => {
                e.preventDefault(); e.stopPropagation();
                const G = hsuiGame();
                if (!G) return;
                if (k === 'dash' && G.useDash) G.useDash();
                // с 0 обманок кнопка — «+1 за рекламу» (Game.ads.extraDecoy), не Game.useDecoy
                if (k === 'decoy') { if (this.abil.decoy.ad) this._decoyAd(); else if (G.useDecoy) G.useDecoy(); }
            });
            b.addEventListener('click', e => e.stopPropagation());
        }
    },

    /** Масштаб внутренних слоёв блока = размер, который дал HudLayout, к проектному. */
    _fitAll() {
        if (typeof HudLayout === 'undefined') return;
        const mode = HudLayout.mode;
        if (mode && mode !== this._hudMode) {
            this._hudMode = mode;
            const mp = this._hb['hs-map'];
            if (mp) {
                const w = mode === 'tall' ? 296 : 250;
                mp.dw = w; mp.fit.style.width = w + 'px';
                HudLayout.block('hs-map', { w });
            }
        }
        for (const id of Object.keys(this._hb)) {
            const h = this._hb[id], r = HudLayout.rect(id);
            if (!r) continue;
            const f = Math.min(r.w / h.dw, r.h / h.dh);
            if (!(f > 0) || Math.abs(f - (h.f || 0)) < 0.002) continue;
            h.f = f;
            h.fit.style.setProperty('--fit', f.toFixed(4));
        }
    },

    hud(show) {
        if (!this.root) return;
        show = !!show;
        if (show === this._hudOn) { if (show) this._hudReset(); return; }
        this._hudOn = show;
        this.hud_el.hidden = !show;
        if (show) {
            this._menuHide(true);
            this._resultHide(true);
            this._hudReset();
        } else {
            this.vig.style.opacity = '0';
            this.arrow.classList.remove('on');
            this._offerEnd(this._offerRec, 'silent');
            this._clearBanners();
            this._clearTags();
        }
    },

    _hudReset() {
        this._c = { first: true };
        this._hudMode = '';
        for (const k of Object.keys(this.abil)) { this.abil[k].count = -1; this.abil[k].cdPct = -1; }
        if (typeof HudLayout !== 'undefined') {
            HudLayout.block('input-action', { visible: false });   // контекстная кнопка Input не нужна: свои кнопки HUD
            HudLayout.block('input-stick', { w: 200, h: 200 });    // стик крупнее: он виден и на ПК (мышь как палец)
            HudLayout.refresh();
        }
        this._fitAll();
    },

    /** Каждый кадр из Game.update. */
    hudUpdate(s) {
        if (!this._hudOn || !s) return;
        const c = this._c;
        const first = !!c.first;
        const seeker = s.role === 'seeker';
        if (c.seeker !== seeker) {
            c.seeker = seeker;
            this._hb['hs-players'].el.classList.toggle('seeker', seeker);
            this.abil.decoy.b.hidden = seeker;
            this.abil.dash.lb.textContent = Lang.t(seeker ? 'hud.lunge' : 'hud.dash');
            const w = seeker ? 98 : 198;
            const ab = this._hb['hs-abil'];
            ab.dw = w; ab.fit.style.width = w + 'px';
            if (typeof HudLayout !== 'undefined') HudLayout.block('hs-abil', { w });
            c.mapKey = null; c.plKey = null; c.phKey = null;
        }
        // карта и уровень
        const mapKey = s.mapIndex + '|' + s.mapName;
        if (c.mapKey !== mapKey) {
            c.mapKey = mapKey;
            const mi = HS_MAPS[s.mapIndex] || HS_MAPS[0];
            this.hMapNum.textContent = hsuiPad2((s.mapIndex || 0) + 1);
            this.hMapName.textContent = hsuiName(s.mapName).toUpperCase();
            this.hMapPlate.style.setProperty('--mc', mi.color);
        }
        const lvKey = s.level + '|' + Math.round((s.xpFrac || 0) * 100);
        if (c.lvKey !== lvKey) {
            c.lvKey = lvKey;
            this.hLvl.textContent = Lang.t('ui.level', { n: s.level });
            this.hBar.style.setProperty('--f', hsuiClamp(s.xpFrac || 0, 0, 1).toFixed(3));
        }
        // валюты
        this.hCoin.set(s.coins, !first);
        this.hGem.set(s.gems, !first);
        // игроки
        const alive = Math.max(0, s.alive | 0), total = Math.max(1, s.total | 0);
        const caught = typeof s.caught === 'number' ? s.caught : total - alive;
        const plKey = seeker ? 'c' + caught + '/' + total : alive + '/' + total;
        if (c.plKey !== plKey) {
            c.plKey = plKey;
            this.hPlayers.num.textContent = seeker ? Lang.t('hud.caught', { a: caught, b: total }) : alive + '/' + total;
            this._hb['hs-players'].el.classList.toggle('seeker', seeker);
            if (!first) this.hPlayers.bump();
        }
        // таймер и фаза
        const tut = !!s.tutorial;
        const t = Math.max(0, Number(s.time) || 0), sec = Math.ceil(t);
        if (c.sec !== sec) { c.sec = sec; this.hTimeB.textContent = hsuiTimer(t); }
        const low = !tut && s.phase === 'seek' && sec <= 10 && sec > 0;
        if (c.low !== low) { c.low = low; this.hTime.classList.toggle('low', low); }
        const phKey = (tut ? 'tut' : s.phase) + (seeker ? 'S' : 'H');
        if (c.phKey !== phKey) {
            c.phKey = phKey;
            this.hPhase.classList.toggle('seek', s.phase === 'seek' && !tut);
            this.hPhase.textContent = tut ? Lang.t('hud.tutorial') : Lang.t(s.phase === 'seek' ? (seeker ? 'hud.hunt' : 'hud.seek') : (seeker ? 'hud.wait' : 'hud.hide'));
            if (!first) { this.hPhase.classList.remove('pop'); void this.hPhase.offsetWidth; this.hPhase.classList.add('pop'); }
        }
        // кнопки
        this._abil('dash', s.dash, first);
        if (!seeker) this._abil('decoy', s.decoy, first, !!s.decoyAd, s.adLabel);
        // состояния
        const hid = !!s.hidden, sh = !!s.shield;
        if (c.hid !== hid || c.sh !== sh) {
            c.hid = hid; c.sh = sh;
            this.chHide.hidden = !hid; this.chShield.hidden = !sh;
            c.chips = hid || sh;
            if (typeof HudLayout !== 'undefined') HudLayout.schedule();
        }
        // опасность
        const d = hsuiClamp(Number(s.danger) || 0, 0, 1);
        const dq = Math.round(d * 20);
        if (c.dq !== dq) {
            c.dq = dq;
            this.vig.style.opacity = dq === 0 ? '0' : (Math.min(1, 0.2 + d * 0.8)).toFixed(2);
            const vp = d > 0.85 ? 0.42 : d > 0.55 ? 0.65 : 1.1;
            if (c.vp !== vp) { c.vp = vp; this.vig.style.setProperty('--vp', vp + 's'); }
        }
        // стрелка к искателю
        this._arrow(s.seekerDir);
        c.first = false;
    },

    _abil(k, st, first, ad, wait) {
        const a = this.abil[k];
        if (!a) return;
        st = st || { count: 0, cd: 0 };
        const cdPct = Math.round(hsuiClamp(st.cd || 0, 0, 1) * 100);
        if (a.cdPct !== cdPct) {
            if (a.cdPct > 0 && cdPct === 0 && !first) { a.b.classList.remove('ready'); void a.b.offsetWidth; a.b.classList.add('ready'); }
            a.cdPct = cdPct;
            a.cd.style.setProperty('--cd', cdPct + '%');
        }
        const n = st.count | 0;
        if (a.count !== n) {
            const was = a.count;
            a.count = n;
            a.nn.textContent = String(n);
            a.nn.hidden = k === 'dash' && n <= 0;
            a.nnAd = false;
            a.adKey = '';
            if (was >= 0 && !first) { a.nn.classList.remove('pop'); void a.nn.offsetWidth; a.nn.classList.add('pop'); }
        }
        if (k === 'decoy') {
            // обманок нет и реклама доступна: на кнопке значок ▶ и «+1 за рекламу» (или «Через N с» во время паузы)
            const adOn = !!ad && n <= 0, w = adOn ? String(wait || '') : '';
            const key = (adOn ? 1 : 0) + '|' + w + '|' + n;
            if (a.adKey !== key) {
                a.adKey = key;
                a.ad = adOn;
                a.b.classList.toggle('ad', adOn);
                a.b.classList.toggle('empty', n <= 0 && (!adOn || !!w));
                a.lb.textContent = adOn ? (w ? w.toUpperCase() : Lang.t('hud.decoyAd')) : Lang.t('hud.decoy');
                if (adOn) { a.nn.innerHTML = HSUI_ICON.playG; a.nnAd = true; }
                else if (a.nnAd) { a.nn.textContent = String(n); a.nnAd = false; }
                if (!adOn) a.b.classList.toggle('empty', n <= 0);
            }
        }
    },

    /** Стрелка у края экрана в сторону искателя за кадром; ang — радианы на экране (0 — вправо, + вниз). */
    _arrow(ang) {
        const el = this.arrow;
        if (ang == null || !isFinite(ang)) { if (this._c.arr) { this._c.arr = false; el.classList.remove('on'); } return; }
        const W = this.W, H = this.H, u = this.u;
        const mx = 46 * u, mt = 96 * u, mb = 120 * u;
        const cx = W / 2, cy = H / 2, ca = Math.cos(ang), sa = Math.sin(ang);
        const tx = Math.abs(ca) > 1e-4 ? (ca > 0 ? (W - mx - cx) : (mx - cx)) / ca : 1e9;
        const ty = Math.abs(sa) > 1e-4 ? (sa > 0 ? (H - mb - cy) : (mt - cy)) / sa : 1e9;
        const t = Math.max(0, Math.min(tx, ty));
        el.style.transform = 'translate(' + (cx + ca * t).toFixed(1) + 'px,' + (cy + sa * t).toFixed(1) + 'px) rotate(' + ang.toFixed(3) + 'rad)';
        if (!this._c.arr) { this._c.arr = true; el.classList.add('on'); }
    },

    // =====================================================================================
    // Баннеры, ники, всплывающий текст
    // =====================================================================================

    banner(kind, text) {
        if (!this.root) return;
        const cfg = HSUI_BANNERS[kind] || HSUI_BANNERS.hide;
        const G = hsuiGame();
        let msg = '';
        if (cfg.suf && text) msg = hsuiName(text) + ' ' + Lang.t(cfg.suf);
        else if (text) msg = hsuiName(text);
        else if (kind === 'hide' && G && G.role === 'seeker') msg = Lang.t('bn.hideSeeker');
        else msg = Lang.t(cfg.k);
        if (!cfg.small) this._clearBanners(true);
        const bn = hsuiEl('div', 'hs-bn ' + cfg.c + (cfg.small ? ' small' : '') + (cfg.shake && !hsuiReduced() ? ' shaking' : ''), this.banner_el);
        bn.style.setProperty('--ms', String(cfg.ms));
        if (!cfg.small) hsuiEl('div', 'hs-bn-rays', bn);
        const inn = hsuiEl('div', 'hs-bn-in', bn);
        hsuiBig(msg.toUpperCase(), 'hs-bn-txt', inn);
        window.setTimeout(() => bn.remove(), cfg.ms + 60);
    },

    _clearBanners(onlyBig) {
        if (!this.banner_el) return;
        for (const b of Array.from(this.banner_el.children)) if (!onlyBig || !b.classList.contains('small')) b.remove();
    },

    /** Ники над головами: каждый кадр. */
    tags(list) {
        if (!this.root) return;
        if (!this._hudOn || !list || !list.length) { if (this._tags.size) this._clearTags(); return; }
        const seen = new Set();
        for (const t of list) {
            seen.add(t.id);
            let rec = this._tags.get(t.id);
            if (!rec) {
                const el = hsuiEl('div', 'hs-tag', this.tagsEl);
                const inn = hsuiEl('div', 'hs-tag-in', el);
                const bang = hsuiEl('span', 'bang', inn, '!');
                const gr = hsuiEl('span', 'gr', inn, HSUI_ICON.grid);
                gr.hidden = true;
                const tx = hsuiEl('span', 'tx', inn);
                rec = { el, inn, bang, gr, tx, text: null, kind: '', state: '', px: -1e9, py: -1e9 };
                this._tags.set(t.id, rec);
            }
            if (rec.text !== t.text) { rec.text = t.text; rec.tx.textContent = t.text || ''; }
            const kind = t.kind || 'bot', state = t.state || 'normal';
            if (rec.kind !== kind || rec.state !== state) {
                rec.kind = kind; rec.state = state;
                rec.el.className = 'hs-tag k-' + kind + ' s-' + state;
                rec.gr.hidden = state !== 'caught';
            }
            if (Math.abs(rec.px - t.x) > 0.3 || Math.abs(rec.py - t.y) > 0.3) {
                rec.px = t.x; rec.py = t.y;
                rec.el.style.transform = 'translate3d(' + t.x.toFixed(1) + 'px,' + t.y.toFixed(1) + 'px,0)';
            }
        }
        for (const [id, rec] of Array.from(this._tags)) if (!seen.has(id)) { rec.el.remove(); this._tags.delete(id); }
    },

    _clearTags() {
        for (const rec of this._tags.values()) rec.el.remove();
        this._tags.clear();
    },

    /** «+1» с иконкой: поднимается над точкой и улетает к своему счётчику. */
    floatText(x, y, text, kind) {
        if (!this.root || !this.floats || !isFinite(x) || !isFinite(y)) return;
        kind = kind || 'coin';
        while (this._flo.length > 14) { const o = this._flo.shift(); if (o) o.remove(); }
        const el = hsuiEl('div', 'hs-float ' + kind, this.floats);
        if (kind === 'coin') hsuiImg('assets/ui/icon-coin.webp', '', el);
        else if (kind === 'gem') hsuiImg('assets/ui/icon-gem.webp', '', el);
        const tx = hsuiEl('span', 'hs-o', el);
        tx.textContent = String(text);
        this._flo.push(el);
        // цель: счётчик монет / кристаллов, полоса уровня, кнопки усилений
        let target = null, counter = null;
        if (this._hudOn) {
            if (kind === 'coin') { target = this.hCoin.el; counter = this.hCoin; }
            else if (kind === 'gem') { target = this.hGem.el; counter = this.hGem; }
            else if (kind === 'xp') target = this.hLvl;
            else if (kind === 'power') target = this.abil.dash.b;
        }
        const rr = this.root.getBoundingClientRect();
        let ex = x, ey = y - 70 * this.u;
        if (target) {
            const r = target.getBoundingClientRect();
            if (r.width > 0) { ex = r.left - rr.left + r.width * 0.3; ey = r.top - rr.top + r.height / 2; }
        }
        const done = () => { el.remove(); const i = this._flo.indexOf(el); if (i >= 0) this._flo.splice(i, 1); if (counter) counter.bump(); };
        if (typeof el.animate !== 'function') { window.setTimeout(done, 700); return; }
        const rise = 46 * this.u;
        const at = (px, py, sc) => 'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px) translate(-50%,-50%) scale(' + sc + ')';
        const a = el.animate([
            { transform: at(x, y, 0.4), opacity: 0 },
            { transform: at(x, y - rise * 0.7, 1.25), opacity: 1, offset: 0.2 },
            { transform: at(x, y - rise, 1), opacity: 1, offset: 0.45 },
            { transform: at(ex, ey, 0.45), opacity: 0.2 },
        ], { duration: target ? 1050 : 800, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
        a.onfinish = done;
        a.oncancel = done;
    },

    // =====================================================================================
    // Главное меню
    // =====================================================================================

    _buildMenu() {
        const root = this.root;
        const m = hsuiEl('div', 'hs-screen hs-menu', root);
        this.menu_el = m;
        // плавающие монеты
        const fc = hsuiEl('div', 'hs-fcoins', m);
        for (let i = 0; i < 9; i++) {
            const c = hsuiEl('i', 'hs-fcoin', fc);
            c.style.setProperty('--x', (6 + i * 10.5 + (i % 2) * 3) + '%');
            c.style.setProperty('--t', (9 + (i * 7) % 6) + 's');
            c.style.setProperty('--dl', (-((i * 1.9) % 11)).toFixed(1) + 's');
            c.style.setProperty('--sz', (0.8 + (i % 3) * 0.3).toFixed(2));
            c.style.setProperty('--dx', ((i % 2 ? 1 : -1) * (14 + i * 3)) + 'px');
        }
        // верх: карта и кошелёк
        const top = hsuiEl('div', 'hs-m-top', m);
        const mc = hsuiEl('div', 'hs-mapcard hs-a left', top);
        mc.style.setProperty('--d', '0');
        this.mNum = hsuiEl('span', 'hs-mapnum', mc, '01');
        const nm = hsuiEl('div', 'hs-mapname', mc);
        this.mName = hsuiEl('b', 'hs-o', nm);
        this.mName.style.setProperty('--s', '1.5px');
        this.mSub = hsuiEl('small', '', nm);
        this.mSeekIc = hsuiEl('div', 'hs-seekic', mc);
        const wal = hsuiEl('div', 'hs-m-wallet hs-a right', top);
        wal.style.setProperty('--d', '1');
        this.mCoin = this._counter(wal, 'assets/ui/icon-coin.webp', '', 'coins');
        this.mGem = this._counter(wal, 'assets/ui/icon-gem.webp', '', 'gems');
        // логотип
        const logo = hsuiEl('div', 'hs-logo', m);
        const la = hsuiEl('div', 'hs-a top', logo);
        la.style.setProperty('--d', '1');
        const li = hsuiEl('div', 'hs-logo-in', la);
        this.logo1 = hsuiBig(Lang.t('ui.logo1'), 'hs-logo-1', li);
        this.logo2 = hsuiBig(Lang.t('ui.logo2'), 'hs-logo-2', li);
        // левая колонка: магазин, облики, настройки
        const left = hsuiEl('div', 'hs-m-left', m);
        const tool = (cls, label, d, fn) => {
            const w = hsuiEl('div', 'hs-a left', left);
            w.style.setProperty('--d', String(d));
            const b = hsuiBtn('hs-tool ' + cls, w);
            b.setAttribute('aria-label', label);
            if (cls !== 'gear') hsuiEl('span', '', b).textContent = label;
            this._bind(b, fn);
            return b;
        };
        tool('shop', Lang.t('ui.shop'), 2, () => this.openShop('seeker', 'menu'));
        tool('skins', Lang.t('ui.skins'), 3, () => this.openShop('skin', 'menu'));
        tool('gear', Lang.t('ui.settings'), 4, () => this.openSettings());
        // справа: подарок дня и колесо фортуны (красная точка — можно забрать / крутить бесплатно)
        const right = hsuiEl('div', 'hs-m-right', m);
        const toolFr = (cls, label, svg, d, fn) => {
            const w = hsuiEl('div', 'hs-a right', right);
            w.style.setProperty('--d', String(d));
            const b = hsuiBtn('hs-tool fr ' + cls, w);
            b.setAttribute('aria-label', label);
            hsuiEl('div', 'ic', b, svg);
            hsuiEl('span', '', b).textContent = label;
            const dot = hsuiEl('i', 'dot', b);
            dot.hidden = true;
            this._bind(b, fn);
            return { el: b, dot };
        };
        this.btnGift = toolFr('gift', Lang.t('ui.gift'), HSUI_ICON.gift, 2, () => this.dailyOpen());
        this.btnWheel = toolFr('wheel', Lang.t('ui.wheel'), hsuiWheelIcon(), 3, () => this.wheelOpen());
        // рекорды — только если у площадки есть таблица (Яндекс, Playgama)
        if (typeof GameRecords !== 'undefined' && GameRecords.supported) {
            this.btnRecords = toolFr('records', Lang.t('rec.button'), HSUI_CUP, 4, () => GameRecords.open());
        }
        // низ: роль, играть, уровень
        const bot = hsuiEl('div', 'hs-m-bottom', m);
        const sw = hsuiEl('div', 'hs-a bottom', bot);
        sw.style.setProperty('--d', '3');
        const seg = hsuiEl('div', 'hs-seg', sw);
        this.seg = seg;
        hsuiEl('i', '', seg);
        this.segHide = hsuiBtn('', seg, HSUI_ICON.eyeOff + '<span></span>');
        this.segHide.lastElementChild.textContent = Lang.t('ui.roleHide');
        this.segSeek = hsuiBtn('', seg, '<span></span>');
        this.segSeek.lastElementChild.textContent = Lang.t('ui.roleSeek');
        this._bind(this.segHide, () => this.setRole('hider'));
        this._bind(this.segSeek, () => this.setRole('seeker'));
        const pw = hsuiEl('div', 'hs-a bottom', bot);
        pw.style.setProperty('--d', '4');
        this.playBtn = hsuiBtn('hs-btn hs-play hs-shine', pw, HSUI_ICON.play + '<span class="t"></span>');
        this.playBtn.lastElementChild.textContent = Lang.t('ui.play');
        this.playBtn.style.setProperty('--sd', '.4s');
        this._bind(this.playBtn, () => this._play());
        const lw = hsuiEl('div', 'hs-a bottom', bot);
        lw.style.setProperty('--d', '5');
        const lvl = hsuiEl('div', 'hs-lvl', lw);
        this.mLvl = hsuiEl('b', 'hs-o', lvl);
        this.mLvl.style.setProperty('--s', '1.5px');
        const bar = hsuiEl('div', 'hs-bar', lvl);
        this.mBar = hsuiEl('i', '', bar);
        this._setSeg();
    },

    _setSeg() {
        const seek = this.role === 'seeker';
        this.seg.classList.toggle('seek', seek);
        this.segHide.classList.toggle('on', !seek);
        this.segSeek.classList.toggle('on', seek);
    },

    setRole(role) {
        if (this.role === role) return;
        this.role = role;
        try { Store.set(GAME_ID + '.role', role); } catch (e) { /* без хранилища */ }
        this._setSeg();
        const G = hsuiGame();
        // Game.setRole меняет роль сразу, пересобирает персонажа и мгновенно наводит камеру
        try { if (G && typeof G.setRole === 'function') G.setRole(role); } catch (e) { /* без Game */ }
    },

    _play() {
        const G = hsuiGame();
        if (!G || typeof G.play !== 'function') return;
        G.play(this.role);
    },

    _mapInfo() {
        const G = hsuiGame();
        if (G && typeof G.mapInfo === 'function') { try { return G.mapInfo(); } catch (e) { /* ниже запасной */ } }
        const i = G && G.save ? G.save.mapIndex | 0 : 0, m = HS_MAPS[i] || HS_MAPS[0];
        return { index: i, total: HS_MAPS.length, id: m.id, name: hsText(m.name), color: m.color, seeker: m.seeker };
    },

    _levelInfo() {
        const G = hsuiGame();
        if (G && typeof G.levelInfo === 'function') { try { return G.levelInfo(); } catch (e) { /* ниже запасной */ } }
        return { level: 1, xp: 0, need: 100, frac: 0 };
    },

    _wallet(anim) {
        if (this._hold) return;
        const coins = hsuiCoins(), gems = hsuiGems(), on = hsuiAdsOn();
        for (const c of [this.mCoin, this.shCoin, this.dgCoin, this.whCoin, this.rCoin]) if (c) { c.set(coins, anim); if (c.plus) c.plus.hidden = !on; }
        for (const c of [this.mGem, this.shGem, this.dgGem, this.whGem, this.rGem]) if (c) { c.set(gems, anim); if (c.plus) c.plus.hidden = !on; }
    },

    _menuFill() {
        const mi = this._mapInfo(), sk = hsSeeker(mi.seeker), lv = this._levelInfo();
        const col = mi.color || '#5fe0a8';
        this.menu_el.style.setProperty('--mc', col);
        this.mNum.textContent = hsuiPad2((mi.index | 0) + 1);
        this.mName.textContent = hsuiName(mi.name).toUpperCase();
        this.mSub.textContent = Lang.t('ui.seeker') + ': ' + hsText(sk.name);
        this.mSeekIc.innerHTML = '';
        hsuiIcon(sk.icon, this.mSeekIc, col);
        this.mLvl.textContent = Lang.t('ui.level', { n: lv.level });
        this.mBar.style.setProperty('--f', hsuiClamp(lv.frac || 0, 0, 1).toFixed(3));
        this._wallet(false);
        this._setSeg();
    },

    menu(show) {
        if (!this.root) return;
        this._menuWanted = !!show;
        if (show) {
            if (this._hudOn) this.hud(false);
            this._resultHide(true);
            // окно подарка или колеса, которое Game открыл раньше меню, остаётся: меню вернётся по закрытии
            if (this._open === 'daily' || this._open === 'wheel') { this._from = 'menu'; this._menuFill(); this._menuHide(true); return; }
            this._closeWindows(true);
            const G = hsuiGame();
            if (G && (G.role === 'hider' || G.role === 'seeker') && G.role !== this.role) {
                this.role = G.role;
                try { Store.set(GAME_ID + '.role', this.role); } catch (e) { /* без хранилища */ }
            }
            this._menuFill();
            this._show(this.menu_el, true);
            this._badges();
        } else this._menuHide(false);
    },

    _menuHide(fast) {
        if (!this.menu_el) return;
        if (fast) { clearTimeout(this._timers.get(this.menu_el)); this.menu_el.classList.remove('on', 'in', 'out'); }
        else this._show(this.menu_el, false);
    },

    /** Общее обновление после любой смены сохранения (событие hs-save). */
    refresh() {
        if (!this.root) return;
        this._wallet(true);
        if (this.menu_el.classList.contains('on')) {
            const lv = this._levelInfo();
            this.mLvl.textContent = Lang.t('ui.level', { n: lv.level });
            this.mBar.style.setProperty('--f', hsuiClamp(lv.frac || 0, 0, 1).toFixed(3));
        }
        if (this._open === 'shop') this._shopRefresh();
        if (this._open === 'settings') this._setRefresh();
        if (this._open === 'daily' && !this._hold) this._dailyFill();
        this._badges();
    },

    // =====================================================================================
    // Реклама: общий тик, «+» у кошелька, полёт монет, окно награды
    // =====================================================================================

    _tk: 0,
    _hold: false,
    _holdT: 0,
    _pop: null,
    _prz: null,
    _offerRec: null,

    /** Раз в 0.5 с и по паузе между rewarded: подписи «Через N с», таймеры, значки на кнопках меню. */
    _startTicker() {
        if (this._tk) return;
        this._tk = window.setInterval(() => this._tick(), 500);
        try { if (typeof Platform !== 'undefined' && typeof Platform.onRewardedCooldown === 'function') Platform.onRewardedCooldown(() => this._tick()); } catch (e) { /* без платформы */ }
        document.addEventListener('pointerdown', e => {
            const p = this._pop;
            if (!p) return;
            const t = /** @type {Node} */ (e.target);
            if (!p.el.contains(t) && !(p.anchorBtn && p.anchorBtn.contains(t))) this._popClose();
        }, true);
    },

    _tick() {
        if (!this.root) return;
        try {
            const o = this._open;
            if (o === 'shop') this._shopRefresh();
            else if (o === 'daily') this._dailyFill();
            else if (o === 'wheel') this._wheelRefresh();
            this._popRefresh();
            this._offerRefresh();
            this._badges();
            this._x2Refresh();
        } catch (e) { console.error('GameUI: обновление окон:', e); }
    },

    /** Красные точки на «Подарок» и «Колесо», плюсы у кошелька — по готовности рекламы. */
    _badges() {
        const on = hsuiAdsOn();
        for (const c of this._counters) if (c.plus) c.plus.hidden = !on;
        if (!this.menu_el || !this.menu_el.classList.contains('on')) return;
        let g = 0, w = 0;
        try { if (typeof DailyGift !== 'undefined' && DailyGift._rewards && DailyGift._rewards.length && !DailyGift.tutorialActive()) g = DailyGift.badge(); } catch (e) { /* не готов */ }
        try { if (typeof Wheel !== 'undefined' && Wheel._sectors && Wheel._sectors.length > 1) w = Wheel.badge(); } catch (e) { /* не готов */ }
        for (const [b, n] of [[this.btnGift, g], [this.btnWheel, w]]) if (b) { b.dot.hidden = !n; b.el.classList.toggle('attn', !!n); }
    },

    /** Кошелёк не обновляется, пока показывается награда: число растёт, когда монеты долетают. */
    _holdWallet(on) {
        clearTimeout(this._holdT);
        this._hold = !!on;
        if (on) this._holdT = window.setTimeout(() => { this._hold = false; this._wallet(true); }, 15000);
    },

    _shake(el) {
        if (!el) return;
        el.classList.remove('hs-shake'); void el.offsetWidth; el.classList.add('hs-shake');
    },

    /** Красная (good — зелёная, neutral — серая) подсказка на 2.6 с. */
    _hintOn(el, text, kind) {
        if (!el) return;
        el.textContent = text;
        el.classList.toggle('good', kind === 'good');
        el.classList.toggle('neutral', kind === 'neutral');
        el.classList.add('on');
        const old = this._timers.get(el);
        if (old) clearTimeout(old);
        this._timers.set(el, window.setTimeout(() => { el.classList.remove('on'); this._timers.delete(el); }, 2600));
    },

    /** Счётчики того окна, что сейчас на экране: куда летят монеты. */
    _curCounters() {
        const o = this._open;
        if (o === 'daily') return { coin: this.dgCoin, gem: this.dgGem };
        if (o === 'wheel') return { coin: this.whCoin, gem: this.whGem };
        if (o === 'shop') return { coin: this.shCoin, gem: this.shGem };
        if (this._resultOn && !this._menuWanted) return { coin: this.rCoin, gem: this.rGem };
        return { coin: this.mCoin, gem: this.mGem };
    },

    /** Монеты или кристаллы вылетают из прямоугольника from и влетают в счётчик target; onLand — когда все долетели. */
    _fly(icon, from, target, n, onLand) {
        const el = target && target.el ? target.el : target;
        const done = () => { if (onLand) onLand(); };
        if (!this.root || !el || typeof el.getBoundingClientRect !== 'function' || typeof Element.prototype.animate !== 'function') { done(); return; }
        const t = el.getBoundingClientRect();
        if (!(t.width > 0)) { done(); return; }
        const rr = this.root.getBoundingClientRect();
        const sx = from.left + from.width / 2 - rr.left, sy = from.top + from.height / 2 - rr.top;
        const ex = t.left + Math.min(t.width * 0.3, 30 * this.u) - rr.left, ey = t.top + t.height / 2 - rr.top;
        n = hsuiReduced() ? Math.min(3, n) : Math.max(1, Math.min(12, n));
        let landed = 0;
        for (let i = 0; i < n; i++) {
            const c = hsuiEl('i', 'hs-fly', this.fxl);
            c.style.backgroundImage = "url('" + icon + "')";
            const ang = Math.random() * Math.PI * 2, rad = (20 + Math.random() * 46) * this.u;
            const mx = sx + Math.cos(ang) * rad, my = sy + Math.sin(ang) * rad - 20 * this.u;
            const an = c.animate([
                { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(.4)', opacity: 0 },
                { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1.15)', opacity: 1, offset: 0.3 },
                { transform: 'translate(' + ex + 'px,' + ey + 'px) scale(.6)', opacity: 1, offset: 0.92 },
                { transform: 'translate(' + ex + 'px,' + ey + 'px) scale(.3)', opacity: 0 },
            ], { duration: 950, delay: i * 55, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'both' });
            const fin = () => { c.remove(); if (++landed === n) done(); };
            an.onfinish = fin;
            an.oncancel = fin;
        }
    },

    /** Всплеск звёздочек из центра элемента. */
    _burst(el, n) {
        if (!this.root || !el || typeof Element.prototype.animate !== 'function') return;
        const rr = this.root.getBoundingClientRect(), r = el.getBoundingClientRect();
        const cx = r.left - rr.left + r.width / 2, cy = r.top - rr.top + r.height / 2;
        const cols = ['#ffe45c', '#ffffff', '#59d4ff', '#ff9ed2', '#76f067'];
        n = hsuiReduced() ? 5 : (n || 18);
        for (let i = 0; i < n; i++) {
            const s = hsuiEl('i', 'hs-bst', this.fxl);
            s.style.setProperty('--c', cols[i % cols.length]);
            s.style.setProperty('--z', (0.6 + Math.random() * 0.9).toFixed(2));
            const a = Math.random() * Math.PI * 2, d = (46 + Math.random() * 90) * this.u;
            const x1 = cx + Math.cos(a) * d, y1 = cy + Math.sin(a) * d - 18 * this.u;
            const an = s.animate([
                { transform: 'translate(' + cx + 'px,' + cy + 'px) scale(.2) rotate(0deg)', opacity: 1 },
                { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(1) rotate(160deg)', opacity: 1, offset: 0.55 },
                { transform: 'translate(' + x1 + 'px,' + (y1 + 46 * this.u) + 'px) scale(.2) rotate(320deg)', opacity: 0 },
            ], { duration: 750 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' });
            an.onfinish = () => s.remove();
            an.oncancel = () => s.remove();
        }
    },

    // ---- «+» у кошелька: что даёт, за что, одна кнопка ----

    /** @param {'coins'|'gems'} kind @param {HsCounter} counter */
    _adPop(kind, counter) {
        if (this._pop && this._pop.kind === kind && this._pop.anchor === counter.el) { this._popClose(); return; }
        this._popClose();
        const gems = kind === 'gems';
        const el = hsuiEl('div', 'hs-pop hs-panel', this.root);
        const row = hsuiEl('div', 'row', el);
        hsuiImg(gems ? 'assets/ui/icon-gem.webp' : 'assets/ui/icon-coin.webp', 'pi', row);
        const pt = hsuiEl('div', 'pt', row);
        const t1 = hsuiEl('b', 'hs-o', pt);
        t1.style.setProperty('--s', '1.5px');
        const t2 = hsuiEl('small', '', pt);
        const n = hsuiAdAmount(kind);
        t1.textContent = '+' + hsuiFmt(n) + ' ' + Lang.t(gems ? 'ui.popGems' : 'ui.popCoins');
        t2.textContent = Lang.t('ui.popSub');
        const btn = hsuiBtn('hs-btn hs-shine', el, HSUI_ICON.playG + '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        const hint = hsuiEl('div', 'hs-hint', el);
        this._bind(btn, () => this._popGo(), false);
        this._pop = { kind, el, btn, hint, anchor: counter.el, anchorBtn: counter.plus, busy: false, key: '' };
        const rr = this.root.getBoundingClientRect(), a = counter.el.getBoundingClientRect();
        const w = el.offsetWidth || 300 * this.u;
        const left = hsuiClamp(a.right - rr.left - w + 10 * this.u, 8, Math.max(8, this.W - w - 8));
        el.style.left = left.toFixed(0) + 'px';
        el.style.top = (a.bottom - rr.top + 12 * this.u).toFixed(0) + 'px';
        this._popRefresh();
    },

    _popClose() {
        const p = this._pop;
        if (!p) return;
        this._pop = null;
        p.el.remove();
    },

    _popRefresh() {
        const p = this._pop;
        if (!p) return;
        if (!p.anchor.getClientRects().length) { this._popClose(); return; }
        const wait = hsuiAdWait(), ready = hsuiAdReady() && !p.busy;
        const text = p.busy ? Lang.t('ui.adRunning') : wait ? wait.toUpperCase() : Lang.t('ui.watchAd');
        const key = text + '|' + ready;
        if (p.key === key) return;
        p.key = key;
        p.btn.lastElementChild.textContent = text;
        p.btn.classList.toggle('off', !ready);
        p.btn.querySelector('svg').style.display = wait ? 'none' : '';
    },

    async _popGo() {
        const p = this._pop, a = hsuiAds();
        if (!p || p.busy || !a) return;
        if (!hsuiAdReady()) { this._shake(p.btn); return; }
        p.busy = true;
        this._holdWallet(true);
        this._popRefresh();
        let r = null;
        try { r = await (p.kind === 'gems' ? a.gems() : a.coins()); } catch (e) { r = null; }
        p.busy = false;
        if (r && r.ok) {
            const n = r.amount | 0, from = p.el.getBoundingClientRect();
            const gems = p.kind === 'gems';
            hsuiSfx('buy');
            if (this._pop === p) this._popClose();
            this._flyReward(gems ? 'gems' : 'coins', n, from, gems ? this._curCounters().gem : this._curCounters().coin);
        } else {
            this._holdWallet(false);
            if (this._pop === p) {
                this._popRefresh();
                this._hintOn(p.hint, Lang.t(r && (r.reason === 'cooldown' || r.reason === 'busy') ? 'ui.adNone' : 'ui.adFail'));
            }
        }
    },

    /** Награда валютой: «+N» над местом, монеты летят в счётчик, число растёт по прилёту. */
    _flyReward(kind, n, from, counter) {
        const gems = kind === 'gems';
        const icon = gems ? 'assets/ui/icon-gem.webp' : 'assets/ui/icon-coin.webp';
        const rr = this.root.getBoundingClientRect();
        if (n > 0) this.floatText(from.left + from.width / 2 - rr.left, from.top + from.height / 2 - rr.top, '+' + hsuiFmt(n), gems ? 'gem' : 'coin');
        this._fly(icon, from, counter, Math.min(12, 4 + Math.floor(n / 40)), () => {
            this._holdWallet(false);
            this._wallet(true);
            if (counter && counter.bump) counter.bump();
        });
    },

    // ---- окно награды (подарок дня, колесо) ----

    /**
     * @param {{ title?: string, items: Array<{ kind: 'coins'|'gems'|'item', amount?: number, id?: string, note?: string }>, note?: string, onClose?: () => void }} o
     */
    _prize(o) {
        this._prizeClose(true);
        const S = hsuiShop();
        const el = hsuiEl('div', 'hs-prize', this.root);
        hsuiEl('div', 'rays', el);
        const card = hsuiEl('div', 'hs-panel hs-pz-card', el);
        hsuiBig((o.title || Lang.t('ui.got')).toUpperCase(), 'hs-pz-title', card);
        const row = hsuiEl('div', 'hs-pz-row', card);
        let notes = '';
        o.items.forEach((it, k) => {
            const box = hsuiEl('div', 'hs-pz-it', row);
            box.style.setProperty('--k', String(k));
            const big = hsuiEl('div', 'big', box);
            if (it.kind === 'item') {
                const item = S ? S.item(it.id) : null;
                const col = hsuiRar(item ? item.rarity : 'common').color;
                box.style.setProperty('--rc', col);
                hsuiIcon(item ? item.icon : '', big, col, item ? item.tab : '');
                hsuiEl('small', '', box).textContent = S ? S.name(it.id) : String(it.id);
                if (item) hsuiEl('span', 'rr', box).textContent = hsuiRarName(item.rarity);
            } else {
                box.classList.add(it.kind === 'gems' ? 'gem' : 'coin');
                hsuiImg(it.kind === 'gems' ? 'assets/ui/icon-gem.webp' : 'assets/ui/icon-coin.webp', '', big);
                const b = hsuiEl('b', 'hs-o', box);
                b.style.setProperty('--s', '2px');
                b.textContent = '+' + hsuiFmt(it.amount || 0);
            }
            if (it.note) notes = it.note;
        });
        if (notes || o.note) hsuiEl('div', 'hs-pz-note', card).textContent = o.note || notes;
        const btn = hsuiBtn('hs-btn hs-shine', card, '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        btn.lastElementChild.textContent = Lang.t('ui.gotIt');
        this._bind(btn, () => this._prizeClose(false), false);
        this._prz = { el, o, card };
        hsuiSfx('buy');
        window.setTimeout(() => { if (this._prz && this._prz.el === el) this._burst(card, 22); }, 120);
    },

    /** Закрыть окно награды; монеты и кристаллы летят в счётчик окна под ним. */
    _prizeClose(silent) {
        const p = this._prz;
        if (!p) return;
        this._prz = null;
        const from = p.card.getBoundingClientRect();
        p.el.remove();
        const cn = this._curCounters();
        if (silent) { this._holdWallet(false); this._wallet(true); return; }
        hsuiSfx('click');
        let coins = 0, gems = 0;
        for (const it of p.o.items) { if (it.kind === 'coins') coins += it.amount || 0; else if (it.kind === 'gems') gems += it.amount || 0; }
        let pend = (coins > 0 ? 1 : 0) + (gems > 0 ? 1 : 0);
        const land = () => { if (--pend <= 0) { this._holdWallet(false); this._wallet(true); } };
        if (coins > 0) this._fly('assets/ui/icon-coin.webp', from, cn.coin, Math.min(12, 4 + Math.floor(coins / 40)), () => { if (cn.coin) cn.coin.bump(); land(); });
        if (gems > 0) this._fly('assets/ui/icon-gem.webp', from, cn.gem, Math.min(8, 3 + Math.floor(gems / 4)), () => { if (cn.gem) cn.gem.bump(); land(); });
        if (pend <= 0) { this._holdWallet(false); this._wallet(true); }
        try { if (p.o.onClose) p.o.onClose(); } catch (e) { console.error(e); }
    },

    /** got из DailyGift.claim()/Wheel.finish() -> карточки награды (валюта суммируется). */
    _gotItems(got, extraGems) {
        let coins = 0, gems = extraGems | 0, conv = false;
        const items = [];
        for (const g of got || []) {
            if (!g) continue;
            if (g.type === 'coins') { coins += g.amount | 0; if (g.converted) conv = true; }
            else if (g.type === 'gems') gems += g.amount | 0;
            else if ((g.type === 'item' || g.type === 'exclusive') && g.id) items.push({ kind: /** @type {'item'} */ ('item'), id: g.id });
        }
        const out = [];
        if (coins > 0) out.push({ kind: /** @type {'coins'} */ ('coins'), amount: coins, note: conv ? Lang.t('ui.dup') : '' });
        if (gems > 0) out.push({ kind: /** @type {'gems'} */ ('gems'), amount: gems });
        return out.concat(items);
    },

    // =====================================================================================
    // Магазин: 6 вкладок каталога (HS_SHOP_TABS) и «Усиления»
    // =====================================================================================

    _shopState: { tab: 'skin', sel: {} },
    _shopBusy: false,
    _peekOn: false,
    _unShop: null,

    _tabList() {
        const tabs = (typeof HS_SHOP_TABS !== 'undefined' ? HS_SHOP_TABS : []).map(t => ({ id: t.id, name: hsText(t.name) }));
        tabs.push({ id: 'power', name: Lang.t('ui.tab.power') });
        return tabs;
    },

    _buildShop() {
        const win = hsuiEl('div', 'hs-screen hs-win hs-shop', this.root);
        this.shop_el = win;
        const pn = hsuiEl('div', 'hs-panel hs-shopwin hs-a', win);
        pn.style.setProperty('--d', '0');
        this.shopPanel = pn;
        const head = hsuiEl('div', 'hs-sh-head', pn);
        hsuiBig(Lang.t('ui.shop'), 'hs-sh-title', head);
        const wal = hsuiEl('div', 'hs-sh-wallet', head);
        this.shCoin = this._counter(wal, 'assets/ui/icon-coin.webp', '', 'coins');
        this.shGem = this._counter(wal, 'assets/ui/icon-gem.webp', '', 'gems');
        const close = hsuiBtn('hs-tool close', head);
        close.setAttribute('aria-label', Lang.t('ui.close'));
        this._bind(close, () => this.closeShop());
        const tabs = hsuiEl('div', 'hs-tabs', pn);
        this.shTabs = {};
        for (const t of this._tabList()) {
            const b = hsuiBtn('hs-tab', tabs, (HSUI_TABIC[t.id] || HSUI_ICON.grid) + '<span></span>');
            b.lastElementChild.textContent = t.name.toUpperCase();
            b.setAttribute('aria-label', t.name);
            this._bind(b, () => this._shopTab(t.id));
            this.shTabs[t.id] = b;
        }
        this.shBody = hsuiEl('div', 'hs-sh-body', pn);
        // нижняя панель режима «на сцене»
        const pk = hsuiEl('div', 'hs-panel hs-peek', win);
        const back = hsuiBtn('hs-btn navy back', pk, HSUI_ICON.arrowL + '<span class="t"></span>');
        back.lastElementChild.textContent = Lang.t('ui.back');
        this._bind(back, () => this._peek(false));
        const info = hsuiEl('div', 'pi', pk);
        const pnm = hsuiEl('div', 'pn hs-o', info);
        pnm.style.setProperty('--s', '1.5px');
        const prr = hsuiEl('div', 'pr', info);
        const pact = hsuiBtn('hs-btn hs-shine', pk);
        this._bind(pact, () => this._shopAct(this._shopState.sel[this._shopState.tab]), false);
        const phint = hsuiEl('div', 'hs-hint', pk);
        this.peek = { el: pk, nm: pnm, rr: prr, act: pact, hint: phint };
        // клик по затемнению мимо панели
        win.addEventListener('click', e => {
            if (e.target !== win) return;
            if (win.classList.contains('peek')) this._peek(false); else this.closeShop();
        });
    },

    /** from: 'menu' | 'result' — куда вернуться при закрытии. */
    openShop(tab, from) {
        if (!this.root) return;
        if (!this.shop_el) this._buildShop();
        this._shopSub();
        this._popClose();
        this._from = from || 'menu';
        this._open = 'shop';
        if (from === 'result') this._show(this.result_el, false); else this._menuHide(false);
        this._wallet(false);
        const map = { seekers: 'seeker', skins: 'skin' };
        const id = map[tab] || tab;
        this._peek(false);
        this._shopTab(this.shTabs[id] ? id : (this._shopState.tab || 'skin'), true);
        this._show(this.shop_el, true);
        hsuiSfx('whoosh');
    },

    closeShop() {
        if (this._open !== 'shop') return;
        this._open = '';
        this._peek(false);
        this._popClose();
        this._show(this.shop_el, false);
        this._gPreviewReset();
        this._back();
    },

    /** Вернуться на экран, с которого открыли окно. */
    _back() {
        if (this._from === 'result' && this._resultOn) { this._show(this.result_el, true); this._resultReplayLight(); }
        else if (this._menuWanted) { this._menuFill(); this._show(this.menu_el, true); }
    },

    _closeWindows(fast) {
        this._open = '';
        this._popClose();
        this._prizeClose(true);
        this._peekOn = false;
        for (const el of [this.shop_el, this.set_el, this.daily_el, this.wheel_el]) {
            if (!el) continue;
            el.classList.remove('peek');
            if (fast) { clearTimeout(this._timers.get(el)); el.classList.remove('on', 'in', 'out'); } else this._show(el, false);
        }
    },

    /** Shop.init сбрасывает слушателей, поэтому подписываемся при каждом открытии. */
    _shopSub() {
        try {
            if (this._unShop) this._unShop();
            this._unShop = typeof Shop !== 'undefined' ? Shop.on(() => { if (this._open === 'shop') this._shopRefresh(); }) : null;
        } catch (e) { this._unShop = null; }
    },

    /** Предпросмотр предмета на 3D-сцене меню. */
    _gPreview(id) {
        const G = /** @type {any} */ (hsuiGame());
        if (!G) return;
        try {
            if (typeof G.shopPreview === 'function') G.shopPreview(id);
            else if (typeof G.setMenuPreview === 'function') {
                const S = hsuiShop(), it = S ? S.item(id) : null;
                if (it && (it.tab === 'skin' || it.tab === 'seeker')) G.setMenuPreview(it.tab, id);
            }
        } catch (e) { /* предпросмотр не обязателен */ }
    },

    /** Вернуть на сцену надетое. */
    _gPreviewReset() {
        const G = /** @type {any} */ (hsuiGame());
        if (!G) return;
        try {
            if (typeof G.shopPreview === 'function') G.shopPreview(null);
            else if (typeof G.setMenuPreview === 'function' && G.shop && G.shop.equipped) {
                const kind = this.role === 'seeker' ? 'seeker' : 'skin';
                G.setMenuPreview(kind, G.shop.equipped(kind));
            }
        } catch (e) { /* предпросмотр не обязателен */ }
    },

    /** Режим «на сцене»: окно прячется, виден 3D-герой, снизу — купить / надеть и «Назад». */
    _peek(on) {
        const w = this.shop_el;
        if (!w) return;
        on = !!on && this._shopState.tab !== 'power';
        this._peekOn = on;
        w.classList.toggle('peek', on);
        if (on) this._peekFill(this._model());
    },

    _tabSel(tab) { return this._shopState.sel[tab]; },

    _shopTab(tab, quiet) {
        const st = this._shopState;
        st.tab = tab;
        for (const id of Object.keys(this.shTabs)) this.shTabs[id].classList.toggle('on', id === tab);
        const S = hsuiShop();
        const body = this.shBody;
        body.innerHTML = '';
        body.className = 'hs-sh-body' + (tab === 'power' ? ' power' : '');
        this.cards = [];
        this.pcards = [];
        this.prev = null;
        const grid = hsuiEl('div', 'hs-sh-grid', body);
        this.shGrid = grid;
        if (tab === 'power') {
            HS_POWERUPS.forEach((it, i) => this._mkPower(grid, it, i));
            this._gPreviewReset();
        } else {
            const models = S ? S.cards(tab) : [];
            if (!models.length) {
                hsuiEl('div', 'hs-sh-empty', grid).textContent = Lang.t(S ? 'ui.empty' : 'ui.shopSoon');
                this._shopRefresh();
                return;
            }
            if (!st.sel[tab] || !models.some(m => m.id === st.sel[tab])) {
                const eq = models.find(m => m.equipped);
                st.sel[tab] = eq ? eq.id : models[0].id;
            }
            models.forEach((m, i) => this._mkCard(grid, tab, m, i));
            this._mkPrev(body);
            this._selectItem(st.sel[tab], !!quiet);
            const cur = this.cards.find(c => c.id === st.sel[tab]);
            if (cur) setTimeout(() => cur.el.scrollIntoView({ block: 'nearest' }), 60);
        }
        this._shopRefresh();
    },

    _model(id) {
        const S = hsuiShop();
        if (!S) return null;
        const st = this._shopState;
        return S.card(id || st.sel[st.tab]);
    },

    _mkCard(grid, tab, m, i) {
        const r = hsuiRar(m.rarity);
        const el = hsuiBtn('hs-card r-' + (m.rarity || 'common'), grid);
        el.style.setProperty('--rc', r.color);
        el.style.setProperty('--rca', hsuiRgba(r.color, m.rarity === 'common' ? 0.28 : 0.5));
        el.style.setProperty('--i', String(Math.min(i, 14)));
        hsuiEl('span', 'nm', el).textContent = m.name;
        hsuiEl('span', 'rr', el).textContent = hsuiRarName(m.rarity);
        const im = hsuiEl('span', 'im', el);
        hsuiIcon(m.item.icon, im, r.color, tab);
        const lk = hsuiEl('span', 'lk', el, HSUI_ICON.lock);
        hsuiEl('i', 'rd', el);   // метка редкости: в низком альбомном вместо пилюли
        if (m.rarity && m.rarity !== 'common') {
            const sp = hsuiEl('span', 'sp', el);
            for (let k = 0; k < 3; k++) {
                const s = hsuiEl('i', 'hs-spk', sp);
                s.style.setProperty('--x', (14 + ((k * 37 + i * 11) % 70)) + '%');
                s.style.setProperty('--y', (26 + ((k * 23 + i * 7) % 40)) + '%');
                s.style.setProperty('--z', (0.9 + k * 0.35).toFixed(2));
                s.style.setProperty('--t', (1.8 + k * 0.5).toFixed(1) + 's');
                s.style.setProperty('--dl', (-(k * 0.7 + i * 0.2)).toFixed(1) + 's');
            }
            if (m.rarity !== 'rare') { hsuiEl('span', 'shn', el); el.style.setProperty('--sd', (-(i % 5)) + 's'); }
        }
        const st = hsuiEl('span', 'st', el);
        const rec = { id: m.id, el, st, lk, tab, key: '' };
        this.cards.push(rec);
        this._bind(el, () => this._selectItem(m.id, false), true);
        el.addEventListener('dblclick', () => { const c = this._model(m.id); if (c && c.action === 'equip') this._shopAct(m.id); });
    },

    _cardFill(c, m) {
        c.el.classList.toggle('sel', c.id === this._shopState.sel[c.tab]);
        const key = [m.state, m.kind, m.progress, m.need, m.affordable ? 1 : 0].join('|');
        if (c.key === key) return;
        c.key = key;
        c.el.classList.toggle('locked', !m.owned);
        c.lk.hidden = m.owned;
        const st = c.st;
        st.className = 'st';
        st.innerHTML = '';
        st.style.removeProperty('--p');
        if (m.equipped) { st.classList.add('eq'); st.innerHTML = HSUI_ICON.check + '<span></span>'; st.lastElementChild.textContent = Lang.t('ui.wearing'); }
        else if (m.owned) { st.classList.add('own'); st.innerHTML = HSUI_ICON.check + '<span></span>'; st.lastElementChild.textContent = Lang.t('ui.bought'); }
        else if (m.kind === 'coins') {
            hsuiImg('assets/ui/icon-coin.webp', '', st);
            hsuiEl('span', '', st).textContent = hsuiFmt(m.price);
            st.classList.toggle('cant', !m.affordable);
        } else if (m.kind === 'ads') {
            st.classList.add('ad');
            st.style.setProperty('--p', (m.need ? m.progress / m.need : 0).toFixed(3));
            hsuiEl('i', '', st);
            hsuiEl('span', '', st).textContent = Lang.t('ui.adProg', { a: m.progress, b: m.need });
        } else if (m.kind === 'exclusive') {
            st.classList.add('ex');
            st.innerHTML = HSUI_ICON.gift + '<span></span>';
            st.lastElementChild.textContent = Lang.t('ui.exclusive');
        }
    },

    _mkPrev(body) {
        const pv = hsuiEl('div', 'hs-prev hs-a', body);
        pv.style.setProperty('--d', '2');
        const nm = hsuiEl('div', 'hs-prev-name hs-o', pv);
        nm.style.setProperty('--s', '2px');
        const kind = hsuiEl('div', 'hs-prev-kind', pv);
        const kt = hsuiEl('span', '', kind);
        const rr = hsuiEl('span', 'rr', kind);
        const stage = hsuiEl('div', 'hs-stage', pv);
        hsuiEl('div', 'hs-glow', stage);
        const pf = hsuiEl('div', 'hs-platform', stage);
        hsuiEl('i', '', pf);
        const img = hsuiEl('div', 'hs-prev-img', stage);
        for (let k = 0; k < 6; k++) {
            const s = hsuiEl('i', 'hs-spk', stage);
            s.style.setProperty('--x', (10 + k * 15) + '%');
            s.style.setProperty('--y', (14 + ((k * 31) % 60)) + '%');
            s.style.setProperty('--z', (1 + (k % 3) * 0.5).toFixed(2));
            s.style.setProperty('--t', (1.6 + k * 0.3).toFixed(1) + 's');
            s.style.setProperty('--dl', (-k * 0.5).toFixed(1) + 's');
        }
        const state = hsuiEl('div', 'hs-prev-state', stage);
        const nl = hsuiBtn('hs-nav l', stage, HSUI_ICON.arrowL);
        const nr = hsuiBtn('hs-nav r', stage, HSUI_ICON.arrowR);
        nl.setAttribute('aria-label', Lang.t('ui.prev')); nr.setAttribute('aria-label', Lang.t('ui.next'));
        this._bind(nl, () => this._step(-1));
        this._bind(nr, () => this._step(1));
        const eye = hsuiBtn('hs-eye', stage, HSUI_ICON.eye);
        eye.setAttribute('aria-label', Lang.t('ui.peek'));
        eye.title = Lang.t('ui.peek');
        this._bind(eye, () => this._peek(true));
        const price = hsuiEl('div', 'hs-prev-price hs-o', pv);
        price.style.setProperty('--s', '2px');
        const hint = hsuiEl('div', 'hs-hint', pv);
        const adc = hsuiBtn('hs-btn yellow hs-prev-ad', pv);
        adc.hidden = true;
        this._bind(adc, () => this._prevAdCoins(adc, hint), false);
        const act = hsuiBtn('hs-btn hs-act hs-shine', pv);
        this._bind(act, () => this._shopAct(this._shopState.sel[this._shopState.tab]), false);
        this.prev = { el: pv, nm, kt, rr, img, price, hint, act, adc, state, stage, imgId: '', priceKey: '', adcKey: '' };
    },

    _step(d) {
        const list = this.cards;
        if (!list.length) return;
        const st = this._shopState;
        const i = list.findIndex(x => x.id === st.sel[st.tab]);
        const n = list[(i + d + list.length) % list.length];
        this._selectItem(n.id, false);
        n.el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    },

    _selectItem(id, quiet) {
        const st = this._shopState, tab = st.tab;
        st.sel[tab] = id;
        for (const c of this.cards) c.el.classList.toggle('sel', c.id === id);
        this._prevFill(!quiet);
        this._gPreview(id);
    },

    _prevFill(swap) {
        const p = this.prev, m = this._model();
        if (!p || !m) return;
        const r = hsuiRar(m.rarity);
        p.el.style.setProperty('--rc', r.color);
        p.el.style.setProperty('--rca', hsuiRgba(r.color, m.rarity === 'common' ? 0.32 : 0.6));
        p.nm.textContent = m.name;
        const tab = this._tabList().find(t => t.id === m.tab);
        p.kt.textContent = tab ? tab.name : '';
        p.rr.textContent = hsuiRarName(m.rarity);
        if (p.imgId !== m.id) {
            p.imgId = m.id;
            p.priceKey = ''; p.adcKey = ''; p.actKey = '';
            p.img.innerHTML = '';
            hsuiIcon(m.item.icon, p.img, r.color, m.tab);
            p.el.querySelectorAll('.hs-stage .hs-spk').forEach(s => { /** @type {HTMLElement} */ (s).style.display = m.rarity === 'common' ? 'none' : ''; });
            p.hint.classList.remove('on');
            if (swap) { p.img.classList.remove('swap'); void p.img.offsetWidth; p.img.classList.add('swap'); }
        }
        this._prevState();
    },

    /** Состояние выбранного: плашка, цена или прогресс, подсказка, кнопки. Каждую секунду — без лишних перерисовок. */
    _prevState() {
        const p = this.prev, m = this._model();
        if (!p || !m) return;
        // плашка: закрыто / куплено / надето
        const sk = m.equipped ? 'eq' : m.owned ? 'own' : 'lock';
        if (p.stateKey !== sk) {
            p.stateKey = sk;
            p.state.className = 'hs-prev-state ' + sk;
            p.state.innerHTML = (sk === 'lock' ? HSUI_ICON.lock : HSUI_ICON.check) + '<span></span>';
            p.state.lastElementChild.textContent = Lang.t(sk === 'eq' ? 'ui.wearing' : sk === 'own' ? 'ui.bought' : 'ui.locked');
        }
        // цена или прогресс
        const pk = [m.id, m.state, m.kind, m.progress, m.need, m.affordable ? 1 : 0].join('|');
        if (p.priceKey !== pk) {
            const was = p.priceKey.split('|');
            p.priceKey = pk;
            p.price.innerHTML = '';
            p.price.className = 'hs-prev-price hs-o';
            p.price.hidden = m.owned;   // куплено / надето уже сказано плашкой на иконке и кнопкой
            if (m.owned) { /* цена не нужна */ }
            else if (m.kind === 'coins') {
                hsuiImg('assets/ui/icon-coin.webp', '', p.price);
                hsuiEl('span', '', p.price).textContent = hsuiFmt(m.price);
                p.price.classList.toggle('cant', !m.affordable);
            } else if (m.kind === 'ads') {
                p.price.classList.add('ad');
                p.price.style.setProperty('--p', (m.need ? m.progress / m.need : 0).toFixed(3));
                hsuiEl('span', '', p.price).textContent = Lang.t('ui.adProg', { a: m.progress, b: m.need });
                const bar = hsuiEl('div', 'bar', p.price);
                hsuiEl('i', '', bar);
                if (was[0] === m.id && was[3] !== String(m.progress)) { void p.price.offsetWidth; p.price.classList.add('bump'); }
            } else if (m.kind === 'exclusive') {
                p.price.classList.add('ex');
                p.price.innerHTML = HSUI_ICON.gift + '<span></span>';
                p.price.lastElementChild.textContent = Lang.t('ui.exclusive');
            }
        }
        // подсказка: нет денег, «Через N с», реклама недоступна (не для эксклюзива: там это не ошибка)
        let hintText = m.kind === 'exclusive' ? '' : (m.hint || '');
        if (m.action === 'watch' && /\d/.test(m.actionLabel || '')) hintText = '';   // «Через N с» уже на кнопке
        if (!this._timers.get(p.hint)) {
            p.hint.textContent = hintText;
            p.hint.classList.toggle('on', !!hintText);
            p.hint.classList.remove('good', 'neutral');
        }
        // «+монеты за рекламу», когда не хватает на предмет
        const showAd = m.kind === 'coins' && !m.owned && !m.affordable && hsuiAdsOn();
        const wait = hsuiAdWait(), ready = hsuiAdReady();
        const ak = showAd + '|' + wait + '|' + ready;
        if (p.adcKey !== ak) {
            p.adcKey = ak;
            p.adc.hidden = !showAd;
            if (showAd) {
                const n = hsuiAdAmount('coins');
                p.adc.innerHTML = (wait ? '' : HSUI_ICON.playY) + '<img src="assets/ui/icon-coin.webp" alt=""><span class="t"></span>';
                p.adc.lastElementChild.textContent = wait ? wait.toUpperCase() : Lang.t('ui.coinsAd', { n: hsuiFmt(n) }).toUpperCase();
                p.adc.classList.toggle('off', !ready);
            }
        }
        this._actApply(p.act, m, 'hs-btn hs-act hs-shine', p);
        this._peekFill(m);
    },

    /** Что показать на главной кнопке по модели карточки. */
    _actCfg(m) {
        if (this._shopBusy || m.busy) return { text: Lang.t('ui.adRunning'), cls: 'off busy', icon: '' };
        if (m.action === 'buy') return { text: Lang.t('ui.buy'), cls: m.enabled ? '' : 'off', icon: HSUI_ICON.cart };
        if (m.action === 'watch') {
            const wait = /\d/.test(m.actionLabel || '') ? m.actionLabel : '';
            return { text: wait ? wait.toUpperCase() : Lang.t('ui.watchAd'), cls: 'yellow' + (m.enabled ? '' : ' off'), icon: m.enabled ? HSUI_ICON.playY : '' };
        }
        if (m.action === 'equip') return { text: Lang.t('ui.wear'), cls: 'blue', icon: m.tab === 'skin' ? HSUI_ICON.shirt : HSUI_ICON.check };
        if (m.action === 'unequip') return { text: Lang.t('ui.unequip'), cls: 'navy', icon: '' };
        if (m.equipped) return { text: Lang.t('ui.wearing'), cls: 'eq', icon: HSUI_ICON.check };
        if (m.kind === 'exclusive') return { text: Lang.t('ui.exclusive'), cls: 'yellow', icon: HSUI_ICON.gift };
        return { text: '', cls: 'off', icon: '' };
    },

    _actApply(btn, m, base, store) {
        const c = this._actCfg(m);
        const key = c.text + '|' + c.cls + '|' + (c.icon ? 1 : 0) + '|' + m.id;
        const holder = store || btn;
        if (holder.actKey === key) return;
        holder.actKey = key;
        btn.className = base + (c.cls ? ' ' + c.cls : '');
        const big = btn.classList.contains('hs-act') || btn.classList.contains('hs-peek-act');
        btn.innerHTML = c.icon + '<span class="t hs-o" style="--s:' + (big ? 2 : 1.5) + 'px;--ol:' + (/yellow/.test(c.cls) ? '#6e4300' : /blue|navy|eq/.test(c.cls) ? '#072e72' : '#0a4d19') + '"></span>';
        btn.lastElementChild.textContent = c.text;
        btn.setAttribute('aria-disabled', /off/.test(c.cls) ? 'true' : 'false');
    },

    _peekFill(m) {
        const pk = this.peek;
        if (!pk || !this._peekOn || !m) return;
        const r = hsuiRar(m.rarity);
        pk.el.style.setProperty('--rc', r.color);
        pk.nm.textContent = m.name;
        pk.rr.textContent = hsuiRarName(m.rarity);
        this._actApply(pk.act, m, 'hs-btn hs-shine hs-peek-act', pk);
        pk.hint.textContent = m.kind === 'exclusive' ? '' : (m.hint || '');
        pk.hint.classList.toggle('on', !!pk.hint.textContent);
    },

    _shopRefresh() {
        if (!this.shBody) return;
        this._wallet(true);
        if (this._shopState.tab === 'power') { for (const pc of this.pcards || []) this._powerFill(pc); return; }
        const S = hsuiShop();
        if (!S) return;
        for (const c of this.cards || []) { const m = S.card(c.id); if (m) this._cardFill(c, m); }
        this._prevState();
    },

    /** Нажатие главной кнопки: купить / открыть за рекламу / надеть / снять. */
    async _shopAct(id) {
        const S = hsuiShop();
        if (!S || !id || this._shopBusy) return;
        const m = S.card(id);
        if (!m) return;
        if (m.action === 'none') { if (m.kind === 'exclusive') { this.closeShop(); this.dailyOpen(); } return; }
        if (!m.enabled) { this._shopDenied(m); return; }
        hsuiSfx('click');
        this._shopBusy = true;
        this._prevState();
        let r = null;
        try { r = await S.act(id); } catch (e) { console.error('Shop.act:', e); r = { ok: false, reason: 'error' }; }
        this._shopBusy = false;
        const p = this.prev;
        if (r && r.ok) {
            const stage = p ? p.stage : null;
            if (m.action === 'buy') { hsuiSfx('buy'); if (p) this._buyFx(p.el); this._burst(stage || this.shop_el, 14); }
            else if (m.action === 'watch') {
                if (r.unlocked) {
                    hsuiSfx('buy');
                    if (p) { p.el.classList.remove('flash'); void p.el.offsetWidth; p.el.classList.add('flash'); this._hintOn(p.hint, Lang.t('ui.opened'), 'good'); }
                    this._burst(stage || this.shop_el, 26);
                } else { hsuiSfx('equip'); if (p) { p.price.classList.remove('bump'); void p.price.offsetWidth; p.price.classList.add('bump'); } this._burst(stage || this.shop_el, 8); }
            } else { hsuiSfx('equip'); if (p) { p.el.classList.remove('flash'); void p.el.offsetWidth; p.el.classList.add('flash'); } }
        } else if (r) {
            const rs = r.reason;
            if (rs === 'noCoins') this._shopDenied(m);
            else if (rs === 'busy' || rs === 'owned' || rs === 'none') { /* ничего: состояние обновится */ }
            else if (rs === 'cooldown') { /* «Через N с» уже на кнопке */ }
            else if (p) this._hintOn(p.hint, rs === 'adUnavailable' ? Shop.t('shop.adUnavailable') : rs === 'adFailed' ? Lang.t('ui.adFail') : Lang.t('ui.noBuy'));
            if (this.peek && this._peekOn && rs === 'adFailed') this._hintOn(this.peek.hint, Lang.t('ui.adFail'));
        }
        if (this._open === 'shop') this._shopRefresh();
    },

    /** Нет денег / реклама недоступна: кнопка трясётся, красная подсказка. */
    _shopDenied(m) {
        const p = this.prev;
        hsuiSfx('error');
        const text = m.kind === 'coins' ? Lang.t('ui.needCoins', { n: hsuiFmt(Math.max(1, m.price - hsuiCoins())) }) : (m.hint || Lang.t('ui.adNone'));
        if (p) { this._shake(p.act); this._hintOn(p.hint, text); }
        if (this.peek && this._peekOn) { this._shake(this.peek.act); this._hintOn(this.peek.hint, text); }
        if (m.kind === 'coins' && this.shCoin) this.shCoin.bump();
    },

    /** «+монеты за рекламу» под ценой, когда не хватает. */
    async _prevAdCoins(btn, hint) {
        const a = hsuiAds();
        if (!a || this._shopBusy) return;
        if (!hsuiAdReady()) { this._shake(btn); return; }
        this._shopBusy = true;
        btn.classList.add('off');
        this._holdWallet(true);
        let r = null;
        try { r = await a.coins(); } catch (e) { r = null; }
        this._shopBusy = false;
        if (r && r.ok) {
            hsuiSfx('buy');
            const from = btn.getBoundingClientRect();
            this._flyReward('coins', r.amount | 0, from, this.shCoin);
        } else { this._holdWallet(false); this._hintOn(hint, Lang.t('ui.adFail')); }
        if (this._open === 'shop') { if (this.prev) this.prev.adcKey = ''; this._shopRefresh(); }
    },

    /** Покупка: вспышка и монеты, улетающие из кошелька к товару. */
    _buyFx(target) {
        target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash');
        if (!this.root || typeof target.animate !== 'function' || !this.shCoin) return;
        const rr = this.root.getBoundingClientRect(), a = this.shCoin.el.getBoundingClientRect(), b = target.getBoundingClientRect();
        const sx = a.left - rr.left + a.width * 0.2, sy = a.top - rr.top + a.height / 2;
        const ex = b.left - rr.left + b.width / 2, ey = b.top - rr.top + b.height * 0.45;
        const n = hsuiReduced() ? 4 : 9;
        for (let i = 0; i < n; i++) {
            const c = hsuiEl('i', 'hs-fly', this.fxl);
            const ang = (i / n) * Math.PI * 2, rad = (26 + (i % 3) * 14) * this.u;
            const mx = ex + Math.cos(ang) * rad, my = ey + Math.sin(ang) * rad;
            const an = c.animate([
                { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(.5)', opacity: 0 },
                { transform: 'translate(' + (sx + (mx - sx) * 0.35) + 'px,' + (sy + (my - sy) * 0.35 - 30 * this.u) + 'px) scale(1.2)', opacity: 1, offset: 0.3 },
                { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1)', opacity: 1, offset: 0.7 },
                { transform: 'translate(' + (mx + Math.cos(ang) * 40 * this.u) + 'px,' + (my - 80 * this.u) + 'px) scale(.3)', opacity: 0 },
            ], { duration: 900, delay: i * 40, easing: 'ease-out', fill: 'both' });
            an.onfinish = () => c.remove();
            an.oncancel = () => c.remove();
        }
    },

    // ---- усиления (расходники) ----

    _mkPower(grid, it, i) {
        const r = hsuiRar(it.rarity);
        const el = hsuiEl('div', 'hs-pcard', grid);
        el.style.setProperty('--rc', r.color);
        el.style.setProperty('--rca', hsuiRgba(r.color, 0.5));
        el.style.setProperty('--i', String(i));
        hsuiEl('h3', 'hs-o', el).textContent = hsText(it.name);
        hsuiEl('p', '', el).textContent = hsText(it.desc);
        const stg = hsuiEl('div', 'stg', el);
        hsuiEl('div', 'hs-glow', stg);
        const pf = hsuiEl('div', 'hs-platform', stg);
        hsuiEl('i', '', pf);
        const pi = hsuiEl('div', 'pi', stg);
        hsuiIcon(it.icon, pi, r.color, 'power');
        const pk = hsuiEl('div', 'pk', el);
        hsuiEl('span', 'hs-o', pk).textContent = Lang.t('ui.pack', { n: it.pack || 1 });
        const have = hsuiEl('span', 'have', pk);
        const pr = hsuiEl('div', 'pr hs-o', el);
        pr.style.setProperty('--s', '1.5px');
        const hint = hsuiEl('div', 'hs-hint', el);
        const buy = hsuiBtn('hs-btn hs-shine', el, HSUI_ICON.cart + '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        buy.lastElementChild.textContent = Lang.t('ui.buy');
        const ad = hsuiBtn('hs-btn yellow ad', el, HSUI_ICON.playY + '<span class="t hs-o" style="--s:1.5px;--ol:#6e4300"></span>');
        const rec = { it, el, have, pr, hint, buy, ad, haveN: -1, key: '' };
        this.pcards.push(rec);
        this._bind(buy, () => this._buyPower(rec), false);
        this._bind(ad, () => this._adPower(rec), false);
    },

    _powerFill(pc) {
        const G = /** @type {any} */ (hsuiGame()), n = G && G.save && G.save.power ? G.save.power[pc.it.id] | 0 : 0;
        const price = pc.it.price && pc.it.price.coins ? pc.it.price.coins : 0;
        const can = hsuiCoins() >= price;
        const wait = hsuiAdWait(), ready = hsuiAdReady(), on = hsuiAdsOn();
        const key = [n, price, can, wait, ready, on].join('|');
        if (pc.key === key) return;
        const bump = pc.haveN >= 0 && n > pc.haveN;
        pc.key = key; pc.haveN = n;
        pc.have.textContent = Lang.t('ui.have', { n });
        if (bump) { pc.have.classList.remove('bump'); void pc.have.offsetWidth; pc.have.classList.add('bump'); }
        pc.pr.innerHTML = '';
        hsuiImg('assets/ui/icon-coin.webp', '', pc.pr);
        hsuiEl('span', '', pc.pr).textContent = hsuiFmt(price);
        pc.pr.classList.toggle('cant', !can);
        pc.buy.classList.toggle('off', !can);
        pc.ad.hidden = !on;
        pc.ad.classList.toggle('off', !ready);
        pc.ad.innerHTML = (wait ? '' : HSUI_ICON.playY) + '<span class="t hs-o" style="--s:1.5px;--ol:#6e4300"></span>';
        pc.ad.lastElementChild.textContent = wait ? wait.toUpperCase() : Lang.t('ui.forAd') + ' ' + Lang.t('ui.pack', { n: pc.it.pack || 1 });
    },

    _buyPower(pc) {
        const G = /** @type {any} */ (hsuiGame());
        hsuiSfx('click');
        let r = null;
        try { r = G && G.shop && G.shop.buyPowerup ? G.shop.buyPowerup(pc.it.id) : null; } catch (e) { r = null; }
        if (r && r.ok) { hsuiSfx('buy'); this._buyFx(pc.el); this._burst(pc.el, 12); this._shopRefresh(); }
        else {
            hsuiSfx('error');
            this._shake(pc.buy);
            const price = pc.it.price && pc.it.price.coins ? pc.it.price.coins : 0;
            this._hintOn(pc.hint, hsuiCoins() < price ? Lang.t('ui.needCoins', { n: hsuiFmt(price - hsuiCoins()) }) : Lang.t('ui.noBuy'));
            if (this.shCoin) this.shCoin.bump();
        }
    },

    async _adPower(pc) {
        const a = hsuiAds();
        if (!a || this._shopBusy) return;
        if (!hsuiAdReady()) { this._shake(pc.ad); return; }
        this._shopBusy = true;
        pc.ad.classList.add('off');
        let r = null;
        try { r = await a.powerup(pc.it.id); } catch (e) { r = null; }
        this._shopBusy = false;
        if (r && r.ok) { hsuiSfx('buy'); this._burst(pc.el, 14); pc.el.classList.remove('flash'); void pc.el.offsetWidth; pc.el.classList.add('flash'); }
        else this._hintOn(pc.hint, Lang.t(r && r.reason === 'cooldown' ? 'ui.adNone' : 'ui.adFail'));
        pc.key = '';
        if (this._open === 'shop') this._shopRefresh();
    },

    // =====================================================================================
    // Подарок дня (7 дней)
    // =====================================================================================

    _dgBusy: false,

    /** Награда дня (монеты, кристаллы, предмет, случайный предмет) — плашки с иконками. mult 2 — с удвоением. */
    _chipsInto(parent, rw, mult) {
        const S = hsuiShop(), m = mult || 1;
        if (rw.coins > 0) {
            const c = hsuiEl('div', 'rc coin', parent);
            hsuiImg('assets/ui/icon-coin.webp', '', c);
            hsuiEl('b', '', c).textContent = hsuiFmt(rw.coins * m);
        }
        if (rw.gems > 0) {
            const c = hsuiEl('div', 'rc gem', parent);
            hsuiImg('assets/ui/icon-gem.webp', '', c);
            hsuiEl('b', '', c).textContent = hsuiFmt(rw.gems * m);
        }
        if (rw.item) {
            const it = S ? S.item(rw.item) : null;
            const c = hsuiEl('div', 'rc item', parent);
            hsuiIcon(it ? it.icon : '', c, it ? hsuiRar(it.rarity).color : '#8fb6d9', it ? it.tab : '');
        }
        if (rw.randomItems > 0) {
            const n = rw.randomItems * m;
            const c = hsuiEl('div', 'rc', parent, HSUI_ICON.giftQ);
            if (n > 1) hsuiEl('b', '', c).textContent = '×' + n;
        }
    },

    _buildDaily() {
        const win = hsuiEl('div', 'hs-screen hs-win hs-dg-win', this.root);
        this.daily_el = win;
        const pn = hsuiEl('div', 'hs-panel hs-dgwin hs-a', win);
        pn.style.setProperty('--d', '0');
        const head = hsuiEl('div', 'hs-dg-head', pn);
        hsuiBig(Lang.t('ui.dg.title'), 'hs-dg-title', head);
        const wal = hsuiEl('div', 'hs-sh-wallet', head);
        this.dgCoin = this._counter(wal, 'assets/ui/icon-coin.webp', '');
        this.dgGem = this._counter(wal, 'assets/ui/icon-gem.webp', '');
        const close = hsuiBtn('hs-tool close', head);
        close.setAttribute('aria-label', Lang.t('ui.close'));
        this._bind(close, () => this.closeDaily());
        const body = hsuiEl('div', 'hs-dg-body', pn);
        const days = hsuiEl('div', 'hs-dg-days', body);
        this.dgDays = [];
        for (let d = 1; d <= 6; d++) {
            const el = hsuiEl('div', 'hs-dg-day', days);
            el.style.setProperty('--i', String(d - 1));
            const t = hsuiEl('div', 'dt', el);
            const r = hsuiEl('div', 'dr', el);
            const s = hsuiEl('div', 'ds', el);
            hsuiEl('div', 'ck', el, HSUI_ICON.check);
            this.dgDays.push({ el, t, r, s, key: '' });
        }
        const g = hsuiEl('div', 'hs-dg-goal', body);
        const gt = hsuiEl('div', 'gt', g);
        const gs = hsuiEl('div', 'gs', g);
        hsuiEl('div', 'rays', gs);
        const gi = hsuiEl('div', 'gi', gs);
        const gn = hsuiEl('div', 'gn hs-o', g);
        gn.style.setProperty('--s', '1.5px');
        const gh = hsuiEl('div', 'gh', g);
        const gds = hsuiEl('div', 'ds', g);
        this.dgGoal = { el: g, gt, gs, gi, gn, gh, ds: gds, key: '' };
        const foot = hsuiEl('div', 'hs-dg-foot', pn);
        this.dgClaim = hsuiBtn('hs-btn hs-shine hs-dg-claim', foot, '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        this.dgX2 = hsuiBtn('hs-btn yellow hs-shine hs-dg-x2', foot);
        this._bind(this.dgClaim, () => this._dailyClaim(), false);
        this._bind(this.dgX2, () => this._dailyX2(), false);
        this.dgNext = hsuiEl('div', 'hs-dg-next', pn);
        this.dgHint = hsuiEl('div', 'hs-hint', pn);
        this.dgX2Key = '';
        win.addEventListener('click', e => { if (e.target === win) this.closeDaily(); });
    },

    /** Открыть окно подарка дня. false — нельзя сейчас (туториал, идёт раунд, другое окно, модуль не готов). */
    dailyOpen() {
        if (!this.root) return false;
        const D = typeof DailyGift !== 'undefined' ? DailyGift : null;
        if (!D || !D._rewards || !D._rewards.length) return false;
        try { if (typeof Tutorial !== 'undefined' && Tutorial.active) return false; } catch (e) { /* без туториала */ }
        if (this._hudOn) return false;
        if (this._open === 'daily') return true;
        if (this._open) return false;
        if (!this.daily_el) this._buildDaily();
        this._popClose();
        this._from = this._resultOn && !this._menuWanted ? 'result' : 'menu';
        this._open = 'daily';
        if (this._from === 'result') this._show(this.result_el, false); else this._menuHide(false);
        this._wallet(false);
        this._dgBusy = false;
        this.dgX2Key = '';
        this._dailyFill(true);
        this._show(this.daily_el, true);
        try { D.markOffered(); } catch (e) { /* не критично */ }
        hsuiSfx('whoosh');
        return true;
    },

    closeDaily() {
        if (this._open !== 'daily' || this._dgBusy || this._prz) return;
        this._open = '';
        this._show(this.daily_el, false);
        this._back();
    },

    _dailyFill(force) {
        const D = typeof DailyGift !== 'undefined' ? DailyGift : null;
        if (!D || !this.daily_el || this._open !== 'daily') return;
        let v = null;
        try { v = D.view(); } catch (e) { return; }
        const S = hsuiShop();
        const days = v.days;
        for (let i = 0; i < 6; i++) {
            const d = days[i], c = this.dgDays[i];
            if (!d || !c) continue;
            const key = d.state + '|' + JSON.stringify(d.reward) + '|' + Lang.code;
            if (!force && c.key === key) continue;
            c.key = key;
            c.el.className = 'hs-dg-day ' + d.state;
            c.t.textContent = d.dayLabel.toUpperCase();
            c.r.innerHTML = '';
            this._chipsInto(c.r, d.reward, 1);
            const label = d.state === 'today' ? Lang.t('ui.dg.today') : d.state === 'tomorrow' ? Lang.t('ui.dg.tomorrow') : d.state === 'claimed' ? Lang.t('ui.dg.got') : '';
            c.s.textContent = label;
            c.s.hidden = !label;
        }
        // 7-й день: эксклюзивный скин — цель
        const g7 = days[6], G = this.dgGoal;
        if (g7 && G) {
            const skinId = g7.skin || v.goal || '';
            const key = g7.state + '|' + skinId + '|' + (g7.reward.coins || 0) + '|' + v.nextDay + '|' + v.canClaim;
            if (force || G.key !== key) {
                G.key = key;
                G.el.className = 'hs-dg-goal ' + g7.state;
                const it = skinId && S ? S.item(skinId) : null;
                const col = hsuiRar(it ? it.rarity : 'mythic').color;
                G.el.style.setProperty('--rc', col);
                G.el.style.setProperty('--rca', hsuiRgba(col, 0.5));
                G.gt.innerHTML = '';
                hsuiEl('span', 'hs-o', G.gt).textContent = g7.dayLabel.toUpperCase();
                hsuiEl('b', 'hs-o', G.gt).textContent = Lang.t(it ? 'ui.dg.excl' : 'ui.dg.big');
                G.gi.innerHTML = '';
                G.gn.hidden = false;
                if (it) {
                    hsuiIcon(it.icon, G.gi, col, it.tab);
                    G.gn.textContent = S.name(skinId);
                    G.gh.textContent = Lang.t('ui.dg.goalSub');
                } else {
                    const big = hsuiEl('div', 'big hs-o', G.gi);
                    hsuiImg('assets/ui/icon-coin.webp', '', big);
                    hsuiEl('span', '', big).textContent = hsuiFmt(g7.reward.coins || 0);
                    G.gn.textContent = Lang.t('ui.dg.big');
                    G.gh.textContent = '';
                }
                let left = 0;
                if (g7.state !== 'claimed') { left = v.canClaim ? 7 - v.nextDay : 8 - v.nextDay; }
                G.ds.textContent = g7.state === 'today' ? Lang.t('ui.dg.today') : g7.state === 'claimed' ? Lang.t('ui.dg.got') : g7.state === 'tomorrow' ? Lang.t('ui.dg.tomorrow') : Lang.t('ui.dg.in', { n: Math.max(1, left) });
            }
        }
        // кнопки
        const can = !!v.canClaim, busy = this._dgBusy;
        const ck = can + '|' + busy;
        if (force || this.dgClaimKey !== ck) {
            this.dgClaimKey = ck;
            this.dgClaim.classList.toggle('off', !can || busy);
            this.dgClaim.lastElementChild.textContent = can ? Lang.t('ui.dg.claim') : Lang.t('ui.dg.done');
        }
        const x2 = v.x2;
        const showX2 = can && x2.available;
        this.dgX2.hidden = !showX2;
        if (showX2) {
            const wait = x2.label !== D.t('daily.claimX2') ? x2.label : '';
            const today = days.find(d => d.state === 'today');
            const off = !x2.enabled || busy;
            const k = [wait, off, busy, JSON.stringify(today ? today.reward : 0)].join('|');
            if (force || this.dgX2Key !== k) {
                this.dgX2Key = k;
                this.dgX2.classList.toggle('off', off);
                this.dgX2.innerHTML = '';
                const row = hsuiEl('div', 'row', this.dgX2, (wait ? '' : HSUI_ICON.playY) + '<span class="t hs-o" style="--s:1.5px;--ol:#6e4300"></span>');
                row.lastElementChild.textContent = busy ? Lang.t('ui.adRunning') : wait ? wait.toUpperCase() : Lang.t('ui.dg.x2');
                if (!wait && today) {
                    const sub = hsuiEl('div', 'sub', this.dgX2);
                    const rw = today.reward;
                    if (rw.coins > 0) { const s = hsuiEl('span', '', sub); hsuiImg('assets/ui/icon-coin.webp', '', s); hsuiEl('b', '', s).textContent = hsuiFmt(rw.coins * 2); }
                    if (rw.gems > 0) { const s = hsuiEl('span', '', sub); hsuiImg('assets/ui/icon-gem.webp', '', s); hsuiEl('b', '', s).textContent = hsuiFmt(rw.gems * 2); }
                    if (rw.randomItems > 0) { const s = hsuiEl('span', '', sub, HSUI_ICON.giftQ); hsuiEl('b', '', s).textContent = '×' + (rw.randomItems * 2); }
                }
            }
        }
        this.dgNext.textContent = can ? '' : Lang.t('ui.dg.next', { t: D.formatTime(v.msToNext) });
        // пояснение (день 7: «без удвоения»; нет рекламы), пока нет временной ошибки
        if (!this._timers.get(this.dgHint)) {
            const wait = x2.label !== D.t('daily.claimX2') ? x2.label : '';
            const ht = can ? (x2.hint && x2.hint !== wait ? x2.hint : '') : '';
            this.dgHint.textContent = ht;
            this.dgHint.classList.toggle('on', !!ht);
            this.dgHint.classList.add('neutral');
        }
    },

    _dailyClaim() {
        const D = DailyGift;
        if (this._dgBusy) return;
        let can = false;
        try { can = D.canClaim(); } catch (e) { can = false; }
        if (!can) { this._shake(this.dgClaim); return; }
        this._dgBusy = true;
        this._holdWallet(true);
        let r = null;
        try { r = D.claim(); } catch (e) { console.error('DailyGift.claim:', e); r = null; }
        this._dgBusy = false;
        if (!r || !r.ok) { this._holdWallet(false); this._dailyFill(true); return; }
        this._dailyDone(r);
    },

    async _dailyX2() {
        const D = DailyGift;
        if (this._dgBusy) return;
        let v = null;
        try { v = D.view(); } catch (e) { return; }
        if (!v.x2.enabled) { this._shake(this.dgX2); hsuiSfx('error'); return; }
        this._dgBusy = true;
        this._holdWallet(true);
        this._dailyFill(true);
        let r = null;
        try { r = await D.claimX2(); } catch (e) { console.error('DailyGift.claimX2:', e); r = null; }
        this._dgBusy = false;
        if (r && r.ok) { this._dailyDone(r); return; }
        this._holdWallet(false);
        this.dgX2Key = '';
        this._dailyFill(true);
        const rs = r ? r.reason : '';
        if (rs === 'claimed') return;
        this._hintOn(this.dgHint, rs === 'adFailed' ? Lang.t('ui.adFail').replace(/ Прогресс.*$/, '') + ' ' + (Lang.code === 'en' ? 'You can still claim the gift.' : 'Подарок можно забрать без неё.') : Lang.t('ui.adNone'), 'neutral');
    },

    _dailyDone(r) {
        this.dgX2Key = '';
        this._dailyFill(true);
        hsuiSfx('equip');
        this._prize({ title: Lang.t('ui.got'), items: this._gotItems(r.got, r.reward && r.reward.gems ? r.reward.gems * (r.mult || 1) : 0), note: r.mult === 2 ? 'x2' : '' });
    },

    // =====================================================================================
    // Колесо фортуны
    // =====================================================================================

    _whBusy: false,
    _whAngle: 0,

    _buildWheel() {
        const win = hsuiEl('div', 'hs-screen hs-win hs-wh-win', this.root);
        this.wheel_el = win;
        const pn = hsuiEl('div', 'hs-panel hs-whwin hs-a', win);
        pn.style.setProperty('--d', '0');
        const head = hsuiEl('div', 'hs-wh-head', pn);
        hsuiBig(Lang.t('ui.wh.title'), 'hs-wh-title', head);
        const wal = hsuiEl('div', 'hs-sh-wallet', head);
        this.whCoin = this._counter(wal, 'assets/ui/icon-coin.webp', '');
        this.whGem = this._counter(wal, 'assets/ui/icon-gem.webp', '');
        const close = hsuiBtn('hs-tool close', head);
        close.setAttribute('aria-label', Lang.t('ui.close'));
        this._bind(close, () => this.closeWheel());
        const area = hsuiEl('div', 'hs-wh-area', pn);
        const stage = hsuiEl('div', 'hs-wh-stage', area);
        this.whStage = stage;
        hsuiEl('div', 'hs-wh-rim', stage);
        this.whDisk = hsuiEl('div', 'hs-wh-disk', stage);
        hsuiEl('div', 'hs-wh-hub', stage);
        this.whPtr = hsuiEl('div', 'hs-wh-ptr', stage, '<svg viewBox="0 0 48 56"><path d="M24 54L5.6 21C-.6 9.6 7.6 1.6 24 1.6s24.6 8 18.4 19.4z" fill="#ff3347" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><circle cx="24" cy="19" r="6.5" fill="#fff"/></svg>');
        const side = hsuiEl('div', 'hs-wh-side', pn);
        this.whInfo = hsuiEl('div', 'hs-wh-info hs-inset', side);
        this.whFree = hsuiBtn('hs-btn hs-shine', side, '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        this.whAd = hsuiBtn('hs-btn yellow hs-shine hs-wh-ad', side);
        this.whHint = hsuiEl('div', 'hs-hint', side);
        this._bind(this.whFree, () => this._wheelSpin('free'), false);
        this._bind(this.whAd, () => this._wheelSpin('ad'), false);
        this.whKey = '';
        win.addEventListener('click', e => { if (e.target === win) this.closeWheel(); });
    },

    wheelOpen() {
        if (!this.root) return false;
        const W = typeof Wheel !== 'undefined' ? Wheel : null;
        if (!W || !W._sectors || W._sectors.length < 2) return false;
        try { if (typeof Tutorial !== 'undefined' && Tutorial.active) return false; } catch (e) { /* без туториала */ }
        if (this._hudOn) return false;
        if (this._open === 'wheel') return true;
        if (this._open) return false;
        if (!this.wheel_el) this._buildWheel();
        this._popClose();
        this._from = this._resultOn && !this._menuWanted ? 'result' : 'menu';
        this._open = 'wheel';
        if (this._from === 'result') this._show(this.result_el, false); else this._menuHide(false);
        this._wallet(false);
        this._whBusy = false;
        this._wheelBuildDisk();
        this.whKey = '';
        this._wheelRefresh(true);
        this._show(this.wheel_el, true);
        this._wheelSize();
        hsuiSfx('whoosh');
        // вращение, чей приз ещё не выдан (вкладку закрыли): диск встаёт на сектор, приз выдаётся один раз
        try {
            const pend = W.pendingSpin();
            if (pend) {
                this._whAngle = W.angleFrom(0, pend) % 360;
                this._wheelSet(this._whAngle);
                this._wheelFinish();
            }
        } catch (e) { console.error('Wheel pending:', e); }
        return true;
    },

    closeWheel() {
        if (this._open !== 'wheel' || this._whBusy || this._prz) return;
        this._open = '';
        this._show(this.wheel_el, false);
        this._back();
    },

    /** Размер диска в px: по ширине колонки и по высоте экрана (в портрете под диском ещё кнопки). */
    _wheelSize() {
        const st = this.whStage;
        if (!st || !this.W) return;
        const aw = st.parentElement ? st.parentElement.clientWidth : 300;
        const reserve = this.portrait ? 330 * this.u : 118 * this.u;
        const ds = hsuiClamp(Math.min(aw - 12, this.H * 0.96 - reserve), 120, 600);
        st.style.setProperty('--ds', ds.toFixed(0) + 'px');
    },

    _wheelSet(a) {
        this.whDisk.style.transform = 'rotate(' + a.toFixed(2) + 'deg)';
    },

    /** Диск: секторы с призами (монеты, кристаллы, предмет — иконка), собирается заново при каждом открытии. */
    _wheelBuildDisk() {
        const W = Wheel, S = hsuiShop();
        const secs = W.sectors(), n = secs.length, step = 360 / n;
        const pal = ['#ff5d6c', '#ffb02e', '#3fc7ff', '#6ee86a', '#b66bff', '#ff8ad0', '#ffd23d', '#4f8bff'];
        const disk = this.whDisk;
        disk.innerHTML = '';
        this.whDiskN = n;
        let svg = '<svg viewBox="-100 -100 200 200">';
        for (let i = 0; i < n; i++) {
            let col = pal[i % pal.length];
            if (i === n - 1 && n % pal.length === 1) col = pal[3];
            svg += '<path class="wd" data-i="' + i + '" d="' + hsuiWedge(100, (i - 0.5) * step, (i + 0.5) * step) + '" fill="' + col + '"/>';
        }
        svg += '<circle r="100" fill="url(#hsw)" pointer-events="none"/><defs><radialGradient id="hsw"><stop offset="55%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".28"/></radialGradient></defs></svg>';
        disk.insertAdjacentHTML('afterbegin', svg);
        secs.forEach((s, i) => {
            const kind = s.kind === 'item' ? 'item' : (s.prize && s.prize.type === 'gems') || (s.data && s.data.gems > 0 && !(s.coins > 0)) ? 'gems' : 'coins';
            const pz = hsuiEl('div', 'hs-wh-pz' + (kind === 'item' ? ' item' : ''), disk);
            pz.style.transform = 'rotate(' + (i * step).toFixed(2) + 'deg)';
            const inn = hsuiEl('div', 'in', pz);
            if (kind === 'item') {
                const it = S ? S.item(s.itemId) : null;
                const col = hsuiRar(it ? it.rarity : 'common').color;
                pz.style.setProperty('--rc', col);
                const ring = hsuiEl('div', 'ring', inn);
                hsuiIcon(it ? it.icon : '', ring, col, it ? it.tab : '');
            } else {
                const amount = kind === 'gems' ? ((s.prize && s.prize.amount) || (s.data && s.data.gems) || 0) : (s.coins || (s.prize && s.prize.amount) || 0);
                hsuiImg(kind === 'gems' ? 'assets/ui/icon-gem.webp' : 'assets/ui/icon-coin.webp', '', inn);
                hsuiEl('b', '', inn).textContent = hsuiFmt(amount);
            }
        });
        this._wheelSet(this._whAngle);
    },

    _wheelRefresh(force) {
        const W = typeof Wheel !== 'undefined' ? Wheel : null;
        if (!W || !this.wheel_el || this._open !== 'wheel') return;
        let st = null;
        try { st = W.status(); } catch (e) { return; }
        const busy = this._whBusy;
        const wait = !st.canSpinAd ? (hsuiAdWait() || '') : '';
        const k = [st.canSpinFree, st.canSpinAd, st.nextFreeLabel, st.adLeft, st.banked, st.adLimit, wait, busy, st.hint, st.freeAvailable].join('|');
        if (!force && this.whKey === k) return;
        this.whKey = k;
        this.whInfo.innerHTML = '';
        if (st.freeAvailable) hsuiEl('b', 'hs-o', this.whInfo).textContent = Lang.t('ui.wh.ready');
        else {
            hsuiEl('span', '', this.whInfo).textContent = Lang.t('ui.wh.nextFree');
            hsuiEl('b', 'hs-o', this.whInfo).textContent = st.nextFreeLabel;
        }
        // бесплатное вращение
        const fo = !st.canSpinFree || busy;
        this.whFree.classList.toggle('off', fo);
        this.whFree.lastElementChild.textContent = busy ? Lang.t('ui.wh.spinning') : st.freeAvailable ? Lang.t('ui.wh.free') : Lang.t('ui.wh.freeIn', { t: st.nextFreeLabel });
        // вращение за рекламу
        const left = st.adLeft + st.banked;
        this.whAd.classList.toggle('off', !st.canSpinAd || busy);
        this.whAd.innerHTML = '';
        const row = hsuiEl('div', 'row', this.whAd, (wait || busy ? '' : HSUI_ICON.playY) + '<span class="t hs-o" style="--s:1.5px;--ol:#6e4300"></span>');
        row.lastElementChild.textContent = wait ? wait.toUpperCase() : Lang.t('ui.wh.ad');
        hsuiEl('div', 'sub', this.whAd).textContent = Lang.t('ui.wh.left', { a: left, b: st.adLimit });
        // пояснение: вращения кончились, реклама недоступна
        if (!this._timers.get(this.whHint)) {
            const ht = busy ? '' : (st.hint && st.hint !== wait ? st.hint : '');
            this.whHint.textContent = ht;
            this.whHint.classList.toggle('on', !!ht);
            this.whHint.classList.add('neutral');
        }
    },

    async _wheelSpin(kind) {
        const W = Wheel;
        if (this._whBusy) return;
        let st = null;
        try { st = W.status(); } catch (e) { return; }
        if (kind === 'free' ? !st.canSpinFree : !st.canSpinAd) { this._shake(kind === 'free' ? this.whFree : this.whAd); hsuiSfx('error'); return; }
        this._whBusy = true;
        this._holdWallet(true);
        this._wheelRefresh(true);
        let r = null;
        try { r = kind === 'ad' ? await W.spinAd() : W.spinFree(); } catch (e) { console.error('Wheel spin:', e); r = { ok: false, reason: 'error' }; }
        if (!r || !r.ok) {
            this._whBusy = false;
            this._holdWallet(false);
            this._wheelRefresh(true);
            const rs = r ? r.reason : '';
            if (rs === 'adFailed') this._hintOn(this.whHint, Lang.t('ui.adFail').replace(/ Прогресс.*$/, ''), 'neutral');
            else if (rs && rs !== 'cooldown' && rs !== 'busy') this._hintOn(this.whHint, Lang.t('ui.adNone'), 'neutral');
            return;
        }
        this.whKey = '';
        this._wheelRefresh(true);
        hsuiSfx('go');
        await this._wheelAnimate(r);
        this._wheelFinish(r);
    },

    /** Диск крутится до r.angle за r.durationMs (замедление к концу), на каждом секторе под стрелкой — щелчок. */
    _wheelAnimate(r) {
        const W = Wheel;
        const from = this._whAngle, to = W.angleFrom(from, r);
        const dur = hsuiReduced() ? Math.min(1200, r.durationMs || 5500) : (r.durationMs || 5500);
        return new Promise(resolve => {
            let t0 = 0, last = W.sectorAt(from), lastTick = 0, finished = false;
            const end = () => {
                if (finished) return;
                finished = true;
                this._whAngle = to;
                this._wheelSet(to);
                resolve(undefined);
            };
            const frame = (now) => {
                if (finished) return;
                if (!t0) t0 = now;
                const p = hsuiClamp((now - t0) / dur, 0, 1);
                const e = 1 - Math.pow(1 - p, 4);
                const a = from + (to - from) * e;
                this._wheelSet(a);
                const idx = W.sectorAt(a);
                if (idx !== last) {
                    last = idx;
                    if (now - lastTick > 70) { lastTick = now; hsuiSfx('tick'); }
                    if (this.whPtr) { this.whPtr.classList.remove('flick'); void this.whPtr.offsetWidth; this.whPtr.classList.add('flick'); }
                }
                if (p < 1) requestAnimationFrame(frame); else end();
            };
            requestAnimationFrame(frame);
            window.setTimeout(end, dur + 1200);   // запасной выход, если вкладка была скрыта
        });
    },

    /** Анимация кончилась: Wheel.finish() начисляет приз один раз, окно приза и монеты в счётчик. */
    _wheelFinish(r) {
        const W = Wheel;
        let f = null;
        try { f = W.finish(); } catch (e) { console.error('Wheel.finish:', e); }
        this._whBusy = false;
        if (!f || !f.ok) { this._holdWallet(false); this._wheelRefresh(true); return; }
        this._holdWallet(true);
        const sec = f.sector != null ? f.sector : (r ? r.sector : -1);
        const sd = W._sectors[sec];   // кристаллы сектора выдаёт Game по событию prize, в got их нет
        const gemsWon = sd && sd.gems > 0 ? sd.gems | 0 : 0;
        const wd = this.whDisk.querySelector('.wd[data-i="' + sec + '"]');
        if (wd) wd.classList.add('win');
        hsuiSfx('equip');
        this._burst(this.whDisk, 20);
        window.setTimeout(() => {
            if (wd) wd.classList.remove('win');
            this._prize({ title: Lang.t('ui.wh.win'), items: this._gotItems(f.got, gemsWon), onClose: () => { this._wheelBuildDisk(); this.whKey = ''; this._wheelRefresh(true); } });
        }, 900);
        this.whKey = '';
        this._wheelRefresh(true);
    },

    // =====================================================================================
    // Предложения посреди раунда: «Тебя поймали» и «Время вышло»
    // =====================================================================================

    /**
     * @param {'revive'|'time'} kind
     * @param {{ seconds?: number, onAccept?: () => Promise<boolean> | boolean, onDecline?: () => void }} o
     */
    offer(kind, o) {
        o = o || {};
        if (!this.root) { if (o.onDecline) o.onDecline(); return; }
        this._offerEnd(this._offerRec, 'silent');
        if (!hsuiAdsOn()) { if (o.onDecline) o.onDecline(); return; }
        kind = kind === 'time' ? 'time' : 'revive';
        const total = Math.max(3, Number(o.seconds) || 7);
        const el = hsuiEl('div', 'hs-offer ' + kind, this.root);
        const card = hsuiEl('div', 'hs-panel hs-of-card', el);
        const ring = hsuiEl('div', 'hs-of-ring', card, '<svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="46"/><circle class="tr" cx="50" cy="50" r="38"/><circle class="pg" cx="50" cy="50" r="38" stroke-dasharray="238.76" stroke-dashoffset="0"/></svg><b class="hs-o"></b>');
        const num = /** @type {HTMLElement} */ (ring.querySelector('b'));
        num.style.setProperty('--s', '2px');
        const pg = /** @type {SVGElement} */ (ring.querySelector('.pg'));
        hsuiBig(Lang.t('offer.' + kind + '.t'), 'hs-of-title', card);
        hsuiEl('div', 'hs-of-sub hs-o', card).textContent = Lang.t('offer.' + kind + '.s');
        const go = hsuiBtn('hs-btn hs-shine go', card);
        const hint = hsuiEl('div', 'hs-hint', card);
        const no = hsuiBtn('hs-of-no', card);
        no.textContent = Lang.t('offer.no');
        const rec = { kind, el, ring, num, pg, go, no, hint, total, left: total, last: performance.now(), busy: false, done: false, o, raf: 0, key: '' };
        this._offerRec = rec;
        this._bind(go, async () => {
            if (rec.done || rec.busy) return;
            if (!hsuiAdReady()) { this._shake(go); hsuiSfx('error'); return; }
            rec.busy = true;
            this._offerRefresh();
            try { if (o.onAccept) await o.onAccept(); } catch (e) { console.error('GameUI.offer onAccept:', e); }
            rec.busy = false;
            this._offerEnd(rec, 'accept');
        }, false);
        this._bind(no, () => { if (!rec.busy) this._offerEnd(rec, 'decline'); }, true);
        this._offerRefresh();
        const loop = () => {
            if (rec.done) return;
            const now = performance.now();
            if (!rec.busy) rec.left -= Math.min(0.25, (now - rec.last) / 1000);
            rec.last = now;
            const f = hsuiClamp(rec.left / rec.total, 0, 1);
            pg.setAttribute('stroke-dashoffset', (238.76 * (1 - f)).toFixed(1));
            const s = Math.max(0, Math.ceil(rec.left));
            if (rec.num.textContent !== String(s)) rec.num.textContent = String(s);
            ring.classList.toggle('low', rec.left <= 3 && !rec.busy);
            if (rec.left <= 0 && !rec.busy) { this._offerEnd(rec, 'decline'); return; }
            rec.raf = requestAnimationFrame(loop);
        };
        rec.raf = requestAnimationFrame(loop);
        hsuiSfx('alarm');
    },

    _offerRefresh() {
        const r = this._offerRec;
        if (!r || r.done) return;
        const wait = hsuiAdWait(), ready = hsuiAdReady() && !r.busy;
        const key = wait + '|' + ready + '|' + r.busy;
        if (r.key === key) return;
        r.key = key;
        r.go.classList.toggle('off', !ready);
        r.go.innerHTML = '';
        const row = hsuiEl('div', 'row', r.go, (wait || r.busy ? '' : HSUI_ICON.playG) + '<span class="t hs-o" style="--s:2px;--ol:#0a4d19"></span>');
        row.lastElementChild.textContent = r.busy ? Lang.t('ui.adRunning') : wait ? wait.toUpperCase() : Lang.t('offer.' + r.kind + '.b');
        if (!wait && !r.busy) hsuiEl('div', 'sub', r.go).textContent = Lang.t('ui.forAd');
    },

    /** why: 'accept' (Game сам всё сделал) | 'decline' (Нет / время вышло: onDecline) | 'silent' (раунд кончился). */
    _offerEnd(r, why) {
        if (!r || r.done) return;
        r.done = true;
        cancelAnimationFrame(r.raf);
        if (this._offerRec === r) this._offerRec = null;
        r.el.classList.add('out');
        window.setTimeout(() => r.el.remove(), 220);
        if (why === 'decline') { try { if (r.o.onDecline) r.o.onDecline(); } catch (e) { console.error('GameUI.offer onDecline:', e); } }
    },

    // ---- HUD: обманка за рекламу ----

    async _decoyAd() {
        const a = hsuiAds(), d = this.abil.decoy;
        if (!a || this._decoyBusy) return;
        if (!hsuiAdReady()) { this._shake(d.b); hsuiSfx('error'); return; }
        this._decoyBusy = true;
        try { await a.extraDecoy(); } catch (e) { console.error('extraDecoy:', e); }
        this._decoyBusy = false;
    },

    // ---- результат: x2 монет за рекламу ----

    _decoyBusy: false,
    _x2Busy: false,

    _x2Refresh() {
        const b = this.rX2, r = this._r;
        if (!b || !this._resultOn || !r) return;
        const show = (r.coins | 0) > 0 && hsuiAdsOn() && typeof (/** @type {any} */ (hsuiAds())).doubleReward === 'function';
        b.hidden = !show;
        if (!show) return;
        const wait = hsuiAdWait(), ready = hsuiAdReady() && !this._x2Busy;
        const key = [r.x2done, wait, ready, this._x2Busy, r.coins].join('|');
        if (b.dataset.k === key) return;
        b.dataset.k = key;
        b.classList.toggle('done', !!r.x2done);
        b.classList.toggle('off', !r.x2done && !ready);
        b.innerHTML = '';
        const row = hsuiEl('div', 'row', b, (r.x2done || wait || this._x2Busy ? (r.x2done ? HSUI_ICON.check : '') : HSUI_ICON.playY) + '<span class="t hs-o" style="--s:2px;--ol:#6e4300"></span>');
        row.lastElementChild.textContent = r.x2done ? Lang.t('res.x2done') : this._x2Busy ? Lang.t('ui.adRunning') : wait ? wait.toUpperCase() : Lang.t('res.x2');
        if (!r.x2done && !wait && !this._x2Busy) {
            const sub = hsuiEl('div', 'sub', b);
            sub.textContent = Lang.t('res.x2sub', { n: hsuiFmt(r.coins | 0) });
        }
        if (r.x2done) b.querySelector('.t').style.setProperty('--ol', '#0a4d19');
    },

    async _resX2() {
        const a = /** @type {any} */ (hsuiAds()), r = this._r;
        if (!a || !r || r.x2done || this._x2Busy || typeof a.doubleReward !== 'function') return;
        if (!hsuiAdReady()) { this._shake(this.rX2); hsuiSfx('error'); return; }
        this._x2Busy = true;
        this._holdWallet(true);
        this._x2Refresh();
        let res = null;
        try { res = await a.doubleReward(); } catch (e) { console.error('doubleReward:', e); res = null; }
        this._x2Busy = false;
        if (res && res.ok && this._r === r) {
            const old = r.coins | 0;
            const total = res.coins > old ? res.coins | 0 : old * 2;
            r.coins = total;
            r.x2done = true;
            hsuiSfx('buy');
            this._countTo(this.rowCoin, old, total, 0, 1100);
            this._burst(this.rowCoin.row, 18);
            this._flyReward('coins', total - old, this.rowCoin.row.getBoundingClientRect(), this.rCoin);
        } else {
            this._holdWallet(false);
            if (this.rX2) this.rX2.dataset.k = '';
        }
        this._x2Refresh();
    },

    /** Число в плашке награды плавно растёт from -> to. */
    _countTo(o, from, to, delay, dur) {
        const run = () => {
            const t0 = performance.now();
            const tick = () => {
                if (!this._resultOn) return;
                const p = hsuiClamp((performance.now() - t0) / dur, 0, 1);
                o.b.textContent = '+' + hsuiFmt(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(tick); else o.b.textContent = '+' + hsuiFmt(to);
            };
            requestAnimationFrame(tick);
        };
        if (delay > 0) this._rt.push(window.setTimeout(run, delay)); else run();
    },


    // =====================================================================================
    // Настройки
    // =====================================================================================

    _buildSettings() {
        const win = hsuiEl('div', 'hs-screen hs-win hs-settingswin', this.root);
        this.set_el = win;
        const pn = hsuiEl('div', 'hs-panel hs-setwin hs-a', win);
        pn.style.setProperty('--d', '0');
        hsuiBig(Lang.t('ui.settings'), 'hs-set-title', pn);
        const close = hsuiBtn('hs-tool close hs-set-close', pn);
        close.setAttribute('aria-label', Lang.t('ui.close'));
        this._bind(close, () => this.closeSettings());
        this.sw = {};
        for (const [id, icon] of [['sfx', HSUI_ICON.speaker], ['music', HSUI_ICON.note]]) {
            const row = hsuiEl('div', 'hs-row hs-inset', pn, icon);
            hsuiEl('span', 'lb hs-o', row).textContent = Lang.t('ui.' + id);
            const sw = hsuiBtn('hs-switch', row);
            sw.setAttribute('role', 'switch');
            this._bind(sw, () => this._toggleSetting(id));
            this.sw[id] = sw;
        }
        const q = hsuiEl('div', 'hs-qrow hs-inset', pn);
        const hd = hsuiEl('div', 'hd', q, HSUI_ICON.gfx);
        hsuiEl('span', 'hs-o', hd).textContent = Lang.t('ui.quality');
        const seg = hsuiEl('div', 'hs-qseg', q);
        this.qb = {};
        for (const id of ['auto', 'low', 'medium', 'high']) {
            const b = hsuiBtn('', seg);
            b.textContent = Lang.t('ui.q.' + id);
            this._bind(b, () => this._setQuality(id));
            this.qb[id] = b;
        }
        const btns = hsuiEl('div', 'hs-set-btns', pn);
        const how = hsuiBtn('hs-btn yellow hs-shine', btns, HSUI_ICON.question + '<span class="t"></span>');
        how.lastElementChild.textContent = Lang.t('ui.howto');
        this._bind(how, () => this._howTo());
        win.addEventListener('click', e => { if (e.target === win) this.closeSettings(); });
    },

    openSettings() {
        if (!this.root) return;
        if (!this.set_el) this._buildSettings();
        this._from = this._resultOn && !this._menuWanted ? 'result' : 'menu';
        this._open = 'settings';
        if (this._from === 'result') this._show(this.result_el, false); else this._menuHide(false);
        this._setRefresh();
        this._show(this.set_el, true);
        hsuiSfx('whoosh');
    },

    closeSettings(silent) {
        if (this._open !== 'settings') return;
        this._open = '';
        this._show(this.set_el, false);
        if (!silent) this._back();
    },

    _setRefresh() {
        const G = hsuiGame(), s = G && G.save && G.save.settings ? G.save.settings : { sfx: true, music: true };
        for (const id of ['sfx', 'music']) {
            const on = s[id] !== false;
            this.sw[id].classList.toggle('on', on);
            this.sw[id].setAttribute('aria-checked', String(on));
        }
        const cur = typeof Quality !== 'undefined' ? Quality.choice : 'auto';
        for (const id of Object.keys(this.qb)) this.qb[id].classList.toggle('on', id === cur);
    },

    _toggleSetting(id) {
        const G = hsuiGame();
        if (!G || !G.save) return;
        if (!G.save.settings) G.save.settings = { music: true, sfx: true };
        const s = G.save.settings;
        s[id] = s[id] === false;
        try { if (typeof G.persist === 'function') G.persist(); } catch (e) { /* сохранение не обязательно */ }
        try { if (typeof G.applySettings === 'function') G.applySettings(); } catch (e) { /* нет настроек звука */ }
        if (id === 'music' && typeof GameFX !== 'undefined' && typeof GameFX.music === 'function') {
            try { GameFX.music(s.music !== false ? (G.state === 'menu' ? 'menu' : null) : null); } catch (e) { /* музыка не обязательна */ }
        }
        this._setRefresh();
    },

    _setQuality(id) {
        if (typeof Quality !== 'undefined') Quality.set(id);
        this._setRefresh();
        this._fxLevel();
    },

    _howTo() {
        const G = hsuiGame();
        if (G && typeof G.howToPlay === 'function') { this.closeSettings(true); this._menuHide(false); G.howToPlay(); }
        else this.closeSettings();
    },

    // =====================================================================================
    // Экран результата
    // =====================================================================================

    _buildResult() {
        const win = hsuiEl('div', 'hs-screen hs-win hs-resultwin', this.root);
        this.result_el = win;
        hsuiEl('div', 'hs-r-rays', win);
        this.confetti = hsuiEl('div', 'hs-confetti', win);
        const pn = hsuiEl('div', 'hs-panel hs-rpanel hs-a', win);
        pn.style.setProperty('--d', '0');
        this.rPanel = pn;
        this.rTitle = hsuiEl('div', 'hs-rtitle', pn);
        const top = hsuiEl('div', 'hs-rtop', pn);
        this.rMap = hsuiEl('div', 'hs-rmap', top);
        const rw = hsuiEl('div', 'hs-sh-wallet', top);
        this.rCoin = this._counter(rw, 'assets/ui/icon-coin.webp', '', 'coins');
        this.rGem = this._counter(rw, 'assets/ui/icon-gem.webp', '', 'gems');
        this.rStars = hsuiEl('div', 'hs-stars', pn);
        for (let i = 0; i < 3; i++) hsuiEl('div', 'hs-star', this.rStars, HSUI_ICON.star);
        const cols = hsuiEl('div', 'hs-rcols', pn);
        this.rRows = hsuiEl('div', 'hs-rrows', cols);
        this.rowCoin = this._mkRRow('coin', 'assets/ui/icon-coin.webp', 0);
        this.rowGem = this._mkRRow('gem', 'assets/ui/icon-gem.webp', 1);
        this.rowXp = this._mkRRow('xp', '', 2);
        const xp = hsuiEl('div', 'hs-rxp hs-inset', cols);
        this.rLvl = hsuiEl('b', 'hs-o', xp);
        this.rLvl.style.setProperty('--s', '1.5px');
        const bar = hsuiEl('div', 'hs-bar', xp);
        this.rBar = hsuiEl('i', '', bar);
        this.rLvlUp = hsuiEl('div', 'hs-lvlup hs-o', xp);
        this.rLvlUp.style.setProperty('--s', '1.5px');
        this.rLvlUp.textContent = Lang.t('res.newLevel');
        // x2 монет за рекламу: один раз, конкретная награда на кнопке
        this.rX2 = hsuiBtn('hs-btn yellow hs-shine hs-x2', cols);
        this.rX2.hidden = true;
        this._bind(this.rX2, () => this._resX2(), false);
        this.rStat = hsuiEl('div', 'hs-rstat', pn);
        this.rBtns = hsuiEl('div', 'hs-rbtns', pn);
    },

    _mkRRow(cls, icon, k) {
        const row = hsuiEl('div', 'hs-rrow hs-inset ' + cls, this.rRows);
        row.style.setProperty('--k', String(k));
        if (icon) hsuiImg(icon, '', row);
        else hsuiEl('div', 'xpic', row, Lang.t('res.xp'));
        const b = hsuiEl('b', 'hs-o', row, '+0');
        b.style.setProperty('--s', '2px');
        return { row, b };
    },

    /** r: { win, role, coins, gems, xp, levelUp, stars?, survived, botsCaught, total, mapName, mapIndex, time, unlocked, level, xpFrac } */
    result(r) {
        if (!this.root || !r) return;
        if (!this.result_el) this._buildResult();
        this._rt.forEach(t => clearTimeout(t));
        this._rt = [];
        this._hudOnHide();
        this._menuHide(true);
        this._closeWindows(true);
        this._offerEnd(this._offerRec, 'silent');
        this._holdWallet(false);
        this._x2Busy = false;
        this._menuWanted = false;
        const seeker = r.role === 'seeker', win = !!r.win;
        this._resultOn = true;
        this._r = Object.assign({}, r, { x2done: false });
        this._wallet(false);
        if (this.rX2) this.rX2.dataset.k = '';
        const el = this.result_el;
        el.classList.toggle('lose', !win);
        // заголовок и карта
        this.rTitle.innerHTML = '';
        hsuiBig(Lang.t(win ? (seeker ? 'res.winSeek' : 'res.winHide') : (seeker ? 'res.loseSeek' : 'res.loseHide')), '', this.rTitle);
        const mi = HS_MAPS[r.mapIndex | 0] || HS_MAPS[0];
        this.rMap.textContent = hsuiPad2((r.mapIndex | 0) + 1) + ' · ' + hsuiName(r.mapName || mi.name).toUpperCase();
        this.rMap.style.color = mi.color;
        // звёзды
        let stars = typeof r.stars === 'number' ? r.stars : 0;
        if (typeof r.stars !== 'number' && win) stars = seeker ? (r.time <= 30 ? 3 : r.time <= 45 ? 2 : 1) : (r.botsCaught === 0 ? 3 : r.botsCaught <= 1 ? 2 : 1);
        stars = hsuiClamp(stars | 0, 0, 3);
        Array.from(this.rStars.children).forEach((s, i) => {
            s.classList.remove('got', 'no');
            s.style.setProperty('--k', String(i));
            void /** @type {HTMLElement} */ (s).offsetWidth;
            if (i < stars) s.classList.add('got'); else s.classList.add('no');
        });
        // награды
        this.rowGem.row.hidden = !(r.gems > 0);
        this.rowXp.row.hidden = !(r.xp > 0);
        this.rowCoin.b.textContent = '+0'; this.rowGem.b.textContent = '+0'; this.rowXp.b.textContent = '+0';
        // статистика
        this.rStat.innerHTML = '';
        const total = r.total || 3;
        if (seeker) hsuiEl('span', '', this.rStat).textContent = Lang.t('res.caught', { a: r.botsCaught | 0, b: total });
        else hsuiEl('span', '', this.rStat).textContent = Lang.t('res.survived', { a: (total - (r.botsCaught | 0)) + (win ? 1 : 0), b: total + 1 });
        if (typeof r.time === 'number') hsuiEl('span', '', this.rStat).textContent = Lang.t('res.time', { t: hsuiClock(r.time) });
        if (r.unlocked) hsuiEl('span', 'hs-unlocked', this.rStat).textContent = Lang.t('res.unlocked');
        // кнопки
        this.rBtns.innerHTML = '';
        const mk = (cls, label, icon, fn) => {
            const b = hsuiBtn('hs-btn ' + cls, this.rBtns, (icon || '') + '<span class="t"></span>');
            b.lastElementChild.textContent = label;
            this._bind(b, fn);
            return b;
        };
        const G = hsuiGame();
        const go = (name) => { this._resultHide(false); if (G && typeof G[name] === 'function') G[name](); };
        if (win) {
            mk('main hs-shine', Lang.t('res.next'), HSUI_ICON.play, () => go('next'));
            mk('yellow small', Lang.t('res.retry'), '', () => go('retry'));
        } else {
            mk('main hs-shine', Lang.t('res.retry'), HSUI_ICON.play, () => go('retry'));
        }
        mk('blue small', Lang.t('res.menu'), HSUI_ICON.house, () => go('toMenu'));
        mk('navy small', Lang.t('res.shop'), HSUI_ICON.cart, () => this.openShop('power', 'result'));
        this._x2Refresh();
        // конфетти
        this._confetti(win);
        this._show(el, true);
        this._resultReplayLight();
    },

    /** Анимация наград и опыта (при показе и при возврате из магазина). */
    _resultReplayLight() {
        const r = this._r;
        if (!r) return;
        this._rt.forEach(t => clearTimeout(t));
        this._rt = [];
        const after = (ms, fn) => { this._rt.push(window.setTimeout(fn, ms)); };
        const count = (o, to, delay) => {
            after(delay, () => {
                const t0 = performance.now(), dur = 900;
                const tick = () => {
                    if (!this._resultOn) return;
                    const p = hsuiClamp((performance.now() - t0) / dur, 0, 1);
                    o.b.textContent = '+' + hsuiFmt(Math.round(to * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                after(dur + 80, () => { o.b.textContent = '+' + hsuiFmt(to); });
            });
        };
        count(this.rowCoin, r.coins | 0, 800);
        count(this.rowGem, r.gems | 0, 960);
        count(this.rowXp, r.xp | 0, 1120);
        // полоса уровня
        const G = hsuiGame();
        let need = 100;
        try { need = G && G.levelInfo ? G.levelInfo().need : 100; } catch (e) { /* нет Game */ }
        const frac = hsuiClamp(typeof r.xpFrac === 'number' ? r.xpFrac : this._levelInfo().frac, 0, 1);
        const level = r.level || this._levelInfo().level;
        const bar = this.rBar;
        const setF = (f, anim) => {
            bar.style.transition = anim ? '' : 'none';
            bar.style.setProperty('--f', hsuiClamp(f, 0, 1).toFixed(3));
            if (!anim) { void bar.offsetWidth; bar.style.transition = ''; }
        };
        this.rLvlUp.classList.remove('on');
        if (!r.levelUp) {
            this.rLvl.textContent = Lang.t('ui.level', { n: level });
            setF(frac - (r.xp | 0) / Math.max(1, need), false);
            after(1300, () => setF(frac, true));
        } else {
            const prevNeed = Math.max(60, need - 60);
            const f0 = hsuiClamp((prevNeed - ((r.xp | 0) - frac * need)) / prevNeed, 0, 0.95);
            this.rLvl.textContent = Lang.t('ui.level', { n: Math.max(1, level - 1) });
            setF(f0, false);
            after(1300, () => setF(1, true));
            after(2400, () => {
                this.rLvl.textContent = Lang.t('ui.level', { n: level });
                this.rLvlUp.classList.add('on');
                hsuiSfx('equip');
                setF(0, false);
            });
            after(2600, () => setF(frac, true));
        }
    },

    _confetti(win) {
        const c = this.confetti;
        c.innerHTML = '';
        if (!win || hsuiReduced()) return;
        const cols = ['#ffd23d', '#ff5a8a', '#59d4ff', '#76f067', '#ff9a1c', '#c06bff', '#ffffff'];
        const n = this.root.classList.contains('hs-lowfx') ? 18 : 40;
        for (let i = 0; i < n; i++) {
            const e = hsuiEl('i', '', c);
            e.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
            e.style.setProperty('--c', cols[i % cols.length]);
            e.style.setProperty('--w', (6 + Math.random() * 7).toFixed(1) + 'px');
            e.style.setProperty('--t', (2.6 + Math.random() * 2.2).toFixed(2) + 's');
            e.style.setProperty('--dl', (-Math.random() * 4).toFixed(2) + 's');
            e.style.setProperty('--dx', ((Math.random() - 0.5) * 140).toFixed(0) + 'px');
            e.style.setProperty('--r', ((Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 540)).toFixed(0) + 'deg');
        }
    },

    _resultHide(fast) {
        if (!this.result_el) return;
        this._resultOn = false;
        this._rt.forEach(t => clearTimeout(t));
        this._rt = [];
        if (fast) { clearTimeout(this._timers.get(this.result_el)); this.result_el.classList.remove('on', 'in', 'out'); }
        else this._show(this.result_el, false);
    },

    _hudOnHide() { if (this._hudOn) this.hud(false); },
};

// Пикабу: название только по-русски — логотип меню на всех языках
if (String(GAME_PLATFORM) === 'pikabu') for (const c of Object.keys(LANG_STRINGS)) Object.assign(LANG_STRINGS[c], { 'ui.logo1': 'ПРЯТКИ', 'ui.logo2': 'В ЛАБИРИНТЕ' });
