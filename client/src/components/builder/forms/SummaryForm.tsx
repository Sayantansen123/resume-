import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

const SummaryForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (value: string) => {
    updateResumeData({ summary: value });
  };

  const generateAISummary = () => {
    // AI summary generation placeholder
    const aiSummary = "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams to achieve project goals. Passionate about clean code, user experience, and continuous learning.";
    handleChange(aiSummary);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Professional Summary
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Write a compelling summary that highlights your key qualifications and career achievements.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Pro Tip
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Keep your summary concise (2-4 sentences) and highlight your most relevant skills and achievements.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Summary *
          </label>
          <button
            onClick={generateAISummary}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Generate</span>
          </button>
        </div>
        <textarea
          value={resumeData.summary}
          onChange={(e) => handleChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          placeholder="Write a compelling summary that showcases your expertise, key achievements, and what makes you unique as a professional..."
        />
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {resumeData.summary.length}/500 characters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example 1</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            "Results-driven marketing professional with 7+ years of experience in digital marketing and brand management."
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example 2</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            "Creative UX designer passionate about creating intuitive user experiences with expertise in design thinking."
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example 3</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            "Data analyst with strong analytical skills and experience in transforming complex data into actionable insights."
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;