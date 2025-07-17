import { useState } from "react";
import { copyToClipboard } from "../../utils/copyToClipboard";

export const PromptCard = ({ caregory, prompt }) => {
  const [copied, setCopied] = useState(false);
  if (prompt.isLink)
    return (
      <a
        href={prompt.value}
        className="btn-primary"
        rel="noopener noreferrer"
        target="_blank"
        style={{
          borderRadius: "0.5rem",
          padding: "0.5rem 0.75rem",
          fontSize: "1.25rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          justifyContent: "center",
        }}
      >
        {prompt.label}
      </a>
    );

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        gap: "1.2rem",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "0.8rem",
          borderBottom: "2px solid var(--border-color)",
          position: "relative",
        }}
      >
        <h3
          style={{
            color: "var(--text-color-primary)",
            fontSize: "1.3rem",
            fontWeight: "700",
            margin: "0",
            textAlign: "left",
            flex: "1",
          }}
        >
          {prompt.label || caregory}
        </h3>
      </div>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flex: 1,
          width: "100%",
          color: "var(--text-color)",
        }}
      >
        {prompt.value.split("\n").map((line, index) => (
          <p
            key={index}
            style={{
              textAlign: "left",
              lineHeight: "1.4",
              ...(line.trim() === "" && {
                marginBottom: "1rem",
                height: "0.5rem",
              }),
              ...(line.startsWith("Note:") && {
                color: "var(--text-color-muted)",
                fontSize: "0.85rem",
                fontStyle: "italic",
                background: "rgba(33, 150, 243, 0.05)",
                padding: "0.5rem 0.8rem",
                borderRadius: "0.375rem",
                borderLeft: "3px solid var(--text-color-primary)",
              }),
            }}
          >
            {line}
          </p>
        ))}
      </article>

      <button
        onClick={(e) => {
          if (copied) return;
          copyToClipboard(prompt.value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        style={{
          background: copied
            ? "var(--text-color-secondary)"
            : "var(--text-color-primary)",
          color: "white",
          borderRadius: "0.5rem",
          padding: "0.5rem 0.75rem",
          fontSize: "0.85rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          justifyContent: "center",
        }}
      >
        {copied ? (
          <>
            <span style={{ fontSize: "0.75rem" }}>✓</span>
            已複製
          </>
        ) : (
          <>
            <span style={{ fontSize: "0.75rem" }}>📋</span>
            複製
          </>
        )}
      </button>
    </div>
  );
};
