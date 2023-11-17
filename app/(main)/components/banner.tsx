import React from 'react';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface BannerProps {
  documentId: Id<'documents'>;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.hardDelete);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Deleting the document...',
      success: 'Document deleted',
      error: 'Failed to delete the document',
    });
    router.push('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring the document...',
      success: 'Document restored',
      error: 'Failed to restore the document',
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Trash.</p>
      <Button
        onClick={onRestore}
        size="sm"
        variant="outline"
        className="border-white bg-transparent text-white hover:bg-white hover:text-rose-500 p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent text-white hover:bg-white hover:text-rose-500 p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
