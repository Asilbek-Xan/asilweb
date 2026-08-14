import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const cursor = useRef({
    x: 0,
    y: 0,
  });

  const angle = useRef(0);
  const targetAngle = useRef(0);

  // Sening theme sistemang:
  // html.light = Light mode
  // html.light yo'q = Dark mode
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );

  // Theme o'zgarganini kuzatish
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const light = document.documentElement.classList.contains("light");

      setIsLight(light);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;

      // Mouse qaysi tomonga HARAKAT qilayotganini aniqlaymiz
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        targetAngle.current =
          Math.atan2(dy, dx) * (180 / Math.PI);
      }

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      // Cursor mouse'dan biroz kechikib yuradi
      cursor.current.x +=
        (mouse.current.x - cursor.current.x) * 0.12;

      cursor.current.y +=
        (mouse.current.y - cursor.current.y) * 0.12;

      // Smooth rotation
      let difference =
        targetAngle.current - angle.current;

      // Eng qisqa burilish yo'lini tanlash
      if (difference > 180) {
        difference -= 360;
      }

      if (difference < -180) {
        difference += 360;
      }

      // Sekin burilish
      angle.current += difference * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left =
          `${cursor.current.x}px`;

        cursorRef.current.style.top =
          `${cursor.current.y}px`;

        cursorRef.current.style.transform = `
          translate(-50%, -50%)
          rotate(${angle.current}deg)
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none
        fixed
        z-[99999]
        h-7
        w-7
        rounded-full
        transition-colors
        duration-300
      "
      style={{
        left: 0,
        top: 0,

        // Light mode -> qora
        // Dark mode -> oq
        backgroundColor: isLight
          ? "#000000"
          : "#ffffff",

        boxShadow: isLight
          ? "0 0 20px rgba(0, 0, 0, 0.35)"
          : "0 0 20px rgba(255, 255, 255, 0.8)",
      }}
    />
  );
}