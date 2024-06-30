import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from './RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../../service/GlobalApi';
import { toast } from 'sonner';

const createFormField = () => ({
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '', // Changed from workSummary to workSummery
});

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(resumeInfo?.experience || [createFormField()]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleRichTextChange = (value, index) => {
    const newEntries = [...experienceList];
    newEntries[index]['workSummery'] = value; // Changed from workSummary to workSummery
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, createFormField()]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res);
      setLoading(false);
      toast('Details updated!');
    }, (error) => {
      setLoading(false);
      toast('Server Error, Try again!');
    });
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((field, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    name='title'
                    value={field.title}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    name='companyName'
                    value={field.companyName}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.companyName}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    name='city'
                    value={field.city}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.city}
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input
                    name='state'
                    value={field.state}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    value={field.startDate}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.startDate}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    value={field.endDate}
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={field.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  <RichTextEditor
                    index={index}
                    value={field.workSummery}
                    onChange={(value) => handleRichTextChange(value, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div>
            <Button
              variant='outline'
              className='text-primary'
              onClick={addNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              variant='outline'
              onClick={removeExperience}
              className='text-primary'
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
