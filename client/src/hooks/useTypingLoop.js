import React from "react";

function useTypingLoop(phrases) {
  const [displayText, setDisplayText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const typingDone = !isDeleting && displayText === currentPhrase;
    const deletingDone = isDeleting && displayText === "";

    const delay = typingDone ? 2300 : isDeleting ? 65 : 95;
    const timer = window.setTimeout(() => {
      if (typingDone) {
        setIsDeleting(true);
        return;
      }

      if (deletingDone) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setDisplayText((currentText) => {
        if (isDeleting) {
          return currentPhrase.slice(0, Math.max(0, currentText.length - 1));
        }

        return currentPhrase.slice(0, currentText.length + 1);
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phrases, phraseIndex]);

  return displayText;
}

export default useTypingLoop;
