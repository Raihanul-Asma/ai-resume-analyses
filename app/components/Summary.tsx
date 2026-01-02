import React from 'react'
import ScoreGauge from './ScoreGauge'
const Category=({title,score}: {title:string,score:number})=>{
  const textColor=score > 70 ? 'text-green-600'
   :score >49
   ? 'text-yellow-600' : 'text-red-600'
  return(
   <div className="resume-summary">
  <div className="category flex items-center justify-between">

    {/* LEFT: Title */}
    <p className="text-2xl font-medium">
      {title}
    </p>

    {/* RIGHT: Round Score Gauge */}
    <ScoreGauge score={score} />

  </div>
</div>

  )
}

const Summary = ({feedback }:{feedback:Feedback}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className="flex items-center gap-6 p-6 border-b">
  <div className="shrink-0">
    <ScoreGauge score={feedback.overallScore} />
  </div>

  <div className="flex flex-col justify-center">
    <h2 className="text-2xl font-bold leading-tight">
      Your Resume Score
    </h2>
    <p className="text-sm text-gray-500 max-w-sm">
      This score is calculated based on the variables listed below.
    </p>
  </div>
</div>

      <Category title='Tone & Style' score={feedback.toneAndStyle.score}/>
      <Category title='Content' score={feedback.content.score}/>
      <Category title='Structure' score={feedback.structure.score}/>
      <Category title='Skills' score={feedback.skills.score}/>
    </div>
  )
}

export default Summary
