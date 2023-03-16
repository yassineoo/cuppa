CREATE TABLE Consommateur(
   id_consommateur INT,
   prenom_consommateur VARCHAR(50) NOT NULL,
   nom_consommateur VARCHAR(50) NOT NULL,
   sexe_consommateur VARCHAR(10),
   path_consommateur VARCHAR(50),
   mail_consommateur VARCHAR(50) NOT NULL,
   password_cosommateur VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_consommateur)
);

CREATE TABLE Outils_preparation_boisson(
   id_ingredient INT,
   libelle_ingredient VARCHAR(50) NOT NULL,
   quantite_restante_ingredient DOUBLE,
   goublet_restant INT,
   PRIMARY KEY(id_ingredient)
);

CREATE TABLE Region_dynamique(
   id_region_dynamique INT,
   centre_y DOUBLE NOT NULL,
   diametre DOUBLE NOT NULL,
   centre_x DOUBLE NOT NULL,
   PRIMARY KEY(id_region_dynamique)
);

CREATE TABLE Pays(
   id_pays VARCHAR(50),
   nom_pays VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_pays)
);

CREATE TABLE Type_paiement(
   id_type_paiement INT,
   libelle_type_paiement VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_type_paiement)
);

CREATE TABLE Tache(
   id_tache INT,
   etat_tache VARCHAR(50) NOT NULL,
   description_tache VARCHAR(50),
   PRIMARY KEY(id_tache)
);

CREATE TABLE Categorie(
   id_categorie INT,
   libelle_categorie VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_categorie)
);

CREATE TABLE parametre(
   localisation_dynamique_distributeur VARCHAR(50),
   PRIMARY KEY(localisation_dynamique_distributeur)
);

CREATE TABLE Role(
   id_role INT,
   libelle_role VARCHAR(50),
   id_role_ADM_gere_AC INT,
   id_role_ADM_gere_decideur INT,
   id_role_ADM_gere_AM INT,
   id_role_SADM_gere_ADM INT,
   PRIMARY KEY(id_role),
   UNIQUE(id_role_ADM_gere_decideur),
   UNIQUE(id_role_ADM_gere_AM),
   FOREIGN KEY(id_role_ADM_gere_AC) REFERENCES Role(id_role),
   FOREIGN KEY(id_role_ADM_gere_decideur) REFERENCES Role(id_role),
   FOREIGN KEY(id_role_ADM_gere_AM) REFERENCES Role(id_role),
   FOREIGN KEY(id_role_SADM_gere_ADM) REFERENCES Role(id_role)
);

CREATE TABLE Distributeur(
   id_distributeur INT,
   numero_serie_distributeur VARCHAR(50) NOT NULL,
   etat_distributeur VARCHAR(50) NOT NULL,
   Date_installation_distributeur DATE NOT NULL,
   localisation_statique_distributeur VARCHAR(50),
   id_role INT NOT NULL,
   PRIMARY KEY(id_distributeur),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Client(
   id_client INT,
   nom_client VARCHAR(50) NOT NULL,
   prenom_client VARCHAR(50),
   type_client VARCHAR(50) NOT NULL,
   id_role INT NOT NULL,
   PRIMARY KEY(id_client),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Wilaya(
   id_wilaya INT,
   numero_wilaya INT NOT NULL,
   nom_willaya VARCHAR(50) NOT NULL,
   id_pays VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_wilaya),
   FOREIGN KEY(id_pays) REFERENCES Pays(id_pays)
);

CREATE TABLE Commune(
   id_commune INT,
   numero_commune INT NOT NULL,
   nom_commune VARCHAR(50) NOT NULL,
   id_wilaya INT NOT NULL,
   PRIMARY KEY(id_commune),
   FOREIGN KEY(id_wilaya) REFERENCES Wilaya(id_wilaya)
);

CREATE TABLE Boisson(
   id_boisson INT,
   duree_preparation_boisson VARCHAR(50) NOT NULL,
   libelle_boisson VARCHAR(50) NOT NULL,
   description_boisson VARCHAR(50) NOT NULL,
   prix_boisson DOUBLE,
   path_image_boisson VARCHAR(50),
   id_categorie INT,
   PRIMARY KEY(id_boisson),
   FOREIGN KEY(id_categorie) REFERENCES Categorie(id_categorie)
);

CREATE TABLE annoceur(
   id_annonceur INT,
   nom_annonceur VARCHAR(50) NOT NULL,
   prenom_annonceur VARCHAR(50) NOT NULL,
   sexe_annonceur VARCHAR(10),
   path_annonceur VARCHAR(50),
   id_role INT NOT NULL,
   PRIMARY KEY(id_annonceur),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Annoce(
   id_annonce INT,
   duree_affichage VARCHAR(50) NOT NULL,
   ageMin INT NOT NULL,
   ageMax INT NOT NULL,
   path_video VARCHAR(50) NOT NULL,
   prix_annonce DOUBLE NOT NULL,
   id_annonceur INT NOT NULL,
   PRIMARY KEY(id_annonce),
   FOREIGN KEY(id_annonceur) REFERENCES annoceur(id_annonceur)
);

CREATE TABLE Panne(
   id_panne VARCHAR(50),
   objet_panne VARCHAR(50) NOT NULL,
   date_panne DATE NOT NULL,
   heure_panne TIME NOT NULL,
   description_panne VARCHAR(50),
   etat_panne VARCHAR(50) NOT NULL,
   id_role INT NOT NULL,
   id_distributeur INT NOT NULL,
   PRIMARY KEY(id_panne),
   FOREIGN KEY(id_role) REFERENCES Role(id_role),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur)
);

CREATE TABLE Detection_vol(
   id_vol INT,
   date_vol DATE NOT NULL,
   heure_vol TIME NOT NULL,
   description_vol VARCHAR(50),
   id_distributeur INT NOT NULL,
   PRIMARY KEY(id_vol),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur)
);

CREATE TABLE Utilisateur(
   id_utilisateur VARCHAR(50),
   username_utilisateur VARCHAR(50) NOT NULL,
   password_utilisateur VARCHAR(50) NOT NULL,
   mail_utilisateur VARCHAR(50),
   id_role INT NOT NULL,
   PRIMARY KEY(id_utilisateur),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Region(
   id_region INT,
   libelle_region VARCHAR(50),
   id_commune INT NOT NULL,
   PRIMARY KEY(id_region),
   FOREIGN KEY(id_commune) REFERENCES Commune(id_commune)
);

CREATE TABLE Commande(
   id_cmd INT,
   date_cmd DATE NOT NULL,
   heure_cmd TIME NOT NULL,
   prix_cmd VARCHAR(50) NOT NULL,
   quantite_sucre DOUBLE,
   etat_cmd VARCHAR(50),
   id_boisson INT NOT NULL,
   PRIMARY KEY(id_cmd),
   FOREIGN KEY(id_boisson) REFERENCES Boisson(id_boisson)
);

CREATE TABLE Paiement(
   id_paiement INT,
   date_paiement DATE NOT NULL,
   heure_paiement TIME NOT NULL,
   id_type_paiement INT NOT NULL,
   id_cmd INT NOT NULL,
   PRIMARY KEY(id_paiement),
   UNIQUE(id_cmd),
   FOREIGN KEY(id_type_paiement) REFERENCES Type_paiement(id_type_paiement),
   FOREIGN KEY(id_cmd) REFERENCES Commande(id_cmd)
);

CREATE TABLE Reclamation(
   id_reclamation INT,
   description_reclamation VARCHAR(50) NOT NULL,
   date_reclamation DATE NOT NULL,
   heure_reclamtion TIME NOT NULL,
   id_cmd INT NOT NULL,
   PRIMARY KEY(id_reclamation),
   UNIQUE(id_cmd),
   FOREIGN KEY(id_cmd) REFERENCES Commande(id_cmd)
);

CREATE TABLE Profil(
   id_profil INT,
   nom_utilisateur VARCHAR(50) NOT NULL,
   prenom_utilisateur VARCHAR(50),
   path_image_utilisateur VARCHAR(50),
   sex_utilisateur VARCHAR(50),
   id_utilisateur VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_profil),
   UNIQUE(id_utilisateur),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);

CREATE TABLE Faire_commande(
   id_consommateur INT,
   id_distributeur INT,
   id_cmd INT,
   PRIMARY KEY(id_consommateur, id_distributeur, id_cmd),
   FOREIGN KEY(id_consommateur) REFERENCES Consommateur(id_consommateur),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur),
   FOREIGN KEY(id_cmd) REFERENCES Commande(id_cmd)
);

CREATE TABLE Acheter_distributeur(
   id_distributeur INT,
   date_achat DATETIME,
   id_client INT NOT NULL,
   PRIMARY KEY(id_distributeur),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur),
   FOREIGN KEY(id_client) REFERENCES Client(id_client)
);

CREATE TABLE Dans_region(
   id_region INT,
   id_annonce INT,
   PRIMARY KEY(id_region, id_annonce),
   FOREIGN KEY(id_region) REFERENCES Region(id_region),
   FOREIGN KEY(id_annonce) REFERENCES Annoce(id_annonce)
);

CREATE TABLE Preperer_avec(
   id_boisson INT,
   id_ingredient INT,
   quantite_preparation DOUBLE,
   PRIMARY KEY(id_boisson, id_ingredient),
   FOREIGN KEY(id_boisson) REFERENCES Boisson(id_boisson),
   FOREIGN KEY(id_ingredient) REFERENCES Outils_preparation_boisson(id_ingredient)
);

CREATE TABLE Am_avoir_tache(
   id_tache INT,
   id_role INT,
   PRIMARY KEY(id_tache, id_role),
   FOREIGN KEY(id_tache) REFERENCES Tache(id_tache),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Afficher_dans_region(
   id_region_dynamique INT,
   id_annonce INT,
   PRIMARY KEY(id_region_dynamique, id_annonce),
   FOREIGN KEY(id_region_dynamique) REFERENCES Region_dynamique(id_region_dynamique),
   FOREIGN KEY(id_annonce) REFERENCES Annoce(id_annonce)
);

CREATE TABLE AM_maintenir_distributeur(
   id_distributeur INT,
   code_pin INT,
   id_role INT NOT NULL,
   PRIMARY KEY(id_distributeur),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Avoir_parametre(
   id_distributeur INT,
   localisation_dynamique_distributeur VARCHAR(50),
   PRIMARY KEY(id_distributeur, localisation_dynamique_distributeur),
   FOREIGN KEY(id_distributeur) REFERENCES Distributeur(id_distributeur),
   FOREIGN KEY(localisation_dynamique_distributeur) REFERENCES parametre(localisation_dynamique_distributeur)
);