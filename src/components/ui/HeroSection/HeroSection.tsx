import type React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./Hero.css";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../../../theme/ThemeContext"; // Ajusta la ruta si fuera necesario

export default function Hero() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<number>(0);

  // Motion Values para la posición del ratón
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [buildState, setBuildState] = useState<
    "idle" | "building" | "deployed"
  >("idle");
  const [buildProgress, setBuildProgress] = useState(0);
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  // Spinner para la animación de building
  const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  // Obtenemos `animating` del ThemeContext
  const { animating } = useTheme();

  // Controlar retraso de 100ms tras terminar animación de tema
  const [showRight, setShowRight] = useState(false);
  useEffect(() => {
    if (animating) {
      setShowRight(false);
    } else {
      const timeout = setTimeout(() => {
        setShowRight(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [animating]);

  useEffect(() => {
    let interval: number | null = null;
    if (buildState === "building") {
      interval = window.setInterval(() => {
        setSpinnerIndex((prev) => (prev + 1) % spinnerChars.length);
      }, 100);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [buildState]);

  // Código inicial
  const initialCode = [
    "// DevQueensUs Solution Builder",
    "import { NextApp, UIComponents, Analytics } from '@devqueens/core';",
    "",
    "// Initialize project configuration",
    "const projectConfig = {",
    "  name: 'client-portal',",
    "  type: 'web-application',",
    "  framework: 'Next.js',",
    "  styling: 'Tailwind CSS',",
    "  responsive: true,",
    "  performance: 'optimized'",
    "};",
    "",
    "// Create new solution",
    "const solution = new DevQueensSolution(projectConfig);",
    "",
    "// Build and deploy",
    "await solution.build();",
    "await solution.deploy();",
  ];

  // Código para el estado "building"
  const getBuildingCode = (progress: number) => {
    const spinnerChar = spinnerChars[spinnerIndex];
    const buildingSteps = [
      "Installing dependencies...",
      "Compiling TypeScript...",
      "Optimizing assets...",
      "Building UI components...",
      "Generating static pages...",
      "Running tests...",
      "Optimizing bundle size...",
      "Preparing deployment...",
    ];
    const currentStepIndex = Math.min(
      Math.floor((progress / 100) * buildingSteps.length),
      buildingSteps.length - 1
    );
    const completedSteps = buildingSteps
      .slice(0, currentStepIndex)
      .map((step) => `✅ ${step}`);
    const inProgressStep =
      progress < 100
        ? `${spinnerChar} ${buildingSteps[currentStepIndex]}`
        : `✅ ${buildingSteps[currentStepIndex]}`;
    const pendingSteps = buildingSteps
      .slice(currentStepIndex + 1)
      .map((step) => `⏳ ${step}`);

    return [
      "// 🚀 DevQueensUs Build Process",
      "import { NextApp, UIComponents, Analytics } from '@devqueens/core';",
      "",
      `// 📊 Build Progress: ${progress}%`,
      "const projectConfig = {",
      "  name: 'client-portal',",
      "  type: 'web-application',",
      "  framework: 'Next.js',",
      "  styling: 'Tailwind CSS',",
      "  responsive: true,",
      "  performance: 'optimized'",
      "};",
      "",
      "// 🔨 Building Solution...",
      "",
      ...completedSteps,
      inProgressStep,
      ...pendingSteps,
      "",
      progress >= 100
        ? "// ✅ BUILD COMPLETED!"
        : "// ⏳ Building in progress...",
    ];
  };

  // Código para el estado "deployed"
  const deployedCode = [
    "// 🚀 DevQueensUs Solution Builder",
    "import { NextApp, UIComponents, Analytics } from '@devqueens/core';",
    "",
    "// ✅ PROJECT SUCCESSFULLY DEPLOYED!",
    "const projectConfig = {",
    "  name: 'client-portal',",
    "  type: 'web-application',",
    "  framework: 'Next.js',",
    "  styling: 'Tailwind CSS',",
    "  responsive: true,",
    "  performance: 'optimized'",
    "};",
    "",
    "// 🎉 DEPLOYMENT COMPLETE",
    "// 🌐 Live URL: https://client-portal.devqueensus.com",
    "// ⚡ Performance Score: 98/100",
    "// 🔍 SEO Score: 100/100",
    "// 📱 Mobile Friendly: ✅ Yes",
    "// ⏱️ Build Time: 1.2s",
    "// 🚀 Status: LIVE",
    "",
    "console.log('🎊 Deployment successful!');",
    "console.log('🔗 Visit: https://client-portal.devqueensus.com');",
  ];

  // Detectar scroll y pausar el parallax mientras se hace scroll
  useEffect(() => {
    let scrollTimeout: number | null = null;
    const onScroll = () => {
      if (!isScrolling) setIsScrolling(true);
      if (scrollTimeout !== null) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
        scrollTimeout = null;
      }, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout !== null) clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  // Manejar el movimiento del mouse para efectos interactivos (throttle, desactivado en scroll)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showcaseRef.current || isScrolling) return;
    const now = performance.now();
    if (now - lastUpdateRef.current < 50) return;
    lastUpdateRef.current = now;

    const rect = showcaseRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transforms para el chart (solo las barras usan animation)
  const move03X = useTransform(mouseX, (latestX: number) => {
    if (!showcaseRef.current) return 0;
    const width = showcaseRef.current.getBoundingClientRect().width;
    return (latestX - width / 2) * 0.03;
  });
  const move03Y = useTransform(mouseY, (latestY: number) => {
    if (!showcaseRef.current) return 0;
    const height = showcaseRef.current.getBoundingClientRect().height;
    return (latestY - height / 2) * 0.03;
  });

  // Iniciar el proceso de building cuando se hace hover en el editor
  const handleCodeEditorHover = () => {
    if (buildState === "idle") {
      setBuildState("building");
      setBuildProgress(0);
    }
  };

  // Efecto para manejar la animación de building
  useEffect(() => {
    let interval: number | null = null;
    if (buildState === "building") {
      interval = window.setInterval(() => {
        setBuildProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            if (interval !== null) clearInterval(interval);
            setTimeout(() => setBuildState("deployed"), 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [buildState]);

  // Determinar qué código mostrar según el estado
  const getCodeToDisplay = () => {
    switch (buildState) {
      case "building":
        return getBuildingCode(buildProgress);
      case "deployed":
        return deployedCode;
      default:
        return initialCode;
    }
  };

  // Renderizar líneas de código con clase CSS
  const renderCodeLine = (line: string, index: number) => {
    let lineClass = "line-content";
    if (line.startsWith("//")) lineClass += " comment";
    if (line.includes("✅")) lineClass += " success";
    if (line.includes("⏳")) lineClass += " pending";
    if (line.includes("🔨") || spinnerChars.some((char) => line.includes(char)))
      lineClass += " building";
    if (
      line.includes("DEPLOYED") ||
      line.includes("DEPLOYMENT COMPLETE") ||
      line.includes("LIVE")
    )
      lineClass += " deployed";

    return (
      <div key={`${buildState}-${index}-${spinnerIndex}`} className="code-line">
        <span className="line-number">{index + 1}</span>
        <span className={lineClass}>{line}</span>
      </div>
    );
  };

  // Variantes de animación para el texto y botones (sin cambios)
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Parte izquierda con badge, título, botones y stats (sin cambios) */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <div className="hero-badge">
            <span>Soluciones Tecnológicas</span>
          </div>

          <h1 className="hero-title">
            We Turn Your
            <br />
            <span className="hero-title-accent" style={{ fontSize: "38px" }}>
              {" "}
              Digital Ideas
            </span>
            <br />
            into Reality
          </h1>

          <p className="hero-description">
            At DevQueens, we craft exceptional digital experiences. From
            innovative UI/UX to cutting-edge web and mobile development, we
            elevate your business to the next level of technology.
          </p>

          <motion.div
            className="hero-buttons"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <button
              className="btn-primary"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              Get Started
            </button>
            <a href="mailto:hello@devqueensus.com" className="btn-secondary">
              Start a Project
            </a>
          </motion.div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </motion.div>

        {/* Parte derecha “showcase”: solo se renderiza cuando no hay animación de tema */}
        {showRight && (
          <div
            className="hero-visual"
            ref={showcaseRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <div className={`tech-showcase ${isHovering ? "hovering" : ""}`}>
              {/* Dashboard Mockup */}
              <div className="dashboard-mockup">
                <div className="dashboard-header">
                  <div className="dashboard-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="dashboard-title">DevQueens Dashboard</div>
                </div>
                <div className="dashboard-content">
                  <div className="dashboard-sidebar">
                    <div className="sidebar-item active"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>
                  <div className="dashboard-main">
                    <div className="chart-container">
                      {/* Animación de barras con motion.div */}
                      <motion.div
                        className="chart-bar"
                        initial={{ height: 0 }}
                        animate={{
                          height: isHovering ? "65%" : "60%",
                          background: isHovering
                            ? "linear-gradient(to top, #7c7fc6, #a855f7, #ec4899)"
                            : "linear-gradient(to top, #7c7fc6, #a855f7)",
                        }}
                        transition={{ duration: 0.8 }}
                      />
                      <motion.div
                        className="chart-bar"
                        initial={{ height: 0 }}
                        animate={{
                          height: isHovering ? "85%" : "80%",
                          background: isHovering
                            ? "linear-gradient(to top, #7c7fc6, #a855f7, #ec4899)"
                            : "linear-gradient(to top, #7c7fc6, #a855f7)",
                        }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                      <motion.div
                        className="chart-bar"
                        initial={{ height: 0 }}
                        animate={{
                          height: isHovering ? "50%" : "45%",
                          background: isHovering
                            ? "linear-gradient(to top, #7c7fc6, #a855f7, #ec4899)"
                            : "linear-gradient(to top, #7c7fc6, #a855f7)",
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="chart-bar"
                        initial={{ height: 0 }}
                        animate={{
                          height: isHovering ? "95%" : "90%",
                          background: isHovering
                            ? "linear-gradient(to top, #7c7fc6, #a855f7, #ec4899)"
                            : "linear-gradient(to top, #7c7fc6, #a855f7)",
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <motion.div
                className="code-editor"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1 }}
                style={{
                  x: isHovering && !isScrolling ? move03X : 0,
                  y: isHovering && !isScrolling ? move03Y : 0,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                  transition: { duration: 0.3 },
                }}
                onMouseEnter={handleCodeEditorHover}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="code-header">
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="code-filename">solution.ts</div>
                  {buildState === "building" && (
                    <div className="build-progress">
                      <div
                        className="build-progress-bar"
                        style={{ width: `${buildProgress}%` }}
                      />
                    </div>
                  )}
                  {buildState === "deployed" && (
                    <div className="build-status deployed">DEPLOYED</div>
                  )}
                </div>
                <div className="code-content">
                  {getCodeToDisplay().map((line, index) =>
                    renderCodeLine(line, index)
                  )}
                </div>
              </motion.div>

              {/* Floating Metrics */}
              <div className="metric-card metric-1">
                <div className="metric-icon"></div>
                <div className="metric-value">99.9%</div>
                <div className="metric-label">Uptime</div>
              </div>
              <div className="metric-card metric-2">
                <div className="metric-icon"></div>
                <div className="metric-value">2.1s</div>
                <div className="metric-label">Load Time</div>
              </div>
              <div className="metric-card metric-3">
                <div className="metric-icon"></div>
                <div className="metric-value">A+</div>
                <div className="metric-label">Performance</div>
              </div>

              {/* Geometric Shapes */}
              <div className="geometric-shape shape-1"></div>
              <div className="geometric-shape shape-2"></div>

              {/* Background Grid */}
              <div
                className="tech-grid"
                style={{
                  backgroundPosition: `${mouseX.get() * 0.02}px ${
                    mouseY.get() * 0.02
                  }px`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
