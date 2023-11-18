'use client';

import { useState } from 'react';

import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';

import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';

export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const params = useParams();

  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);

    coverImage.onClose();
  };

  const onChange = async (file: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: coverImage.url },
      });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          onChange={onChange}
          value={file}
          isSubmitting={isSubmitting}
          onClose={onClose}
          className="w-full outline-none"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
