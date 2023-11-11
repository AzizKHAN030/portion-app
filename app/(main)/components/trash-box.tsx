'use client';

import React, { useState } from 'react';

import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import ConfirmModal from '@/components/modals/confirm-modal';
import Spinner from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const deleteDocument = useMutation(api.documents.hardDelete);

  const [search, setSearch] = useState('');
  const filteredDocuments = documents?.filter(document =>
    document.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored!',
      error: 'Error restoring document',
    });
  };

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = deleteDocument({ id: documentId });

    toast.promise(promise, {
      loading: 'Deleting document...',
      success: 'Document deleted!',
      error: 'Error deleting document',
    });

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div>
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map(document => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center ">
              <div
                onClick={e => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;