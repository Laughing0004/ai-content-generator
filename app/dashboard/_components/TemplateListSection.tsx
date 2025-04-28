import Templates from '@/app/(data)/Template';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

export interface TEMPLATE {
  name: string;     // Name of the template (possibly redundant with title?)
  desc: string;     // Description of the template
  icon: string;     // Icon for the template
  category: string; // Category of the template
  slug: string;     // Unique slug for identifying the template
  aiPrompt: string; // AI prompt associated with the template
  form?: FORM[];    // Optional form data associated with the template
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface Props {
  userSearchInput: string | undefined;
}

function TemplateListSection({ userSearchInput }: Props) {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(Templates);

  // Effect to filter templates based on user input
  useEffect(() => {
    if (userSearchInput) {

      const filteredTemplates = Templates.filter((template) =>
        
        template.name.toLowerCase().includes(userSearchInput.toLowerCase()) // search by title instead of name
      );
      setTemplateList(filteredTemplates);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.length > 0 ? (
        templateList.map((template, index) => (
          <TemplateCard key={template.slug || index} {...template} />
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-500">
          No templates match your search.
        </div>
      )}
    </div>
  );
}

export default TemplateListSection;
