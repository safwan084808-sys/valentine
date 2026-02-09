import { useState } from 'react'

export function OverlayUI() {
    const [active, setActive] = useState(false)

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            fontFamily: "'Cinzel', serif", // Assuming you might add a font, or fallback to serif
            color: '#ffcccc'
        }}>
            {/* Main Glass Panel Container */}
            <div style={{
                position: 'relative',
                width: '80%',
                maxWidth: '1000px',
                height: '70%',
                background: 'rgba(20, 0, 5, 0.4)', // Dark semi-transparent
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 0, 60, 0.5)',
                boxShadow: '0 0 30px rgba(255, 0, 60, 0.2), inset 0 0 20px rgba(255, 0, 60, 0.1)',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'auto' // Re-enable clicks
            }}>

                {/* Title */}
                <h1 style={{
                    fontSize: '3rem',
                    margin: '0 0 2rem 0',
                    color: '#ff0044',
                    textShadow: '0 0 15px #ff0044, 0 0 30px #ff0044',
                    letterSpacing: '5px',
                    textAlign: 'center'
                }}>
                    ETERNAL MEMORIES
                </h1>

                {/* Photo Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    width: '100%'
                }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid #ff0055',
                            borderRadius: '10px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ width: '80%', height: '70%', background: `hsl(${340 + i * 10}, 60%, 20%)`, borderRadius: '5px' }}></div>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#ffaaaa' }}>Memory {i}</p>
                        </div>
                    ))}
                </div>

                {/* Magical Button */}
                <button
                    onClick={() => setActive(!active)}
                    style={{
                        marginTop: 'auto',
                        padding: '1rem 3rem',
                        background: active ? '#ff0000' : 'transparent',
                        border: '2px solid #ff0000',
                        color: active ? '#fff' : '#ff0000',
                        fontSize: '1.2rem',
                        letterSpacing: '2px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: active ? '0 0 30px #ff0000' : '0 0 10px #ff0000',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                    }}
                >
                    {active ? "Love Unleashed" : "Activate Love"}
                </button>

                {/* Floating Particles (CSS Animation) */}
                {active && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, width: '100%', height: '100%',
                        pointerEvents: 'none',
                        overflow: 'hidden'
                    }}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${Math.random() * 100}%`,
                                top: '-10%',
                                fontSize: '2rem',
                                color: '#ff0044',
                                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}>
                                ❤️
                            </div>
                        ))}
                        <style>{`
                    @keyframes fall {
                        to { transform: translateY(110vh) rotate(360deg); }
                    }
                `}</style>
                    </div>
                )}
            </div>
        </div>
    )
}
