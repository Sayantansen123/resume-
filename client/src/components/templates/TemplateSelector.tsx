import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Template } from '../../types';
import { useResume } from '../../context/ResumeContext';

const templates: Template[] = [
  {
    id: 'modern-1',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech professionals',
    thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Modern'
  },
  {
    id: 'classic-1',
    name: 'Classic Executive',
    description: 'Traditional layout ideal for corporate and executive roles',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Classic'
  },
  {
    id: 'creative-1',
    name: 'Creative Designer',
    description: 'Bold and artistic design for creative professionals',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Creative'
  },
  {
    id: 'minimal-1',
    name: 'Minimal Clean',
    description: 'Simple and elegant design focusing on content',
    thumbnail: 'https://images.pexels.com/photos/590017/pexels-photo-590017.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Minimal'
  },
  {
    id: 'modern-2',
    name: 'Tech Innovator',
    description: 'Modern layout with tech-focused elements',
    thumbnail: 'https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Modern'
  },
  {
    id: 'creative-2',
    name: 'Artistic Flow',
    description: 'Dynamic design for artists and designers',
    thumbnail: 'https://images.pexels.com/photos/590019/pexels-photo-590019.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    category: 'Creative'
  }
];

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const navigate = useNavigate();

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/builder');
    }
  };

  const categories = ['All', 'Modern', 'Classic', 'Creative', 'Minimal'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select a professional template that matches your style and industry
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedTemplate?.id === template.id
                  ? 'ring-4 ring-blue-500 ring-opacity-50'
                  : ''
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2">
                  <Check className="h-5 w-5" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {template.description}
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    4.9 (2.1k reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Continue with {selectedTemplate.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;