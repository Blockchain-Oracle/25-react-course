import "./musicPlayerPractice.css";
import { useEffect, useRef, useState } from "react";
import useFetchMusic from "../../../musicePlayer/src/hooks/useFetchMusic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faPlay,
  faPause,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

export default function MusicPlayerPratice() {
  const { tracks } = useFetchMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const audioRef = useRef(null);

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newTime =
      (clickPosition / progressBar.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgressBar(newTime / audioRef.current.duration);
  };

  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSkipDirection = (direction) => {
    if (direction === "prev") {
      setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    } else {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    }
    setProgressBar(0);
  };

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const audioCurrent = audioRef.current;
    audioCurrent.addEventListener("play", handlePlay);
    audioCurrent.addEventListener("pause", handlePause);
    return () => {
      audioCurrent.removeEventListener("play", handlePlay);
      audioCurrent.removeEventListener("pause", handlePause);
    };
  }, []);
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgressBar(
          audioRef?.current.currentTime / audioRef?.current.duration
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying, currentTrack]);

  return (
    <div className="music-player-container">
      <div className="music-player-header">
        <h2>{tracks[currentTrack].title}</h2>
        <h3>{tracks[currentTrack].artist}</h3>
      </div>
      <div className="music-player-image">
        <img
          src={tracks[currentTrack].image}
          alt={tracks[currentTrack].title}
        />
      </div>
      <div className="audio">
        <audio
          ref={audioRef}
          src={tracks[currentTrack].source}
          onEnded={() => handleSkipDirection("next")}
        />
      </div>
      <div className="progress-container" onClick={handleProgressClick}>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progressBar * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="music-player-buttons">
        <button
          className="prev-button"
          onClick={() => {
            handleSkipDirection("prev");
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="play-pause-button" onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button
          className="next-button"
          onClick={() => {
            handleSkipDirection("next");
          }}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
}
