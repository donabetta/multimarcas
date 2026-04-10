/**
 * Dona Betta Form Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const fileInput = document.getElementById('fotos_loja');
    const fileListDisplay = document.getElementById('file-list');
    const dropArea = document.getElementById('drop-area');


    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });


    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('drag-over'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('drag-over'), false);
    });

    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files; // Assign files to the actual input
        handleFiles(files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
            const maxSize = 25 * 1024 * 1024; // 25MB

            if (totalSize > maxSize) {
                alert('O tamanho total dos arquivos excede o limite de 25MB. Por favor, selecione arquivos menores.');
                fileInput.value = '';
                fileListDisplay.classList.add('hidden');
                return;
            }

            fileListDisplay.textContent = `${files.length} arquivo(s) selecionado(s)`;
            fileListDisplay.classList.remove('hidden');
        } else {
            fileListDisplay.classList.add('hidden');
        }
    }


    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(new RegExp('[^\\d]', 'g'), '');
            if (value.length > 14) value = value.slice(0, 14);
            

            if (value.length > 12) {
                value = value.replace(new RegExp('(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})'), '$1.$2.$3/$4-$5');
            } else if (value.length > 8) {
                value = value.replace(new RegExp('(\\d{2})(\\d{3})(\\d{3})(\\d{4})'), '$1.$2.$3/$4');
            }


        });
    }
});
