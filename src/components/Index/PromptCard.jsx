export const PromptCard = ({ caregory, prompt }) => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        gap: "1.2rem",
        marginBottom: "1rem",
        transition: "all 0.3s ease",
        cursor: "pointer",
        border: "2px solid transparent",
      }}
    >
      <h3
        style={{
          color: "var(--text-color-primary)",
          fontSize: "1.25rem",
          fontWeight: "600",
          margin: "0",
          textAlign: "left",
          width: "100%",
          borderBottom: "2px solid var(--border-color)",
          paddingBottom: "0.5rem",
        }}
      >
        {prompt.label || caregory}
      </h3>

      <article
        style={{
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
              ...(line.trim() === "" && { marginBottom: "0.4rem" }),
              ...(line.startsWith("Note:") && {
                color: "var(--text-color-muted)",
                fontSize: "0.85rem",
              }),
            }}
          >
            {line}
          </p>
        ))}
      </article>
    </div>
  );
};
