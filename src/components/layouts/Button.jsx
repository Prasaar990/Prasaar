import { useRef } from "react";
import { Link } from "react-router-dom";
import proptypes from "prop-types";

Button.propTypes = {
  text: proptypes.string.isRequired,
  to: proptypes.string,
  handleFormOpen: proptypes.func,
  primary: proptypes.bool,
};

export default function Button({
  text,
  to = "/form",
  handleFormOpen,
  primary = true,
}) {
  const elementRef = useRef(null);
  const arrow = useRef(null);
  const blackArrow = useRef(null);

  const isExternal = to.startsWith("http");

  const handleMouseEnter = () => {
    if (arrow.current && blackArrow.current && elementRef.current) {
      // Slide white arrow out (top-right)
      arrow.current.style.transform = "translate(150%, -150%)";
      arrow.current.style.opacity = "0";
      // Slide dark arrow in (from bottom-left)
      blackArrow.current.style.transform = "translate(-50%, -50%)";
      blackArrow.current.style.opacity = "1";
      // Text color shifts on hover
      elementRef.current.style.color = "black";
    }
  };

  const handleMouseLeave = () => {
    if (arrow.current && blackArrow.current && elementRef.current) {
      // Reset white arrow
      arrow.current.style.transform = "translate(-50%, -50%)";
      arrow.current.style.opacity = "1";
      // Hide dark arrow back to start position
      blackArrow.current.style.transform = "translate(-200%, 100%)";
      blackArrow.current.style.opacity = "0";
      // Restore text color
      elementRef.current.style.color = primary ? "white" : "black";
    }
  };

  const handleClick = () => {
    if (to.includes("form") && handleFormOpen) {
      handleFormOpen(true);
    }
  };

  /* ── Shared classes ────────────────────────────── */
  const baseClasses = [
    "group",
    "py-[10px] pl-[24px] pr-[10px]",
    "rounded-full",
    "text-[17px] font-medium tracking-wide",
    "flex items-center gap-3",
    "z-10 relative",
    "cursor-pointer select-none",
    primary ? "bg_primary text-white" : "bg-white text-black border border-gray-200",
  ].join(" ");

  const baseStyle = {
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    boxShadow: primary
      ? "0 2px 8px rgba(198, 2, 64, 0.25)"
      : "0 2px 8px rgba(0,0,0,0.06)",
  };

  const handleEnterStyle = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: "translateY(-2px)",
      boxShadow: primary
        ? "0 8px 24px rgba(198, 2, 64, 0.35)"
        : "0 8px 24px rgba(0,0,0,0.12)",
    });
    handleMouseEnter();
  };

  const handleLeaveStyle = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: "translateY(0)",
      boxShadow: primary
        ? "0 2px 8px rgba(198, 2, 64, 0.25)"
        : "0 2px 8px rgba(0,0,0,0.06)",
    });
    handleMouseLeave();
  };

  /* ── Arrow circle (shared) ─────────────────────── */
  const ArrowCircle = ({ basePath }) => (
    <span
      className="relative flex items-center justify-center rounded-full bg-white overflow-hidden"
      style={{
        width: 36,
        height: 36,
        minWidth: 36,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Dark arrow – slides IN on hover */}
      <img
        ref={blackArrow}
        src={`${basePath}/img/right-arrow-black.svg`}
        alt=""
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          left: "50%",
          top: "50%",
          transform: "translate(-200%, 100%)",
          opacity: 0,
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {/* White/colored arrow – default visible */}
      <img
        ref={arrow}
        src={`${basePath}/img/right-arrow.svg`}
        alt=""
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 1,
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </span>
  );

  // 🔹 External links → <a>, Internal → <Link>
  if (isExternal) {
    return (
      <a
        ref={elementRef}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        style={baseStyle}
        onMouseEnter={handleEnterStyle}
        onMouseLeave={handleLeaveStyle}
      >
        {text}
        <ArrowCircle basePath="" />
      </a>
    );
  }

  return (
    <Link
      ref={elementRef}
      to={to}
      className={baseClasses}
      style={baseStyle}
      onMouseEnter={handleEnterStyle}
      onMouseLeave={handleLeaveStyle}
      onClick={handleClick}
    >
      {text}
      <ArrowCircle basePath="." />
    </Link>
  );
}
