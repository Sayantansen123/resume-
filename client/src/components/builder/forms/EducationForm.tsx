import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { Education } from '../../../types';

const EducationForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ['']
    };

    updateResumeData({
      education: [...resumeData.education, newEducation]
    });
    setExpandedIndex(resumeData.education.length);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = resumeData.education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    updateResumeData({ education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = resumeData.education.filter((_, i) => i !== index);
    updateResumeData({ education: updated });
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const updateAchievement = (eduIndex: number, achIndex: number, value: string) => {
    const updated = resumeData.education.map((edu, i) => {
      if (i === eduIndex) {
        const achievements = [...edu.achievements];
        achievements[achIndex] = value;
        return { ...edu, achievements };
      }
      return edu;
    });
    updateResumeData({ education: updated });
  };

  const addAchievement = (eduIndex: number) => {
    const updated = resumeData.education.map((edu, i) => 
      i === eduIndex ? { ...edu, achievements: [...edu.achievements, ''] } : edu
    );
    updateResumeData({ education: updated });
  };

  const removeAchievement = (eduIndex: number, achIndex: number) => {
    const updated = resumeData.education.map((edu, i) => {
      if (i === eduIndex) {
        const achievements = edu.achievements.filter((_, j) => j !== achIndex);
        return { ...edu, achievements };
      }
      return edu;
    });
    updateResumeData({ education: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your educational background, starting with your highest degree.
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((education, index) => (
          <div
            key={education.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex-1 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {education.degree && education.field 
                    ? `${education.degree} in ${education.field}`
                    : 'New Education'
                  }
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {education.institution 
                    ? education.institution
                    : 'Click to expand and edit'
                  }
                </p>
              </button>
              <button
                onClick={() => removeEducation(index)}
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
                      Institution *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="University of California"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Degree *
                    </label>
                    <select
                      value={education.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Degree</option>
                      <option value="High School Diploma">High School Diploma</option>
                      <option value="Associate Degree">Associate Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctoral Degree">Doctoral Degree</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={education.gpa}
                      onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="3.8/4.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={education.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Achievements & Activities
                    </label>
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {education.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="• Dean's List, Magna Cum Laude, Student Government President"
                        />
                        {education.achievements.length > 1 && (
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

        {resumeData.education.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No education added yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your educational background to strengthen your resume
            </p>
            <button
              onClick={addEducation}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;