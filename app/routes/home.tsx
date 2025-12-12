import type { Route } from "./+types/home";
import NavBar from "~/components/NavBar";
import ResumeCard from "~/components/ResumeCard";
import {resumes} from "../../constants";
import { usePuterStore } from "~/lib/puter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeMind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
   const {isLoading,auth}=usePuterStore();
      const location=useLocation();
      const next=location.search.split('next=')[1];
      const navigate=useNavigate();
      useEffect(()=>{
          if(!auth.isAuthenticated) navigate('/auth?next=/');
      },[auth.isAuthenticated,next])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <NavBar />
    <section className="main-section">
        <div className="page-heading py-16" >
            <h1>
                Track your Application & Resume Ratings
            </h1>
            <h2>
                Review your submission and check AI-Powered feedback.
            </h2>

        </div>
    </section>
      {resumes.length > 0 && (
          <div className="resumes-section">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
              ))}
          </div>
      )}

  </main>

}
