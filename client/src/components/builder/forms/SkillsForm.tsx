import React, { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { Skill } from '../../../types';

const skillLevels = [
  { value: 'Beginner', label: 'Beginner', color: 'bg-red-500' },
  { value: 'Intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 'Advanced', label: 'Advanced', color: 'bg-blue-500' },
  { value: 'Expert', label: 'Expert', color: 'bg-green-500' }
];

const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('Intermediate');

  const addSkill = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      name: newSkillName.trim(),
      level: newSkillLevel
    };

    updateResumeData({
      skills: [...resumeData.skills, newSkill]
    });

    setNewSkillName('');
    setNewSkillLevel('Intermediate');
  };

  const removeSkill = (index: number) => {
    const updated = resumeData.skills.filter((_, i) => i !== index);
    updateResumeData({ skills: updated });
  };

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    const updated = resumeData.skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    updateResumeData({ skills: updated });
  };

  const getStarsForLevel = (level: Skill['level']) => {
    const levelMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
    return levelMap[level];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          List your technical and professional skills with proficiency levels.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
          Add New Skill
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="e.g., JavaScript, React, Project Management"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])}
              className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {skillLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addSkill}
            disabled={!newSkillName.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Skills List */}
      {resumeData.skills.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Your Skills ({resumeData.skills.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      className="font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', e.target.value as Skill['level'])}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {skillLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < getStarsForLevel(skill.level)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Skills Suggestions */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Popular Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL',
            'Project Management', 'Communication', 'Leadership', 'Problem Solving',
            'Git', 'AWS', 'Docker', 'TypeScript', 'Java', 'C++',
            'Data Analysis', 'Machine Learning', 'Agile', 'Scrum'
          ].map((skillName) => (
            <button
              key={skillName}
              onClick={() => {
                if (!resumeData.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
                  setNewSkillName(skillName);
                }
              }}
              disabled={resumeData.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase()) !== undefined}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {skillName}
            </button>
          ))}
        </div>
      </div>

      {resumeData.skills.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your technical and professional skills to showcase your expertise
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;