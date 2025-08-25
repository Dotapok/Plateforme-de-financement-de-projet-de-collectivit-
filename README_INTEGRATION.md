# 🚀 Guide de Démarrage Rapide - Intégration Backend

## ⚡ Démarrage en 5 Minutes

### 1. **Prérequis**
- Node.js 18+ installé
- MongoDB installé et démarré
- Git installé

### 2. **Cloner et Installer**
```bash
# Cloner le projet
git clone <votre-repo>
cd Projet_DTC_EKANI

# Installer les dépendances frontend
npm install

# Installer les dépendances backend
cd backend
npm install
```

### 3. **Configuration**
```bash
# Backend: Copier et configurer les variables d'environnement
cd backend
cp env.example .env
# Éditer .env avec vos vraies valeurs

# Frontend: Créer le fichier d'environnement
cd ..
echo "VITE_API_URL=http://localhost:5000" > .env
echo "VITE_SOCKET_URL=http://localhost:5000" >> .env
```

### 4. **Démarrer les Services**
```bash
# Terminal 1: Backend
cd backend
npm run init-db    # Initialiser la base de données
npm run dev        # Démarrer le serveur

# Terminal 2: Frontend
npm run dev        # Démarrer l'application React
```

### 5. **Tester l'Intégration**
- Ouvrir http://localhost:5173 (frontend)
- Vérifier l'indicateur de statut backend (coin inférieur droit)
- Se connecter avec un compte de test
- Créer un projet et observer les mises à jour en temps réel

## 🔑 Comptes de Test
- **Admin**: `admin` / `Admin@2024`
- **CTD**: `ctd_user` / `Ctd@2024`
- **MINDDEVEL**: `minddevel_user` / `Minddevel@2024`
- **MINFI**: `minfi_user` / `Minfi@2024`

## 📱 Fonctionnalités Disponibles
- ✅ Authentification JWT
- ✅ Gestion des projets
- ✅ Communication Socket.IO temps réel
- ✅ Traçabilité blockchain
- ✅ Notifications instantanées
- ✅ Interface responsive

## 🆘 Dépannage Rapide

### **Backend ne démarre pas**
```bash
cd backend
npm run test-setup    # Vérifier la configuration
```

### **Frontend ne se connecte pas au backend**
- Vérifier que le backend tourne sur le port 5000
- Vérifier les variables d'environnement
- Regarder la console du navigateur

### **Socket.IO ne fonctionne pas**
- Vérifier que le backend est démarré
- Vérifier les logs du backend
- Redémarrer le frontend

## 📚 Documentation Complète
Voir `INTEGRATION_BACKEND.md` pour la documentation détaillée.

---

**🎉 Votre plateforme DTC EKANI est maintenant prête avec backend intégré!**
