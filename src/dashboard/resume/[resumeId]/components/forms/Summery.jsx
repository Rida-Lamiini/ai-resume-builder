import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIchatSession } from './../../../../../../service/AIModal'

function Summery({ enabledNext }) {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const [aiGeneratedSummeryList,setAiGeneratedSummeryList] = useState()

    const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

    const [summery, setSummary] = useState(resumeInfo?.summery || '')
    const params = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateSummeryFromAI = async ()=>{
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
        console.log(PROMPT);

        const result = await AIchatSession.sendMessage(PROMPT);
        setLoading(false)
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummeryList(JSON.parse(result.response.text()))

    }
    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        enabledNext(false)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                console.log(resp)
                enabledNext(true)
                setLoading(false)
                toast('Details updated')
            })
            .catch(error => {
                console.error('API error:', error)
                setLoading(false)
                toast.error('Failed to update details')
            })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>
                <form onSubmit={onSave}>
                    <div className='mt-7'>
                        <div className='flex justify-between items-end'>
                            <label htmlFor='summary'>Add Summary</label>
                            <Button 
                            onClick={() => GenerateSummeryFromAI()}
                            type='button'
                            className='border-primary text-primary' variant='outline' size='sm'>
                                <Brain className='h-4 w-4 ml-1'/>  Generate from AI
                            </Button>
                        </div>
                        <Textarea
                            id='summary'
                            required
                            className='mt-5'
                            value={summery}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </div>
                    <div className='mt-3 flex justify-end'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
            {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
        </div>
    )
}

export default Summery
