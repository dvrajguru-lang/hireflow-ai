"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useUser } from "@clerk/nextjs";

export default function InterviewPage() {

  const { isSignedIn, user } = useUser();

  const [mounted, setMounted] = useState(false);

  const [messages, setMessages] = useState<any[]>([]);

  const [question, setQuestion] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("Technical");

  const [manualAnswer, setManualAnswer] = useState("");

  useEffect(() => {

    setMounted(true);

  }, []);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  function speakText(text: string) {

    if (!window.speechSynthesis) return;

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);

  }

  async function generateQuestion(newMessages?: any[]) {

    try {

      setLoading(true);

      const updatedMessages = newMessages || messages;

      const response = await fetch("/api/interview", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
          mode,
        }),

      });

      const data = await response.json();

      setQuestion(data.question);

      speakText(data.question);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.question,
        },
      ]);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function submitAnswer() {

    const finalAnswer =
      manualAnswer || transcript;

    if (!finalAnswer) return;

    const updatedMessages = [

      ...messages,

      {
        role: "user",
        content: finalAnswer,
      },

    ];

    setMessages(updatedMessages);

    resetTranscript();

    setManualAnswer("");

    await generateQuestion(updatedMessages);

  }

  async function evaluateAnswer() {

    try {

      setLoading(true);

      const finalAnswer =
        manualAnswer || transcript;

      const response = await fetch("/api/evaluate", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question,
          answer: finalAnswer,
          mode,
          user_email:
            user?.primaryEmailAddress?.emailAddress,
        }),

      });

      const data = await response.json();

      setFeedback(data.feedback);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (!mounted) {

    return null;

  }

  if (!isSignedIn) {

    return (

      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-5xl font-bold mb-6">
            Login Required
          </h1>

          <p className="text-zinc-400 mb-8">
            Please login to access AI interviews.
          </p>

        </div>

      </div>

    );

  }

  if (!browserSupportsSpeechRecognition) {

    return (
      <div className="p-10 text-white">
        Browser does not support speech recognition.
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-4">
            AI Live Interview Simulator
          </h1>

          <p className="text-zinc-400 mb-10">
            Practice realistic AI-driven interviews.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">

            {[
              "Technical",
              "HR",
              "Behavioral",
              "System Design",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setMode(item)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  mode === item
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          <button
            onClick={() => generateQuestion()}
            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold"
          >
            {loading ? "Generating..." : `Start ${mode} Interview`}
          </button>

          {question && (

            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-zinc-400 mb-4">
                AI Interviewer
              </p>

              <h2 className="text-3xl leading-relaxed font-semibold">
                {question}
              </h2>

            </div>

          )}

          <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

            <p className="text-zinc-400 mb-4">
              Your Answer
            </p>

            <textarea
              value={manualAnswer}
              onChange={(e) =>
                setManualAnswer(e.target.value)
              }
              placeholder="Type your answer here or use voice input below..."
              className="w-full min-h-[180px] bg-transparent border border-white/10 rounded-2xl p-5 outline-none resize-none"
            />

            {transcript && (

              <div className="mt-6 p-5 border border-white/10 rounded-2xl bg-white/5">

                <p className="text-zinc-400 mb-2">
                  Voice Transcript
                </p>

                <div className="whitespace-pre-wrap leading-relaxed">
                  {transcript}
                </div>

              </div>

            )}

            <div className="flex gap-4 mt-8 flex-wrap">

              <button
                onClick={() =>
                  SpeechRecognition.startListening({
                    continuous: true,
                  })
                }
                className="bg-green-600 px-6 py-3 rounded-2xl font-semibold"
              >
                Start Speaking
              </button>

              <button
                onClick={SpeechRecognition.stopListening}
                className="bg-red-600 px-6 py-3 rounded-2xl font-semibold"
              >
                Stop
              </button>

              <button
                onClick={() => {
                  resetTranscript();
                  setManualAnswer("");
                }}
                className="bg-zinc-700 px-6 py-3 rounded-2xl font-semibold"
              >
                Reset
              </button>

            </div>

            <div className="flex gap-4 mt-8 flex-wrap">

              <button
                onClick={submitAnswer}
                className="bg-blue-600 px-8 py-4 rounded-2xl font-semibold"
              >
                Submit Answer
              </button>

              <button
                onClick={evaluateAnswer}
                className="bg-purple-600 px-8 py-4 rounded-2xl font-semibold"
              >
                Evaluate
              </button>

            </div>

          </div>

          {feedback && (

            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">
                AI Feedback
              </h2>

              <div className="whitespace-pre-wrap leading-relaxed">
                {feedback}
              </div>

            </div>

          )}

        </div>

      </section>

    </main>

  );

}