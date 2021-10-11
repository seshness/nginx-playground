export function ConsoleLine({ line }) {
  return <div>{line}</div>;
}

export default function Console({ consoleOutput }) {
  return (
    <code
      style={{
        display: "block",
        overflow: "scroll",
        maxHeight: "100%",
      }}
    >
      {consoleOutput.map((line, key) => (
        <ConsoleLine line={line} key={key} />
      ))}
    </code>
  );
}
