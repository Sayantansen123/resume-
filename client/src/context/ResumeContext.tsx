import React, { createContext, useContext, useState } from 'react';
import { ResumeData, Template } from '../types';

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: Template | null;
  updateResumeData: (data: Partial<ResumeData>) => void;
  setSelectedTemplate: (template: Template) => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    github: '',
    website: ''
  },
  summary: '',
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      selectedTemplate,
      updateResumeData,
      setSelectedTemplate
    }}>
      {children}
    </ResumeContext.Provider>
  );
};