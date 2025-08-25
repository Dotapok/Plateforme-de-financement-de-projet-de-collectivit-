import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, FileText, MapPin, Calendar, DollarSign, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';

export function ProjectEditPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const { getProjectById, updateProject,  } = useApi();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    region: '',
    startDate: '',
    endDate: '',
    objectives: '',
    beneficiaries: '',
    documents: [] as File[]
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const projectData = await getProjectById(projectId!);
      if (!projectData) {
        navigate('/projects', { state: { error: 'Projet non trouvé' } });
        return;
      }

      // Vérifier que l'utilisateur peut modifier ce projet
      if (user?.role !== 'ctd' || projectData.submittedBy !== user.entity) {
        navigate('/projects', { state: { error: 'Vous n\'êtes pas autorisé à modifier ce projet' } });
        return;
      }

      setProject(projectData);
      setFormData({
        title: projectData.title || '',
        description: projectData.description || '',
        budget: projectData.budget?.toString() || '',
        category: projectData.category || '',
        region: projectData.region || '',
        startDate: projectData.startDate || '',
        endDate: projectData.endDate || '',
        objectives: projectData.objectives || '',
        beneficiaries: projectData.beneficiaries || '',
        documents: []
      });
    } catch (err) {
      console.error('Erreur lors du chargement du projet:', err);
      navigate('/projects', { state: { error: 'Erreur lors du chargement du projet' } });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 'infrastructure', name: 'Infrastructure', description: 'Routes, ponts, bâtiments publics' },
    { id: 'education', name: 'Éducation', description: 'Écoles, bibliothèques, centres de formation' },
    { id: 'sante', name: 'Santé', description: 'Hôpitaux, centres de santé, pharmacies' },
    { id: 'agriculture', name: 'Agriculture', description: 'Irrigation, stockage, transformation' },
    { id: 'energie', name: 'Énergie', description: 'Électrification, énergies renouvelables' },
    { id: 'eau', name: 'Eau', description: 'Adduction d\'eau, assainissement' }
  ];

  const regions = [
    { id: 'littoral', name: 'Littoral', capital: 'Douala' },
    { id: 'centre', name: 'Centre', capital: 'Yaoundé' },
    { id: 'ouest', name: 'Ouest', capital: 'Bafoussam' },
    { id: 'nord', name: 'Nord', capital: 'Garoua' },
    { id: 'sud', name: 'Sud', capital: 'Ebolowa' },
    { id: 'est', name: 'Est', capital: 'Bertoua' },
    { id: 'adamaoua', name: 'Adamaoua', capital: 'Ngaoundéré' },
    { id: 'extreme-nord', name: 'Extrême-Nord', capital: 'Maroua' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur pour ce champ
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, documents: filesArray }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = 'Le titre est requis';
    if (!formData.description.trim()) errors.description = 'La description est requise';
    if (!formData.budget) errors.budget = 'Le budget est requis';
    if (!formData.category) errors.category = 'La catégorie est requise';
    if (!formData.region) errors.region = 'La région est requise';
    if (!formData.startDate) errors.startDate = 'La date de début est requise';
    if (!formData.endDate) errors.endDate = 'La date de fin est requise';
    if (!formData.objectives.trim()) errors.objectives = 'Les objectifs sont requis';
    if (!formData.beneficiaries.trim()) errors.beneficiaries = 'Les bénéficiaires sont requis';

    // Validation du budget
    if (formData.budget && parseFloat(formData.budget) <= 0) {
      errors.budget = 'Le budget doit être supérieur à 0';
    }

    // Validation des dates
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        errors.endDate = 'La date de fin doit être postérieure à la date de début';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget),
        category: formData.category,
        region: formData.region,
        startDate: formData.startDate,
        endDate: formData.endDate,
        objectives: formData.objectives,
        beneficiaries: formData.beneficiaries
      };

      await updateProject(projectId!, updateData);
      
      // Rediriger vers la page de détails du projet avec un message de succès
      navigate(`/projects/${projectId}`, { 
        state: { 
          message: 'Projet modifié avec succès !' 
        } 
      });
    } catch (err) {
      console.error('Erreur lors de la modification du projet:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Projet non trouvé</h1>
            <p className="text-gray-600 mb-6">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux projets</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* En-tête */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to={`/projects/${projectId}`}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Retour au projet</span>
            </Link>
          </div>
          
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Modifier le Projet
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Modifiez les informations de votre projet
            </p>
          </div>
        </div>

        {/* Avertissement si le projet est en cours d'évaluation */}
        {project.status === 'under_review' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Projet en cours d'évaluation</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Ce projet est actuellement en cours d'évaluation. Les modifications peuvent affecter le processus d'évaluation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du projet *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Construction Route Principale"
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Décrivez en détail le projet, ses objectifs et son impact..."
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
              )}
            </div>

            {/* Budget et région */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (XAF) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₣</span>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    min="0"
                    step="100000"
                    className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.budget ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                </div>
                {formErrors.budget && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Région *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.region ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une région</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name} ({region.capital})
                    </option>
                  ))}
                </select>
                {formErrors.region && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.region}</p>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
                )}
              </div>
            </div>

            {/* Objectifs et bénéficiaires */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectifs du projet *
                </label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.objectives ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Listez les objectifs principaux du projet..."
                />
                {formErrors.objectives && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.objectives}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bénéficiaires *
                </label>
                <textarea
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.beneficiaries ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Décrivez les bénéficiaires du projet..."
                />
                {formErrors.beneficiaries && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.beneficiaries}</p>
                )}
              </div>
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveaux documents de support
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Cliquez pour télécharger
                    </span>
                    <span> ou glissez-déposez</span>
                  </label>
                  <input
                    id="file-upload"
                    name="documents"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, XLS, JPG jusqu'à 10MB par fichier
                </p>
              </div>
              
              {/* Liste des nouveaux fichiers sélectionnés */}
              {formData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Nouveaux fichiers sélectionnés :</h4>
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Modification en cours...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Enregistrer les modifications</span>
                  </>
                )}
              </button>
              
              <Link
                to={`/projects/${projectId}`}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <span>Annuler</span>
              </Link>
            </div>

            {/* Affichage des erreurs */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
