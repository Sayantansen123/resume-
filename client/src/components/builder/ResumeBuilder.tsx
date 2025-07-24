import React, { useState } from 'react';
import { Save, Download, Eye } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';

const sections = [
  { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
  { id: 'summary', label: 'Summary', component: SummaryForm },
  { id: 'experience', label: 'Work Experience', component: WorkExperienceForm },
  { id: 'education', label: 'Education', component: EducationForm },
  { id: 'projects', label: 'Projects', component: ProjectsForm },
  { id: 'skills', label: 'Skills', component: SkillsForm },
  { id: 'certifications', label: 'Certifications', component: CertificationsForm },
  { id: 'languages', label: 'Languages', component: LanguagesForm },
];

const ResumeBuilder: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || PersonalInfoForm;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Build Your Resume
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in your information to create a professional resume
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sections
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Progress</span>
                </button>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;