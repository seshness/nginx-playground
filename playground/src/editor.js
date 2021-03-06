import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import "monaco-editor-nginx";

const defaultNginxSample = `\
error_log stderr debug;

events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    location /mount {
      root /www/data;
    }
    location / {
      return 200 'hello world';
    }
  }
}`;

export default function Editor({ monacoRef }) {
  const refContainer = useRef(null);

  useEffect(() => {
    const editorRef = monaco.editor.create(refContainer.current, {
      automaticLayout: true,
      value: defaultNginxSample,
      language: "nginx",
      rulers: [80],
      theme: "nginx-theme",
    });
    monacoRef.current = editorRef;
  }, [monacoRef]);

  return (
    <div
      style={{
        height: "100%",
        resize: "vertical",
        overflow: "auto",
      }}
      ref={refContainer}
    />
  );
}
