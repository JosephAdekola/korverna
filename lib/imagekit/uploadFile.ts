import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

interface UploadFileProps {
    files: File | File[];
    folder: string;
    maxFiles?: number;
}

interface UploadedFileResult {
    url: string | undefined;
    fileId: string | undefined;
    fileType: string | undefined;
    fileName: string | undefined;
    size: number | undefined
}

export async function uploadFile({
    files,
    folder,
    maxFiles,
}: UploadFileProps): Promise<UploadedFileResult[]> {

    const fileList = Array.isArray(files)
        ? files
        : [files];

    if (
        maxFiles !== undefined &&
        fileList.length > maxFiles
    ) {
        throw new Error(
            `Maximum ${maxFiles} files can be uploaded`
        );
    }

    if (!fileList.length) {
        return [];
    }

    const uploadedFiles =
        await Promise.all(
            fileList.map(async (file) => {

                // const buffer =
                //     Buffer.from(
                //         await file.arrayBuffer()
                //     );

                const response =
                    await imageKit.files.upload({
                        file,
                        fileName: file.name,
                        folder,
                        useUniqueFileName: true,
                    });

                return {
                    url: response.url,
                    fileId: response.fileId,
                    fileType: response.fileType,
                    fileName: response.name,
                    size: response.size
                };
            })
        );

    return uploadedFiles;
}