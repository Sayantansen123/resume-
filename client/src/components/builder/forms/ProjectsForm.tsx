import React, { useState } from 'react';
import { Plus, Trash2, Code, Calendar, ExternalLink, Github } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { Project } from '../../../types';

const ProjectsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: ''
    };

    updateResumeData({
      projects: [...resumeData.projects, newProject]
    });
    setExpandedIndex(resumeData.projects.length);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = resumeData.projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    updateResumeData({ projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    updateResumeData({ projects: updated });
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(index, 'technologies', technologies);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your best projects and technical achievements.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex-1 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.name || 'New Project'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.technologies.length > 0 
                    ? project.technologies.join(', ')
                    : 'Click to expand and edit'
                  }
                </p>
              </button>
              <button
                onClick={() => removeProject(index)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Name *
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="E-commerce Platform"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Describe your project, its features, and impact..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateTechnologies(index, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, MongoDB, AWS (separate with commas)"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Separate technologies with commas
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={project.startDate}
                        onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={project.endDate}
                        onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Live Demo URL
                    </label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={project.url}
                        onChange={(e) => updateProject(index, 'url', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://myproject.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub Repository
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={project.github}
                        onChange={(e) => updateProject(index, 'github', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {resumeData.projects.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects added yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Showcase your best work by adding your projects
            </p>
            <button
              onClick={addProject}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;