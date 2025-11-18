import path from 'path';
import { fileURLToPath } from 'url';
import markdown from '@vavt/vite-plugin-import-markdown';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { build } from 'vite';

import nodeService from './plugins/nodeService';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

const viteConfig = {
  base: './',
  publicDir: resolvePath('dev/public'),
  resolve: {
    alias: {
      '@': resolvePath('dev'),
      '~~': resolvePath('packages'),
      '~': resolvePath('packages/MdEditor')
    }
  },
  plugins: [vue(), vueJsx(), nodeService(), markdown()],
  css: {
    modules: {
      localsConvention: 'camelCase' as const
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: resolvePath('dist'),
    emptyOutDir: true
  }
};

// 👉 只执行 build，不启动 dev server
void (async () => {
  await build(viteConfig);

  console.log('\n✨ Build complete! Output in dist/');
})();
