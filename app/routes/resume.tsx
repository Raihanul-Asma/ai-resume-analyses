import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], {
        type: "application/pdf",
      });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      setImageUrl(URL.createObjectURL(imageBlob));
      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="pt-0">
      {/* TOP NAV */}
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to HomePage
          </span>
        </Link>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex w-full min-h-screen">
        {/* LEFT: STICKY RESUME */}
        <section className="w-1/2 max-lg:hidden sticky top-0 h-screen flex items-center justify-center bg-[url('/images/review.jpg')] bg-cover">
          {imageUrl && resumeUrl && (
            <div className="gradient-border h-[90%] w-auto animate-in fade-in duration-1000">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="h-full object-contain rounded-2xl"
                  alt="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* RIGHT: SCROLLABLE FEEDBACK */}
        {/* RIGHT: SCROLLABLE FEEDBACK */}
        <section className="w-1/2 max-lg:w-full px-10 py-12 overflow-y-auto bg-gray-50">
            <h2 className="text-4xl font-bold mb-10 text-gray-900">
            Resume Review
            </h2>

            {feedback ? (
            <div className="flex flex-col gap-12 animate-in fade-in duration-1000">

            {/* SUMMARY CARD */}  
            <div className="bg-white rounded-2xl shadow-md p-6">
                <Summary feedback={feedback} />
            </div>

            {/* ATS CARD */}
            <div className="bg-white rounded-2xl shadow-md p-6">
            <ATS
            score={feedback.ATS.score || 0}
            suggestions={feedback.ATS.tips || []}
            />
            </div>

            {/* DETAILS CARD */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <Details feedback={feedback} />
            </div>

            </div>
             ) : (
            <div className="flex justify-center items-center h-[60vh]">
            <img
                src="/images/resume-scan-2.gif"
                className="w-full max-w-md"
            />
            </div>
            )}
        </section>

      </div>
    </main>
  );
};

export default Resume;
