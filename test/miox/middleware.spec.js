import 'es6-promise/auto';
import MDW from 'miox/miox_modules/middleware';

describe('Miox module [middleware] test:', () => {
    it('mdw.use', () => {
        const mw = new MDW();
        mw.use(singleFunction, singleFunction, singleFunction);
        expect(mw.middlewares.length).toEqual(3);
        mw.use([singleFunction, singleFunction]);
        expect(mw.middlewares.length).toEqual(5);
        mw.use([singleFunction, [singleFunction, singleFunction]]);
        expect(mw.middlewares.length).toEqual(8);
        mw.use([singleFunction, [singleFunction, [singleFunction,singleFunction]]]);
        expect(mw.middlewares.length).toEqual(12);
        mw.use([singleFunction, [[singleFunction, singleFunction, [singleFunction, [singleFunction, singleFunction, [singleFunction, singleFunction]]]], [singleFunction,singleFunction]]]);
        expect(mw.middlewares.length).toEqual(22);
        function singleFunction() {}
    });

    it('mdw.run', cb => {
        const that = Object.create(null);
        let context;

        const mw = new MDW();
        mw.use(async (ctx, next) => {
            context = ctx;
            ctx.a = 1;
            await next();
        });
        mw.use(async (ctx, next) => {
            ctx.b = 2;
            await next();
        });
        mw.__defineProcessHandle__();
        mw.execute(that).then(() => {
            expect(context).toBe(that);
            expect(that.a).toEqual(1);
            expect(that.b).toEqual(2);
            cb();
        })
    });
});