import globals from 'globals';
import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import { includeIgnoreFile } from '@eslint/compat';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config(
  includeIgnoreFile(gitignorePath),

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
      'vue/no-useless-template-attributes': 0,
      'vue/attribute-hyphenation': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'vue/max-attributes-per-line': 0,
      'vue/multiline-html-element-content-newline': 0,
      'vue/attributes-order': 0
    }
  }
);
