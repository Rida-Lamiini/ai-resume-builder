import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  // Initialize educationalList with default values or resumeInfo data
  const initialEducationalList = resumeInfo?.education || [{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }];
  
  const [educationalList, setEducationalList] = useState(initialEducationalList);

  useEffect(() => {
    if (resumeInfo?.education) {
      setEducationalList(resumeInfo.eduction);
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEntries = [...educationalList];
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({id, ...rest})=> rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then(resp => {
        console.log(resp);
        setLoading(false);
        toast('Details updated!');
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        toast('Server Error, Please try again!');
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList, setResumeInfo, resumeInfo]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item.universityName}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item.major}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.endDate}
                />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={addNewEducation} className="text-primary">
            + Add More Education
          </Button>
          <Button variant="outline" onClick={removeEducation} className="text-primary">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Education;
