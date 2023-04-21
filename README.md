# @enzoaicardi/preset-pruno

Units reference pixels but they are converted into rem equivalent.
Same syntaxes as `@unocss/preset-mini`.
Convert the media / container queries into `rem` for more accessibility and desktop-first to be dev friendly and give 4 more levels `3xs 2xs xs 3xl`;

```html
<div class="m-24 w-240 sm:m-12"></div>
```

```css
.m-24{
    margin: 1.5rem; /* x16 = 24px */
}
.w-240{
    width: 15rem; /* x16 = 240px */
}
@media screen and (max-width: 40rem){ /* 640px */
    .sm\:.m-12{
        margin: 0.75rem; /* x16 = 12px */
    }
}
```

# Installation & Execution

First, install **unocss** and the **preset-pruno** package as devDepedencies.
`npm i -D unocss`
`npm i -D @enzoaicardi/preset-pruno`

Second, add a `uno.config.ts` in your projet's root directory.

```javascript
import { defineConfig } from 'unocss'
import { presetPruno } from '@enzoaicardi/preset-pruno'

export default defineConfig({
	cli: {
		entry: {
			patterns: [/* Paths of files you want to watch : **\/templates/*.{html,twig,liquig} */],
			outFile: /* Output file path : assets/css/styles.css */
		}
	},
	presets: [presetPruno()]
})
```

Third, run the unocss watcher by adding a script in your `package.json`.

```json
"scripts": {
    "watch": "unocss --watch"
}
```

Last step, run the watcher and start coding.
`npm run watch`

# Vscode

If you are using **VSCode**, consider to use the unocss VSCode extension that can be really helpful.
[https://marketplace.visualstudio.com/items?itemName=antfu.unocss](UnoCSS for VSCode)

# Why 'pruno'

For "Pixel as Rem UnoCSS".
*Thanks to @AnthonyFu for his brilliant job*