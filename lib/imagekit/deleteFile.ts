import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

interface DeleteFileProps {
    fileId: string | string[];
}

export async function deleteFile({
    fileId,
}: DeleteFileProps): Promise<void> {

    const fileIds = Array.isArray(fileId)
        ? fileId
        : [fileId];

    if (!fileIds.length) {
        return;
    }

    await Promise.all(
        fileIds.map((id) =>
            imageKit.files.delete(id)
        )
    );
}