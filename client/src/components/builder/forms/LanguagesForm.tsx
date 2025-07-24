import React, { useState } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { Language } from '../../../types';

const proficiencyLevels = [
  { value: 'Basic', label: 'Basic', description: 'Can understand and use familiar everyday expressions' },
  { value: 'Conversational', label: 'Conversational', description: 'Can handle most everyday situations' },
  { value: 'Fluent', label: 'Fluent', description: 'Can communicate effectively in most contexts' },
  { value: 'Native', label: 'Native', description: 'Native or bilingual proficiency' }
];

const LanguagesForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageProficiency, setNewLanguageProficiency] = useState<Language['proficiency']>('Conversational');

  const addLanguage = () => {
    if (!newLanguageName.trim()) return;

    const newLanguage: Language = {
      name: newLanguageName.trim(),
      proficiency: newLanguageProficiency
    };

    updateResumeData({
      languages: [...resumeData.languages, newLanguage]
    });

    setNewLanguageName('');
    setNewLanguageProficiency('Conversational');
  };

  const removeLanguage = (index: number) => {
    const updated = resumeData.languages.filter((_, i) => i !== index);
    updateResumeData({ languages: updated });
  };

  const updateLanguage = (index: number, field: keyof Language, value: any) => {
    const updated = resumeData.languages.map((language, i) => 
      i === index ? { ...language, [field]: value } : language
    );
    updateResumeData({ languages: updated });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addLanguage();
    }
  };

  const getProficiencyColor = (proficiency: Language['proficiency']) => {
    const colors = {
      'Basic': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Conversational': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Fluent': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Native': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[proficiency];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Languages
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          List the languages you speak and your proficiency level in each.
        </p>
      </div>

      {/* Add New Language */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
          Add New Language
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newLanguageName}
              onChange={(e) => setNewLanguageName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="e.g., English, Spanish, Mandarin"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={newLanguageProficiency}
              onChange={(e) => setNewLanguageProficiency(e.target.value as Language['proficiency'])}
              className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addLanguage}
            disabled={!newLanguageName.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Language</span>
          </button>
        </div>
      </div>

      {/* Proficiency Guide */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Proficiency Levels Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proficiencyLevels.map((level) => (
            <div key={level.value} className="flex items-start space-x-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProficiencyColor(level.value as Language['proficiency'])}`}>
                {level.label}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {level.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages List */}
      {resumeData.languages.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Your Languages ({resumeData.languages.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={language.name}
                      onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                      className="font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <select
                    value={language.proficiency}
                    onChange={(e) => updateLanguage(index, 'proficiency', e.target.value as Language['proficiency'])}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProficiencyColor(language.proficiency)}`}>
                    {language.proficiency}
                  </span>
                  <button
                    onClick={() => removeLanguage(index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Languages */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Common Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
            'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian',
            'Dutch', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish'
          ].map((languageName) => (
            <button
              key={languageName}
              onClick={() => {
                if (!resumeData.languages.find(l => l.name.toLowerCase() === languageName.toLowerCase())) {
                  setNewLanguageName(languageName);
                }
              }}
              disabled={resumeData.languages.find(l => l.name.toLowerCase() === languageName.toLowerCase()) !== undefined}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {languageName}
            </button>
          ))}
        </div>
      </div>

      {resumeData.languages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No languages added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add the languages you speak to showcase your communication skills
          </p>
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;