import React, { useState } from 'react';
import { Plus, Trash2, Award, Calendar } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { Certification } from '../../../types';

const CertificationsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: ''
    };

    updateResumeData({
      certifications: [...resumeData.certifications, newCertification]
    });
    setExpandedIndex(resumeData.certifications.length);
  };

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    const updated = resumeData.certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    updateResumeData({ certifications: updated });
  };

  const removeCertification = (index: number) => {
    const updated = resumeData.certifications.filter((_, i) => i !== index);
    updateResumeData({ certifications: updated });
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your professional certifications and credentials.
          </p>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.certifications.map((certification, index) => (
          <div
            key={certification.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex-1 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {certification.name || 'New Certification'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {certification.issuer 
                    ? `${certification.issuer}${certification.date ? ` • ${certification.date}` : ''}`
                    : 'Click to expand and edit'
                  }
                </p>
              </button>
              <button
                onClick={() => removeCertification(index)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Certification Name *
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={certification.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Issue Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={certification.date}
                        onChange={(e) => updateCertification(index, 'date', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expiry Date (Optional)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="month"
                        value={certification.expiryDate}
                        onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credential ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={certification.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Certificate ID or Badge Number"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {resumeData.certifications.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No certifications added yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your professional certifications to strengthen your credentials
            </p>
            <button
              onClick={addCertification}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Certification
            </button>
          </div>
        )}
      </div>

      {/* Popular Certifications */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
          Popular Certifications
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
          {[
            'AWS Certified Solutions Architect',
            'Google Cloud Professional',
            'Microsoft Azure Fundamentals',
            'Certified ScrumMaster (CSM)',
            'PMP Certification',
            'Salesforce Administrator',
            'CompTIA Security+',
            'Cisco CCNA',
            'Google Analytics Certified',
            'HubSpot Content Marketing',
            'Adobe Certified Expert',
            'Oracle Certified Professional'
          ].map((cert) => (
            <div key={cert} className="bg-white dark:bg-gray-800 p-2 rounded border border-blue-200 dark:border-blue-700">
              <span className="text-blue-700 dark:text-blue-300">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsForm;