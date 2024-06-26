export default function selectFile(fileType, callbackfn) {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = fileType;

    input.addEventListener('change', () => {
        callbackfn(input.files);
    });

    input.click();
    input.remove();
}