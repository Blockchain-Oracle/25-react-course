import "./musicPlayer.css";
import { useRef, useState, useEffect, useCallback } from "react";
import useFetchMusic from "../hooks/useFetchMusic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faPlay,
  faPause,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

export default function MusicPlayer() {
  const { tracks } = useFetchMusic();
  const [currentMusic, setCurrentMusic] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trackingProgress, setTrackingProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setTrackingProgress(
          audioRef.current.currentTime / audioRef.current.duration
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("play", handlePlay);
    return () => {
      audioElement?.removeEventListener("pause", handlePause);
      audioElement?.removeEventListener("play", handlePlay);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleSkipTrack = useCallback(
    (direction) => {
      if (direction === "prev") {
        setCurrentMusic((prev) => (prev - 1 + tracks.length) % tracks.length);
      } else {
        setCurrentMusic((prev) => (prev + 1) % tracks.length);
      }
      setTrackingProgress(0);
    },
    [tracks.length]
  );

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    }
  }, [currentMusic, playing]);

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newTime =
      (clickPosition / progressBar.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setTrackingProgress(newTime / audioRef.current.duration);
  };

  return (
    <div className="music-player-container">
      <div className="music-info">
        <h1>{tracks[currentMusic].title}</h1>
        <h2>{tracks[currentMusic].artist}</h2>
      </div>
      <div className="album-cover">
        <img
          src={tracks[currentMusic].image}
          alt={tracks[currentMusic].title}
        />
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentMusic].source}
        onEnded={() => handleSkipTrack("next")}
      />
      <div className="progress-container" onClick={handleProgressClick}>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${trackingProgress * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="controls">
        <button className="control-btn" onClick={() => handleSkipTrack("prev")}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button className="control-btn play-pause" onClick={handlePlayPause}>
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </button>
        <button className="control-btn" onClick={() => handleSkipTrack("next")}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
    </div>
  );
}
