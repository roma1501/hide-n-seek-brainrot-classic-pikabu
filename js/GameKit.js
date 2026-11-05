// GameKit.js — коллизии набора стен (Nav.register) и классификация объектов карты.
// Точные фигуры из Blender лежат в docs/kit/<тема>.json; tools/kit/build-kit.mjs переносит их
// в HS_KIT_SHAPES ниже. Модель без точной фигуры получает фигуру по имени детали (размеры —
// docs/GAME-SPEC.md). Укрытия (-hide) и декор — без коллизий.

const HS_THEMES = ['mint', 'citrus', 'block', 'candy', 'tropic', 'toy', 'ice', 'neon', 'space', 'carnival'];

/** Точные фигуры из docs/kit (пишет tools/kit/build-kit.mjs). @type {Record<string, any[]>} */
const HS_KIT_SHAPES = {
    ['assets/' + 'models/kit/block-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/block-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/block-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/block-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/block-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/block-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 160, d: 46}],
    ['assets/' + 'models/kit/block-prop2.glb']: [{t: 'box', x: 0, y: 0, w: 90, d: 90}],
    ['assets/' + 'models/kit/block-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 16}],
    ['assets/' + 'models/kit/candy-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/candy-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/candy-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/candy-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/candy-block.glb']: [{t: 'circle', x: 0, y: 0, r: 100}],
    ['assets/' + 'models/kit/candy-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 100, d: 100}],
    ['assets/' + 'models/kit/candy-prop2.glb']: [{t: 'circle', x: 0, y: 0, r: 25}],
    ['assets/' + 'models/kit/candy-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 34}],
    ['assets/' + 'models/kit/carnival-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/carnival-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/carnival-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/carnival-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/carnival-block.glb']: [{t: 'circle', x: 0, y: 0, r: 100}],
    ['assets/' + 'models/kit/carnival-prop1.glb']: [{t: 'circle', x: 0, y: 0, r: 45}],
    ['assets/' + 'models/kit/carnival-prop2.glb']: [{t: 'box', x: 0, y: 0, w: 74, d: 74}],
    ['assets/' + 'models/kit/carnival-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 38}],
    ['assets/' + 'models/kit/citrus-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/citrus-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/citrus-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/citrus-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/citrus-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/citrus-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 110, d: 76}],
    ['assets/' + 'models/kit/citrus-prop2.glb']: [{t: 'box', x: 72.9, y: 68.4, w: 57.2, d: 40, a: -99},{t: 'box', x: 56.5, y: 17.8, w: 57.2, d: 40, a: -117},{t: 'box', x: 25.2, y: -25.2, w: 57.2, d: 40, a: -135},{t: 'box', x: -17.8, y: -56.5, w: 57.2, d: 40, a: -153},{t: 'box', x: -68.4, y: -72.9, w: 57.2, d: 40, a: -171}],
    ['assets/' + 'models/kit/citrus-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 48}],
    ['assets/' + 'models/kit/ice-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/ice-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/ice-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/ice-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/ice-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/ice-prop1.glb']: [{t: 'box', x: 8.6, y: 0.1, w: 142.9, d: 111.9}],
    ['assets/' + 'models/kit/ice-prop2.glb']: [{t: 'box', x: 0.5, y: -3.8, w: 165, d: 122.4}],
    ['assets/' + 'models/kit/ice-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 38}],
    ['assets/' + 'models/kit/mint-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/mint-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/mint-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/mint-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/mint-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/mint-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 22}],
    ['assets/' + 'models/kit/mint-prop2.glb']: [{t: 'box', x: 0, y: 0, w: 84, d: 84}],
    ['assets/' + 'models/kit/mint-prop3.glb']: [{t: 'circle', x: 0, y: 0, r: 32}],
    ['assets/' + 'models/kit/neon-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/neon-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/neon-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/neon-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/neon-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/neon-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 100, d: 80}],
    ['assets/' + 'models/kit/neon-prop2.glb']: [{t: 'box', x: 0, y: 0, w: 86, d: 86}],
    ['assets/' + 'models/kit/neon-prop3.glb']: [{t: 'box', x: 0, y: 0, w: 40, d: 120}],
    ['assets/' + 'models/kit/space-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/space-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/space-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/space-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/space-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/space-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 64, d: 110}],
    ['assets/' + 'models/kit/space-prop2.glb']: [{t: 'circle', x: 0, y: 0, r: 40}],
    ['assets/' + 'models/kit/space-prop3.glb']: [{t: 'box', x: 0, y: 0, w: 64, d: 64}],
    ['assets/' + 'models/kit/toy-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/toy-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/toy-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/toy-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/toy-block.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 200}],
    ['assets/' + 'models/kit/toy-prop1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 100}],
    ['assets/' + 'models/kit/toy-prop2.glb']: [{t: 'box', x: 6.3, y: -5.8, w: 137.9, d: 106.9}],
    ['assets/' + 'models/kit/toy-prop3.glb']: [{t: 'circle', x: 8, y: 0, r: 42}],
    ['assets/' + 'models/kit/tropic-wall1.glb']: [{t: 'box', x: 0, y: 0, w: 200, d: 40}],
    ['assets/' + 'models/kit/tropic-wall2.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 40}],
    ['assets/' + 'models/kit/tropic-post.glb']: [{t: 'box', x: 0, y: 0, w: 50, d: 50}],
    ['assets/' + 'models/kit/tropic-border.glb']: [{t: 'box', x: 0, y: 0, w: 400, d: 70}],
    ['assets/' + 'models/kit/tropic-block.glb']: [{t: 'circle', x: 0, y: 0, r: 96}],
    ['assets/' + 'models/kit/tropic-prop1.glb']: [{t: 'circle', x: 0, y: 0, r: 32}],
    ['assets/' + 'models/kit/tropic-prop2.glb']: [{t: 'box', x: 0, y: 0, w: 82, d: 82}],
    ['assets/' + 'models/kit/tropic-prop3.glb']: [{t: 'box', x: 0, y: 0, w: 92, d: 62}],
};

/** @satisfies {Record<string, any>} */
const GameKit = {
    PREFIX: 'assets/' + 'models/kit/',

    /** Фигура по имени детали, если точной нет. */
    defaultShapes(part) {
        if (part === 'wall1') return [{ t: 'box', x: 0, y: 0, w: 200, d: 40 }];
        if (part === 'wall2') return [{ t: 'box', x: 0, y: 0, w: 400, d: 40 }];
        if (part === 'post') return [{ t: 'box', x: 0, y: 0, w: 50, d: 50 }];
        if (part === 'border') return [{ t: 'box', x: 0, y: 0, w: 400, d: 70 }];
        if (part === 'block') return [{ t: 'box', x: 0, y: 0, w: 190, d: 190 }];
        if (/^prop\d$/.test(part)) return [{ t: 'box', x: 0, y: 0, w: 120, d: 120 }];
        return null;
    },

    /** Фигуры JSON-формата { box: {...} } | { circle: {...} } | { t: ... } → формат Nav. */
    normalize(list) {
        const out = [];
        for (const s of list || []) {
            if (s.t) { out.push(s); continue; }
            if (s.box) out.push(Object.assign({ t: 'box' }, s.box));
            else if (s.circle) out.push(Object.assign({ t: 'circle' }, s.circle));
        }
        return out;
    },

    register() {
        const reg = {};
        for (const theme of HS_THEMES) {
            for (const part of ['wall1', 'wall2', 'post', 'border', 'block', 'prop1', 'prop2', 'prop3']) {
                const path = this.PREFIX + theme + '-' + part + '.glb';
                const exact = HS_KIT_SHAPES[path];
                const shapes = exact && exact.length ? this.normalize(exact) : this.defaultShapes(part);
                if (shapes) reg[path] = shapes;
            }
        }
        Nav.register(reg);
    },

    /** Объект карты — укрытие? */
    isHide(def) { return !!(def && def.model && /-hide\.glb$/.test(def.model)); },
};
