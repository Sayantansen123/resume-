import React, { useState } from 'react';
import { Plus, Trash2, Building, Calendar, MapPin } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { WorkExperience } from '../../../types';

const WorkExperienceForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };

    updateResumeData({
      workExperience: [...resumeData.workExperience, newExperience]
    });
    setExpandedIndex(resumeData.workExperience.length);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    const updated = resumeData.workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    updateResumeData({ workExperience: updated });
  };

  const removeExperience = (index: number) => {
    const updated = resumeData.workExperience.filter((_, i) => i !== index);
    updateResumeData({ workExperience: updated });
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = resumeData.workExperience.map((exp, i) => {
      if (i === expIndex) {
        const achievements = [...exp.achievements];
        achievements[achIndex] = value;
        return { ...exp, achievements };
      }
      return exp;
    });
    updateResumeData({ workExperience: updated });
  };

  const addAchievement = (expIndex: number) => {
    const updated = resumeData.workExperience.map((exp, i) => 
      i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
    updateResumeData({ workExperience: updated });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = resumeData.workExperience.map((exp, i) => {
      if (i === expIndex) {
        const achievements = exp.achievements.filter((_, j) => j !== achIndex);
        return { ...exp, achievements };
      }
      return exp;
    });
    updateResumeData({ workExperience: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your professional work experience, starting with your most recent position.
          </p>
        </div>
        <button
          onClick={addWorkExperience}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.workExperience.map((experience, index) => (
          <div
            key={experience.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex-1 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experience.position || 'New Position'} 
                  {experience.company && ` at ${experience.company}`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {experience.startDate && experience.endDate 
                    ? `${experience.startDate} - ${experience.current ? 'Present' : experience.endDate}`
                    : 'Click to expand and edit'
                  }
                </p>
              </button>
              <button
                onClick={() => removeExperience(index)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`current-${index}`}
                          checked={experience.current}
                          onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`current-${index}`} className="text-sm text-gray-700 dark:text-gray-300">
                          I currently work here
                        </label>
                      </div>
                      {!experience.current && (
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="month"
                            value={experience.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Brief description of your role and responsibilities..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Key Achievements
                    </label>
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="• Increased team productivity by 25% through process optimization"
                        />
                        {experience.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(index, achIndex)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {resumeData.workExperience.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No work experience added yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start by adding your most recent work experience
            </p>
            <button
              onClick={addWorkExperience}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperienceForm;