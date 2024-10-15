// pages/index.js
import { useState, useRef } from "react";
import { storage } from "../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [timer, setTimer] = useState(60);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    setRecording(true);
    setTimer(60);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });
    videoRef.current.srcObject = stream;

    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
    };

    mediaRecorderRef.current.start();

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          stopRecording();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  const uploadVideo = async () => {
    if (!videoBlob) return;
    const storageRef = ref(storage, `videos/${Date.now()}.webm`);
    try {
      await uploadBytes(storageRef, videoBlob);
      alert("Vídeo enviado com sucesso!");
    } catch (error) {
      alert("Falha ao enviar o vídeo.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Gravação de Vídeo</h1>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <div>
        {recording ? (
          <div>
            <p>Gravando... Tempo restante: {timer}s</p>
            <button onClick={stopRecording}>Parar Gravação</button>
          </div>
        ) : (
          <button onClick={startRecording}>Iniciar Gravação</button>
        )}
        <button onClick={uploadVideo} disabled={!videoBlob}>
          Enviar Vídeo
        </button>
      </div>
    </div>
  );
}
