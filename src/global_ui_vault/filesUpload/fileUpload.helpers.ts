export const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
        return "pi pi-image";
    }

    if (file.type.startsWith("video/")) {
        return "pi pi-video";
    }

    if (file.type.startsWith("audio/")) {
        return "pi pi-volume-up";
    }

    if (
        file.type.includes("pdf") ||
        file.name.toLowerCase().endsWith(".pdf")
    ) {
        return "pi pi-file-pdf";
    }

    if (
        file.type.includes("zip") ||
        file.type.includes("compressed")
    ) {
        return "pi pi-file-archive";
    }

    if (
        file.type.includes("word") ||
        file.name.match(/\.(doc|docx)$/i)
    ) {
        return "pi pi-file-word";
    }

    if (
        file.type.includes("excel") ||
        file.name.match(/\.(xls|xlsx|csv)$/i)
    ) {
        return "pi pi-file-excel";
    }

    return "pi pi-file";
};

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
    ];

    const index = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return `${parseFloat(
        (bytes / Math.pow(1024, index)).toFixed(2)
    )} ${units[index]}`;
};