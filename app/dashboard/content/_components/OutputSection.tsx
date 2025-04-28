import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const editorRef: any = useRef();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      if (editorInstance && aiOutput) {
        editorInstance.setMarkdown(aiOutput);
      }
    }
  }, [aiOutput]);

  const handleCopy = () => {
    if (aiOutput) {
      navigator.clipboard.writeText(aiOutput);
      setCopied(true);

      // Reset "Copied!" status after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert('No output to copy!');
    }
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button
          className="flex gap-2 relative"
          onClick={handleCopy}
          disabled={!aiOutput}
        >
          <Copy className="w-4 h-4" />
          Copy
          {copied && (
            <span className="absolute top-0 right-0 text-xs bg-black text-white px-2 py-1 rounded-lg">
              Copied!
            </span>
          )}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result Will Appear Here!"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current?.getInstance()?.getMarkdown())
        }
      />
    </div>
  );
}

export default OutputSection;
