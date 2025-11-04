import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileText } from "lucide-react";

function Node({ node }) {
  const [open, setOpen] = useState(false);

  if (node.type === "file") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer text-sm py-1"
      >
        <FileText size={16} /> {node.name}
      </motion.div>
    );
  }

  return (
    <div className="py-1">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-indigo-400 cursor-pointer hover:text-indigo-300 font-medium"
      >
        {open ? <FolderOpen size={18} /> : <Folder size={18} />} {node.name}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-5 border-l border-gray-700 ml-2"
          >
            {node.children?.map((child) => (
              <Node key={child.path} node={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TreeView({ node }) {
  return (
    <div className="text-sm">
      {node.children?.map((child) => (
        <Node key={child.path} node={child} />
      ))}
    </div>
  );
}
