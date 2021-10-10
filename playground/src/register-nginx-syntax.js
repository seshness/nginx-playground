import { themeConfig, tokenConf } from "monaco-editor-nginx/lib/cjs/conf";
import suggestions from "monaco-editor-nginx/lib/cjs/suggestions";
import directives from "monaco-editor-nginx/lib/cjs/directives.json";

/**
 * From https://github.com/jaywcjlove/nginx-editor/blob/main/src/index.tsx
 */
export default function registerNginxSyntax(monaco) {
  // Register a new language
  monaco.languages.register({
    id: "nginx",
  });
  monaco.languages.setLanguageConfiguration("nginx", {
    autoClosingPairs: [{ open: "{", close: "}" }, { open: '"', close: '"' }],
  });
  monaco.languages.setMonarchTokensProvider("nginx", tokenConf);
  monaco.editor.defineTheme("nginx-theme", themeConfig);
  monaco.languages.registerCompletionItemProvider("nginx", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return { suggestions: suggestions(range) };
    },
  });
  monaco.languages.registerHoverProvider("nginx", {
    provideHover: (model, position, token) => {
      const word = model.getWordAtPosition(position);
      if (!word) return;
      const data = directives.find(
        (item) => item.n === word.word || item.n === `$${word.word}`
      );
      if (!data) return;
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const contents = [
        { value: `**\`${data.n}\`** | ${data.m} | ${data.c || ""}` },
      ];
      if (data.s) {
        contents.push({ value: `**syntax:** ${data.s || ""}` });
      }
      if (data.v) {
        contents.push({ value: `**default:** ${data.v || ""}` });
      }
      if (data.d) {
        contents.push({ value: `${data.d}` });
      }
      return {
        contents: [...contents],
        range: range,
      };
    },
  });
}
