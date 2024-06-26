export default function download (link, fileName) {
    const aElement = document.createElement("a");

    aElement.href = link;
    aElement.download = fileName;
    aElement.click();
    aElement.remove();
}