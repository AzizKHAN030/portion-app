import React from 'react';

import { useMutation } from 'convex/react';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

const CoverImage = ({ url, preview }: CoverImageProps) => {
  const coverImage = useCoverImage();
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (!url) return;

    const promise = removeCoverImage({
      id: params.documentId as Id<'documents'>,
    });

    await edgestore.publicFiles.delete({ url });

    toast.promise(promise, {
      loading: 'Removing cover image...',
      success: 'Cover image removed',
      error: 'Failed to remove cover image',
    });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image className="object-cover" src={url} fill alt="Cover Image" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => {
              coverImage.onReplace(url);
            }}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

CoverImage.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};

export default CoverImage;
