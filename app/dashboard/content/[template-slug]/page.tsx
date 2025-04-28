'use client';
import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import Template from '@/app/(data)/Template';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';

interface PROPS {
  params: {
    'template-slug': string;
  };
}

// ✅ Save to localStorage history
const saveToLocalHistory = (
  template: string,
  response: string
) => {
  const newItem = {
    id: Date.now(),
    template,
    response,
    date: new Date().toLocaleDateString(),
    words: response.split(' ').length,
  };

  const existing = JSON.parse(localStorage.getItem('ai-history') || '[]');
  existing.unshift(newItem);
  localStorage.setItem('ai-history', JSON.stringify(existing));
};

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug === props.params['template-slug']
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();

  const totalUsageContext = useContext(TotalUsageContext);
  if (!totalUsageContext) {
    throw new Error('TotalUsageContext is not provided');
  }
  const { totalUsage, setTotalUsage } = totalUsageContext;

  if (!selectedTemplate) {
    return <div>Template not found</div>;
  }

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      console.log('Please Upgrade');
      router.push('/dashboard/billing');
      return;
    }

    setLoading(true);

    try {
      const SelectedPrompt = selectedTemplate.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + ', ' + SelectedPrompt;

      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponse = await result?.response.text();

      setAiOutput(aiResponse);

      // ✅ Save to localStorage history
      saveToLocalHistory(selectedTemplate.name, aiResponse); // Access title safely here

      // ✅ Save to database
      await SaveInDb(formData, selectedTemplate.slug, aiResponse);

      // ✅ Update token usage
      const newTotalUsage = totalUsage + aiResponse.length;
      setTotalUsage(newTotalUsage);
    } catch (error) {
      console.error('Error generating AI content:', error);
      setAiOutput('Error generating content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress || 'unknown';

      await db.insert(AIOutput).values({
        formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      console.log('Saved to DB');
    } catch (error) {
      console.error('Error saving to database:', error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />

        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
