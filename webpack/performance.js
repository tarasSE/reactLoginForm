const fs = require("fs");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

fs.readFile('./build/index.html', 'utf8', (err, html) => {
    if (err) {
        console.error(`Can't open '../build/index.html'`);
        console.error(err);
    }
    const dom = new JSDOM(html);
    const css = [...dom.window.document.querySelectorAll('link')].filter(l => l.href.indexOf('style') !== -1)[0];
    const js = [...dom.window.document.querySelectorAll('script')].filter(s => s.src.indexOf('bundle' !== -1))[0];
    css.setAttribute('media', 'none');
    css.setAttribute('onload', `if(media!=='all')media='all'`);
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