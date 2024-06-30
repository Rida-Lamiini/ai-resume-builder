import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain } from 'lucide-react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { AIchatSession } from './../../../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT =
  'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array , only array of experinece), give me result in HTML tags';

function RichTextEditor({ onChange, index }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (resumeInfo?.experience[index]?.workSummery) {
      setInitialValue(resumeInfo.experience[index].workSummery);
      setValue(resumeInfo.experience[index].workSummery);
    }
  }, [resumeInfo, index]);

  const handleEditorChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
  
    setLoading(true);
  
    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
      const result = await AIchatSession.sendMessage(prompt);
      
      const resp=result.response.text()
      setValue(resp.replace('[','').replace(']',''));
  
      
    } catch (error) {
      console.error('Error generating summary from AI:', error);
      toast('Failed to generate summary from AI');
    } finally {
      setLoading(false);
    }
  };
  

  const resetToInitial = () => {
    setValue(initialValue);
    onChange(initialValue);
  };

  return (
    <div>
      <div className='flex justify-between my-2 items-center'>
        <label className='text-xs'>Summary</label>
        <Button
          variant='outline'
          size='sm'
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className='flex gap-2 border-primary text-primary'
        >
          {loading ? (
            <>
              <span className='animate-spin h-4 w-4 border-t-2 border-b-2 border-primary rounded-full'></span>
              <span className='ml-2'>Generating...</span>
            </>
          ) : (
            <>
              <Brain className='h-4 w-4' />
              <span className='ml-2'>Generate from AI</span>
            </>
          )}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={resetToInitial}
          disabled={loading || !initialValue}
          className='flex gap-2 border-primary text-primary'
        >
          Reset
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <HtmlButton />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
