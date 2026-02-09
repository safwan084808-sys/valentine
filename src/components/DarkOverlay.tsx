import { useState, useRef, useEffect } from "react"

const LOVE_TEXT =
  "You are the pink in my cheeks, the beat in my heart, and the love of my life. 💖"

const PLACEHOLDER_IMG =
  "https://placehold.co/400x600/ffc0cb/ff1493?text=Love+Memory"

const START_DATE = new Date("2023-01-01")

interface DarkOverlayProps {
  step: number
  setStep: (step: number) => void
  heartRain: boolean
  setHeartRain: (rain: boolean) => void
}

/* ================= TIMER ================= */

function LoveTimer() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: 20, color: "#ffc0cb" }}>
      <p>Falling for you for:</p>
      <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
        <div>{time.days}d</div>
        <div>{time.hours}h</div>
        <div>{time.minutes}m</div>
        <div>{time.seconds}s</div>
      </div>
    </div>
  )
}

/* ================= MAIN ================= */

export function DarkOverlay({
  step,
  setStep,
  heartRain,
  setHeartRain,
}: DarkOverlayProps) {
  const [typedText, setTypedText] = useState("")
  const [likeCount, setLikeCount] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  /* AUDIO */
  useEffect(() => {
    audioRef.current = new Audio("/romantic.mp3")
    audioRef.current.loop = true
  }, [])

  const handleStart = async () => {
    setStep(1)
    if (audioRef.current) {
      try {
        await audioRef.current.play()
      } catch {}
    }
  }

  /* Typing */
  useEffect(() => {
    if (step !== 1) return
    let i = 0
    const timer = setInterval(() => {
      if (i < LOVE_TEXT.length) {
        setTypedText((prev) => prev + LOVE_TEXT[i])
        i++
      } else clearInterval(timer)
    }, 50)

    return () => clearInterval(timer)
  }, [step])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // ✅ FIXED
        background:
          step === 0
            ? "radial-gradient(circle, rgba(60,0,30,0) 0%, rgba(10,0,20,0.95) 100%)"
            : "rgba(10,0,20,0.95)",
        overflowY: "auto",
        padding: "60px 20px",
        minHeight: "100vh", // ✅ IMPORTANT
        color: "#fff",
      }}
    >
      {/* STEP 0 */}
      {step === 0 && (
        <div className="glass-panel">
          <h1>Hey Beautiful 💕</h1>
          <button className="neon-btn" onClick={handleStart}>
            Open My Heart 💌
          </button>
          <LoveTimer />
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="glass-panel">
          <h1>Will You Be My Last Breath?</h1>
          <p style={{ minHeight: 80 }}>"{typedText}"</p>
          <button className="neon-btn" onClick={() => setStep(2)}>
            Our Sweetest Moments 📸
          </button>
        </div>
      )}

      {/* STEP 2 PHOTOS */}
      {step === 2 && (
        <div className="glass-panel" style={{ maxWidth: 1200 }}>
          <h1>Memories of Us 💗</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 30,
              marginTop: 40,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(`/memories/${i}.jpg`)}
                style={{
                  borderRadius: 25,
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: "0 15px 35px rgba(255,20,147,0.25)",
                }}
              >
                <img
                  src={`/memories/${i}.jpg`}
                  alt={`Memory ${i}`}
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                  }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      PLACEHOLDER_IMG)
                  }
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.6)",
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 14,
                  }}
                >
                  Click to view 💖
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 50 }}>
            <button className="neon-btn" onClick={() => setStep(3)}>
              A Special Video 🎥
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 VIDEO */}
      {step === 3 && (
        <div className="glass-panel" style={{ maxWidth: 900 }}>
          <h1>Our Love Story 🎬</h1>

          <video
            controls
            autoPlay
            loop
            style={{
              width: "100%",
              maxWidth: 800,
              borderRadius: 25,
              boxShadow: "0 0 60px rgba(255,20,147,0.6)",
              marginTop: 40,
            }}
          >
            <source src="/memories/video.mp4" type="video/mp4" />
          </video>

          <div style={{ marginTop: 40 }}>
            <button className="neon-btn" onClick={() => setStep(4)}>
              One Last Thing 💍
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="glass-panel">
          <h1 style={{ fontSize: "3rem" }}>
            Will You Be Mine? 💞
          </h1>
          <button
            className="neon-btn"
            onClick={() => {
              setLikeCount((c) => c + 1)
              setHeartRain(true)
            }}
          >
            {heartRain
              ? `YES FOREVER 💖 (${likeCount})`
              : "YES 💖"}
          </button>
        </div>
      )}

      {/* IMAGE POPUP */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <img
            src={selectedImage}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: 25,
              boxShadow: "0 0 80px #ff1493",
            }}
          />
        </div>
      )}
    </div>
  )
}
