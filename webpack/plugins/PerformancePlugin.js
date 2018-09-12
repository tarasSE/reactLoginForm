import fs from "fs";
import jsdom from "jsdom";

const {JSDOM} = jsdom;
const pluginName = 'PerformancePlugin';

class PerformancePlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, compilation => {
            fs.readFile('./build/index.html', 'utf8', (err, html) => {
                if (err) {
                    console.error(`Can't open './build/index.html'`);
                    console.error(err);
                }
                const dom = new JSDOM(html);
                const js = [...dom.window.document.querySelectorAll('script')].filter(s => s.src.indexOf('bundle' !== -1))[0];
                js.setAttribute('async', '');
                fs.writeFile('./build/index.html', dom.serialize(), {encoding: 'utf8'}, (err) => {
                    if (err) {
                        console.error(`Can't write index.html`);
                        console.error(err);
                    } else {
                        console.error(`Performance improvements successfully applied.`);
                    }
                });
            });
        });
    }
}

module.exports = PerformancePlugin;