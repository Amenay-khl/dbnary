# installer WSL 2

commenecer par activer WSL 1.0. pour cela executer le powerShell autant qu'administrateur et entrer la commande suivante puis redemarrer :

**dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all**.

Docker fonctionne sous la version WSL 2.0. pour installer cette version, relancer le powerShell attant qu'administrateur et executer la commande suivante:

**dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all**

redemarer votre PC puis installer une configuration linux (ex: ubuntu) via le store.

ensuite, vous devez installer le noyau linux [que vous trouverez ici](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi).

relancer la distrib linux.

# activer WSL 2 par défaut

entrez la commande suivante dans votre PowerShell :
**wsl --set-default-version 2**

puis convertir votre linux en WSL 2 entrez cette commande
**wsl --set-version [nom_linux] [version]**

Et voilà c’est converti pour fonctionner avec WSL2. vous pouvez maintenant installer [docker ici](https://www.docker.com/products/docker-desktop).

vous pouvez verifier que docker s'est bien installé avec la commande suivante:

**docker run hello-world**

# installation des autres outils outils

commencer par ouvrir l'invite de commande Ubuntu puis mettre à jour la base de donné des packet avec la commande : **sudo apt update**

## installer docker sur ubuntu

executer la commande : **sudo apt install docker-ce**

pour verifier si docker est bien installé utiliser la commande : ** docker run hello-world**

## installer php

executer la commande suivante:
**sudo apt install php**, puis installer l'outil de gestion des dependances pour php avec : sudo apt install composer

## installer WP-CLI

wp-cli permet d'integrer une interface de ligne de commande pour administrer wordpress. pour l'installer il suffit de tapper la commande : **sudo apt install wp-cli**

## Authentification SSH

cette action permet d'automatiser les connexions. executer la commande : **ssh-keygen** puis compier et coller la clé dans les parametres du wordpress.

## installer aptitude

**apt install aptitude**

## installer nodejs et npm

**aptitude install npm**

**apt install nodejs**

## installer yarn

**npm install --global yarn**

## lancer docker

placez vous dans le dossier du projet et lancer la commande: **yarn docker:start**

# Activer le plugin dbnary-dashboard

si vous rencontrez des problemes pour l'activation du plugin faites la manipulation suivante dans le repertoir package/utils puis dans plugins/dbnary-dashboard:

1. installer php dom avec la commande :**aptitude install php-xml**
2. dans le fichier composer.json verifier que la valeur de **metasyntactical/composer-plugin-license-check"** est de **"^0.6.0"**
3. faire la mise a jour de composer avec la commande **composer update**.
