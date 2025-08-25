# 🔗 Intégration Backend Frontend - DTC EKANI

## 📋 Vue d'ensemble

Ce document décrit l'intégration complète entre le frontend React et le backend Node.js/Express de la plateforme DTC EKANI, incluant les fonctionnalités Socket.IO et blockchain.

## 🏗️ Architecture de l'Intégration

### Frontend (React + TypeScript)
- **ApiContext**: Gestion centralisée des appels API et Socket.IO
- **Authentification**: JWT avec gestion automatique des tokens
- **Temps réel**: Écoute des événements Socket.IO
- **Gestion d'état**: React Context pour l'état global

### Backend (Node.js + Express)
- **API REST**: Endpoints pour tous les modules
- **Socket.IO**: Communication en temps réel
- **Blockchain**: Traçabilité administrative
- **Base de données**: MongoDB avec Mongoose

## 🔌 Composants d'Intégration

### 1. ApiContext (`src/contexts/ApiContext.tsx`)
```typescript
// Gestion centralisée des appels API
const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}/api${endpoint}`;
  // ... logique d'appel API
}, [authToken]);

// Gestion Socket.IO
useEffect(() => {
  const newSocket = io(API_BASE_URL, {
    auth: { token: authToken },
    transports: ['websocket', 'polling']
  });
  // ... configuration des événements
}, [authToken]);
```

### 2. BackendStatus (`src/components/UI/BackendStatus.tsx`)
- Affichage de l'état de connexion Socket.IO
- Statistiques blockchain en temps réel
- Indicateur visuel de la santé du système

## 🌐 Communication en Temps Réel

### Événements Socket.IO Écoutés
```typescript
// Projets
newSocket.on('project:created', (data) => {
  window.dispatchEvent(new CustomEvent('project:created', { detail: data }));
});

// Transactions
newSocket.on('transaction:confirmed', (data) => {
  window.dispatchEvent(new CustomEvent('transaction:confirmed', { detail: data }));
});

// Évaluations
newSocket.on('evaluation:completed', (data) => {
  window.dispatchEvent(new CustomEvent('evaluation:completed', { detail: data }));
});
```

### Événements Émis
```typescript
// Rejoindre une salle spécifique
const joinRoom = (room: string) => {
  if (socket && isConnected) {
    socket.emit('join-room', room);
  }
};
```

## ⛓️ Intégration Blockchain

### Statistiques Blockchain
```typescript
// Récupération des stats blockchain
const getBlockchainStats = useCallback(async () => {
  const response = await apiCall('/stats/blockchain');
  return response.data;
}, [apiCall]);

// Statut d'une transaction
const getTransactionStatus = useCallback(async (hash: string) => {
  const response = await apiCall(`/transactions/status/${hash}`);
  return response.data;
}, [apiCall]);
```

### Données Blockchain Disponibles
- **Total de blocs**: Nombre de blocs minés
- **Transactions totales**: Nombre de transactions confirmées
- **Transactions en attente**: Nombre de transactions non confirmées
- **Intégrité de la chaîne**: Vérification de la validité

## 📱 Utilisation dans les Composants

### Exemple: Dashboard avec Données Temps Réel
```typescript
import { useApi } from '../contexts/ApiContext';

const Dashboard = () => {
  const { getKPIData, getProjectStats, joinRoom } = useApi();
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    // Rejoindre la salle dashboard pour les mises à jour
    joinRoom('dashboard');
    
    // Charger les données initiales
    const loadData = async () => {
      const kpi = await getKPIData();
      setKpiData(kpi);
    };
    loadData();
  }, []);

  // Écouter les mises à jour en temps réel
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      // Mettre à jour l'interface en temps réel
      console.log('Projet mis à jour:', event.detail);
    };

    window.addEventListener('project:updated', handleProjectUpdate);
    return () => window.removeEventListener('project:updated', handleProjectUpdate);
  }, []);

  return (
    <div>
      {/* Interface du dashboard */}
    </div>
  );
};
```

## 🎯 Scénario d'Utilisation Complet

### 📖 **Scénario: Création et Suivi d'un Projet Territorial**

#### **Acteurs:**
- **CTD User** (Collectivité Territoriale Décentralisée)
- **MINDDEVEL User** (Ministère du Développement)
- **MINFI User** (Ministère des Finances)
- **Admin** (Administrateur système)

#### **Étapes du Scénario:**

##### **1. Création du Projet (CTD User)**
```typescript
// Le CTD User se connecte et crée un nouveau projet
const { createProject, joinRoom } = useApi();

const handleCreateProject = async (projectData) => {
  try {
    // Créer le projet via l'API
    const newProject = await createProject(projectData);
    
    // Rejoindre la salle du projet pour les mises à jour
    joinRoom(`project:${newProject.id}`);
    
    // Notification de succès
    toast.success('Projet créé avec succès!');
    
    // Redirection vers la page du projet
    navigate(`/projects/${newProject.id}`);
  } catch (error) {
    toast.error('Erreur lors de la création du projet');
  }
};
```

**Backend (Blockchain):**
- Création d'une transaction blockchain
- Génération d'un hash unique
- Ajout à la liste des transactions en attente
- Émission d'un événement Socket.IO `project:created`

##### **2. Évaluation du Projet (MINDDEVEL User)**
```typescript
// Le MINDDEVEL User reçoit une notification et évalue le projet
const { getProject, createEvaluation, joinRoom } = useApi();

useEffect(() => {
  // Rejoindre la salle des évaluations
  joinRoom('evaluations');
  
  // Écouter les nouveaux projets à évaluer
  window.addEventListener('project:created', handleNewProject);
}, []);

const handleEvaluation = async (evaluationData) => {
  try {
    const evaluation = await createEvaluation(evaluationData);
    
    // Notification de succès
    toast.success('Évaluation soumise avec succès!');
    
    // Le projet passe automatiquement à l'étape suivante
  } catch (error) {
    toast.error('Erreur lors de la soumission de l\'évaluation');
  }
};
```

**Backend (Blockchain + Socket.IO):**
- Création d'une transaction d'évaluation
- Mise à jour du statut du projet
- Émission d'un événement `evaluation:completed`
- Notification en temps réel à tous les utilisateurs concernés

##### **3. Validation Financière (MINFI User)**
```typescript
// Le MINFI User valide le budget du projet
const { updateProject, getBlockchainStats } = useApi();

const handleBudgetValidation = async (projectId, budgetData) => {
  try {
    // Mettre à jour le projet avec la validation
    await updateProject(projectId, {
      status: 'budget_validated',
      minfiValidation: budgetData
    });
    
    // Vérifier les statistiques blockchain
    const blockchainStats = await getBlockchainStats();
    console.log('Statistiques blockchain:', blockchainStats);
    
    toast.success('Budget validé avec succès!');
  } catch (error) {
    toast.error('Erreur lors de la validation du budget');
  }
};
```

**Backend (Blockchain):**
- Création d'une transaction de validation
- Mining du bloc contenant la transaction
- Confirmation de la transaction
- Mise à jour des statistiques blockchain

##### **4. Suivi en Temps Réel (Tous les Utilisateurs)**
```typescript
// Tous les utilisateurs voient les mises à jour en temps réel
useEffect(() => {
  const handleProjectUpdate = (event) => {
    const { projectId, status, updatedBy } = event.detail;
    
    // Mettre à jour l'interface sans rechargement
    updateProjectInUI(projectId, { status });
    
    // Notification de mise à jour
    toast.info(`Projet ${projectId} mis à jour par ${updatedBy}`);
  };

  window.addEventListener('project:updated', handleProjectUpdate);
  return () => window.removeEventListener('project:updated', handleProjectUpdate);
}, []);
```

**Backend (Socket.IO):**
- Diffusion de l'événement à tous les utilisateurs connectés
- Gestion des salles pour les notifications ciblées
- Optimisation de la bande passante

## 🔧 Configuration et Démarrage

### **1. Variables d'Environnement Frontend**
```bash
# .env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_NODE_ENV=development
```

### **2. Variables d'Environnement Backend**
```bash
# backend/.env
MONGODB_URI=mongodb://localhost:27017/dtc_ekani
JWT_SECRET=votre_secret_jwt_tres_securise
PORT=5000
NODE_ENV=development
```

### **3. Démarrage des Services**
```bash
# Terminal 1: Backend
cd backend
npm install
npm run init-db
npm run dev

# Terminal 2: Frontend
npm install
npm run dev
```

## 📊 Monitoring et Debugging

### **Indicateurs de Santé**
- **Socket.IO**: État de connexion en temps réel
- **API**: Latence et disponibilité des endpoints
- **Blockchain**: Nombre de blocs et transactions
- **Base de données**: État de la connexion MongoDB

### **Logs et Debugging**
```typescript
// Frontend: Logs des événements Socket.IO
console.log('🔌 Connecté au serveur Socket.IO');
console.log('🆕 Nouveau projet créé:', data);

// Backend: Logs des transactions blockchain
console.log('⛓️ Transaction ajoutée à la blockchain:', transaction.hash);
console.log('🔨 Nouveau bloc miné:', block.hash);
```

## 🚀 Avantages de l'Intégration

### **1. Temps Réel**
- Mises à jour instantanées de l'interface
- Notifications en temps réel
- Collaboration en direct entre utilisateurs

### **2. Traçabilité Blockchain**
- Historique immuable de toutes les actions
- Vérification de l'intégrité des données
- Audit trail complet pour la conformité

### **3. Performance**
- Optimisation des requêtes API
- Mise en cache intelligente
- Gestion efficace des connexions Socket.IO

### **4. Sécurité**
- Authentification JWT robuste
- Validation des données côté serveur
- Protection contre les attaques CSRF et XSS

## 🔮 Évolutions Futures

### **1. Intégration Blockchain Réelle**
- Remplacement de la simulation par Ethereum/Hyperledger
- Smart contracts pour l'automatisation
- Intégration avec des wallets gouvernementaux

### **2. Fonctionnalités Avancées**
- Vidéoconférence intégrée
- Collaboration documentaire en temps réel
- IA pour l'analyse des projets

### **3. Scalabilité**
- Load balancing des serveurs Socket.IO
- Clustering MongoDB
- Microservices architecture

---

## 📞 Support et Maintenance

Pour toute question sur l'intégration ou en cas de problème :
1. Vérifier les logs du backend et frontend
2. Tester la connectivité Socket.IO
3. Vérifier l'état de la blockchain
4. Consulter la documentation des API

**L'intégration est maintenant complète et prête pour la production! 🎉**
