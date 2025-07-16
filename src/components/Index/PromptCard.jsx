export const PromptCard = ({ caregory, prompt }) => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        gap: "1.2rem",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        border: "2px solid transparent",
      }}
    >
      <h3
        style={{
          color: "var(--text-color-primary)",
          fontSize: "1.3rem",
          fontWeight: "700",
          margin: "0",
          textAlign: "left",
          width: "100%",
          paddingBottom: "0.8rem",
          borderBottom: "2px solid var(--border-color)",
          position: "relative",
        }}
      >
        {prompt.label || caregory}
      </h3>

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
    </div>
  );
};
