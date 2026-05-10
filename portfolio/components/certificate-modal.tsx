"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, X } from "lucide-react";

export interface Certificate {
  title: string;
  institution: string; // The tagline
  period: string; // Year or date
  description: string;
  mediaUrl: string; // Path to the file e.g. /certificates/Code-Relay.pdf
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

export default function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!certificate) return null;

  const isPdf = certificate.mediaUrl.toLowerCase().endsWith('.pdf');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar p-0 gap-0 [&>button.absolute]:hidden rounded-2xl sm:rounded-2xl">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold pr-4">{certificate.title}</DialogTitle>
          <DialogDescription className="sr-only">Details for {certificate.title} certificate</DialogDescription>
          <DialogClose className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none shrink-0">
            <X className="h-5 w-5 opacity-70 hover:opacity-100" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-6">
          {/* Certificate Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                {certificate.institution}
              </span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                {certificate.period}
              </span>
            </div>
            <p className="text-muted-foreground">{certificate.description}</p>
          </div>

          {/* Media Viewer */}
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[500px]">
            {isPdf ? (
              <div className="w-full h-[60vh] sm:h-[70vh] flex flex-col">
                <iframe 
                  src={`${certificate.mediaUrl}#toolbar=0`} 
                  className="w-full h-full flex-grow border-0"
                  title={certificate.title}
                />
                {/* Fallback for mobile browsers that don't support inline PDFs */}
                <div className="p-4 bg-muted/50 flex justify-between items-center border-t border-white/10">
                  <span className="text-sm text-muted-foreground">Having trouble viewing the PDF?</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={certificate.mediaUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={certificate.mediaUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <img 
                src={certificate.mediaUrl} 
                alt={certificate.title} 
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
