import findFile from "./findFile";
import fs from "fs";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const pluginName = 'StylesInjectPlugin';

class StylesInjectPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, compilation => {
                const file = findFile({}, {}, compilation);
                fs.readFile('./build/' + file, 'utf8', (err, css) => {
                    if (err) {
                        console.error(err);
                    }

                    addStyleTag(css);

                    fs.unlink('./build/' + file, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            });
    }
}

const addStyleTag = (css) => {
    fs.readFile('./build/index.html', 'utf8', (err, html) => {
        if (err) {
            console.error(`Can't open './build/index.html'`);
            console.error(err);
        }
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const headElement = document.querySelector('head');
        const styleTag = document.createElement('style');
        const cssLink = [...dom.window.document.querySelectorAll('link')].filter(l => l.href.indexOf('style') !== -1)[0];
        headElement.removeChild(cssLink);
        styleTag.innerHTML = css;
        headElement.append(styleTag);
        fs.writeFile('./build/index.html', dom.serialize(), {encoding: 'utf8'}, (err) => {
            if (err) {
                console.error(`Can't write index.html`);
                console.error(err);
            } else {
                console.error(`Css successfully injected to index.html`);
            }
        });
    });
};

module.exports = StylesInjectPlugin;