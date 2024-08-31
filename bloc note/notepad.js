document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const noteArea = document.getElementById('noteArea');
    const fileListItems = document.getElementById('fileListItems');

    // Charger le contenu sauvegardé à partir de localStorage
    loadSavedFiles();

    saveButton.addEventListener('click', () => {
        const content = noteArea.value.trim();
        
        if (content) {
            // Ajoute le contenu à la liste des fichiers sauvegardés
            addFileToList(content);

            // Affiche un message de confirmation
            alert('Contenu sauvegardé:\n' + content);

            // Efface le contenu de la zone de texte
            noteArea.value = '';

            // Enregistre le contenu dans localStorage
            saveFileList();
        } else {
            alert('Aucun contenu à sauvegarder.');
        }
    });

    // Fonction pour ajouter un fichier à la liste
    function addFileToList(content) {
        const listItem = document.createElement('li');
        listItem.textContent = content;
        fileListItems.appendChild(listItem);
    }

    // Fonction pour charger les fichiers sauvegardés depuis localStorage
    function loadSavedFiles() {
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles')) || [];
        savedFiles.forEach(content => addFileToList(content));
    }

    // Fonction pour sauvegarder les fichiers dans localStorage
    function saveFileList() {
        const fileItems = fileListItems.querySelectorAll('li');
        const fileContents = Array.from(fileItems).map(item => item.textContent);
        localStorage.setItem('savedFiles', JSON.stringify(fileContents));
    }

    // Exemple d'implémentation pour le changement de thème (simplifié)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        saveThemePreference();
    });

    // Charger la préférence de thème
    loadThemePreference();

    // Fonction pour enregistrer la préférence de thème
    function saveThemePreference() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('themePreference', isDarkTheme ? 'dark' : 'light');
    }

    // Fonction pour charger la préférence de thème
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
});
