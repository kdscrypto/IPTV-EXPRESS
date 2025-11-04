# Guide de Test NOWPayments - IPTV Express

## 📋 Checklist de Tests

### ✅ Phase 1 : Configuration Initiale

- [ ] Les clés API sont configurées dans Supabase Secrets
  - `NOWPAYMENTS_API_KEY`
  - `NOWPAYMENTS_IPN_SECRET`
- [ ] L'URL IPN callback est configurée dans NOWPayments Dashboard
  - URL: `https://gbssebvzecsgcfjlqtqp.supabase.co/functions/v1/payment-webhook`
- [ ] Les edge functions sont déployées
  - `create-payment`
  - `payment-webhook`

### ✅ Phase 2 : Tests Frontend

#### Test de Sélection de Plan
1. Ouvrir l'application en mode preview
2. Scroller vers la section "Nos Abonnements"
3. Vérifier l'affichage des 4 plans :
   - ✓ 1 mois - $15
   - ✓ 3 mois - $25
   - ✓ 6 mois - $45
   - ✓ 12 mois - $60
4. Cliquer sur "Choisir ce plan" pour n'importe quel plan
5. Vérifier que le scroll automatique vers le formulaire fonctionne
6. Vérifier que le toast de confirmation s'affiche

#### Test du Formulaire d'Activation
1. Dans le formulaire, vérifier les deux options de paiement :
   - [ ] Paiement Crypto (doit être sélectionné par défaut)
   - [ ] WhatsApp Support
2. Remplir le formulaire :
   - [ ] Email valide (ex: test@example.com)
   - [ ] Confirmation email (doit correspondre)
   - [ ] Type d'appareil (sélectionner dans la liste)
   - [ ] Infos supplémentaires (optionnel)
3. Cliquer sur "Procéder au paiement crypto"

### ✅ Phase 3 : Tests du Modal de Paiement

#### Vérifications Visuelles
- [ ] Le modal s'ouvre correctement
- [ ] Le statut "En attente du paiement" s'affiche
- [ ] Le QR code est visible et scannable
- [ ] L'adresse de paiement s'affiche
- [ ] Le montant en crypto s'affiche
- [ ] Le timer de compte à rebours (60 minutes) fonctionne
- [ ] Le badge de statut est coloré correctement

#### Test des Fonctionnalités
- [ ] Bouton "Copier" pour l'adresse fonctionne
- [ ] Bouton "Copier" pour le montant fonctionne
- [ ] Toast de confirmation "Copié !" s'affiche
- [ ] Bouton "Ouvrir la page de paiement NOWPayments" s'ouvre dans un nouvel onglet

### ✅ Phase 4 : Tests de Sécurité

#### Validation des Entrées (Edge Function)
Utiliser les outils de développeur pour tester :

```javascript
// Test 1: Email invalide
fetch('https://gbssebvzecsgcfjlqtqp.supabase.co/functions/v1/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    planId: '1month',
    planName: 'Test',
    price: 15,
    email: 'invalid-email' // DOIT échouer
  })
})

// Test 2: Prix invalide
fetch('https://gbssebvzecsgcfjlqtqp.supabase.co/functions/v1/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    planId: '1month',
    planName: 'Test',
    price: 999, // DOIT échouer
    email: 'test@example.com'
  })
})

// Test 3: Plan ID invalide
fetch('https://gbssebvzecsgcfjlqtqp.supabase.co/functions/v1/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    planId: 'invalid-plan', // DOIT échouer
    planName: 'Test',
    price: 15,
    email: 'test@example.com'
  })
})
```

**Résultats Attendus :**
- ❌ Toutes les requêtes ci-dessus doivent retourner une erreur 400
- ✅ Message d'erreur descriptif retourné

#### Test de Vérification HMAC (Webhook)
- [ ] Vérifier dans les logs Supabase que la signature est validée
- [ ] Tester avec une signature invalide (doit retourner 401)

### ✅ Phase 5 : Tests de Flux Complet

#### Scénario : Paiement Réussi
1. Créer un paiement via l'interface
2. Vérifier dans Supabase que la commande est créée :
   ```sql
   SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
   ```
3. Statut initial doit être : `waiting` ou `pending`
4. Vérifier que le polling fonctionne (toutes les 30s)
5. Simuler un webhook de confirmation (en mode sandbox)
6. Vérifier que le statut passe à `finished`
7. Vérifier que `activated_at` est rempli
8. Vérifier que le modal affiche "Paiement confirmé !"

#### Scénario : Paiement Expiré
1. Créer un paiement
2. Attendre 1 heure (ou modifier `expires_at` manuellement en DB)
3. Vérifier que le timer arrive à 00:00
4. Vérifier que le modal affiche "Paiement expiré"

#### Scénario : Paiement Échoué
1. Simuler un webhook avec `payment_status: 'failed'`
2. Vérifier que le statut est mis à jour
3. Vérifier que le modal affiche l'erreur appropriée

### ✅ Phase 6 : Tests de Base de Données

#### Vérifier les RLS Policies
```sql
-- En tant qu'utilisateur anonyme, ne devrait voir aucune commande
SELECT * FROM orders;

-- Vérifier que le service role peut tout voir
-- (utiliser le service role key dans la requête)
```

#### Vérifier les Indexes
```sql
-- Vérifier que les requêtes sont rapides
EXPLAIN ANALYZE SELECT * FROM orders WHERE payment_id = 'test-payment-id';
EXPLAIN ANALYZE SELECT * FROM orders WHERE email = 'test@example.com';
```

### ✅ Phase 7 : Tests de Performance

- [ ] Temps de création de paiement < 3 secondes
- [ ] Temps de mise à jour du statut (webhook) < 1 seconde
- [ ] Polling ne cause pas de surcharge (max 1 requête / 30s)
- [ ] Modal responsive sur mobile et desktop

### ✅ Phase 8 : Tests d'Intégration NOWPayments

#### Mode Sandbox (Recommandé pour les tests)
1. Activer le mode sandbox dans NOWPayments Dashboard
2. Utiliser les cryptos de test
3. Générer un paiement de test
4. Vérifier la réception du webhook
5. Vérifier les logs dans NOWPayments Dashboard

#### Mode Production
⚠️ **Attention** : Utiliser de vraies cryptos
1. Faire un petit test avec le montant minimum
2. Vérifier la réception du paiement
3. Vérifier l'activation automatique

## 🔍 Logs à Surveiller

### Edge Function Logs (Supabase)
- `create-payment` : Création de paiement, erreurs NOWPayments API
- `payment-webhook` : Réception webhooks, validation signature, mises à jour

### Console Browser
- Erreurs réseau (fetch)
- Erreurs de validation
- États du polling

### NOWPayments Dashboard
- Statut des paiements
- Webhooks envoyés/reçus
- Erreurs API

## ⚠️ Points de Vigilance

### Sécurité
- ✅ Les clés API ne sont jamais exposées côté client
- ✅ La signature HMAC est vérifiée pour chaque webhook
- ✅ Toutes les entrées sont validées et sanitizées
- ✅ Les RLS policies protègent les données sensibles

### Expérience Utilisateur
- ✅ Messages d'erreur clairs et en français
- ✅ Feedback visuel pour chaque action
- ✅ Timer visible pour éviter la confusion
- ✅ Polling automatique transparent

### Fiabilité
- ✅ Gestion des erreurs réseau
- ✅ Retry logic pour les webhooks (NOWPayments côté)
- ✅ Logs détaillés pour debug
- ✅ Validation stricte des données

## 📊 Métriques de Succès

- Taux de conversion : % de paiements initiés qui aboutissent
- Temps moyen de paiement : De la création au statut "finished"
- Taux d'erreur : % de paiements qui échouent
- Satisfaction utilisateur : Feedback sur le processus

## 🐛 Problèmes Courants et Solutions

### Webhook ne sont pas reçus
- Vérifier l'URL IPN dans NOWPayments Dashboard
- Vérifier que les edge functions sont déployées
- Vérifier les logs Supabase pour les erreurs

### Paiement bloqué en "waiting"
- Vérifier que le paiement a bien été effectué
- Vérifier les webhooks dans NOWPayments Dashboard
- Vérifier que la signature HMAC est correcte

### Erreur de création de paiement
- Vérifier que l'API key NOWPayments est valide
- Vérifier les logs de l'edge function create-payment
- Vérifier le solde du compte NOWPayments (mode production)

### Modal ne se met pas à jour
- Vérifier que le polling fonctionne (Network tab)
- Vérifier que le payment_id est correct
- Vérifier les RLS policies sur la table orders

## 📝 Notes de Déploiement

Avant de passer en production :
1. ✅ Tester tous les scénarios en mode sandbox
2. ✅ Vérifier que tous les webhooks sont reçus
3. ✅ Configurer les emails de confirmation (Resend)
4. ✅ Documenter le processus d'activation manuelle (fallback)
5. ✅ Former l'équipe support sur les problèmes courants
6. ✅ Mettre en place une monitoring des paiements
7. ✅ Préparer une FAQ pour les utilisateurs

## 🎯 Prochaines Étapes

- [ ] Intégrer Resend pour les emails de confirmation
- [ ] Automatiser l'envoi des identifiants IPTV
- [ ] Ajouter un dashboard admin pour suivre les paiements
- [ ] Implémenter les remboursements automatiques
- [ ] Ajouter plus de cryptos populaires
- [ ] Multi-langue (EN, FR, ES, etc.)
