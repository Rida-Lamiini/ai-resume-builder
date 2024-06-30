import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetail'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EductionalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div>
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        <SummeryPreview resumeInfo={resumeInfo}/>
        <ExperiencePreview resumeInfo={resumeInfo}/>
        <EducationalPreview resumeInfo={resumeInfo}/>
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview