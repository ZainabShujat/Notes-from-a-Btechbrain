"use client";

import { useState } from "react";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookPreview from "./NotebookPreview";
import NotebookModalViewer from "./NotebookModalViewer";

export default function SubjectNotebook({
  notebook,
  serialNumber = "01",
  priority = false,
}: {
  notebook: SubjectNotebookData;
  serialNumber?: string;
  priority?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NotebookPreview
        notebook={notebook}
        serialNumber={serialNumber}
        onOpen={() => setIsOpen(true)}
      />

      {isOpen && (
        <NotebookModalViewer
          notebook={notebook}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
