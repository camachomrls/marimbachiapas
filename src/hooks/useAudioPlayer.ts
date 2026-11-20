import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { songsData, type Song } from "../data/songsData";

function buildShuffledQueue(
  songs: Song[],
  firstSong?: Song | null,
  avoidFirstId?: string,
): Song[] {
  const pool = firstSong
    ? songs.filter((s) => s.id !== firstSong.id)
    : [...songs];

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = pool[i];
    pool[i] = pool[j];
    pool[j] = temp;
  }

  if (
    !firstSong &&
    avoidFirstId &&
    pool.length > 1 &&
    pool[0].id === avoidFirstId
  ) {
    const swapIdx = 1 + Math.floor(Math.random() * (pool.length - 1));
    const temp = pool[0];
    pool[0] = pool[swapIdx];
    pool[swapIdx] = temp;
  }

  return firstSong ? [firstSong, ...pool] : pool;
}

/**
 * Custom hook that manages global audio playback and a non-repeating shuffle queue.
 */
export function useAudioPlayer(songs: Song[] = songsData) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffleMode, setIsShuffleMode] = useState<boolean>(false);
  const [shuffleQueue, setShuffleQueue] = useState<Song[]>([]);
  const [shuffleIndex, setShuffleIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSongRef = useRef<Song | null>(null);
  const isShuffleModeRef = useRef<boolean>(false);
  const shuffleQueueRef = useRef<Song[]>([]);
  const shuffleIndexRef = useRef<number>(0);
  const songsRef = useRef<Song[]>(songs);
  songsRef.current = songs;

  const playSongDirect = useCallback((song: Song) => {
    const audio = audioRef.current;
    if (!audio) return;

    currentSongRef.current = song;
    setCurrentSong(song);
    audio.pause();
    audio.src = encodeURI(song.src);
    audio.load();
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Error al iniciar audio:", err));
  }, []);

  const advanceToNextShuffleTrack = useCallback(() => {
    const catalog = songsRef.current;
    let queue = shuffleQueueRef.current;
    let nextIdx = shuffleIndexRef.current + 1;

    if (queue.length === 0 || nextIdx >= queue.length) {
      queue = buildShuffledQueue(catalog, null, currentSongRef.current?.id);
      nextIdx = 0;
      shuffleQueueRef.current = queue;
      setShuffleQueue(queue);
    }

    shuffleIndexRef.current = nextIdx;
    setShuffleIndex(nextIdx);

    if (!isShuffleModeRef.current) {
      isShuffleModeRef.current = true;
      setIsShuffleMode(true);
    }

    const nextSong = queue[nextIdx];
    if (nextSong) {
      playSongDirect(nextSong);
    }
  }, [playSongDirect]);

  // Initialize and handle global single-audio manager
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const handleEnded = () => {
      // Automatically continue playing without pausing in random non-repeating order
      advanceToNextShuffleTrack();
    };

    const handlePause = () => {
      if (!audio.ended) {
        setIsPlaying(false);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleError = () => {
      console.warn("Error reproduciendo audio:", audio.src);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [advanceToNextShuffleTrack]);

  const handleStartOrSkipShuffle = useCallback(() => {
    const catalog = songsRef.current;
    if (!isShuffleModeRef.current || shuffleQueueRef.current.length === 0) {
      const newQueue = buildShuffledQueue(
        catalog,
        null,
        currentSongRef.current?.id,
      );
      shuffleQueueRef.current = newQueue;
      shuffleIndexRef.current = 0;
      isShuffleModeRef.current = true;

      setShuffleQueue(newQueue);
      setShuffleIndex(0);
      setIsShuffleMode(true);

      if (newQueue[0]) {
        playSongDirect(newQueue[0]);
      }
    } else {
      advanceToNextShuffleTrack();
    }
  }, [advanceToNextShuffleTrack, playSongDirect]);

  const handleToggleShuffleMode = useCallback(() => {
    const catalog = songsRef.current;
    if (isShuffleModeRef.current) {
      isShuffleModeRef.current = false;
      setIsShuffleMode(false);
    } else {
      const active = currentSongRef.current;
      const newQueue = buildShuffledQueue(catalog, active);
      shuffleQueueRef.current = newQueue;
      shuffleIndexRef.current = 0;
      isShuffleModeRef.current = true;

      setShuffleQueue(newQueue);
      setShuffleIndex(0);
      setIsShuffleMode(true);

      if (!active && newQueue[0]) {
        playSongDirect(newQueue[0]);
      }
    }
  }, [playSongDirect]);

  const handleTogglePlay = useCallback(
    (song: Song) => {
      const audio = audioRef.current;
      if (!audio) return;

      const catalog = songsRef.current;

      if (currentSong?.id === song.id) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.error("Error al reanudar audio:", err));
        }
      } else {
        // Keep non-repeating queue synchronized when user picks a specific song
        if (isShuffleModeRef.current && shuffleQueueRef.current.length > 0) {
          const queue = [...shuffleQueueRef.current];
          const curIdx = shuffleIndexRef.current;
          const foundIdx = queue.findIndex((s) => s.id === song.id);

          if (foundIdx > curIdx) {
            const targetIdx = curIdx + 1;
            const temp = queue[targetIdx];
            queue[targetIdx] = queue[foundIdx];
            queue[foundIdx] = temp;
            shuffleQueueRef.current = queue;
            shuffleIndexRef.current = targetIdx;
            setShuffleQueue(queue);
            setShuffleIndex(targetIdx);
          } else {
            const rebuilt = buildShuffledQueue(catalog, song);
            shuffleQueueRef.current = rebuilt;
            shuffleIndexRef.current = 0;
            setShuffleQueue(rebuilt);
            setShuffleIndex(0);
          }
        } else {
          // Prepare a non-repeating shuffle queue starting from this song so when it finishes it continues automatically
          const rebuilt = buildShuffledQueue(catalog, song);
          shuffleQueueRef.current = rebuilt;
          shuffleIndexRef.current = 0;
          setShuffleQueue(rebuilt);
          setShuffleIndex(0);
        }

        playSongDirect(song);
      }
    },
    [currentSong, isPlaying, playSongDirect],
  );

  const handleClosePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    currentSongRef.current = null;
    isShuffleModeRef.current = false;
    setCurrentSong(null);
    setIsPlaying(false);
    setIsShuffleMode(false);
  }, []);

  const nextSongInQueue = useMemo(() => {
    if (!isShuffleMode || shuffleQueue.length === 0) return null;
    const nextIdx = shuffleIndex + 1;
    return nextIdx < shuffleQueue.length ? shuffleQueue[nextIdx] : null;
  }, [isShuffleMode, shuffleQueue, shuffleIndex]);

  return {
    currentSong,
    isPlaying,
    isShuffleMode,
    shuffleQueue,
    shuffleIndex,
    nextSongInQueue,
    totalSongs: songs.length,
    handleTogglePlay,
    handleStartOrSkipShuffle,
    handleToggleShuffleMode,
    advanceToNextShuffleTrack,
    handleClosePlayer,
  };
}

export default useAudioPlayer;
