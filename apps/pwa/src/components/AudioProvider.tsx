import { createContext, useCallback, useContext, useEffect, useRef, useState, type PropsWithChildren } from "react"
import Button from "./Button"
import { PlayIcon } from "./AudioSvgs"
import { cn } from "../utils/cn"

type AudioContextType = {
  audio: React.RefObject<HTMLAudioElement>
  // eslint-disable-next-line no-unused-vars
  setGameTrack: (track: "menu" | "game" | "victory") => void
}

const AudioContext = createContext<AudioContextType>({ audio: { current: null }, setGameTrack: () => {} })

export const AudioProvider = ({ children }: PropsWithChildren) => {
  const [audioTrack, setAudioTrack] = useState("./menu.mp3")
  const [isPlaying, setIsPlaying] = useState(false)

  const setGameTrack = useCallback((track: "menu" | "game" | "victory") => {
    const _track = `./${track}.mp3`
    setAudioTrack(current => {
      if (current === _track) {
        return current
      }
      audioRef.current && (audioRef.current.src = _track)
      return _track
    })
  }, [])

  useEffect(() => {
    isPlaying && audioRef.current?.play()
  }, [isPlaying, audioTrack])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(curr => !curr)
  }, [isPlaying])

  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <AudioContext.Provider value={{ audio: audioRef, setGameTrack }}>
      {children}
      <audio className="ml-auto" ref={audioRef} id="audio" loop>
        <source src={audioTrack} type="audio/mpeg" />
      </audio>
      <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
    </AudioContext.Provider>
  )
}

const PlayButton = ({ onClick, isPlaying }: { onClick: () => void; isPlaying: boolean }) => {
  return (
    <Button
      className={cn("fixed bottom-4 right-4 md:bottom-8 md:right-8 md:size-12", {
        "z-10 after:absolute after:bottom-0 after:h-full after:w-1 after:origin-center after:rotate-45 after:rounded-full after:bg-purple12":
          !isPlaying,
      })}
      variant="purple"
      size="icon"
      onClick={onClick}
    >
      <PlayIcon className="h-6 w-6 fill-amber5" />
    </Button>
  )
}

export const useAudio = () => useContext(AudioContext)
