import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Eduction from './forms/Eduction'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1)
    const [enableNext, setEnableNext] = useState(true)
    // by default is false
    const {resumeId} = useParams();

    return (
        <div>
            <div className='flex justify-between items-center'>
                
                <div className='flex gap-5'>
                <Link to={'/dashboard'}>
                    <Button><Home/></Button>
                    </Link> 
                    {/* <Button variant='outline' size='sm' className='flex gap-2'>
                        <LayoutGrid /> Theme
                    </Button> */}
                    <ThemeColor/>
                   
                   
                </div>
                <div className='flex gap-2'>
                    {activeFormIndex > 1 && (
                        <Button
                            className='flex gap-2'
                            size='sm'
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                            disabled={!enableNext}
                        >
                            <ArrowLeft />
                        </Button>
                    )}
                    <Button
                        className='flex gap-2'
                        size='sm'
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                        disabled={!enableNext}
                    >
                        Next <ArrowRight />
                    </Button>
                </div>
            </div>
            {activeFormIndex === 1 ? (
                <PersonalDetail enableNext={(v) => setEnableNext(v)} />
            )
            :activeFormIndex==2?
              <Summery  enabledNext={(v)=>setEnableNext(v)} />
            :activeFormIndex==3 ?
                <Experience enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex == 4 ?
                <Eduction enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex ==5 ?
                <Skills enabledNext={(v)=>setEnableNext(v)} />

            :activeFormIndex == 6 ?
                <Navigate to={'/my-resume/'+resumeId+'/view'}/>

            
            : null}
        </div>
    )
}

export default FormSection
