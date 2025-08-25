import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { ScrollToTop } from './components/UI/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewProjectPage } from './pages/NewProjectPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectEditPage } from './pages/ProjectEditPage';
import { ProjectEvaluationPage } from './pages/ProjectEvaluationPage';
import { PersonalEvaluationsPage } from './pages/PersonalEvaluationsPage';
import { ProjectHistoryPage } from './pages/ProjectHistoryPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionDetailPage } from './pages/TransactionDetailPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SecurityPage } from './pages/SecurityPage';
import { DocumentationPage } from './pages/DocumentationPage';

// Components
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />

              {/* Routes privées */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <ProjectsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/new"
                element={
                  <PrivateRoute>
                    <NewProjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:projectId"
                element={
                  <PrivateRoute>
                    <ProjectDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:projectId/edit"
                element={
                  <PrivateRoute>
                    <ProjectEditPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/evaluate"
                element={
                  <PrivateRoute>
                    <ProjectEvaluationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/evaluations"
                element={
                  <PrivateRoute>
                    <PersonalEvaluationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/history"
                element={
                  <PrivateRoute>
                    <ProjectHistoryPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute>
                    <TransactionsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions/:transactionId"
                element={
                  <PrivateRoute>
                    <TransactionDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <PrivateRoute>
                    <SupportPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
