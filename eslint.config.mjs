import globals from 'globals';
import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
export default tseslint.config(
  eslint.configs.recommended,

  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        sourceType: 'module',
        parser: {
          ts: tseslint.parser
        }
      }
    }
  },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  ...pluginQuery.configs['flat/recommended'],
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/no-useless-template-attributes': 0
    }
  }
);
